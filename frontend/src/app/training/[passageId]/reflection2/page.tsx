import { TrainingReflectionClient } from '@/components/page-views/training-reflection-client';
import { mockTrainingPassages } from '@/lib/mock-data';
import { useAppStore } from '@/lib/store';

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ passageId: 'tr_01' }];
}

type PageProps = {
  params: { passageId: string };
};

export default async function TrainingReflection2Page({ params }: PageProps) {
  const { passageId } = await params;
  const passage = mockTrainingPassages.find((p) => p.id === passageId);
  const trainingResult = useAppStore.getState().trainingResults[passageId];

  if (!passage || trainingResult?.allCorrect) return null;

  return (
    <TrainingReflectionClient
      passage={passage}
      questions={passage.questions}
      confirmTitle="次へ進みます"
      confirmDescription="戻ることはできません。よろしいですか？"
      confirmLabel="完了へ"
      confirmHref="/training/complete"
      submitLabel="送信"
      eventPrefix="reflection2"
    />
  );
}
