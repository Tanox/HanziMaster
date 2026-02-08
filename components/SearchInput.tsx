import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchInputProps {
  onSearch: (char: string) => void;
  isLoading: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch, isLoading }) => {
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
        alert("Please enter a valid Chinese character.");
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
          placeholder="Enter a Chinese character (e.g., 爱)"
          className="w-full px-6 py-4 text-lg bg-white border-2 border-slate-200 rounded-full shadow-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all font-hanzi"
          disabled={isLoading}
          maxLength={5}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="absolute right-2 p-3 bg-teal-600 text-white rounded-full hover:bg-teal-700 disabled:bg-slate-300 transition-colors"
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