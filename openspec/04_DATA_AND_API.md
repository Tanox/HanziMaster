# 04. 数据与 API 规范

## 1. 内部数据模型
位于 `src/types/index.ts`。

### 1.1 HanziData (视觉数据)
基于 *Hanzi Writer* 格式。
```typescript
interface HanziData {
  strokes: string[];    // 可见笔画的 SVG Path 命令
  medians: number[][][]; // 用于评分的骨架/中线坐标 [x, y]
  radStrokes?: number[]; // 构成部首的笔画索引
}
```

### 1.2 CharacterAnalysis (语言学数据)
UI 使用的聚合数据对象。
```typescript
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

interface ExampleWord {
  word: string;
  pinyin: string;
  meaning: string;
}
```

## 2. API 契约

### 2.1 Google Gemini (解析)
*   **模型**: `gemini-3-flash-preview`
*   **输入**: 包含目标语言的文本提示词。
*   **输出配置**: `responseMimeType: "application/json"`.
*   **Schema 强制**:

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

### 2.2 Google Gemini (TTS)
*   **模型**: `gemini-2.5-flash-preview-tts`
*   **配置**:
    *   `responseModalities`: `['AUDIO']`
    *   `voiceName`: 'Kore' (平衡的中性声音)
*   **输出**: Base64 编码的原始 PCM/WAV 数据。

## 3. 本地存储 / 缓存
*   **Service Worker 缓存**: 存储 `hanzi-data/*.json`。
*   **浏览器缓存**: 存储字体文件。
*   **运行时内存**:
    *   `audioCache`: `Map<string, AudioBuffer>` 防止重复调用 TTS。

## 4. 提示词工程 (Prompt Engineering)
用于解析的系统提示词：
> "You are a professional Chinese etymologist and calligraphy expert. You provide accurate, scholarly, yet accessible explanations of Chinese characters."
> (你是一位专业的中国词源学家和书法专家。你提供准确、学术但通俗易懂的汉字解释。)

具体指令会注入以处理多语言支持（例如：“Provide a detailed breakdown in Spanish”）。