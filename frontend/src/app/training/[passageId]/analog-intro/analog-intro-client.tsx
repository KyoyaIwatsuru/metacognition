'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { logEvent } from '@/lib/logger';
import { captureScreen } from '@/lib/capture';
import { mockTrainingPassages } from '@/lib/mock-data';

type AnalogIntroClientProps = {
  passageId: string;
};

export function AnalogIntroClient({ passageId }: AnalogIntroClientProps) {
  const router = useRouter();

  const passage = mockTrainingPassages.find((p) => p.id === passageId);
  const firstAnalogId = passage?.analogs?.[0]?.id;

  useEffect(() => {
    captureScreen();
    logEvent({ event: 'analog_intro_enter', passage_id: passageId });
    return () => {
      logEvent({ event: 'analog_intro_exit', passage_id: passageId });
    };
  }, [passageId]);

  const handleStart = () => {
    if (firstAnalogId) {
      router.push(`/training/${passageId}/analog/${firstAnalogId}`);
    }
  };

  return (
    <main className="space-y-4 p-8">
      <h1 className="text-2xl font-semibold">続いて、3つの問題を解きます</h1>
      <div className="space-y-2 text-sm text-zinc-600">
        <p>これから3つの問題が出題されます。各問題を解いた後に、解説が表示されます。</p>
        <p>3問を解き終わった後に、先ほどと同じような振り返りがあります。</p>
      </div>
      <Button onClick={handleStart}>次へ</Button>
    </main>
  );
}
