'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { logEvent } from '@/lib/logger';
import { captureScreen } from '@/lib/capture';
import { stopRecording } from '@/lib/eyetracker';
import { useAppStore } from '@/lib/store';
import { toast } from 'sonner';

export default function PreCompletePage() {
  const router = useRouter();
  const setPhase = useAppStore((s) => s.setPhase);

  useEffect(() => {
    captureScreen();
    logEvent({ event: 'phase_complete_enter', phase: 'pre' });
  }, []);

  const handleFinish = async () => {
    const res = await stopRecording();
    if (!res.ok) {
      toast.error('recording/stop に失敗しました');
      return;
    }
    logEvent({ event: 'phase_complete_exit', phase: 'pre' });
    logEvent({ event: 'phase_end', phase: 'pre' });
    setPhase(undefined);
    router.push('/');
  };

  return (
    <main className="space-y-4 p-8">
      <h1 className="text-2xl font-semibold">Pre-test 完了</h1>
      <p className="text-sm text-zinc-600">
        おつかれさまでした。下のボタンを押すと最初の画面に戻ります。
      </p>
      <Button onClick={handleFinish}>終了する</Button>
    </main>
  );
}
