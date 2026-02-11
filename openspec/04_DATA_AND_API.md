
# 04. 数据与 API 协议

## 1. 数据源定义
*   **静态数据**: `hanzi-writer-data` 提供的 9000+ JSON。
*   **动态数据**: Google Gemini 生成的结构化内容。

## 2. Gemini 文本解析协议
*   **Endpoint**: `ai.models.generateContent`
*   **Model**: `gemini-3-flash-preview`
*   **System Instruction**: "你是一位专业的字源学家与书法专家，提供学术严谨且易于理解的汉字解析。"

### 2.1 CharacterAnalysis Schema (单字)
```typescript
interface CharacterAnalysis {
  char: string;          // 目标字
  pinyin: string;        // 拼音
  meaning: string;       // 释义
  radical: string;       // 部首
  strokeCount: number;   // 笔画数
  etymology: string;     // 字源故事
  mnemonic: string;      // 记忆口诀
  examples: Array<{      // 常用词组
    word: string;
    pinyin: string;      // 词组拼音
    meaning: string;
  }>;
}
```

### 2.2 IdiomAnalysis Schema (成语/词组)
针对 2-4 字的输入，系统调用独立的成语分析接口。
```typescript
interface IdiomAnalysis {
  idiom: string;         // 成语原文
  pinyin: string;        // 完整拼音
  meaning: string;       // 释义
  origin: string;        // 典故/出处 (Story or Source)
  usage: string;         // 造句/用法示例
}
```

## 3. Gemini TTS 语音协议
*   **Model**: `gemini-2.5-flash-preview-tts`
*   **Config**: 
    *   `responseModalities: ["AUDIO"]`
    *   `voiceConfig: { prebuiltVoiceConfig: { voiceName: "Kore" } }`
*   **Processing**: 输出 PCM 流数据，前端通过自定义 `decodeAudioData` 工具函数解析为 `AudioBuffer`。

## 4. 离线 Fallback 策略
当 API 无法连接时，`analyzeCharacter` 函数必须返回如下结构的本地对象：
```json
{
  "char": "${char}",
  "pinyin": "-",
  "meaning": "Mode: Offline",
  "radical": "?",
  "strokeCount": 0,
  "etymology": "Analysis unavailable offline.",
  "mnemonic": "Focus on writing practice.",
  "examples": []
}
```

## 5. 存储 Schema (LocalStorage)
*   `practiceHistory`: `Array<{ char: string, timestamp: number }>` (Max: 50 entries)
*   `appSettings`: `Object` (含 `gridStyle`, `apiKey`, `theme` 等用户偏好)。
*   `ai_pinyin_cache`: `Record<string, string>` (AI 自动补全的拼音表)。

---
*文档维护: HanziMaster Data Engineering*
