'use client';

import { useRef } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

type ReflectionFormProps = {
  prompt: React.ReactNode;
  value: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
  onTypingStart?: () => void;
  disabled?: boolean;
  submitLabel?: string;
  showSubmitButton?: boolean;
};

export function ReflectionForm({
  prompt,
  value,
  onChange,
  onSubmit,
  onTypingStart,
  disabled = false,
  submitLabel = '送信',
  showSubmitButton = true,
}: ReflectionFormProps) {
  const startedRef = useRef(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!startedRef.current) {
      startedRef.current = true;
      onTypingStart?.();
    }
    onChange(e.target.value);
  };

  return (
    <div className="space-y-3">
      <div className="text-sm text-muted-foreground">{prompt}</div>
      <Textarea
        value={value}
        onChange={handleChange}
        disabled={disabled}
        rows={5}
        placeholder="自由に記述してください"
      />
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
