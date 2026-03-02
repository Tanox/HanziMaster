import React from 'react';
import { Achievement, UserStats, UILabels } from '../types';
import { motion } from 'motion/react';

interface AchievementsPanelProps {
  achievements: Achievement[];
  stats: UserStats;
  onClose: () => void;
  labels: UILabels;
}

export const AchievementsPanel: React.FC<AchievementsPanelProps> = ({ achievements, stats, onClose, labels }) => {
  const getLocalizedText = (key: string, defaultText: string) => {
    return labels[key] || defaultText;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl w-full max-w-lg max-h-[80vh] overflow-hidden flex flex-col"
      >
        <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            {getLocalizedText('achievementsTitle', '成就与奖励')}
          </h2>
          <button onClick={onClose} className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">
            ✕
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Stats Summary */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-zinc-50 dark:bg-zinc-800 p-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{stats.totalPracticed}</div>
              <div className="text-xs text-zinc-500 uppercase tracking-wider">
                {getLocalizedText('statsTotalPracticed', '累计练习')}
              </div>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-800 p-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{stats.daysStreak}</div>
              <div className="text-xs text-zinc-500 uppercase tracking-wider">
                {getLocalizedText('statsDaysStreak', '连续天数')}
              </div>
            </div>
          </div>

          {/* Achievements List */}
          <div className="space-y-4">
            {achievements.map(achievement => {
              const titleKey = `achievement_${achievement.id}_title`;
              const descKey = `achievement_${achievement.id}_desc`;
              const rewardKey = `achievement_${achievement.id}_reward`;
              
              return (
                <div 
                  key={achievement.id}
                  className={`flex items-center p-4 rounded-xl border ${
                    achievement.unlocked 
                      ? 'bg-indigo-50 border-indigo-200 dark:bg-indigo-900/20 dark:border-indigo-800' 
                      : 'bg-zinc-50 border-zinc-200 dark:bg-zinc-800/50 dark:border-zinc-800 opacity-60'
                  }`}
                >
                  <div className="text-4xl mr-4 filter drop-shadow-sm">
                    {achievement.unlocked ? achievement.icon : '🔒'}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-bold ${achievement.unlocked ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-500'}`}>
                      {getLocalizedText(titleKey, achievement.title)}
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      {getLocalizedText(descKey, achievement.description)}
                    </p>
                    {achievement.reward && (
                      <div className="mt-1 text-xs font-medium text-amber-600 dark:text-amber-400 flex items-center">
                        🎁 {getLocalizedText('rewardLabel', '奖励')}: {getLocalizedText(rewardKey, achievement.reward)}
                      </div>
                    )}
                  </div>
                  {achievement.unlocked && (
                    <div className="text-indigo-500 dark:text-indigo-400">
                      ✓
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
