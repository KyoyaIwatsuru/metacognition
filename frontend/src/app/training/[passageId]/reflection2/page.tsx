export const dynamicParams = false;

export function generateStaticParams() {
  return [{ passageId: 'sample' }];
}

type PageProps = {
  params: Promise<{ passageId: string }>;
};

export default async function TrainingReflection2Page({ params }: PageProps) {
  const { passageId } = await params;

  return (
    <main className="space-y-3 p-8">
      <h1 className="text-2xl font-semibold">Training Reflection 2 (placeholder)</h1>
      <p className="text-sm text-zinc-600">passage: {passageId}</p>
      <p className="text-sm text-zinc-600">
        TODO: 類題3問後の振り返り入力（英日表示＋回答/正答ハイライト）。
      </p>
    </main>
  );
}
