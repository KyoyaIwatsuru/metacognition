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

export default async function TrainingReflection2Page({ params }: PageProps) {
  const { passageId } = await params;

  return (
    <AppShell
      leftSlot={
        <>
          <h1 className="text-2xl font-semibold">Training Reflection 2 (placeholder)</h1>
          <p className="text-sm text-zinc-600">passage: {passageId}</p>
          <div className="rounded-md border bg-card p-4 text-sm text-muted-foreground">
            本文プレースホルダー（英語のみ表示）
          </div>
        </>
      }
      rightSlot={
        <div className="space-y-3">
          <div className="text-sm text-muted-foreground">
            設問/選択肢表示＋回答/正答ハイライト＋振り返りテキストエリア（類題後）
          </div>
          <div className="rounded-md border bg-card p-4 text-sm text-muted-foreground">
            TODO: 振り返り入力（Reflection 2）
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
