# 04. 数据与 API 协议

## 1. 内部数据模型
核心类型定义位于 `src/types/index.ts`。

### 1.1 HanziData (视觉数据)
源自 `hanzi-writer-data` 项目，经过 JSON 序列化。
```typescript
interface HanziData {
  strokes: string[];     // 可见笔画的 SVG Path (d属性)
  medians: number[][][]; // 骨架/中线坐标，用于笔画评分 [strokeIndex][pointIndex][x, y]
  radStrokes?: number[]; // 构成部首的笔画索引数组
}
```

### 1.2 CharacterAnalysis (业务数据)
UI 组件使用的聚合数据对象。
```typescript
interface CharacterAnalysis {
  char: string;          // 目标汉字
  pinyin: string;        // 拼音
  meaning: string;       // 基本释义 (目标语言)
  radical: string;       // 部首字符
  strokeCount: number;   // 总笔画数
  etymology: string;     // 字源/词源故事
  mnemonic: string;      // 记忆口诀
  examples: ExampleWord[]; // 常用词汇列表
}

interface ExampleWord {
  word: string;
  pinyin: string;
  meaning: string;
}
```

## 2. API 接口契约

### 2.1 Google Gemini (文本解析)
*   **模型**: `gemini-3-flash-preview`
*   **输入**: 包含目标语言的结构化 Prompt，请求 JSON 输出。
*   **安全设置**: `BLOCK_NONE` (为了允许展示涉及古代战争、狩猎等字源的历史解释)。
*   **JSON Schema**:
```json
{
  "type": "OBJECT",
  "properties": {
    "char": { "type": "STRING" },
    "pinyin": { "type": "STRING" },
    "meaning": { "type": "STRING" },
    "radical": { "type": "STRING" },
    "strokeCount": { "type": "INTEGER" },
    "etymology": { "type": "STRING" },
    "mnemonic": { "type": "STRING" },
    "examples": {
      "type": "ARRAY",
      "items": {
        "type": "OBJECT",
        "properties": {
          "word": { "type": "STRING" },
          "pinyin": { "type": "STRING" },
          "meaning": { "type": "STRING" }
        }
      }
    }
  },
  "required": ["char", "pinyin", "meaning", "etymology", "mnemonic", "examples"]
}
```

### 2.2 Google Gemini (语音合成 TTS)
*   **模型**: `gemini-2.5-flash-preview-tts`
*   **配置**:
    *   `responseModalities`: `['AUDIO']`
    *   `voiceName`: `'Kore'` (平衡、自然的中性声音)
*   **输入**: 纯文本 Prompt `"Say: {text}"`。
*   **输出**: Base64 编码的原始 PCM 音频数据。前端需使用 `AudioContext` 进行解码播放。

## 3. 数据源与存储

### 3.1 汉字矢量数据
*   **来源**: `hanzi-writer-data` (npm package).
*   **分发**: 构建时通过脚本复制到 `/public/hanzi-data/` 目录。
*   **获取策略**:
    1.  **Local**: 优先尝试请求 `/hanzi-data/{char}.json` (由 Service Worker 缓存)。
    2.  **CDN**: 失败则回退至 `jsdelivr` CDN。
    3.  **Error**: 均失败则抛出错误，提示非标准汉字。

### 3.2 客户端缓存
*   **Audio Cache**: 运行时内存 `Map<string, AudioBuffer>`，防止重复 TTS 请求。
*   **Settings/History**: 浏览器 `localStorage`。

## 4. 错误处理规范
*   **429 Quota Exceeded**: 必须捕获并在 UI 上显示优雅降级（使用本地数据和原生 TTS），禁止应用崩溃。
*   **JSON Parse Error**: 针对 AI 可能返回的 Markdown 代码块标记（```json），必须在解析前进行正则清理。

---
*文档维护: HanziMaster Team*
