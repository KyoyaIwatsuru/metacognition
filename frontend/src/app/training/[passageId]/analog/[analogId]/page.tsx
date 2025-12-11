import { AnalogQuestionClient } from '@/components/page-views/analog-question-client';
import { mockTrainingPassages } from '@/lib/mock-data';

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

export default async function AnalogQuestionPage({ params }: PageProps) {
  const { passageId, analogId } = await params;
  const passage = mockTrainingPassages.find((p) => p.id === passageId);
  const analog = passage?.analogs?.find((a) => a.id === analogId);

  if (!passage || !analog) {
    return null;
  }

  return (
    <AnalogQuestionClient
      passageId={passage.id}
      analog={analog}
      confirmTitle="次の類題へ進みます"
      confirmDescription="戻ることはできません。よろしいですか？"
      confirmLabel="進む"
      submitLabel="回答を確定する"
    />
  );
}
