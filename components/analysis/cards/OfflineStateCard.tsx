
/**
 * HanziMaster v0.5.1
 */
import React from 'react';
import { WifiOff, Activity } from 'lucide-react';
import { UILabels } from '../../../locales/types';

interface OfflineStateCardProps {
  labels: UILabels;
}

const OfflineStateCard: React.FC<OfflineStateCardProps> = ({ labels }) => {
  return (
    <div className="md:col-span-4 bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left animate-fade-in">
        <div className="shrink-0 p-4 bg-white dark:bg-slate-800 rounded-full shadow-sm text-slate-400 dark:text-slate-500">
            <WifiOff size={28} />
        </div>
        <div className="flex-1">
            <h3 className="text-base font-bold text-slate-700 dark:text-slate-200 mb-1.5 flex items-center justify-center md:justify-start gap-2">
                {labels.offlineModeActive || "Offline Mode Active"}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3 max-w-lg mx-auto md:mx-0">
                AI analysis (etymology, mnemonics) is currently unavailable. 
                However, you can still access stroke order animations, handwriting practice, and basic pronunciations.
            </p>
            <div className="flex items-center justify-center md:justify-start gap-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                <span className="flex items-center gap-1 bg-white dark:bg-slate-800 px-2 py-1 rounded border border-slate-100 dark:border-slate-700">
                    <Activity size={12} className="text-teal-500" />
                    Stroke Order
                </span>
                 <span className="flex items-center gap-1 bg-white dark:bg-slate-800 px-2 py-1 rounded border border-slate-100 dark:border-slate-700">
                    <Activity size={12} className="text-teal-500" />
                    Practice Mode
                </span>
            </div>
        </div>
    </div>
  );
};

export default OfflineStateCard;
