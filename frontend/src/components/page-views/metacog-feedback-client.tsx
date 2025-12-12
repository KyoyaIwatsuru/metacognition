'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { AppShell } from '@/components/layout/app-shell';
import { ConfirmNavigateButton } from '@/components/navigation/confirm-navigate-button';
import { logEvent } from '@/lib/logger';
import { useAppStore } from '@/lib/store';
import type { Passage } from '@/lib/types';

type MetacogFeedbackClientProps = {
  passage: Passage;
};

export function MetacogFeedbackClient({ passage }: MetacogFeedbackClientProps) {
  const group = useAppStore((s) => s.group);
  const trainingResult = useAppStore((s) => s.trainingResults[passage.id]);
  const router = useRouter();
  const loggedOpenRef = useRef(false);
  const loggedExitRef = useRef(false);

  const firstAnalogId = passage.analogs?.[0]?.id;
  const analogHref = firstAnalogId
    ? `/training/${passage.id}/analog/${firstAnalogId}`
    : `/training/${passage.id}/reflection2`;

  useEffect(() => {
    if (trainingResult?.allCorrect) {
      router.replace('/training/complete');
      return;
    }
    if (group !== 'B') {
      logEvent({ event: 'metacog_feedback_exit', passage_id: passage.id });
      router.replace(analogHref);
    }
  }, [analogHref, group, passage.id, router, trainingResult?.allCorrect]);

  useEffect(() => {
    if (group === 'B') {
      if (!loggedOpenRef.current) {
        logEvent({ event: 'metacog_feedback_open', passage_id: passage.id });
        loggedOpenRef.current = true;
      }
      return () => {
        if (!loggedExitRef.current) {
          logEvent({ event: 'metacog_feedback_exit', passage_id: passage.id });
          loggedExitRef.current = true;
        }
      };
    }
  }, [group, passage.id]);

  const paragraphs = useMemo(() => passage.paragraphsEn ?? [], [passage.paragraphsEn]);

  return (
    <AppShell
      leftSlot={
        <>
          <h1 className="text-2xl font-semibold">Training メタ認知フィードバック</h1>
          <p className="text-sm text-zinc-600">passage: {passage.id}</p>
          <div className="space-y-3 rounded-md border bg-card p-4 text-sm text-muted-foreground whitespace-pre-line">
            {paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </>
      }
      rightSlot={
        <div className="space-y-4">
          {passage.questions.map((q, idx) => (
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
          href={analogHref}
          title="類題へ進みます"
          description="戻ることはできません。よろしいですか？"
          confirmLabel="類題へ"
        />
      }
    />
  );
}
