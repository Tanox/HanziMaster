// src/hooks/useProgress.test.ts v2.4.0
import { beforeEach, afterEach, describe, it, expect } from '@jest/globals';
import { useLearningStore } from '@/store/learning';

describe('useProgress Hook', () => {
  beforeEach(() => {
    useLearningStore.getState().resetProgress();
  });

  afterEach(() => {
    useLearningStore.getState().resetProgress();
  });

  it('should calculate stats correctly with no progress', () => {
    const state = useLearningStore.getState();
    const total = state.characters.length;
    
    expect(total).toBe(12);
    expect(Object.keys(state.progress).length).toBe(0);
  });

  it('should calculate stats correctly with partial progress', () => {
    const state = useLearningStore.getState();
    
    state.updateProgress('yi', {
      mastered: true,
      practiceCount: 3,
      accuracy: 85,
      lastPracticed: new Date().toISOString(),
    });
    
    state.updateProgress('er', {
      mastered: false,
      practiceCount: 2,
      accuracy: 70,
      lastPracticed: new Date().toISOString(),
    });

    const updatedState = useLearningStore.getState();
    const practiced = Object.keys(updatedState.progress).length;
    const mastered = Object.values(updatedState.progress).filter(p => p.mastered).length;
    const avgAccuracy = Math.round((85 + 70) / 2);

    expect(practiced).toBe(2);
    expect(mastered).toBe(1);
    expect(avgAccuracy).toBe(78);
  });

  it('should handle streak calculation', () => {
    const state = useLearningStore.getState();
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const twoDaysAgo = new Date(today);
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    state.updateProgress('yi', {
      mastered: true,
      practiceCount: 1,
      accuracy: 100,
      lastPracticed: today.toISOString(),
    });

    state.updateProgress('er', {
      mastered: true,
      practiceCount: 1,
      accuracy: 100,
      lastPracticed: yesterday.toISOString(),
    });

    state.updateProgress('san', {
      mastered: true,
      practiceCount: 1,
      accuracy: 100,
      lastPracticed: twoDaysAgo.toISOString(),
    });

    const updatedState = useLearningStore.getState();
    const dates = Object.values(updatedState.progress)
      .filter(p => p.lastPracticed)
      .map(p => new Date(p.lastPracticed!).toDateString())
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

    expect(dates.length).toBe(3);
    expect(dates[0]).toBe(today.toDateString());
    expect(dates[1]).toBe(yesterday.toDateString());
    expect(dates[2]).toBe(twoDaysAgo.toDateString());
  });
});
