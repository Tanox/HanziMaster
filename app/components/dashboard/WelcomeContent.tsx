// app/components/dashboard/WelcomeContent.tsx v1.3.5
import React from 'react';
import { UILabels, HistoryItem } from '../../types';
import LearningPath from '../LearningPath';

interface WelcomeContentProps {
  labels: UILabels;
  history: HistoryItem[];
  currentLang: string;
  onSearch: (term: string, lang: string) => void;
  onClearProgress: () => void;
}

const WelcomeContent: React.FC<WelcomeContentProps> = ({
  labels,
  history,
  currentLang,
  onSearch,
  onClearProgress,
}) => {
  return (
    <div className="mt-8 flex flex-col items-center gap-6 animate-in fade-in slide-in-from-bottom-2 duration-700 delay-300">
      {history && history.length > 0 && (
        <div className="w-full max-w-lg">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-widest font-bold">{labels.recentHistory}</span>
            <button 
              onClick={onClearProgress}
              className="text-[10px] text-slate-400 hover:text-red-500 transition-colors uppercase tracking-tighter"
            >
              {labels.clearBtn}
            </button>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {history.slice(0, 8).map((item) => (
              <button
                key={`${item.char}-${item.timestamp}`}
                onClick={() => onSearch(item.char, currentLang)}
                className="px-4 py-2 text-lg font-hanzi bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-teal-50 dark:hover:bg-teal-900/30 hover:text-teal-600 dark:hover:text-teal-400 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm transition-all active:scale-95"
              >
                {item.char}
              </button>
            ))}
          </div>
        </div>
      )}

      <LearningPath 
        labels={labels} 
        onSelectChar={(char) => onSearch(char, currentLang)} 
      />
    </div>
  );
};

export default WelcomeContent;
