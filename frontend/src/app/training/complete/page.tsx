'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { logEvent } from '@/lib/logger';
import { stopRecording } from '@/lib/eyetracker';
import { useAppStore } from '@/lib/store';
import { toast } from 'sonner';

export default function TrainingCompletePage() {
  const router = useRouter();
  const setPhase = useAppStore((s) => s.setPhase);

  const handleFinish = async () => {
    const res = await stopRecording();
    if (!res.ok) {
      toast.error('recording/stop に失敗しました');
      return;
    }
    logEvent({ event: 'phase_end', phase: 'training' });
    setPhase(undefined);
    router.push('/');
  };

  return (
    <main className="space-y-4 p-8">
      <h1 className="text-2xl font-semibold">Practice 完了</h1>
      <p className="text-sm text-zinc-600">
        おつかれさまでした。下のボタンを押すと最初の画面に戻ります。
      </p>
      <Button onClick={handleFinish}>終了する</Button>
    </main>
  );
}
