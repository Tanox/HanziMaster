/**
 * HanziMaster v0.3.1
 */
import React from 'react';

interface IdiomNavigatorProps {
  term: string;
  activeChar: string;
  onSelectChar: (char: string) => void;
}

const IdiomNavigator: React.FC<IdiomNavigatorProps> = ({ term, activeChar, onSelectChar }) => {
  if (term.length <= 1) return null;

  const chars = term.split('');

  return (
    <div className="flex flex-col items-center gap-2 mb-6 animate-fade-in">
       <div className="flex items-center gap-2 md:gap-4 p-2 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
          {chars.map((char, index) => {
             const isActive = char === activeChar;
             return (
               <button
                 key={`${char}-${index}`}
                 onClick={() => onSelectChar(char)}
                 className={`
                    w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center text-2xl font-hanzi transition-all duration-300
                    ${isActive 
                        ? 'bg-vermilion-500 text-white shadow-md scale-110' 
                        : 'bg-slate-50 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600'}
                 `}
               >
                 {char}
               </button>
             );
          })}
       </div>
       <p className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider font-medium">
         Idiom Mode
       </p>
    </div>
  );
};

export default IdiomNavigator;