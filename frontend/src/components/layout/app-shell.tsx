import type { ReactNode } from 'react';
import { HeaderContainer } from '@/components/layout/header-container';
import { ActionBar } from '@/components/layout/action-bar';

type AppShellProps = {
  children: ReactNode;
  footer?: ReactNode;
  rightSlot?: ReactNode;
  leftSlot?: ReactNode;
  showHeader?: boolean;
  showEyeTrackerToggle?: boolean;
};

/**
 * Common page shell: header on top, 2-column main area, optional footer.
 */
export function AppShell({
  children,
  footer,
  rightSlot,
  leftSlot,
  showHeader = true,
  showEyeTrackerToggle = false,
}: AppShellProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {showHeader ? <HeaderContainer /> : null}
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-6 md:py-8">
        {leftSlot || rightSlot ? (
          <div className="grid gap-6 md:grid-cols-[1.1fr_1fr]">
            <section className="space-y-4 md:pr-2">{leftSlot}</section>
            <section className="space-y-4 md:pl-2">{rightSlot ?? children}</section>
          </div>
        ) : (
          children
        )}
      </main>
      {footer ? <ActionBar>{footer}</ActionBar> : null}
    </div>
  );
}
