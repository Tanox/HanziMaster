// src/components/feature-card.tsx v2.3.0 - Apple Design Style
'use client';

import { useTranslation } from '@/components/locale-provider';

interface FeatureCardProps {
  titleKey: string;
  descKey: string;
  gradient: string;
  textColor: string;
  iconBg: string;
  icon: React.ReactNode;
}

export function FeatureCard({
  titleKey,
  descKey,
  gradient,
  textColor,
  iconBg,
  icon,
}: FeatureCardProps) {
  const { t } = useTranslation();

  return (
    <div className={`${gradient} transition-all duration-400 group`}>
      <div className={`w-14 h-14 ${iconBg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
        <div className={textColor}>{icon}</div>
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
        {t(titleKey)}
      </h3>
      <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
        {t(descKey)}
      </p>
    </div>
  );
}
