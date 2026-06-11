// src/hooks/useCharacterLearning.ts v2.4.0
'use client';

import { useState, useCallback, useEffect } from 'react';
import { useLearningStore } from '@/store/learning';

export interface Character {
  id: string;
  char: string;
  pinyin: string;
  meaning: string;
  strokes: number;
  radical: string;
  structure: string;
}

export interface LearningProgress {
  characterId: string;
  mastered: boolean;
  practiceCount: number;
  accuracy: number;
  lastPracticed: string | null;
}

export function useCharacterLearning(characterId: string) {
  const [isPracticing, setIsPracticing] = useState(false);
  const [currentStroke, setCurrentStroke] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  
  const { characters, progress, updateProgress, addPractice } = useLearningStore();
  
  const character = characters.find(c => c.id === characterId);
  const charProgress = progress[characterId] || {
    mastered: false,
    practiceCount: 0,
    accuracy: 0,
    lastPracticed: null,
  };

  const startPractice = useCallback(() => {
    setIsPracticing(true);
    setCurrentStroke(0);
    setScore(0);
    setFeedback(null);
  }, []);

  const completeStroke = useCallback((correct: boolean) => {
    if (!isPracticing) return;
    
    setCurrentStroke(prev => {
      const next = prev + 1;
      if (correct) {
        setScore(prev => prev + 10);
      }
      
      if (next >= (character?.strokes || 0)) {
        finishPractice();
      }
      return next;
    });
    
    if (correct) {
      setFeedback('笔画正确！');
    } else {
      setFeedback('再试一次');
    }
  }, [isPracticing, character?.strokes]);

  const finishPractice = useCallback(() => {
    setIsPracticing(false);
    const newAccuracy = Math.round((score / ((character?.strokes || 1) * 10)) * 100);
    
    addPractice(characterId);
    updateProgress(characterId, {
      mastered: newAccuracy >= 80,
      practiceCount: charProgress.practiceCount + 1,
      accuracy: newAccuracy,
      lastPracticed: new Date().toISOString(),
    });
    
    setFeedback(newAccuracy >= 80 ? '掌握成功！🎉' : '继续练习！💪');
  }, [characterId, score, character?.strokes, charProgress.practiceCount, addPractice, updateProgress]);

  const resetPractice = useCallback(() => {
    setIsPracticing(false);
    setCurrentStroke(0);
    setScore(0);
    setFeedback(null);
  }, []);

  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => setFeedback(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  return {
    character,
    progress: charProgress,
    isPracticing,
    currentStroke,
    score,
    feedback,
    startPractice,
    completeStroke,
    finishPractice,
    resetPractice,
  };
}
