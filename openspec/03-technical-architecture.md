# 技术架构说明

---

## Meta 信息

| 字段 | 值 |
|-----|-----|
| **版本** | v2.3.1 |
| **更新日期** | 2026-06-10 |
| **维护者** | HanziMaster 开发团队 |
| **文档编号** | OS-03 |

---

## 1. 架构概述

HanziMaster 汉字大师采用 Next.js 15 的 App Router 架构，结合 React Server Components 和 Client Components，实现高性能的服务端渲染和客户端交互。

设计风格遵循 Apple 设计语言：
- **纯白背景** `#ffffff`，深色模式为 `#0f172a`
- **毛玻璃效果** `backdrop-blur(20px)` 用于导航和浮层
- **emerald 绿色** `#10b981` 作为强调色
- **圆角 24px** 大卡片 / 16px 中卡片 / 12px 按钮
- **三层柔和阴影** 系统构建视觉层次

---

## 2. 系统架构图

### 2.1 整体架构

```
┌─────────────────────────────────────────────────────────────┐
│                        用户界面层                             │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │
│  │   Home 页面     │  │   Learn 页面    │  │  Practice    │ │
│  │  (Server)       │  │  (Client)       │  │  (Client)    │ │
│  └─────────────────┘  └─────────────────┘  └──────────────┘ │
│  ┌───────────────────────────────────────────────────────┐  │
│  │         Root Layout（毛玻璃导航 + Skip Link）           │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                        状态管理层                             │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │
│  │  LocaleContext  │  │  ThemeContext   │  │  AI 服务     │ │
│  │  (i18n 11种)    │  │  (3态主题)       │  │  (Gemini)    │ │
│  └─────────────────┘  └─────────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                        基础设施层                             │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │
│  │  Next.js 15    │  │  Tailwind 4.0   │  │  LocalStorage│ │
│  │  App Router    │  │  (设计令牌)      │  │              │ │
│  └─────────────────┘  └─────────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. 核心模块架构

### 3.1 应用入口层

| 文件 | 职责 |
|------|------|
| [layout.tsx](../src/app/layout.tsx) | 根布局组件，包含主题和国际化 Provider、Skip Link、语义化结构 |
| [page.tsx](../src/app/page.tsx) | 首页组件，展示 Hero 区域、功能特性卡片 |

### 3.2 路由系统

项目使用 Next.js App Router 进行路由管理，默认使用服务端渲染：

```typescript
// 路由文件结构
src/
└── app/
    ├── page.tsx           // 首页 (/) - Server Component
    ├── learn/
    │   └── page.tsx       // 学习页 (/learn) - Client Component
    └── practice/
        └── page.tsx       // 练习页 (/practice) - Client Component
```

**路由特性：**
- 文件系统路由，约定优于配置
- 默认 Server Components，按需标记 `"use client"`
- 与导航系统集成（NavLink + 底部移动导航）

### 3.3 页面层

| 页面组件 | 职责 | 文件路径 | 组件类型 |
|---------|------|---------|---------|
| Home | 首页，Hero 区域 + 3 列功能卡片 | [src/app/page.tsx](../src/app/page.tsx) | Server |
| Learn | 学习页面，汉字网格选择 + 详情面板 | [src/app/learn/page.tsx](../src/app/learn/page.tsx) | Client |
| Practice | 练习页面，选项卡片 + 周进度 + 统计 | [src/app/practice/page.tsx](../src/app/practice/page.tsx) | Client |

**页面布局策略：**
- **移动端 (< 768px)**：单列布局，卡片占满宽度，底部导航
- **平板 (768px - 1024px)**：双列布局，顶部导航 + 抽屉菜单
- **桌面端 (≥ 1024px)**：三列布局，完整顶部导航 + 毛玻璃效果

### 3.4 组件层

| 组件 | 职责 | 文件路径 | 关键 ARIA |
|------|------|---------|-----------|
| LocaleProvider | 国际化上下文，管理 11 种语言切换 | [src/components/locale-provider.tsx](../src/components/locale-provider.tsx) | - |
| LocaleToggle | 语言切换下拉菜单 | [src/components/locale-toggle.tsx](../src/components/locale-toggle.tsx) | `role="listbox"`, `aria-expanded`, `aria-selected` |
| ThemeProvider | 主题上下文，管理深色/浅色/系统三态 | [src/components/theme-provider.tsx](../src/components/theme-provider.tsx) | - |
| ThemeToggle | 主题切换按钮，三态循环 | [src/components/theme-toggle.tsx](../src/components/theme-toggle.tsx) | `aria-label`, `title` |
| MobileNav | 移动端侧边抽屉导航 | [src/components/mobile-nav.tsx](../src/components/mobile-nav.tsx) | `role="dialog"`, `aria-modal` |
| NavLink | 导航链接，活跃状态高亮 | [src/components/nav-link.tsx](../src/components/nav-link.tsx) | `aria-current="page"` |
| FeatureCard | 功能特性卡片（AI/词源/自适应） | [src/components/feature-card.tsx](../src/components/feature-card.tsx) | - |
| StatsCard | 统计数据卡片（数字 + 标签） | [src/components/stats-card.tsx](../src/components/stats-card.tsx) | - |

**组件设计规范：**
- 圆角：FeatureCard 使用 `24px`，按钮使用 `12px`
- 阴影：FeatureCard 使用卡片阴影 `0 8px 24px -8px rgba(0,0,0,0.08)`
- 悬停效果：轻微微上浮 + 阴影增强（`prefers-reduced-motion` 时禁用）
- 触控目标：最小 44x44px

### 3.5 国际化模块

| 文件 | 职责 | 文件路径 |
|------|------|---------|
| i18n/index.ts | 翻译数据导出 + Locale 类型定义 | [src/lib/i18n/index.ts](../src/lib/i18n/index.ts) |
| translations/*.ts | 各语言翻译文件（11 种语言） | [src/lib/i18n/translations/](../src/lib/i18n/translations/) |

**翻译对象结构（设计规范）：**
```typescript
{
  common: {
    learn: string;          // 学习导航
    practice: string;       // 练习导航
    theme: {                // 主题切换
      light: string;
      dark: string;
      system: string;
    };
    startLearning: string;  // CTA 按钮
    exploreLibrary: string; // CTA 按钮
    strokeCount: string;
    strokes: string;
  },
  home: {
    heroTitle: string;      // 主标题（渐变色）
    heroSubtitle: string;   // 副标题
    aiBadge: string;        // AI 状态徽章
    // ...
  },
  learn: { /* 学习页翻译 */ },
  practice: { /* 练习页翻译 */ },
  nav: { /* 底部移动导航翻译 */ }
}
```

---

## 4. 技术选型说明

### 4.1 前端框架：Next.js 15

**选择理由：**
- 全栈框架，支持服务端渲染和客户端交互
- App Router 提供更好的路由管理和数据获取
- 内置优化，性能优秀（LCP、CLS 指标）
- 强类型 TypeScript 支持

**关键特性：**
- React Server Components（服务端组件）减少客户端 JS
- Client Components（客户端组件）管理交互状态
- App Router 文件系统路由
- 自动字体优化和图片优化

### 4.2 样式框架：Tailwind CSS 4.0

**选择理由：**
- 原子化 CSS 设计，开发效率高
- 完整的深色模式支持（`.dark` 类切换）
- 响应式设计开箱即用（`sm:` `md:` `lg:` 前缀）
- 零运行时，按需编译，包体积极小
- v4.0 支持 CSS-first 配置，设计令牌系统更优雅

**设计令牌映射：**
| 语义名称 | Tailwind 值 | CSS 值 | 用途 |
|---------|------------|--------|------|
| primary | `emerald-500` | `#10b981` | 主要强调色、活跃状态、CTA |
| primary-dark | `emerald-600` | `#059669` | 强调色 hover 状态 |
| bg-default | `white` | `#ffffff` | 页面背景（浅色） |
| bg-inverse | `slate-900` | `#0f172a` | 页面背景（深色） |
| text-default | `slate-900` | `#0f172a` | 主文本 |
| text-muted | `slate-500` | `#64748b` | 次文本 |
| card-radius | - | `24px` | 大卡片圆角 |
| medium-radius | - | `16px` | 中卡片圆角 |
| button-radius | - | `12px` | 按钮圆角 |

### 4.3 状态管理：React Context API

**选择理由：**
- 框架内置，无需额外依赖
- 简单直观的 API，避免 Redux 等重度方案
- 适合轻量级状态管理（主题 + 语言偏好）
- 与 React 完美配合，支持 hooks

**两个 Context 职责：**
1. `ThemeContext`：管理 `'light' | 'dark' | 'system'` 三态
2. `LocaleContext`：管理当前语言 + `t()` 翻译函数

### 4.4 AI 服务：Google Gemini

**选择理由：**
- 强大的多模态能力（图像识别手写）
- 优秀的中文理解能力
- 官方 SDK 支持，易于集成
- 可靠的服务稳定性

---

## 5. 核心技术特性

| 特性 | 说明 |
|------|------|
| React Server Components | 服务端渲染，提升首屏加载性能，减少客户端 JS |
| Client Components | 客户端交互，支持 hooks 和状态管理 |
| App Router | Next.js 13+ 新路由系统，文件系统路由 |
| React Context API | 用于主题和国际化状态管理 |
| 响应式设计 | Tailwind CSS 提供完全响应式布局（移动优先） |
| 主题系统 | 完整的深色/浅色/系统主题支持，持久化用户偏好 |
| 国际化 | 支持 11 种语言，浏览器语言自动检测，翻译键组织清晰 |

---

## 6. 数据流

应用采用 React Context API 进行状态管理：

```
用户交互 → Context 更新 → 组件重渲染 → 视图更新
     ↓
LocalStorage（持久化: hanzi-master-theme / hanzi-master-locale）
     ↓
AI 服务（按需调用，仅在配置 GEMINI_API_KEY 时启用）
```

### 6.1 主题切换流程

1. 用户点击 ThemeToggle 触发 `setTheme()`
2. `ThemeProvider` 更新状态：`'light' → 'dark' → 'system' → 'light'`
3. 更新 `<html>` 元素的 `class="dark"`（如果是深色或系统且系统为深色）
4. 保存到 `localStorage['hanzi-master-theme']`
5. 如果是 `'system'`，监听 `matchMedia('(prefers-color-scheme: dark)')` 变化
6. 所有 Tailwind `dark:` 类自动应用

### 6.2 语言切换流程

1. 用户打开 LocaleToggle 下拉菜单（`aria-expanded="true"`）
2. 选择语言或使用键盘导航（Arrow Up/Down + Enter）
3. `LocaleProvider` 更新 `locale` 状态
4. 同步更新 `document.documentElement.lang = 'zh-CN'` 等
5. 保存到 `localStorage['hanzi-master-locale']`
6. 所有使用 `t('home.heroTitle')` 的组件自动以新语言重渲染

---

## 7. 设计原则

1. **组件化**：UI 拆分为可复用、独立的组件（FeatureCard、StatsCard、NavLink...）
2. **移动优先**：Tailwind `sm:` `md:` `lg:` 断点，从移动端基础样式向上扩展
3. **性能优先**：采用 React Server Components 和 Next.js 优化减少 JS 包体
4. **可访问性**：完整 ARIA、Skip Link、键盘导航、`prefers-reduced-motion`、44px 触控目标
5. **类型安全**：严格的 TypeScript 类型检查（`strict: true`）
6. **国际化优先**：所有用户可见文本通过 `t()` 函数，RTL 兼容
7. **设计一致性**：统一的圆角、阴影、色彩令牌，避免分散的魔数

---

## 8. 关键文件说明

| 文件 | 关键内容 | 设计规范 |
|------|---------|---------|
| [src/app/layout.tsx](../src/app/layout.tsx) | 根布局：ThemeProvider、LocaleProvider、Skip Link、顶部/底部导航 | 语义化 `<header>` `<main>` `<footer>`，max-width 限制 |
| [src/app/page.tsx](../src/app/page.tsx) | 首页组件：Hero 区域、3 列功能特性卡片 | 渐变色文字、`rounded-2xl` 卡片、`hover:scale-[1.02]` 动画 |
| [src/components/locale-provider.tsx](../src/components/locale-provider.tsx) | 国际化上下文：语言切换、翻译函数 `t()` | 11 种语言，类型安全 `Locale` |
| [src/components/theme-provider.tsx](../src/components/theme-provider.tsx) | 主题上下文：深色/浅色/系统模式，`prefers-color-scheme` 监听 | 三态循环，localStorage 持久化 |
| [src/lib/i18n/index.ts](../src/lib/i18n/index.ts) | 国际化配置：翻译数据导出、类型定义 | 统一翻译键结构 |
| [src/app/globals.css](../src/app/globals.css) | 全局样式：Tailwind 导入、字体定义、`hanzi-font` 类、动画定义 | CSS 变量设计令牌、`@keyframes` |

---

## 9. Version History

| 版本 | 日期 | 说明 |
|-----|------|------|
| **v2.3.1** | 2026-06-10 | 统一版本号，对齐 Apple 设计风格实现（纯白背景、毛玻璃、emerald 绿色强调、圆角 24px、柔和阴影），完善无障碍和响应式描述 |
| v2.3.0 | 2026-06-07 | 添加设计令牌系统说明，完善组件 ARIA 描述 |
| v2.2.1 | 2026-06-04 | 完善数据流说明 |
| v2.2.0 | 2026-06-02 | 初始技术架构版本 |

---

## 10. 相关文档

- [项目概述](01-project-overview.md) - 项目基本信息和技术栈
- [需求规格](02-requirements-spec.md) - 详细的功能需求和非功能需求
- [功能规格](04-feature-spec.md) - 详细的功能规格说明
- [API 规范](05-api-spec.md) - 详细的 API 文档和代码示例
- [数据模型](06-data-model.md) - 数据结构和类型定义
- [设计原型](07-design-prototype.md) - 完整的设计规范和原型图说明
- [无障碍与国际化](08-a11y-i18n.md) - 详细的无障碍和国际化规范

---

**本文档版本: v2.3.1**  
**最后更新: 2026-06-10**
