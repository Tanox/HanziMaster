export interface HanziData {
  strokes: string[];
  medians: number[][][]; // Changed from string[] to number[][][]
  radStrokes?: number[];
}

export interface ExampleWord {
  word: string;
  pinyin: string;
  meaning: string;
}

export interface CharacterAnalysis {
  char: string;
  pinyin: string;
  meaning: string;
  radical: string;
  strokeCount: number;
  etymology: string;
  mnemonic: string;
  examples: ExampleWord[];
}

export enum AnimationState {
  IDLE = 'IDLE',
  PLAYING = 'PLAYING',
  PAUSED = 'PAUSED',
  COMPLETED = 'COMPLETED',
}

export enum InteractionMode {
  VIEW = 'VIEW',
  PRACTICE = 'PRACTICE',
}