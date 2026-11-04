// src/hooks/__tests__/use-progress.test.tsx v5.2.31
import { describe, it, expect, beforeEach } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useProgress } from '../use-progress';

describe('useProgress', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('should start with empty progress', () => {
    const { result } = renderHook(() => useProgress());
    expect(result.current.getLearnedCount()).toBe(0);
    expect(result.current.getAccuracy()).toBe(0);
    expect(result.current.getDailyStreak()).toBe(0);
  });

  it('should mark a character learned once and persist to localStorage', () => {
    const { result } = renderHook(() => useProgress());
    act(() => result.current.markLearned(1));
    act(() => result.current.markLearned(1));
    expect(result.current.getLearnedCount()).toBe(1);
    const raw = JSON.parse(window.localStorage.getItem('hanzi-master-progress') ?? '{}');
    const stored = (raw._d ?? raw) as { learnedCharIds: number[]; dailyActivity: Record<string, boolean> };
    expect(stored.learnedCharIds).toContain(1);
    expect(Object.keys(stored.dailyActivity ?? {}).length).toBeGreaterThan(0);
  });

  it('should record quiz results and compute accuracy', () => {
    const { result } = renderHook(() => useProgress());
    act(() => result.current.recordQuizResult(2, true));
    act(() => result.current.recordQuizResult(3, false));
    expect(result.current.getAccuracy()).toBe(50);
  });

  it('should treat a correct quiz answer as learned', () => {
    const { result } = renderHook(() => useProgress());
    act(() => result.current.recordQuizResult(4, true));
    expect(result.current.getLearnedCount()).toBe(1);
  });
});
