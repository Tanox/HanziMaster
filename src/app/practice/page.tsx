'use client';

import { useState } from 'react';
import { useTranslation } from '@/components/locale-provider';
import { StatsCard } from '@/components/stats-card';

interface PracticeOption {
  id: string;
  titleKey: string;
  descKey: string;
  icon: 'pencil' | 'question' | 'chart';
  iconColor: string;
  iconGradient: string;
  tagText?: string;
}

const practiceOptions: PracticeOption[] = [
  {
    id: 'writing',
    titleKey: 'practice.writingTitle',
    descKey: 'practice.writingDesc',
    icon: 'pencil',
    iconColor: 'text-[#007aff]',
    iconGradient: 'from-[#007aff]/10 to-[#af52de]/10 dark:from-[#007aff]/20 dark:to-[#af52de]/20',
  },
  {
    id: 'quiz',
    titleKey: 'practice.quizTitle',
    descKey: 'practice.quizDesc',
    icon: 'question',
    iconColor: 'text-[#ff9500]',
    iconGradient: 'from-[#ff9500]/10 to-[#ff2d55]/10 dark:from-[#ff9500]/20 dark:to-[#ff2d55]/20',
  },
  {
    id: 'progress',
    titleKey: 'practice.progressTitle',
    descKey: 'practice.progressDesc',
    icon: 'chart',
    iconColor: 'text-[#34c759]',
    iconGradient: 'from-[#34c759]/10 to-[#30b0c7]/10 dark:from-[#34c759]/20 dark:to-[#30b0c7]/20',
  },
];

function getIcon(iconName: string, className: string) {
  if (iconName === 'pencil') {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    );
  }
  if (iconName === 'question') {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  }
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );
}

const weekDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const;

export default function PracticePage() {
  const { t } = useTranslation();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 safe-bottom">
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-gray-900 dark:text-white">
          {t('common.practice')} {t('practice.center')}
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {t('practice.subtitle')}
        </p>
      </div>

      {/* Practice Mode Cards */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 mb-16">
        {practiceOptions.map((option) => {
          const isSelected = selectedOption === option.id;
          return (
            <button
              key={option.id}
              onClick={() => setSelectedOption(option.id)}
              className={`group bg-[#fbfbfd] dark:bg-[#1d1d1f] p-10 rounded-[24px] border border-gray-200 dark:border-gray-800 hover:-translate-y-1 transition-all duration-300 text-left ${
                isSelected ? 'border-black dark:border-white bg-white dark:bg-black shadow-lg' : ''
              }`}
            >
              <div className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br ${option.iconGradient} rounded-[20px] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300 ${option.iconColor}`}>
                {getIcon(option.icon, 'w-8 h-8 sm:w-10 sm:h-10')}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                {t(option.titleKey)}
              </h3>
              <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                {t(option.descKey)}
              </p>
              <div className={`inline-flex items-center gap-2 font-semibold text-sm px-4 py-2 rounded-pill bg-[#007aff]/10 dark:bg-[#5856d6]/20 ${option.iconColor} group-hover:translate-x-1 transition-transform`}>
                <span>{t('practice.startNow')}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l-4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </button>
          );
        })}
      </div>

      {/* Weekly Progress Panel */}
      <div className="bg-[#fbfbfd] dark:bg-[#1d1d1f] rounded-[32px] p-10 border border-gray-200 dark:border-gray-800">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-4 mb-10">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {t('practice.weeklyProgress')}
          </h3>
          <p className="text-base text-gray-600 dark:text-gray-400">
            {t('practice.continuousDays').replace('{n}', '5')}
          </p>
        </div>

        {/* Week Grid */}
        <div className="grid grid-cols-7 gap-3 sm:gap-4 mb-10">
          {weekDays.map((day, index) => {
            const isCompleted = index < 5;
            const isToday = index === 4;
            return (
              <div
                key={day}
                className={`flex flex-col items-center p-4 sm:p-5 rounded-[20px] transition-all duration-300 ${
                  isCompleted
                    ? 'bg-black dark:bg-white text-white dark:text-black shadow-md'
                    : 'bg-white dark:bg-black text-gray-500 dark:text-gray-500 border border-gray-200 dark:border-gray-800'
                } ${isToday ? 'ring-2 ring-[#007aff]/30 ring-offset-2 ring-offset-[#fbfbfd] dark:ring-offset-[#1d1d1f]' : ''}`}
              >
                <p className="text-xs sm:text-sm mb-3 font-medium uppercase tracking-wider">{t(`practice.${day}`)}</p>
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-lg font-bold ${
                  isCompleted
                    ? 'bg-white/20 dark:bg-black/10 text-white dark:text-black'
                    : 'bg-[#f5f5f7] dark:bg-[#1d1d1f] text-gray-500 dark:text-gray-500'
                }`}>
                  {isCompleted ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="text-sm">—</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary Stats */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          <StatsCard
            label="practice.charactersLearned"
            value="12"
            icon={
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            }
          />
          <StatsCard
            label="practice.dayStreak"
            value="5"
            icon={
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
              </svg>
            }
          />
          <StatsCard
            label="practice.accuracy"
            value="87%"
            icon={
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <StatsCard
            label="practice.totalTime"
            value="2.4h"
            icon={
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
        </div>
      </div>
    </div>
  );
}
