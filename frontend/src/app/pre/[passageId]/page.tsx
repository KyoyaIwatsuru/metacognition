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
  const confirmLabel = nextPassage ? '次の問題へ' : 'テストを終了する';
  const confirmTitle = nextPassage ? '次の問題に進みます' : 'テストを終了します';
  const confirmDescription = nextPassage
    ? '戻ることはできません。よろしいですか？'
    : 'テストを終了します。戻ることはできません。よろしいですか？';

  // 1問あたり1.5分
  const timerMs = passage.questions.length * 1.5 * 60 * 1000;

  return (
    <PassageQuestionClient
      passage={passage}
      showJapanese={false}
      timerMs={timerMs}
      confirmTitle={confirmTitle}
      confirmDescription={confirmDescription}
      confirmLabel={confirmLabel}
      confirmHref={confirmHref}
      submitLabel="解答を確定する"
    />
  );
}
