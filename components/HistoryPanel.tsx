
/**
 * HanziMaster v0.5.3
 */
import React, { useMemo } from 'react';
import { HistoryItem } from '../types';
import { UILabels } from '../locales/types';
import { Clock, Trash2, Award, Zap, Book } from 'lucide-react';

interface HistoryPanelProps {
  history: HistoryItem[];
  learnedItems?: string[];
  onSelect: (char: string) => void;
  onClear: () => void;
  labels: UILabels;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ 
  history, 
  learnedItems = [], 
  onSelect, 
  onClear, 
  labels 
}) => {
  const stats = useMemo(() => {
    const total = learnedItems.length;
    const chars = learnedItems.filter(item => item.length === 1).length;
    const terms = learnedItems.filter(item => item.length > 1).length;
    return { total, chars, terms };
  }, [learnedItems]);

  if (history.length === 0 && stats.total === 0) return null;

  return (
    <div id="history-panel-container" className="w-full mt-8 border-t border-slate-100 dark:border-slate-800 pt-8 animate-fade-in">
      
      {/* Stats Summary Section */}
      <div id="learning-stats-summary" className="grid grid-cols-3 gap-3 mb-8">
          <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-2xl border border-amber-100 dark:border-amber-900/30 flex flex-col items-center justify-center">
              <Award size={16} className="text-amber-600 dark:text-amber-400 mb-1" />
              <span className="text-lg font-bold text-amber-700 dark:text-amber-300">{stats.total}</span>
              <span className="text-[9px] font-bold text-amber-600 dark:text-amber-500 uppercase tracking-tighter">{labels.statsTotal || "Total"}</span>
          </div>
          <div className="bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-2xl border border-indigo-100 dark:border-indigo-900/30 flex flex-col items-center justify-center">
              <Zap size={16} className="text-indigo-600 dark:text-indigo-400 mb-1" />
              <span className="text-lg font-bold text-indigo-700 dark:text-indigo-300">{stats.chars}</span>
              <span className="text-[9px] font-bold text-indigo-600 dark:text-indigo-500 uppercase tracking-tighter">{labels.statsChars || "Chars"}</span>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-2xl border border-emerald-100 dark:border-emerald-900/30 flex flex-col items-center justify-center">
              <Book size={16} className="text-emerald-600 dark:text-emerald-400 mb-1" />
              <span className="text-lg font-bold text-emerald-700 dark:text-emerald-300">{stats.terms}</span>
              <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-500 uppercase tracking-tighter">{labels.statsTerms || "Idioms"}</span>
          </div>
      </div>

      <div id="history-header" className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500">
          <Clock size={16} />
          <h3 className="text-sm font-medium uppercase tracking-wider">
            {labels.historyTitle}
          </h3>
        </div>
        <button
          id="clear-history-btn"
          onClick={onClear}
          className="text-xs text-red-400 hover:text-red-500 flex items-center gap-1 transition-colors px-2 py-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          <Trash2 size={12} />
          {labels.clearHistory}
        </button>
      </div>

      <div id="history-grid" className="flex flex-wrap gap-3">
        {history.map((item, index) => (
          <button
            key={`${item.char}-${item.timestamp}-${index}`}
            id={`history-item-${index}`}
            onClick={() => onSelect(item.char)}
            title={`Practiced on ${new Date(item.timestamp).toLocaleString()}`}
            className="w-12 h-12 flex items-center justify-center font-hanzi text-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-teal-500 dark:hover:border-teal-400 hover:text-teal-600 dark:hover:text-teal-400 transition-all hover:-translate-y-0.5"
          >
            {item.char}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HistoryPanel;
