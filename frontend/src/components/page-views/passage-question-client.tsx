'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppShell } from '@/components/layout/app-shell';
import { Button } from '@/components/ui/button';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { QuestionList } from '@/components/questions/question-list';
import { Timer } from '@/components/ui/timer';
import { logEvent } from '@/lib/logger';
import { captureScreen } from '@/lib/capture';
import { PassageBody } from '@/components/passage/passage-body';
import type { Passage } from '@/lib/types';
import { useAppStore } from '@/lib/store';
import {
  collectTextCoordinates,
  getElementBBox,
  saveCoordinates,
  extractPassageCoordinates,
} from '@/lib/coordinate-collector';

type PassageQuestionClientProps = {
  passage: Passage;
  showJapanese?: boolean;
  timerMs?: number;
  confirmTitle: string;
  confirmDescription: string;
  confirmLabel: string;
  submitLabel?: string;
  confirmHref?: string;
  onSubmit?: (answers: Record<string, string | undefined>) => void;
};

const DEFAULT_TIME_MS = 6 * 60 * 1000;

export function PassageQuestionClient({
  passage,
  showJapanese = false,
  timerMs = DEFAULT_TIME_MS,
  confirmTitle,
  confirmDescription,
  confirmLabel,
  submitLabel,
  confirmHref,
  onSubmit,
}: PassageQuestionClientProps) {
  const router = useRouter();
  const participantId = useAppStore((s) => s.participantId);
  const groupLetter = useAppStore((s) => s.groupLetter);
  const initialSelections = useMemo(
    () => Object.fromEntries(passage.questions.map((q) => [q.id, undefined])),
    [passage.questions]
  );
  const [selections, setSelections] =
    useState<Record<string, string | undefined>>(initialSelections);
  const [timedOut, setTimedOut] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const startTimeRef = useRef<number>(0);

  const paragraphs = useMemo(() => passage.paragraphsEn ?? [], [passage.paragraphsEn]);

  useEffect(() => {
    startTimeRef.current = Date.now();
    captureScreen();
    logEvent({ event: 'question_screen_open', passage_id: passage.id });

    // Collect coordinates after a short delay to ensure rendering is complete
    const timer = setTimeout(() => {
      if (!participantId) return;

      // Instruction text
      const instructionElement = document.querySelector(
        '[data-passage-instruction="true"]'
      ) as HTMLElement | null;

      // Timer (in header)
      const timerElement = document.querySelector('[data-timer="true"]') as HTMLElement | null;

      // Passage sections with detailed extraction
      const sectionElements = Array.from(
        document.querySelectorAll('[data-passage-section]')
      ) as HTMLElement[];
      const passages = sectionElements.map((el, idx) => extractPassageCoordinates(el, idx));

      // Questions
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
          choice_bbox: getElementBBox(cEl),
        }));

        return {
          question_id: questionId,
          question_index: questionIndex,
          question_text: collectTextCoordinates(promptElement),
          choices,
        };
      });

      // Submit button (in footer)
      const submitButtonElement = document.querySelector(
        '[data-submit-button="true"]'
      ) as HTMLElement | null;

      // Use panel-based structure
      const coordinates = {
        page_type: 'question',
        passage_id: passage.id,
        timestamp: new Date().toISOString(),

        left_panel: {
          instruction: collectTextCoordinates(instructionElement),
          passages,
        },

        right_panel: {
          questions,
          ui_components: {
            timer: getElementBBox(timerElement),
          },
        },

        footer: {
          submit_button: getElementBBox(submitButtonElement),
        },
      };

      saveCoordinates(participantId, groupLetter || '', `question_${passage.id}`, coordinates);
    }, 1000);

    return () => clearTimeout(timer);
  }, [passage.id, participantId]);

  const handleSelect = (questionId: string, choiceId: string) => {
    setSelections((prev) => ({ ...prev, [questionId]: choiceId }));
    logEvent({
      event: 'choice_click',
      question_id: questionId,
      choice_id: choiceId,
      passage_id: passage.id,
    });
  };

  const handleSubmit = useCallback(() => {
    const unanswered = Object.entries(selections)
      .filter(([, choice]) => !choice)
      .map(([q]) => q);
    const results = Object.entries(selections).map(([questionId, choiceId]) => {
      const question = passage.questions.find((q) => q.id === questionId);
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
      event: 'answer_submit',
      passage_id: passage.id,
      answers: selections,
      results,
      correct_count: correctCount,
      total_count: passage.questions.length,
      unanswered,
      remaining_time_ms: remainingMs,
    });
    onSubmit?.(selections);
    if (confirmHref) {
      router.push(confirmHref);
    }
  }, [selections, passage.id, passage.questions, onSubmit, confirmHref, router, timerMs]);

  const handleTimeout = () => {
    if (timedOut) return;
    setTimedOut(true);
    setDialogOpen(true); // Auto-open dialog on timeout
    const unanswered = Object.entries(selections)
      .filter(([, choice]) => !choice)
      .map(([q]) => q);
    logEvent({ event: 'timeout', passage_id: passage.id, unanswered });
  };

  const headerTimer = (
    <Timer totalMs={timerMs} onTimeout={handleTimeout} className="border px-2 py-1" />
  );

  // Filter sections by locale (English)
  const enSections = useMemo(
    () => (passage.sections ?? []).filter((s) => s.locale === 'en'),
    [passage.sections]
  );

  // When 3+ sections, split: first 2 on left, rest on right with questions
  const hasThreeOrMoreSections = enSections.length >= 3;
  const leftSectionCount = hasThreeOrMoreSections ? 2 : enSections.length;

  return (
    <>
      <AppShell
        headerSlot={headerTimer}
        equalColumns={hasThreeOrMoreSections}
        leftSlot={
          <PassageBody
            sections={passage.sections}
            paragraphsEn={paragraphs}
            direction={passage.direction}
            maxSections={leftSectionCount}
          />
        }
        rightSlot={
          <div className="space-y-0 h-full flex flex-col">
            {/* 3つ目以降のセクションを右上に表示 */}
            {hasThreeOrMoreSections && (
              <div className="flex-shrink-0">
                <PassageBody sections={passage.sections} skipSections={leftSectionCount} />
              </div>
            )}
            {/* 設問 */}
            <div className="flex-1 overflow-auto">
              <QuestionList
                questions={passage.questions}
                selections={selections}
                onSelect={handleSelect}
                onSubmit={handleSubmit}
                showSubmitButton={false}
                showJapanese={showJapanese}
                submitLabel={submitLabel}
                disabled={timedOut}
                twoColumns={hasThreeOrMoreSections}
              />
            </div>
          </div>
        }
        footer={
          <Button
            onClick={() => {
              logEvent({ event: 'confirm_dialog_open', passage_id: passage.id });
              setDialogOpen(true);
            }}
            data-submit-button="true"
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
