/**
 * app/components/settings/SettingsAppearance.tsx v0.7.1
 */
import React from 'react';
import { Palette, Sun, Moon, Globe } from 'lucide-react';
import { UILabels } from '../../types';
import { LANGUAGES } from '../../locales';
import SettingsSection from './SettingsSection';

interface SettingsAppearanceProps {
  labels: UILabels;
  currentTheme: 'light' | 'dark';
  onThemeChange: () => void;
  currentLang: string;
  onLanguageChange: (lang: string) => void;
}

const SettingsAppearance: React.FC<SettingsAppearanceProps> = ({ labels, currentTheme, onThemeChange, currentLang, onLanguageChange }) => (
  <SettingsSection title={labels.sectionAppearance || 'Appearance'}>
    <div className="space-y-4">
       <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800"><Palette size={16} /></div>
            <span className="text-slate-700 dark:text-slate-200 font-medium text-sm">{labels.settingTheme}</span>
          </div>
          <div className="flex bg-slate-100 dark:bg-slate-700/50 p-1 rounded-lg">
              <button onClick={() => currentTheme === 'dark' && onThemeChange()} className={`p-1.5 rounded-md transition-all ${currentTheme === 'light' ? 'bg-white shadow-sm text-amber-500' : 'text-slate-400'}`}><Sun size={14} /></button>
              <button onClick={() => currentTheme === 'light' && onThemeChange()} className={`p-1.5 rounded-md transition-all ${currentTheme === 'dark' ? 'bg-slate-600 shadow-sm text-indigo-400' : 'text-slate-400'}`}><Moon size={14} /></button>
          </div>
       </div>
       <div className="space-y-2">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800"><Globe size={16} /></div>
            <span className="text-slate-700 dark:text-slate-200 font-medium text-sm">{labels.settingLanguage}</span>
          </div>
          <select value={currentLang} onChange={(e) => onLanguageChange(e.target.value)} className="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-colors">
              {LANGUAGES.map((lang) => <option key={lang.code} value={lang.code}>{lang.native} ({lang.name})</option>)}
          </select>
       </div>
    </div>
  </SettingsSection>
);

export default SettingsAppearance;