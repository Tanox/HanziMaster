// app/types.ts v0.8.0
export interface Point {
  x: number;
  y: number;
}

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
  origin: string; 
  usage: string; 
}

export interface HistoryItem {
  char: string;
  timestamp: number;
}

/**
 * Enhanced Practice Results for v0.8.0
 */
export enum Grade {
  EXQUISITE = 'EXQUISITE', // 神品
  MASTERFUL = 'MASTERFUL', // 妙品
  PROFICIENT = 'PROFICIENT', // 能品
  POOR = 'POOR', // 须努力
}

export interface PracticeResult {
  score: number;
  grade: Grade;
  strokeScores: number[];
}

export interface PracticeSession {
  char: string;
  startTime: number;
  endTime: number;
  mistakes: number;
  hintsUsed: boolean;
  completed: boolean;
  result?: PracticeResult;
}

export interface UserStats {
  totalStrokes: number;
  charsLearned: string[];
  dailyStreak: number;
  lastPracticeDate: string;
}

export interface EvaluationResponse {
  score: number;        // 0-100
  feedback: string;     // Short feedback
  improvement: string;  // Suggestion for improvement
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
  apiKey?: string;
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
  theme?: 'light' | 'dark';
}

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
}

export interface SeasonalEvent {
  name: string;
  startMonth: number;
  startDay: number;
  endMonth: number;
  endDay: number;
  keywords: string[];
}

export interface LanguageOption {
  code: string;
  name: string;
  native: string;
}

export interface UILabels {
  meaning: string;
  structure: string;
  radical: string;
  strokeCount: string;
  origin: string;
  memoryAid: string;
  commonWords: string;
  appTitle: string;
  appSubtitle: string;
  searchPlaceholder: string;
  footerCredit: string;
  version: string;
  previewText: string;
  strokeStatusActive: string;
  strokeStatusComplete: string;
  errorInvalidChar: string;
  controlsPlay: string;
  controlsPause: string;
  controlsReset: string;
  controlsSpeed: string;
  viewMode: string;
  practiceMode: string;
  randomBtn: string;
  // Settings
  settingsTitle: string;
  settingGridStyle: string;
  settingGridRice: string;
  settingGridField: string;
  settingGridNone: string;
  settingShowOutline: string;
  settingAutoPlay: string;
  settingContinuousMode: string;
  settingOfflineMode: string;
  settingShowRandomSuggestions: string;
  settingShowHistory: string;
  settingApiKey: string;
  settingApiKeyPlaceholder: string;
  settingApiKeyHelp: string;
  settingApiKeyValidationMsg: string;
  settingTheme: string;
  settingLanguage: string;
  themeLight: string;
  themeDark: string;
  // Reset
  settingResetData: string;
  resetBtn: string;
  resetConfirm: string;
  
  // UI Elements
  sectionInterface: string;
  sectionContent: string;
  sectionAppearance: string;
  badgeCustom: string;
  badgeDefault: string;
  badgeNone: string;
  getApiKey: string;
  practiceComplete: string;
  installApp?: string;
  // Analysis Content Settings
  settingShowStructure: string;
  settingShowEtymology: string;
  settingShowMnemonic: string;
  settingShowExamples: string;
  // History
  historyTitle: string;
  clearHistory: string;
  noHistory: string;
  closeBtn: string;
  
  // Stats
  statsTitle: string;
  statsTotal: string;
  statsChars: string;
  statsTerms: string;

  // Grade Labels
  gradeExquisite?: string;
  gradeMasterful?: string;
  gradeProficient?: string;
  gradePoor?: string;
  scoreLabel?: string;

  // Rich Welcome Screen v0.6.1
  welcomeStepNext: string;
  welcomeStepPrev: string;
  welcomeIntroTitle: string;
  welcomeIntroDesc: string;
  welcomeFeatureTitle: string;
  welcomeFeatureDesc: string;
  welcomeTitle: string;
  welcomeSubtitle: string;
  welcomeBtn: string;
  
  // Onboarding Guide
  guideSearchTitle: string;
  guideSearchDesc: string;
  guideWatchTitle: string;
  guideWatchDesc: string;
  guidePracticeTitle: string;
  guidePracticeDesc: string;
  guideAIDesc: string;
  guideAITitle: string;

  // Idiom Specific
  idiomOrigin: string;
  idiomUsage: string;
  idiomTitle: string;
  
  // Share
  shareAction: string;
  shareTitleChar: string; 
  shareTitleIdiom: string;
  shareTextChar: string; 
  shareTextIdiom: string; 
  shareMessageCopied: string;
  shareAppTitle?: string;
  shareAppText?: string;

  // Update & PWA
  updateAvailable?: string;
  updateMsg?: string;
  reloadBtn?: string;
  offlineReady?: string;
  offlineMsg?: string;
  dismissBtn?: string;

  // UX Fixes
  strokeProgress: string;
  writeNextStroke: string;
  refreshSuggestions: string;
  offlineModeEnabled: string;
  offlineModeActive: string;
  copySuccess: string;
  copyFailed: string;
  toastSuccess: string;
  toastError: string;
  toastInfo: string;

  // Newly Added Keys for v0.6.2
  settingContinuousDesc?: string;
  sectionData?: string;
  suggestionsLabel?: string;
  pinyinCoverage?: string;
  missingChars?: string;
  downloadLexicon?: string;
  downloading?: string;
  downloadSuccess?: string;
  downloadError?: string;
  downloadDictionary?: string;
  dictionaryCoverage?: string;
  dictionaryStatus?: string;
  downloadingDictionary?: string;
  dictionaryReady?: string;
  dictionaryError?: string;

  [key: string]: string | undefined; 
}