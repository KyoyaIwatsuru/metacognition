'use client';

import { PassageQuestionClient } from '@/components/page-views/passage-question-client';
import { useAppStore } from '@/lib/store';
import type { Passage } from '@/lib/types';

type TrainingQuestionClientProps = {
  passage: Passage;
};

export function TrainingQuestionClient({ passage }: TrainingQuestionClientProps) {
  const setTrainingResult = useAppStore((s) => s.setTrainingResult);

  // (1.5×設問数 + 0.5×本文数) + 0.5分 (本文数は1)
  const timerMs = (passage.questions.length * 1.5 + 1) * 60 * 1000;

  const handleSubmit = (answers: Record<string, string | undefined>) => {
    const allCorrect = passage.questions.every(
      (q) => answers[q.id] && answers[q.id] === q.correctChoiceId
    );
    setTrainingResult(passage.id, { answers, allCorrect });
  };

  return (
    <PassageQuestionClient
      passage={passage}
      showJapanese={false}
      timerMs={timerMs}
      confirmTitle="解答を確定します"
      confirmDescription="次に進むと戻れません。よろしいですか？"
      confirmLabel="解答する"
      confirmHref={`/training/${passage.id}/reflection1`}
      submitLabel="解答を確定する"
      onSubmit={handleSubmit}
    />
  );
}
