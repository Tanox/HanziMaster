/**
 * HanziMaster v0.3.1
 */
import React, { useState, useEffect } from 'react';
import { Search, Shuffle } from 'lucide-react';

interface SearchInputProps {
  onSearch: (char: string) => void;
  onRandom: () => void;
  isLoading: boolean;
  placeholderText: string;
  invalidCharMessage: string;
  randomButtonLabel: string;
  activeChar?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ 
  onSearch, 
  onRandom,
  isLoading, 
  placeholderText, 
  invalidCharMessage,
  randomButtonLabel,
  activeChar
}) => {
  const [input, setInput] = useState('');

  // Sync input when activeChar changes externally (e.g. random button clicked)
  useEffect(() => {
    if (activeChar) {
      setInput(activeChar);
    }
  }, [activeChar]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      // Take only the first character if user types multiple
      const firstChar = input.trim()[0];
      // Basic check if it's a Chinese character (range 4E00-9FFF)
      if (/[\u4E00-\u9FFF]/.test(firstChar)) {
        onSearch(firstChar);
      } else {
        alert(invalidCharMessage);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto mb-8">
      <div className="relative flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholderText}
          className="w-full pl-6 pr-28 py-4 text-lg bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-full focus:outline-none focus:border-teal-500 dark:focus:border-teal-500 focus:ring-2 focus:ring-teal-200 dark:focus:ring-teal-900/50 transition-all font-hanzi placeholder-slate-400 dark:placeholder-slate-500"
          disabled={isLoading}
          maxLength={5}
        />
        <div className="absolute right-2 flex gap-1">
            <button
              type="button"
              onClick={onRandom}
              disabled={isLoading}
              className="p-3 text-slate-400 hover:text-teal-600 dark:text-slate-500 dark:hover:text-teal-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
              title={randomButtonLabel}
            >
              <Shuffle size={20} />
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="p-3 bg-teal-600 dark:bg-teal-500 text-white rounded-full hover:bg-teal-700 dark:hover:bg-teal-600 disabled:bg-slate-300 dark:disabled:bg-slate-700 transition-colors"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Search size={20} />
              )}
            </button>
        </div>
      </div>
    </form>
  );
};

export default SearchInput;