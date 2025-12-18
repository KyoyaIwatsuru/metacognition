'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { HeaderBar } from '@/components/layout/header-bar';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/lib/store';
import {
  checkEyeTrackerStatus,
  connectEyeTracker,
  disconnectEyeTracker,
  startRecording,
} from '@/lib/eyetracker';
import { logEvent } from '@/lib/logger';
import { resetLogPath } from '@/lib/tauri-log-bridge';
import { toast } from 'sonner';

const participants = ['Pre001', 'Pre002', 'Pre003', 'Pre004'];

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
  const router = useRouter();
  const eyeTrackerStatus = useAppStore((s) => s.eyeTrackerStatus);
  const participantId = useAppStore((s) => s.participantId);
  const group = useAppStore((s) => s.group);
  const setParticipant = useAppStore((s) => s.setParticipant);
  const setGroup = useAppStore((s) => s.setGroup);
  const setPhase = useAppStore((s) => s.setPhase);

  // 初期化時にアイトラッカーの接続状態を確認
  useEffect(() => {
    checkEyeTrackerStatus();
  }, []);

  const validate = () => {
    if (!participantId) {
      toast.error('参加者IDを選択してください');
      return false;
    }
    if (!group) {
      toast.error('グループを選択してください');
      return false;
    }
    if (eyeTrackerStatus !== 'connected') {
      toast.error('Eye tracker を接続してください');
      return false;
    }
    return true;
  };

  const handleStart = async (phase: 'pre' | 'training' | 'post') => {
    if (!validate()) return;
    setPhase(phase);
    const res = await startRecording();
    if (!res.ok) {
      // 録画開始失敗時はフェーズを元に戻し、ログファイルパスもリセット
      setPhase(undefined);
      resetLogPath();
      toast.error(`recording/start に失敗しました: ${res.error ?? '不明なエラー'}`);
      return;
    }
    logEvent({ event: 'eyetracker_recording_start' });
    logEvent({ event: 'phase_start', phase });
    if (phase === 'pre') router.push('/pre/intro');
    else if (phase === 'training') router.push('/training/intro');
    else router.push('/post/intro');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <HomeHeader />
      <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-8 p-8">
        <header className="space-y-1">
          <h1 className="text-3xl font-semibold">Reading Practice</h1>
          <p className="text-sm text-zinc-600">
            参加者IDとグループを選択し、Eye trackerを接続してからフェーズを開始してください。
          </p>
        </header>

        <section className="rounded-lg border p-4 shadow-sm space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">参加者 ID</label>
            <select
              className="w-full rounded-md border px-3 py-2 text-sm bg-background cursor-pointer transition-all duration-150 hover:border-primary hover:shadow-md focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              value={participantId ?? ''}
              onChange={(e) => setParticipant(e.target.value || undefined)}
            >
              <option value="">選択してください</option>
              {participants.map((id) => (
                <option key={id} value={id}>
                  {id}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">グループ</label>
            <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
              {/* A群グループ */}
              <span className="text-xs font-semibold text-zinc-500 self-center">A群</span>
              <div className="flex gap-2">
                {(['A1', 'A2', 'A3'] as const).map((g) => (
                  <label
                    key={g}
                    className={`inline-flex items-center justify-center w-16 py-2 rounded-md border cursor-pointer transition-all duration-150 ${
                      group === g
                        ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                        : 'bg-background border-input hover:bg-accent hover:border-primary/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="group"
                      value={g}
                      checked={group === g}
                      onChange={() => setGroup(g)}
                      className="sr-only"
                    />
                    <span className="font-medium">{g}</span>
                  </label>
                ))}
              </div>
              {/* B群グループ */}
              <span className="text-xs font-semibold text-zinc-500 self-center">B群</span>
              <div className="flex gap-2">
                {(['B1', 'B2', 'B3'] as const).map((g) => (
                  <label
                    key={g}
                    className={`inline-flex items-center justify-center w-16 py-2 rounded-md border cursor-pointer transition-all duration-150 ${
                      group === g
                        ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                        : 'bg-background border-input hover:bg-accent hover:border-primary/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="group"
                      value={g}
                      checked={group === g}
                      onChange={() => setGroup(g)}
                      className="sr-only"
                    />
                    <span className="font-medium">{g}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-foreground">
              Eye tracker 状態:{' '}
              <span
                className={
                  eyeTrackerStatus === 'connected'
                    ? 'text-emerald-600 font-medium'
                    : 'text-zinc-500 font-medium'
                }
              >
                {eyeTrackerStatus === 'connected' ? '接続中' : '未接続'}
              </span>
            </p>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <Button variant="default" onClick={() => handleStart('pre')}>
            Pre-test を開始
          </Button>
          <Button variant="default" onClick={() => handleStart('training')}>
            Practice を開始
          </Button>
          <Button variant="default" onClick={() => handleStart('post')}>
            Post-test を開始
          </Button>
        </section>
      </main>
    </div>
  );
}
