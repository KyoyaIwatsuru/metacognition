import { AnalogReflectionClient } from '@/components/page-views/analog-reflection-client';
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

  // Skip if passage not found, no analogs, or all correct
  if (!passage || !passage.analogs?.length || trainingResult?.allCorrect) {
    return null;
  }

  return (
    <AnalogReflectionClient
      passage={passage}
      analogs={passage.analogs}
      confirmTitle="Practiceを終了します"
      confirmDescription="Practiceを終了します。戻ることはできません。よろしいですか？"
      confirmLabel="Practiceを終了する"
      confirmHref="/training/complete"
    />
  );
}
