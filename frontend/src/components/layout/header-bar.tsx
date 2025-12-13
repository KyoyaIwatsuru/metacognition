import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type HeaderBarProps = {
  className?: string;
  onToggleEyeTracker?: () => void;
  eyeTrackerLabel?: string;
  eyeTrackerStatus?: 'connected' | 'disconnected' | 'loading';
  showToggle?: boolean;
  rightSlot?: ReactNode;
};

/**
 * Top bar with app name and Eye tracker toggle placeholder.
 * Actual wiring (state / handlers) is injected via props.
 */
export function HeaderBar({
  className,
  onToggleEyeTracker,
  eyeTrackerLabel = 'Eye tracker 接続',
  eyeTrackerStatus = 'disconnected',
  showToggle = true,
  rightSlot,
}: HeaderBarProps) {
  const isLoading = eyeTrackerStatus === 'loading';
  const isConnected = eyeTrackerStatus === 'connected';

  return (
    <header
      className={cn(
        'sticky top-0 z-20 flex h-11 w-full items-center border-b bg-background/90 px-2.5 backdrop-blur',
        className
      )}
    >
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-2">
        <div className="text-sm font-semibold">metacognition</div>
        <div className="flex items-center gap-1.5">
          {rightSlot}
          {showToggle ? (
            <div className="flex items-center gap-1.5">
              <span
                className={cn(
                  'h-2.5 w-2.5 rounded-full',
                  isConnected ? 'bg-emerald-500' : 'bg-zinc-400',
                  isLoading ? 'animate-pulse' : ''
                )}
                aria-label={isConnected ? 'connected' : 'disconnected'}
              />
              <Button
                variant={isConnected ? 'secondary' : 'default'}
                size="sm"
                onClick={onToggleEyeTracker}
                disabled={isLoading}
              >
                {eyeTrackerLabel}
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
