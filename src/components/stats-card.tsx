'use client';

import { useTranslation } from '@/components/locale-provider';
import { Card, CardContent } from '@/components/ui/card';

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
        <div className="w-14 h-14 bg-gradient-to-br from-[#007aff]/10 to-[#af52de]/10 dark:from-[#007aff]/20 dark:to-[#af52de]/20 rounded-[20px] flex items-center justify-center text-[#007aff] mx-auto mb-4">
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
