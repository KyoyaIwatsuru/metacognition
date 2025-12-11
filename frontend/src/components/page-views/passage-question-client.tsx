'use client';

import { useEffect, useMemo, useState } from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { Button } from '@/components/ui/button';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { QuestionList } from '@/components/questions/question-list';
import { Timer } from '@/components/ui/timer';
import { logEvent } from '@/lib/logger';
import type { Passage } from '@/lib/types';

type PassageQuestionClientProps = {
  passage: Passage;
  showJapanese?: boolean;
  timerMs?: number;
  confirmTitle: string;
  confirmDescription: string;
  confirmLabel: string;
  submitLabel?: string;
};

const DEFAULT_TIME_MS = 5 * 60 * 1000;

export function PassageQuestionClient({
  passage,
  showJapanese = false,
  timerMs = DEFAULT_TIME_MS,
  confirmTitle,
  confirmDescription,
  confirmLabel,
  submitLabel,
}: PassageQuestionClientProps) {
  const initialSelections = useMemo(
    () => Object.fromEntries(passage.questions.map((q) => [q.id, undefined])),
    [passage.questions]
  );
  const [selections, setSelections] =
    useState<Record<string, string | undefined>>(initialSelections);

  const paragraphs = useMemo(() => passage.paragraphsEn ?? [], [passage.paragraphsEn]);

  useEffect(() => {
    logEvent({ event: 'question_screen_open', passage_id: passage.id });
  }, [passage.id]);

  const handleSelect = (questionId: string, choiceId: string) => {
    setSelections((prev) => ({ ...prev, [questionId]: choiceId }));
    logEvent({
      event: 'choice_click',
      question_id: questionId,
      choice_id: choiceId,
      passage_id: passage.id,
    });
  };

  const handleSubmit = () => {
    logEvent({
      event: 'answer_submit',
      passage_id: passage.id,
      answers: selections,
    });
  };

  const handleTimeout = () => {
    logEvent({ event: 'timeout', passage_id: passage.id });
  };

  return (
    <AppShell
      leftSlot={
        <>
          <h1 className="text-2xl font-semibold">Passage</h1>
          <p className="text-sm text-zinc-600">passage: {passage.id}</p>
          <div className="space-y-3 rounded-md border bg-card p-4 text-sm text-muted-foreground whitespace-pre-line">
            {paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </>
      }
      rightSlot={
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-muted-foreground">残り時間</div>
            <Timer totalMs={timerMs} onTimeout={handleTimeout} />
          </div>
          <QuestionList
            questions={passage.questions}
            selections={selections}
            onSelect={handleSelect}
            onSubmit={handleSubmit}
            showJapanese={showJapanese}
            submitLabel={submitLabel}
          />
        </div>
      }
      footer={
        <ConfirmDialog
          title={confirmTitle}
          description={confirmDescription}
          confirmLabel={confirmLabel}
        >
          <Button>{confirmLabel}</Button>
        </ConfirmDialog>
      }
    />
  );
}
