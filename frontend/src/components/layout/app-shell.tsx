import type { ReactNode } from 'react';
import { HeaderContainer } from '@/components/layout/header-container';
import { ActionBar } from '@/components/layout/action-bar';

type AppShellProps = {
  children?: ReactNode;
  footer?: ReactNode;
  rightSlot?: ReactNode;
  leftSlot?: ReactNode;
  showHeader?: boolean;
  headerSlot?: ReactNode;
};

/**
 * Common page shell: header on top, 2-column main area, optional footer.
 */
export function AppShell({
  children = null,
  footer,
  rightSlot,
  leftSlot,
  showHeader = true,
  headerSlot,
}: AppShellProps) {
  return (
    <div className="h-screen bg-background text-foreground overflow-hidden flex flex-col">
      {showHeader ? <HeaderContainer rightSlot={headerSlot} /> : null}
      <main className="flex w-full flex-1 flex-col gap-2 px-8 py-2 overflow-hidden">
        {leftSlot || rightSlot ? (
          <div className="grid h-full gap-6 md:grid-cols-[2.0fr_1fr]">
            <section className="h-full overflow-hidden pr-3">{leftSlot}</section>
            <section className="h-full overflow-hidden pl-3">{rightSlot ?? children}</section>
          </div>
        ) : (
          children
        )}
      </main>
      {footer ? <ActionBar>{footer}</ActionBar> : null}
    </div>
  );
}
