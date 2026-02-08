import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchInputProps {
  onSearch: (char: string) => void;
  isLoading: boolean;
  placeholderText: string;
  invalidCharMessage: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch, isLoading, placeholderText, invalidCharMessage }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      // Take only the first character if user types multiple
      const firstChar = input.trim()[0];
      // Basic check if it's a Chinese character (range 4E00-9FFF)
      if (/[\u4E00-\u9FFF]/.test(firstChar)) {
        onSearch(firstChar);
        setInput('');
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
          className="w-full px-6 py-4 text-lg bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-full shadow-sm focus:outline-none focus:border-teal-500 dark:focus:border-teal-500 focus:ring-2 focus:ring-teal-200 dark:focus:ring-teal-900/50 transition-all font-hanzi placeholder-slate-400 dark:placeholder-slate-500"
          disabled={isLoading}
          maxLength={5}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="absolute right-2 p-3 bg-teal-600 dark:bg-teal-500 text-white rounded-full hover:bg-teal-700 dark:hover:bg-teal-600 disabled:bg-slate-300 dark:disabled:bg-slate-700 transition-colors"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Search size={20} />
          )}
        </button>
      </div>
    </form>
  );
};

export default SearchInput;