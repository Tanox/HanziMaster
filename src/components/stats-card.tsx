// src/components/stats-card.tsx v2.2.1
import { useTranslation } from '@/components/locale-provider';

interface StatsCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
}

export function StatsCard({ label, value, icon }: StatsCardProps) {
  const { t } = useTranslation();

  return (
    <div className="bg-slate-50 dark:bg-slate-900/50 p-6 sm:p-8 rounded-xl sm:rounded-2xl text-center hover:scale-105 transition-transform duration-300">
      <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl sm:rounded-2xl mb-3 sm:mb-4">
        {icon}
      </div>
      <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-1 sm:mb-2">{value}</div>
      <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">{t(label)}</div>
    </div>
  );
}
