'use client';

import { useEffect, useMemo, useRef } from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { ConfirmNavigateButton } from '@/components/navigation/confirm-navigate-button';
import { logEvent } from '@/lib/logger';
import { useAppStore } from '@/lib/store';
import type { Analog, Passage } from '@/lib/types';

type AnalogExplanationClientProps = {
  passage: Passage;
  analog: Analog;
};

export function AnalogExplanationClient({ passage, analog }: AnalogExplanationClientProps) {
  const group = useAppStore((s) => s.group);

  const analogIndex = passage.analogs?.findIndex((a) => a.id === analog.id) ?? -1;
  const nextAnalog = analogIndex >= 0 ? passage.analogs?.[analogIndex + 1] : undefined;
  const nextHref = nextAnalog
    ? `/training/${passage.id}/analog/${nextAnalog.id}`
    : `/training/${passage.id}/reflection2`;
  const confirmLabel = nextAnalog ? '次の類題へ' : 'Reflection 2 へ';

  const paragraphs = useMemo(() => analog.paragraphsEn ?? [], [analog.paragraphsEn]);
  const loggedOpenRef = useRef(false);
  const loggedExitRef = useRef(false);

  useEffect(() => {
    if (!loggedOpenRef.current) {
      logEvent({ event: 'analog_explanation_open', passage_id: passage.id, analog_id: analog.id });
      loggedOpenRef.current = true;
    }
    return () => {
      if (!loggedExitRef.current) {
        logEvent({
          event: 'analog_explanation_exit',
          passage_id: passage.id,
          analog_id: analog.id,
        });
        loggedExitRef.current = true;
      }
    };
  }, [analog.id, passage.id]);

  return (
    <AppShell
      leftSlot={
        <>
          <h1 className="text-2xl font-semibold">類題 解説</h1>
          <p className="text-sm text-zinc-600">passage: {passage.id}</p>
          <p className="text-sm text-zinc-600">analog: {analog.id}</p>
          <div className="space-y-3 rounded-md border bg-card p-4 text-sm text-muted-foreground whitespace-pre-line">
            {paragraphs.map((p, idx) => (
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
                {group === 'B' && q.metacogFeedbackJa ? (
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
        <ConfirmNavigateButton
          href={nextHref}
          title="次へ進みます"
          description="戻ることはできません。よろしいですか？"
          confirmLabel={confirmLabel}
          triggerLabel={confirmLabel}
        />
      }
    />
  );
}
