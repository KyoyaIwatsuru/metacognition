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

type TrainingReflection1ViewProps = {
  passage: Passage;
};

const reflection1Prompt = (
  <>
    <p>この問題を解いてどういったところを意識しましたか？気をつけたところはありますか？</p>
    <p>自由に書いてください。（30文字以上）</p>
  </>
);

export function TrainingReflection1View({ passage }: TrainingReflection1ViewProps) {
  const [value, setValue] = useState('');
  const startedRef = useRef(false);
  const coordinatesCollectedRef = useRef(false);
  const paragraphs = useMemo(() => passage.paragraphsEn ?? [], [passage.paragraphsEn]);
  const participantId = useAppStore((s) => s.participantId);
  const groupLetter = useAppStore((s) => s.groupLetter);
  const trainingResult = useAppStore((s) => s.trainingResults[passage.id] ?? EMPTY_TRAINING_RESULT);

  useEffect(() => {
    captureScreen();
    logEvent({ event: 'reflection1_open', passage_id: passage.id });

    // Collect coordinates after a short delay to ensure rendering is complete
    const timer = setTimeout(() => {
      if (!participantId || coordinatesCollectedRef.current) return;
      coordinatesCollectedRef.current = true;

      // Instruction text
      const instructionElement = document.querySelector(
        '[data-passage-instruction="true"]'
      ) as HTMLElement | null;

      // Passage sections
      const sectionElements = Array.from(
        document.querySelectorAll('[data-passage-section]')
      ) as HTMLElement[];
      const passages = sectionElements.map((el, idx) => extractPassageCoordinates(el, idx));

      // All questions
      const questionElements = Array.from(
        document.querySelectorAll('[data-reflection1-question]')
      ) as HTMLElement[];
      const questions = questionElements.map((qEl) => {
        const questionId = qEl.getAttribute('data-reflection1-question') || '';
        const questionIndex = parseInt(qEl.getAttribute('data-reflection1-question-index') || '0');
        const promptElement = qEl.querySelector(
          '[data-reflection1-prompt="true"]'
        ) as HTMLElement | null;

        const choiceElements = Array.from(
          qEl.querySelectorAll('[data-reflection1-choice]')
        ) as HTMLElement[];
        const choices = choiceElements.map((cEl) => ({
          choice_id: cEl.getAttribute('data-reflection1-choice') || '',
          choice_index: parseInt(cEl.getAttribute('data-reflection1-choice-index') || '0'),
          choice_text: collectTextCoordinates(
            cEl.querySelector('[data-reflection1-choice-text="true"]') as HTMLElement | null
          ),
          bbox: getElementBBox(cEl),
        }));

        return {
          question_id: questionId,
          question_index: questionIndex,
          question_text: collectTextCoordinates(promptElement),
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
        page_type: 'reflection1',
        passage_id: passage.id,
        timestamp: new Date().toISOString(),

        left_panel: {
          instruction: collectTextCoordinates(instructionElement),
          passages,
        },

        right_panel: {
          questions,
          reflection_form: {
            prompt: collectTextCoordinates(reflectionPromptElement),
            textarea: getElementBBox(reflectionTextareaElement),
          },
        },

        footer: {
          submit_button: getElementBBox(submitButtonElement),
        },
      };

      saveCoordinates(participantId, groupLetter || '', `reflection1_${passage.id}`, coordinates);
    }, 1000);

    return () => {
      clearTimeout(timer);
      logEvent({ event: 'reflection1_exit', passage_id: passage.id });
    };
  }, [passage.id, participantId]);

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
                  <div
                    key={q.id}
                    className="space-y-1 select-none"
                    data-reflection1-question={q.id}
                    data-reflection1-question-index={idx}
                  >
                    {/* 設問 */}
                    <div className="text-sm text-foreground" data-reflection1-prompt="true">
                      <span className="font-semibold">Q{idx + 1}.</span> {q.promptEn}
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
                            data-reflection1-choice={c.id}
                            data-reflection1-choice-index={cIdx}
                          >
                            <span data-reflection1-choice-text="true">
                              <span className="font-mono mr-1">({CHOICE_LABELS[cIdx]})</span>
                              {c.textEn}
                            </span>
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
          triggerLabel={value.length < 30 ? `次へ（あと${30 - value.length}文字）` : '次へ'}
          onConfirm={handleSubmit}
          disabled={value.length < 30}
        />
      }
    />
  );
}
