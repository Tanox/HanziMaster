'use client';

import { useTranslation } from '@/components/locale-provider';

type AccentVariant = 'vermilion' | 'indigo' | 'success';

interface StatsCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  accentVariant?: AccentVariant;
}

const accentClasses: Record<AccentVariant, { bar: string; value: string }> = {
  vermilion: { bar: 'bg-vermilion-500', value: 'text-vermilion-500' },
  indigo: { bar: 'bg-indigo-500', value: 'text-indigo-500' },
  success: { bar: 'bg-success-500', value: 'text-success-500' },
};

export function StatsCard({ label, value, icon, accentVariant = 'vermilion' }: StatsCardProps) {
  const { t } = useTranslation();
  const accent = accentClasses[accentVariant];

  return (
    <div className="group text-center p-6 rounded-xl border border-ink-100 dark:border-ink-800 bg-white/50 dark:bg-ink-900/50 backdrop-blur-sm hover:-translate-y-1 hover:shadow-ink transition-[colors,transform] duration-300 relative overflow-hidden reveal">
      <div
        className={`absolute top-0 left-0 right-0 h-[3px] origin-left group-hover:scale-x-100 transition-transform duration-300 ${accent.bar}`}
      />
      <div className="relative inline-block mb-4">
        <div className="w-14 h-14 bg-gradient-to-br from-vermilion-500/10 to-indigo/10 dark:from-vermilion-500/20 dark:to-indigo/20 rounded-lg flex items-center justify-center text-vermilion-500">
          <span aria-hidden="true">{icon}</span>
        </div>
      </div>
      <p className={`text-3xl font-bold mb-2 ${accent.value}`}>
        {value}
      </p>
      <p className="text-sm text-ink-500 dark:text-ink-400 font-medium">
        {t(label)}
      </p>
    </div>
  );
}
