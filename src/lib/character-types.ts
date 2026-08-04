// src/lib/character-types.ts v5.2.0
export interface Word {
  text: string;
  pinyin: string;
  translationKey: string;
}

export interface Example {
  sentence: string;
  pinyin: string;
  translationKey: string;
}

export interface Character {
  id: number;
  hanzi: string;
  pinyin: string;
  translationKey: string;
  strokes: number;
  radical: string;
  structureKey: string;
  words: Word[];
  example: Example;
  strokeOrder?: string;
}
