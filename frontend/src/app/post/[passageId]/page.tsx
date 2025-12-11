import { PassageQuestionClient } from '@/components/page-views/passage-question-client';
import { mockPostPassages } from '@/lib/mock-data';

export const dynamicParams = false;

export function generateStaticParams() {
  return mockPostPassages.map((p) => ({ passageId: p.id }));
}

type PageProps = {
  params: { passageId: string };
};

export default async function PostPassagePage({ params }: PageProps) {
  const { passageId } = await params;
  const passage = mockPostPassages.find((p) => p.id === passageId);

  if (!passage) {
    return null;
  }

  const currentIndex = mockPostPassages.findIndex((p) => p.id === passageId);
  const nextPassage = currentIndex >= 0 ? mockPostPassages[currentIndex + 1] : undefined;
  const confirmHref = nextPassage ? `/post/${nextPassage.id}` : '/post/complete';
  const confirmLabel = nextPassage ? '次の文章へ' : '完了へ';

  return (
    <PassageQuestionClient
      passage={passage}
      showJapanese={false}
      confirmTitle="次の文章に進みます"
      confirmDescription="戻ることはできません。よろしいですか？"
      confirmLabel={confirmLabel}
      confirmHref={confirmHref}
      submitLabel="回答を確定する"
    />
  );
}
