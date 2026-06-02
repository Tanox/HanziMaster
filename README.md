# HanziMaster 汉字大师 v2.2.0

[English](README_EN.md) | [简体中文](README.md)

汉字大师是一个现代化的、基于人工智能的汉字学习平台。它利用 Gemini AI 提供关于笔画顺序、平衡和美感的个性化反馈。

## 功能

- **AI 驱动的洞察**: 对您的手写进行实时反馈。
- **自适应学习**: 根据您的进度调整个性化学习路径。
- **词源与文化**: 发现汉字背后的故事。
- **响应式设计**: 完美支持桌面端和移动端。
- **深色/浅色模式**: 支持系统检测和持久化主题偏好。
- **中文字体支持**: 使用 Noto Sans SC 优雅显示汉字。
- **国际化 (i18n)**: 支持 11 种语言，包括英语、简体中文、繁体中文、西班牙语、阿拉伯语、法语、葡萄牙语、德语、日语、韩语和俄语。
- **语言切换器**: 便捷的语言切换并支持持久化。

## 技术栈

- **框架**: Next.js 15
- **UI 库**: React 19
- **样式**: Tailwind CSS 4.0
- **AI**: Google Gemini AI
- **字体**: Inter, JetBrains Mono, Noto Sans SC
- **国际化**: 自定义 i18n context，支持 11 种语言

## 开始使用

### 环境要求

- Node.js >= 20.11.0
- npm 或 yarn

### 安装步骤

1. 克隆项目
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. 安装依赖
   ```bash
   npm install
   ```

3. 配置环境变量（可选）
   ```bash
   cp .env.example .env
   # 编辑 .env 文件，填写 GEMINI_API_KEY
   ```

4. 启动开发服务器
   ```bash
   npm run dev
   ```

开发服务器将在 `http://localhost:3000` 启动。

### 生产构建

```bash
npm run build
npm run start
```

## 项目结构

```
src/
├── app/               # Next.js App Router
│   ├── globals.css    # 全局样式
│   ├── layout.tsx     # 根布局（导航、主题、国际化）
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

## 核心页面

### 首页 (/)
- 英雄区域展示应用特色
- 功能特性介绍（AI 洞察、词源文化、自适应学习）
- 响应式设计，支持深色/浅色模式

### 学习页 (/learn)
- 12 个基础汉字学习
- 字符选择与详情展示
- 书写练习和发音功能

### 练习页 (/practice)
- 书写练习模式
- 记忆测验模式
- 学习进度追踪
- 本周学习统计

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

## 环境变量

| 变量名 | 说明 | 必填 | 示例值 |
|--------|------|------|--------|
| `GEMINI_API_KEY` | Google Gemini AI API 密钥 | 否 | `your-api-key-here` |

## 开发指南

### 代码规范

- 使用 TypeScript 严格模式
- 客户端组件使用 `'use client'` 指令
- 所有用户可见文本使用 i18n 翻译
- 遵循 Tailwind CSS 4.0 最佳实践

### 提交规范

基于 Angular 提交规范：

```
<type>: <description>

[optional body]

[optional footer]
```

类型：`feat` | `fix` | `docs` | `style` | `refactor` | `perf` | `test` | `build` | `ci` | `chore`

## 部署

### Vercel 部署

1. 连接 GitHub 仓库
2. 配置环境变量
3. 自动部署

### 腾讯云 EdgeOne Pages

1. 登录 EdgeOne Pages 控制台
2. 导入项目
3. 配置构建命令：`npm run build`
4. 配置输出目录：`.next`

## 许可证

© 2026 HanziMaster 汉字大师. 保留所有权利。
