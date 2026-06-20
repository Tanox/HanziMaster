// src/app/practice/page.tsx v2.3.0
'use client';

import { useState } from 'react';
import { useTranslation } from '@/components/locale-provider';
import { StatsCard } from '@/components/stats-card';

interface PracticeOption {
  id: string;
  titleKey: string;
  descKey: string;
  icon: 'pencil' | 'question' | 'chart';
}

// Icons are defined outside the page component for better performance
const icons = {
  pencil: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  ),
  question: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  chart: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h2a2 2 0 01-2-2z" />
    </svg>
  ),
} as const;

const weekDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const;

const practiceOptions: PracticeOption[] = [
  { id: 'writing', titleKey: 'practice.writingTitle', descKey: 'practice.writingDesc', icon: 'pencil' },
  { id: 'quiz', titleKey: 'practice.quizTitle', descKey: 'practice.quizDesc', icon: 'question' },
  { id: 'progress', titleKey: 'practice.progressTitle', descKey: 'practice.progressDesc', icon: 'chart' },
];

export default function PracticePage() {
  const { t } = useTranslation();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 safe-bottom">
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-foreground">
          {t('common.practice')} {t('practice.center')}
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {t('practice.subtitle')}
        </p>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 mb-16">
        {practiceOptions.map((option) => {
          const isSelected = selectedOption === option.id;
          return (
            <button
              key={option.id}
              onClick={() => setSelectedOption(option.id)}
              className={`group bg-muted dark:bg-card p-10 rounded-3xl border-2 border-transparent hover:border-[#007aff] dark:hover:border-[#2997ff] hover:-translate-y-1 transition-all duration-300 text-left ${
                isSelected ? 'border-[#007aff] bg-background dark:bg-foreground/5' : 'transition-colors duration-300'
              }`}
            >
              <div className={`w-20 h-20 bg-gradient-to-br from-[#007aff]/10 to-[#af52de]/10 dark:from-[#007aff]/20 dark:to-[#af52de]/20 rounded-[20px] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 text-[#007aff] ${
                isSelected ? 'bg-[#007aff] text-white' : ''
              }`}>
                {icons[option.icon]}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                {t(option.titleKey)}
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed mb-6">
                {t(option.descKey)}
              </p>
              <div className={`flex items-center gap-2 font-semibold ${isSelected ? 'text-foreground' : 'text-[#007aff]'} group`}>
                <span>{t('practice.startNow')}</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l-4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </button>
          );
        })}
      </div>

      <div className="bg-muted dark:bg-card rounded-[32px] p-10 border border-border">
        <h3 className="text-2xl font-semibold mb-10 text-foreground">
          {t('practice.weeklyProgress')}
        </h3>

        <div className="grid grid-cols-7 gap-4 mb-10">
          {weekDays.map((day, index) => (
            <div
              key={day}
              className={`flex flex-col items-center p-5 rounded-[20px] ${
                index < 5
                  ? 'bg-gradient-to-br from-primary to-primary/80 text-primary-foreground'
                  : 'bg-background dark:bg-foreground/5 text-muted-foreground border border-border'
              } ${index === 4 ? 'ring-2 ring-[#007aff]' : ''}`}
            >
              <p className="text-xs mb-3 font-medium">{t(`practice.${day}`)}</p>
              <div className={`w-10 h-10 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center ${
                index < 5 ? 'bg-white/20 dark:bg-black/10' : 'bg-muted dark:bg-foreground/10'
              }`}>
                {index < 5 ? (
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="text-xs font-medium">{index === 4 ? t('practice.today') : t('practice.pending')}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <StatsCard
            label="practice.charactersLearned"
            value="12"
            icon={icons.pencil}
          />
          <StatsCard
            label="practice.dayStreak"
            value="5"
            icon={icons.question}
          />
          <StatsCard
            label="practice.accuracy"
            value="87%"
            icon={icons.chart}
          />
        </div>
      </div>
    </div>
  );
}
