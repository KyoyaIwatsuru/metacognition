'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { ConfirmNavigateButton } from '@/components/navigation/confirm-navigate-button';
import { PassageBody } from '@/components/passage/passage-body';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { logEvent } from '@/lib/logger';
import { useAppStore } from '@/lib/store';
import type { Passage } from '@/lib/types';

const CHOICE_LABELS = ['A', 'B', 'C', 'D'] as const;

type TrainingExplanationClientProps = {
  passage: Passage;
};

export function TrainingExplanationClient({ passage }: TrainingExplanationClientProps) {
  const [locale, setLocale] = useState<'en' | 'ja'>('en');

  const trainingResult = useAppStore(
    (s) => s.trainingResults[passage.id] ?? { allCorrect: false, answers: {} }
  );
  const allCorrect = trainingResult.allCorrect;
  const nextHref = allCorrect ? '/training/complete' : `/training/${passage.id}/reflection1`;
  const confirmLabel = allCorrect ? '完了へ' : '振り返りへ';

  const paragraphs = useMemo(() => passage.paragraphsEn ?? [], [passage.paragraphsEn]);
  const loggedOpenRef = useRef(false);
  const loggedExitRef = useRef(false);

  const handleLocaleChange = (newLocale: string) => {
    setLocale(newLocale as 'en' | 'ja');
    logEvent({
      event: 'locale_tab_click',
      passage_id: passage.id,
      locale: newLocale,
    });
  };

  useEffect(() => {
    if (!loggedOpenRef.current) {
      logEvent({ event: 'training_explanation_open', passage_id: passage.id });
      loggedOpenRef.current = true;
    }
    return () => {
      if (!loggedExitRef.current) {
        logEvent({ event: 'training_explanation_exit', passage_id: passage.id });
        loggedExitRef.current = true;
      }
    };
  }, [passage.id]);

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
          {passage.questions.map((q, idx) => {
            return (
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

                {/* 解説 */}
                {q.explanationGeneralJa ? (
                  <p className="text-sm text-slate-800 mt-1 whitespace-pre-line">
                    {q.explanationGeneralJa}
                  </p>
                ) : null}
              </div>
            );
          })}
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
