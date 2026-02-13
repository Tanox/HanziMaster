
/**
 * HanziMaster v0.4.2
 */
import React from 'react';

interface IdiomNavigatorProps {
  term: string;
  activeChar: string; // Kept in interface but ignoring use in component if unnecessary
  activeIndex: number;
  onSelectChar: (char: string, index: number) => void;
}

const IdiomNavigator: React.FC<IdiomNavigatorProps> = ({ term, activeIndex, onSelectChar }) => {
  if (term.length <= 1) return null;

  const chars = term.split('');

  return (
    <div className="flex flex-col items-center gap-3 mb-8 animate-fade-in w-full">
       <div className="relative p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-inner flex items-center justify-between w-full max-w-xs">
          {chars.map((char, index) => {
             const isActive = index === activeIndex;
             const isPassed = index < activeIndex;
             
             return (
               <button
                 key={`${char}-${index}`}
                 onClick={() => onSelectChar(char, index)}
                 className={`
                    relative z-10 w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center text-2xl font-hanzi transition-all duration-500
                    ${isActive 
                        ? 'bg-vermilion-500 text-white shadow-lg scale-110 -translate-y-1' 
                        : isPassed
                            ? 'bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 opacity-60'
                            : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-white dark:hover:bg-slate-700'}
                 `}
                 title={`Study ${char}`}
               >
                 {char}
                 {isPassed && (
                    <div className="absolute -top-1 -right-1 bg-teal-500 text-white rounded-full w-4 h-4 flex items-center justify-center border-2 border-white dark:border-slate-800">
                        <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 fill-none stroke-current stroke-[4px]"><path d="M20 6L9 17l-5-5" /></svg>
                    </div>
                 )}
               </button>
             );
          })}
       </div>
       <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-vermilion-500 animate-pulse"></span>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-bold tracking-[0.2em]">
                {activeIndex + 1} / {chars.length} • 成语书写模式
            </p>
       </div>
    </div>
  );
};

export default IdiomNavigator;