# 04. 数据与 API 规范

## 1. 内部数据模型
位于 `src/types/index.ts`。

### 1.1 HanziData (视觉数据)
基于 *Hanzi Writer* 格式。
```typescript
interface HanziData {
  strokes: string[];    // 可见笔画的 SVG Path 命令
  medians: number[][][]; // 用于评分的骨架/中线坐标 [strokeIndex][pointIndex][x, y]
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
```

## 2. API 契约

### 2.1 Google Gemini (解析)
*   **模型**: `gemini-3-flash-preview`
*   **输入**: 包含目标语言的结构化 Prompt。
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
*   **输出**: Base64 编码的原始 PCM/WAV 数据。需要客户端 `AudioContext` 解码。

## 3. 提示词工程 (Prompt Engineering)

为了保证 AI 输出的一致性和“人设”，我们使用了系统指令 (System Instructions)。

### 3.1 汉字解析 (Analysis)
> "You are a professional Chinese etymologist and calligraphy expert. You provide accurate, scholarly, yet accessible explanations of Chinese characters."

### 3.2 语音合成 (TTS)
> "You are a Chinese text-to-speech engine. Read the provided text aloud in standard Mandarin Chinese. Do not provide any introductory text or translation. Just speak the Chinese characters."

## 4. 本地存储 / 缓存
*   **Service Worker 缓存**: 存储 `hanzi-data/*.json` (Workbox RuntimeCaching)。
*   **运行时内存**:
    *   `audioCache`: `Map<string, AudioBuffer>` 防止重复调用 TTS API。

## 5. 错误处理
*   **429 Quota Exceeded**: 必须捕获并回退到离线/降级模式 (Native TTS, Static Analysis)。
*   **JSON Parse Error**: 必须尝试清理 Markdown 代码块标记 (```json) 后再次解析。
