# HanziMaster 汉字大师 v2.2.0

[English](README_EN.md) | [简体中文](README.md)

汉字大师是一个现代化的、基于人工智能的汉字学习平台。它利用 Gemini AI 提供关于笔画顺序、平衡和美感的个性化反馈。

## 功能
- **AI 驱动的洞察**: 对您的手写进行实时反馈。
- **自适应学习**: 根据您的进度调整个性化学习路径。
- **词源与文化**: 发现汉字背后的故事。
- **响应式设计**: 完美适配移动端和桌面端。
- **深色/浅色模式**: 支持系统检测和持久化主题偏好。
- **Tailwind CSS 4.0**: 美观、响应式的设计。
- **中文字体支持**: 使用 Noto Sans SC 优雅显示汉字。
- **国际化 (i18n)**: 支持 11 种语言，包括英语、简体中文、繁体中文、西班牙语、阿拉伯语、法语、葡萄牙语、德语、日语、韩语和俄语。
- **语言切换器**: 便捷的语言切换并支持持久化。

## 技术栈
- **框架**: Next.js 15
- **UI 库**: React 19
- **样式**: Tailwind CSS 4.0
- **AI**: Google Gemini AI
- **字体**: Inter, JetBrains Mono, Noto Sans SC
- **国际化**: 自定义 i18n 上下文，支持 11 种语言

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
├── app/               # Next.js App Router
│   ├── globals.css    # 全局样式
│   ├── layout.tsx     # 根布局
│   ├── page.tsx       # 首页
│   ├── learn/         # 学习页
│   │   └── page.tsx
│   └── practice/      # 练习页
│       └── page.tsx
├── components/        # React 组件
│   ├── theme-provider.tsx # 主题上下文
│   ├── theme-toggle.tsx   # 主题切换
│   ├── locale-provider.tsx # 国际化上下文
│   └── locale-toggle.tsx  # 语言切换
└── lib/              # 工具库
    └── i18n/         # 国际化
        ├── index.ts
        └── translations/ # 翻译文件
```

## 原型设计
项目包含一个高保真 HTML 原型 (`prototype.html`)，包含：
- 完整的三个页面（首页、学习页、练习页）
- 响应式设计，完美适配移动端和桌面端
- 深色/浅色模式切换
- 丰富的动画效果和交互
- 所有核心功能的视觉展示

## 许可证
© 2026 HanziMaster 汉字大师. 保留所有权利。