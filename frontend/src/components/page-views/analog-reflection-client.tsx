'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { ConfirmNavigateButton } from '@/components/navigation/confirm-navigate-button';
import { PassageBody } from '@/components/passage/passage-body';
import { ReflectionForm } from '@/components/reflection/reflection-form';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { logEvent } from '@/lib/logger';
import { captureScreen } from '@/lib/capture';
import { useAppStore } from '@/lib/store';
import type { Analog, Passage } from '@/lib/types';

const CHOICE_LABELS = ['A', 'B', 'C', 'D'] as const;
const EMPTY_RESULT: Record<string, string | undefined> = {};

type AnalogReflectionClientProps = {
  passage: Passage;
  analogs: Analog[];
  confirmTitle: string;
  confirmDescription: string;
  confirmLabel: string;
  confirmHref: string;
};

const defaultPrompt = (
  <>
    <p>この3問を通してどういったところを意識しましたか？気をつけたところはありますか？</p>
    <p>自由に書いてください。</p>
  </>
);

export function AnalogReflectionClient({
  passage,
  analogs,
  confirmTitle,
  confirmDescription,
  confirmLabel,
  confirmHref,
}: AnalogReflectionClientProps) {
  const [locale, setLocale] = useState<'en' | 'ja'>('en');
  const [selectedAnalog, setSelectedAnalog] = useState('0');
  const [value, setValue] = useState('');
  const startedRef = useRef(false);
  const loggedOpenRef = useRef(false);
  const loggedExitRef = useRef(false);

  useEffect(() => {
    if (!loggedOpenRef.current) {
      captureScreen();
      logEvent({ event: 'reflection2_open', passage_id: passage.id });
      loggedOpenRef.current = true;
    }
    return () => {
      if (!loggedExitRef.current) {
        logEvent({ event: 'reflection2_exit', passage_id: passage.id });
        loggedExitRef.current = true;
      }
    };
  }, [passage.id]);

  const handleTypingStart = () => {
    if (!startedRef.current) {
      startedRef.current = true;
      logEvent({ event: 'reflection2_typing_start', passage_id: passage.id });
    }
  };

  const handleSubmit = () => {
    logEvent({
      event: 'reflection2_submit',
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

  const handleAnalogTabChange = (newAnalog: string) => {
    setSelectedAnalog(newAnalog);
    logEvent({
      event: 'analog_tab_click',
      passage_id: passage.id,
      analog_index: Number(newAnalog),
    });
  };

  const currentAnalog = analogs[Number(selectedAnalog)];
  const paragraphs = useMemo(
    () => currentAnalog?.paragraphsEn ?? [],
    [currentAnalog?.paragraphsEn]
  );

  // Get analog results from store
  const analogResult = useAppStore(
    (s) => (currentAnalog ? s.analogResults[currentAnalog.id] : undefined) ?? EMPTY_RESULT
  );

  if (!currentAnalog) return null;

  // ヘッダー用言語ドロップダウン
  const headerLocaleDropdown = (
    <Select value={locale} onValueChange={handleLocaleChange}>
      <SelectTrigger size="sm" className="w-24 font-semibold">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="ja">日本語</SelectItem>
      </SelectContent>
    </Select>
  );

  return (
    <AppShell
      headerSlot={headerLocaleDropdown}
      leftSlot={
        <div className="h-full overflow-hidden">
          <div className={`h-full ${locale === 'ja' ? 'overflow-y-auto' : 'overflow-hidden'}`}>
            <PassageBody
              sections={currentAnalog.sections}
              paragraphsEn={paragraphs}
              direction={currentAnalog.direction}
              directionJa={currentAnalog.directionJa}
              locale={locale}
            />
          </div>
        </div>
      }
      rightSlot={
        <div className="h-full flex flex-col overflow-hidden">
          {/* 問題タブ */}
          <div className="shrink-0">
            <Tabs value={selectedAnalog} onValueChange={handleAnalogTabChange}>
              <TabsList>
                {analogs.map((_, idx) => (
                  <TabsTrigger key={idx} value={String(idx)}>
                    問題{idx + 1}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* 選択された問題の内容 */}
          <div className="flex-1 mt-2 overflow-y-auto">
            <div className="space-y-4">
              {currentAnalog.questions.map((q, idx) => {
                const userAnswer = analogResult[q.id];
                const isUnanswered = !userAnswer;
                return (
                  <div key={q.id} className="space-y-1">
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
                  </div>
                );
              })}

              {/* 振り返り欄 */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <ReflectionForm
                  prompt={defaultPrompt}
                  value={value}
                  onChange={setValue}
                  onSubmit={handleSubmit}
                  onTypingStart={handleTypingStart}
                  submitLabel="送信"
                  showSubmitButton={false}
                />
              </div>
            </div>
          </div>
        </div>
      }
      footer={
        <ConfirmNavigateButton
          href={confirmHref}
          title={confirmTitle}
          description={confirmDescription}
          confirmLabel={confirmLabel}
          triggerLabel={confirmLabel}
          onConfirm={handleSubmit}
        />
      }
    />
  );
}
