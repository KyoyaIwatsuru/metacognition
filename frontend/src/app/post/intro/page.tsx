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
      <div className="space-y-2 text-sm text-zinc-600">
        <p>Post-testでは、英語読解力を測定します。</p>
        <p>
          全3問の英語長文読解問題に取り組んでいただきます。制限時間内に最も適切だと思う選択肢を選んでください。
        </p>
      </div>
      <Button onClick={() => router.push('/post/post_01')}>Post-test を開始</Button>
    </main>
  );
}
