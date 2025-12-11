'use client';

import { useCallback } from 'react';
import { toast } from 'sonner';
import { connectEyeTracker, disconnectEyeTracker } from '@/lib/eyetracker';
import { HeaderBar } from '@/components/layout/header-bar';
import { useAppStore } from '@/lib/store';

export function HeaderContainer() {
  const eyeTrackerStatus = useAppStore((s) => s.eyeTrackerStatus);
  const showToggle = useAppStore((s) => s.phase === undefined); // 接続操作は開始前(Home想定)のみ許可

  const handleToggle = useCallback(async () => {
    if (eyeTrackerStatus === 'loading') {
      return;
    }

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
  }, [eyeTrackerStatus]);

  const label = eyeTrackerStatus === 'connected' ? 'Eye tracker 切断' : 'Eye tracker 接続';

  return (
    <HeaderBar
      eyeTrackerStatus={eyeTrackerStatus}
      eyeTrackerLabel={label}
      onToggleEyeTracker={handleToggle}
      showToggle={showToggle}
    />
  );
}
