import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type TwoColumnProps = {
  left: ReactNode;
  right: ReactNode;
  className?: string;
  leftClassName?: string;
  rightClassName?: string;
};

/**
 * Responsive 2-column container. Stacks on small screens.
 */
export function TwoColumn({
  left,
  right,
  className,
  leftClassName,
  rightClassName,
}: TwoColumnProps) {
  return (
    <div className={cn('grid gap-6 md:grid-cols-[1.1fr_1fr]', className)}>
      <section className={cn('space-y-4 md:pr-2', leftClassName)}>{left}</section>
      <section className={cn('space-y-4 md:pl-2', rightClassName)}>{right}</section>
    </div>
  );
}
