import { PassageQuestionClient } from '@/components/page-views/passage-question-client';
import { mockPrePassages } from '@/lib/mock-data';

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ passageId: 'pre_01' }];
}

type PageProps = {
  params: { passageId: string };
};

export default async function PrePassagePage({ params }: PageProps) {
  const { passageId } = await params;
  const passage = mockPrePassages.find((p) => p.id === passageId);

  if (!passage) {
    return null;
  }

  return (
    <PassageQuestionClient
      passage={passage}
      showJapanese={false}
      confirmTitle="次の文章に進みます"
      confirmDescription="戻ることはできません。よろしいですか？"
      confirmLabel="進む"
      submitLabel="回答を確定する"
    />
  );
}
