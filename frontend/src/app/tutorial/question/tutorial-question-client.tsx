'use client';

import { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppShell } from '@/components/layout/app-shell';
import { Button } from '@/components/ui/button';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { QuestionList } from '@/components/questions/question-list';
import { Timer } from '@/components/ui/timer';
import { PassageBody } from '@/components/passage/passage-body';
import { tutorialPassage } from '@/lib/mock-data';

export function TutorialQuestionClient() {
  const router = useRouter();
  const passage = tutorialPassage;

  const initialSelections = useMemo(
    () => Object.fromEntries(passage.questions.map((q) => [q.id, undefined])),
    [passage.questions]
  );
  const [selections, setSelections] =
    useState<Record<string, string | undefined>>(initialSelections);
  const [timedOut, setTimedOut] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const paragraphs = useMemo(() => passage.paragraphsEn ?? [], [passage.paragraphsEn]);

  // (1.5×設問数 + 0.5×本文数) + 0.5分 (本文数は1)
  const timerMs = (passage.questions.length * 1.5 + 1) * 60 * 1000;

  const handleSelect = (questionId: string, choiceId: string) => {
    setSelections((prev) => ({ ...prev, [questionId]: choiceId }));
    // チュートリアルではログを取らない
  };

  const handleSubmit = useCallback(() => {
    // 解説ページに回答を渡す
    sessionStorage.setItem('tutorialSelections', JSON.stringify(selections));
    router.push('/tutorial/explanation');
  }, [router, selections]);

  const handleTimeout = () => {
    if (timedOut) return;
    setTimedOut(true);
    setDialogOpen(true);
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
              showJapanese={false}
              submitLabel="解答を確定する"
              disabled={timedOut}
            />
          </div>
        }
        footer={
          <Button
            onClick={() => {
              setDialogOpen(true);
            }}
          >
            解答を確定する
          </Button>
        }
      />
      <ConfirmDialog
        title={timedOut ? '時間切れです' : '解答を確定します'}
        description={
          timedOut ? '制限時間になりました。解説に進みます。' : '解説に進みます。よろしいですか？'
        }
        confirmLabel="解説へ"
        onConfirm={handleSubmit}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        allowCancel={!timedOut}
      />
    </>
  );
}
