

# 09. 数据字典与 API 协议

## 1. 核心模型

### 1.1 CharacterAnalysis (AI 文本响应)
```typescript
{
  char: string;          // 目标汉字
  pinyin: string;        // 必须带音调的拼音 (例如: ài)
  meaning: string;       // 基础释义
  radical: string;       // 部首及含义
  strokeCount: number;   // 笔画数
  etymology: string;     // 字源分析
  mnemonic: string;      // 记忆口诀
  examples: Array<{      // 常用词组
    word: string;
    pinyin: string;      // 词组拼音
    meaning: string;
  }>;
}
```

### 1.2 离线拼音字典 (Offline Pinyin Map)
*   **存储位置**: `constants/pinyinData.ts`
*   **当前规模**: 覆盖核心高频汉字及常用生活/学术词汇。
*   **优先级**: 
    1.  `PINYIN_MAP` (静态硬编码，首屏即用)
    2.  `ai_pinyin_cache` (LocalStorage 动态补丁)
    3.  `Gemini API` (实时在线解析)

### 1.3 节庆配置 (Seasonal Events)
```typescript
interface SeasonalEvent {
  name: string;          // 节日 Key (对应 locales)
  startMonth: number;    // 1-12
  startDay: number;      // 1-31
  endMonth: number;
  endDay: number;
  keywords: string[];    // 推荐词汇池
}
```

## 2. 缓存与持久化模型 (Storage Schema)

应用采用多级 LocalStorage 缓存策略以减少 API 调用并支持离线访问。

| Key | 类型 | 说明 | 自愈策略 |
| :--- | :--- | :--- | :--- |
| `appSettings` | `AppSettings` | 用户偏好（Grid 样式、API Key、主题等） | 默认值回滚 |
| `practiceHistory` | `HistoryItem[]` | 最近 20 条练习记录 | 自动截断 |
| `ai_pinyin_cache` | `Record<string, string>` | AI 自动补全的生僻字拼音 | 持续累积 |
| `ai_analysis_cache` | `Record<string, Analysis>` | **单字**解析结果缓存 (L2 Cache) | 达到 150 条后清理旧数据 |
| `ai_idiom_cache` | `Record<string, IdiomAnalysis>` | **成语**解析结果缓存 (L2 Cache) | 达到 150 条后清理旧数据 |

## 3. Gemini Prompt 指令集
*   **角色设定**: "You are a professional Chinese etymologist and calligraphy expert."
*   **TTS 设定**: 使用 `Modality.AUDIO`，音色配置为 `Kore`，系统指令要求 "Do not provide any introductory text... Just speak."。

## 4. 离线 Fallback 数据结构
当 API 无法连接且无缓存时，系统生成如下占位数据：
```json
{
  "char": "${char}",
  "pinyin": "-", 
  "meaning": "Mode: Network Unavailable / Offline",
  "radical": "?",
  "strokeCount": 0,
  "etymology": "Detailed analysis requires an active AI connection.",
  "mnemonic": "Focus on writing practice.",
  "examples": []
}
```

---
*文档维护: HanziMaster Data Engineering*