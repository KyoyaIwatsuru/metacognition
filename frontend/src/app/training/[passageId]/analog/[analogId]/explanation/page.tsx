import { AppShell } from '@/components/layout/app-shell';
import { Button } from '@/components/ui/button';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { mockTrainingPassages } from '@/lib/mock-data';

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    { passageId: 'tr_01', analogId: 'tr_01_an1' },
    { passageId: 'tr_01', analogId: 'tr_01_an2' },
    { passageId: 'tr_01', analogId: 'tr_01_an3' },
  ];
}

type PageProps = {
  params: { passageId: string; analogId: string };
};

export default async function AnalogExplanationPage({ params }: PageProps) {
  const { passageId, analogId } = await params;
  const passage = mockTrainingPassages.find((p) => p.id === passageId);
  const analog = passage?.analogs?.find((a) => a.id === analogId);

  if (!passage || !analog) {
    return null;
  }

  return (
    <AppShell
      leftSlot={
        <>
          <h1 className="text-2xl font-semibold">Analog Explanation</h1>
          <p className="text-sm text-zinc-600">passage: {passage.id}</p>
          <p className="text-sm text-zinc-600">analog: {analog.id}</p>
          <div className="space-y-3 rounded-md border bg-card p-4 text-sm text-muted-foreground whitespace-pre-line">
            {analog.paragraphsEn.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </>
      }
      rightSlot={
        <div className="space-y-4">
          {analog.questions.map((q, idx) => (
            <div key={q.id} className="space-y-2 rounded-md border bg-card p-4">
              <div className="text-sm font-semibold text-foreground">Q{idx + 1}</div>
              <div className="text-sm">{q.promptEn}</div>
              {q.promptJa ? (
                <div className="text-xs text-muted-foreground">{q.promptJa}</div>
              ) : null}
              <ul className="space-y-1 text-sm">
                {q.choices.map((c) => (
                  <li key={c.id}>
                    <span className="font-mono mr-1">({c.id.toUpperCase()})</span>
                    {c.textEn}
                    {c.textJa ? (
                      <span className="text-xs text-muted-foreground ml-1">{c.textJa}</span>
                    ) : null}
                    {c.id === q.correctChoiceId ? (
                      <span className="ml-2 rounded bg-emerald-100 px-2 py-0.5 text-xs text-emerald-800">
                        正答
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
              <div className="space-y-1 text-sm text-muted-foreground">
                {q.explanationGeneralJa ? (
                  <p>
                    <span className="font-semibold text-foreground">一般解説:</span>{' '}
                    {q.explanationGeneralJa}
                  </p>
                ) : null}
                {q.metacogFeedbackJa ? (
                  <p>
                    <span className="font-semibold text-foreground">メタ認知フィードバック:</span>{' '}
                    {q.metacogFeedbackJa}
                  </p>
                ) : null}
              </div>
            </div>
          ))}
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
