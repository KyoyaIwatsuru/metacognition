'use client';

import { useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { toast } from 'sonner';
import { connectEyeTracker, disconnectEyeTracker } from '@/lib/eyetracker';
import { HeaderBar } from '@/components/layout/header-bar';
import { useAppStore } from '@/lib/store';

type HeaderContainerProps = {
  rightSlot?: React.ReactNode;
};

export function HeaderContainer({ rightSlot }: HeaderContainerProps) {
  const pathname = usePathname();
  const eyeTrackerStatus = useAppStore((s) => s.eyeTrackerStatus);
  const phase = useAppStore((s) => s.phase);
  // 接続操作はHome画面のみ許可（パス名でも判定し、HMRでstoreがリセットされても対応）
  const isHomePage = pathname === '/';
  const showToggle = phase === undefined && isHomePage;

  const handleToggle = useCallback(async () => {
    if (eyeTrackerStatus === 'loading') {
      return;
    }

    if (eyeTrackerStatus === 'connected') {
      const res = await disconnectEyeTracker();
      if (!res.ok) {
        toast.error(`Eye tracker の切断に失敗しました: ${res.error ?? '不明なエラー'}`);
      } else {
        toast.success('Eye tracker を切断しました');
      }
      return;
    }

    const res = await connectEyeTracker();
    if (!res.ok) {
      toast.error(`Eye tracker の接続に失敗しました: ${res.error ?? '不明なエラー'}`);
    } else {
      toast.success('Eye tracker に接続しました');
    }
  }, [eyeTrackerStatus]);

  const label = eyeTrackerStatus === 'connected' ? 'Eye tracker 切断' : 'Eye tracker 接続';

  return (
    <HeaderBar
      eyeTrackerStatus={eyeTrackerStatus}
      eyeTrackerLabel={label}
      onToggleEyeTracker={handleToggle}
      showToggle={showToggle}
      rightSlot={rightSlot}
    />
  );
}
