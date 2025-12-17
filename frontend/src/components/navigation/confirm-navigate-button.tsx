'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';

type ConfirmNavigateButtonProps = {
  href: string;
  title: string;
  description?: string;
  confirmLabel?: string;
  triggerLabel?: string;
  onConfirm?: () => void;
  disabled?: boolean;
};

/**
 * Confirm dialog + router.push wrapper for navigation.
 */
export function ConfirmNavigateButton({
  href,
  title,
  description,
  confirmLabel = '次へ',
  triggerLabel,
  onConfirm,
  disabled = false,
}: ConfirmNavigateButtonProps) {
  const router = useRouter();
  const handleConfirm = useCallback(() => {
    onConfirm?.();
    router.push(href);
  }, [href, onConfirm, router]);

  return (
    <ConfirmDialog
      title={title}
      description={description}
      confirmLabel={confirmLabel}
      onConfirm={handleConfirm}
    >
      <Button disabled={disabled}>{triggerLabel ?? confirmLabel}</Button>
    </ConfirmDialog>
  );
}
