import { AppShell } from '@/components/layout/app-shell';
import { Button } from '@/components/ui/button';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';

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
    <AppShell
      leftSlot={
        <>
          <h1 className="text-2xl font-semibold">Analog Question (placeholder)</h1>
          <p className="text-sm text-zinc-600">passage: {passageId}</p>
          <p className="text-sm text-zinc-600">analog: {analogId}</p>
          <div className="rounded-md border bg-card p-4 text-sm text-muted-foreground">
            類題の本文プレースホルダー（英語のみ表示）
          </div>
        </>
      }
      rightSlot={
        <div className="space-y-3">
          <div className="text-sm text-muted-foreground">設問エリア（ラジオ・タイマーを置く）</div>
          <div className="rounded-md border bg-card p-4 text-sm text-muted-foreground">
            TODO: 類題設問リスト・タイマー・回答確定・次の類題へ
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
