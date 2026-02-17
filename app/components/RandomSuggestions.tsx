// app/components/RandomSuggestions.tsx v0.9.6
import React from 'react';
import { SEASONAL_EVENTS } from '../constants/seasonalEvents';
import { UILabels } from '../types';
import { Sparkles, Calendar, RefreshCw } from 'lucide-react';
import { useSuggestions } from '../hooks/useSuggestions';

interface RandomSuggestionsProps {
  onSelect: (term: string) => void;
  label: string;
  pinyinCache: Record<string, string>;
  labels: UILabels;
}

const RandomSuggestions: React.FC<RandomSuggestionsProps> = ({ onSelect, label, pinyinCache, labels }) => {
  const { items, activeSeasonKey, generateItems } = useSuggestions();

  const handleItemClick = (term: string) => {
    onSelect(term);
    setTimeout(generateItems, 800); 
  };

  const getPinyin = (term: string) => {
    if (term.length === 1) {
      return pinyinCache[term] || null;
    }
    const chars = term.split('');
    const pinyins = chars.map(c => pinyinCache[c] || '?');
    if (pinyins.every(p => p === '?')) return null;
    return pinyins.join(' ');
  };

  const activeSeasonLabel = activeSeasonKey ? labels[activeSeasonKey] : null;

  return (
    <div id="random-suggestions-container" className="w-full mt-12 lg:mt-16 mb-4 border-t border-slate-100 dark:border-slate-800 pt-10 px-4">
      <div id="suggestions-header" className="flex items-center justify-center gap-3 mb-8 text-slate-400 dark:text-slate-500">
        <div className="flex items-center gap-2">
            {activeSeasonLabel ? (
                <>
                    <Calendar size={16} className="text-vermilion-500" />
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-vermilion-600 dark:text-vermilion-400">
                        {activeSeasonLabel} {labels.suggestionsLabel || 'Suggestions'}
                    </h3>
                </>
            ) : (
                <>
                    <Sparkles size={16} className="text-amber-400" />
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em]">{label}</h3>
                </>
            )}
        </div>

        <button 
            onClick={generateItems} 
            className="group p-1.5 rounded-full hover:text-teal-500 hover:bg-teal-50 dark:hover:bg-slate-800 transition-all duration-300 active:scale-90"
            title={labels.refreshSuggestions || "Refresh Suggestions"}
            aria-label={labels.refreshSuggestions || "Refresh Suggestions"}
         >
           <RefreshCw size={14} className="group-hover:rotate-180 transition-transform duration-500" />
         </button>
      </div>
      
      <div id="suggestions-grid" className="flex flex-wrap justify-center gap-4 sm:gap-6">
        {items.map((item, index) => {
          const pinyin = getPinyin(item);
          const isIdiom = item.length >= 4;
          const seasonalTerms = activeSeasonKey 
             ? SEASONAL_EVENTS.find(e => e.name === activeSeasonKey)?.keywords || [] 
             : [];
          const isSeasonal = seasonalTerms.includes(item);

          return (
            <button
              key={`${item}-${index}`}
              id={`suggestion-item-${index}`}
              onClick={() => handleItemClick(item)}
              className={`group relative min-w-[70px] sm:min-w-[120px] h-24 sm:h-32 px-4 flex flex-col items-center justify-center bg-white dark:bg-slate-800 rounded-2xl border ${isSeasonal ? 'border-vermilion-300 dark:border-vermilion-700 bg-vermilion-50/50' : 'border-slate-200 dark:border-slate-700'} hover:border-teal-400 transition-all duration-300 hover:-translate-y-1.5 active:scale-95`}
            >
              {isSeasonal && <div className="absolute top-1 right-1 w-2 h-2 bg-vermilion-500 rounded-full animate-pulse" />}
              <ruby className={`font-hanzi transition-colors ${isSeasonal ? 'text-vermilion-700 dark:text-vermilion-200' : 'text-slate-700 dark:text-slate-200'} group-hover:text-teal-600 ${isIdiom ? 'text-xl sm:text-2xl' : 'text-3xl sm:text-4xl'}`}>
                {item}
                <rt className="font-pinyin text-[10px] sm:text-xs font-medium text-slate-400">{pinyin}</rt>
              </ruby>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default RandomSuggestions;