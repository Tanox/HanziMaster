// app/components/HistoryPanel.tsx v1.0.1
import React, { useMemo } from 'react';
import { HistoryItem, UILabels } from '../types';
import { Clock, Trash2, RefreshCw } from 'lucide-react';

interface HistoryPanelProps {
  history: HistoryItem[];
  learnedItems?: string[];
  dueReviews?: string[];
  onSelect: (char: string) => void;
  onClear: () => void;
  labels: UILabels;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, learnedItems = [], dueReviews = [], onSelect, onClear, labels }) => {
  const stats = useMemo(() => {
    const total = learnedItems.length;
    const chars = learnedItems.filter(item => item.length === 1).length;
    const terms = learnedItems.filter(item => item.length > 1).length;
    return { total, chars, terms };
  }, [learnedItems]);

  if (history.length === 0 && stats.total === 0 && dueReviews.length === 0) return null;

  return (
    <div id="history-panel-container" className="w-full mt-8 border-t border-slate-100 dark:border-slate-800 pt-8 animate-fade-in">
      
      {dueReviews.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 text-vermilion-500 mb-4 px-2">
            <RefreshCw size={16} />
            <h3 className="text-sm font-medium uppercase tracking-wider">{labels.dueReviews || "Due for Review"}</h3>
            <span className="ml-auto bg-vermilion-100 text-vermilion-700 text-xs font-bold px-2 py-0.5 rounded-full">
              {dueReviews.length}
            </span>
          </div>
          <div className="flex flex-wrap gap-3">
            {dueReviews.map((char, index) => (
              <button
                key={`review-${char}-${index}`}
                onClick={() => onSelect(char)}
                className="w-12 h-12 flex items-center justify-center font-hanzi text-xl bg-vermilion-50 dark:bg-vermilion-900/20 text-vermilion-700 dark:text-vermilion-300 rounded-xl border border-vermilion-200 hover:border-vermilion-500 transition-all shadow-sm"
              >
                {char}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-2 text-slate-400">
          <Clock size={16} />
          <h3 className="text-sm font-medium uppercase tracking-wider">{labels.historyTitle}</h3>
        </div>
        <button onClick={onClear} className="text-xs text-red-400 hover:text-red-500 flex items-center gap-1">
          <Trash2 size={12} />
          {labels.clearHistory}
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        {history.map((item, index) => (
          <button
            key={`${item.char}-${item.timestamp}-${index}`}
            onClick={() => onSelect(item.char)}
            className="w-12 h-12 flex items-center justify-center font-hanzi text-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl border border-slate-200 hover:border-teal-500 transition-all"
          >
            {item.char}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HistoryPanel;
