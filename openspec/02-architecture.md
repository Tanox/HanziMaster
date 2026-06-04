# 技术架构
============

## 1. 架构概述

HanziMaster 采用 Next.js 15 的 App Router 架构，结合 React Server Components 和 Client Components，实现高性能的服务端渲染和客户端交互。

## 2. 系统架构图

### 2.1 整体架构

```
┌─────────────────────────────────────────────────────────────┐
│                        用户界面层                             │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐  │
│  │   Home 页面     │  │   Learn 页面    │  │ 组件库        │  │
│  │  (Server)       │  │  (Client)       │  │ (Client)     │  │
│  └─────────────────┘  └─────────────────┘  └──────────────┘  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              Root Layout（布局与导航）                  │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                        状态管理层                             │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐  │
│  │  LocaleContext  │  │  ThemeContext   │  │  AI 服务     │  │
│  │  (i18n)        │  │  (主题)         │  │              │  │
│  └─────────────────┘  └─────────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                        基础设施层                             │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐  │
│  │  Next.js 15    │  │  React Context  │  │  LocalStorage│  │
│  │  App Router    │  │  API            │  │              │  │
│  └─────────────────┘  └─────────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## 3. 核心模块架构

### 3.1 应用入口层

| 文件 | 职责 |
|------|------|
| [layout.tsx](../src/app/layout.tsx) | 根布局组件，包含主题和国际化 Provider |
| [page.tsx](../src/app/page.tsx) | 首页组件，展示应用介绍和主要功能 |

### 3.2 路由系统

项目使用 Next.js App Router 进行路由管理，默认使用服务端渲染：

```typescript
// 路由文件结构
src/
└── app/
    ├── page.tsx           // 首页 (/)
    ├── learn/
    │   └── page.tsx       // 学习页 (/learn)
    └── practice/
        └── page.tsx       // 练习页 (/practice)
```

### 3.3 页面层

| 页面组件 | 职责 | 文件路径 |
|---------|------|---------|
| Home | 首页，展示应用介绍、功能特性和演示 | [src/app/page.tsx](../src/app/page.tsx) |
| Learn | 学习页面，提供汉字学习和选择功能 | [src/app/learn/page.tsx](../src/app/learn/page.tsx) |
| Practice | 练习页面，提供书写练习、记忆测验和进度追踪 | [src/app/practice/page.tsx](../src/app/practice/page.tsx) |

### 3.4 组件层

| 组件 | 职责 | 文件路径 |
|------|------|---------|
| LocaleProvider | 国际化上下文提供组件，管理语言切换和翻译 | [src/components/locale-provider.tsx](../src/components/locale-provider.tsx) |
| LocaleToggle | 语言切换组件，支持 11 种语言 | [src/components/locale-toggle.tsx](../src/components/locale-toggle.tsx) |
| ThemeProvider | 主题上下文提供组件，管理深色/浅色模式 | [src/components/theme-provider.tsx](../src/components/theme-provider.tsx) |
| ThemeToggle | 主题切换组件，支持深色/浅色模式 | [src/components/theme-toggle.tsx](../src/components/theme-toggle.tsx) |
| MobileNav | 移动端导航抽屉组件，提供响应式导航菜单 | [src/components/mobile-nav.tsx](../src/components/mobile-nav.tsx) |
| NavLink | 导航链接组件，带有活跃状态指示器 | [src/components/nav-link.tsx](../src/components/nav-link.tsx) |
| FeatureCard | 功能特性卡片组件，展示 AI 洞察、词源文化等特性 | [src/components/feature-card.tsx](../src/components/feature-card.tsx) |
| StatsCard | 统计数据卡片组件，显示学习统计信息 | [src/components/stats-card.tsx](../src/components/stats-card.tsx) |

### 3.5 国际化模块

| 文件 | 职责 | 文件路径 |
|------|------|---------|
| i18n/index.ts | 国际化配置，导出翻译数据和类型定义 | [src/lib/i18n/index.ts](../src/lib/i18n/index.ts) |
| translations/*.ts | 各语言翻译文件（11种语言） | [src/lib/i18n/translations/](../src/lib/i18n/translations/) |

## 4. 技术选型说明

### 4.1 前端框架：Next.js 15

**选择理由：**
- 全栈框架，支持服务端渲染和客户端交互
- App Router 提供更好的路由管理和数据获取
- 内置优化，性能优秀
- 强类型 TypeScript 支持

**关键特性：**
- React Server Components（服务端组件）
- Client Components（客户端组件）
- App Router（新路由系统）
- 自动优化和缓存

### 4.2 样式框架：Tailwind CSS 4.0

**选择理由：**
- 原子化 CSS 设计，开发效率高
- 完整的深色模式支持
- 响应式设计开箱即用
- 优秀的性能和可维护性

### 4.3 状态管理：React Context API

**选择理由：**
- 框架内置，无需额外依赖
- 简单直观的 API
- 适合轻量级状态管理
- 与 React 完美配合

### 4.4 AI 服务：Google Gemini

**选择理由：**
- 强大的多模态能力
- 优秀的中文理解
- 官方 SDK 支持
- 可靠的服务稳定性

## 5. 核心技术特性

| 特性 | 说明 |
|------|------|
| React Server Components | 服务端渲染，提升首屏加载性能 |
| Client Components | 客户端交互，支持 hooks 和状态管理 |
| App Router | Next.js 13+ 新路由系统，文件系统路由 |
| React Context API | 用于主题和国际化状态管理 |
| 响应式设计 | Tailwind CSS 提供完全响应式布局 |
| 主题系统 | 完整的深色/浅色/系统主题支持，持久化用户偏好 |
| 国际化 | 支持 11 种语言，浏览器语言自动检测 |

## 6. 数据流

应用采用 React Context API 进行状态管理：

```
用户交互 → Context 更新 → 组件重渲染 → 视图更新
     ↓
LocalStorage（持久化）
     ↓
AI 服务（按需调用）
```

### 6.1 主题切换流程

1. 用户选择主题（dark/light/system）
2. `ThemeProvider` 更新主题状态
3. 如果选择 system，则根据系统主题偏好切换
4. 同步更新 `document.documentElement.classList`
5. 保存到 `localStorage`（key: `hanzi-master-theme`）
6. 视图自动更新

### 6.2 语言切换流程

1. 用户选择语言
2. `LocaleProvider` 更新 `locale` 状态
3. 同步更新 `document.documentElement.lang`
4. 保存到 `localStorage`（key: `hanzi-master-locale`）
5. 所有使用 `t()` 的组件自动更新

## 7. 设计原则

1. **组件化**：UI 拆分为可复用、独立的组件
2. **响应式**：使用 Tailwind CSS 实现完全响应式设计
3. **性能优先**：采用 React Server Components 和 Next.js 优化性能
4. **可访问性**：支持深色/浅色模式和系统主题检测
5. **类型安全**：严格的 TypeScript 类型检查
6. **国际化**：所有用户可见文本支持多语言

## 8. 关键文件说明

| 文件 | 关键内容 |
|------|---------|
| [src/app/layout.tsx](../src/app/layout.tsx) | 根布局：ThemeProvider、LocaleProvider、导航 |
| [src/app/page.tsx](../src/app/page.tsx) | 首页组件：Hero 区域、功能特性展示 |
| [src/components/locale-provider.tsx](../src/components/locale-provider.tsx) | 国际化上下文：语言切换、翻译函数 |
| [src/components/theme-provider.tsx](../src/components/theme-provider.tsx) | 主题上下文：深色/浅色模式切换 |
| [src/lib/i18n/index.ts](../src/lib/i18n/index.ts) | 国际化配置：翻译数据导出、类型定义 |
| [src/app/globals.css](../src/app/globals.css) | 全局样式：Tailwind CSS 导入、字体定义 |

## 9. 相关文档

- [项目概述](01-overview.md) - 项目基本信息和技术栈
- [开发指南](03-development.md) - 开发环境配置和编码规范
- [API 参考](04-api-reference.md) - 详细的 API 文档和代码示例
