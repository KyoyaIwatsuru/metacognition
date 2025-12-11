'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type TimerProps = {
  totalMs: number;
  onTimeout?: () => void;
  running?: boolean;
  className?: string;
};

function formatTime(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

export function Timer({ totalMs, onTimeout, running = true, className }: TimerProps) {
  const [remaining, setRemaining] = useState(totalMs);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutFiredRef = useRef(false);

  useEffect(() => {
    // reset when total changes
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRemaining(totalMs);
    timeoutFiredRef.current = false;
  }, [totalMs]);

  useEffect(() => {
    if (!running) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        const next = prev - 1000;
        if (next <= 0) {
          if (!timeoutFiredRef.current) {
            timeoutFiredRef.current = true;
            onTimeout?.();
          }
          return 0;
        }
        return next;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [onTimeout, running]);

  return (
    <div className={cn('inline-flex items-center gap-2 rounded-md border px-3 py-1.5', className)}>
      <span className="text-xs uppercase text-muted-foreground">Time</span>
      <span className="font-mono text-lg tabular-nums">{formatTime(remaining)}</span>
    </div>
  );
}
