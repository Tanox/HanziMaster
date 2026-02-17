# 09. 数据字典

**版本**: v0.7.1
**状态**: 现行规范

## 1. 存储命名空间 (Storage Namespaces)
应用在浏览器端使用以下存储空间，职责明确：
*   **LocalStorage**: 存放轻量级、持久化的用户配置和文本缓存。键名均有明确前缀。
    *   `appSettings`: 用户设置 (`AppSettings` 接口)。
    *   `practiceHistory`: 最近练习历史 (`HistoryItem[]` 接口)。
    *   `learnedItems`: 所有练习过的字/词列表 (`string[]`)。
    *   `ai_analysis_cache_{lang}_{char}`: AI 解析的单字/词语数据 (`CharacterAnalysis` / `IdiomAnalysis` 接口)。
*   **CacheStorage**: 存放二进制/JSON 等大型静态资源，由 Service Worker 管理。
    *   `hanzi-data-local`: 存放从 `/public/hanzi-data/` 下载的笔顺矢量文件。
    *   `hanzi-data-cdn`: 存放从 CDN 回退下载的笔顺数据。
*   **IndexedDB**: (规划中 v0.8.0) 用于存放用户手写练习的原始轨迹数据 (点集)，用于后续的 AI 评分和回放。

## 2. 核心数据模型 (Core Schemas)

### 2.1 `HanziData` (笔顺数据)
*   **来源**: `hanzi-writer-data`
*   **描述**: 定义一个汉字的可视化所需的所有矢量信息。
```typescript
interface HanziData {
  strokes: string[];         // 每个笔画的 SVG 路径轮廓
  medians: number[][][];    // 每个笔画的中轴线点集，用于练习校验
  radStrokes?: number[];   // (可选) 指示哪些笔画属于部首
}
```

### 2.2 `CharacterAnalysis` (AI 单字分析)
*   **来源**: Google Gemini API
*   **描述**: Gemini 返回的结构化 JSON，用于展示汉字的详细信息。
```typescript
interface CharacterAnalysis {
  char: string;
  pinyin: string;
  meaning: string;         // 核心释义
  radical: string;         // 部首
  strokeCount: number;
  etymology: string;        // 字源故事
  mnemonic: string;        // AI 助记词
  examples: {              // 词组示例
    word: string;
    pinyin: string;
    meaning: string;
  }[];
}
```

### 2.3 `UserPracticeRecord` (用户练习记录)
*   **描述**: (规划中) 存储在 IndexedDB 中的单次练习详细数据。
```typescript
interface UserPracticeRecord {
  char: string;
  timestamp: number;
  mode: 'trace' | 'write'; // 临摹或默写
  mistakes: number;        // 错误次数
  score?: number;           // 智能评分 (v0.8.0 引入)
  duration: number;        // 练习耗时(ms)
  pathData: Point[][];     // 用户绘制的原始轨迹
}
```

## 3. 静态常量映射 (Static Constants)
*   **`COMMON_CHARS`**: 内置 3500+ 个常用汉字库，作为离线同步的基准和随机推荐的来源。
*   **`PINYIN_MAP`**: 内置高频汉字拼音映射表，确保搜索建议的拼音在离线时立即可用，无需等待 AI 返回。

---
*文档维护: HanziMaster Dev Team*