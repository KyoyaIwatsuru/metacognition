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

export default async function TrainingExplanationPage({ params }: PageProps) {
  const { passageId } = await params;

  return (
    <AppShell
      leftSlot={
        <>
          <h1 className="text-2xl font-semibold">Training Explanation (placeholder)</h1>
          <p className="text-sm text-zinc-600">passage: {passageId}</p>
          <div className="rounded-md border bg-card p-4 text-sm text-muted-foreground">
            本文プレースホルダー（英語のみ表示）
          </div>
        </>
      }
      rightSlot={
        <div className="space-y-3">
          <div className="text-sm text-muted-foreground">
            解説エリア（英日表示、回答ハイライト）
          </div>
          <div className="rounded-md border bg-card p-4 text-sm text-muted-foreground">
            TODO: 解説文、回答/正答ハイライト、A/B差分
          </div>
        </div>
      }
      footer={
        <ConfirmDialog
          title="次へ進みます"
          description="戻ることはできません。よろしいですか？"
          confirmLabel="次へ"
        >
          <Button>次へ</Button>
        </ConfirmDialog>
      }
    />
  );
}
