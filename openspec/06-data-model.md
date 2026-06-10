# 数据模型规范

---

## Meta 信息

| 字段 | 值 |
|-----|-----|
| **版本** | v2.3.1 |
| **更新日期** | 2026-06-10 |
| **维护者** | HanziMaster 开发团队 |
| **文档编号** | OS-06 |

---

## 1. 数据模型总览

HanziMaster 汉字大师是一个前端应用，主要数据模型围绕以下类型：

| 模型名称 | 用途 | 存储位置 |
|---------|------|---------|
| `Character` | 汉字核心数据 | 应用静态数据 / 翻译文件 |
| `LearningProgress` | 用户学习进度 | localStorage |
| `PracticeRecord` | 练习记录 | localStorage |
| `Translations` | 翻译文本 | TypeScript 源文件 |
| `UserPrefs` | 用户偏好（主题/语言） | localStorage |

---

## 2. Character 汉字模型

### 2.1 TypeScript 类型定义

```typescript
interface Character {
  // 汉字本体
  char: string;                    // 如 "永"

  // 发音
  pinyin: string;                  // 拼音，如 "yǒng"
  tone?: 1 | 2 | 3 | 4 | 5;        // 声调 1-4，5 为轻声

  // 含义（多语言翻译系统替代）
  // 含义文本通过 t('learn.char.永.meaning') 等键获取

  // 笔画信息
  strokeCount: number;             // 笔画数
  strokeOrder?: string[];          // 笔画名称数组
  radical?: string;                // 部首，如 "丶"

  // 文化
  etymology?: string;              // 词源说明
  level?: 'beginner' | 'intermediate' | 'advanced';  // 难度等级

  // 学习状态（动态，从 localStorage 合并）
  mastered?: boolean;
  practicedAt?: number;            // ISO 时间戳
}
```

### 2.2 示例数据

```typescript
const sampleCharacters: Character[] = [
  {
    char: '永',
    pinyin: 'yǒng',
    tone: 3,
    strokeCount: 5,
    strokeOrder: ['点', '横折钩', '横撇', '撇', '捺'],
    radical: '丶',
    etymology: '象形字，原意为水流长远之状',
    level: 'beginner',
  },
  {
    char: '山',
    pinyin: 'shān',
    tone: 1,
    strokeCount: 3,
    strokeOrder: ['竖', '竖折', '竖'],
    radical: '山',
    level: 'beginner',
  },
  // ...
];
```

### 2.3 数据获取方式

- **静态数据**：`src/lib/characters.ts` 导出常用汉字列表
- **翻译文本**：含义、示例词等通过 `t('learn.char_永')` 等翻译键获取
- **用户状态**：从 localStorage 读取 `LearningProgress` 合并展示

---

## 3. LearningProgress 学习进度模型

### 3.1 类型定义

```typescript
interface LearningProgress {
  // 已掌握汉字列表
  masteredChars: string[];

  // 连续学习天数
  streakDays: number;

  // 最后一次学习日期（ISO date: YYYY-MM-DD）
  lastPracticedDate: string;

  // 每个字符的详细记录
  records: Record<string, CharacterRecord>;

  // 总练习次数
  totalPractices: number;

  // 首次使用时间
  startedAt: number;
}

interface CharacterRecord {
  firstPracticedAt: number;     // 时间戳
  lastPracticedAt: number;      // 时间戳
  practiceCount: number;        // 练习次数
  correctness?: number;         // 0-1 正确率（如实现 AI 评分）
  notes?: string;               // 用户笔记
}
```

### 3.2 localStorage 存储

| 项目 | 值 |
|-----|----|
| **Key** | `hanzi-master-progress:v1` |
| **格式** | JSON（UTF-8） |
| **读写时机** | 每次练习后写入；应用启动时读取 |

### 3.3 初始值

```typescript
const defaultProgress: LearningProgress = {
  masteredChars: [],
  streakDays: 0,
  lastPracticedDate: '',
  records: {},
  totalPractices: 0,
  startedAt: Date.now(),
};
```

---

## 4. PracticeRecord 单次练习记录模型

```typescript
interface PracticeSession {
  id: string;                       // UUID
  char: string;                     // 汉字
  startedAt: number;                // 时间戳
  durationMs: number;               // 练习时长
  aiFeedback?: string;              // AI 反馈（如启用）
  aiScore?: number;                 // 0-100 AI 评分
}
```

> 注：当前版本仅聚合统计，不保存单次会话以减少存储量。

---

## 5. UserPrefs 用户偏好模型

### 5.1 类型定义

```typescript
type Theme = 'light' | 'dark' | 'system';
type Locale =
  | 'en' | 'zh-CN' | 'zh-TW' | 'es' | 'ar'
  | 'fr' | 'pt-BR' | 'de' | 'ja' | 'ko' | 'ru';

interface UserPrefs {
  theme: Theme;
  locale: Locale;
}
```

### 5.2 存储 Key

| 项目 | Key |
|-----|-----|
| 主题 | `hanzi-master-theme` |
| 语言 | `hanzi-master-locale` |
| 进度 | `hanzi-master-progress:v1` |

### 5.3 读取逻辑

```
1. 读取 localStorage[key]
2. 若存在且合法 → 使用
3. 否则 → 检查系统偏好
   - 主题：matchMedia('(prefers-color-scheme: dark)') → 'system'
   - 语言：navigator.language 前两位匹配 → 否则 'en'
4. 保存到 localStorage 以便下次快速读取
```

---

## 6. Translations 翻译对象模型

### 6.1 类型定义

```typescript
type Locale =
  | 'en' | 'zh-CN' | 'zh-TW' | 'es' | 'ar'
  | 'fr' | 'pt-BR' | 'de' | 'ja' | 'ko' | 'ru';

interface Translations {
  common: {
    learn: string;
    practice: string;
    theme: { light: string; dark: string; system: string };
    startLearning: string;
    exploreLibrary: string;
    strokeCount: string;
    strokes: string;
    foreverQuote?: string;
  };
  home: {
    heroTitle: string;
    heroSubtitle: string;
    heroDescription: string;
    aiBadge: string;
    aiInsightsTitle: string;
    aiInsightsDesc: string;
    etymologyTitle: string;
    etymologyDesc: string;
    adaptiveTitle: string;
    adaptiveDesc: string;
  };
  learn: {
    title: string;
    subtitle: string;
    practiceWriting: string;
    hearPronunciation: string;
    selectCharacter: string;
  };
  practice: {
    title: string;
    subtitle: string;
    writingTitle: string;
    writingDesc: string;
    memoryTitle: string;
    memoryDesc: string;
    statsTitle: string;
    statsDesc: string;
    todayPractice: string;
    streakDays: string;
    totalMastered: string;
  };
  nav: {
    home: string;
    learn: string;
    practice: string;
  };
  footer: {
    copyright: string;
  };
  meta: {
    title: string;
    description: string;
  };
}

// 翻译集合
type TranslationDict = Record<Locale, Translations>;
```

### 6.2 翻译文件位置

```
src/lib/i18n/translations/
├── en.ts           // English
├── zh-CN.ts        // 简体中文
├── zh-TW.ts        // 繁體中文
├── es.ts           // Español
├── ar.ts           // العربية
├── fr.ts           // Français
├── pt-BR.ts        // Português (Brasil)
├── de.ts           // Deutsch
├── ja.ts           // 日本語
├── ko.ts           // 한국어
└── ru.ts           // Русский
```

### 6.3 文件结构示例（en.ts）

```typescript
// src/lib/i18n/translations/en.ts
import { Translations } from '../index';

export const en: Translations = {
  common: {
    learn: 'Learn',
    practice: 'Practice',
    theme: { light: 'Light', dark: 'Dark', system: 'System' },
    startLearning: 'Start Learning',
    exploreLibrary: 'Explore Library',
    strokeCount: 'Stroke Count',
    strokes: 'strokes',
    foreverQuote: 'Eternal practice makes perfect',
  },
  home: {
    heroTitle: 'Master Chinese Characters',
    heroSubtitle: 'AI-Powered Hanzi Learning',
    heroDescription: 'Learn Chinese characters with personalized AI feedback...',
    aiBadge: 'AI-Powered Learning',
    aiInsightsTitle: 'AI Insights',
    aiInsightsDesc: 'Get real-time feedback on your handwriting from Google Gemini AI.',
    etymologyTitle: 'Etymology',
    etymologyDesc: 'Discover the history and cultural stories behind each character.',
    adaptiveTitle: 'Adaptive Learning',
    adaptiveDesc: 'Personalized learning path that adapts to your progress.',
  },
  learn: {
    title: 'Learn Characters',
    subtitle: 'Tap a character to see details',
    practiceWriting: 'Practice Writing',
    hearPronunciation: 'Hear Pronunciation',
    selectCharacter: 'Select a character',
  },
  practice: {
    title: 'Practice',
    subtitle: 'Choose your practice mode',
    writingTitle: 'Writing Practice',
    writingDesc: 'Write characters and get AI feedback',
    memoryTitle: 'Memory Quiz',
    memoryDesc: 'Test your memory of character meanings',
    statsTitle: 'Progress Stats',
    statsDesc: 'View your learning statistics',
    todayPractice: "Today's Practice",
    streakDays: 'Day Streak',
    totalMastered: 'Total Mastered',
  },
  nav: { home: 'Home', learn: 'Learn', practice: 'Practice' },
  footer: { copyright: '© 2026 HanziMaster. All rights reserved.' },
  meta: {
    title: 'HanziMaster - Master Chinese Characters',
    description: 'AI-powered Chinese character learning platform',
  },
};
```

---

## 7. 数据流程图

```
┌────────────────────┐     ┌────────────────────┐     ┌────────────────────┐
│ 应用启动            │────▶│ 读取 localStorage  │────▶│ 合并到 React State │
│ (layout.tsx)       │     │ UserPrefs + Progres│     │ (Context Providers) │
└────────────────────┘     └────────────────────┘     └────────────────────┘
                                                               │
                                                               ▼
                    ┌──────────────────────┐    ┌───────────────────────┐
                    │ 组件渲染              │    │ 用户操作（练习/切换）  │
                    │ 使用 t() / useState   │◀───│ (触发 setState)        │
                    └──────────────────────┘    └───────────────────────┘
                                                               │
                                                               ▼
                    ┌──────────────────────┐    ┌───────────────────────┐
                    │ 写回 localStorage     │◀───│ Context Provider 更新  │
                    │ (防抖 300ms)          │    │                       │
                    └──────────────────────┘    └───────────────────────┘
```

---

## 8. 数据版本与迁移策略

### 8.1 版本号

- **当前数据版本**：`v1`（即 `hanzi-master-progress:v1`）
- 未来版本号遵循 SemVer 约定

### 8.2 迁移逻辑（参考）

```typescript
function loadProgress(): LearningProgress {
  const raw = localStorage.getItem('hanzi-master-progress:v1');
  if (!raw) return defaultProgress;
  try {
    const data = JSON.parse(raw);
    // 字段检查与补齐（向前兼容）
    return {
      ...defaultProgress,
      ...data,
      records: { ...(data.records || {}) },
    };
  } catch {
    return defaultProgress;
  }
}
```

---

## 9. Version History

| 版本 | 日期 | 说明 |
|-----|------|------|
| **v2.3.1** | 2026-06-10 | 统一版本号，对齐 Apple 设计风格实现 |
| v2.3.0 | 2026-06-07 | 完整翻译对象结构说明 |
| v2.2.1 | 2026-06-04 | 添加数据流程图和迁移策略 |
| v2.2.0 | 2026-06-02 | 初始数据模型版本 |

---

## 10. 相关文档

- [项目概述](01-project-overview.md) - 项目基本信息和技术栈
- [需求规格](02-requirements-spec.md) - 详细的功能需求和非功能需求
- [技术架构](03-technical-architecture.md) - 系统架构设计和技术选型
- [功能规格](04-feature-spec.md) - 详细的功能规格说明
- [API 规范](05-api-spec.md) - 详细的 API 文档和代码示例
- [设计原型](07-design-prototype.md) - 完整的设计规范和原型图说明
- [无障碍与国际化](08-a11y-i18n.md) - 详细的无障碍和国际化规范

---

**本文档版本: v2.3.1**  
**最后更新: 2026-06-10**
