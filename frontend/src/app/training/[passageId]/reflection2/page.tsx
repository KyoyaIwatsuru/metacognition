import { AnalogReflectionClient } from '@/components/page-views/analog-reflection-client';
import { mockTrainingPassages } from '@/lib/mock-data';

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ passageId: 'tr_01' }, { passageId: 'tr_02' }, { passageId: 'tr_03' }];
}

type PageProps = {
  params: { passageId: string };
};

export default async function TrainingReflection2Page({ params }: PageProps) {
  const { passageId } = await params;
  const passage = mockTrainingPassages.find((p) => p.id === passageId);

  // Skip if passage not found or no analogs
  if (!passage || !passage.analogs?.length) {
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
