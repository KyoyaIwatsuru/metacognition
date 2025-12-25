'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function TutorialIntroPage() {
  const router = useRouter();

  return (
    <main className="space-y-4 p-8">
      <h1 className="text-2xl font-semibold">操作説明（例）</h1>
      <div className="space-y-2 text-sm text-zinc-600">
        <p>これは操作練習用のサンプル問題です。</p>
        <p>画面の左側に本文、右側に問題が表示されます。</p>
        <p>選択肢をクリックして回答を選び、「解答を確定する」ボタンを押してください。</p>
      </div>
      <div className="flex gap-2">
        <Button onClick={() => router.push('/tutorial/question')}>例を開始</Button>
        <Button variant="outline" onClick={() => router.push('/')}>
          戻る
        </Button>
      </div>
    </main>
  );
}
