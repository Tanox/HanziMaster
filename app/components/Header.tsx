// app/components/Header.tsx v1.6.0
import Image from 'next/image';
import { Brush, WifiOff, Trophy, Settings, User as UserIcon, LogOut } from 'lucide-react';
import InstallPWA from './InstallPWA';
import { UILabels, Achievement, User } from '../types';

interface HeaderProps {
  labels: UILabels;
  isOffline: boolean;
  version: string;
  user?: User | null;
  newlyUnlocked?: Achievement[];
  onStartChallenge?: () => void;
  onShowAchievements?: () => void;
  onOpenSettings?: () => void;
  onOpenAuth?: () => void;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  labels, 
  isOffline, 
  version,
  user,
  newlyUnlocked,
  onStartChallenge,
  onShowAchievements,
  onOpenSettings,
  onOpenAuth,
  onLogout
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

           <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800 mx-1 hidden sm:block" />

           {user ? (
             <div className="flex items-center gap-2">
               <div className="hidden md:flex flex-col items-end">
                 <span className="text-xs font-bold text-slate-700 dark:text-slate-200 leading-none">{user.displayName}</span>
                 <button onClick={onLogout} className="text-[10px] text-slate-400 hover:text-red-500 transition-colors uppercase tracking-tighter font-bold">{labels.logout}</button>
               </div>
               <button 
                 onClick={onLogout}
                 className="md:hidden p-2 text-slate-500 dark:text-slate-400 hover:text-red-500 rounded-full transition-all"
                 title={labels.logout}
               >
                 <LogOut size={20} />
               </button>
               <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center text-teal-700 dark:text-teal-400 border border-teal-200 dark:border-teal-800 overflow-hidden relative">
                 {user.photoURL ? (
                   <Image 
                     src={user.photoURL} 
                     alt={user.displayName || 'User'} 
                     fill 
                     className="object-cover"
                     referrerPolicy="no-referrer"
                   />
                 ) : (
                   <UserIcon size={18} />
                 )}
               </div>
             </div>
           ) : (
             <button 
               onClick={onOpenAuth}
               className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-teal-900/30 text-slate-700 dark:text-slate-200 hover:text-teal-700 dark:hover:text-teal-400 rounded-xl transition-all font-bold text-sm border border-slate-200 dark:border-slate-700 hover:border-teal-200 dark:hover:border-teal-800 active:scale-95"
             >
               <UserIcon size={16} />
               <span className="hidden sm:inline">{labels.login}</span>
             </button>
           )}

           <InstallPWA installLabel={labels.installApp || 'Install App'} />
        </div>
      </div>
    </header>
  );
};

export default Header;
