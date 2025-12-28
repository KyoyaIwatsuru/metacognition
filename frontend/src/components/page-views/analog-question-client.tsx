'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppShell } from '@/components/layout/app-shell';
import { PassageBody } from '@/components/passage/passage-body';
import { Button } from '@/components/ui/button';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { QuestionList } from '@/components/questions/question-list';
import { Timer } from '@/components/ui/timer';
import { logEvent } from '@/lib/logger';
import { captureScreen } from '@/lib/capture';
import { useAppStore } from '@/lib/store';
import type { Analog } from '@/lib/types';
import {
  collectTextCoordinates,
  getElementBBox,
  saveCoordinates,
  extractPassageCoordinates,
} from '@/lib/coordinate-collector';

type AnalogQuestionClientProps = {
  passageId: string;
  analog: Analog;
  timerMs?: number;
  confirmTitle: string;
  confirmDescription: string;
  confirmLabel: string;
  submitLabel?: string;
  confirmHref?: string;
};

export function AnalogQuestionClient({
  passageId,
  analog,
  timerMs: timerMsProp,
  confirmTitle,
  confirmDescription,
  confirmLabel,
  submitLabel,
  confirmHref,
}: AnalogQuestionClientProps) {
  // (1.5×設問数 + 0.5×本文数) + 0.5分 (本文数は1)
  const timerMs = timerMsProp ?? (analog.questions.length * 1.5 + 1) * 60 * 1000;
  const router = useRouter();
  const participantId = useAppStore((s) => s.participantId);
  const groupLetter = useAppStore((s) => s.groupLetter);
  const setAnalogResult = useAppStore((s) => s.setAnalogResult);
  const initialSelections = useMemo(
    () => Object.fromEntries(analog.questions.map((q) => [q.id, undefined])),
    [analog.questions]
  );
  const [selections, setSelections] =
    useState<Record<string, string | undefined>>(initialSelections);
  const [timedOut, setTimedOut] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const startTimeRef = useRef<number>(0);
  const coordinatesCollectedRef = useRef(false);

  const paragraphs = useMemo(() => analog.paragraphsEn ?? [], [analog.paragraphsEn]);

  useEffect(() => {
    startTimeRef.current = Date.now();
    captureScreen();
    logEvent({ event: 'analog_question_open', passage_id: passageId, analog_id: analog.id });

    // Collect coordinates after a short delay to ensure rendering is complete
    const timer = setTimeout(() => {
      if (!participantId || coordinatesCollectedRef.current) return;
      coordinatesCollectedRef.current = true;

      // Timer
      const timerElement = document.querySelector('[data-timer="true"]') as HTMLElement | null;

      // Instruction text
      const instructionElement = document.querySelector(
        '[data-passage-instruction="true"]'
      ) as HTMLElement | null;

      // Passage sections
      const sectionElements = Array.from(
        document.querySelectorAll('[data-passage-section]')
      ) as HTMLElement[];
      const passages = sectionElements.map((el, idx) => extractPassageCoordinates(el, idx));

      // All questions
      const questionElements = Array.from(
        document.querySelectorAll('[data-question]')
      ) as HTMLElement[];
      const questions = questionElements.map((qEl) => {
        const questionId = qEl.getAttribute('data-question') || '';
        const questionIndex = parseInt(qEl.getAttribute('data-question-index') || '0');
        const promptElement = qEl.querySelector(
          '[data-question-prompt="true"]'
        ) as HTMLElement | null;

        const choiceElements = Array.from(qEl.querySelectorAll('[data-choice]')) as HTMLElement[];
        const choices = choiceElements.map((cEl) => ({
          choice_id: cEl.getAttribute('data-choice') || '',
          choice_index: parseInt(cEl.getAttribute('data-choice-index') || '0'),
          choice_text: collectTextCoordinates(
            cEl.querySelector('[data-choice-text="true"]') as HTMLElement | null
          ),
          bbox: getElementBBox(cEl),
        }));

        return {
          question_id: questionId,
          question_index: questionIndex,
          question_text: collectTextCoordinates(promptElement),
          choices,
        };
      });

      // Submit button
      const submitButtonElement = document.querySelector(
        '[data-confirm-button="true"]'
      ) as HTMLElement | null;

      const coordinates = {
        page_type: 'analog_question',
        passage_id: passageId,
        analog_id: analog.id,
        timestamp: new Date().toISOString(),

        header: {
          timer: getElementBBox(timerElement),
        },

        left_panel: {
          instruction: collectTextCoordinates(instructionElement),
          passages,
        },

        right_panel: {
          questions,
        },

        footer: {
          confirm_button: getElementBBox(submitButtonElement),
        },
      };

      saveCoordinates(
        participantId,
        groupLetter || '',
        `analog_question_${passageId}_${analog.id}`,
        coordinates
      );
    }, 1000);

    return () => clearTimeout(timer);
  }, [analog.id, passageId, participantId]);

  const handleSelect = (questionId: string, choiceId: string) => {
    setSelections((prev) => ({ ...prev, [questionId]: choiceId }));
    logEvent({
      event: 'choice_click',
      question_id: questionId,
      choice_id: choiceId,
      passage_id: passageId,
      analog_id: analog.id,
    });
  };

  const handleSubmit = useCallback(() => {
    const unanswered = Object.entries(selections)
      .filter(([, choice]) => !choice)
      .map(([q]) => q);
    const results = Object.entries(selections).map(([questionId, choiceId]) => {
      const question = analog.questions.find((q) => q.id === questionId);
      return {
        question_id: questionId,
        choice_id: choiceId,
        is_correct: choiceId ? question?.correctChoiceId === choiceId : null,
      };
    });
    const correctCount = results.filter((r) => r.is_correct === true).length;
    const elapsedMs = Date.now() - startTimeRef.current;
    const remainingMs = Math.max(0, timerMs - elapsedMs);
    logEvent({
      event: 'analog_answer_submit',
      passage_id: passageId,
      analog_id: analog.id,
      answers: selections,
      results,
      correct_count: correctCount,
      total_count: analog.questions.length,
      unanswered,
      remaining_time_ms: remainingMs,
    });
    setAnalogResult(analog.id, selections);
    if (confirmHref) {
      router.push(confirmHref);
    }
  }, [
    selections,
    passageId,
    analog.id,
    analog.questions,
    confirmHref,
    router,
    setAnalogResult,
    timerMs,
  ]);

  const handleTimeout = () => {
    if (timedOut) return;
    setTimedOut(true);
    setDialogOpen(true);
    const unanswered = Object.entries(selections)
      .filter(([, choice]) => !choice)
      .map(([q]) => q);
    logEvent({ event: 'timeout', passage_id: passageId, analog_id: analog.id, unanswered });
  };

  const headerTimer = (
    <Timer totalMs={timerMs} onTimeout={handleTimeout} className="border px-2 py-1" />
  );

  return (
    <>
      <AppShell
        headerSlot={headerTimer}
        leftSlot={
          <PassageBody
            sections={analog.sections}
            paragraphsEn={paragraphs}
            direction={analog.direction}
          />
        }
        rightSlot={
          <div className="space-y-4">
            <QuestionList
              questions={analog.questions}
              selections={selections}
              onSelect={handleSelect}
              onSubmit={handleSubmit}
              showSubmitButton={false}
              showJapanese={false}
              submitLabel={submitLabel}
              disabled={timedOut}
            />
          </div>
        }
        footer={
          <Button
            onClick={() => {
              logEvent({
                event: 'confirm_dialog_open',
                passage_id: passageId,
                analog_id: analog.id,
              });
              setDialogOpen(true);
            }}
            data-confirm-button="true"
          >
            {confirmLabel}
          </Button>
        }
      />
      <ConfirmDialog
        title={timedOut ? '時間切れです' : confirmTitle}
        description={timedOut ? '制限時間になりました。解説に進みます。' : confirmDescription}
        confirmLabel={confirmLabel}
        onConfirm={handleSubmit}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        allowCancel={!timedOut}
      />
    </>
  );
}
