'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { logEvent } from '@/lib/logger';

export default function PostIntroPage() {
  const router = useRouter();

  useEffect(() => {
    logEvent({ event: 'phase_intro_enter', phase: 'post' });
    return () => {
      logEvent({ event: 'phase_intro_exit', phase: 'post' });
    };
  }, []);

  return (
    <main className="space-y-4 p-8">
      <h1 className="text-2xl font-semibold">Post-test を開始します</h1>
      <p className="text-sm text-zinc-600">
        これから Post-test を行います。Pre-test
        と同様に、英語の長文と設問が表示されます。日本語訳や解説は表示されません。
      </p>
      <Button onClick={() => router.push('/post/post_01')}>Post-test を開始</Button>
    </main>
  );
}
