'use client';

import { useMemo } from 'react';
import { TrainingReflectionClient } from '@/components/page-views/training-reflection-client';
import { useAppStore } from '@/lib/store';
import type { Passage } from '@/lib/types';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

type TrainingReflection1ViewProps = {
  passage: Passage;
};

export function TrainingReflection1View({ passage }: TrainingReflection1ViewProps) {
  const group = useAppStore((s) => s.group);
  const firstAnalogId = passage.analogs?.[0]?.id ?? 'tr_01_an1';
  const trainingResult = useAppStore((s) => s.trainingResults[passage.id]);
  const router = useRouter();

  useEffect(() => {
    if (trainingResult?.allCorrect) {
      router.replace('/training/complete');
    }
  }, [router, trainingResult?.allCorrect]);

  const { confirmHref, confirmLabel } = useMemo(() => {
    if (group === 'B') {
      return {
        confirmHref: `/training/${passage.id}/metacog-feedback`,
        confirmLabel: '次へ',
      };
    }
    return {
      confirmHref: `/training/${passage.id}/analog/${firstAnalogId}`,
      confirmLabel: '次へ',
    };
  }, [firstAnalogId, group, passage.id]);

  return (
    <TrainingReflectionClient
      passage={passage}
      questions={passage.questions}
      confirmTitle="次へ進みます"
      confirmDescription="戻ることはできません。よろしいですか？"
      confirmLabel={confirmLabel}
      confirmHref={confirmHref}
      submitLabel="送信"
      eventPrefix="reflection1"
    />
  );
}
