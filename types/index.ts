/**
 * HanziMaster v0.3.1
 */

export interface HanziData {
  strokes: string[];
  medians: number[][][];
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

export interface IdiomAnalysis {
  idiom: string;
  pinyin: string;
  meaning: string;
  origin: string; // The story or source
  usage: string; // Example sentence
}

export interface HistoryItem {
  char: string;
  timestamp: number;
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

export type GridStyle = 'rice' | 'field' | 'none';

export interface AppSettings {
  apiKey?: string; // User provided API Key
  gridStyle: GridStyle;
  showOutline: boolean;
  autoPlay: boolean;
  continuousMode: boolean;
  offlineMode: boolean;
  showRandomSuggestions: boolean;
  showHistory: boolean;
  showStructure: boolean;
  showEtymology: boolean;
  showMnemonic: boolean;
  showExamples: boolean;
}