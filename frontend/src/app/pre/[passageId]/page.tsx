import { PassageQuestionClient } from '@/components/page-views/passage-question-client';
import { mockPrePassages } from '@/lib/mock-data';

export const dynamicParams = false;

export function generateStaticParams() {
  return mockPrePassages.map((p) => ({ passageId: p.id }));
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

  const currentIndex = mockPrePassages.findIndex((p) => p.id === passageId);
  const nextPassage = currentIndex >= 0 ? mockPrePassages[currentIndex + 1] : undefined;
  const confirmHref = nextPassage ? `/pre/${nextPassage.id}` : '/pre/complete';
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
