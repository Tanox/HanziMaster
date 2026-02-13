
/**
 * HanziMaster v0.4.9
 */
import React from 'react';
import { UILabels } from '../../../locales/types';

interface StrokeCountCardProps {
  count: number;
  labels: UILabels;
  fullWidth?: boolean;
}

const StrokeCountCard: React.FC<StrokeCountCardProps> = ({ count, labels, fullWidth = false }) => {
  return (
      <div id="character-stroke-count-card" className={`bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 flex flex-col items-center justify-center text-center hover:border-vermilion-100 dark:hover:border-vermilion-900 transition-colors ${fullWidth ? 'md:col-span-2' : ''}`}>
          <span className="text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">{labels.strokeCount}</span>
          <span className="text-4xl font-mono font-light text-slate-800 dark:text-slate-200 mb-1">{count}</span>
      </div>
  );
};

export default StrokeCountCard;
