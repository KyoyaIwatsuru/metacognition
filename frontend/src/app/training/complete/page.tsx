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

export default function TrainingCompletePage() {
  const router = useRouter();
  const setPhase = useAppStore((s) => s.setPhase);
  const participantId = useAppStore((s) => s.participantId);
  const groupLetter = useAppStore((s) => s.groupLetter);
  const trainingSet = useAppStore((s) => s.trainingSet);

  useEffect(() => {
    captureScreen();
    logEvent({ event: 'phase_complete_enter', phase: 'training' });

    // Collect coordinates after a short delay to ensure rendering is complete
    const timer = setTimeout(() => {
      if (!participantId) return;

      const titleElement = document.querySelector('h1') as HTMLElement | null;
      const descriptionElement = document.querySelector('p.text-sm') as HTMLElement | null;
      const buttonElement = document.querySelector('button') as HTMLElement | null;

      const coordinates = {
        page_type: 'training_complete',
        timestamp: new Date().toISOString(),
        title: collectTextCoordinates(titleElement),
        description: collectTextCoordinates(descriptionElement),
        button: getElementBBox(buttonElement),
      };

      const phase = trainingSet ? `training${trainingSet}` : 'training1';
      saveCoordinates(participantId, groupLetter || '', 'training_complete', coordinates, phase);
    }, 1000);

    return () => clearTimeout(timer);
  }, [participantId, groupLetter, trainingSet]);

  const handleFinish = async () => {
    const res = await stopRecording();
    if (!res.ok) {
      toast.error('recording/stop に失敗しました');
      return;
    }
    logEvent({ event: 'phase_complete_exit', phase: 'training' });
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
