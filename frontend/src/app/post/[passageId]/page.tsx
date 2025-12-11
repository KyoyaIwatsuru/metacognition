export const dynamicParams = false;

export function generateStaticParams() {
  return [{ passageId: 'sample' }];
}

type PageProps = {
  params: Promise<{ passageId: string }>;
};

export default async function PostPassagePage({ params }: PageProps) {
  const { passageId } = await params;

  return (
    <main className="space-y-3 p-8">
      <h1 className="text-2xl font-semibold">Post-test Passage (placeholder)</h1>
      <p className="text-sm text-zinc-600">passage: {passageId}</p>
      <p className="text-sm text-zinc-600">
        TODO:
        左カラムに本文、右カラムにこの本文に対する全設問（ラジオ）とタイマー・回答確定・次の文章へボタン。
      </p>
    </main>
  );
}
