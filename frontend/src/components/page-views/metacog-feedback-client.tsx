'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppShell } from '@/components/layout/app-shell';
import { ConfirmNavigateButton } from '@/components/navigation/confirm-navigate-button';
import { PassageBody } from '@/components/passage/passage-body';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { logEvent } from '@/lib/logger';
import { captureScreen } from '@/lib/capture';
import { useAppStore } from '@/lib/store';
import type { Passage } from '@/lib/types';

const CHOICE_LABELS = ['A', 'B', 'C', 'D'] as const;

type MetacogFeedbackClientProps = {
  passage: Passage;
};

export function MetacogFeedbackClient({ passage }: MetacogFeedbackClientProps) {
  const [locale, setLocale] = useState<'en' | 'ja'>('en');
  const [selectedQuestion, setSelectedQuestion] = useState('0');
  const group = useAppStore((s) => s.group);
  const trainingResult = useAppStore((s) => s.trainingResults[passage.id]);
  const router = useRouter();
  const loggedOpenRef = useRef(false);
  const loggedExitRef = useRef(false);

  const firstAnalogId = passage.analogs?.[0]?.id;
  const analogHref = firstAnalogId
    ? `/training/${passage.id}/analog/${firstAnalogId}`
    : `/training/${passage.id}/reflection2`;
  const nextLabel = firstAnalogId ? '次へ' : '振り返りへ';

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
        captureScreen();
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

  const handleLocaleChange = (newLocale: string) => {
    setLocale(newLocale as 'en' | 'ja');
    logEvent({
      event: 'locale_tab_click',
      passage_id: passage.id,
      locale: newLocale,
    });
  };

  const handleQuestionTabChange = (newQuestion: string) => {
    setSelectedQuestion(newQuestion);
    logEvent({
      event: 'question_tab_click',
      passage_id: passage.id,
      question_index: Number(newQuestion),
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
        <div className="h-full flex flex-col overflow-hidden">
          {/* 問題タブ */}
          <Tabs
            value={selectedQuestion}
            onValueChange={handleQuestionTabChange}
            className="shrink-0"
          >
            <TabsList>
              {passage.questions.map((_, idx) => (
                <TabsTrigger key={idx} value={String(idx)}>
                  Q{idx + 1}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {/* 選択された問題の内容 */}
          <div className="flex-1 mt-2 overflow-hidden">
            {passage.questions.map((q, idx) => {
              if (String(idx) !== selectedQuestion) return null;
              const userAnswer = trainingResult?.answers[q.id];
              const isUnanswered = !userAnswer;
              return (
                <div key={q.id} className="space-y-2 h-full">
                  {/* 設問 */}
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
                              あなたの解答
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

                  {/* メタ認知フィードバック */}
                  {group === 'B' && q.metacogFeedbackJa ? (
                    <div className="text-sm text-slate-800 mt-4 space-y-1">
                      {q.metacogFeedbackJa.split('\n\n').map((para, pIdx) => (
                        <p key={pIdx} className="whitespace-pre-line leading-snug">
                          {para}
                        </p>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      }
      footer={
        <ConfirmNavigateButton
          href={analogHref}
          title="次へ進みます"
          description="戻ることはできません。よろしいですか？"
          confirmLabel={nextLabel}
          triggerLabel={nextLabel}
        />
      }
    />
  );
}
