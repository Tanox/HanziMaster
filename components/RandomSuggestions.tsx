/**
 * HanziMaster v0.3.9
 */
import React, { useState, useEffect } from 'react';
import { COMMON_CHARS } from '../constants/commonChars.ts';
import { COMMON_TERMS } from '../constants/commonTerms.ts';
import { PINYIN_MAP } from '../constants/pinyinData.ts';
import { Sparkles, Headphones } from 'lucide-react';

interface RandomSuggestionsProps {
  onSelect: (term: string) => void;
  label: string;
  pinyinCache: Record<string, string>;
}

const RandomSuggestions: React.FC<RandomSuggestionsProps> = ({ onSelect, label, pinyinCache }) => {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    generateItems();
  }, []);

  const generateItems = () => {
    const newItems: string[] = [];
    
    // 混合策略: 2个单字 + 2个词组 + 2个成语 (或者完全随机)
    for (let i = 0; i < 6; i++) {
        const roll = Math.random();
        if (roll < 0.4) {
            // 40% 几率抽取单字
            newItems.push(COMMON_CHARS[Math.floor(Math.random() * COMMON_CHARS.length)]);
        } else {
            // 60% 几率抽取词组/成语
            newItems.push(COMMON_TERMS[Math.floor(Math.random() * COMMON_TERMS.length)]);
        }
    }
    setItems(newItems);
  };

  const handleItemClick = (term: string) => {
    onSelect(term);
    setTimeout(generateItems, 800); 
  };

  const getPinyin = (term: string) => {
    // 如果是单字，直接从字典或缓存取
    if (term.length === 1) {
      return PINYIN_MAP[term] || pinyinCache[term] || null;
    }
    
    // 如果是词组/成语，尝试拼接每个字的拼音
    const chars = term.split('');
    const pinyins = chars.map(c => PINYIN_MAP[c] || pinyinCache[c] || '?');
    
    // 如果全都没找到，返回 null 以显示占位符
    if (pinyins.every(p => p === '?')) return null;
    
    return pinyins.join(' ');
  };

  return (
    <div className="w-full mt-12 lg:mt-16 mb-8 border-t border-slate-100 dark:border-slate-800 pt-10 px-4">
      <div className="flex items-center justify-center gap-2 mb-8 text-slate-400 dark:text-slate-500 animate-fade-in">
        <Sparkles size={16} className="text-amber-400" />
        <h3 className="text-xs font-bold uppercase tracking-[0.2em]">
          {label}
        </h3>
      </div>
      
      <div className="flex flex-wrap justify-center gap-4 sm:gap-5 md:gap-6">
        {items.map((item, index) => {
          const pinyin = getPinyin(item);
          const isIdiom = item.length >= 4;
          
          return (
            <button
              key={`${item}-${index}`}
              onClick={() => handleItemClick(item)}
              className={`
                group relative
                min-w-[70px] sm:min-w-[90px] md:min-w-[120px] h-20 sm:h-24 md:h-28 px-4
                flex flex-col items-center justify-center
                bg-white dark:bg-slate-800
                rounded-2xl border border-slate-200 dark:border-slate-700
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
              <ruby className={`
                font-hanzi text-slate-700 dark:text-slate-200 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors
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
      
      <div className="mt-8 text-center">
         <button 
           onClick={generateItems}
           className="text-[10px] font-bold text-slate-400 hover:text-teal-500 uppercase tracking-widest transition-colors py-2 px-4 rounded-full border border-slate-100 dark:border-slate-800 hover:border-teal-200 dark:hover:border-teal-900"
         >
           Refresh Suggestions
         </button>
      </div>
    </div>
  );
};

export default RandomSuggestions;