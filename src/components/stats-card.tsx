'use client';

import { useTranslation } from '@/components/locale-provider';

interface StatsCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  accentColor?: string;
}

export function StatsCard({ label, value, icon, accentColor = '#007aff' }: StatsCardProps) {
  const { t } = useTranslation();

  return (
    <div className="text-center bg-background dark:bg-foreground/5 rounded-[20px] p-6 border border-border hover:-translate-y-1 hover:shadow-md transition-[transform,box-shadow] duration-300 relative overflow-hidden group">
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] transition-transform duration-300 origin-left group-hover:scale-x-100 scale-x-0"
        style={{ backgroundColor: accentColor }}
      />
      <div className="w-14 h-14 bg-gradient-to-br from-[#007aff]/10 to-[#af52de]/10 dark:from-[#007aff]/20 dark:to-[#af52de]/20 rounded-[20px] flex items-center justify-center text-[#007aff] mx-auto mb-4">
        <span aria-hidden="true">{icon}</span>
      </div>
      <p className="text-3xl font-bold mb-2" style={{ color: accentColor }}>
        {value}
      </p>
      <p className="text-sm text-muted-foreground font-medium">
        {t(label)}
      </p>
    </div>
  );
}
