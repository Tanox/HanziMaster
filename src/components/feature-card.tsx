// src/components/feature-card.tsx v2.2.1
'use client';

import { useTranslation } from '@/components/locale-provider';

interface FeatureCardProps {
  titleKey: string;
  descKey: string;
  icon: React.ReactNode;
  gradient: string;
  textColor: string;
}

export function FeatureCard({ titleKey, descKey, icon, gradient, textColor }: FeatureCardProps) {
  const { t } = useTranslation();

  return (
    <div className="group bg-white dark:bg-slate-800 p-6 sm:p-10 rounded-2xl sm:rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300 sm:hover:-translate-y-2">
      <div className={`w-12 h-12 sm:w-14 sm:h-14 ${gradient} ${textColor} rounded-2xl flex items-center justify-center mb-6 sm:mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
        {icon}
      </div>
      <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-slate-900 dark:text-white">{t(titleKey)}</h3>
      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
        {t(descKey)}
      </p>
    </div>
  );
}
