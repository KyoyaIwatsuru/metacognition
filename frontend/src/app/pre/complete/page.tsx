'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { logEvent } from '@/lib/logger';
import { captureScreen } from '@/lib/capture';
import { stopRecording } from '@/lib/eyetracker';
import { useAppStore } from '@/lib/store';
import { toast } from 'sonner';
import {
  collectTextCoordinates,
  getElementBBox,
  saveCoordinates,
} from '@/lib/coordinate-collector';

export default function PreCompletePage() {
  const router = useRouter();
  const setPhase = useAppStore((s) => s.setPhase);
  const participantId = useAppStore((s) => s.participantId);
  const groupLetter = useAppStore((s) => s.groupLetter);

  useEffect(() => {
    captureScreen();
    logEvent({ event: 'phase_complete_enter', phase: 'pre' });

    // Collect coordinates after a short delay to ensure rendering is complete
    const timer = setTimeout(() => {
      if (!participantId) return;

      const titleElement = document.querySelector('h1') as HTMLElement | null;
      const descriptionElement = document.querySelector('p.text-sm') as HTMLElement | null;
      const buttonElement = document.querySelector('button') as HTMLElement | null;

      const coordinates = {
        page_type: 'pre_complete',
        timestamp: new Date().toISOString(),
        title: collectTextCoordinates(titleElement),
        description: collectTextCoordinates(descriptionElement),
        button: getElementBBox(buttonElement),
      };

      saveCoordinates(participantId, groupLetter || '', 'pre_complete', coordinates);
    }, 1000);

    return () => clearTimeout(timer);
  }, [participantId]);

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
