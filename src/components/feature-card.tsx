'use client';

import { useTranslation } from '@/components/locale-provider';

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
    <div className="group text-center p-8 rounded-2xl border border-ink-100 dark:border-ink-800 bg-white/50 dark:bg-ink-900/50 backdrop-blur-sm hover:-translate-y-2 hover:shadow-ink-lg hover:border-ink-200 dark:hover:border-ink-700 transition-[colors,transform] duration-300 reveal">
      <div className="relative inline-block mb-6">
        <div className="absolute inset-0 bg-vermilion-500/10 rounded-xl group-hover:bg-vermilion-500/20 transition-colors duration-300" />
        <div className="relative w-20 h-20 bg-gradient-to-br from-vermilion-500/5 to-indigo/5 dark:from-vermilion-500/10 dark:to-indigo/10 rounded-xl flex items-center justify-center text-vermilion-500 group-hover:scale-110 transition-transform duration-300">
          <span aria-hidden="true">{icon}</span>
        </div>
      </div>
      <h3 className="text-xl font-semibold text-ink-900 dark:text-ink-50 mb-3 display-font">
        {t(titleKey)}
      </h3>
      <p className="text-ink-600 dark:text-ink-300 text-base leading-relaxed">
        {t(descKey)}
      </p>
    </div>
  );
}
