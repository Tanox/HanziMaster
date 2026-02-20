// app/components/Header.tsx v1.1.6
import React, { useState, useEffect } from 'react';
import { Brush, Settings, WifiOff } from 'lucide-react';
import InstallPWA from './InstallPWA';
import ShareButton from './ShareButton';
import PromoShareButton from './PromoShareButton';
import { UILabels } from '../types';

interface HeaderProps {
  labels: UILabels;
  onOpenSettings: () => void;
  isOffline: boolean;
  version: string;
  currentLang: string;
}

const Header = ({ labels, onOpenSettings, isOffline, version, currentLang }: HeaderProps) => {
  const [origin, setOrigin] = useState('');

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

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
           <PromoShareButton
              lang={currentLang === 'zh-CN' ? 'zhCN' : 'en'}
              labels={{
                shareAction: labels.promoShareAction || labels.shareAction,
                shareMessageCopied: labels.promoShareCopied || labels.shareMessageCopied,
                copyFailed: labels.copyFailed
              }}
              size={20}
              className="p-3 md:p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors touch-manipulation"
           />
           <ShareButton
              title={labels.shareAppTitle || "Share HanziMaster"}
              text={(labels.shareAppText || "Check out HanziMaster: {url}").replace('{url}', origin)}
              url={origin}
              labels={labels}
              size={20}
              className="p-3 md:p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors touch-manipulation"
           />
           <InstallPWA installLabel={labels.installApp || 'Install App'} />
           <button id="settings-button" onClick={onOpenSettings} className="p-3 md:p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors touch-manipulation" aria-label="Settings">
             <Settings size={20} />
           </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
