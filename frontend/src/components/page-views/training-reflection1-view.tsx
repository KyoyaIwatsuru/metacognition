'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { ConfirmNavigateButton } from '@/components/navigation/confirm-navigate-button';
import { PassageBody } from '@/components/passage/passage-body';
import { ReflectionForm } from '@/components/reflection/reflection-form';
import { logEvent } from '@/lib/logger';
import { captureScreen } from '@/lib/capture';
import { useAppStore } from '@/lib/store';
import type { Passage } from '@/lib/types';

const CHOICE_LABELS = ['A', 'B', 'C', 'D'] as const;
const EMPTY_TRAINING_RESULT = {
  allCorrect: false,
  answers: {} as Record<string, string | undefined>,
};

type TrainingReflection1ViewProps = {
  passage: Passage;
};

const reflection1Prompt = (
  <>
    <p>問題を解いて思ったことを自由に書いてください。</p>
    <p>どんな内容でもかまいません。</p>
  </>
);

export function TrainingReflection1View({ passage }: TrainingReflection1ViewProps) {
  const [value, setValue] = useState('');
  const startedRef = useRef(false);
  const paragraphs = useMemo(() => passage.paragraphsEn ?? [], [passage.paragraphsEn]);
  const trainingResult = useAppStore((s) => s.trainingResults[passage.id] ?? EMPTY_TRAINING_RESULT);

  useEffect(() => {
    captureScreen();
    logEvent({ event: 'reflection1_open', passage_id: passage.id });
    return () => {
      logEvent({ event: 'reflection1_exit', passage_id: passage.id });
    };
  }, [passage.id]);

  const handleTypingStart = () => {
    if (!startedRef.current) {
      startedRef.current = true;
      logEvent({ event: 'reflection1_typing_start', passage_id: passage.id });
    }
  };

  const handleSubmit = () => {
    logEvent({
      event: 'reflection1_submit',
      passage_id: passage.id,
      content: value,
    });
  };

  return (
    <AppShell
      leftSlot={
        <div className="h-full overflow-hidden">
          <PassageBody
            sections={passage.sections}
            paragraphsEn={paragraphs}
            direction={passage.direction}
            directionJa={passage.directionJa}
            locale="en"
          />
        </div>
      }
      rightSlot={
        <div className="h-full flex flex-col overflow-hidden">
          {/* 全問題を縦に表示 */}
          <div className="flex-1 overflow-y-auto">
            <div className="space-y-4">
              {passage.questions.map((q, idx) => {
                const userAnswer = trainingResult.answers[q.id];
                const isUnanswered = !userAnswer;
                return (
                  <div key={q.id} className="space-y-1 select-none">
                    {/* 設問 */}
                    <div className="text-sm text-foreground">
                      <span className="font-semibold">Q{idx + 1}</span> {q.promptEn}
                      {isUnanswered ? (
                        <span className="ml-2 rounded bg-zinc-500 px-2 py-0.5 text-xs text-white font-bold">
                          未回答
                        </span>
                      ) : null}
                    </div>

                    {/* 選択肢 */}
                    <ul className="space-y-0.5 text-sm">
                      {q.choices.map((c, cIdx) => {
                        const isUserAnswer = c.id === userAnswer;
                        return (
                          <li
                            key={c.id}
                            className={isUserAnswer ? 'text-blue-600 font-medium' : ''}
                          >
                            <span className="font-mono mr-1">({CHOICE_LABELS[cIdx]})</span>
                            {c.textEn}
                            {isUserAnswer ? (
                              <span className="ml-2 rounded bg-blue-600 px-2 py-0.5 text-xs text-white font-bold">
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
            </div>

            {/* 振り返り欄 */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <ReflectionForm
                prompt={reflection1Prompt}
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
      }
      footer={
        <ConfirmNavigateButton
          href={`/training/${passage.id}/explanation`}
          title="次へ進みます"
          description="戻ることはできません。よろしいですか？"
          confirmLabel="次へ"
          triggerLabel="次へ"
          onConfirm={handleSubmit}
        />
      }
    />
  );
}
