'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { PassageBody } from '@/components/passage/passage-body';
import { ConfirmNavigateButton } from '@/components/navigation/confirm-navigate-button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { logEvent } from '@/lib/logger';
import { useAppStore } from '@/lib/store';
import type { Analog, Passage } from '@/lib/types';

const CHOICE_LABELS = ['A', 'B', 'C', 'D'] as const;

type AnalogExplanationClientProps = {
  passage: Passage;
  analog: Analog;
};

export function AnalogExplanationClient({ passage, analog }: AnalogExplanationClientProps) {
  const [locale, setLocale] = useState<'en' | 'ja'>('en');
  const [selectedQuestion, setSelectedQuestion] = useState('0');
  const group = useAppStore((s) => s.group);

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
  const confirmLabel = nextAnalog ? '次の類題へ' : '振り返り2へ';

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

  // Group B: メタ認知付き（タブで問題切り替え）
  if (group === 'B') {
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
            <div
              className={`flex-1 mt-2 ${locale === 'ja' ? 'overflow-y-auto' : 'overflow-hidden'}`}
            >
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
                return (
                  <div key={q.id} className="space-y-2 h-full">
                    <div className="text-sm">
                      <span className="font-semibold">Q{idx + 1}</span>{' '}
                      {locale === 'en' ? q.promptEn : (q.promptJa ?? q.promptEn)}
                    </div>

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

  // Group A: 通常解説（スクロール可）
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
        <div className="space-y-4 overflow-y-auto h-full">
          {analog.questions.map((q, idx) => (
            <div key={q.id} className="space-y-1">
              <div className="text-sm">
                <span className="font-semibold">Q{idx + 1}</span>{' '}
                {locale === 'en' ? q.promptEn : (q.promptJa ?? q.promptEn)}
              </div>

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

              {q.explanationGeneralJa ? (
                <p className="text-sm text-slate-800 mt-1 whitespace-pre-line">
                  {q.explanationGeneralJa}
                </p>
              ) : null}
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
