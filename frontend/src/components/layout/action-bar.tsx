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
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-end gap-2 px-3 py-2">
        {children}
      </div>
    </footer>
  );
}
