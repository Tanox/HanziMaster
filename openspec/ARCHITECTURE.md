# 架构设计

## 整体架构

HanziMaster 采用 Next.js 15 的 App Router 架构，结合 React Server Components 和 Client Components，实现高性能的服务端渲染和客户端交互。

## 目录结构

```
/workspace/
├── src/                       # 应用源代码目录
│   ├── app/                   # Next.js App Router 目录
│   │   ├── learn/             # 学习页面路由
│   │   │   └── page.tsx       # 学习页面组件
│   │   ├── globals.css        # 全局样式（Tailwind CSS）
│   │   ├── layout.tsx         # 根布局组件
│   │   └── page.tsx           # 首页组件
│   ├── components/            # 可复用组件
│   │   ├── locale-provider.tsx    # 国际化上下文提供组件
│   │   ├── locale-toggle.tsx      # 语言切换组件
│   │   ├── theme-provider.tsx     # 主题上下文提供组件
│   │   └── theme-toggle.tsx       # 主题切换组件
│   └── lib/                   # 工具函数和配置
│       └── i18n/              # 国际化模块
│           ├── translations/  # 翻译文件目录
│           │   ├── en.ts      # 英语翻译
│           │   ├── zh-CN.ts   # 简体中文翻译
│           │   ├── zh-TW.ts   # 繁体中文翻译
│           │   ├── es.ts      # 西班牙语翻译
│           │   ├── ar.ts      # 阿拉伯语翻译
│           │   ├── fr.ts      # 法语翻译
│           │   ├── pt-BR.ts   # 葡萄牙语翻译
│           │   ├── de.ts      # 德语翻译
│           │   ├── ja.ts      # 日语翻译
│           │   ├── ko.ts      # 韩语翻译
│           │   └── ru.ts      # 俄语翻译
│           └── index.ts       # 国际化配置导出
├── openspec/                  # 项目规范文档
├── package.json               # 项目依赖配置
├── next.config.js             # Next.js 配置
├── tailwind.config.ts         # Tailwind CSS 配置
├── postcss.config.js          # PostCSS 配置
├── eslint.config.js           # ESLint 配置
└── vercel.json                # 部署配置
```

## 核心模块架构

### 1. 应用入口层

- [layout.tsx](file:///workspace/src/app/layout.tsx)：根布局组件，包含主题和国际化 Provider
- [page.tsx](file:///workspace/src/app/page.tsx)：首页组件，展示应用介绍和主要功能

### 2. 路由系统

- 使用 Next.js App Router 进行路由管理
- 支持文件系统路由，无需额外配置
- 默认使用服务端渲染

### 3. 页面层

- [Home](file:///workspace/src/app/page.tsx)：首页，展示应用介绍和主要功能
- [Learn](file:///workspace/src/app/learn/page.tsx)：学习页面，提供汉字学习功能

### 4. 组件层

- [LocaleProvider](file:///workspace/src/components/locale-provider.tsx)：国际化上下文提供组件，管理语言切换和翻译
- [LocaleToggle](file:///workspace/src/components/locale-toggle.tsx)：语言切换组件
- [ThemeProvider](file:///workspace/src/components/theme-provider.tsx)：主题上下文提供组件，管理深色/浅色模式
- [ThemeToggle](file:///workspace/src/components/theme-toggle.tsx)：主题切换组件

### 5. 国际化模块

- [i18n/index.ts](file:///workspace/src/lib/i18n/index.ts)：国际化配置，导出翻译数据和类型定义
- 支持 11 种语言，翻译文件存放在 `translations/` 目录

## 数据流

应用采用 React Context API 进行状态管理：

1. **主题管理**：通过 `ThemeProvider` 使用 Context 管理主题状态，持久化到 localStorage
2. **国际化**：通过 `LocaleProvider` 使用 Context 管理语言状态，自动检测浏览器语言，支持手动切换

## 设计原则

1. **组件化**：UI 拆分为可复用、独立的组件
2. **响应式**：使用 Tailwind CSS 实现完全响应式设计
3. **性能优先**：采用 React Server Components 和 Next.js 优化性能
4. **可访问性**：支持深色/浅色模式和系统主题检测
5. **国际化**：支持 11 种语言，自动检测用户语言偏好
