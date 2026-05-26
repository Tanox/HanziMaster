# 技术架构
============

## 1. 架构概述

HanziMaster 采用基于组件的单页应用（SPA）架构，使用 Angular 21 框架和 Zoneless 变更检测策略，确保高性能和良好的用户体验。

## 2. 系统架构图

### 2.1 整体架构

```
┌─────────────────────────────────────────────────────────────┐
│                        用户界面层                             │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐  │
│  │   Home 页面     │  │   Learn 页面    │  │ 组件库        │  │
│  └─────────────────┘  └─────────────────┘  └──────────────┘  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              App 根组件（布局与导航）                   │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                        业务逻辑层                             │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐  │
│  │  I18nService   │  │  字符数据服务   │  │  AI 服务     │  │
│  └─────────────────┘  └─────────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                        基础设施层                             │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐  │
│  │  Angular 21    │  │  Signals 状态   │  │  LocalStorage│  │
│  │  Zoneless      │  │  管理           │  │              │  │
│  └─────────────────┘  └─────────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## 3. 核心模块架构

### 3.1 应用入口层

| 文件 | 职责 |
|------|------|
| [main.ts](../app/main.ts) | 应用启动入口，配置并启动 Angular 应用 |
| [app.config.ts](../app/app.config.ts) | 应用配置，包括路由、变更检测策略等 |
| [app.ts](../app/app.ts) | 根组件，包含布局结构、导航栏和页脚 |

### 3.2 路由系统

项目使用 Angular Router 进行路由管理，支持懒加载优化性能：

```typescript
// app/app.routes.ts
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.Home)
  },
  {
    path: 'learn',
    loadComponent: () => import('./pages/learn/learn').then(m => m.Learn)
  }
];
```

### 3.3 页面层

| 页面组件 | 职责 | 文件路径 |
|---------|------|---------|
| Home | 首页，展示应用介绍、功能特性和演示 | [app/pages/home/home.ts](../app/pages/home/home.ts) |
| Learn | 学习页面，提供汉字学习和选择功能 | [app/pages/learn/learn.ts](../app/pages/learn/learn.ts) |

### 3.4 组件层

| 组件 | 职责 | 文件路径 |
|------|------|---------|
| ThemeToggle | 主题切换组件，支持深色/浅色模式 | [app/components/theme-toggle.ts](../app/components/theme-toggle.ts) |
| LocaleToggle | 语言切换组件，支持 11 种语言 | [app/components/locale-toggle.ts](../app/components/locale-toggle.ts) |

### 3.5 服务层

| 服务 | 职责 | 文件路径 |
|------|------|---------|
| I18nService | 国际化服务，提供翻译和语言切换功能 | [app/i18n/i18n.service.ts](../app/i18n/i18n.service.ts) |

## 4. 技术选型说明

### 4.1 前端框架：Angular 21

**选择理由：**
- 完整的框架生态系统
- Zoneless 变更检测策略，性能提升
- 强类型 TypeScript 支持
- 官方 Material 组件库

**关键特性：**
- Standalone Components（独立组件）
- Signals 状态管理
- OnPush 变更检测策略

### 4.2 样式框架：Tailwind CSS 4.0

**选择理由：**
- 原子化 CSS 设计，开发效率高
- 完整的深色模式支持
- 响应式设计开箱即用
- 优秀的性能和可维护性

### 4.3 状态管理：Angular Signals

**选择理由：**
- 框架内置，无需额外依赖
- 细粒度的响应式更新
- 与 Zoneless 完美配合
- 简单直观的 API

### 4.4 AI 服务：Google Gemini

**选择理由：**
- 强大的多模态能力
- 优秀的中文理解
- 官方 SDK 支持
- 可靠的服务稳定性

## 5. 核心技术特性

| 特性 | 说明 |
|------|------|
| Zoneless 变更检测 | 无 Zone.js 的变更检测，减少开销，提升性能 |
| Standalone Components | 独立组件，无需 NgModule，简化架构 |
| 路由懒加载 | 使用 `loadComponent` 实现按需加载，优化初始加载 |
| OnPush 变更检测 | 组件级别的变更检测策略，减少不必要的检查 |
| Signals 状态管理 | 响应式状态管理，细粒度更新 |
| 响应式设计 | Tailwind CSS 提供完全响应式布局 |
| 深色模式 | 完整的深色/浅色模式支持，持久化用户偏好 |
| 国际化 | 支持 11 种语言，浏览器语言自动检测 |

## 6. 数据流

应用采用 Angular 的单向数据流和组件通信模式：

```
用户交互 → 组件事件 → Signals 更新 → 视图更新
     ↓
LocalStorage（持久化）
     ↓
AI 服务（按需调用）
```

### 6.1 主题切换流程

1. 用户点击主题切换按钮
2. 组件更新 `isDark` signal
3. 同步更新 `document.documentElement.classList`
4. 保存到 `localStorage`（key: `hanzi-master-theme`）
5. 视图自动更新

### 6.2 语言切换流程

1. 用户选择语言
2. `I18nService` 更新 `currentLocale` signal
3. 同步更新 `document.documentElement.lang`
4. 保存到 `localStorage`（key: `hanzi-master-locale`）
5. 所有使用 `i18n.t()` 的组件自动更新

## 7. 设计原则

1. **组件化**：UI 拆分为可复用、独立的组件
2. **响应式**：使用 Tailwind CSS 实现完全响应式设计
3. **性能优先**：采用 Zoneless 变更检测和懒加载优化性能
4. **可访问性**：支持深色/浅色模式和系统主题检测
5. **类型安全**：严格的 TypeScript 类型检查
6. **国际化**：所有用户可见文本支持多语言

## 8. 关键文件说明

| 文件 | 关键内容 |
|------|---------|
| [app/app.config.ts](../app/app.config.ts) | 应用配置：`provideZonelessChangeDetection()`、`provideRouter()`、`provideAnimationsAsync()` |
| [app/app.routes.ts](../app/app.routes.ts) | 路由配置：懒加载路由定义 |
| [app/app.ts](../app/app.ts) | 根组件：布局、导航、主题和语言切换 |
| [app/i18n/i18n.service.ts](../app/i18n/i18n.service.ts) | 国际化服务：翻译、语言切换 |
| [app/components/theme-toggle.ts](../app/components/theme-toggle.ts) | 主题切换组件 |
| [app/components/locale-toggle.ts](../app/components/locale-toggle.ts) | 语言切换组件 |
| [app/styles.css](../app/styles.css) | 全局样式：Tailwind 配置、字体定义 |

## 9. 相关文档

- [项目概述](01-overview.md) - 项目基本信息和技术栈
- [开发指南](03-development.md) - 开发环境配置和编码规范
- [API 参考](04-api-reference.md) - 详细的 API 文档和代码示例
