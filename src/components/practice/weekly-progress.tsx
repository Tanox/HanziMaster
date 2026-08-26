// src/components/practice/weekly-progress.tsx v5.2.19
'use client';

import { useTranslation } from '@/components/locale-provider';
import { StatsCard } from '@/components/stats-card';
import { icons, weekDays } from '@/components/practice/practice-assets';

interface WeeklyProgressProps {
  charactersLearned: number;
  dayStreak: number;
  accuracy: number;
  weeklyActivity: boolean[];
}

export function WeeklyProgress({
  charactersLearned,
  dayStreak,
  accuracy,
  weeklyActivity,
}: WeeklyProgressProps) {
  const { t } = useTranslation();

  // weekDays 以周一为索引 0；JS getDay() 以周日为 0，需做偏移映射
  const todayIndex = (new Date().getDay() + 6) % 7;

  return (
    <div id="weekly-progress" className="bg-card/80 dark:bg-ink-900/80 backdrop-blur-xl rounded-4xl p-10 border border-ink-100 dark:border-ink-800 reveal shadow-ink-lg">
      <h3 className="text-2xl font-semibold mb-10 text-ink-900 dark:text-ink-50 display-font">
        {t('practice.weeklyProgress')}
      </h3>

      <div className="grid grid-cols-7 gap-4 mb-10">
        {weekDays.map((day, index) => {
          const active = weeklyActivity[index] ?? false;
          return (
            <div
              key={day}
              className={`flex flex-col items-center p-5 rounded-xl ${
                active
                  ? 'bg-linear-to-br from-vermilion-500 to-vermilion-600 text-primary-foreground'
                  : 'bg-ink-50/50 dark:bg-ink-800/30 text-ink-600 dark:text-ink-400 border border-ink-100 dark:border-ink-800'
              } ${index === todayIndex ? 'ring-2 ring-vermilion-400' : ''}`}
            >
              <p className="text-xs mb-3 font-medium">{t(`practice.${day}`)}</p>
              <div className={`w-10 h-10 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center ${
                active ? 'bg-primary-foreground/20' : 'bg-primary-foreground/50 dark:bg-ink-900/50'
              }`}>
                {active ? (
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="text-xs font-medium">{index === todayIndex ? t('practice.today') : t('practice.pending')}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <StatsCard label="practice.charactersLearned" value={String(charactersLearned)} icon={icons.pencil} accentVariant="vermilion" />
        <StatsCard label="practice.dayStreak" value={String(dayStreak)} icon={icons.question} accentVariant="indigo" />
        <StatsCard label="practice.accuracy" value={`${accuracy}%`} icon={icons.chart} accentVariant="success" />
      </div>
    </div>
  );
}
