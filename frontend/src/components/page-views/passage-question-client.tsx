'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppShell } from '@/components/layout/app-shell';
import { Button } from '@/components/ui/button';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { QuestionList } from '@/components/questions/question-list';
import { Timer } from '@/components/ui/timer';
import { logEvent } from '@/lib/logger';
import { PassageBody } from '@/components/passage/passage-body';
import type { Passage } from '@/lib/types';

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

const DEFAULT_TIME_MS = 5 * 60 * 1000;

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
  const initialSelections = useMemo(
    () => Object.fromEntries(passage.questions.map((q) => [q.id, undefined])),
    [passage.questions]
  );
  const [selections, setSelections] =
    useState<Record<string, string | undefined>>(initialSelections);
  const [timedOut, setTimedOut] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

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

  const handleSubmit = useCallback(() => {
    const unanswered = Object.entries(selections)
      .filter(([, choice]) => !choice)
      .map(([q]) => q);
    logEvent({
      event: 'answer_submit',
      passage_id: passage.id,
      answers: selections,
      unanswered,
    });
    onSubmit?.(selections);
    if (confirmHref) {
      router.push(confirmHref);
    }
  }, [selections, passage.id, onSubmit, confirmHref, router]);

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

  return (
    <>
      <AppShell
        headerSlot={headerTimer}
        leftSlot={
          <PassageBody
            sections={passage.sections}
            paragraphsEn={paragraphs}
            direction={passage.direction}
          />
        }
        rightSlot={
          <div className="space-y-4">
            <QuestionList
              questions={passage.questions}
              selections={selections}
              onSelect={handleSelect}
              onSubmit={handleSubmit}
              showSubmitButton={false}
              showJapanese={showJapanese}
              submitLabel={submitLabel}
              disabled={timedOut}
            />
          </div>
        }
        footer={<Button onClick={() => setDialogOpen(true)}>{confirmLabel}</Button>}
      />
      <ConfirmDialog
        title={timedOut ? '時間切れです' : confirmTitle}
        description={timedOut ? '制限時間になりました。次の文章に進みます。' : confirmDescription}
        confirmLabel={confirmLabel}
        onConfirm={handleSubmit}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        allowCancel={!timedOut}
      />
    </>
  );
}
