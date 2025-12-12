'use client';

import { PassageQuestionClient } from '@/components/page-views/passage-question-client';
import { useAppStore } from '@/lib/store';
import type { Passage } from '@/lib/types';

type TrainingQuestionClientProps = {
  passage: Passage;
};

export function TrainingQuestionClient({ passage }: TrainingQuestionClientProps) {
  const setTrainingResult = useAppStore((s) => s.setTrainingResult);

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
      confirmTitle="回答を確定します"
      confirmDescription="次に進むと戻れません。よろしいですか？"
      confirmLabel="解説へ"
      confirmHref={`/training/${passage.id}/explanation`}
      submitLabel="回答を確定する"
      onSubmit={handleSubmit}
    />
  );
}
