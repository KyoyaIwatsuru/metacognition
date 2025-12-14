import { TrainingQuestionClient } from '@/components/page-views/training-question-client';
import { mockTrainingPassages } from '@/lib/mock-data';

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ passageId: 'tr_01' }, { passageId: 'tr_02' }];
}

type PageProps = {
  params: { passageId: string };
};

export default async function TrainingPassagePage({ params }: PageProps) {
  const { passageId } = await params;
  const passage = mockTrainingPassages.find((p) => p.id === passageId);

  if (!passage) {
    return null;
  }

  return <TrainingQuestionClient passage={passage} />;
}
