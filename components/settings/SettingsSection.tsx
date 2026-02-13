
/**
 * HanziMaster v0.4.9
 */
import React from 'react';

interface SettingsSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({ title, children, className = "" }) => {
  return (
    <div className={`mb-6 last:mb-0 ${className}`}>
      <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
        {title}
      </h4>
      {children}
    </div>
  );
};

export default SettingsSection;
