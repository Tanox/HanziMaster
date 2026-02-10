
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
  installApp?: string; // Optional to prevent breaking other language files immediately
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
}

export interface LanguageOption {
  code: string;
  name: string;
  native: string;
}
