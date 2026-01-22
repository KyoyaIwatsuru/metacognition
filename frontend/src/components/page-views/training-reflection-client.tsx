'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { Button } from '@/components/ui/button';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { ConfirmNavigateButton } from '@/components/navigation/confirm-navigate-button';
import { ReflectionForm } from '@/components/reflection/reflection-form';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { logEvent } from '@/lib/logger';
import { captureScreen } from '@/lib/capture';
import { useAppStore } from '@/lib/store';
import type { Passage, Question } from '@/lib/types';
import { PassageBody } from '@/components/passage/passage-body';
import {
  collectTextCoordinates,
  getElementBBox,
  saveCoordinates,
  extractPassageCoordinates,
} from '@/lib/coordinate-collector';

const CHOICE_LABELS = ['A', 'B', 'C', 'D'] as const;
const EMPTY_TRAINING_RESULT = {
  allCorrect: false,
  answers: {} as Record<string, string | undefined>,
};

type TrainingReflectionClientProps = {
  passage: Passage;
  questions: Question[];
  confirmTitle: string;
  confirmDescription: string;
  confirmLabel: string;
  submitLabel?: string;
  confirmHref?: string;
  eventPrefix: 'reflection1' | 'reflection2';
  prompt?: React.ReactNode;
};

const defaultPrompt = (
  <>
    <p>解説を読んで思ったことを自由に書いてください。</p>
    <p>どんな内容でもかまいません。（30文字以上）</p>
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
  prompt = defaultPrompt,
}: TrainingReflectionClientProps) {
  const [locale, setLocale] = useState<'en' | 'ja'>('en');
  const [selectedQuestion, setSelectedQuestion] = useState('0');
  const [value, setValue] = useState('');
  const startedRef = useRef(false);
  const coordinatesCollectedRef = useRef(false);
  const paragraphs = useMemo(() => passage.paragraphsEn ?? [], [passage.paragraphsEn]);
  const participantId = useAppStore((s) => s.participantId);
  const groupLetter = useAppStore((s) => s.groupLetter);
  const trainingResult = useAppStore((s) => s.trainingResults[passage.id] ?? EMPTY_TRAINING_RESULT);

  useEffect(() => {
    captureScreen();
    logEvent({ event: `${eventPrefix}_open`, passage_id: passage.id });

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

      // Question tabs
      const questionTabElements = Array.from(
        document.querySelectorAll('[data-question-tab]')
      ) as HTMLElement[];
      const questionTabs = questionTabElements.map((el) => ({
        question_index: parseInt(el.getAttribute('data-question-tab') || '0'),
        bbox: getElementBBox(el),
      }));

      // Instruction text (left panel) - both locales
      const visibleInstructionElement = document.querySelector(
        '[data-passage-instruction="true"]'
      ) as HTMLElement | null;
      const hiddenInstructionElement = document.querySelector(
        '[data-passage-instruction-hidden="true"]'
      ) as HTMLElement | null;
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

      // Passage sections - both locales
      const visibleSectionElements = Array.from(
        document.querySelectorAll('[data-passage-section]')
      ) as HTMLElement[];
      const hiddenSectionElements = Array.from(
        document.querySelectorAll('[data-passage-section-hidden]')
      ) as HTMLElement[];

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

      // All questions (regardless of visibility)
      const reflectionQuestionElements = Array.from(
        document.querySelectorAll('[data-reflection-question]')
      ) as HTMLElement[];
      const questionsData = reflectionQuestionElements.map((qEl) => {
        const questionId = qEl.getAttribute('data-reflection-question') || '';
        const questionIndex = parseInt(qEl.getAttribute('data-reflection-question-index') || '0');
        const promptElement = qEl.querySelector(
          '[data-reflection-prompt="true"]'
        ) as HTMLElement | null;
        const promptElementEn = qEl.querySelector(
          '[data-reflection-prompt-en="true"]'
        ) as HTMLElement | null;
        const promptElementJa = qEl.querySelector(
          '[data-reflection-prompt-ja="true"]'
        ) as HTMLElement | null;

        const choiceElements = Array.from(
          qEl.querySelectorAll('[data-reflection-choice]')
        ) as HTMLElement[];
        const choices = choiceElements.map((cEl) => ({
          choice_id: cEl.getAttribute('data-reflection-choice') || '',
          choice_index: parseInt(cEl.getAttribute('data-reflection-choice-index') || '0'),
          choice_text_en: collectTextCoordinates(
            cEl.querySelector('[data-reflection-choice-text-en="true"]') as HTMLElement | null
          ),
          choice_text_ja: collectTextCoordinates(
            cEl.querySelector('[data-reflection-choice-text-ja="true"]') as HTMLElement | null
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

      // Reflection form
      const reflectionPromptElement = document.querySelector(
        '[data-reflection-form-prompt="true"]'
      ) as HTMLElement | null;
      const reflectionTextareaElement = document.querySelector(
        '[data-reflection-textarea="true"]'
      ) as HTMLElement | null;

      // Submit button
      const submitButtonElement = document.querySelector(
        '[data-submit-button="true"]'
      ) as HTMLElement | null;

      const coordinates = {
        page_type: eventPrefix,
        passage_id: passage.id,
        timestamp: new Date().toISOString(),

        header: {
          locale_tabs: localeTabs,
          question_tabs: questionTabs,
        },

        left_panel: {
          instruction_en,
          instruction_ja,
          passages_en,
          passages_ja,
        },

        right_panel: {
          questions: questionsData,
          reflection_form: {
            prompt: collectTextCoordinates(reflectionPromptElement),
            textarea: getElementBBox(reflectionTextareaElement),
          },
        },

        footer: {
          submit_button: getElementBBox(submitButtonElement),
        },
      };

      saveCoordinates(
        participantId,
        groupLetter || '',
        `${eventPrefix}_${passage.id}`,
        coordinates
      );
    }, 1000);

    return () => {
      clearTimeout(timer);
      logEvent({ event: `${eventPrefix}_exit`, passage_id: passage.id });
    };
  }, [eventPrefix, passage.id, participantId, groupLetter]);

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

  const handleQuestionTabChange = (newQuestion: string) => {
    setSelectedQuestion(newQuestion);
    logEvent({
      event: 'question_tab_click',
      passage_id: passage.id,
      question_index: Number(newQuestion),
    });
  };

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
        <div className="h-full overflow-hidden">
          <div className={`h-full ${locale === 'ja' ? 'overflow-y-auto' : 'overflow-hidden'}`}>
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
          <div className="shrink-0">
            <Tabs value={selectedQuestion} onValueChange={handleQuestionTabChange}>
              <TabsList data-question-tabs="true">
                {questions.map((_, idx) => (
                  <TabsTrigger key={idx} value={String(idx)} data-question-tab={idx}>
                    Q{idx + 1}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* 選択された問題の内容 */}
          <div className="flex-1 mt-2 overflow-y-auto relative">
            {questions.map((q, idx) => {
              const userAnswer = trainingResult.answers[q.id];
              const isUnanswered = !userAnswer;
              const isSelected = String(idx) === selectedQuestion;
              return (
                <div
                  key={q.id}
                  className="space-y-2 absolute top-0 left-0 right-0"
                  style={{ visibility: isSelected ? 'visible' : 'hidden' }}
                  data-reflection-question={q.id}
                  data-reflection-question-index={idx}
                >
                  <div className="select-none">
                    {/* 設問 */}
                    <div
                      className="text-sm text-foreground"
                      style={{ overflow: 'hidden', position: 'relative' }}
                      data-reflection-prompt="true"
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
                          whiteSpace: 'nowrap',
                        }}
                        data-reflection-prompt-en="true"
                      >
                        Q{idx + 1}. {q.promptEn}
                      </span>
                      <span
                        style={{
                          visibility: 'hidden',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          whiteSpace: 'nowrap',
                        }}
                        data-reflection-prompt-ja="true"
                      >
                        Q{idx + 1}. {q.promptJa ?? q.promptEn}
                      </span>
                    </div>

                    {/* 選択肢 */}
                    <ul className="space-y-0.5 text-sm mt-2">
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
                            data-reflection-choice={c.id}
                            data-reflection-choice-index={cIdx}
                          >
                            <span data-reflection-choice-text="true">
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
                                    whiteSpace: 'nowrap',
                                  }}
                                  data-reflection-choice-text-en="true"
                                >
                                  ({CHOICE_LABELS[cIdx]}) {c.textEn}
                                </span>
                                <span
                                  style={{
                                    visibility: 'hidden',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    whiteSpace: 'nowrap',
                                  }}
                                  data-reflection-choice-text-ja="true"
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

                  {/* 振り返り欄 */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <ReflectionForm
                      prompt={prompt}
                      value={value}
                      onChange={setValue}
                      onSubmit={handleSubmit}
                      onTypingStart={handleTypingStart}
                      submitLabel={submitLabel}
                      showSubmitButton={false}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      }
      footer={
        confirmHref ? (
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
        ) : (
          <ConfirmDialog
            title={confirmTitle}
            description={confirmDescription}
            confirmLabel={confirmLabel}
            onConfirm={handleSubmit}
          >
            <Button disabled={value.length < 30}>
              {value.length < 30 ? `${confirmLabel}（あと${30 - value.length}文字）` : confirmLabel}
            </Button>
          </ConfirmDialog>
        )
      }
    />
  );
}
