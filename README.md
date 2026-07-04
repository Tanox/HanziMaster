# HanziMaster 汉字大师

一款 AI 驱动的汉字学习应用，通过智能分析帮助你掌握汉字书写。

[English](README_EN.md)

## 主要功能

- **AI 智能分析** - 实时反馈你的书写笔画顺序、结构和美观度
- **多种学习模式** - 基础学习、书写练习、拼音测验、学习进度追踪
- **田字格书写练习** - Canvas 手写绘制，支持触摸屏和鼠标，带实时发音播放
- **拼音测验** - 4 选 1 拼音测试，实时正确/错误统计，准确率分析
- **个性化进度** - 根据你的学习情况智能推荐，连续学习天数统计
- **11 种语言** - 简体中文、繁体中文、英语、日语、韩语等
- **深色模式** - 支持跟随系统或手动切换，Canvas 书写区域自动适配
- **Apple 设计系统** - 统一使用 Apple 品牌色彩系统（Blue/Purple）
- **移动端适配** - 完美支持手机和平板

## Features

- **AI 智能书写反馈** - 实时分析书写笔画与结构
- **11 种语言国际化** - 完整 i18n 支持
- **RTL 支持** - 阿拉伯语等从右至左文字支持
- **深色/浅色/系统主题** - 三种主题模式自由切换
- **WCAG 2.1 AA 无障碍** - 完整无障碍支持
- **Nonce-based CSP** - 基于 nonce 的内容安全策略
- **PWA-ready** - 渐进式 Web 应用支持

## 快速开始

### 环境要求

- Node.js 24.5.0 或更高版本
- npm / yarn / pnpm

### 安装

```bash
# 克隆项目
git clone <仓库地址>
cd HanziMaster

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 `http://localhost:3000` 即可使用。

### 配置 AI（可选）

如果你想使用 AI 分析功能：

```bash
# 复制环境变量模板
cp .env.example .env
```

编辑 `.env` 文件，填入你的 Google Gemini API Key。

> 没有 API Key 也能使用基础功能。

## 页面介绍

| 页面 | 地址 | 说明 |
|------|------|------|
| 首页 | `/` | 了解应用功能，开始学习 |
| 学习 | `/learn` | 选择汉字学习，学习发音和书写，支持发音播放 |
| 练习 | `/practice` | 三种练习模式：书写练习、拼音测验、学习进度 |

## 技术栈

- **框架**: Next.js 16 (App Router)
- **UI 库**: React 19 + shadcn/ui (radix-nova preset)
- **样式**: Tailwind CSS v4 + Apple 设计系统
- **AI**: Google Gemini AI
- **字体**: Inter, JetBrains Mono, Noto Sans SC
- **国际化**: 自定义 i18n 上下文（11 种语言）

## 项目结构

```
src/
├── app/                  # Next.js App Router
│   ├── globals.css       # 全局样式
│   ├── layout.tsx        # 根布局（导航、主题、i18n）
│   ├── page.tsx          # 首页
│   ├── learn/            # 学习页面
│   │   └── page.tsx
│   └── practice/         # 练习页面
│       └── page.tsx
├── components/
│   ├── ui/               # shadcn/ui 组件库
│   ├── theme-provider.tsx   # 主题上下文
│   ├── theme-toggle.tsx     # 主题切换
│   ├── locale-provider.tsx  # i18n 上下文
│   └── locale-toggle.tsx    # 语言切换
├── hooks/                # 自定义 React hooks（use-canvas, use-quiz）
├── lib/
│   ├── utils.ts          # cn() className 合并工具
│   ├── storage.ts        # 安全的 localStorage 工具
│   └── i18n/             # 国际化
│       ├── index.ts
│       └── translations/ # 翻译文件
└── proxy.ts              # Next.js proxy（安全头、CSP）
```

## 支持的语言

简体中文 · 繁體中文 · English · 日本語 · 한국어 · Español · Français · Deutsch · Português · العربية · Русский

## 部署

推荐部署平台：Vercel、腾讯云 EdgeOne Pages

构建命令：`npm run build`
输出目录：`.next`

## 许可证

© 2026 HanziMaster 汉字大师 v3.0.0. All rights reserved.
