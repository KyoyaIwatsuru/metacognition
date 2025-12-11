'use client';

import Link from 'next/link';
import { HeaderBar } from '@/components/layout/header-bar';
import { useAppStore } from '@/lib/store';
import { connectEyeTracker, disconnectEyeTracker } from '@/lib/eyetracker';
import { toast } from 'sonner';

const sections = [
  {
    title: 'Pre-test',
    links: [
      { href: '/pre/intro', label: 'Pre-test Intro' },
      { href: '/pre/pre_01', label: 'Pre-test Passage (sample)' },
      { href: '/pre/complete', label: 'Pre-test Complete' },
    ],
  },
  {
    title: 'Training',
    links: [
      { href: '/training/intro', label: 'Training Intro' },
      { href: '/training/tr_01', label: 'Training Passage (sample)' },
      { href: '/training/tr_01/explanation', label: 'Training Explanation' },
      { href: '/training/tr_01/reflection1', label: 'Training Reflection 1' },
      { href: '/training/tr_01/metacog-feedback', label: 'Training Metacog Feedback (B only)' },
      { href: '/training/tr_01/analog/tr_01_an1', label: 'Analog Question (sample)' },
      { href: '/training/tr_01/analog/tr_01_an1/explanation', label: 'Analog Explanation' },
      { href: '/training/tr_01/reflection2', label: 'Training Reflection 2' },
      { href: '/training/complete', label: 'Training Complete' },
    ],
  },
  {
    title: 'Post-test',
    links: [
      { href: '/post/intro', label: 'Post-test Intro' },
      { href: '/post/post_01', label: 'Post-test Passage (sample)' },
      { href: '/post/complete', label: 'Post-test Complete' },
    ],
  },
];

function HomeHeader() {
  const eyeTrackerStatus = useAppStore((s) => s.eyeTrackerStatus);

  const handleToggle = async () => {
    if (eyeTrackerStatus === 'loading') return;
    if (eyeTrackerStatus === 'connected') {
      const res = await disconnectEyeTracker();
      if (!res.ok) {
        toast.error('Eye tracker の切断に失敗しました');
      } else {
        toast.success('Eye tracker を切断しました');
      }
      return;
    }
    const res = await connectEyeTracker();
    if (!res.ok) {
      toast.error('Eye tracker の接続に失敗しました');
    } else {
      toast.success('Eye tracker に接続しました');
    }
  };

  const label = eyeTrackerStatus === 'connected' ? 'Eye tracker 切断' : 'Eye tracker 接続';

  return (
    <HeaderBar
      eyeTrackerStatus={eyeTrackerStatus}
      eyeTrackerLabel={label}
      onToggleEyeTracker={handleToggle}
      showToggle
    />
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <HomeHeader />
      <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-8 p-8">
        <header className="space-y-1">
          <h1 className="text-3xl font-semibold">metacognition (placeholder)</h1>
          <p className="text-sm text-zinc-600">
            実装中の各画面へのナビゲーション用プレースホルダーです。
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {sections.map((section) => (
            <section key={section.title} className="rounded-lg border p-4 shadow-sm">
              <h2 className="text-lg font-semibold">{section.title}</h2>
              <ul className="mt-3 space-y-2 text-sm">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link className="text-blue-600 underline" href={link.href}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
