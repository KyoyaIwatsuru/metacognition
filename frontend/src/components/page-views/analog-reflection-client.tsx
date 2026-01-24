'use client';

import { useEffect, useRef, useState } from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { ConfirmNavigateButton } from '@/components/navigation/confirm-navigate-button';
import { PassageBody } from '@/components/passage/passage-body';
import { ReflectionForm } from '@/components/reflection/reflection-form';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { logEvent } from '@/lib/logger';
import { captureScreen } from '@/lib/capture';
import { useAppStore } from '@/lib/store';
import type { Analog, Passage } from '@/lib/types';
import {
  collectTextCoordinates,
  getElementBBox,
  saveCoordinates,
  extractPassageCoordinates,
} from '@/lib/coordinate-collector';

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
    <p>自由に書いてください。（30文字以上）</p>
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
  const coordinatesCollectedRef = useRef(false);
  const participantId = useAppStore((s) => s.participantId);
  const groupLetter = useAppStore((s) => s.groupLetter);

  useEffect(() => {
    if (!loggedOpenRef.current) {
      captureScreen();
      logEvent({ event: 'reflection2_open', passage_id: passage.id });
      loggedOpenRef.current = true;
    }

    // Collect coordinates after a short delay to ensure rendering is complete
    const timer = setTimeout(() => {
      if (!participantId || coordinatesCollectedRef.current) return;
      coordinatesCollectedRef.current = true;

      // Language tabs
      const localeTabElements = Array.from(
        document.querySelectorAll('[data-locale-tab]')
      ) as HTMLElement[];
      const localeTabs = localeTabElements.map((el) => ({
        locale: el.getAttribute('data-locale-tab') || '',
        bbox: getElementBBox(el),
      }));

      // Analog tabs
      const analogTabElements = Array.from(
        document.querySelectorAll('[data-analog-tab]')
      ) as HTMLElement[];
      const analogTabs = analogTabElements.map((el) => ({
        analog_index: parseInt(el.getAttribute('data-analog-tab') || '0'),
        bbox: getElementBBox(el),
      }));

      // All analogs with their questions
      const analogData = analogs.map((analog, analogIdx) => {
        // Find the passage container for this analog (in left panel)
        const passageContainers = Array.from(
          document.querySelectorAll('[data-reflection2-analog-passage]')
        ) as HTMLElement[];
        const passageContainer = passageContainers[analogIdx];

        // Instruction for this analog - both locales
        const visibleInstructionElement = passageContainer
          ? (passageContainer.querySelector(
              '[data-passage-instruction="true"]'
            ) as HTMLElement | null)
          : null;
        const hiddenInstructionElement = passageContainer
          ? (passageContainer.querySelector(
              '[data-passage-instruction-hidden="true"]'
            ) as HTMLElement | null)
          : null;
        const visibleInstructionLocale =
          visibleInstructionElement?.getAttribute('data-passage-instruction-locale') || 'en';

        const instruction_en =
          visibleInstructionLocale === 'en'
            ? collectTextCoordinates(visibleInstructionElement)
            : collectTextCoordinates(hiddenInstructionElement);
        const instruction_ja =
          visibleInstructionLocale === 'ja'
            ? collectTextCoordinates(visibleInstructionElement)
            : collectTextCoordinates(hiddenInstructionElement);

        // Passage sections for this analog - both locales
        const visibleSectionElements = passageContainer
          ? (Array.from(
              passageContainer.querySelectorAll('[data-passage-section]')
            ) as HTMLElement[])
          : [];
        const hiddenSectionElements = passageContainer
          ? (Array.from(
              passageContainer.querySelectorAll('[data-passage-section-hidden]')
            ) as HTMLElement[])
          : [];

        const visibleLocale =
          visibleSectionElements[0]?.getAttribute('data-passage-section-locale') || 'en';

        const visiblePassages = visibleSectionElements.map((el, idx) =>
          extractPassageCoordinates(el, idx)
        );
        const hiddenPassages = hiddenSectionElements.map((el, idx) =>
          extractPassageCoordinates(el, idx)
        );

        const passages_en = visibleLocale === 'en' ? visiblePassages : hiddenPassages;
        const passages_ja = visibleLocale === 'ja' ? visiblePassages : hiddenPassages;

        // Find the question container for this analog (in right panel)
        const questionContainers = Array.from(
          document.querySelectorAll('[data-reflection2-analog]')
        ) as HTMLElement[];
        const questionContainer = questionContainers[analogIdx];

        // Questions for this analog
        const questionElements = questionContainer
          ? (Array.from(
              questionContainer.querySelectorAll('[data-reflection2-question]')
            ) as HTMLElement[])
          : [];
        const questions = questionElements.map((qEl) => {
          const questionId = qEl.getAttribute('data-reflection2-question') || '';
          const questionIndex = parseInt(
            qEl.getAttribute('data-reflection2-question-index') || '0'
          );
          const promptElement = qEl.querySelector(
            '[data-reflection2-prompt="true"]'
          ) as HTMLElement | null;
          const promptElementEn = qEl.querySelector(
            '[data-reflection2-prompt-en="true"]'
          ) as HTMLElement | null;
          const promptElementJa = qEl.querySelector(
            '[data-reflection2-prompt-ja="true"]'
          ) as HTMLElement | null;

          const choiceElements = Array.from(
            qEl.querySelectorAll('[data-reflection2-choice]')
          ) as HTMLElement[];
          const choices = choiceElements.map((cEl) => ({
            choice_id: cEl.getAttribute('data-reflection2-choice') || '',
            choice_index: parseInt(cEl.getAttribute('data-reflection2-choice-index') || '0'),
            choice_text_en: collectTextCoordinates(
              cEl.querySelector('[data-reflection2-choice-text-en="true"]') as HTMLElement | null
            ),
            choice_text_ja: collectTextCoordinates(
              cEl.querySelector('[data-reflection2-choice-text-ja="true"]') as HTMLElement | null
            ),
            bbox: getElementBBox(cEl),
          }));

          return {
            question_id: questionId,
            question_index: questionIndex,
            question_bbox: getElementBBox(promptElement),
            question_text_en: collectTextCoordinates(promptElementEn),
            question_text_ja: collectTextCoordinates(promptElementJa),
            choices,
          };
        });

        // Reflection form for this analog (each analog has its own reflection form)
        const reflectionPromptElement = questionContainer
          ? (questionContainer.querySelector(
              '[data-reflection-form-prompt="true"]'
            ) as HTMLElement | null)
          : null;
        const reflectionTextareaElement = questionContainer
          ? (questionContainer.querySelector(
              '[data-reflection-textarea="true"]'
            ) as HTMLElement | null)
          : null;

        return {
          analog_id: analog.id,
          analog_index: analogIdx,
          instruction_en,
          instruction_ja,
          passages_en,
          passages_ja,
          questions,
          reflection_form: {
            prompt: collectTextCoordinates(reflectionPromptElement),
            textarea: getElementBBox(reflectionTextareaElement),
          },
        };
      });

      // Submit button
      const submitButtonElement = document.querySelector(
        '[data-submit-button="true"]'
      ) as HTMLElement | null;

      const coordinates = {
        page_type: 'reflection2',
        passage_id: passage.id,
        timestamp: new Date().toISOString(),

        header: {
          locale_tabs: localeTabs,
          analog_tabs: analogTabs,
        },

        left_panel: {
          analogs: analogData.map((a) => ({
            analog_id: a.analog_id,
            analog_index: a.analog_index,
            instruction_en: a.instruction_en,
            instruction_ja: a.instruction_ja,
            passages_en: a.passages_en,
            passages_ja: a.passages_ja,
          })),
        },

        right_panel: {
          analogs: analogData.map((a) => ({
            analog_id: a.analog_id,
            analog_index: a.analog_index,
            questions: a.questions,
            reflection_form: a.reflection_form,
          })),
        },

        footer: {
          submit_button: getElementBBox(submitButtonElement),
        },
      };

      saveCoordinates(participantId, groupLetter || '', `reflection2_${passage.id}`, coordinates);
    }, 1000);

    return () => {
      clearTimeout(timer);
      if (!loggedExitRef.current) {
        logEvent({ event: 'reflection2_exit', passage_id: passage.id });
        loggedExitRef.current = true;
      }
    };
  }, [passage.id, participantId, groupLetter, analogs]);

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

  // Get all analog results from store
  const allAnalogResults = useAppStore((s) => s.analogResults);

  if (!currentAnalog) return null;

  // ヘッダー用言語切り替えタブ
  const headerLocaleToggle = (
    <Tabs value={locale} onValueChange={handleLocaleChange}>
      <TabsList data-locale-tabs="true">
        <TabsTrigger value="en" data-locale-tab="en">
          English
        </TabsTrigger>
        <TabsTrigger value="ja" data-locale-tab="ja">
          日本語
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );

  return (
    <AppShell
      headerSlot={headerLocaleToggle}
      leftSlot={
        <div className="h-full overflow-hidden relative">
          {analogs.map((analog, analogIdx) => {
            const isSelected = String(analogIdx) === selectedAnalog;
            const analogParagraphs = analog.paragraphsEn ?? [];
            return (
              <div
                key={analog.id}
                className={`h-full absolute top-0 left-0 right-0 ${locale === 'ja' ? 'overflow-y-auto' : 'overflow-hidden'}`}
                style={{ visibility: isSelected ? 'visible' : 'hidden' }}
                data-reflection2-analog-passage={analogIdx}
              >
                <PassageBody
                  sections={analog.sections}
                  paragraphsEn={analogParagraphs}
                  direction={analog.direction}
                  directionJa={analog.directionJa}
                  locale={locale}
                />
              </div>
            );
          })}
        </div>
      }
      rightSlot={
        <div className="h-full flex flex-col overflow-hidden">
          {/* 問題タブ */}
          <div className="shrink-0">
            <Tabs value={selectedAnalog} onValueChange={handleAnalogTabChange}>
              <TabsList data-analog-tabs="true">
                {analogs.map((_, idx) => (
                  <TabsTrigger key={idx} value={String(idx)} data-analog-tab={idx}>
                    問題{idx + 1}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* 選択された問題の内容 */}
          <div className="flex-1 mt-2 overflow-y-auto relative">
            {analogs.map((analog, analogIdx) => {
              const isSelected = String(analogIdx) === selectedAnalog;
              const analogResult = allAnalogResults[analog.id] ?? EMPTY_RESULT;

              return (
                <div
                  key={analog.id}
                  className="absolute top-0 left-0 right-0"
                  style={{ visibility: isSelected ? 'visible' : 'hidden' }}
                  data-reflection2-analog={analogIdx}
                >
                  <div className="space-y-4">
                    {analog.questions.map((q, idx) => {
                      const userAnswer = analogResult[q.id];
                      const isUnanswered = !userAnswer;
                      return (
                        <div
                          key={q.id}
                          className="space-y-1"
                          data-reflection2-question={q.id}
                          data-reflection2-question-index={idx}
                        >
                          <div
                            className="text-sm text-foreground"
                            style={{ overflow: 'hidden', position: 'relative' }}
                            data-reflection2-prompt="true"
                          >
                            <span className="font-semibold">Q{idx + 1}.</span>{' '}
                            {locale === 'en' ? q.promptEn : (q.promptJa ?? q.promptEn)}
                            {isUnanswered ? (
                              <span className="ml-2 rounded bg-zinc-500 px-2 py-0.5 text-xs text-white font-bold">
                                未回答
                              </span>
                            ) : null}
                            {/* Hidden spans for coordinate collection - positioned relative to the parent div */}
                            <span
                              style={{
                                visibility: 'hidden',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                              }}
                              data-reflection2-prompt-en="true"
                            >
                              Q{idx + 1}. {q.promptEn}
                            </span>
                            <span
                              style={{
                                visibility: 'hidden',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                              }}
                              data-reflection2-prompt-ja="true"
                            >
                              Q{idx + 1}. {q.promptJa ?? q.promptEn}
                            </span>
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
                                  style={{ overflow: 'hidden' }}
                                  data-reflection2-choice={c.id}
                                  data-reflection2-choice-index={cIdx}
                                >
                                  <span data-reflection2-choice-text="true">
                                    <span className="font-mono mr-1">({CHOICE_LABELS[cIdx]})</span>
                                    <span style={{ position: 'relative' }}>
                                      {locale === 'en' ? c.textEn : (c.textJa ?? c.textEn)}
                                      {/* Hidden spans for coordinate collection */}
                                      <span
                                        style={{
                                          visibility: 'hidden',
                                          position: 'absolute',
                                          top: 0,
                                          left: 0,
                                          right: 0,
                                        }}
                                        data-reflection2-choice-text-en="true"
                                      >
                                        ({CHOICE_LABELS[cIdx]}) {c.textEn}
                                      </span>
                                      <span
                                        style={{
                                          visibility: 'hidden',
                                          position: 'absolute',
                                          top: 0,
                                          left: 0,
                                          right: 0,
                                        }}
                                        data-reflection2-choice-text-ja="true"
                                      >
                                        ({CHOICE_LABELS[cIdx]}) {c.textJa ?? c.textEn}
                                      </span>
                                    </span>
                                  </span>
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
              );
            })}
          </div>
        </div>
      }
      footer={
        <ConfirmNavigateButton
          href={confirmHref}
          title={confirmTitle}
          description={confirmDescription}
          confirmLabel={confirmLabel}
          triggerLabel={
            value.length < 30 ? `${confirmLabel}（あと${30 - value.length}文字）` : confirmLabel
          }
          onConfirm={handleSubmit}
          disabled={value.length < 30}
        />
      }
    />
  );
}
