'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { PassageBody } from '@/components/passage/passage-body';
import { ConfirmNavigateButton } from '@/components/navigation/confirm-navigate-button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { logEvent } from '@/lib/logger';
import { captureScreen } from '@/lib/capture';
import { useAppStore } from '@/lib/store';
import type { Analog, Passage } from '@/lib/types';

const CHOICE_LABELS = ['A', 'B', 'C', 'D'] as const;
const EMPTY_RESULT: Record<string, string | undefined> = {};

type AnalogExplanationClientProps = {
  passage: Passage;
  analog: Analog;
};

export function AnalogExplanationClient({ passage, analog }: AnalogExplanationClientProps) {
  const [locale, setLocale] = useState<'en' | 'ja'>('en');
  const [selectedQuestion, setSelectedQuestion] = useState('0');
  const group = useAppStore((s) => s.group);
  const analogResult = useAppStore((s) => s.analogResults[analog.id] ?? EMPTY_RESULT);

  const handleLocaleChange = (newLocale: string) => {
    setLocale(newLocale as 'en' | 'ja');
    logEvent({
      event: 'locale_tab_click',
      passage_id: passage.id,
      analog_id: analog.id,
      locale: newLocale,
    });
  };

  const handleQuestionTabChange = (newQuestion: string) => {
    setSelectedQuestion(newQuestion);
    logEvent({
      event: 'question_tab_click',
      passage_id: passage.id,
      analog_id: analog.id,
      question_index: Number(newQuestion),
    });
  };

  const analogIndex = passage.analogs?.findIndex((a) => a.id === analog.id) ?? -1;
  const nextAnalog = analogIndex >= 0 ? passage.analogs?.[analogIndex + 1] : undefined;
  const nextHref = nextAnalog
    ? `/training/${passage.id}/analog/${nextAnalog.id}`
    : `/training/${passage.id}/reflection2`;
  const confirmLabel = nextAnalog ? '次へ' : '振り返りへ';

  const paragraphs = useMemo(() => analog.paragraphsEn ?? [], [analog.paragraphsEn]);
  const loggedOpenRef = useRef(false);
  const loggedExitRef = useRef(false);

  useEffect(() => {
    if (!loggedOpenRef.current) {
      captureScreen();
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

  // ヘッダー用言語切り替えタブ
  const headerLocaleToggle = (
    <Tabs value={locale} onValueChange={handleLocaleChange}>
      <TabsList>
        <TabsTrigger value="en">English</TabsTrigger>
        <TabsTrigger value="ja">日本語</TabsTrigger>
      </TabsList>
    </Tabs>
  );

  // Group B: メタ認知付き（タブで問題切り替え）
  if (group === 'B') {
    return (
      <AppShell
        headerSlot={headerLocaleToggle}
        leftSlot={
          <div className="h-full overflow-hidden">
            <div className={`h-full ${locale === 'ja' ? 'overflow-y-auto' : 'overflow-hidden'}`}>
              <PassageBody
                sections={analog.sections}
                paragraphsEn={paragraphs}
                direction={analog.direction}
                directionJa={analog.directionJa}
                locale={locale}
              />
            </div>
          </div>
        }
        rightSlot={
          <div className="h-full flex flex-col overflow-hidden">
            <Tabs
              value={selectedQuestion}
              onValueChange={handleQuestionTabChange}
              className="shrink-0"
            >
              <TabsList>
                {analog.questions.map((_, idx) => (
                  <TabsTrigger key={idx} value={String(idx)}>
                    Q{idx + 1}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="flex-1 mt-2 overflow-hidden">
              {analog.questions.map((q, idx) => {
                if (String(idx) !== selectedQuestion) return null;
                const userAnswer = analogResult[q.id];
                const isUnanswered = !userAnswer;
                return (
                  <div key={q.id} className="space-y-2 h-full select-none">
                    <div className="text-sm text-foreground">
                      <span className="font-semibold">Q{idx + 1}</span>{' '}
                      {locale === 'en' ? q.promptEn : (q.promptJa ?? q.promptEn)}
                      {isUnanswered ? (
                        <span className="ml-2 rounded bg-zinc-500 px-2 py-0.5 text-xs text-white font-bold">
                          未回答
                        </span>
                      ) : null}
                    </div>

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

                    {q.explanationGeneralJa ? (
                      <p className="text-sm text-slate-800 mt-1 whitespace-pre-line">
                        {q.explanationGeneralJa}
                      </p>
                    ) : null}

                    {q.metacogFeedbackJa ? (
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

  // Group A: タブで問題を切り替えて表示（B群と同じUIだがメタ認知フィードバックなし）
  return (
    <AppShell
      headerSlot={headerLocaleToggle}
      leftSlot={
        <div className="h-full overflow-hidden">
          <div className={`h-full ${locale === 'ja' ? 'overflow-y-auto' : 'overflow-hidden'}`}>
            <PassageBody
              sections={analog.sections}
              paragraphsEn={paragraphs}
              direction={analog.direction}
              directionJa={analog.directionJa}
              locale={locale}
            />
          </div>
        </div>
      }
      rightSlot={
        <div className="h-full flex flex-col overflow-hidden">
          <Tabs
            value={selectedQuestion}
            onValueChange={handleQuestionTabChange}
            className="shrink-0"
          >
            <TabsList>
              {analog.questions.map((_, idx) => (
                <TabsTrigger key={idx} value={String(idx)}>
                  Q{idx + 1}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="flex-1 mt-2 overflow-y-auto">
            {analog.questions.map((q, idx) => {
              if (String(idx) !== selectedQuestion) return null;
              const userAnswer = analogResult[q.id];
              const isUnanswered = !userAnswer;
              return (
                <div key={q.id} className="space-y-2 select-none">
                  <div className="text-sm text-foreground">
                    <span className="font-semibold">Q{idx + 1}</span>{' '}
                    {locale === 'en' ? q.promptEn : (q.promptJa ?? q.promptEn)}
                    {isUnanswered ? (
                      <span className="ml-2 rounded bg-zinc-500 px-2 py-0.5 text-xs text-white font-bold">
                        未回答
                      </span>
                    ) : null}
                  </div>

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

                  {q.explanationGeneralJa ? (
                    <p className="text-sm text-slate-800 mt-1 whitespace-pre-line">
                      {q.explanationGeneralJa}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
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
