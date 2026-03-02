import React, { useEffect } from 'react';
import { Achievement, UILabels } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface AchievementToastProps {
  achievements: Achievement[];
  onDismiss: () => void;
  labels: UILabels;
}

export const AchievementToast: React.FC<AchievementToastProps> = ({ achievements, onDismiss, labels }) => {
  const getLocalizedText = (key: string, defaultText: string) => {
    return labels[key] || defaultText;
  };

  useEffect(() => {
    if (achievements.length > 0) {
      const timer = setTimeout(onDismiss, 5000);
      return () => clearTimeout(timer);
    }
  }, [achievements, onDismiss]);

  if (achievements.length === 0) return null;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 pointer-events-none w-full max-w-sm px-4">
      <AnimatePresence>
        {achievements.map(achievement => {
          const titleKey = `achievement_${achievement.id}_title`;
          const rewardKey = `achievement_${achievement.id}_reward`;

          return (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
              className="bg-white dark:bg-zinc-800 rounded-2xl shadow-2xl border border-indigo-100 dark:border-indigo-900 p-3 pr-6 flex items-center gap-4 pointer-events-auto w-full"
            >
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex-shrink-0 flex items-center justify-center text-2xl">
                {achievement.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-0.5">
                  {getLocalizedText('achievementUnlocked', '成就解锁!')}
                </div>
                <div className="font-bold text-zinc-900 dark:text-zinc-100 truncate">
                  {getLocalizedText(titleKey, achievement.title)}
                </div>
                {achievement.reward && (
                  <div className="text-xs text-amber-600 dark:text-amber-400 mt-0.5 truncate">
                    {getLocalizedText('rewardLabel', '获得')}: {getLocalizedText(rewardKey, achievement.reward)}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
