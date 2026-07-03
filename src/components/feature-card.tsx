// src/components/feature-card.tsx v3.0.0
'use client';

import { useTranslation } from '@/components/locale-provider';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  titleKey: string;
  descKey: string;
  icon: React.ReactNode;
}

export function FeatureCard({
  titleKey,
  descKey,
  icon,
}: FeatureCardProps) {
  const { t } = useTranslation();

  return (
    <Card className="text-center hover:-translate-y-1 transition-all duration-300 group">
      <CardContent className="pt-8 pb-8">
        <div className={cn('size-20 mx-auto mb-6 bg-gradient-to-br from-primary/10 to-primary-dark/10 dark:from-primary/20 dark:to-primary-dark/20 rounded-[20px] flex items-center justify-center text-primary group-hover:scale-105 transition-transform duration-300')}>
          <span aria-hidden="true">{icon}</span>
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-3">
          {t(titleKey)}
        </h3>
        <p className="text-muted-foreground text-base leading-relaxed">
          {t(descKey)}
        </p>
      </CardContent>
    </Card>
  );
}
