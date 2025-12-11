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

export default async function TrainingReflection1Page({ params }: PageProps) {
  const { passageId } = await params;

  return (
    <AppShell
      leftSlot={
        <>
          <h1 className="text-2xl font-semibold">Training Reflection 1 (placeholder)</h1>
          <p className="text-sm text-zinc-600">passage: {passageId}</p>
          <div className="rounded-md border bg-card p-4 text-sm text-muted-foreground">
            本文プレースホルダー（英語のみ表示）
          </div>
        </>
      }
      rightSlot={
        <div className="space-y-3">
          <div className="text-sm text-muted-foreground">
            設問/選択肢表示＋回答/正答ハイライト＋振り返りテキストエリア
          </div>
          <div className="rounded-md border bg-card p-4 text-sm text-muted-foreground">
            TODO: 振り返り入力（Reflection 1）
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
