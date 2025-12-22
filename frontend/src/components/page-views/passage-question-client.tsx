'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
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
    captureScreen();
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
    const results = Object.entries(selections).map(([questionId, choiceId]) => {
      const question = passage.questions.find((q) => q.id === questionId);
      return {
        question_id: questionId,
        choice_id: choiceId,
        is_correct: choiceId ? question?.correctChoiceId === choiceId : null,
      };
    });
    const correctCount = results.filter((r) => r.is_correct === true).length;
    logEvent({
      event: 'answer_submit',
      passage_id: passage.id,
      answers: selections,
      results,
      correct_count: correctCount,
      total_count: passage.questions.length,
      unanswered,
    });
    onSubmit?.(selections);
    if (confirmHref) {
      router.push(confirmHref);
    }
  }, [selections, passage.id, passage.questions, onSubmit, confirmHref, router]);

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
