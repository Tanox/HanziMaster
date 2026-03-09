// app/components/dashboard/WelcomeContent.tsx v1.6.1
import React from 'react';
import Image from 'next/image';
import { UILabels, HistoryItem, User, AppSettings } from '../../types';
import LearningPath from '../LearningPath';
import { User as UserIcon, ArrowRight, Settings, Moon, Sun, Globe, WifiOff, LogOut } from 'lucide-react';

interface WelcomeContentProps {
  labels: UILabels;
  history: HistoryItem[];
  currentLang: string;
  user: User | null;
  onSearch: (term: string, lang: string) => void;
  onClearProgress: () => void;
  onOpenAuth: () => void;
  onOpenSettings: () => void;
  onLogout: () => void;
  theme: 'light' | 'dark' | undefined;
  onThemeChange: () => void;
  onLanguageChange: (lang: string) => void;
  settings: AppSettings;
  onUpdateSettings: (settings: AppSettings) => void;
}

const WelcomeContent: React.FC<WelcomeContentProps> = ({
  labels,
  history,
  currentLang,
  user,
  onSearch,
  onClearProgress,
  onOpenAuth,
  onOpenSettings,
  onLogout,
  theme,
  onThemeChange,
  onLanguageChange,
  settings,
  onUpdateSettings,
}) => {
  return (
    <div className="mt-8 flex flex-col items-center gap-6 animate-in fade-in slide-in-from-bottom-2 duration-700 delay-300 w-full">
      {!user ? (
        <div className="w-full max-w-lg p-6 bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-900/30 rounded-3xl flex flex-col sm:flex-row items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-teal-600 dark:text-teal-400 shrink-0 shadow-sm">
            <UserIcon size={24} />
          </div>
          <div className="flex-grow text-center sm:text-left">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">{labels.authTitle}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{labels.authSubtitle}</p>
          </div>
          <button 
            onClick={onOpenAuth}
            className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold rounded-xl transition-all active:scale-95 flex items-center gap-2 shadow-md shadow-teal-600/20"
          >
            {labels.login}
            <ArrowRight size={16} />
          </button>
        </div>
      ) : (
        <div className="w-full max-w-lg p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl shadow-sm flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center text-teal-600 dark:text-teal-400 shrink-0 shadow-sm relative overflow-hidden">
              {user.photoURL ? (
                <Image 
                  src={user.photoURL} 
                  alt={user.displayName || 'User'} 
                  fill 
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <UserIcon size={32} />
              )}
            </div>
            <div className="flex-grow">
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">{user.displayName || labels.guestMode}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">{user.email}</p>
            </div>
            <button 
              onClick={onLogout}
              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
              title={labels.logout}
            >
              <LogOut size={20} />
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={onThemeChange}
              className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors text-left"
            >
              <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-300">
                {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
              </div>
              <div>
                <div className="text-xs font-bold text-slate-700 dark:text-slate-200">{labels.settingTheme}</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">{theme === 'dark' ? labels.themeDark : labels.themeLight}</div>
              </div>
            </button>
            
            <button
              onClick={() => onLanguageChange(currentLang === 'en' ? 'zh-CN' : 'en')}
              className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors text-left"
            >
              <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-300">
                <Globe size={18} />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-700 dark:text-slate-200">{labels.settingLanguage}</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">{currentLang === 'en' ? 'English' : '中文'}</div>
              </div>
            </button>
            
            <button
              onClick={() => onUpdateSettings({ ...settings, offlineMode: !settings.offlineMode })}
              className={`flex items-center gap-3 p-3 rounded-xl border transition-colors text-left ${settings.offlineMode ? 'border-amber-200 bg-amber-50 dark:border-amber-900/50 dark:bg-amber-900/20' : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50'}`}
            >
              <div className={`p-2 rounded-lg ${settings.offlineMode ? 'bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
                <WifiOff size={18} />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-700 dark:text-slate-200">{labels.settingOfflineMode}</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">{settings.offlineMode ? 'On' : 'Off'}</div>
              </div>
            </button>
            
            <button
              onClick={onOpenSettings}
              className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors text-left"
            >
              <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-300">
                <Settings size={18} />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-700 dark:text-slate-200">{labels.settingsTitle}</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">Advanced</div>
              </div>
            </button>
          </div>
        </div>
      )}

      {history && history.length > 0 && (
        <div className="w-full max-w-lg">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-widest font-bold">{labels.recentHistory}</span>
            <button 
              onClick={onClearProgress}
              className="text-[10px] text-slate-400 hover:text-red-500 transition-colors uppercase tracking-tighter"
            >
              {labels.clearBtn}
            </button>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {history.slice(0, 8).map((item) => (
              <button
                key={`${item.char}-${item.timestamp}`}
                onClick={() => onSearch(item.char, currentLang)}
                className="px-4 py-2 text-lg font-hanzi bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-teal-50 dark:hover:bg-teal-900/30 hover:text-teal-600 dark:hover:text-teal-400 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm transition-all active:scale-95"
              >
                {item.char}
              </button>
            ))}
          </div>
        </div>
      )}

      <LearningPath 
        labels={labels} 
        onSelectChar={(char) => onSearch(char, currentLang)} 
      />
    </div>
  );
};

export default WelcomeContent;
