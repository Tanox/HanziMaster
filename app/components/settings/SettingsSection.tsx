// app/components/settings/SettingsSection.tsx v1.0.1
import React from 'react';

interface SettingsSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({ title, children, className = "" }) => (
  <div className={`mb-8 last:mb-0 ${className}`}>
    <div className="flex items-center gap-3 mb-5">
      <div className="h-4 w-1 bg-teal-500 rounded-full"></div>
      <h4 className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-[0.2em]">{title}</h4>
    </div>
    <div className="space-y-4">
      {children}
    </div>
  </div>
);

export default SettingsSection;
