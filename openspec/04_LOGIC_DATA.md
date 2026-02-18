# 04. 逻辑引擎与数据协议

**版本**: v1.5.0
**职责**: 定义数学模型、数据 Schema、全量类型契约

## 1. 数据获取架构：三级降级
系统采用三级降级 (3-Tier Fallback) 策略获取笔顺数据，以优先保障响应速度与离线可用性。

| 层级 | 来源 | 内容 | 触发条件 |
| :--- | :--- | :--- | :--- |
| **Tier 1 (Local Cache)** | Service Worker Cache | 笔顺 SVG & 骨架点 | 默认尝试。由 `hanzi-data-local` 缓存提供。 |
| **Tier 2 (CDN)** | `jsDelivr` | 笔顺数据回退 | Tier 1 缓存未命中或数据校验失败时触发，成功后写入 Tier 1 缓存。 |
| **Tier 3 (AI Engine)** | Google Gemini API | 字源、词义、助记词 | 网络可用且非离线模式下，动态获取深度解析内容。 |

## 2. 笔画评估算法 (Geometric Scoring v0.8.1)
单笔划校验与评分流程：
1.  **起笔判定**: 用户落笔点与目标起点的**欧氏距离**必须小于 `120px`。
2.  **方向判定**: 用户笔画的起终点向量与目标向量的**余弦相似度**必须 `> 0`。
3.  **形状匹配**: 将用户轨迹与目标轨迹重采样为 10 个等距点，计算**平均欧氏距离** (简化 Fréchet 距离)。平均误差必须 `≤ 150px`。
4.  **评分模型**: 
    *   **形状分 (80%)**: `max(0, 80 * (1 - shapeError / 150))`
    *   **方向分 (20%)**: `max(0, 20 * cosineSimilarity)`

## 3. 核心应用类型契约 (Application Types)

### 3.1 状态枚举 (Enums)
```typescript
enum AnimationState { IDLE, PLAYING, PAUSED, COMPLETED }
enum InteractionMode { VIEW, PRACTICE }
enum Grade { EXQUISITE, MASTERFUL, PROFICIENT, POOR }
```

### 3.2 应用配置契约 (AppSettings)
```typescript
interface AppSettings {
  gridStyle: 'rice' | 'field' | 'none';
  showOutline: boolean;
  autoPlay: boolean;
  continuousMode: boolean;
  offlineMode: boolean;
  showRandomSuggestions: boolean;
  showHistory: boolean;
  showStructure: boolean;
  showEtymology: boolean;
  showMnemonic: boolean;
  showExamples: boolean;
}
```

### 3.3 数据 Schema (SSOT)
```typescript
interface CharacterAnalysis {
  char: string;
  pinyin: string;
  meaning: string;
  radical: string;
  strokeCount: number;
  etymology: string;
  mnemonic: string;
  examples: { word: string; pinyin: string; meaning: string; }[];
}

interface IdiomAnalysis {
  idiom: string;
  pinyin: string;
  meaning: string;
  origin: string;
  usage: string;
}
```

---
*文档维护: HanziMaster Logic Group*