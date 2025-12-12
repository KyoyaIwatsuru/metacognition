'use client';

import { useEffect, useRef, useState } from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { Button } from '@/components/ui/button';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { ConfirmNavigateButton } from '@/components/navigation/confirm-navigate-button';
import { ReflectionForm } from '@/components/reflection/reflection-form';
import { logEvent } from '@/lib/logger';
import type { Passage, Question } from '@/lib/types';

type TrainingReflectionClientProps = {
  passage: Passage;
  questions: Question[];
  title: string;
  confirmTitle: string;
  confirmDescription: string;
  confirmLabel: string;
  submitLabel?: string;
  confirmHref?: string;
  eventPrefix: 'reflection1' | 'reflection2';
};

const defaultPrompt = (
  <>
    <p>
      この問題と解説を通して、読み方や考え方について気づいたことがあれば、自由に書いてください。
    </p>
    <p>
      うまくいった点・うまくいかなかった点、今後気をつけたいと思ったことなど、どんな内容でもかまいません。
    </p>
  </>
);

export function TrainingReflectionClient({
  passage,
  questions,
  title,
  confirmTitle,
  confirmDescription,
  confirmLabel,
  submitLabel = '送信',
  confirmHref,
  eventPrefix,
}: TrainingReflectionClientProps) {
  const [value, setValue] = useState('');
  const startedRef = useRef(false);

  useEffect(() => {
    logEvent({ event: `${eventPrefix}_open`, passage_id: passage.id });
    return () => {
      logEvent({ event: `${eventPrefix}_exit`, passage_id: passage.id });
    };
  }, [eventPrefix, passage.id]);

  const handleTypingStart = () => {
    if (!startedRef.current) {
      startedRef.current = true;
      logEvent({ event: `${eventPrefix}_typing_start`, passage_id: passage.id });
    }
  };

  const handleSubmit = () => {
    logEvent({
      event: `${eventPrefix}_submit`,
      passage_id: passage.id,
      content: value,
    });
    // 入力が空でも送信扱いとし、再送を防ぐため started フラグだけ維持
  };

  return (
    <AppShell
      leftSlot={
        <>
          <h1 className="text-2xl font-semibold">{title}</h1>
          <p className="text-sm text-zinc-600">passage: {passage.id}</p>
          <div className="space-y-3 rounded-md border bg-card p-4 text-sm text-muted-foreground whitespace-pre-line">
            {passage.paragraphsEn.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </>
      }
      rightSlot={
        <div className="space-y-4">
          {questions.map((q, idx) => (
            <div key={q.id} className="space-y-1 rounded-md border bg-card p-4">
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
            </div>
          ))}
          <ReflectionForm
            prompt={defaultPrompt}
            value={value}
            onChange={setValue}
            onSubmit={handleSubmit}
            onTypingStart={handleTypingStart}
            submitLabel={submitLabel}
            showSubmitButton={false}
          />
        </div>
      }
      footer={
        confirmHref ? (
          <ConfirmNavigateButton
            href={confirmHref}
            title={confirmTitle}
            description={confirmDescription}
            confirmLabel={confirmLabel}
            triggerLabel={confirmLabel}
            onConfirm={handleSubmit}
          />
        ) : (
          <ConfirmDialog
            title={confirmTitle}
            description={confirmDescription}
            confirmLabel={confirmLabel}
            onConfirm={handleSubmit}
          >
            <Button>{confirmLabel}</Button>
          </ConfirmDialog>
        )
      }
    />
  );
}
