// src/lib/character-types.ts v5.2.1
import type { TranslationKey } from '@/lib/i18n';

export interface Word {
  text: string;
  pinyin: string;
  translationKey: TranslationKey;
}

export interface Example {
  sentence: string;
  pinyin: string;
  translationKey: TranslationKey;
}

export interface Character {
  id: number;
  hanzi: string;
  pinyin: string;
  translationKey: TranslationKey;
  strokes: number;
  radical: string;
  structureKey: TranslationKey;
  words: Word[];
  example: Example;
  strokeOrder?: string;
}
