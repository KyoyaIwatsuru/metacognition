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

export default async function AnalogExplanationPage({ params }: PageProps) {
  const { passageId, analogId } = await params;

  return (
    <AppShell
      leftSlot={
        <>
          <h1 className="text-2xl font-semibold">Analog Explanation (placeholder)</h1>
          <p className="text-sm text-zinc-600">passage: {passageId}</p>
          <p className="text-sm text-zinc-600">analog: {analogId}</p>
          <div className="rounded-md border bg-card p-4 text-sm text-muted-foreground">
            類題本文プレースホルダー（英語のみ表示）
          </div>
        </>
      }
      rightSlot={
        <div className="space-y-3">
          <div className="text-sm text-muted-foreground">
            類題解説エリア（英日表示＋回答/正答ハイライト、A/Bで解説差分）
          </div>
          <div className="rounded-md border bg-card p-4 text-sm text-muted-foreground">
            TODO: 類題解説コンテンツ
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
