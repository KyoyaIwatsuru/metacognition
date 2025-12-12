'use client';

import { useEffect, useMemo, useState } from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { Button } from '@/components/ui/button';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { ConfirmNavigateButton } from '@/components/navigation/confirm-navigate-button';
import { QuestionList } from '@/components/questions/question-list';
import { Timer } from '@/components/ui/timer';
import { logEvent } from '@/lib/logger';
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

const DEFAULT_TIME_MS = 5 * 60 * 1000;

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
  const initialSelections = useMemo(
    () => Object.fromEntries(analog.questions.map((q) => [q.id, undefined])),
    [analog.questions]
  );
  const [selections, setSelections] =
    useState<Record<string, string | undefined>>(initialSelections);
  const [timedOut, setTimedOut] = useState(false);

  const paragraphs = useMemo(() => analog.paragraphsEn ?? [], [analog.paragraphsEn]);

  useEffect(() => {
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

  const handleSubmit = () => {
    const unanswered = Object.entries(selections)
      .filter(([, choice]) => !choice)
      .map(([q]) => q);
    logEvent({
      event: 'analog_answer_submit',
      passage_id: passageId,
      analog_id: analog.id,
      answers: selections,
      unanswered,
    });
  };

  const handleTimeout = () => {
    if (timedOut) return;
    setTimedOut(true);
    const unanswered = Object.entries(selections)
      .filter(([, choice]) => !choice)
      .map(([q]) => q);
    logEvent({ event: 'timeout', passage_id: passageId, analog_id: analog.id, unanswered });
  };

  const headerTimer = (
    <Timer totalMs={timerMs} onTimeout={handleTimeout} className="border px-2 py-1" />
  );

  return (
    <AppShell
      headerSlot={headerTimer}
      leftSlot={
        <>
          <h1 className="text-2xl font-semibold">Analog Question</h1>
          <p className="text-sm text-zinc-600">
            passage: {passageId} / analog: {analog.id}
          </p>
          <div className="space-y-3 rounded-md border bg-card p-4 text-sm text-muted-foreground whitespace-pre-line">
            {paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </>
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
        confirmHref ? (
          <ConfirmNavigateButton
            href={confirmHref}
            title={confirmTitle}
            description={confirmDescription}
            confirmLabel={confirmLabel}
            triggerLabel={confirmLabel}
            onConfirm={handleSubmit}
          />
        ) : (
          <ConfirmDialog
            title={confirmTitle}
            description={confirmDescription}
            confirmLabel={confirmLabel}
            onConfirm={handleSubmit}
          >
            <Button>{confirmLabel}</Button>
          </ConfirmDialog>
        )
      }
    />
  );
}
