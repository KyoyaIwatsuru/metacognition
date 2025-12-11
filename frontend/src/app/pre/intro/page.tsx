'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { logEvent } from '@/lib/logger';

export default function PreIntroPage() {
  const router = useRouter();

  useEffect(() => {
    logEvent({ event: 'phase_intro_enter', phase: 'pre' });
    return () => {
      logEvent({ event: 'phase_intro_exit', phase: 'pre' });
    };
  }, []);

  return (
    <main className="space-y-4 p-8">
      <h1 className="text-2xl font-semibold">Pre-test を開始します</h1>
      <p className="text-sm text-zinc-600">
        これから Pre-test
        を行います。英語の長文と設問が表示されるので、制限時間内に最も適切だと思う選択肢を選んでください。日本語訳や解説は表示されません。
      </p>
      <Button onClick={() => router.push('/pre/pre_01')}>Pre-test を開始</Button>
    </main>
  );
}
