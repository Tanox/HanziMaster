// app/components/Header.tsx v1.3.4
import React from 'react';
import { Brush, WifiOff, Trophy, Settings } from 'lucide-react';
import InstallPWA from './InstallPWA';
import { UILabels, Achievement } from '../types';

interface HeaderProps {
  labels: UILabels;
  isOffline: boolean;
  version: string;
  newlyUnlocked?: Achievement[];
  onStartChallenge?: () => void;
  onShowAchievements?: () => void;
  onOpenSettings?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  labels, 
  isOffline, 
  version,
  newlyUnlocked,
  onStartChallenge,
  onShowAchievements,
  onOpenSettings
}) => {
  return (
    <header id="app-header" className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800 sticky top-0 z-40 transition-colors duration-300 supports-[backdrop-filter]:bg-white/60">
      <div id="header-content" className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 text-teal-700 dark:text-teal-400">
          <Brush size={24} />
          <h1 className="font-bold text-xl tracking-tight text-slate-800 dark:text-slate-100 font-hanzi">
            {labels.appTitle}
          </h1>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
           {isOffline && (
             <div id="offline-indicator" className="flex items-center gap-1.5 px-2.5 py-1.5 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded-full border border-amber-100 dark:border-amber-900/30 animate-fade-in cursor-help transition-colors" title={labels.offlineModeActive}>
                <WifiOff size={14} />
                <span className="text-[10px] font-bold uppercase tracking-wider hidden sm:inline">{labels.settingOfflineMode}</span>
             </div>
           )}
           
           {onStartChallenge && (
             <button 
               onClick={onStartChallenge} 
               className="p-2 text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all active:scale-95"
               aria-label={labels.startChallenge || 'Start Challenge'}
               title={labels.startChallenge || 'Start Challenge'}
             >
               <Brush size={20} />
             </button>
           )}
           
           {onShowAchievements && (
             <button 
               onClick={onShowAchievements} 
               className="p-2 text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all active:scale-95 relative"
               aria-label="Achievements"
               title="Achievements"
             >
               <Trophy size={20} />
               {newlyUnlocked && newlyUnlocked.length > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-slate-900" />
               )}
             </button>
           )}
           
           {onOpenSettings && (
             <button 
               onClick={onOpenSettings} 
               className="p-2 text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all active:scale-95"
               aria-label="Settings"
               title={labels.settingsTitle || 'Settings'}
             >
               <Settings size={20} />
             </button>
           )}

           <InstallPWA installLabel={labels.installApp || 'Install App'} />
        </div>
      </div>
    </header>
  );
};

export default Header;
