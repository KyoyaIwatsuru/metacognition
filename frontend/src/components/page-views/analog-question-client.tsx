'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
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

const DEFAULT_TIME_MS = 6 * 60 * 1000;

export function AnalogQuestionClient({
  passageId,
  analog,
  timerMs = DEFAULT_TIME_MS,
  confirmTitle,
  confirmDescription,
  confirmLabel,
  submitLabel,
  confirmHref,
}: AnalogQuestionClientProps) {
  const router = useRouter();
  const setAnalogResult = useAppStore((s) => s.setAnalogResult);
  const initialSelections = useMemo(
    () => Object.fromEntries(analog.questions.map((q) => [q.id, undefined])),
    [analog.questions]
  );
  const [selections, setSelections] =
    useState<Record<string, string | undefined>>(initialSelections);
  const [timedOut, setTimedOut] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const paragraphs = useMemo(() => analog.paragraphsEn ?? [], [analog.paragraphsEn]);

  useEffect(() => {
    captureScreen();
    logEvent({ event: 'analog_question_open', passage_id: passageId, analog_id: analog.id });
  }, [analog.id, passageId]);

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
    logEvent({
      event: 'analog_answer_submit',
      passage_id: passageId,
      analog_id: analog.id,
      answers: selections,
      results,
      correct_count: correctCount,
      total_count: analog.questions.length,
      unanswered,
    });
    setAnalogResult(analog.id, selections);
    if (confirmHref) {
      router.push(confirmHref);
    }
  }, [selections, passageId, analog.id, analog.questions, confirmHref, router, setAnalogResult]);

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
        footer={<Button onClick={() => setDialogOpen(true)}>{confirmLabel}</Button>}
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
