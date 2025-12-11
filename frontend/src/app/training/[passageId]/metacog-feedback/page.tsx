import { AppShell } from '@/components/layout/app-shell';
import { Button } from '@/components/ui/button';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';

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
    <AppShell
      leftSlot={
        <>
          <h1 className="text-2xl font-semibold">Training Metacognitive Feedback (placeholder)</h1>
          <p className="text-sm text-zinc-600">passage: {passageId}</p>
          <div className="rounded-md border bg-card p-4 text-sm text-muted-foreground">
            一般解説後・類題前に表示するメタ認知的フィードバック
          </div>
        </>
      }
      rightSlot={
        <div className="space-y-3">
          <div className="text-sm text-muted-foreground">B群のみ表示。次のステップへ進む。</div>
          <div className="rounded-md border bg-card p-4 text-sm text-muted-foreground">
            TODO: メタ認知フィードバックの内容表示
          </div>
        </div>
      }
      footer={
        <ConfirmDialog
          title="類題へ進みます"
          description="次に進むと戻れません。よろしいですか？"
          confirmLabel="進む"
        >
          <Button>次へ</Button>
        </ConfirmDialog>
      }
    />
  );
}
