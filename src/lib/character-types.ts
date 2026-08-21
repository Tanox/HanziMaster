// src/lib/character-types.ts v5.2.13
import type { TranslationKey } from '@/lib/i18n';

// 笔顺引导数据（Hanzi Writer 标准格式，坐标 0-1000 绝对坐标）
export interface StrokeOrderData {
  strokes: string[];        // 每笔一个 SVG path（描红轮廓）
  medians: number[][][];    // 每笔一条中位线，用于笔顺方向动画
}

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
