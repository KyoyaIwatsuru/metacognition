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
      <h1 className="text-2xl font-semibold">Practice を開始します</h1>
      <div className="space-y-2 text-sm text-zinc-600">
        <p>Practiceでは、英語の長文読解の練習を行います。</p>
        <p>問題を解いた後に解説が表示されます。画面の指示に従って進めてください。</p>
      </div>
      <Button onClick={() => router.push('/training/tr_01')}>Practice を開始</Button>
    </main>
  );
}
