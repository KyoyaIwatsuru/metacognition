'use client';

import { useMemo } from 'react';
import { TrainingReflectionClient } from '@/components/page-views/training-reflection-client';
import { useAppStore } from '@/lib/store';
import type { Passage } from '@/lib/types';

type TrainingReflection1ViewProps = {
  passage: Passage;
};

export function TrainingReflection1View({ passage }: TrainingReflection1ViewProps) {
  const group = useAppStore((s) => s.group);
  const firstAnalogId = passage.analogs?.[0]?.id ?? 'tr_01_an1';

  const { confirmHref, confirmLabel } = useMemo(() => {
    if (group === 'B') {
      return {
        confirmHref: `/training/${passage.id}/metacog-feedback`,
        confirmLabel: 'メタ認知へ',
      };
    }
    return {
      confirmHref: `/training/${passage.id}/analog/${firstAnalogId}`,
      confirmLabel: '類題へ',
    };
  }, [firstAnalogId, group, passage.id]);

  return (
    <TrainingReflectionClient
      passage={passage}
      questions={passage.questions}
      title="Training Reflection 1"
      confirmTitle="次へ進みます"
      confirmDescription="戻ることはできません。よろしいですか？"
      confirmLabel={confirmLabel}
      confirmHref={confirmHref}
      submitLabel="送信"
      eventPrefix="reflection1"
    />
  );
}
