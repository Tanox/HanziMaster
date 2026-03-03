// app/components/dashboard/ActionButtons.tsx v1.3.7
import React from 'react';
import { Video, Brush, Trophy, Settings } from 'lucide-react';
import { UILabels, Achievement } from '../../types';

interface ActionButtonsProps {
  labels: UILabels;
  activeChar: string;
  newlyUnlocked: Achievement[];
  onOpenVideoModal: () => void;
  onStartChallenge: () => void;
  onShowAchievements: () => void;
  onOpenSettings: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  labels,
  activeChar,
  newlyUnlocked,
  onOpenVideoModal,
  onStartChallenge,
  onShowAchievements,
  onOpenSettings,
}) => {
  return (
    <div className="flex items-center gap-2 md:gap-3 mb-8 md:mb-0">
       {activeChar && (
         <button 
           onClick={onOpenVideoModal} 
           className="p-3 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm transition-all active:scale-95"
           aria-label={labels.generateVideo || 'Generate Video'}
           title={labels.generateVideo || 'Generate Video'}
         >
           <Video size={20} />
         </button>
       )}
       <button 
         onClick={onStartChallenge} 
         className="p-3 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm transition-all active:scale-95"
         aria-label={labels.startChallenge || 'Start Challenge'}
         title={labels.startChallenge || 'Start Challenge'}
       >
         <Brush size={20} />
       </button>
       <button 
         onClick={onShowAchievements} 
         className="p-3 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm transition-all active:scale-95 relative"
         aria-label="Achievements"
         title="Achievements"
       >
         <Trophy size={20} />
         {newlyUnlocked && newlyUnlocked.length > 0 && (
            <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-slate-800" />
         )}
       </button>
       <button 
         onClick={onOpenSettings} 
         className="p-3 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm transition-all active:scale-95"
         aria-label="Settings"
         title={labels.settingsTitle || 'Settings'}
       >
         <Settings size={20} />
       </button>
    </div>
  );
};

export default ActionButtons;
