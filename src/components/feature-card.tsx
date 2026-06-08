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
    <div className="bg-[#fbfbfd] dark:bg-[#1d1d1f] p-10 rounded-[24px] border border-gray-200 dark:border-gray-800 hover:-translate-y-1 transition-transform duration-300 group text-center">
      <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#007aff]/10 to-[#af52de]/10 dark:from-[#007aff]/20 dark:to-[#af52de]/20 rounded-[20px] flex items-center justify-center text-[#007aff] group-hover:scale-105 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-black dark:text-white mb-3">
        {t(titleKey)}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
        {t(descKey)}
      </p>
    </div>
  );
}
