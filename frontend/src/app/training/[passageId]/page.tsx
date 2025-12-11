export const dynamicParams = false;

export function generateStaticParams() {
  return [{ passageId: 'sample' }];
}

type PageProps = {
  params: Promise<{ passageId: string }>;
};

export default async function TrainingPassagePage({ params }: PageProps) {
  const { passageId } = await params;

  return (
    <main className="space-y-3 p-8">
      <h1 className="text-2xl font-semibold">Training Passage (placeholder)</h1>
      <p className="text-sm text-zinc-600">passage: {passageId}</p>
      <p className="text-sm text-zinc-600">
        TODO: 左カラムに本文、右カラムに全設問（ラジオ）＋タイマー。一括回答確定後に解説へ進む。
      </p>
    </main>
  );
}
