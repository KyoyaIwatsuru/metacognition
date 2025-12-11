'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { logEvent } from '@/lib/logger';

export default function TrainingIntroPage() {
  const router = useRouter();

  useEffect(() => {
    logEvent({ event: 'phase_intro_enter', phase: 'training' });
    return () => {
      logEvent({ event: 'phase_intro_exit', phase: 'training' });
    };
  }, []);

  return (
    <main className="space-y-4 p-8">
      <h1 className="text-2xl font-semibold">Training を開始します</h1>
      <p className="text-sm text-zinc-600">
        これから Training
        を行います。問題を解いたあとに解説が表示されます。間違えた問題については、振り返りを書き、その後で似たタイプの問題にも取り組んでもらいます。
      </p>
      <Button onClick={() => router.push('/training/tr_01')}>Training を開始</Button>
    </main>
  );
}
