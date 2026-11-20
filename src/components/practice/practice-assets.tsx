// src/components/practice/practice-assets.tsx v5.2.44
import type { TranslationKey } from '@/lib/i18n';

export interface PracticeOption {
  id: string;
  titleKey: TranslationKey;
  descKey: TranslationKey;
  icon: 'pencil' | 'question' | 'chart';
}

export interface CharacterQuiz {
  id: number;
  hanzi: string;
  pinyin: string;
  translationKey: TranslationKey;
  /** 释义走 i18n 词典键，避免英文硬编码（P1-29） */
  meaningKey: TranslationKey;
}

export const icons = {
  pencil: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  ),
  question: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 01-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  chart: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h2a2 2 0 01-2-2z" />
    </svg>
  ),
} as const;

export const practiceOptions: PracticeOption[] = [
  { id: 'writing', titleKey: 'practice.writingTitle', descKey: 'practice.writingDesc', icon: 'pencil' },
  { id: 'quiz', titleKey: 'practice.quizTitle', descKey: 'practice.quizDesc', icon: 'question' },
  { id: 'progress', titleKey: 'practice.progressTitle', descKey: 'practice.progressDesc', icon: 'chart' },
];

export const weekDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const;

/** 测验题库（顺序固定，便于索引切换）；选项由题库派生，避免两者失步。 */
export const quizCharacters: CharacterQuiz[] = [
  { id: 1, hanzi: '一', pinyin: 'yī', translationKey: 'learn.one', meaningKey: 'practice.meanings.one' },
  { id: 2, hanzi: '二', pinyin: 'èr', translationKey: 'learn.two', meaningKey: 'practice.meanings.two' },
  { id: 3, hanzi: '三', pinyin: 'sān', translationKey: 'learn.three', meaningKey: 'practice.meanings.three' },
  { id: 4, hanzi: '人', pinyin: 'rén', translationKey: 'learn.person', meaningKey: 'practice.meanings.person' },
  { id: 5, hanzi: '大', pinyin: 'dà', translationKey: 'learn.big', meaningKey: 'practice.meanings.big' },
  { id: 6, hanzi: '小', pinyin: 'xiǎo', translationKey: 'learn.small', meaningKey: 'practice.meanings.small' },
  { id: 7, hanzi: '口', pinyin: 'kǒu', translationKey: 'learn.mouth', meaningKey: 'practice.meanings.mouth' },
  { id: 8, hanzi: '日', pinyin: 'rì', translationKey: 'learn.sunDay', meaningKey: 'practice.meanings.sunDay' },
  { id: 9, hanzi: '月', pinyin: 'yuè', translationKey: 'learn.moonMonth', meaningKey: 'practice.meanings.moonMonth' },
  { id: 10, hanzi: '山', pinyin: 'shān', translationKey: 'learn.mountain', meaningKey: 'practice.meanings.mountain' },
  { id: 11, hanzi: '水', pinyin: 'shuǐ', translationKey: 'learn.water', meaningKey: 'practice.meanings.water' },
  { id: 12, hanzi: '火', pinyin: 'huǒ', translationKey: 'learn.fire', meaningKey: 'practice.meanings.fire' },
];

export const QUIZ_OPTIONS = quizCharacters.map((c) => c.hanzi);
