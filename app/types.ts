
// app/types.ts v1.3.4
export interface Point {
  x: number;
  y: number;
}

export interface HanziData {
  char: string;
  pinyin: string;
  radical: string;
  simplified: string;
  traditional: string;
  meaning: string;
  strokeCount: number;
  strokeOrder: string[]; // SVG paths for stroke order
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

export interface SRSItem {
  char: string;
  interval: number; // in days
  repetition: number;
  efactor: number; // easiness factor
  nextReviewDate: number; // timestamp
}

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
  gridStyle: GridStyle;
  showOutline: boolean;
  autoPlay: boolean;
  continuousMode: boolean;
  offlineMode: boolean;
  soundEffects: boolean;
  showRandomSuggestions: boolean;
  showHistory: boolean;
  showStructure: boolean;
  showEtymology: boolean;
  showMnemonic: boolean;
  showExamples: boolean;
  showMainTitle: boolean;
  showCommonCharacters: boolean;
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

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: number;
  reward?: string;
}

export interface UserStats {
  totalPracticed: number;
  uniqueChars: number;
  daysStreak: number;
  lastLoginDate: number;
  perfectStreaks: number; // consecutive perfect scores
  totalPerfectScores: number; // total EXQUISITE/MASTERFUL grades
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
  errorCharNotFound: string;
  controlsPlay: string;
  controlsPause: string;
  controlsReset: string;
  controlsSpeed: string;
  viewMode: string;
  practiceMode: string;
  randomBtn: string;
  settingsTitle: string;
  settingGridStyle: string;
  settingGridRice: string;
  settingGridField: string;
  settingGridNone: string;
  settingShowOutline: string;
  settingAutoPlay: string;
  settingContinuousMode: string;
  settingOfflineMode: string;
  settingSoundEffects: string;
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
  settingResetData: string;
  resetBtn: string;
  resetConfirm: string;
  sectionInterface: string;
  sectionContent: string;
  sectionAppearance: string;
  badgeCustom: string;
  badgeDefault: string;
  badgeNone: string;
  getApiKey: string;
  practiceComplete: string;
  installApp: string;
  settingShowStructure: string;
  settingShowEtymology: string;
  settingShowMnemonic: string;
  settingShowExamples: string;
  historyTitle: string;
  clearHistory: string;
  noHistory: string;
  closeBtn: string;
  statsTitle: string;
  statsTotal: string;
  statsChars: string;
  statsTerms: string;
  gradeExquisite: string;
  gradeMasterful: string;
  gradeProficient: string;
  gradePoor: string;
  scoreLabel: string;
  welcomeStepNext: string;
  welcomeStepPrev: string;
  welcomeIntroTitle: string;
  welcomeIntroDesc: string;
  welcomeFeatureTitle: string;
  welcomeFeatureDesc: string;
  welcomeTitle: string;
  welcomeSubtitle: string;
  welcomeBtn: string;
  guideSearchTitle: string;
  guideSearchDesc: string;
  guideWatchTitle: string;
  guideWatchDesc: string;
  guidePracticeTitle: string;
  guidePracticeDesc: string;
  guideAIDesc: string;
  guideAITitle: string;
  idiomOrigin: string;
  idiomUsage: string;
  idiomTitle: string;
  shareAction: string;
  shareTitleChar: string; 
  shareTitleIdiom: string;
  shareTextChar: string; 
  shareTextIdiom: string; 
  shareMessageCopied: string;
  shareAppTitle: string;
  shareAppText: string;
  updateAvailable: string;
  updateMsg: string;
  reloadBtn: string;
  offlineReady: string;
  offlineMsg: string;
  dismissBtn: string;
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
  settingContinuousDesc: string;
  sectionData: string;
  suggestionsLabel: string;
  pinyinCoverage: string;
  missingChars: string;
  downloadLexicon: string;
  downloading: string;
  downloadSuccess: string;
  downloadError: string;
  downloadDictionary: string;
  dictionaryCoverage: string;
  dictionaryStatus: string;
  downloadingDictionary: string;
  dictionaryReady: string;
  dictionaryError: string;
  generateVideo: string;
  videoGenerating: string;
  videoReady: string;
  videoError: string;
  selectApiKey: string;
  apiKeyRequired: string;
  settingShowMainTitle?: string;
  settingShowCommonCharacters?: string;
  recentHistory?: string;
  tryCharacters?: string;
  clearBtn?: string;
  learningPathTitle?: string;
  learningPathL1Title?: string;
  learningPathL1Desc?: string;
  learningPathL2Title?: string;
  learningPathL2Desc?: string;
  learningPathL3Title?: string;
  learningPathL3Desc?: string;
  [key: string]: string | undefined; 
}