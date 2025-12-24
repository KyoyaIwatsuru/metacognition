'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { ConfirmNavigateButton } from '@/components/navigation/confirm-navigate-button';
import { PassageBody } from '@/components/passage/passage-body';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { logEvent } from '@/lib/logger';
import { captureScreen } from '@/lib/capture';
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
  const [selectedQuestion, setSelectedQuestion] = useState('0');

  const group = useAppStore((s) => s.group);
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

  // ヘッダー用言語切り替えタブ
  const headerLocaleToggle = (
    <Tabs value={locale} onValueChange={handleLocaleChange}>
      <TabsList>
        <TabsTrigger value="en">English</TabsTrigger>
        <TabsTrigger value="ja">日本語</TabsTrigger>
      </TabsList>
    </Tabs>
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
            />
          </div>
        </div>
      }
      rightSlot={group?.startsWith('B') ? renderGroupBContent() : renderGroupAContent()}
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
