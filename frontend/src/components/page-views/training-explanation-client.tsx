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
import type { Passage } from '@/lib/types';

const CHOICE_LABELS = ['A', 'B', 'C', 'D'] as const;
const EMPTY_TRAINING_RESULT = {
  allCorrect: false,
  answers: {} as Record<string, string | undefined>,
};

const reflectionPrompt = (
  <>
    <p>解説を読んで思ったことを自由に書いてください。</p>
    <p>どんな内容でもかまいません。</p>
  </>
);

type TrainingExplanationClientProps = {
  passage: Passage;
};

export function TrainingExplanationClient({ passage }: TrainingExplanationClientProps) {
  const [locale, setLocale] = useState<'en' | 'ja'>('en');
  const [reflectionValue, setReflectionValue] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState('0');
  const reflectionStartedRef = useRef(false);

  const group = useAppStore((s) => s.group);
  const trainingResult = useAppStore((s) => s.trainingResults[passage.id] ?? EMPTY_TRAINING_RESULT);
  const allCorrect = trainingResult.allCorrect;
  // 全問正解ならPractice終了、そうでなければ類題1へ
  const nextHref = allCorrect
    ? '/training/complete'
    : `/training/${passage.id}/analog/${passage.id}_an1`;
  const confirmLabel = allCorrect ? 'Practiceを終了する' : '次へ';
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

  const handleQuestionTabChange = (newQuestion: string) => {
    setSelectedQuestion(newQuestion);
    logEvent({
      event: 'question_tab_click',
      passage_id: passage.id,
      question_index: Number(newQuestion),
    });
  };

  const handleReflectionTypingStart = () => {
    if (!reflectionStartedRef.current) {
      reflectionStartedRef.current = true;
      logEvent({ event: 'reflection1_typing_start', passage_id: passage.id });
    }
  };

  const handleReflectionSubmit = () => {
    logEvent({
      event: 'reflection1_submit',
      passage_id: passage.id,
      content: reflectionValue,
    });
  };

  useEffect(() => {
    if (!loggedOpenRef.current) {
      captureScreen();
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

  // B群用: タブで問題を切り替えて表示
  const renderGroupBContent = () => (
    <div className="h-full flex flex-col overflow-hidden">
      {/* 問題タブ */}
      <div className="shrink-0">
        <Tabs value={selectedQuestion} onValueChange={handleQuestionTabChange}>
          <TabsList>
            {passage.questions.map((_, idx) => (
              <TabsTrigger key={idx} value={String(idx)}>
                Q{idx + 1}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* 選択された問題の内容 */}
      <div className="flex-1 mt-2 overflow-y-auto">
        {passage.questions.map((q, idx) => {
          if (String(idx) !== selectedQuestion) return null;
          const userAnswer = trainingResult.answers[q.id];
          const isUnanswered = !userAnswer;
          return (
            <div key={q.id} className="space-y-2">
              {/* 設問・選択肢・解説（コピー防止） */}
              <div className="select-none">
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

              {/* 振り返り欄 */}
              {!allCorrect && (
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <ReflectionForm
                    prompt={reflectionPrompt}
                    value={reflectionValue}
                    onChange={setReflectionValue}
                    onSubmit={handleReflectionSubmit}
                    onTypingStart={handleReflectionTypingStart}
                    showSubmitButton={false}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  // A群用: 全問題を一覧表示
  const renderGroupAContent = () => (
    <div className="h-full overflow-y-auto">
      <div className="space-y-4">
        {passage.questions.map((q, idx) => {
          const userAnswer = trainingResult.answers[q.id];
          const isUnanswered = !userAnswer;
          return (
            <div key={q.id} className="space-y-1 select-none">
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
            </div>
          );
        })}

        {/* 振り返り欄 */}
        {!allCorrect && (
          <div className="mt-6 pt-4 border-t border-gray-200">
            <ReflectionForm
              prompt={reflectionPrompt}
              value={reflectionValue}
              onChange={setReflectionValue}
              onSubmit={handleReflectionSubmit}
              onTypingStart={handleReflectionTypingStart}
              showSubmitButton={false}
            />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <AppShell
      headerSlot={headerLocaleDropdown}
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
      rightSlot={group === 'B' ? renderGroupBContent() : renderGroupAContent()}
      footer={
        <ConfirmNavigateButton
          href={nextHref}
          title={confirmTitle}
          description={confirmDescription}
          confirmLabel={confirmLabel}
          triggerLabel={confirmLabel}
          onConfirm={!allCorrect ? handleReflectionSubmit : undefined}
        />
      }
    />
  );
}
