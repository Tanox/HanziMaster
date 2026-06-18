'use client';

import { useTranslation } from '@/components/locale-provider';

interface FeatureCardProps {
  titleKey: string;
  descKey: string;
  icon: React.ReactNode;
  iconGradient?: string; // tailwind gradient classes e.g. "from-orange-500/10 to-pink-500/10"
  iconColor?: string; // tailwind text color e.g. "text-orange-500"
}

export function FeatureCard({
  titleKey,
  descKey,
  icon,
  iconGradient = 'from-[#007aff]/10 to-[#af52de]/10 dark:from-[#007aff]/20 dark:to-[#af52de]/20',
  iconColor = 'text-[#007aff]',
}: FeatureCardProps) {
  const { t } = useTranslation();

  return (
    <div className="bg-[#fbfbfd] dark:bg-[#1d1d1f] p-10 rounded-[24px] border border-gray-200 dark:border-gray-800 hover:-translate-y-1 transition-transform duration-300 group text-center">
      <div className={`w-14 h-14 mx-auto mb-6 bg-gradient-to-br ${iconGradient} rounded-[20px] flex items-center justify-center ${iconColor} group-hover:scale-105 transition-transform duration-300`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
        {t(titleKey)}
      </h3>
      <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
        {t(descKey)}
      </p>
    </div>
  );
}
