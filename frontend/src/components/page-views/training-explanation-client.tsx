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
const EMPTY_TRAINING_RESULT = {
  allCorrect: false,
  answers: {} as Record<string, string | undefined>,
};

type TrainingExplanationClientProps = {
  passage: Passage;
};

export function TrainingExplanationClient({ passage }: TrainingExplanationClientProps) {
  const [locale, setLocale] = useState<'en' | 'ja'>('en');

  const trainingResult = useAppStore((s) => s.trainingResults[passage.id] ?? EMPTY_TRAINING_RESULT);
  const allCorrect = trainingResult.allCorrect;
  const nextHref = allCorrect ? '/training/complete' : `/training/${passage.id}/reflection1`;
  const confirmLabel = allCorrect ? 'Practiceを終了する' : '振り返りへ';
  const confirmTitle = allCorrect ? 'Practiceを終了します' : '次へ進みます';
  const confirmDescription = allCorrect
    ? 'Practiceを終了します。戻ることはできません。よろしいですか？'
    : '戻ることはできません。よろしいですか？';

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
                {(() => {
                  const userAnswer = trainingResult.answers[q.id];
                  const isUnanswered = !userAnswer;
                  return (
                    <>
                      <div className="text-sm text-foreground">
                        <span className="font-semibold">Q{idx + 1}</span>{' '}
                        {locale === 'en' ? q.promptEn : (q.promptJa ?? q.promptEn)}
                        {isUnanswered ? (
                          <span className="ml-2 rounded bg-zinc-500 px-2 py-0.5 text-xs text-white font-bold">
                            未回答
                          </span>
                        ) : null}
                      </div>

                      {/* 選択肢 */}
                      <ul className="space-y-0.5 text-sm">
                        {q.choices.map((c, cIdx) => {
                          const isCorrect = c.id === q.correctChoiceId;
                          const isUserAnswer = c.id === userAnswer;
                          const isWrongAnswer = isUserAnswer && !isCorrect;
                          return (
                            <li
                              key={c.id}
                              className={
                                isCorrect
                                  ? 'text-blue-600 font-medium'
                                  : isWrongAnswer
                                    ? 'text-red-600'
                                    : ''
                              }
                            >
                              <span className="font-mono mr-1">({CHOICE_LABELS[cIdx]})</span>
                              {locale === 'en' ? c.textEn : (c.textJa ?? c.textEn)}
                              {isCorrect ? (
                                <span className="ml-2 rounded bg-blue-600 px-2 py-0.5 text-xs text-white font-bold">
                                  正解
                                </span>
                              ) : null}
                              {isUserAnswer ? (
                                <span
                                  className={`ml-2 rounded px-2 py-0.5 text-xs text-white font-bold ${isCorrect ? 'bg-blue-600' : 'bg-red-600'}`}
                                >
                                  あなたの回答
                                </span>
                              ) : null}
                            </li>
                          );
                        })}
                      </ul>
                    </>
                  );
                })()}

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
          title={confirmTitle}
          description={confirmDescription}
          confirmLabel={confirmLabel}
          triggerLabel={confirmLabel}
        />
      }
    />
  );
}
