// src/components/stats-card.tsx v2.2.1
'use client';

import { useTranslation } from '@/components/locale-provider';

interface StatsCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
}

export function StatsCard({ label, value, icon }: StatsCardProps) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-4 p-4 sm:p-6 bg-slate-50 dark:bg-slate-900/50 rounded-xl sm:rounded-2xl">
      <div className="w-10 h-10 sm:w-14 sm:h-14 bg-emerald-100 dark:bg-emerald-900/40 rounded-xl sm:rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white">
          {value}
        </p>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 truncate">
          {t(label)}
        </p>
      </div>
    </div>
  );
}
