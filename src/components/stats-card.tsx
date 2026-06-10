// src/components/stats-card.tsx v2.3.1 - Apple Design Style
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
    <div
      className="flex items-center gap-4 p-4 sm:p-6 bg-white/70 dark:bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04),0_1px_3px_rgba(0,0,0,0.02)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2),0_1px_3px_rgba(0,0,0,0.1)] transition-all duration-300 ease-out hover:shadow-[0_8px_30px_rgba(0,0,0,0.06),0_2px_6px_rgba(0,0,0,0.03)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.25),0_2px_6px_rgba(0,0,0,0.12)]"
      role="group"
      aria-label={`${t(label)}: ${value}`}
    >
      <div
        className="w-10 h-10 sm:w-14 sm:h-14 bg-emerald-100 dark:bg-emerald-900/40 rounded-xl sm:rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0 transition-transform duration-300 ease-out hover:scale-105"
        aria-hidden="true"
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p
          className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-900 dark:text-white tracking-tight"
          aria-label={value}
        >
          {value}
        </p>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 truncate">
          {t(label)}
        </p>
      </div>
    </div>
  );
}
