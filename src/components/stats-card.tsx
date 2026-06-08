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
    <div className="bg-white dark:bg-black p-6 rounded-[20px] border border-gray-200 dark:border-gray-800 text-center">
      <div className="w-14 h-14 bg-gradient-to-br from-[#007aff]/10 to-[#af52de]/10 dark:from-[#007aff]/20 dark:to-[#af52de]/20 rounded-[20px] flex items-center justify-center text-[#007aff] mx-auto mb-4">
        {icon}
      </div>
      <p className="text-3xl font-bold text-black dark:text-white mb-2">
        {value}
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {t(label)}
      </p>
    </div>
  );
}
