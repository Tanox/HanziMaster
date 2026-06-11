// src/components/achievement-badge.tsx v2.4.0 - shadcn/ui
'use client';

import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

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
  const progressPercent = achievement.maxProgress && achievement.progress !== undefined
    ? Math.round((achievement.progress / achievement.maxProgress) * 100)
    : 0;

  return (
    <Card 
      className={cn(
        "relative p-4 transition-all duration-300",
        achievement.unlocked
          ? "bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-900/30"
          : "bg-slate-50 dark:bg-slate-800/50 opacity-60"
      )}
      role="article"
      aria-label={`${achievement.title} ${achievement.unlocked ? '已解锁' : '未解锁'}`}
    >
      <CardContent className="space-y-3">
        {/* 图标 */}
        <div className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center",
          achievement.unlocked
            ? "bg-emerald-500 text-white"
            : "bg-slate-200 dark:bg-slate-700 text-slate-400"
        )}>
          {achievement.icon}
        </div>

        {/* 标题 */}
        <h3 className={cn(
          "font-semibold",
          achievement.unlocked 
            ? "text-slate-900 dark:text-white" 
            : "text-slate-500 dark:text-slate-400"
        )}>
          {achievement.title}
        </h3>

        {/* 描述 */}
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {achievement.description}
        </p>

        {/* 进度条 */}
        {achievement.maxProgress && achievement.progress !== undefined && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400 dark:text-slate-500">
                {achievement.progress} / {achievement.maxProgress}
              </span>
              <span className="text-emerald-600 dark:text-emerald-400">
                {progressPercent}%
              </span>
            </div>
            <Progress value={progressPercent} className="h-1.5" />
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
      </CardContent>
    </Card>
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
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
          成就徽章
        </h2>
        <Badge variant="outline">{unlockedCount} / {achievements.length}</Badge>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {achievements.map((achievement) => (
          <AchievementBadge key={achievement.id} achievement={achievement} />
        ))}
      </div>
    </section>
  );
}

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
