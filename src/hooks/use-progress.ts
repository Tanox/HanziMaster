// src/hooks/use-progress.ts v5.2.50
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

/** 单个 hooks 实例保留的最近答题记录上限，防止长期使用撑满 localStorage。 */
const MAX_QUIZ_RESULTS = 1000;

const readProgress = (): ProgressData =>
  validateProgress(safeGetItem<ProgressData>(PROGRESS_STORAGE_KEY, getDefaultProgress()));

export function useProgress() {
  // SSR 与客户端首帧统一用默认进度；挂载后再读 localStorage，避免 hydration 不一致
  const [progress, setProgress] = useState<ProgressData>(getDefaultProgress);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setProgress(readProgress());
    setLoaded(true);
  }, []);

  // 加载完成前禁止写回，否则会用默认进度覆盖已存在的本地数据
  useEffect(() => {
    if (loaded) safeSetItem(PROGRESS_STORAGE_KEY, progress);
  }, [progress, loaded]);

  useEffect(() => {
    const reload = () => setProgress(readProgress());
    const onStorage = (event: StorageEvent) => {
      if (event.key === PROGRESS_STORAGE_KEY) reload();
    };
    window.addEventListener(PROGRESS_IMPORTED_EVENT, reload);
    // 跨标签页修改同一进度键时同步重载，避免旧状态整体覆写导致进度丢失
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener(PROGRESS_IMPORTED_EVENT, reload);
      window.removeEventListener('storage', onStorage);
    };
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
      quizResults: [...prev.quizResults, { charId, correct, timestamp: Date.now() }].slice(-MAX_QUIZ_RESULTS),
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
