
# API 接口文档

**版本**: v1.0.0  
**最后更新**: 2025  
**维护者**: Sut

---

## 目录

1. [概述](#概述)
2. [外部 API 接口](#外部-api-接口)
3. [内部服务接口](#内部服务接口)
4. [类型定义](#类型定义)
5. [错误码定义](#错误码定义)
6. [调用示例](#调用示例)

---

## 概述

HanziMaster 采用混合架构设计，主要依赖以下外部服务：

- **Google Gemini AI**: 提供汉字分析、成语分析、TTS 语音合成
- **Hanzi Writer Data CDN**: 提供汉字笔顺数据
- **浏览器原生 TTS**: 离线降级方案

所有外部请求都包含完整的降级机制，确保离线可用性。

---

## 外部 API 接口

### 1. Gemini AI - 汉字分析

#### 接口描述
使用 Gemini AI 分析单个汉字的详细信息，包括拼音、释义、部首、笔画数、字源、记忆法和例词。

#### 请求信息
- **服务**: Google GenAI SDK
- **模型**: `gemini-3-flash-preview`
- **返回格式**: JSON
- **响应模式**: 结构化 JSON

#### 请求参数
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `char` | string | 是 | 要分析的汉字（单个字符） |
| `languageName` | string | 否 | 响应语言名称，默认 `English` |
| `forceOffline` | boolean | 否 | 是否强制使用离线模式，默认 `false` |

#### 返回数据结构
```typescript
interface CharacterAnalysis {
  char: string;           // 汉字
  pinyin: string;         // 拼音
  meaning: string;        // 释义
  radical: string;        // 部首
  strokeCount: number;    // 笔画数
  etymology: string;      // 字源
  mnemonic: string;       // 记忆法
  examples: ExampleWord[];// 例词列表
}

interface ExampleWord {
  word: string;    // 例词
  pinyin: string;  // 例词拼音
  meaning: string; // 例词释义
}
```

#### 请求 Schema
```typescript
const characterAnalysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    char: { type: Type.STRING },
    pinyin: { type: Type.STRING },
    meaning: { type: Type.STRING },
    radical: { type: Type.STRING },
    strokeCount: { type: Type.INTEGER },
    etymology: { type: Type.STRING },
    mnemonic: { type: Type.STRING },
    examples: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          word: { type: Type.STRING },
          pinyin: { type: Type.STRING },
          meaning: { type: Type.STRING },
        }
      }
    }
  },
  required: ["char", "pinyin", "meaning", "radical", "strokeCount", "etymology", "mnemonic", "examples"]
};
```

#### 降级策略
- **L1**: 离线字典缓存（localStorage）
- **L2**: 本地拼音映射（PINYIN_MAP）
- **L3**: 基础占位数据

---

### 2. Gemini AI - 成语分析

#### 接口描述
使用 Gemini AI 分析成语的详细信息，包括拼音、释义、出处和用法。

#### 请求信息
- **服务**: Google GenAI SDK
- **模型**: `gemini-3-flash-preview`
- **返回格式**: JSON

#### 请求参数
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `idiom` | string | 是 | 要分析的成语 |
| `languageName` | string | 否 | 响应语言名称，默认 `English` |
| `forceOffline` | boolean | 否 | 是否强制使用离线模式，默认 `false` |

#### 返回数据结构
```typescript
interface IdiomAnalysis {
  idiom: string;   // 成语
  pinyin: string;  // 拼音
  meaning: string; // 释义
  origin: string;  // 出处
  usage: string;   // 用法
}
```

#### 降级策略
- **L1**: 基础占位数据（提示需要网络连接）

---

### 3. Gemini AI - 语音合成 (TTS)

#### 接口描述
使用 Gemini AI 将文本转换为高质量普通话语音。

#### 请求信息
- **服务**: Google GenAI SDK
- **模型**: `gemini-2.5-flash-preview-tts`
- **返回格式**: Base64 编码的音频数据
- **响应模式**: Audio (Modality.AUDIO)

#### 请求参数
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `text` | string | 是 | 要朗读的文本 |
| `language` | string | 否 | 语言代码，默认 `zh-CN` |

#### 语音配置
```typescript
speechConfig: {
  voiceConfig: {
    prebuiltVoiceConfig: {
      voiceName: 'Kore'  // 普通话语音
    }
  }
}
```

#### 降级策略
- **L1**: 本地音频缓存（Map&lt;string, AudioBuffer&gt;）
- **L2**: 浏览器原生 Web Speech API

---

### 4. Hanzi Writer Data - 笔顺数据

#### 接口描述
从 CDN 获取汉字的笔顺 SVG 路径和中线数据。

#### 请求信息
- **基础 URL**: `https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0`
- **本地降级**: `/hanzi-data/{char}.json`
- **方法**: GET
- **返回格式**: JSON

#### 请求参数
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `char` | string | 是 | 汉字（URL 路径参数） |

#### 返回数据结构
```typescript
interface HanziData {
  strokes: string[];      // 笔画 SVG 路径数组
  medians: number[][][];  // 中线坐标数组
  radStrokes?: number[];  // 部首笔画索引（可选）
}
```

#### 数据验证
```typescript
const isValidHanziData = (data: any): data is HanziData =&gt; {
  return (
    data &amp;&amp;
    Array.isArray(data.strokes) &amp;&amp;
    data.strokes.length &gt; 0 &amp;&amp;
    data.strokes.every((s: string) =&gt; typeof s === 'string' &amp;&amp; s.startsWith('M')) &amp;&amp;
    Array.isArray(data.medians) &amp;&amp;
    data.medians.length === data.strokes.length
  );
};
```

#### 降级策略
- **L1**: 本地 `/hanzi-data/{char}.json`
- **L2**: CDN 数据（带 3 次重试和指数退避）
- **L3**: 返回 `null`（提示字符不存在）

#### 重试策略
- 最大重试次数: 3 次
- 初始延迟: 500ms
- 退避因子: 2x（每次延迟翻倍）
- 重试条件: HTTP 5xx 错误

---

## 内部服务接口

### 1. GeminiService

#### 位置
`app/services/geminiService.ts`

#### 方法列表

##### `analyzeCharacter(char, languageName, forceOffline)`
分析单个汉字

**参数**:
- `char: string` - 汉字
- `languageName: string` - 语言名称（默认: 'English'）
- `forceOffline: boolean` - 强制离线（默认: false）

**返回**: `Promise&lt;CharacterAnalysis&gt;`

---

##### `analyzeIdiom(idiom, languageName, forceOffline)`
分析成语

**参数**:
- `idiom: string` - 成语
- `languageName: string` - 语言名称（默认: 'English'）
- `forceOffline: boolean` - 强制离线（默认: false）

**返回**: `Promise&lt;IdiomAnalysis&gt;`

---

### 2. HanziService

#### 位置
`app/services/hanziService.ts`

#### 方法列表

##### `fetchHanziData(char)`
获取汉字笔顺数据

**参数**:
- `char: string` - 汉字

**返回**: `Promise&lt;HanziData | null&gt;`

---

### 3. TTSService

#### 位置
`app/services/ttsService.ts`

#### 方法列表

##### `playPronunciation(text, language)`
播放文本发音

**参数**:
- `text: string` - 要朗读的文本
- `language: string` - 语言代码（默认: 'zh-CN'）

**返回**: `Promise&lt;void&gt;`

---

### 4. SoundService

#### 位置
`app/services/soundService.ts`

#### 功能
提供 UI 音效反馈（如笔画完成提示音）

---

## 类型定义

### 核心数据类型

#### Point
坐标点
```typescript
interface Point {
  x: number;
  y: number;
}
```

#### HanziData
汉字笔顺数据
```typescript
interface HanziData {
  strokes: string[];
  medians: number[][][];
  radStrokes?: number[];
}
```

#### CharacterAnalysis
汉字分析结果
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

#### IdiomAnalysis
成语分析结果
```typescript
interface IdiomAnalysis {
  idiom: string;
  pinyin: string;
  meaning: string;
  origin: string;
  usage: string;
}
```

#### ExampleWord
例词
```typescript
interface ExampleWord {
  word: string;
  pinyin: string;
  meaning: string;
}
```

#### HistoryItem
历史记录项
```typescript
interface HistoryItem {
  char: string;
  timestamp: number;
}
```

#### PracticeResult
练习结果
```typescript
interface PracticeResult {
  score: number;
  grade: Grade;
  strokeScores: number[];
}
```

#### AppSettings
应用设置
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

### 枚举类型

#### Grade
练习等级
```typescript
enum Grade {
  EXQUISITE = 'EXQUISITE',  // 神品
  MASTERFUL = 'MASTERFUL',  // 妙品
  PROFICIENT = 'PROFICIENT',// 能品
  POOR = 'POOR',            // 须努力
}
```

#### AnimationState
动画状态
```typescript
enum AnimationState {
  IDLE = 'IDLE',
  PLAYING = 'PLAYING',
  PAUSED = 'PAUSED',
  COMPLETED = 'COMPLETED',
}
```

#### InteractionMode
交互模式
```typescript
enum InteractionMode {
  VIEW = 'VIEW',
  PRACTICE = 'PRACTICE',
}
```

#### GridStyle
格线样式
```typescript
type GridStyle = 'rice' | 'field' | 'none';
```

---

## 错误码定义

### 网络错误
| 错误码 | 说明 | 降级方案 |
|--------|------|----------|
| `NETWORK_UNAVAILABLE` | 网络不可用 | 使用离线数据 |
| `CDN_ERROR_404` | 字符数据不存在 | 提示字符不支持 |
| `CDN_ERROR_5xx` | 服务器错误 | 重试 3 次后降级 |

### AI 服务错误
| 错误码 | 说明 | 降级方案 |
|--------|------|----------|
| `NO_API_KEY` | 未配置 API Key | 使用离线数据 |
| `AI_RESPONSE_EMPTY` | AI 返回空内容 | 使用离线数据 |
| `AI_JSON_PARSE_ERROR` | JSON 解析失败 | 使用离线数据 |
| `AI_SERVICE_ERROR` | AI 服务异常 | 使用离线数据 |

### TTS 错误
| 错误码 | 说明 | 降级方案 |
|--------|------|----------|
| `TTS_NO_AUDIO_DATA` | 无音频数据 | 使用浏览器原生 TTS |
| `TTS_SERVICE_ERROR` | TTS 服务异常 | 使用浏览器原生 TTS |

---

## 调用示例

### 示例 1: 分析汉字
```typescript
import { analyzeCharacter } from '@/services/geminiService';

// 分析"中"字
const analysis = await analyzeCharacter('中', 'Chinese', false);
console.log(analysis);
/*
{
  char: '中',
  pinyin: 'zhōng',
  meaning: '中间，中心',
  radical: '丨',
  strokeCount: 4,
  etymology: '象形字，像旗杆中间...',
  mnemonic: '一根竖线穿过方框...',
  examples: [
    { word: '中国', pinyin: 'zhōngguó', meaning: '中国' }
  ]
}
*/
```

### 示例 2: 获取笔顺数据
```typescript
import { fetchHanziData } from '@/services/hanziService';

// 获取"中"字笔顺
const hanziData = await fetchHanziData('中');
if (hanziData) {
  console.log('笔画数:', hanziData.strokes.length);
  console.log('第一笔:', hanziData.strokes[0]);
}
```

### 示例 3: 播放发音
```typescript
import { playPronunciation } from '@/services/ttsService';

// 播放"中"字发音
await playPronunciation('中', 'zh-CN');
```

### 示例 4: 分析成语
```typescript
import { analyzeIdiom } from '@/services/geminiService';

// 分析"画龙点睛"
const idiomAnalysis = await analyzeIdiom('画龙点睛', 'Chinese');
console.log(idiomAnalysis);
/*
{
  idiom: '画龙点睛',
  pinyin: 'huà lóng diǎn jīng',
  meaning: '比喻作文或说话时...',
  origin: '出自唐·张彦远《历代名画记》...',
  usage: '用于形容在关键处...'
}
*/
```

---

## 安全说明

1. **API Key 管理**
   - 必须通过 `process.env.API_KEY` 或用户自定义输入获取
   - 禁止在代码中硬编码任何 Key
   - 用户自定义 Key 仅存储于浏览器本地

2. **安全设置**
   - 所有 AI 请求使用 `BLOCK_NONE` 安全阈值
   - 响应内容经过 JSON 清洗和验证

3. **数据隐私**
   - 所有用户数据仅存储于浏览器本地
   - 零知识设计，不上传任何用户数据

---

## 更新日志

| 版本 | 日期 | 说明 |
|------|------|------|
| v1.0.0 | 2025 | 初始版本 |

