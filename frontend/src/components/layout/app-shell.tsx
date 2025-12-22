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
  equalColumns?: boolean; // 左右を50:50にする
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
  equalColumns = false,
}: AppShellProps) {
  const gridClass = equalColumns
    ? 'grid h-full gap-3 md:grid-cols-[0.9fr_1.1fr]'
    : 'grid h-full gap-6 md:grid-cols-[2.0fr_1fr]';

  return (
    <div className="h-screen bg-background text-foreground overflow-hidden flex flex-col">
      {showHeader ? <HeaderContainer rightSlot={headerSlot} /> : null}
      <main className="flex w-full flex-1 flex-col gap-1 px-6 py-0.5 overflow-hidden">
        {leftSlot || rightSlot ? (
          <div className={gridClass}>
            <section className="h-full overflow-hidden pr-1">{leftSlot}</section>
            <section className="h-full overflow-hidden pl-1">{rightSlot ?? children}</section>
          </div>
        ) : (
          children
        )}
      </main>
      {footer ? <ActionBar>{footer}</ActionBar> : null}
    </div>
  );
}
