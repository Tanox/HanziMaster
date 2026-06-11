// src/store/learning.ts v2.4.0
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Character, LearningProgress } from '@/hooks/useCharacterLearning';

interface LearningStore {
  characters: Character[];
  progress: Record<string, LearningProgress>;
  practiceHistory: string[];
  
  setCharacters: (characters: Character[]) => void;
  updateProgress: (characterId: string, progress: Omit<LearningProgress, 'characterId'>) => void;
  addPractice: (characterId: string) => void;
  resetProgress: () => void;
}

const INITIAL_CHARACTERS: Character[] = [
  { id: 'yi', char: '一', pinyin: 'yī', meaning: 'one', strokes: 1, radical: '一', structure: '独体' },
  { id: 'er', char: '二', pinyin: 'èr', meaning: 'two', strokes: 2, radical: '二', structure: '独体' },
  { id: 'san', char: '三', pinyin: 'sān', meaning: 'three', strokes: 3, radical: '一', structure: '独体' },
  { id: 'ren', char: '人', pinyin: 'rén', meaning: 'person', strokes: 2, radical: '人', structure: '独体' },
  { id: 'da', char: '大', pinyin: 'dà', meaning: 'big', strokes: 3, radical: '大', structure: '独体' },
  { id: 'xiao', char: '小', pinyin: 'xiǎo', meaning: 'small', strokes: 3, radical: '小', structure: '独体' },
  { id: 'kou', char: '口', pinyin: 'kǒu', meaning: 'mouth', strokes: 3, radical: '口', structure: '全包围' },
  { id: 'ri', char: '日', pinyin: 'rì', meaning: 'sun/day', strokes: 4, radical: '日', structure: '全包围' },
  { id: 'yue', char: '月', pinyin: 'yuè', meaning: 'moon/month', strokes: 4, radical: '月', structure: '独体' },
  { id: 'shan', char: '山', pinyin: 'shān', meaning: 'mountain', strokes: 3, radical: '山', structure: '独体' },
  { id: 'shui', char: '水', pinyin: 'shuǐ', meaning: 'water', strokes: 4, radical: '水', structure: '独体' },
  { id: 'huo', char: '火', pinyin: 'huǒ', meaning: 'fire', strokes: 4, radical: '火', structure: '独体' },
];

export const useLearningStore = create<LearningStore>()(
  persist(
    (set) => ({
      characters: INITIAL_CHARACTERS,
      progress: {},
      practiceHistory: [],

      setCharacters: (characters) => set({ characters }),

      updateProgress: (characterId, newProgress) =>
        set((state) => ({
          progress: {
            ...state.progress,
            [characterId]: {
              ...newProgress,
              characterId,
            },
          },
        })),

      addPractice: (characterId) =>
        set((state) => ({
          practiceHistory: [...state.practiceHistory, characterId],
        })),

      resetProgress: () =>
        set({
          progress: {},
          practiceHistory: [],
        }),
    }),
    {
      name: 'hanzi-master-learning',
    }
  )
);
