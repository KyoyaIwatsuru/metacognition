'use client';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import type { Question } from '@/lib/types';

// TOEIC choice labels
const CHOICE_LABELS = ['(A)', '(B)', '(C)', '(D)'] as const;

type QuestionListProps = {
  questions: Question[];
  selections: Record<string, string | undefined>;
  onSelect: (questionId: string, choiceId: string) => void;
  onSubmit?: () => void;
  showJapanese?: boolean;
  submitLabel?: string;
  disabled?: boolean;
  showSubmitButton?: boolean;
  twoColumns?: boolean; // 2カラムで表示
};

export function QuestionList({
  questions,
  selections,
  onSelect,
  onSubmit = () => {},
  showJapanese = false,
  submitLabel = '解答を確定する',
  disabled = false,
  showSubmitButton = false,
  twoColumns = false,
}: QuestionListProps) {
  const containerClass = twoColumns ? 'grid grid-cols-2 gap-x-0 gap-y-0' : 'space-y-4';

  return (
    <div className={containerClass}>
      {questions.map((q, index) => (
        <div key={q.id} className={twoColumns ? 'space-y-0.5' : 'space-y-1'}>
          <div className="text-[14px] leading-[2.4]">
            Q{index + 1}. {q.promptEn}
          </div>
          {showJapanese && q.promptJa ? (
            <div className="text-[12px] text-muted-foreground leading-[2.4]">{q.promptJa}</div>
          ) : null}
          <RadioGroup
            value={selections[q.id] ?? ''}
            onValueChange={(val) => onSelect(q.id, val)}
            className="space-y-0"
            disabled={disabled}
          >
            {q.choices.map((choice, choiceIndex) => (
              <Label
                key={choice.id}
                className="flex cursor-pointer items-start gap-2 hover:bg-slate-50"
              >
                <RadioGroupItem value={choice.id} className="mt-2" />
                <div className="flex gap-1.5">
                  <span className="text-[14px] leading-[2.4]">{CHOICE_LABELS[choiceIndex]}</span>
                  <div>
                    <div className="text-[14px] leading-[2.4]">{choice.textEn}</div>
                    {showJapanese && choice.textJa ? (
                      <div className="text-[11px] text-muted-foreground leading-[2.4]">
                        {choice.textJa}
                      </div>
                    ) : null}
                  </div>
                </div>
              </Label>
            ))}
          </RadioGroup>
        </div>
      ))}
      {showSubmitButton ? (
        <div className="flex justify-end">
          <Button onClick={onSubmit} disabled={disabled}>
            {submitLabel}
          </Button>
        </div>
      ) : null}
    </div>
  );
}
