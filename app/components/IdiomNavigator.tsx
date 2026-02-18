// app/components/IdiomNavigator.tsx v1.0.1
import React from 'react';

interface IdiomNavigatorProps {
  term: string;
  activeChar: string;
  activeIndex: number;
  onSelectChar: (char: string, index: number) => void;
}

const IdiomNavigator: React.FC<IdiomNavigatorProps> = ({ term, activeIndex, onSelectChar }) => {
  const isIdiomMode = term.length > 1;

  if (!isIdiomMode) return null;

  return (
    <div id="idiom-navigator-wrapper" className="flex flex-col items-center gap-3 w-full mb-8 animate-fade-in">
        <div id="idiom-chars-row" className="relative p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-inner flex items-center justify-between w-full max-w-xs">
            {term.split('').map((char, index) => {
                const isActive = index === activeIndex;
                const isPassed = index < activeIndex;
                
                return (
                <button
                    key={`${char}-${index}`}
                    onClick={() => onSelectChar(char, index)}
                    className={`relative z-10 w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center text-2xl font-hanzi transition-all duration-500 ${isActive ? 'bg-vermilion-500 text-white shadow-lg scale-110 -translate-y-1' : isPassed ? 'bg-teal-50 dark:bg-teal-900/20 text-teal-600 opacity-60' : 'text-slate-400 hover:text-slate-600 hover:bg-white'}`}
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
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-[0.2em]">{activeIndex + 1} / {term.length}</p>
        </div>
    </div>
  );
};

export default IdiomNavigator;
