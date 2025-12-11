'use client';

import { useId } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import type { Question } from '@/lib/types';

type QuestionListProps = {
  questions: Question[];
  selections: Record<string, string | undefined>;
  onSelect: (questionId: string, choiceId: string) => void;
  onSubmit: () => void;
  showJapanese?: boolean;
  submitLabel?: string;
  disabled?: boolean;
};

export function QuestionList({
  questions,
  selections,
  onSelect,
  onSubmit,
  showJapanese = false,
  submitLabel = '回答を確定する',
  disabled = false,
}: QuestionListProps) {
  const listId = useId();

  return (
    <div className="space-y-6" aria-labelledby={listId}>
      <div id={listId} className="text-base font-semibold">
        設問
      </div>
      <div className="space-y-4">
        {questions.map((q, index) => (
          <div key={q.id} className="rounded-md border bg-card p-4">
            <div className="mb-2 text-sm font-medium text-muted-foreground">
              Q{index + 1}. {q.promptEn}
            </div>
            {showJapanese && q.promptJa ? (
              <div className="mb-2 text-xs text-muted-foreground">{q.promptJa}</div>
            ) : null}
            <RadioGroup
              value={selections[q.id] ?? ''}
              onValueChange={(val) => onSelect(q.id, val)}
              className="space-y-2"
              disabled={disabled}
            >
              {q.choices.map((choice) => (
                <Label
                  key={choice.id}
                  className="flex cursor-pointer items-start gap-2 rounded-md border p-2 hover:bg-accent data-[state=checked]:border-primary"
                >
                  <RadioGroupItem value={choice.id} className="mt-1" />
                  <div className="space-y-1">
                    <div className="text-sm">{choice.textEn}</div>
                    {showJapanese && choice.textJa ? (
                      <div className="text-xs text-muted-foreground">{choice.textJa}</div>
                    ) : null}
                  </div>
                </Label>
              ))}
            </RadioGroup>
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <Button onClick={onSubmit} disabled={disabled}>
          {submitLabel}
        </Button>
      </div>
    </div>
  );
}
