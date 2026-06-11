// src/app/practice/page.tsx v2.4.0 - shadcn/ui
'use client';

import * as React from "react"
import { useState, useCallback } from 'react';
import { useTranslation } from '@/components/locale-provider';
import { useProgress } from '@/hooks/useProgress';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { StatsCard } from '@/components/stats-card';

type PracticeMode = 'writing' | 'quiz' | 'progress';

export default function PracticePage() {
  const { t } = useTranslation();
  const { stats, weeklyData } = useProgress();
  const [selectedMode, setSelectedMode] = useState<PracticeMode>('writing');

  const handleModeSelect = useCallback((mode: PracticeMode) => {
    setSelectedMode(mode);
  }, []);

  const practiceModes = [
    {
      id: 'writing' as PracticeMode,
      title: t('practice.writingTitle'),
      desc: t('practice.writingDesc'),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      ),
      color: 'emerald',
    },
    {
      id: 'quiz' as PracticeMode,
      title: t('practice.quizTitle'),
      desc: t('practice.quizDesc'),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9a4.5 4.5 0 011.37-3.084A4.5 4.5 0 0112 4.5a4.5 4.5 0 012.402 1.084A4.5 4.5 0 0115.772 9M12 12h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      color: 'blue',
    },
    {
      id: 'progress' as PracticeMode,
      title: t('practice.progressTitle'),
      desc: t('practice.progressDesc'),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      color: 'purple',
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black py-8 px-4 sm:px-6 safe-area-bottom" role="main">
      <div className="max-w-6xl mx-auto">
        {/* 页面标题 */}
        <header className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            <span className="gradient-text">{t('practice.title')}</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            {t('practice.subtitle')}
          </p>
        </header>

        {/* 练习模式选择 */}
        <section className="mb-12" aria-label={t('practice.chooseMode')}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {practiceModes.map((mode) => {
              const isSelected = selectedMode === mode.id;
              const colorClasses = {
                emerald: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
                blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
                purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
              };
              
              return (
                <button
                  key={mode.id}
                  onClick={() => handleModeSelect(mode.id)}
                  className={cn(
                    "text-left transition-all duration-300",
                    isSelected ? "ring-2 ring-emerald-500" : ""
                  )}
                  role="radio"
                  aria-checked={isSelected}
                >
                  <Card className={cn(
                    "bg-white/70 dark:bg-slate-800/50 backdrop-blur-xl hover:shadow-lg transition-all",
                    isSelected ? "border-emerald-500" : ""
                  )}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", colorClasses[mode.color as keyof typeof colorClasses])}>
                          {mode.icon}
                        </div>
                        {isSelected && (
                          <Badge variant="default" className="bg-emerald-500">已选中</Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardTitle className="text-lg mb-2">{mode.title}</CardTitle>
                      <CardDescription>{mode.desc}</CardDescription>
                    </CardContent>
                  </Card>
                </button>
              );
            })}
          </div>
        </section>

        {/* 周学习进度 */}
        <section className="mb-12" aria-label={t('practice.weeklyProgress')}>
          <Card className="bg-white/70 dark:bg-slate-800/50 backdrop-blur-xl">
            <CardHeader>
              <CardTitle>{t('practice.weeklyProgress')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-7 gap-2">
                {weeklyData.map((day) => {
                  const dayLabels: Record<string, string> = {
                    mon: t('practice.mon'),
                    tue: t('practice.tue'),
                    wed: t('practice.wed'),
                    thu: t('practice.thu'),
                    fri: t('practice.fri'),
                    sat: t('practice.sat'),
                    sun: t('practice.sun'),
                  };
                  
                  return (
                    <div
                      key={day.day}
                      className={cn(
                        "text-center p-3 rounded-xl transition-all duration-300",
                        day.practiced ? "bg-emerald-100 dark:bg-emerald-900/30" : "bg-slate-50 dark:bg-slate-800/50",
                        day.isToday ? "ring-2 ring-emerald-500" : ""
                      )}
                      aria-label={`${dayLabels[day.day]} ${day.practiced ? '已完成' : '未完成'}`}
                    >
                      <div className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                        {dayLabels[day.day]}
                      </div>
                      <div className={cn(
                        "w-8 h-8 mx-auto rounded-full flex items-center justify-center",
                        day.practiced ? "bg-emerald-500 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-400"
                      )}>
                        {day.practiced ? (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <span className="text-xs">-</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 进度条 */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">本周进度</span>
                  <span className="font-medium text-emerald-600 dark:text-emerald-400">
                    {stats.progressPercent}%
                  </span>
                </div>
                <Progress 
                  value={stats.progressPercent} 
                  className="h-3"
                  aria-label={`本周进度: ${stats.progressPercent}%`}
                />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 统计数据 */}
        <section className="mb-12" aria-label={t('practice.statsSummary')}>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
            {t('practice.statsSummary')}
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatsCard
              label={t('practice.charactersLearned')}
              value={stats.masteredCharacters.toString()}
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />
            <StatsCard
              label={t('practice.dayStreak')}
              value={stats.streak.toString()}
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.97 7.97 0 0020 14a7.97 7.97 0 01-2.343 4.657z" />
                </svg>
              }
            />
            <StatsCard
              label={t('practice.accuracy')}
              value={`${stats.averageAccuracy}%`}
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              }
            />
          </div>
        </section>

        {/* 开始按钮 */}
        <div className="text-center">
          <Button className="bg-emerald-500 hover:bg-emerald-600 px-8 py-6 text-lg">
            {selectedMode === 'writing' && t('practice.startWriting')}
            {selectedMode === 'quiz' && t('practice.startQuiz')}
            {selectedMode === 'progress' && t('practice.viewProgress')}
          </Button>
        </div>
      </div>
    </div>
  );
}
