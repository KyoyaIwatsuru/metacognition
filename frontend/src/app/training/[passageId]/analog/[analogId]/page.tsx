export const dynamicParams = false;

export function generateStaticParams() {
  return [{ passageId: 'sample', analogId: 'a1' }];
}

type PageProps = {
  params: Promise<{ passageId: string; analogId: string }>;
};

export default async function AnalogQuestionPage({ params }: PageProps) {
  const { passageId, analogId } = await params;

  return (
    <main className="space-y-3 p-8">
      <h1 className="text-2xl font-semibold">Analog Question (placeholder)</h1>
      <p className="text-sm text-zinc-600">passage: {passageId}</p>
      <p className="text-sm text-zinc-600">analog: {analogId}</p>
      <p className="text-sm text-zinc-600">TODO: 類題の英語本文＋設問/選択肢（英語のみ）。</p>
    </main>
  );
}
