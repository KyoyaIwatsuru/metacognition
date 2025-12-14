import { AnalogQuestionClient } from '@/components/page-views/analog-question-client';
import { mockTrainingPassages } from '@/lib/mock-data';
import { useAppStore } from '@/lib/store';

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    { passageId: 'tr_01', analogId: 'tr_01_an1' },
    { passageId: 'tr_01', analogId: 'tr_01_an2' },
    { passageId: 'tr_01', analogId: 'tr_01_an3' },
    { passageId: 'tr_02', analogId: 'tr_02_an1' },
    { passageId: 'tr_02', analogId: 'tr_02_an2' },
    { passageId: 'tr_02', analogId: 'tr_02_an3' },
  ];
}

type PageProps = {
  params: { passageId: string; analogId: string };
};

export default async function AnalogQuestionPage({ params }: PageProps) {
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

  return (
    <AnalogQuestionClient
      passageId={passage.id}
      analog={analog}
      confirmTitle="解説へ進みます"
      confirmDescription="戻ることはできません。よろしいですか？"
      confirmLabel="解説へ"
      confirmHref={`/training/${passage.id}/analog/${analog.id}/explanation`}
      submitLabel="回答を確定する"
    />
  );
}
