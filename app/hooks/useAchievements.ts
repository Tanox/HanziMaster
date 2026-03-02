import { useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { Achievement, UserStats, Grade, PracticeResult } from '../types';

const ACHIEVEMENTS_DATA = [
  {
    id: 'first_steps',
    title: '初出茅庐',
    description: '完成 10 个汉字的学习',
    icon: '🌱',
    condition: (stats: UserStats) => stats.totalPracticed >= 10,
  },
  {
    id: 'persistence',
    title: '持之以恒',
    description: '连续学习 7 天',
    icon: '🔥',
    condition: (stats: UserStats) => stats.daysStreak >= 7,
    reward: '积分 +100',
  },
  {
    id: 'mastery',
    title: '妙笔生花',
    description: '累计 50 个汉字评分达到“神品”或“妙品”',
    icon: '🌸',
    condition: (stats: UserStats) => stats.totalPerfectScores >= 50,
    reward: '解锁高级字库预览',
  },
  {
    id: 'scholar',
    title: '博学多才',
    description: '累计学习 100 个不同的汉字',
    icon: '📜',
    condition: (stats: UserStats) => stats.uniqueChars >= 100,
    reward: '积分 +500',
  },
  {
    id: 'precision',
    title: '精准如神',
    description: '连续 10 次获得完美评分',
    icon: '🎯',
    condition: (stats: UserStats) => stats.perfectStreaks >= 10,
  },
];

const INITIAL_STATS: UserStats = {
  totalPracticed: 0,
  uniqueChars: 0,
  daysStreak: 0,
  lastLoginDate: 0,
  perfectStreaks: 0,
  totalPerfectScores: 0,
};

export const useAchievements = () => {
  const [stats, setStats] = useLocalStorage<UserStats>('userStats', INITIAL_STATS);
  const [unlockedIds, setUnlockedIds] = useLocalStorage<string[]>('unlockedAchievements', []);
  const [newlyUnlocked, setNewlyUnlocked] = useState<Achievement[]>([]);

  const achievements: Achievement[] = ACHIEVEMENTS_DATA.map(data => ({
    ...data,
    unlocked: unlockedIds.includes(data.id),
  }));

  const updateStats = useCallback((updates: Partial<UserStats>) => {
    setStats(prev => {
      const newStats = { ...prev, ...updates };
      
      // Check for streak updates
      if (updates.lastLoginDate) {
        const lastDate = new Date(prev.lastLoginDate);
        const currentDate = new Date(updates.lastLoginDate);
        
        // Reset time to midnight for comparison
        lastDate.setHours(0, 0, 0, 0);
        currentDate.setHours(0, 0, 0, 0);
        
        const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
          newStats.daysStreak = prev.daysStreak + 1;
        } else if (diffDays > 1) {
          newStats.daysStreak = 1;
        } else if (diffDays === 0 && prev.daysStreak === 0) {
            newStats.daysStreak = 1;
        }
      }

      return newStats;
    });
  }, [setStats]);

  const checkAchievements = useCallback(() => {
    const newUnlocked: Achievement[] = [];
    
    ACHIEVEMENTS_DATA.forEach(achievementData => {
      if (!unlockedIds.includes(achievementData.id)) {
        if (achievementData.condition(stats)) {
          newUnlocked.push({
            ...achievementData,
            unlocked: true,
            unlockedAt: Date.now(),
          });
        }
      }
    });

    if (newUnlocked.length > 0) {
      setUnlockedIds(prev => [...prev, ...newUnlocked.map(a => a.id)]);
      setNewlyUnlocked(newUnlocked);
    }
  }, [stats, unlockedIds, setUnlockedIds]);

  // Check achievements whenever stats change
  useEffect(() => {
    checkAchievements();
  }, [stats, checkAchievements]);

  const recordPractice = useCallback((char: string, result: PracticeResult, isNewChar: boolean) => {
    const now = Date.now();
    const isPerfect = result.grade === Grade.EXQUISITE || result.grade === Grade.MASTERFUL;

    setStats(prev => {
      const newStats = { ...prev };
      newStats.totalPracticed += 1;
      newStats.lastLoginDate = now;
      
      if (isNewChar) {
        newStats.uniqueChars += 1;
      }

      if (isPerfect) {
        newStats.totalPerfectScores += 1;
        newStats.perfectStreaks += 1;
      } else {
        newStats.perfectStreaks = 0;
      }
      
      // Handle streak logic (duplicated from updateStats for atomicity)
      const lastDate = new Date(prev.lastLoginDate);
      const currentDate = new Date(now);
      lastDate.setHours(0, 0, 0, 0);
      currentDate.setHours(0, 0, 0, 0);
      const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        newStats.daysStreak += 1;
      } else if (diffDays > 1) {
        newStats.daysStreak = 1;
      } else if (prev.daysStreak === 0) {
        newStats.daysStreak = 1;
      }

      return newStats;
    });
  }, [setStats]);

  const clearAchievements = useCallback(() => {
    setStats(INITIAL_STATS);
    setUnlockedIds([]);
    setNewlyUnlocked([]);
  }, [setStats, setUnlockedIds]);

  return {
    achievements,
    stats,
    newlyUnlocked,
    clearNewUnlocked: () => setNewlyUnlocked([]),
    recordPractice,
    updateStats,
    clearAchievements,
  };
};
