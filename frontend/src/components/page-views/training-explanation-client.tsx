'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { MetacogContent } from '@/components/ui/metacog-content';
import { ConfirmNavigateButton } from '@/components/navigation/confirm-navigate-button';
import { PassageBody } from '@/components/passage/passage-body';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { logEvent } from '@/lib/logger';
import { captureScreen } from '@/lib/capture';
import { useAppStore } from '@/lib/store';
import type { Passage } from '@/lib/types';
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

type TrainingExplanationClientProps = {
  passage: Passage;
};

export function TrainingExplanationClient({ passage }: TrainingExplanationClientProps) {
  const [locale, setLocale] = useState<'en' | 'ja'>('en');
  const [selectedQuestion, setSelectedQuestion] = useState('0');

  const groupLetter = useAppStore((s) => s.groupLetter);
  const participantId = useAppStore((s) => s.participantId);
  const trainingResult = useAppStore((s) => s.trainingResults[passage.id] ?? EMPTY_TRAINING_RESULT);

  // 類題がある場合はanalog-introへ、ない場合はreflection2へ
  const nextHref = useMemo(() => {
    if (passage.analogs && passage.analogs.length > 0) {
      return `/training/${passage.id}/analog-intro`;
    }
    return `/training/${passage.id}/reflection2`;
  }, [passage.id, passage.analogs]);

  const hasAnalogs = passage.analogs && passage.analogs.length > 0;
  const confirmLabel = hasAnalogs ? '次へ' : '振り返りへ';
  const confirmTitle = '次へ進みます';
  const confirmDescription = '戻ることはできません。よろしいですか？';

  const paragraphs = useMemo(() => passage.paragraphsEn ?? [], [passage.paragraphsEn]);

  // 選択中の問題の下線テキストを取得
  const underlineTexts = useMemo(() => {
    const questionIndex = parseInt(selectedQuestion);
    const question = passage.questions[questionIndex];
    if (!question) return [];
    const text = locale === 'en' ? question.quotedTextEn : question.quotedTextJa;
    return text ? [text] : [];
  }, [passage.questions, selectedQuestion, locale]);

  const loggedOpenRef = useRef(false);
  const loggedExitRef = useRef(false);
  const coordinatesCollectedRef = useRef(false);

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

  useEffect(() => {
    if (!loggedOpenRef.current) {
      captureScreen();
      logEvent({ event: 'training_explanation_open', passage_id: passage.id });
      loggedOpenRef.current = true;
    }

    // Collect coordinates after a short delay to ensure rendering is complete
    const timer = setTimeout(() => {
      if (!participantId || coordinatesCollectedRef.current) return;
      coordinatesCollectedRef.current = true;

      // Language tabs (in header)
      const localeTabElements = Array.from(
        document.querySelectorAll('[data-locale-tab]')
      ) as HTMLElement[];
      const localeTabs = localeTabElements.map((el) => ({
        locale: el.getAttribute('data-locale-tab') || '',
        bbox: getElementBBox(el),
      }));

      // Question tabs (in header)
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

      // Passage sections with detailed extraction (left panel) - both locales
      const visibleSectionElements = Array.from(
        document.querySelectorAll('[data-passage-section]')
      ) as HTMLElement[];
      const hiddenSectionElements = Array.from(
        document.querySelectorAll('[data-passage-section-hidden]')
      ) as HTMLElement[];

      // Determine which locale is visible based on the first section's locale attribute
      const visibleLocale =
        visibleSectionElements[0]?.getAttribute('data-passage-section-locale') || 'en';
      const hiddenLocale = visibleLocale === 'en' ? 'ja' : 'en';

      const visiblePassages = visibleSectionElements.map((el, idx) =>
        extractPassageCoordinates(el, idx)
      );
      const hiddenPassages = hiddenSectionElements.map((el, idx) =>
        extractPassageCoordinates(el, idx)
      );

      const passages_en = visibleLocale === 'en' ? visiblePassages : hiddenPassages;
      const passages_ja = visibleLocale === 'ja' ? visiblePassages : hiddenPassages;

      // All questions (regardless of visibility) (right panel)
      const explanationQuestionElements = Array.from(
        document.querySelectorAll('[data-explanation-question]')
      ) as HTMLElement[];
      const questions = explanationQuestionElements.map((qEl) => {
        const questionId = qEl.getAttribute('data-explanation-question') || '';
        const questionIndex = parseInt(qEl.getAttribute('data-explanation-question-index') || '0');
        const promptElement = qEl.querySelector(
          '[data-explanation-prompt="true"]'
        ) as HTMLElement | null;
        const promptElementEn = qEl.querySelector(
          '[data-explanation-prompt-en="true"]'
        ) as HTMLElement | null;
        const promptElementJa = qEl.querySelector(
          '[data-explanation-prompt-ja="true"]'
        ) as HTMLElement | null;

        const choiceElements = Array.from(
          qEl.querySelectorAll('[data-explanation-choice]')
        ) as HTMLElement[];
        const choices = choiceElements.map((cEl) => ({
          choice_id: cEl.getAttribute('data-explanation-choice') || '',
          choice_index: parseInt(cEl.getAttribute('data-explanation-choice-index') || '0'),
          choice_text_en: collectTextCoordinates(
            cEl.querySelector('[data-explanation-choice-text-en="true"]') as HTMLElement | null
          ),
          choice_text_ja: collectTextCoordinates(
            cEl.querySelector('[data-explanation-choice-text-ja="true"]') as HTMLElement | null
          ),
          choice_bbox: getElementBBox(cEl),
        }));

        const explanationElement = qEl.querySelector(
          '[data-explanation-text="true"]'
        ) as HTMLElement | null;

        const metacogFeedbackElement = qEl.querySelector(
          '[data-metacog-feedback="true"]'
        ) as HTMLElement | null;

        return {
          question_id: questionId,
          question_index: questionIndex,
          question_bbox: getElementBBox(promptElement),
          question_text_en: collectTextCoordinates(promptElementEn),
          question_text_ja: collectTextCoordinates(promptElementJa),
          choices,
          explanation: collectTextCoordinates(explanationElement),
          metacog_feedback: collectTextCoordinates(metacogFeedbackElement),
        };
      });

      // Submit button (in footer)
      const submitButtonElement = document.querySelector(
        '[data-submit-button="true"]'
      ) as HTMLElement | null;

      // Use panel-based structure
      const coordinates = {
        page_type: 'training_explanation',
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
          questions,
        },

        footer: {
          submit_button: getElementBBox(submitButtonElement),
        },
      };

      saveCoordinates(
        participantId,
        groupLetter || '',
        `training_explanation_${passage.id}`,
        coordinates
      );
    }, 1000);

    return () => {
      clearTimeout(timer);
      if (!loggedExitRef.current) {
        logEvent({ event: 'training_explanation_exit', passage_id: passage.id });
        loggedExitRef.current = true;
      }
    };
  }, [passage.id, participantId]);

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

  // B群用: タブで問題を切り替えて表示
  const renderGroupBContent = () => (
    <div className="h-full flex flex-col overflow-hidden">
      {/* 問題タブ */}
      <div className="shrink-0">
        <Tabs value={selectedQuestion} onValueChange={handleQuestionTabChange}>
          <TabsList data-question-tabs="true">
            {passage.questions.map((_, idx) => (
              <TabsTrigger key={idx} value={String(idx)} data-question-tab={idx}>
                Q{idx + 1}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* 選択された問題の内容 */}
      <div className="flex-1 mt-2 overflow-y-auto relative">
        {passage.questions.map((q, idx) => {
          const userAnswer = trainingResult.answers[q.id];
          const isUnanswered = !userAnswer;
          const isSelected = String(idx) === selectedQuestion;
          return (
            <div
              key={q.id}
              className="space-y-2 absolute top-0 left-0 right-0"
              style={{ visibility: isSelected ? 'visible' : 'hidden' }}
              data-explanation-question={q.id}
              data-explanation-question-index={idx}
            >
              {/* 設問・選択肢・解説（コピー防止） */}
              <div className="select-none">
                <div
                  className="text-sm text-foreground"
                  style={{ overflow: 'hidden' }}
                  data-explanation-prompt="true"
                >
                  <span className="font-semibold">Q{idx + 1}.</span>{' '}
                  <span style={{ position: 'relative' }}>
                    {locale === 'en' ? q.promptEn : (q.promptJa ?? q.promptEn)}
                    {/* Hidden spans for coordinate collection */}
                    <span
                      style={{
                        visibility: 'hidden',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        whiteSpace: 'nowrap',
                      }}
                      data-explanation-prompt-en="true"
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
                      data-explanation-prompt-ja="true"
                    >
                      Q{idx + 1}. {q.promptJa ?? q.promptEn}
                    </span>
                  </span>
                  {isUnanswered ? (
                    <span className="ml-2 rounded bg-zinc-500 px-2 py-0.5 text-xs text-white font-bold">
                      未回答
                    </span>
                  ) : null}
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
                        data-explanation-choice={c.id}
                        data-explanation-choice-index={cIdx}
                      >
                        <span data-explanation-choice-text="true">
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
                              data-explanation-choice-text-en="true"
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
                              data-explanation-choice-text-ja="true"
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

                {/* 解説 */}
                {q.explanationGeneralJa ? (
                  <p
                    className="text-sm text-slate-800 mt-1 whitespace-pre-line"
                    data-explanation-text="true"
                  >
                    {q.explanationGeneralJa}
                  </p>
                ) : null}

                {/* メタ認知フィードバック */}
                {q.metacogFeedbackJa ? (
                  <div className="text-slate-800 mt-6" data-metacog-feedback="true">
                    <MetacogContent content={q.metacogFeedbackJa} />
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  // A群用: タブで問題を切り替えて表示（B群と同じUIだがメタ認知フィードバックなし）
  const renderGroupAContent = () => (
    <div className="h-full flex flex-col overflow-hidden">
      {/* 問題タブ */}
      <div className="shrink-0">
        <Tabs value={selectedQuestion} onValueChange={handleQuestionTabChange}>
          <TabsList data-question-tabs="true">
            {passage.questions.map((_, idx) => (
              <TabsTrigger key={idx} value={String(idx)} data-question-tab={idx}>
                Q{idx + 1}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* 選択された問題の内容 */}
      <div className="flex-1 mt-2 overflow-y-auto relative">
        {passage.questions.map((q, idx) => {
          const userAnswer = trainingResult.answers[q.id];
          const isUnanswered = !userAnswer;
          const isSelected = String(idx) === selectedQuestion;
          return (
            <div
              key={q.id}
              className="space-y-2 absolute top-0 left-0 right-0"
              style={{ visibility: isSelected ? 'visible' : 'hidden' }}
              data-explanation-question={q.id}
              data-explanation-question-index={idx}
            >
              {/* 設問・選択肢・解説（コピー防止） */}
              <div className="select-none">
                <div
                  className="text-sm text-foreground"
                  style={{ overflow: 'hidden' }}
                  data-explanation-prompt="true"
                >
                  <span className="font-semibold">Q{idx + 1}.</span>{' '}
                  <span style={{ position: 'relative' }}>
                    {locale === 'en' ? q.promptEn : (q.promptJa ?? q.promptEn)}
                    {/* Hidden spans for coordinate collection */}
                    <span
                      style={{
                        visibility: 'hidden',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        whiteSpace: 'nowrap',
                      }}
                      data-explanation-prompt-en="true"
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
                      data-explanation-prompt-ja="true"
                    >
                      Q{idx + 1}. {q.promptJa ?? q.promptEn}
                    </span>
                  </span>
                  {isUnanswered ? (
                    <span className="ml-2 rounded bg-zinc-500 px-2 py-0.5 text-xs text-white font-bold">
                      未回答
                    </span>
                  ) : null}
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
                        data-explanation-choice={c.id}
                        data-explanation-choice-index={cIdx}
                      >
                        <span data-explanation-choice-text="true">
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
                              data-explanation-choice-text-en="true"
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
                              data-explanation-choice-text-ja="true"
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

                {/* 解説 */}
                {q.explanationGeneralJa ? (
                  <p
                    className="text-sm text-slate-800 mt-1 whitespace-pre-line"
                    data-explanation-text="true"
                  >
                    {q.explanationGeneralJa}
                  </p>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
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
              showParagraphNumbers={locale === 'en'}
              underlineTexts={underlineTexts}
            />
          </div>
        </div>
      }
      rightSlot={groupLetter === 'B' ? renderGroupBContent() : renderGroupAContent()}
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
