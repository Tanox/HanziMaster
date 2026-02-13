

/**
 * HanziMaster v0.4.2
 */

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
  // New UI Elements
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
  
  // Welcome Screen
  welcomeTitle: string;
  welcomeSubtitle: string;
  welcomeBtn: string;

  // Idiom Specific
  idiomOrigin: string;
  idiomUsage: string;
  idiomTitle: string;
  
  // Share functionality
  shareAction: string;
  shareTitleChar: string; 
  shareTitleIdiom: string;
  shareTextChar: string; 
  shareTextIdiom: string; 
  shareMessageCopied: string;

  // Database Audit (Optional for compat)
  settingDatabaseStatus?: string;
  pinyinCoverage?: string;
  pinyinCoverageDesc?: string;
  missingChars?: string;
  copyMissing?: string;

  // Reload Prompt (Optional for compat)
  updateAvailable?: string;
  updateMsg?: string;
  reloadBtn?: string;
  offlineReady?: string;
  offlineMsg?: string;
  dismissBtn?: string;

  // Seasonal & Suggestions (Optional for compat)
  suggestionsLabel?: string;
  springFestival?: string;
  lanternFestival?: string;
  qingming?: string;
  laborDay?: string;
  dragonBoat?: string;
  qixi?: string;
  midAutumn?: string;
  nationalDay?: string;
  singlesDay?: string;
  christmas?: string;

  // UX Fixes v0.4.2
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

  [key: string]: string | undefined; // Allow indexing for seasonal keys
}

export interface LanguageOption {
  code: string;
  name: string;
  native: string;
}