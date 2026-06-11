// src/store/learning.test.ts v2.4.0
import { beforeEach, afterEach, describe, it, expect } from '@jest/globals';
import { useLearningStore } from './learning';

describe('Learning Store', () => {
  beforeEach(() => {
    useLearningStore.getState().resetProgress();
  });

  afterEach(() => {
    useLearningStore.getState().resetProgress();
  });

  it('should initialize with default characters', () => {
    const state = useLearningStore.getState();
    expect(state.characters.length).toBe(12);
    expect(state.characters[0].char).toBe('一');
    expect(state.characters[0].strokes).toBe(1);
  });

  it('should update progress for a character', () => {
    const state = useLearningStore.getState();
    
    state.updateProgress('yi', {
      mastered: true,
      practiceCount: 5,
      accuracy: 90,
      lastPracticed: new Date().toISOString(),
    });

    const updatedState = useLearningStore.getState();
    expect(updatedState.progress['yi']).toBeDefined();
    expect(updatedState.progress['yi'].mastered).toBe(true);
    expect(updatedState.progress['yi'].practiceCount).toBe(5);
    expect(updatedState.progress['yi'].accuracy).toBe(90);
  });

  it('should add practice to history', () => {
    const state = useLearningStore.getState();
    
    state.addPractice('yi');
    state.addPractice('er');

    const updatedState = useLearningStore.getState();
    expect(updatedState.practiceHistory.length).toBe(2);
    expect(updatedState.practiceHistory[0]).toBe('yi');
    expect(updatedState.practiceHistory[1]).toBe('er');
  });

  it('should reset progress', () => {
    const state = useLearningStore.getState();
    
    state.updateProgress('yi', {
      mastered: true,
      practiceCount: 5,
      accuracy: 90,
      lastPracticed: new Date().toISOString(),
    });
    state.addPractice('yi');

    state.resetProgress();

    const updatedState = useLearningStore.getState();
    expect(Object.keys(updatedState.progress).length).toBe(0);
    expect(updatedState.practiceHistory.length).toBe(0);
  });

  it('should set custom characters', () => {
    const state = useLearningStore.getState();
    const customChars = [
      { id: 'custom', char: '字', pinyin: 'zì', meaning: 'character', strokes: 6, radical: '宀', structure: '上下' },
    ];
    
    state.setCharacters(customChars);

    const updatedState = useLearningStore.getState();
    expect(updatedState.characters.length).toBe(1);
    expect(updatedState.characters[0].char).toBe('字');
  });
});
