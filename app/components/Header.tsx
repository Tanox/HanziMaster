// app/components/Header.tsx v1.3.4
import React from 'react';
import { Brush, WifiOff } from 'lucide-react';
import InstallPWA from './InstallPWA';
import { UILabels } from '../types';

interface HeaderProps {
  labels: UILabels;
  isOffline: boolean;
  version: string;
}

const Header: React.FC<HeaderProps> = ({ labels, isOffline, version }) => {
  return (
    <header id="app-header" className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800 sticky top-0 z-40 transition-colors duration-300 supports-[backdrop-filter]:bg-white/60">
      <div id="header-content" className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 text-teal-700 dark:text-teal-400">
          <Brush size={24} />
          <h1 className="font-bold text-xl tracking-tight text-slate-800 dark:text-slate-100 font-hanzi">
            {labels.appTitle} <span className="text-[10px] font-sans font-normal opacity-40 ml-1">v{version}</span>
          </h1>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
           {isOffline && (
             <div id="offline-indicator" className="flex items-center gap-1.5 px-2.5 py-1.5 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded-full border border-amber-100 dark:border-amber-900/30 animate-fade-in cursor-help transition-colors" title={labels.offlineModeActive}>
                <WifiOff size={14} />
                <span className="text-[10px] font-bold uppercase tracking-wider hidden sm:inline">{labels.settingOfflineMode}</span>
             </div>
           )}
           <InstallPWA installLabel={labels.installApp || 'Install App'} />
        </div>
      </div>
    </header>
  );
};

export default Header;
