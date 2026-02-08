import React from 'react';
import { Globe } from 'lucide-react';
import { LANGUAGES } from '../locales';

interface LanguageSelectorProps {
  currentLang: string;
  onLanguageChange: (langCode: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ currentLang, onLanguageChange }) => {
  return (
    <div className="relative group">
      <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
        <Globe size={16} className="text-slate-500 dark:text-slate-400" />
        <select
          value={currentLang}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="bg-transparent text-sm font-medium text-slate-700 dark:text-slate-200 outline-none cursor-pointer appearance-none pr-4"
        >
          {LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.code} className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">
              {lang.native}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <svg className="w-2 h-2 text-slate-500 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;