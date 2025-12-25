'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { logEvent } from '@/lib/logger';
import { useAppStore } from '@/lib/store';

export default function TrainingIntroPage() {
  const router = useRouter();
  const group = useAppStore((s) => s.group);

  useEffect(() => {
    logEvent({ event: 'phase_intro_enter', phase: 'training' });
    return () => {
      logEvent({ event: 'phase_intro_exit', phase: 'training' });
    };
  }, []);

  // A1/B1 → tr_01, A2/B2 → tr_02, A3/B3 → tr_03
  const passageId = group?.endsWith('3') ? 'tr_03' : group?.endsWith('2') ? 'tr_02' : 'tr_01';

  return (
    <main className="space-y-4 p-8">
      <h1 className="text-2xl font-semibold">Practice を開始します</h1>
      <div className="space-y-2 text-sm text-zinc-600">
        <p>Practiceでは、英語の長文読解の練習を行います。</p>
        <p>問題を解いた後に、問題に対する振り返りと解説があります。</p>
        <p>問題には制限時間がありますが、解説は時間を気にせず読んで学習してください。</p>
      </div>
      <Button onClick={() => router.push(`/training/${passageId}`)}>Practice を開始</Button>
    </main>
  );
}
