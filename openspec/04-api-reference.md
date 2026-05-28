# API 参考
============

## 1. LocaleProvider 国际化上下文组件

### 1.1 组件概述

`LocaleProvider` 是应用的核心国际化组件，提供翻译、语言切换等功能。

**文件路径：** [src/components/locale-provider.tsx](../src/components/locale-provider.tsx)

### 1.2 类型定义

```typescript
type Locale = 
  | 'en' 
  | 'zh-CN' 
  | 'zh-TW' 
  | 'es' 
  | 'ar' 
  | 'fr' 
  | 'pt-BR' 
  | 'de' 
  | 'ja' 
  | 'ko' 
  | 'ru';
```

### 1.3 公共 API

| API | 类型 | 说明 |
|-----|------|------|
| `locale` | `Locale` | 当前语言 |
| `t(key: string)` | `string` | 翻译函数，根据 key 获取翻译文本 |
| `setLocale(locale: Locale)` | `void` | 设置当前语言 |
| `availableLocales` | `Locale[]` | 获取所有支持的语言列表 |

### 1.4 使用示例

```typescript
'use client';

import { useTranslation } from '@/components/locale-provider';

function MyComponent() {
  const { t, setLocale, locale } = useTranslation();
  
  return (
    <div>
      <h1>{t('home.title')}</h1>
      <button onClick={() => setLocale('zh-CN')}>
        Switch to Chinese
      </button>
    </div>
  );
}
```

### 1.5 翻译对象结构

```typescript
{
  common: {
    learn: string;
    practice: string;
    signIn: string;
    strokeCount: string;
    strokes: string;
    foreverQuote: string;
    startLearning: string;
    exploreLibrary: string;
  },
  home: {
    poweredByGemini: string;
    heroTitle: string;
    heroSubtitle: string;
    heroDescription: string;
    aiInsightsTitle: string;
    aiInsightsDesc: string;
    etymologyTitle: string;
    etymologyDesc: string;
    adaptiveTitle: string;
    adaptiveDesc: string;
  },
  learn: {
    title: string;
    subtitle: string;
    practiceWriting: string;
    hearPronunciation: string;
    selectCharacter: string;
  },
  footer: {
    copyright: string;
  },
  meta: {
    title: string;
    description: string;
  }
}
```

## 2. useTranslation Hook

### 2.1 Hook 概述

`useTranslation` 是一个自定义 hook，用于在组件中获取翻译函数。

**文件路径：** [src/components/locale-provider.tsx](../src/components/locale-provider.tsx)

### 2.2 返回值

| 属性 | 类型 | 说明 |
|------|------|------|
| `t` | `(key: string) => string` | 翻译函数 |

### 2.3 使用示例

```typescript
'use client';

import { useTranslation } from '@/components/locale-provider';

function MyComponent() {
  const { t } = useTranslation();
  
  return <h1>{t('home.title')}</h1>;
}
```

## 3. ThemeProvider 主题上下文组件

### 3.1 组件概述

主题上下文提供组件，管理深色/浅色模式。

**文件路径：** [src/components/theme-provider.tsx](../src/components/theme-provider.tsx)

### 3.2 公共 API

| API | 类型 | 说明 |
|------|------|------|
| `isDark` | `boolean` | 当前是否为深色模式 |
| `toggleTheme()` | `void` | 切换主题 |

### 3.3 使用示例

```typescript
'use client';

import { useTheme } from '@/components/theme-provider';

function MyComponent() {
  const { isDark, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      {isDark ? 'Switch to Light' : 'Switch to Dark'}
    </button>
  );
}
```

### 3.4 持久化

- **LocalStorage Key：** `hanzi-master-theme`
- **值：** `'dark'` 或 `'light'`

## 4. ThemeToggle 主题切换组件

### 4.1 组件概述

主题切换组件，支持深色/浅色模式切换，自动持久化用户偏好。

**文件路径：** [src/components/theme-toggle.tsx](../src/components/theme-toggle.tsx)

### 4.2 使用示例

```typescript
'use client';

import { ThemeToggleClient } from '@/components/theme-toggle';

function MyComponent() {
  return <ThemeToggleClient />;
}
```

## 5. LocaleToggle 语言切换组件

### 5.1 组件概述

语言切换组件，提供下拉菜单选择 11 种语言。

**文件路径：** [src/components/locale-toggle.tsx](../src/components/locale-toggle.tsx)

### 5.2 使用示例

```typescript
'use client';

import { LocaleToggleClient } from '@/components/locale-toggle';

function MyComponent() {
  return <LocaleToggleClient />;
}
```

### 5.3 语言名称映射

```typescript
{
  'en': 'English',
  'zh-CN': '简体中文',
  'zh-TW': '繁體中文',
  'es': 'Español',
  'ar': 'العربية',
  'fr': 'Français',
  'pt-BR': 'Português (BR)',
  'de': 'Deutsch',
  'ja': '日本語',
  'ko': '한국어',
  'ru': 'Русский'
}
```

## 6. 国际化模块

### 6.1 i18n 配置

**文件路径：** [src/lib/i18n/index.ts](../src/lib/i18n/index.ts)

**导出内容：**

| 导出项 | 类型 | 说明 |
|--------|------|------|
| `translations` | `Record<Locale, Translations>` | 所有语言的翻译数据 |
| `locales` | `Locale[]` | 支持的语言列表 |
| `Locale` | `type` | 语言类型定义 |
| `Translations` | `type` | 翻译对象类型定义 |

### 6.2 翻译文件位置

翻译文件存放在 `src/lib/i18n/translations/` 目录下：

| 文件 | 语言 |
|------|------|
| `en.ts` | 英语 |
| `zh-CN.ts` | 简体中文 |
| `zh-TW.ts` | 繁体中文 |
| `es.ts` | 西班牙语 |
| `ar.ts` | 阿拉伯语 |
| `fr.ts` | 法语 |
| `pt-BR.ts` | 葡萄牙语（巴西） |
| `de.ts` | 德语 |
| `ja.ts` | 日语 |
| `ko.ts` | 韩语 |
| `ru.ts` | 俄语 |

## 7. 样式与主题

### 7.1 字体配置

**文件路径：** [src/app/globals.css](../src/app/globals.css)

| 字体变量 | 字体名称 | 用途 |
|----------|----------|------|
| `--font-sans` | Inter | 主要界面字体 |
| `--font-mono` | JetBrains Mono | 代码字体 |
| `--font-hanzi` | Noto Sans SC | 汉字字体 |

### 7.2 hanzi-font 类

用于显示汉字的专用类：

```css
.hanzi-font {
  font-family: var(--font-hanzi);
}
```

**使用示例：**

```tsx
<span className="text-4xl font-bold hanzi-font">永</span>
```

### 7.3 主题色

```css
:root {
  --primary: #10b981; /* emerald-500 */
  --primary-dark: #059669; /* emerald-600 */
}
```

## 8. 环境变量

| 变量名 | 说明 | 必填 | 示例值 |
|--------|------|------|--------|
| `GEMINI_API_KEY` | Google Gemini AI API 密钥 | 否 | `your-api-key-here` |

## 9. 浏览器要求

- 现代浏览器（Chrome、Firefox、Safari、Edge 最新版）
- 需要启用 JavaScript
- 需要支持 localStorage

## 10. 相关文档

- [项目概述](01-overview.md) - 项目基本信息和技术栈
- [技术架构](02-architecture.md) - 系统架构设计和技术选型
- [开发指南](03-development.md) - 开发环境配置和编码规范