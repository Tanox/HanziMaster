# API 规范

---

## Meta 信息

| 字段 | 值 |
|-----|-----|
| **版本** | v2.3.1 |
| **更新日期** | 2026-06-10 |
| **维护者** | HanziMaster 开发团队 |
| **文档编号** | OS-05 |

---

## 1. API 总览

本文档详细描述 HanziMaster 汉字大师的组件 API、Context API、国际化 API 以及样式规范 API。

> 注：本项目为前端 Web 应用，主要 API 是内部组件接口，没有外部 REST/GraphQL API。AI 功能通过 Google Gemini SDK 调用，详情见第 7 节。

---

## 2. LocaleProvider 国际化上下文

### 2.1 组件概述

`LocaleProvider` 是应用的核心国际化 Context Provider，提供翻译函数、语言状态和语言切换能力。

**文件路径：** [src/components/locale-provider.tsx](../src/components/locale-provider.tsx)

### 2.2 类型定义

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

interface Translations {
  common: {
    learn: string;
    practice: string;
    theme: { light: string; dark: string; system: string };
    startLearning: string;
    exploreLibrary: string;
    strokeCount: string;
    strokes: string;
  };
  home: {
    heroTitle: string;
    heroSubtitle: string;
    aiBadge: string;
    // ...
  };
  learn: { /* 学习页翻译 */ };
  practice: { /* 练习页翻译 */ };
  nav: { /* 移动导航翻译 */ };
  meta: {
    title: string;
    description: string;
  };
}

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  availableLocales: Locale[];
}
```

### 2.3 公共 API

| 导出项 | 类型 | 说明 |
|-------|------|------|
| `LocaleProvider` | `React.ComponentType<{ children: ReactNode }>` | Context Provider 组件，包裹根应用 |
| `useTranslation()` | `() => LocaleContextValue` | Hook，获取当前语言 + 翻译函数 + 切换方法 |
| `translations` | `Record<Locale, Translations>` | 所有语言的翻译对象 |
| `locales` | `Locale[]` | 支持的语言代码列表 |
| `Locale` | `type` | 语言联合类型 |

### 2.4 使用示例

```tsx
// 根布局 (layout.tsx)
import { LocaleProvider } from '@/components/locale-provider';
import { ThemeProvider } from '@/components/theme-provider';

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>
        <ThemeProvider>
          <LocaleProvider>{children}</LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

```tsx
// 在任意组件中
'use client';
import { useTranslation } from '@/components/locale-provider';

function MyComponent() {
  const { t, locale, setLocale, availableLocales } = useTranslation();
  return (
    <div>
      <h1>{t('home.heroTitle')}</h1>
      <button onClick={() => setLocale('zh-CN')}>中文</button>
    </div>
  );
}
```

### 2.5 设计规范

| 项目 | 规范 |
|-----|------|
| **localStorage Key** | `hanzi-master-locale` |
| **默认语言** | `en`（或浏览器 `navigator.language` 前两位匹配结果） |
| **HTML lang 属性** | `document.documentElement.lang = locale` |
| **RTL 支持** | `ar`（阿拉伯语）设置 `dir="rtl"` |
| **翻译键访问** | `t('common.learn')` 通过点号路径 |

---

## 3. ThemeProvider 主题上下文

### 3.1 组件概述

主题上下文提供组件，管理浅色/深色/跟随系统三态主题切换。

**文件路径：** [src/components/theme-provider.tsx](../src/components/theme-provider.tsx)

### 3.2 类型定义

```typescript
type Theme = 'light' | 'dark' | 'system';

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark';  // 实际应用的主题（去除 system）
}
```

### 3.3 公共 API

| 导出项 | 类型 | 说明 |
|-------|------|------|
| `ThemeProvider` | `React.ComponentType<{ children: ReactNode }>` | Context Provider 组件 |
| `useTheme()` | `() => ThemeContextValue` | Hook 获取主题状态和方法 |

### 3.4 使用示例

```tsx
'use client';
import { useTheme } from '@/components/theme-provider';

function StatusIndicator() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  return (
    <button onClick={() => setTheme('dark')}>
      当前主题: {theme} (实际: {resolvedTheme})
    </button>
  );
}
```

### 3.5 设计规范

| 项目 | 规范 |
|-----|------|
| **localStorage Key** | `hanzi-master-theme` |
| **默认主题** | `system`（跟随系统 `prefers-color-scheme`） |
| **HTML class** | `document.documentElement.classList.toggle('dark', isDark)` |
| **系统监听** | `window.matchMedia('(prefers-color-scheme: dark)')` |
| **动画降级** | 检测 `prefers-reduced-motion` → 关闭过渡动画 |

---

## 4. LocaleToggle 语言切换组件

### 4.1 组件概述

下拉菜单式语言切换组件，支持完整的 ARIA 无障碍属性和键盘导航。

**文件路径：** [src/components/locale-toggle.tsx](../src/components/locale-toggle.tsx)

### 4.2 Props

```typescript
interface LocaleToggleProps {
  // 可选：自定义类名
  className?: string;
}
```

### 4.3 导出项

| 导出项 | 类型 | 说明 |
|-------|------|------|
| `LocaleToggleClient` | `React.ComponentType<LocaleToggleProps>` | 客户端组件（已含 `"use client"`） |

### 4.4 ARIA 属性

| 属性 | 值 |
|-----|----|
| 按钮 `aria-haspopup` | `listbox` |
| 按钮 `aria-expanded` | `true / false` |
| 按钮 `aria-label` | `"选择语言"`（国际化） |
| 菜单容器 `role` | `listbox` |
| 菜单项 `role` | `option` |
| 菜单项 `aria-selected` | `true / false` |
| 焦点态 `focus:ring-2 focus:ring-emerald-500` | - |

### 4.5 键盘交互

| 按键 | 行为 |
|-----|------|
| Enter / Space | 打开/关闭菜单 |
| Arrow Down | 向下移动选中项 |
| Arrow Up | 向上移动选中项 |
| Escape | 关闭菜单 |
| 点击外部 | 关闭菜单 |

### 4.6 使用示例

```tsx
import { LocaleToggleClient } from '@/components/locale-toggle';

function Header() {
  return (
    <header className="flex items-center gap-2">
      <LocaleToggleClient />
    </header>
  );
}
```

---

## 5. ThemeToggle 主题切换组件

### 5.1 组件概述

三态循环切换按钮：浅色 → 深色 → 系统 → 浅色。每个状态对应不同 SVG 图标。

**文件路径：** [src/components/theme-toggle.tsx](../src/components/theme-toggle.tsx)

### 5.2 Props

```typescript
interface ThemeToggleProps {
  className?: string;
}
```

### 5.3 导出项

| 导出项 | 类型 | 说明 |
|-------|------|------|
| `ThemeToggleClient` | `React.ComponentType<ThemeToggleProps>` | 客户端组件 |

### 5.4 ARIA 属性

| 属性 | 值 |
|-----|----|
| `aria-label` | `"切换主题: 当前浅色"`（动态） |
| `title` | 显示当前主题名称（hover tooltip） |
| `min-w-11 min-h-11` | 触控目标 ≥ 44x44px |

---

## 6. NavLink & MobileNav 导航组件

### 6.1 NavLink 导航链接

**文件路径：** [src/components/nav-link.tsx](../src/components/nav-link.tsx)

**Props：**
```typescript
interface NavLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}
```

**设计规范：**
- 活跃路由：`bg-emerald-500 text-white rounded-xl`
- 默认态：`text-slate-600 dark:text-slate-300 hover:text-emerald-600`
- `aria-current="page"` 标记活跃链接

### 6.2 MobileNav 移动端抽屉

**文件路径：** [src/components/mobile-nav.tsx](../src/components/mobile-nav.tsx)

**Props：**
```typescript
interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  t: (key: string) => string;  // 翻译函数
}
```

**ARIA 规范：**
| 属性 | 值 |
|-----|----|
| 面板 `role` | `dialog` |
| 面板 `aria-modal` | `true` |
| 面板 `aria-labelledby` | `{titleId}` |
| 遮罩点击 | 关闭 |
| Escape 键 | 关闭 |
| 打开时 | 焦点移入抽屉，滚动锁定 |

---

## 7. FeatureCard & StatsCard 展示组件

### 7.1 FeatureCard 功能特性卡片

**文件路径：** [src/components/feature-card.tsx](../src/components/feature-card.tsx)

**Props：**
```typescript
interface FeatureCardProps {
  icon: ReactNode;          // SVG 图标
  title: string;            // 标题
  description: string;      // 描述
  colorFrom?: string;       // 渐变色起始（Tailwind class，如 'from-emerald-500'）
  colorTo?: string;         // 渐变色结束
}
```

**设计规范：**
- 圆角：`rounded-[24px]`
- 阴影：`shadow-[0_8px_24px_-8px_rgba(0,0,0,0.08)]`
- Hover：`hover:-translate-y-1 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)]`
- 动画降级：`@media (prefers-reduced-motion: reduce)` 时关闭 hover 动画

### 7.2 StatsCard 统计卡片

**文件路径：** [src/components/stats-card.tsx](../src/components/stats-card.tsx)

**Props：**
```typescript
interface StatsCardProps {
  value: number | string;    // 数字值
  label: string;             // 标签
  suffix?: string;           // 后缀（如 "字" "天"）
}
```

**设计规范：**
- 圆角：`rounded-2xl`
- 背景：`bg-gradient-to-br from-emerald-500 to-teal-500 text-white`
- 响应式：`grid-cols-1 md:grid-cols-3`

---

## 8. hanzi-font 样式类

### 8.1 定义位置

[src/app/globals.css](../src/app/globals.css)

### 8.2 CSS

```css
.hanzi-font {
  font-family: var(--font-hanzi), serif;
  /* --font-hanzi 由 next/font/local 自动设置，指向 Noto Sans SC */
}
```

**使用示例：**
```tsx
<span className="text-8xl font-bold hanzi-font">永</span>
```

---

## 9. 设计令牌（Design Tokens）

### 9.1 色彩令牌

| 语义名称 | Tailwind | CSS 值 | 用途 |
|---------|----------|--------|------|
| `--color-primary` | `emerald-500` | `#10b981` | 主强调色 |
| `--color-primary-hover` | `emerald-600` | `#059669` | 主强调色悬停 |
| `--color-bg` | `white` | `#ffffff` | 页面背景（浅） |
| `--color-bg-dark` | `slate-900` | `#0f172a` | 页面背景（深） |
| `--color-text` | `slate-900` | `#0f172a` | 主文本（浅） |
| `--color-text-muted` | `slate-500` | `#64748b` | 次文本 |
| `--color-focus-ring` | `emerald-500` | `#10b981` | 焦点环 |

### 9.2 圆角令牌

| 名称 | 值 | 用途 |
|-----|----|------|
| `--radius-card` | `24px` | 大卡片（FeatureCard、面板） |
| `--radius-medium` | `16px` | 中卡片（网格项、抽屉） |
| `--radius-button` | `12px` | 按钮、徽章 |
| `--radius-small` | `8px` | 小元素 |

### 9.3 阴影令牌

| 名称 | 值 | 用途 |
|-----|----|------|
| `--shadow-card` | `0 8px 24px -8px rgba(0,0,0,0.08)` | 卡片阴影 |
| `--shadow-hover` | `0 20px 60px -15px rgba(0,0,0,0.15)` | 悬停浮起阴影 |
| `--shadow-soft` | `0 2px 8px -4px rgba(0,0,0,0.05)` | 微阴影 |

### 9.4 动效令牌

| 名称 | 值 | 用途 |
|-----|----|------|
| `--ease-standard` | `cubic-bezier(0.4, 0, 0.2, 1)` | 标准缓动 |
| `--duration-short` | `150ms` | 快动画 |
| `--duration-medium` | `300ms` | 标准动画 |

### 9.5 断点令牌（Tailwind 内置）

| 名称 | 宽度 | 说明 |
|-----|------|------|
| `xs` | ~475px | 小手机 |
| `sm` | 640px | 手机 |
| `md` | 768px | 平板 |
| `lg` | 1024px | 笔记本 |
| `xl` | 1280px | 桌面 |

---

## 10. Google Gemini AI 集成（可选）

### 10.1 环境变量

| 变量名 | 必填 | 说明 |
|-------|------|------|
| `GEMINI_API_KEY` | 否 | Google Gemini API 密钥 |

### 10.2 SDK 使用示例

```typescript
// src/lib/gemini.ts (参考实现)
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function analyzeHandwriting(
  imageData: string,     // base64 编码的手写图像
  character: string      // 目标汉字
): Promise<string> {
  if (!genAI) throw new Error('AI 功能未启用');
  const model = genAI.getGenerativeModel({ model: 'gemini-2-flash' });
  const result = await model.generateContent([
    `分析这个汉字「${character}」的手写质量，包括笔画顺序、结构平衡和美感。`,
    { inlineData: { data: imageData, mimeType: 'image/png' } }
  ]);
  return result.response.text();
}
```

---

## 11. Version History

| 版本 | 日期 | 说明 |
|-----|------|------|
| **v2.3.1** | 2026-06-10 | 统一版本号，对齐 Apple 设计风格实现（纯白背景、毛玻璃、emerald 绿色强调、圆角 24px、柔和阴影），完善 ARIA 键盘导航和设计令牌系统 |
| v2.3.0 | 2026-06-07 | 添加设计令牌系统（色彩/圆角/阴影/动效/断点） |
| v2.2.1 | 2026-06-04 | 添加完整组件 Props 类型定义 |
| v2.2.0 | 2026-06-02 | 初始 API 规范版本 |

---

## 12. 相关文档

- [项目概述](01-project-overview.md) - 项目基本信息和技术栈
- [需求规格](02-requirements-spec.md) - 详细的功能需求和非功能需求
- [技术架构](03-technical-architecture.md) - 系统架构设计和技术选型
- [功能规格](04-feature-spec.md) - 详细的功能规格说明
- [数据模型](06-data-model.md) - 数据结构和类型定义
- [设计原型](07-design-prototype.md) - 完整的设计规范和原型图说明
- [无障碍与国际化](08-a11y-i18n.md) - 详细的无障碍和国际化规范

---

**本文档版本: v2.3.1**  
**最后更新: 2026-06-10**
