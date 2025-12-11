import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type ActionBarProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Bottom action area for primary/secondary navigation buttons.
 */
export function ActionBar({ children, className }: ActionBarProps) {
  return (
    <footer
      className={cn(
        'border-t bg-background/90 backdrop-blur',
        'sticky bottom-0 z-10 w-full',
        className
      )}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-end gap-3 px-4 py-3">
        {children}
      </div>
    </footer>
  );
}
