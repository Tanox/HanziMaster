// src/hooks/use-progress.ts v5.2.44
// Progress tracking with localStorage persistence

import { useState, useEffect, useCallback } from 'react';
import { safeGetItem, safeSetItem } from '@/lib/storage';
import {
  type ProgressData,
  computeAccuracy,
  computeStreak,
  computeWeeklyActivity,
  getDefaultProgress,
  toLocalDateStr,
  validateProgress,
} from '@/lib/progress-utils';

/** 学习进度的唯一存储键；设置面板「重置学习进度」亦通过 safeRemoveItem 清除它。 */
export const PROGRESS_STORAGE_KEY = 'hanzi-master-progress';

/** 导入成功后广播，让已挂载的 useProgress 重新读取 localStorage（P2-17）。 */
export const PROGRESS_IMPORTED_EVENT = 'hanzi-master:progress-imported';

export function useProgress() {
  const [progress, setProgress] = useState<ProgressData>(() => {
    if (typeof window === 'undefined') {
      return getDefaultProgress();
    }
    return validateProgress(safeGetItem<ProgressData>(PROGRESS_STORAGE_KEY, getDefaultProgress()));
  });

  useEffect(() => {
    safeSetItem(PROGRESS_STORAGE_KEY, progress);
  }, [progress]);

  useEffect(() => {
    const reload = () => {
      setProgress(validateProgress(safeGetItem<ProgressData>(PROGRESS_STORAGE_KEY, getDefaultProgress())));
    };
    window.addEventListener(PROGRESS_IMPORTED_EVENT, reload);
    return () => window.removeEventListener(PROGRESS_IMPORTED_EVENT, reload);
  }, []);

  const markTodayActive = useCallback(() => {
    const today = toLocalDateStr(new Date());
    setProgress((prev) => ({
      ...prev,
      dailyActivity: { ...prev.dailyActivity, [today]: true },
    }));
  }, []);

  const markLearned = useCallback((charId: number) => {
    const today = toLocalDateStr(new Date());
    setProgress((prev) => ({
      ...prev,
      learnedCharIds: prev.learnedCharIds.includes(charId)
        ? prev.learnedCharIds
        : [...prev.learnedCharIds, charId],
      dailyActivity: { ...prev.dailyActivity, [today]: true },
    }));
  }, []);

  const recordQuizResult = useCallback((charId: number, correct: boolean) => {
    const today = toLocalDateStr(new Date());
    // 单次原子更新：避免多次 setProgress 造成的重复渲染与中间态
    setProgress((prev) => ({
      learnedCharIds: correct && !prev.learnedCharIds.includes(charId)
        ? [...prev.learnedCharIds, charId]
        : prev.learnedCharIds,
      quizResults: [...prev.quizResults, { charId, correct, timestamp: Date.now() }],
      dailyActivity: { ...prev.dailyActivity, [today]: true },
    }));
  }, []);

  const getAccuracy = useCallback(() => computeAccuracy(progress.quizResults), [progress.quizResults]);

  const getLearnedCount = useCallback(() => progress.learnedCharIds.length, [progress.learnedCharIds]);

  const getDailyStreak = useCallback(() => computeStreak(progress.dailyActivity), [progress.dailyActivity]);

  const getWeeklyActivity = useCallback(
    () => computeWeeklyActivity(progress.dailyActivity),
    [progress.dailyActivity]
  );

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
