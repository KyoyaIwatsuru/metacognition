export const dynamicParams = false;

export function generateStaticParams() {
  return [{ passageId: 'sample' }];
}

type PageProps = {
  params: Promise<{ passageId: string }>;
};

export default async function TrainingMetacogFeedbackPage({ params }: PageProps) {
  const { passageId } = await params;

  return (
    <main className="space-y-3 p-8">
      <h1 className="text-2xl font-semibold">Training Metacognitive Feedback (placeholder)</h1>
      <p className="text-sm text-zinc-600">passage: {passageId}</p>
      <p className="text-sm text-zinc-600">
        TODO:
        B群のみ表示。一般解説の後・類題前にメタ認知的フィードバックを提示し、次のステップへ進むボタンを置く。
      </p>
    </main>
  );
}
