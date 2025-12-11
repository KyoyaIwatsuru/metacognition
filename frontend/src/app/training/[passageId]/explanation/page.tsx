export const dynamicParams = false;

export function generateStaticParams() {
  return [{ passageId: 'sample' }];
}

type PageProps = {
  params: Promise<{ passageId: string }>;
};

export default async function TrainingExplanationPage({ params }: PageProps) {
  const { passageId } = await params;

  return (
    <main className="space-y-3 p-8">
      <h1 className="text-2xl font-semibold">Training Explanation (placeholder)</h1>
      <p className="text-sm text-zinc-600">passage: {passageId}</p>
      <p className="text-sm text-zinc-600">
        TODO: 英日の設問/選択肢、回答/正答ハイライト、A/B解説差分。
      </p>
    </main>
  );
}
