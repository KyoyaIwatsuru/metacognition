'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { Button } from '@/components/ui/button';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { ConfirmNavigateButton } from '@/components/navigation/confirm-navigate-button';
import { ReflectionForm } from '@/components/reflection/reflection-form';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { logEvent } from '@/lib/logger';
import type { Passage, Question } from '@/lib/types';
import { PassageBody } from '@/components/passage/passage-body';

const CHOICE_LABELS = ['A', 'B', 'C', 'D'] as const;

type TrainingReflectionClientProps = {
  passage: Passage;
  questions: Question[];
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
  confirmTitle,
  confirmDescription,
  confirmLabel,
  submitLabel = '送信',
  confirmHref,
  eventPrefix,
}: TrainingReflectionClientProps) {
  const [locale, setLocale] = useState<'en' | 'ja'>('en');
  const [value, setValue] = useState('');
  const startedRef = useRef(false);
  const paragraphs = useMemo(() => passage.paragraphsEn ?? [], [passage.paragraphsEn]);

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
  };

  const handleLocaleChange = (newLocale: string) => {
    setLocale(newLocale as 'en' | 'ja');
    logEvent({
      event: 'locale_tab_click',
      passage_id: passage.id,
      locale: newLocale,
    });
  };

  return (
    <AppShell
      leftSlot={
        <div className="h-full flex flex-col overflow-hidden">
          <Tabs value={locale} onValueChange={handleLocaleChange} className="shrink-0">
            <TabsList>
              <TabsTrigger value="en">English</TabsTrigger>
              <TabsTrigger value="ja">日本語</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className={`flex-1 mt-2 ${locale === 'ja' ? 'overflow-y-auto' : 'overflow-hidden'}`}>
            <PassageBody
              sections={passage.sections}
              paragraphsEn={paragraphs}
              direction={passage.direction}
              directionJa={passage.directionJa}
              locale={locale}
            />
          </div>
        </div>
      }
      rightSlot={
        <div className="space-y-4 overflow-y-auto h-full">
          {questions.map((q, idx) => (
            <div key={q.id} className="space-y-1">
              {/* 設問 */}
              <div className="text-sm">
                <span className="font-semibold">Q{idx + 1}</span>{' '}
                {locale === 'en' ? q.promptEn : (q.promptJa ?? q.promptEn)}
              </div>

              {/* 選択肢 */}
              <ul className="space-y-0.5 text-sm">
                {q.choices.map((c, cIdx) => {
                  const isCorrect = c.id === q.correctChoiceId;
                  return (
                    <li key={c.id} className={isCorrect ? 'text-blue-600 font-medium' : ''}>
                      <span className="font-mono mr-1">({CHOICE_LABELS[cIdx]})</span>
                      {locale === 'en' ? c.textEn : (c.textJa ?? c.textEn)}
                      {isCorrect ? (
                        <span className="ml-2 rounded bg-blue-600 px-2 py-0.5 text-xs text-white font-bold">
                          正解
                        </span>
                      ) : null}
                    </li>
                  );
                })}
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
