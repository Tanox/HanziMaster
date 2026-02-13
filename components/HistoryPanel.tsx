
/**
 * HanziMaster v0.3.1
 */
import React from 'react';
import { HistoryItem } from '../types';
import { UILabels } from '../locales/types';
import { Clock, Trash2 } from 'lucide-react';

interface HistoryPanelProps {
  history: HistoryItem[];
  onSelect: (char: string) => void;
  onClear: () => void;
  labels: UILabels;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, onSelect, onClear, labels }) => {
  if (history.length === 0) return null;

  return (
    <div id="history-panel-container" className="w-full mt-8 border-t border-slate-100 dark:border-slate-800 pt-8 animate-fade-in">
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
