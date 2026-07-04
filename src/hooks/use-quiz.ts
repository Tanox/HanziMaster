// src/hooks/use-quiz.ts v3.0.0
'use client';

import { useState, useCallback, useEffect } from 'react';
import type { Character } from '@/lib/characters';

export type QuizState = {
  currentIndex: number;
  correctCount: number;
  wrongCount: number;
  answered: boolean;
  selectedAnswer: string | null;
  showPronunciation: boolean;
};

// Fisher-Yates 洗牌算法（比 sort(() => Math.random() - 0.5) 分布更均匀）
const shuffle = <T,>(arr: readonly T[]): T[] => {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

// 生成 4 个拼音选项（包含正确答案），带最大迭代保护防止死循环
const generateQuizOptions = (correctChar: Character, allCharacters: readonly Character[]): string[] => {
  const options = new Set<string>();
  options.add(correctChar.pinyin);
  const pool = shuffle(allCharacters);
  const maxIterations = Math.max(allCharacters.length * 4, 16);
  let iterations = 0;
  while (options.size < 4 && iterations < maxIterations) {
    const candidate = pool[iterations % pool.length];
    if (candidate.id !== correctChar.id) {
      options.add(candidate.pinyin);
    }
    iterations++;
  }
  return shuffle(Array.from(options));
};

// 测验逻辑 Hook
export function useQuiz(charactersList: readonly Character[]) {
  const [quizState, setQuizState] = useState<QuizState>({
    currentIndex: 0,
    correctCount: 0,
    wrongCount: 0,
    answered: false,
    selectedAnswer: null,
    showPronunciation: false,
  });
  const [quizOptions, setQuizOptions] = useState<string[]>([]);
  const [quizShowResult, setQuizShowResult] = useState(false);

  const currentQuizChar = charactersList[quizState.currentIndex];

  useEffect(() => {
    if (currentQuizChar) {
      setQuizOptions(generateQuizOptions(currentQuizChar, charactersList));
    }
  }, [currentQuizChar, charactersList]);

  const handleQuizAnswer = useCallback((selectedPinyin: string) => {
    setQuizState(prev => {
      if (prev.answered) return prev;
      const correctChar = charactersList[prev.currentIndex];
      const isCorrect = selectedPinyin === correctChar?.pinyin;
      return {
        ...prev,
        answered: true,
        selectedAnswer: selectedPinyin,
        correctCount: prev.correctCount + (isCorrect ? 1 : 0),
        wrongCount: prev.wrongCount + (isCorrect ? 0 : 1),
      };
    });
  }, [charactersList]);

  const handleNextQuizQuestion = useCallback(() => {
    if (quizState.currentIndex >= charactersList.length - 1) {
      setQuizShowResult(true);
      return;
    }
    setQuizState(prev => ({
      ...prev,
      currentIndex: prev.currentIndex + 1,
      answered: false,
      selectedAnswer: null,
      showPronunciation: false,
    }));
  }, [quizState.currentIndex, charactersList]);

  const resetQuiz = useCallback(() => {
    setQuizState({
      currentIndex: 0,
      correctCount: 0,
      wrongCount: 0,
      answered: false,
      selectedAnswer: null,
      showPronunciation: false,
    });
    setQuizShowResult(false);
  }, []);

  return {
    quizState,
    quizOptions,
    handleQuizAnswer,
    handleNextQuizQuestion,
    resetQuiz,
    quizShowResult,
    currentQuizChar,
  };
}
