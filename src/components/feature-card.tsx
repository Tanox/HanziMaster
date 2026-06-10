// src/components/feature-card.tsx v2.3.1 - Apple Design Style
'use client';

import { useTranslation } from '@/components/locale-provider';

interface FeatureCardProps {
  titleKey: string;
  descKey: string;
  iconBg: string;
  textColor: string;
  icon: React.ReactNode;
  gradient?: string;
}

export function FeatureCard({
  titleKey,
  descKey,
  iconBg,
  textColor,
  icon,
  gradient,
}: FeatureCardProps) {
  const { t } = useTranslation();

  return (
    <div
      className={`feature-card p-6 sm:p-8 bg-white/70 dark:bg-slate-800/50 backdrop-blur-xl rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.04),0_1px_3px_rgba(0,0,0,0.02)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2),0_1px_3px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06),0_2px_6px_rgba(0,0,0,0.03)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.25),0_2px_6px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 ease-out group ${
        gradient || ''
      }`}
      role="article"
    >
      <div
        className={`w-14 h-14 sm:w-16 sm:h-16 ${iconBg} rounded-2xl flex items-center justify-center mb-5 sm:mb-6 group-hover:scale-110 transition-transform duration-300 ease-out`}
        aria-hidden="true"
      >
        <div className={textColor}>{icon}</div>
      </div>
      <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-slate-900 dark:text-white tracking-tight">
        {t(titleKey)}
      </h3>
      <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
        {t(descKey)}
      </p>
    </div>
  );
}
