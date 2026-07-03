// src/components/stats-card.tsx v3.0.0
'use client';

import { useTranslation } from '@/components/locale-provider';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
}

export function StatsCard({ label, value, icon }: StatsCardProps) {
  const { t } = useTranslation();

  return (
    <Card className="text-center">
      <CardContent className="pt-6 pb-6">
        <div className={cn('size-14 bg-gradient-to-br from-primary/10 to-primary-dark/10 dark:from-primary/20 dark:to-primary-dark/20 rounded-[20px] flex items-center justify-center text-primary mx-auto mb-4')}>
          <span aria-hidden="true">{icon}</span>
        </div>
        <p className="text-3xl font-bold text-foreground mb-2">
          {value}
        </p>
        <p className="text-sm text-muted-foreground">
          {t(label)}
        </p>
      </CardContent>
    </Card>
  );
}
