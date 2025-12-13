'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

type ConfirmDialogProps = {
  children?: React.ReactNode;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  /** Controlled open state */
  open?: boolean;
  /** Called when dialog wants to close (only works if allowCancel is true) */
  onOpenChange?: (open: boolean) => void;
  /** If false, hides cancel button and prevents closing */
  allowCancel?: boolean;
};

/**
 * Simple confirm dialog wrapper around AlertDialog.
 */
export function ConfirmDialog({
  children,
  title,
  description,
  confirmLabel = '確認',
  cancelLabel = 'キャンセル',
  onConfirm,
  open,
  onOpenChange,
  allowCancel = true,
}: ConfirmDialogProps) {
  const handleOpenChange = (newOpen: boolean) => {
    // If cancel is not allowed, only allow opening, not closing
    if (!allowCancel && !newOpen) {
      return;
    }
    onOpenChange?.(newOpen);
  };

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      {children ? <AlertDialogTrigger asChild>{children}</AlertDialogTrigger> : null}
      <AlertDialogContent onEscapeKeyDown={allowCancel ? undefined : (e) => e.preventDefault()}>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description ? <AlertDialogDescription>{description}</AlertDialogDescription> : null}
        </AlertDialogHeader>
        <AlertDialogFooter>
          {allowCancel ? <AlertDialogCancel>{cancelLabel}</AlertDialogCancel> : null}
          <AlertDialogAction onClick={onConfirm}>{confirmLabel}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
