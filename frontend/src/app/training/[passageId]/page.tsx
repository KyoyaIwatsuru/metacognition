import { PassageQuestionClient } from '@/components/page-views/passage-question-client';
import { mockTrainingPassages } from '@/lib/mock-data';

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ passageId: 'tr_01' }];
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

  return (
    <PassageQuestionClient
      passage={passage}
      showJapanese
      confirmTitle="回答を確定します"
      confirmDescription="次に進むと戻れません。よろしいですか？"
      confirmLabel="確定して進む"
      submitLabel="回答を確定する"
    />
  );
}
