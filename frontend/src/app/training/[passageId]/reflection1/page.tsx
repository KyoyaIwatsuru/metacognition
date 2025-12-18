import { TrainingReflection1View } from '@/components/page-views/training-reflection1-view';
import { mockTrainingPassages } from '@/lib/mock-data';

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ passageId: 'tr_01' }, { passageId: 'tr_02' }, { passageId: 'tr_03' }];
}

type PageProps = {
  params: { passageId: string };
};

export default async function TrainingReflection1Page({ params }: PageProps) {
  const { passageId } = await params;
  const passage = mockTrainingPassages.find((p) => p.id === passageId);

  if (!passage) return null;

  return <TrainingReflection1View passage={passage} />;
}
