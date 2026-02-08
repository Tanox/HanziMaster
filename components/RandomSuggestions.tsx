import React, { useState, useEffect } from 'react';
import { COMMON_CHARS } from '../utils/commonChars';
import { Sparkles } from 'lucide-react';

interface RandomSuggestionsProps {
  onSelect: (char: string) => void;
  label: string;
}

const RandomSuggestions: React.FC<RandomSuggestionsProps> = ({ onSelect, label }) => {
  const [chars, setChars] = useState<string[]>([]);

  const generateChars = () => {
    const newChars: string[] = [];
    const len = COMMON_CHARS.length;
    // Generate enough chars for the largest breakpoint (6 chars)
    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * len);
        newChars.push(COMMON_CHARS[randomIndex]);
    }
    setChars(newChars);
  };

  useEffect(() => {
    generateChars();
  }, []);

  const handleCharClick = (char: string) => {
    onSelect(char);
    // Refresh suggestions after selection to provide a continuous discovery experience
    // Small delay to make it feel natural after the UI transition starts
    setTimeout(generateChars, 500); 
  };

  return (
    <div className="w-full mt-16 mb-8 border-t border-slate-100 dark:border-slate-800 pt-10">
      <div className="flex items-center justify-center gap-2 mb-6 text-slate-400 dark:text-slate-500 animate-fade-in">
        <Sparkles size={16} />
        <h3 className="text-sm font-medium uppercase tracking-wider">
          {label}
        </h3>
      </div>
      
      <div className="flex flex-wrap justify-center gap-3 sm:gap-5">
        {chars.map((char, index) => (
          <button
            key={`${char}-${index}`}
            onClick={() => handleCharClick(char)}
            className={`
              w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20
              flex items-center justify-center
              text-2xl sm:text-3xl font-hanzi
              bg-white dark:bg-slate-800
              text-slate-600 dark:text-slate-300
              rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700
              hover:border-teal-500 dark:hover:border-teal-400
              hover:text-teal-600 dark:hover:text-teal-400
              hover:shadow-md hover:-translate-y-1
              active:scale-95
              transition-all duration-300
              /* Responsive Logic: 3 chars on mobile, up to 6 on large screens */
              ${index >= 3 ? 'hidden sm:flex' : 'flex'} 
              ${index >= 4 ? 'md:flex' : ''}
              ${index >= 5 ? 'lg:flex' : ''}
            `}
            title={`Learn ${char}`}
            aria-label={`Learn character ${char}`}
          >
            {char}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RandomSuggestions;