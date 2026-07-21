'use client';

import { useTranslation } from '@/components/locale-provider';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  icon: React.ReactNode;
  titleKey: string;
  descKey: string;
  actionKey?: string;
  onAction?: () => void;
  actionVariant?: 'default' | 'ghost' | 'outline';
}

export function EmptyState({
  icon,
  titleKey,
  descKey,
  actionKey,
  onAction,
  actionVariant = 'default',
}: EmptyStateProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 gap-5 bg-muted/50 dark:bg-foreground/5 rounded-2xl border border-border">
      <div className="w-16 h-16 bg-muted dark:bg-foreground/10 rounded-full flex items-center justify-center text-muted-foreground">
        <span aria-hidden="true">{icon}</span>
      </div>
      <div className="text-center">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          {t(titleKey)}
        </h3>
        <p className="text-sm text-muted-foreground max-w-[280px]">
          {t(descKey)}
        </p>
      </div>
      {actionKey && onAction && (
        <Button variant={actionVariant} onClick={onAction} className="rounded-full">
          {t(actionKey)}
        </Button>
      )}
    </div>
  );
}
