import { TrainingReflectionClient } from '@/components/page-views/training-reflection-client';
import { mockTrainingPassages } from '@/lib/mock-data';

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ passageId: 'tr_01' }];
}

type PageProps = {
  params: { passageId: string };
};

export default async function TrainingReflection1Page({ params }: PageProps) {
  const { passageId } = await params;
  const passage = mockTrainingPassages.find((p) => p.id === passageId);

  if (!passage) return null;

  return (
    <TrainingReflectionClient
      passage={passage}
      questions={passage.questions}
      title="Training Reflection 1"
      confirmTitle="類題へ進みます"
      confirmDescription="次に進むと戻れません。よろしいですか？"
      confirmLabel="類題へ"
      confirmHref={`/training/${passage.id}/analog/${passage.analogs?.[0]?.id ?? 'tr_01_an1'}`}
      submitLabel="送信"
      eventPrefix="reflection1"
    />
  );
}
