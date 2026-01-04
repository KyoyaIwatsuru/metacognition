'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { logEvent } from '@/lib/logger';
import { captureScreen } from '@/lib/capture';
import {
  collectTextCoordinates,
  getElementBBox,
  saveCoordinates,
} from '@/lib/coordinate-collector';
import { useAppStore } from '@/lib/store';

export default function PostIntroPage() {
  const router = useRouter();
  const participantId = useAppStore((s) => s.participantId);
  const groupLetter = useAppStore((s) => s.groupLetter);

  useEffect(() => {
    captureScreen();
    logEvent({ event: 'phase_intro_enter', phase: 'post' });

    // Collect coordinates after a short delay to ensure rendering is complete
    const timer = setTimeout(() => {
      if (!participantId) return;

      const titleElement = document.querySelector('h1') as HTMLElement | null;
      const descriptionElements = Array.from(
        document.querySelectorAll('div.space-y-2 > p')
      ) as HTMLElement[];
      const buttonElement = document.querySelector('button') as HTMLElement | null;

      const coordinates = {
        page_type: 'post_intro',
        timestamp: new Date().toISOString(),
        title: collectTextCoordinates(titleElement),
        description: {
          lines: descriptionElements.flatMap((el) => collectTextCoordinates(el)?.lines || []),
          text: descriptionElements.map((el) => el.textContent?.trim() || '').join(' '),
        },
        button: getElementBBox(buttonElement),
      };

      saveCoordinates(participantId, groupLetter || '', 'post_intro', coordinates);
    }, 1000);

    return () => {
      clearTimeout(timer);
      logEvent({ event: 'phase_intro_exit', phase: 'post' });
    };
  }, [participantId]);

  return (
    <main className="space-y-4 p-8">
      <h1 className="text-2xl font-semibold">Post-test を開始します</h1>
      <div className="space-y-2 text-sm text-zinc-600">
        <p>Post-testでは、現在の英語の能力を測定します。</p>
        <p>
          全8問の英語の長文読解問題に取り組んでいただきます。制限時間内に最も適切だと思う選択肢を選んでください。
        </p>
      </div>
      <Button onClick={() => router.push('/post/post_01')}>Post-test を開始</Button>
    </main>
  );
}
