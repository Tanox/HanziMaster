
# 04. 逻辑引擎与数据协议

## 1. 数据获取架构：三级降级 (3-Tier Fallback)
系统采用三级降级策略获取笔顺数据，以优先保障响应速度与离线可用性。

| 层级 | 来源 | 内容 | 触发条件 |
| :--- | :--- | :--- | :--- |
| **Tier 1 (Local Cache)** | Service Worker Cache (`hanzi-data-local`) | 笔顺 SVG & 骨架点 | 默认尝试。由 `hanziService` 发起本地 fetch 请求。|
| **Tier 2 (CDN)** | `jsDelivr` | 笔顺数据回退 | Tier 1 缓存未命中或数据校验失败时触发，成功后自动写入 Tier 1 缓存。|
| **Tier 3 (AI Engine)** | Google Gemini API | 字源、词义、助记词 | 网络可用且非离线模式下，动态获取深度解析内容。|

## 2. 笔画评估算法 (Geometric Scoring)
单笔划校验与评分流程：
1.  **起笔判定**: 用户落笔点与目标起点的**欧氏距离**必须小于 `120px`。
2.  **方向判定**: 用户笔画的起终点向量与目标向量的**余弦相似度**必须 `> 0`。
3.  **形状匹配**: 将用户轨迹与目标轨迹重采样为 10 个等距点，计算**平均欧氏距离** (简化 Fréchet 距离)。平均误差必须 `≤ 150px`。
4.  **评分模型**: 
    *   **形状分 (80%)**: `max(0, 80 * (1 - shapeError / 150))`
    *   **方向分 (20%)**: `max(0, 20 * cosineSimilarity)`
5.  **等级映射**: `神品 (95+)`, `妙品 (85+)`, `能品 (75+)`, `须努力 (<75)`。

## 3. 核心应用类型契约 (Application Types)

### 3.1 状态枚举 (Enums)
```typescript
enum AnimationState { IDLE, PLAYING, PAUSED, COMPLETED }
enum InteractionMode { VIEW, PRACTICE }
enum Grade { EXQUISITE, MASTERFUL, PROFICIENT, POOR }
```

### 3.2 基础类型定义 (Basic Types)
```typescript
interface Point {
  x: number;
  y: number;
}

type GridStyle = 'rice' | 'field' | 'none';

type ToastType = 'success' | 'error' | 'info';
```

### 3.3 应用配置契约 (AppSettings)
```typescript
interface AppSettings {
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
  theme?: 'light' | 'dark';
}
```

### 3.4 核心数据 Schema (Data Schemas)
```typescript
interface HanziData {
  strokes: string[];
  medians: number[][][];
  radStrokes?: number[];
}

interface ExampleWord {
  word: string;
  pinyin: string;
  meaning: string;
}

interface CharacterAnalysis {
  char: string;
  pinyin: string;
  meaning: string;
  radical: string;
  strokeCount: number;
  etymology: string;
  mnemonic: string;
  examples: ExampleWord[];
}

interface IdiomAnalysis {
  idiom: string;
  pinyin: string;
  meaning: string;
  origin: string;
  usage: string;
}

interface HistoryItem {
  char: string;
  timestamp: number;
}

interface PracticeResult {
  score: number;
  grade: Grade;
  strokeScores: number[];
}

interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
}

interface SeasonalEvent {
  name: string;
  startMonth: number;
  startDay: number;
  endMonth: number;
  endDay: number;
  keywords: string[];
}

interface LanguageOption {
  code: string;
  name: string;
  native: string;
}

interface UILabels {
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
  [key: string]: string | undefined;
}
```

---
*文档维护: HanziMaster Logic Group*
