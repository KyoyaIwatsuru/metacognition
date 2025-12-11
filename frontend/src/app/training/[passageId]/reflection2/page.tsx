import { TrainingReflectionClient } from '@/components/page-views/training-reflection-client';
import { mockTrainingPassages } from '@/lib/mock-data';

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

  if (!passage) return null;

  return (
    <TrainingReflectionClient
      passage={passage}
      questions={passage.questions}
      title="Training Reflection 2"
      confirmTitle="次へ進みます"
      confirmDescription="戻ることはできません。よろしいですか？"
      confirmLabel="次へ"
      submitLabel="送信"
      eventPrefix="reflection2"
    />
  );
}
