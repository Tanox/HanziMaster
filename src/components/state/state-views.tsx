// src/components/state/state-views.tsx v5.2.31
'use client';

import type { ReactNode } from 'react';
import { useTranslation } from '@/components/locale-provider';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Inbox, AlertCircle, LoaderCircle } from 'lucide-react';

interface BaseProps {
  className?: string;
}

export function EmptyState({
  className,
  title,
  description,
  children,
}: BaseProps & { title?: string; description?: string; children?: ReactNode }) {
  const { t } = useTranslation();
  return (
    <div
      role="status"
      className={cn('flex flex-col items-center justify-center gap-3 py-16 text-center', className)}
    >
      <div
        className="w-14 h-14 rounded-full bg-muted flex items-center justify-center text-muted-foreground"
        aria-hidden="true"
      >
        <Inbox className="w-7 h-7" />
      </div>
      <p className="text-lg font-semibold text-ink-900 dark:text-ink-50">{title ?? t('common.emptyTitle')}</p>
      <p className="text-sm text-ink-500 dark:text-ink-400 max-w-sm">{description ?? t('common.emptyDesc')}</p>
      {children}
    </div>
  );
}

export function ErrorState({
  className,
  title,
  description,
  retryLabel,
  onRetry,
}: BaseProps & { title?: string; description?: string; retryLabel?: string; onRetry?: () => void }) {
  const { t } = useTranslation();
  return (
    <div
      role="alert"
      className={cn('flex flex-col items-center justify-center gap-3 py-16 text-center', className)}
    >
      <div
        className="w-14 h-14 rounded-full bg-destructive/10 flex items-center justify-center text-destructive"
        aria-hidden="true"
      >
        <AlertCircle className="w-7 h-7" />
      </div>
      <p className="text-lg font-semibold text-ink-900 dark:text-ink-50">{title ?? t('common.errorTitle')}</p>
      <p className="text-sm text-ink-500 dark:text-ink-400 max-w-sm">{description ?? t('common.errorDesc')}</p>
      {onRetry && (
        <Button variant="outline" onClick={onRetry} className="mt-2 rounded-full">
          {retryLabel ?? t('common.retry')}
        </Button>
      )}
    </div>
  );
}

export function LoadingSpinner({ className }: BaseProps) {
  return (
    <div role="status" aria-live="polite" className={cn('flex items-center justify-center py-16', className)}>
      <LoaderCircle className="w-8 h-8 animate-spin text-vermilion-500" aria-hidden="true" />
    </div>
  );
}
