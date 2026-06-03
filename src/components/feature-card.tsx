// src/components/feature-card.tsx v2.2.1
'use client';

import { useTranslation } from '@/components/locale-provider';

interface FeatureCardProps {
  titleKey: string;
  descKey: string;
  gradient: string;
  textColor: string;
  icon: React.ReactNode;
}

export function FeatureCard({
  titleKey,
  descKey,
  gradient,
  textColor,
  icon,
}: FeatureCardProps) {
  const { t } = useTranslation();

  return (
    <div
      className={`${gradient} p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all duration-300 sm:hover:-translate-y-2 group`}
    >
      <div className={`w-12 h-12 sm:w-14 sm:h-14 ${textColor} bg-white/80 dark:bg-slate-800/80 rounded-xl sm:rounded-2xl flex items-center justify-center mb-5 sm:mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
      <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-slate-900 dark:text-white">
        {t(titleKey)}
      </h3>
      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
        {t(descKey)}
      </p>
    </div>
  );
}
