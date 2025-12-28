'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { logEvent } from '@/lib/logger';
import { captureScreen } from '@/lib/capture';
import { useAppStore } from '@/lib/store';
import {
  collectTextCoordinates,
  getElementBBox,
  saveCoordinates,
} from '@/lib/coordinate-collector';

export default function TrainingIntroPage() {
  const router = useRouter();
  const groupLetter = useAppStore((s) => s.groupLetter);
  const trainingSet = useAppStore((s) => s.trainingSet);
  const participantId = useAppStore((s) => s.participantId);

  useEffect(() => {
    captureScreen();
    logEvent({ event: 'phase_intro_enter', phase: 'training' });

    // Collect coordinates after a short delay to ensure rendering is complete
    const timer = setTimeout(() => {
      if (!participantId) return;

      const titleElement = document.querySelector('h1') as HTMLElement | null;
      const descriptionElements = Array.from(
        document.querySelectorAll('div.space-y-2 > p')
      ) as HTMLElement[];
      const buttonElement = document.querySelector('button') as HTMLElement | null;

      const coordinates = {
        page_type: 'training_intro',
        timestamp: new Date().toISOString(),
        title: collectTextCoordinates(titleElement),
        description: {
          lines: descriptionElements.flatMap((el) => collectTextCoordinates(el)?.lines || []),
          text: descriptionElements.map((el) => el.textContent?.trim() || '').join(' '),
        },
        button: getElementBBox(buttonElement),
      };

      const phase = trainingSet ? `training${trainingSet}` : 'training1';
      saveCoordinates(participantId, groupLetter || '', 'training_intro', coordinates, phase);
    }, 1000);

    return () => {
      clearTimeout(timer);
      logEvent({ event: 'phase_intro_exit', phase: 'training' });
    };
  }, [participantId, groupLetter, trainingSet]);

  // trainingSet 1 → tr_01, 2 → tr_02, 3 → tr_03
  const passageId = trainingSet === '3' ? 'tr_03' : trainingSet === '2' ? 'tr_02' : 'tr_01';

  return (
    <main className="space-y-4 p-8">
      <h1 className="text-2xl font-semibold">Practice を開始します</h1>
      <div className="space-y-2 text-sm text-zinc-600">
        <p>Practiceでは、英語の長文読解の練習を行います。</p>
        <p>問題を解いた後に、問題に対する振り返りと解説があります。</p>
        <p>問題には制限時間がありますが、解説は時間を気にせず読んで学習してください。</p>
      </div>
      <Button onClick={() => router.push(`/training/${passageId}`)}>Practice を開始</Button>
    </main>
  );
}
