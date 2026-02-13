
/**
 * HanziMaster v0.4.2
 */
import React, { useState, useEffect } from 'react';
import { Search, Shuffle } from 'lucide-react';
import { useToast } from '../context/ToastContext';

interface SearchInputProps {
  onSearch: (char: string) => void;
  onRandom: () => void;
  isLoading: boolean;
  placeholderText: string;
  invalidCharMessage: string;
  randomButtonLabel: string;
  activeChar?: string;
  activeTerm?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ 
  onSearch, 
  onRandom,
  isLoading, 
  placeholderText, 
  invalidCharMessage,
  randomButtonLabel,
  activeChar,
  activeTerm
}) => {
  const [input, setInput] = useState('');
  const { showToast } = useToast();

  useEffect(() => {
    if (activeTerm) {
      setInput(activeTerm);
    } else if (activeChar) {
      setInput(activeChar);
    }
  }, [activeChar, activeTerm]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      const term = input.trim();
      if (/^[\u4E00-\u9FFF]{1,4}$/.test(term)) {
        onSearch(term);
      } else {
        showToast(invalidCharMessage, 'error');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-[320px] mx-auto mb-8 transition-all duration-300">
      <div className="relative flex items-center group">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholderText}
          className="w-full pl-6 pr-20 py-3 text-xl text-center bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-full focus:outline-none focus:border-teal-500 dark:focus:border-teal-500 focus:ring-2 focus:ring-teal-200 dark:focus:ring-teal-900/50 transition-all font-hanzi placeholder-slate-400 dark:placeholder-slate-500 shadow-sm group-hover:shadow-md group-hover:border-slate-300 dark:group-hover:border-slate-600"
          disabled={isLoading}
          maxLength={4}
        />
        <div className="absolute right-1.5 flex gap-1">
            <button
              type="button"
              onClick={onRandom}
              disabled={isLoading}
              className="p-2 text-slate-400 hover:text-teal-600 dark:text-slate-500 dark:hover:text-teal-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
              title={randomButtonLabel}
            >
              <Shuffle size={20} />
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="p-2 bg-teal-600 dark:bg-teal-500 text-white rounded-full hover:bg-teal-700 dark:hover:bg-teal-600 disabled:bg-slate-300 dark:disabled:bg-slate-700 transition-all shadow-sm hover:shadow active:scale-95"
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
