// app/components/analysis/cards/BaseCard.tsx v1.3.4
import React from 'react';

interface BaseCardProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  className?: string;
}

const BaseCard: React.FC<BaseCardProps> = ({ icon, title, children, className = "" }) => (
  <div className={`bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm animate-fade-in ${className}`}>
    <div className="flex items-center gap-2 mb-3 text-slate-400 dark:text-slate-500">
      {icon}
      <h3 className="text-xs font-bold uppercase tracking-wider">{title}</h3>
    </div>
    {children}
  </div>
);

export default BaseCard;