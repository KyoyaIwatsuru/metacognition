'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { logEvent } from '@/lib/logger';
import { captureScreen } from '@/lib/capture';
import { mockTrainingPassages } from '@/lib/mock-data';
import {
  collectTextCoordinates,
  getElementBBox,
  saveCoordinates,
} from '@/lib/coordinate-collector';
import { useAppStore } from '@/lib/store';

type AnalogIntroClientProps = {
  passageId: string;
};

export function AnalogIntroClient({ passageId }: AnalogIntroClientProps) {
  const router = useRouter();
  const participantId = useAppStore((s) => s.participantId);
  const groupLetter = useAppStore((s) => s.groupLetter);
  const trainingSet = useAppStore((s) => s.trainingSet);

  const passage = mockTrainingPassages.find((p) => p.id === passageId);
  const firstAnalogId = passage?.analogs?.[0]?.id;

  useEffect(() => {
    captureScreen();
    logEvent({ event: 'analog_intro_enter', passage_id: passageId });

    // Collect coordinates after a short delay to ensure rendering is complete
    const timer = setTimeout(() => {
      if (!participantId) return;

      const titleElement = document.querySelector('h1') as HTMLElement | null;
      const descriptionElements = Array.from(
        document.querySelectorAll('div.space-y-2 > p')
      ) as HTMLElement[];
      const buttonElement = document.querySelector('button') as HTMLElement | null;

      const coordinates = {
        page_type: 'analog_intro',
        passage_id: passageId,
        timestamp: new Date().toISOString(),
        instruction: collectTextCoordinates(titleElement),
        description: {
          lines: descriptionElements.flatMap((el) => collectTextCoordinates(el)?.lines || []),
          text: descriptionElements.map((el) => el.textContent?.trim() || '').join(' '),
        },
        button: getElementBBox(buttonElement),
      };

      const phase = trainingSet ? `training${trainingSet}` : 'training1';
      saveCoordinates(participantId, groupLetter || '', 'analog_intro', coordinates, phase);
    }, 1000);

    return () => {
      clearTimeout(timer);
      logEvent({ event: 'analog_intro_exit', passage_id: passageId });
    };
  }, [passageId, participantId, groupLetter, trainingSet]);

  const handleStart = () => {
    if (firstAnalogId) {
      router.push(`/training/${passageId}/analog/${firstAnalogId}`);
    }
  };

  return (
    <main className="space-y-4 p-8">
      <h1 className="text-2xl font-semibold">続いて、3つの問題を解きます</h1>
      <div className="space-y-2 text-sm text-zinc-600">
        <p>これから3つの問題が出題されます。各問題を解いた後に、解説が表示されます。</p>
        <p>3問を解き終わった後に、先ほどと同じような振り返りがあります。</p>
      </div>
      <Button onClick={handleStart}>次へ</Button>
    </main>
  );
}
