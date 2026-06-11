// src/components/achievement-badge.tsx v2.4.0 - Apple Design Style
'use client';

import { useMemo } from 'react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
}

interface AchievementBadgeProps {
  achievement: Achievement;
}

export function AchievementBadge({ achievement }: AchievementBadgeProps) {
  const progressPercent = useMemo(() => {
    if (!achievement.maxProgress || !achievement.progress) return 0;
    return Math.round((achievement.progress / achievement.maxProgress) * 100);
  }, [achievement.maxProgress, achievement.progress]);

  return (
    <div
      className={`
        relative p-4 rounded-2xl transition-all duration-300
        ${achievement.unlocked
          ? 'bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-900/30 apple-shadow'
          : 'bg-gray-50 dark:bg-gray-800/50 opacity-60'
        }
      `}
      role="article"
      aria-label={`${achievement.title} ${achievement.unlocked ? '已解锁' : '未解锁'}`}
    >
      {/* 图标 */}
      <div
        className={`
          w-12 h-12 rounded-xl flex items-center justify-center mb-3
          ${achievement.unlocked
            ? 'bg-emerald-500 text-white'
            : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
          }
        `}
      >
        {achievement.icon}
      </div>

      {/* 标题 */}
      <h3 className={`font-semibold mb-1 ${achievement.unlocked ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
        {achievement.title}
      </h3>

      {/* 描述 */}
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
        {achievement.description}
      </p>

      {/* 进度条 */}
      {achievement.maxProgress && achievement.progress !== undefined && (
        <div className="mt-2">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-400 dark:text-gray-500">
              {achievement.progress} / {achievement.maxProgress}
            </span>
            <span className="text-emerald-600 dark:text-emerald-400">
              {progressPercent}%
            </span>
          </div>
          <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full progress-fill transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* 解锁标记 */}
      {achievement.unlocked && (
        <div className="absolute top-2 right-2">
          <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      )}
    </div>
  );
}

interface AchievementListProps {
  achievements: Achievement[];
}

export function AchievementList({ achievements }: AchievementListProps) {
  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <section className="py-8" aria-label="成就徽章">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          成就徽章
        </h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          已解锁 {unlockedCount} / {achievements.length}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {achievements.map((achievement) => (
          <AchievementBadge key={achievement.id} achievement={achievement} />
        ))}
      </div>
    </section>
  );
}

// 预定义成就
export const DEFAULT_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-char',
    title: '初学乍练',
    description: '学习第一个汉字',
    icon: <span className="text-lg">🎯</span>,
    unlocked: false,
    progress: 0,
    maxProgress: 1,
  },
  {
    id: 'ten-chars',
    title: '小有所成',
    description: '掌握10个汉字',
    icon: <span className="text-lg">📚</span>,
    unlocked: false,
    progress: 0,
    maxProgress: 10,
  },
  {
    id: 'streak-7',
    title: '坚持不懈',
    description: '连续学习7天',
    icon: <span className="text-lg">🔥</span>,
    unlocked: false,
    progress: 0,
    maxProgress: 7,
  },
  {
    id: 'perfect-score',
    title: '完美书写',
    description: '获得100%准确度',
    icon: <span className="text-lg">⭐</span>,
    unlocked: false,
    progress: 0,
    maxProgress: 1,
  },
  {
    id: 'fifty-chars',
    title: '学富五车',
    description: '掌握50个汉字',
    icon: <span className="text-lg">🏆</span>,
    unlocked: false,
    progress: 0,
    maxProgress: 50,
  },
  {
    id: 'streak-30',
    title: '习惯养成',
    description: '连续学习30天',
    icon: <span className="text-lg">💎</span>,
    unlocked: false,
    progress: 0,
    maxProgress: 30,
  },
];
