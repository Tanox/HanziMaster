
/**
 * HanziMaster v0.4.9
 */
import React from 'react';
import { PINYIN_MAP } from '../constants/pinyinData';
import { SEASONAL_EVENTS } from '../constants/seasonalEvents';
import { UILabels } from '../locales/types';
import { Sparkles, Headphones, Calendar } from 'lucide-react';
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
    // If single char, try dictionary or cache
    if (term.length === 1) {
      return PINYIN_MAP[term] || pinyinCache[term] || null;
    }
    
    // If term/idiom, try to concat pinyin for each char
    const chars = term.split('');
    const pinyins = chars.map(c => PINYIN_MAP[c] || pinyinCache[c] || '?');
    
    // If none found, return null to show placeholder
    if (pinyins.every(p => p === '?')) return null;
    
    return pinyins.join(' ');
  };

  // Resolve the display name from labels using the key
  const activeSeasonLabel = activeSeasonKey ? labels[activeSeasonKey] : null;

  return (
    <div id="random-suggestions-container" className="w-full mt-12 lg:mt-16 mb-8 border-t border-slate-100 dark:border-slate-800 pt-10 px-4">
      <div id="suggestions-header" className="flex items-center justify-center gap-2 mb-8 text-slate-400 dark:text-slate-500 animate-fade-in">
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
                <h3 className="text-xs font-bold uppercase tracking-[0.2em]">
                {label}
                </h3>
            </>
        )}
      </div>
      
      <div id="suggestions-grid" className="flex flex-wrap justify-center gap-4 sm:gap-5 md:gap-6">
        {items.map((item, index) => {
          const pinyin = getPinyin(item);
          const isIdiom = item.length >= 4;
          // Highlight seasonal items if active
          const seasonalTerms = activeSeasonKey 
             ? SEASONAL_EVENTS.find(e => e.name === activeSeasonKey)?.keywords || [] 
             : [];
          const isSeasonal = seasonalTerms.includes(item);

          return (
            <button
              key={`${item}-${index}`}
              id={`suggestion-item-${index}`}
              onClick={() => handleItemClick(item)}
              className={`
                group relative
                min-w-[70px] sm:min-w-[90px] md:min-w-[120px] h-20 sm:h-24 md:h-28 px-4
                flex flex-col items-center justify-center
                bg-white dark:bg-slate-800
                rounded-2xl border
                ${isSeasonal 
                    ? 'border-vermilion-300 dark:border-vermilion-700 bg-vermilion-50/50 dark:bg-vermilion-900/10' 
                    : 'border-slate-200 dark:border-slate-700'}
                hover:border-teal-400 dark:hover:border-teal-600
                hover:shadow-xl hover:shadow-teal-500/10
                hover:-translate-y-1.5
                active:scale-95
                transition-all duration-300 ease-out
                ${index >= 4 ? 'hidden sm:flex' : 'flex'} 
                ${index >= 5 ? 'md:flex' : ''}
              `}
              title={`Learn ${item}`}
            >
              {isSeasonal && (
                  <div className="absolute top-1 right-1 w-2 h-2 bg-vermilion-500 rounded-full animate-pulse" />
              )}

              <ruby className={`
                font-hanzi transition-colors
                ${isSeasonal ? 'text-vermilion-700 dark:text-vermilion-200' : 'text-slate-700 dark:text-slate-200'}
                group-hover:text-teal-600 dark:group-hover:text-teal-400
                ${isIdiom ? 'text-xl sm:text-2xl md:text-3xl' : 'text-3xl sm:text-4xl'}
              `}>
                {item}
                <rt className={`
                    text-[9px] sm:text-[10px] md:text-xs font-medium pt-1 transition-colors 
                    ${pinyin ? 'text-slate-400 group-hover:text-teal-50' : 'text-slate-300 italic'}
                `}>
                  {pinyin || <Headphones size={10} className="inline opacity-50" />}
                </rt>
              </ruby>
              
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-teal-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
          );
        })}
      </div>
      
      <div id="suggestions-refresh-container" className="mt-8 text-center">
         <button 
           id="refresh-suggestions-btn"
           onClick={generateItems}
           className="text-[10px] font-bold text-slate-400 hover:text-teal-500 uppercase tracking-widest transition-colors py-2 px-4 rounded-full border border-slate-100 dark:border-slate-800 hover:border-teal-200 dark:hover:border-teal-900"
         >
           {labels.refreshSuggestions || "Refresh Suggestions"}
         </button>
      </div>
    </div>
  );
};

export default RandomSuggestions;
