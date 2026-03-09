// app/components/dashboard/WelcomeContent.tsx v1.6.0
import React from 'react';
import { UILabels, HistoryItem, User } from '../../types';
import LearningPath from '../LearningPath';
import { User as UserIcon, ArrowRight } from 'lucide-react';

interface WelcomeContentProps {
  labels: UILabels;
  history: HistoryItem[];
  currentLang: string;
  user: User | null;
  onSearch: (term: string, lang: string) => void;
  onClearProgress: () => void;
  onOpenAuth: () => void;
}

const WelcomeContent: React.FC<WelcomeContentProps> = ({
  labels,
  history,
  currentLang,
  user,
  onSearch,
  onClearProgress,
  onOpenAuth,
}) => {
  return (
    <div className="mt-8 flex flex-col items-center gap-6 animate-in fade-in slide-in-from-bottom-2 duration-700 delay-300">
      {!user && (
        <div className="w-full max-w-lg p-6 bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-900/30 rounded-3xl flex flex-col sm:flex-row items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-teal-600 dark:text-teal-400 shrink-0 shadow-sm">
            <UserIcon size={24} />
          </div>
          <div className="flex-grow text-center sm:text-left">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">{labels.authTitle}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{labels.authSubtitle}</p>
          </div>
          <button 
            onClick={onOpenAuth}
            className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold rounded-xl transition-all active:scale-95 flex items-center gap-2 shadow-md shadow-teal-600/20"
          >
            {labels.login}
            <ArrowRight size={16} />
          </button>
        </div>
      )}

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
