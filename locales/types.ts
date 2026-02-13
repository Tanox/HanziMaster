
/**
 * HanziMaster v0.4.3
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
  // Reset
  settingResetData: string;
  resetBtn: string;
  resetConfirm: string;
  
  // New UI Elements
  sectionInterface: string;
  sectionContent: string;
  sectionAppearance: string;
  badgeCustom: 'Custom' | '自定义' | 'Personale' | 'Perso' | 'Kustom' | '사용자' | 'Свой' | 'Eigene' | 'カスタム' | 'กำหนดเอง' | 'مخصص' | string;
  badgeDefault: 'Default' | '默认' | 'Predefinito' | 'Défaut' | 'Padrão' | '기본값' | 'Стандарт' | 'Standard' | 'デフォルト' | 'เริ่มต้น' | 'افتراضي' | string;
  badgeNone: 'None' | '未配置' | 'Nessuno' | 'Aucun' | 'Nenhum' | '없음' | 'Нет' | 'Keine' | 'なし' | 'ยังไม่ได้ตั้งค่า' | 'غير محدد' | string;
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
  
  // Welcome Screen (Optional to prevent crash on non-updated locales)
  welcomeTitle?: string;
  welcomeSubtitle?: string;
  welcomeBtn?: string;
  
  // Onboarding Guide (Optional for compatibility with partial translations)
  guideSearchTitle?: string;
  guideSearchDesc?: string;
  guideWatchTitle?: string;
  guideWatchDesc?: string;
  guidePracticeTitle?: string;
  guidePracticeDesc?: string;

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
  
  // App Sharing (Viral)
  shareAppTitle?: string;
  shareAppText?: string;

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
  refreshSuggestions: '刷新推荐' | string;
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