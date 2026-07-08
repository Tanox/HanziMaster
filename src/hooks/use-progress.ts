// src/hooks/use-progress.ts v3.0.0
// Progress tracking with localStorage persistence

import { useState, useEffect, useCallback } from 'react';
import { safeGetItem, safeSetItem } from '@/lib/storage';

interface ProgressData {
  learnedCharIds: number[];
  quizResults: { charId: number; correct: boolean; timestamp: number }[];
  dailyActivity: Record<string, boolean>;
}

const STORAGE_KEY = 'hanzi-master-progress';

const getDefaultProgress = (): ProgressData => ({
  learnedCharIds: [],
  quizResults: [],
  dailyActivity: {},
});

export function useProgress() {
  const [progress, setProgress] = useState<ProgressData>(() => {
    if (typeof window === 'undefined') {
      return getDefaultProgress();
    }
    return safeGetItem<ProgressData>(STORAGE_KEY, getDefaultProgress());
  });

  useEffect(() => {
    safeSetItem(STORAGE_KEY, progress);
  }, [progress]);

  const markLearned = useCallback((charId: number) => {
    setProgress(prev => ({
      ...prev,
      learnedCharIds: prev.learnedCharIds.includes(charId)
        ? prev.learnedCharIds
        : [...prev.learnedCharIds, charId],
    }));
    markTodayActive();
  }, []);

  const isLearned = useCallback((charId: number) => {
    return progress.learnedCharIds.includes(charId);
  }, [progress.learnedCharIds]);

  const recordQuizResult = useCallback((charId: number, correct: boolean) => {
    setProgress(prev => ({
      ...prev,
      quizResults: [...prev.quizResults, { charId, correct, timestamp: Date.now() }],
    }));
    if (correct) {
      markLearned(charId);
    }
    markTodayActive();
  }, [markLearned]);

  const getAccuracy = useCallback(() => {
    if (progress.quizResults.length === 0) return 0;
    const correct = progress.quizResults.filter(r => r.correct).length;
    return Math.round((correct / progress.quizResults.length) * 100);
  }, [progress.quizResults]);

  const getLearnedCount = useCallback(() => {
    return progress.learnedCharIds.length;
  }, [progress.learnedCharIds]);

  const getDailyStreak = useCallback(() => {
    const dates = Object.keys(progress.dailyActivity)
      .filter(date => progress.dailyActivity[date])
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

    if (dates.length === 0) return 0;

    let streak = 1;
    const today = new Date().toISOString().split('T')[0];

    if (dates[0] !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      if (dates[0] !== yesterday) return 0;
    }

    for (let i = 0; i < dates.length - 1; i++) {
      const current = new Date(dates[i]);
      const next = new Date(dates[i + 1]);
      const diff = (current.getTime() - next.getTime()) / (1000 * 60 * 60 * 24);
      
      if (diff === 1) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  }, [progress.dailyActivity]);

  const getWeeklyActivity = useCallback(() => {
    const result = Array(7).fill(false);
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      result[6 - i] = progress.dailyActivity[dateStr] || false;
    }
    
    return result;
  }, [progress.dailyActivity]);

  const markTodayActive = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    setProgress(prev => ({
      ...prev,
      dailyActivity: { ...prev.dailyActivity, [today]: true },
    }));
  }, []);

  const getLearnedCharacters = useCallback(() => {
    return progress.learnedCharIds;
  }, [progress.learnedCharIds]);

  return {
    markLearned,
    isLearned,
    recordQuizResult,
    getAccuracy,
    getLearnedCount,
    getDailyStreak,
    getWeeklyActivity,
    markTodayActive,
    getLearnedCharacters,
    learnedCharacterIds: progress.learnedCharIds,
    streak: getDailyStreak(),
    accuracy: getAccuracy(),
  };
}