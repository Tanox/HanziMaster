# HanziMaster 汉字大师 v2.2.0

[English](README_EN.md) | [简体中文](README.md)

汉字大师是一个现代化的、基于人工智能的汉字学习平台。它利用 Gemini AI 提供关于笔画顺序、平衡和美感的个性化反馈。

## 功能
- **AI 驱动的洞察**: 对您的手写进行实时反馈。
- **自适应学习**: 根据您的进度调整个性化学习路径。
- **词源与文化**: 发现汉字背后的故事。
- **Next.js 15**: 高性能、现代化的 React 框架。
- **React 19**: 使用最新版本的 React 生态系统。
- **Tailwind CSS 3.4**: 美观、响应式的设计。
- **深色/浅色模式**: 支持系统检测和持久化主题偏好。
- **中文字体支持**: 使用 Noto Sans SC 优雅显示汉字。
- **国际化 (i18n)**: 支持 11 种语言，包括英语、简体中文、繁体中文、西班牙语、阿拉伯语、法语、葡萄牙语、德语、日语、韩语和俄语。
- **语言切换器**: 便捷的语言切换并支持持久化。

## 技术栈
- **框架**: Next.js 15 (React 19)
- **样式**: Tailwind CSS 3.4
- **AI**: Google Gemini AI
- **图标**: Lucide React
- **动画**: Motion (Vanilla JS)
- **字体**: Inter, JetBrains Mono, Noto Sans SC
- **国际化**: React Context API + 自定义 i18n Provider，支持 11 种语言

## 开始使用
1. 安装依赖: `npm install`
2. 启动开发服务器: `npm run dev`
3. 生产环境构建: `npm run build`

## 支持的语言
HanziMaster 支持以下 11 种语言：
- 🇺🇸 English
- 🇨🇳 简体中文
- 🇹🇼 繁體中文
- 🇪🇸 Español
- 🇸🇦 العربية
- 🇫🇷 Français
- 🇧🇷 Português (Brasil)
- 🇩🇪 Deutsch
- 🇯🇵 日本語
- 🇰🇷 한국어
- 🇷🇺 Русский

## 项目结构
```
src/
├── app/                 # Next.js App Router 目录
│   ├── page.tsx       # 首页
│   ├── learn/         # 学习页面
│   ├── layout.tsx     # 根布局
│   └── globals.css    # 全局样式
├── components/         # React 组件目录
│   ├── theme-provider.tsx    # 主题提供者
│   ├── theme-toggle.tsx       # 主题切换组件
│   ├── locale-provider.tsx   # 语言提供者
│   └── locale-toggle.tsx     # 语言切换组件
├── public/            # 静态资源
└── package.json       # 项目配置
```

## 从 Angular 迁移到 Next.js

此项目已从 Angular 21 迁移到 Next.js 15。主要变化包括：

- **路由**: 从 Angular Router 迁移到 Next.js App Router
- **组件**: 从 Angular 组件迁移到 React 函数组件
- **状态管理**: 从 Angular Signals 迁移到 React Hooks (useState, useEffect)
- **样式**: 保持 Tailwind CSS，但升级到 3.4 版本
- **图标**: 从 Angular Material Icons 迁移到 Lucide React
- **国际化**: 从 Angular 服务迁移到 React Context API
- **构建工具**: 从 Angular CLI 迁移到 Next.js + TypeScript

## 许可证
© 2026 HanziMaster 汉字大师. 保留所有权利。
