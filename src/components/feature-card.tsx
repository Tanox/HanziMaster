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
    <div className="text-center hover:-translate-y-2 transition-[transform,box-shadow] duration-300 group bg-muted/50 dark:bg-card rounded-[24px] p-8 border border-transparent hover:border-border hover:shadow-lg">
      <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#007aff]/10 to-[#af52de]/10 dark:from-[#007aff]/20 dark:to-[#af52de]/20 rounded-[20px] flex items-center justify-center text-[#007aff] group-hover:scale-110 transition-transform duration-300">
        <span aria-hidden="true">{icon}</span>
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-3">
        {t(titleKey)}
      </h3>
      <p className="text-muted-foreground text-base leading-relaxed">
        {t(descKey)}
      </p>
    </div>
  );
}
