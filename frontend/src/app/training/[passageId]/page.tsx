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

export default async function TrainingPassagePage({ params }: PageProps) {
  const { passageId } = await params;

  return (
    <AppShell
      leftSlot={
        <>
          <h1 className="text-2xl font-semibold">Training Passage (placeholder)</h1>
          <p className="text-sm text-zinc-600">passage: {passageId}</p>
          <div className="rounded-md border bg-card p-4 text-sm text-muted-foreground">
            本文プレースホルダー（英語のみ表示）
          </div>
        </>
      }
      rightSlot={
        <div className="space-y-3">
          <div className="text-sm text-muted-foreground">設問エリア（ラジオ・タイマーを置く）</div>
          <div className="rounded-md border bg-card p-4 text-sm text-muted-foreground">
            TODO: 設問リスト・タイマー・回答確定・解説へ進む
          </div>
        </div>
      }
      footer={
        <ConfirmDialog
          title="回答を確定します"
          description="次に進むと戻れません。よろしいですか？"
          confirmLabel="確定して進む"
        >
          <Button>次へ</Button>
        </ConfirmDialog>
      }
    />
  );
}
