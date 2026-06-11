// src/hooks/useProgress.ts v2.4.0
'use client';

import { useMemo } from 'react';
import { useLearningStore } from '@/store/learning';

export function useProgress() {
  const { progress, characters } = useLearningStore();

  const stats = useMemo(() => {
    const total = characters.length;
    const practiced = Object.keys(progress).length;
    const mastered = Object.values(progress).filter(p => p.mastered).length;
    const avgAccuracy = practiced > 0
      ? Math.round(Object.values(progress).reduce((sum, p) => sum + p.accuracy, 0) / practiced)
      : 0;
    
    const streak = useMemo(() => {
      const dates = Object.values(progress)
        .filter(p => p.lastPracticed)
        .map(p => new Date(p.lastPracticed!).toDateString())
        .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
      
      if (dates.length === 0) return 0;
      
      let count = 1;
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      if (dates[0] !== today.toDateString() && dates[0] !== yesterday.toDateString()) {
        return 0;
      }
      
      for (let i = 0; i < dates.length - 1; i++) {
        const current = new Date(dates[i]);
        const next = new Date(dates[i + 1]);
        current.setDate(current.getDate() - 1);
        
        if (current.toDateString() === next.toDateString()) {
          count++;
        } else {
          break;
        }
      }
      
      return count;
    }, [progress]);

    return {
      totalCharacters: total,
      practicedCharacters: practiced,
      masteredCharacters: mastered,
      averageAccuracy: avgAccuracy,
      streak,
      progressPercent: total > 0 ? Math.round((mastered / total) * 100) : 0,
    };
  }, [characters, progress]);

  const weeklyData = useMemo(() => {
    const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    const today = new Date();
    const dayOfWeek = today.getDay();
    const adjustedDayOfWeek = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    
    return days.map((day, index) => {
      const date = new Date(today);
      date.setDate(today.getDate() - (adjustedDayOfWeek - index));
      
      const dateStr = date.toDateString();
      const practiced = Object.values(progress).some(
        p => p.lastPracticed && new Date(p.lastPracticed).toDateString() === dateStr
      );
      
      const isToday = date.toDateString() === today.toDateString();
      const isFuture = date > today;
      
      return {
        day,
        date: dateStr,
        practiced,
        isToday,
        isFuture,
      };
    });
  }, [progress]);

  return {
    stats,
    weeklyData,
  };
}
