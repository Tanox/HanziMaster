# HanziMaster 汉字大师

一款 AI 驱动的汉字学习应用，通过智能分析帮助你掌握汉字书写。

[English](README_EN.md)

## 主要功能

- **AI 智能分析** - 实时反馈你的书写笔画顺序、结构和美观度
- **多种学习模式** - 基础学习、书写练习、记忆测验
- **个性化进度** - 根据你的学习情况智能推荐
- **11 种语言** - 简体中文、繁体中文、英语、日语、韩语等
- **深色模式** - 支持跟随系统或手动切换
- **Apple 设计系统** - 统一使用 Apple 品牌色彩系统（Blue/Purple）
- **移动端适配** - 完美支持手机和平板

## 快速开始

### 环境要求

- Node.js 20.11.0 或更高版本
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
| 学习 | `/learn` | 选择汉字，学习发音和书写 |
| 练习 | `/practice` | 书写练习和记忆测验 |

## 技术栈

- **框架**: Next.js 15 (App Router)
- **UI 库**: React 19
- **样式**: Tailwind CSS 4.0 + Apple 设计系统
- **AI**: Google Gemini AI
- **字体**: Inter, JetBrains Mono, Noto Sans SC
- **国际化**: 自定义 i18n 上下文（11 种语言）

## 支持的语言

简体中文 · 繁體中文 · English · 日本語 · 한국어 · Español · Français · Deutsch · Português · العربية · Русский

## 部署

推荐部署平台：Vercel、腾讯云 EdgeOne Pages

构建命令：`npm run build`
输出目录：`.next`

## 许可证

© 2026 HanziMaster 汉字大师 v3.0.0
