import { AnalogExplanationClient } from '@/components/page-views/analog-explanation-client';
import { mockTrainingPassages } from '@/lib/mock-data';
import { useAppStore } from '@/lib/store';

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    { passageId: 'tr_01', analogId: 'tr_01_an1' },
    { passageId: 'tr_01', analogId: 'tr_01_an2' },
    { passageId: 'tr_01', analogId: 'tr_01_an3' },
  ];
}

type PageProps = {
  params: { passageId: string; analogId: string };
};

export default async function AnalogExplanationPage({ params }: PageProps) {
  const { passageId, analogId } = await params;
  const passage = mockTrainingPassages.find((p) => p.id === passageId);
  const analog = passage?.analogs?.find((a) => a.id === analogId);

  if (!passage || !analog) {
    return null;
  }

  const trainingResult = useAppStore.getState().trainingResults[passage.id];
  if (trainingResult?.allCorrect) {
    return null;
  }

  return <AnalogExplanationClient passage={passage} analog={analog} />;
}
