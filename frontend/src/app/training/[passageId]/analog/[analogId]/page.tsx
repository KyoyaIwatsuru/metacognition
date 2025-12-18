import { AnalogQuestionClient } from '@/components/page-views/analog-question-client';
import { mockTrainingPassages } from '@/lib/mock-data';

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    { passageId: 'tr_01', analogId: 'tr_01_an1' },
    { passageId: 'tr_01', analogId: 'tr_01_an2' },
    { passageId: 'tr_01', analogId: 'tr_01_an3' },
    { passageId: 'tr_02', analogId: 'tr_02_an1' },
    { passageId: 'tr_02', analogId: 'tr_02_an2' },
    { passageId: 'tr_02', analogId: 'tr_02_an3' },
    { passageId: 'tr_03', analogId: 'tr_03_an1' },
    { passageId: 'tr_03', analogId: 'tr_03_an2' },
    { passageId: 'tr_03', analogId: 'tr_03_an3' },
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
      confirmTitle="解答を確定します"
      confirmDescription="戻ることはできません。よろしいですか？"
      confirmLabel="解答する"
      confirmHref={`/training/${passage.id}/analog/${analog.id}/explanation`}
      submitLabel="解答を確定する"
    />
  );
}
