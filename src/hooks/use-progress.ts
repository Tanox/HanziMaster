// src/hooks/use-progress.ts v5.2.6
// Progress tracking with localStorage persistence

import { useState, useEffect, useCallback } from 'react';
import { safeGetItem, safeSetItem } from '@/lib/storage';

interface ProgressData {
  learnedCharIds: number[];
  quizResults: { charId: number; correct: boolean; timestamp: number }[];
  dailyActivity: Record<string, boolean>;
}

const STORAGE_KEY = 'hanzi-master-progress';

// 用本地时区日期（避免 toISOString 的 UTC 偏移导致跨零点连胜/今日判定错误）
const toLocalDateStr = (date: Date): string => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

const getDefaultProgress = (): ProgressData => ({
  learnedCharIds: [],
  quizResults: [],
  dailyActivity: {},
});

// 对从 localStorage 读取的数据做运行时 schema 校验，
// 过滤被篡改或旧版本遗留的非法字段，避免后续计算出 NaN 或崩溃。
const validateProgress = (data: unknown): ProgressData => {
  const result = getDefaultProgress();
  if (!data || typeof data !== 'object') return result;
  const d = data as Partial<ProgressData>;

  if (Array.isArray(d.learnedCharIds)) {
    result.learnedCharIds = d.learnedCharIds.filter((id): id is number => typeof id === 'number' && Number.isFinite(id));
  }
  if (Array.isArray(d.quizResults)) {
    result.quizResults = d.quizResults
      .filter(
        (r): r is ProgressData['quizResults'][number] =>
          !!r &&
          typeof r === 'object' &&
          typeof (r as { charId?: unknown }).charId === 'number' &&
          typeof (r as { correct?: unknown }).correct === 'boolean' &&
          typeof (r as { timestamp?: unknown }).timestamp === 'number'
      )
      .map((r) => ({
        charId: (r as { charId: number }).charId,
        correct: (r as { correct: boolean }).correct,
        timestamp: (r as { timestamp: number }).timestamp,
      }));
  }
  if (d.dailyActivity && typeof d.dailyActivity === 'object') {
    for (const [k, v] of Object.entries(d.dailyActivity)) {
      if (typeof k === 'string' && typeof v === 'boolean') {
        result.dailyActivity[k] = v;
      }
    }
  }
  return result;
};

export function useProgress() {
  const [progress, setProgress] = useState<ProgressData>(() => {
    if (typeof window === 'undefined') {
      return getDefaultProgress();
    }
    return validateProgress(safeGetItem<ProgressData>(STORAGE_KEY, getDefaultProgress()));
  });

  useEffect(() => {
    safeSetItem(STORAGE_KEY, progress);
  }, [progress]);

  const markTodayActive = useCallback(() => {
    const today = toLocalDateStr(new Date());
    setProgress(prev => ({
      ...prev,
      dailyActivity: { ...prev.dailyActivity, [today]: true },
    }));
  }, []);

  const markLearned = useCallback((charId: number) => {
    setProgress(prev => ({
      ...prev,
      learnedCharIds: prev.learnedCharIds.includes(charId)
        ? prev.learnedCharIds
        : [...prev.learnedCharIds, charId],
    }));
    markTodayActive();
  }, [markTodayActive]);

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
    const today = toLocalDateStr(new Date());

    if (dates[0] !== today) {
      const yesterday = toLocalDateStr(new Date(Date.now() - 86400000));
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
      const dateStr = toLocalDateStr(date);
      result[6 - i] = progress.dailyActivity[dateStr] || false;
    }
    
    return result;
  }, [progress.dailyActivity]);

  return {
    markLearned,
    recordQuizResult,
    getAccuracy,
    getLearnedCount,
    getDailyStreak,
    getWeeklyActivity,
    markTodayActive,
    streak: getDailyStreak(),
    accuracy: getAccuracy(),
  };
}
