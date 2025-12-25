'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function TutorialCompletePage() {
  const router = useRouter();

  return (
    <main className="space-y-4 p-8">
      <h1 className="text-2xl font-semibold">操作説明は以上です</h1>
      <div className="space-y-2 text-sm text-zinc-600">
        <p>本番では、このような形式で問題に取り組みます。</p>
        <p>準備ができたら、ホームに戻って開始してください。</p>
      </div>
      <Button onClick={() => router.push('/')}>ホームに戻る</Button>
    </main>
  );
}
