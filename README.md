# HanziMaster 汉字大师 v5.2.23

[English](README_EN.md) | [简体中文](README.md)

一款汉字学习应用，通过引导式练习、笔顺展示与沉浸式复习帮助你掌握汉字书写。

## 主要功能

- **笔顺与结构反馈** - 清晰的笔画顺序指引与结构提示，帮助你写出规范美观的汉字
- **多种学习模式** - 基础学习、书写练习、拼音测验、学习进度追踪
- **田字格书写练习** - Canvas 手写绘制，支持触摸屏和鼠标，带实时发音播放
- **拼音测验** - 4 选 1 拼音测试，实时正确/错误统计，准确率分析
- **个性化进度** - 书写/测验结果自动持久化，连续学习天数、准确率、周活动可视化统计
- **11 种语言** - 简体中文、繁体中文、英语、日语、韩语等
- **深色模式** - 支持跟随系统或手动切换
- **东方水墨·朱砂红设计系统** - 统一使用 ink/vermilion/indigo 色阶，单一 token 来源
- **移动端适配** - 完美支持手机和平板

## 快速开始

### 环境要求

| 工具 | 版本要求 | 说明 |
|------|---------|------|
| Node.js | >= 24.11.0 | 运行时环境 |
| 包管理器 | pnpm | 强制（`preinstall` 钩子拦截 npm/yarn，仅允许 pnpm） |
| 现代浏览器 | Chrome、Firefox、Safari、Edge 最新版 | 开发与测试 |

### 安装

```bash
# 克隆项目
git clone <仓库地址>
cd HanziMaster

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

访问 `http://localhost:3000` 即可使用。

### 生产构建

```bash
pnpm build
pnpm start
```

构建产物位于 `.next` 目录，默认端口 3000。

### 常用脚本

| 命令 | 说明 |
|------|------|
| `pnpm dev` | 启动开发服务器（含 HMR） |
| `pnpm build` | 构建生产版本 |
| `pnpm start` | 启动生产服务器 |
| `pnpm lint` | 运行 ESLint 检查 |
| `pnpm test` | 运行单元测试（Vitest） |
| `pnpm test:watch` | 监听模式运行测试 |
| `pnpm format` | Prettier 格式化 `src/**` |

> 本项目强制使用 pnpm：执行 `npm install` / `yarn` 会被 `preinstall` 钩子（`only-allow pnpm`）拦截报错。根目录 `.npmrc` 已设 `engine-strict` 与 `package-manager-strict`。

## 项目结构

```
src/
├── app/                  # Next.js App Router
│   ├── globals.css       # 全局样式 + 东方水墨·朱砂红 design tokens
│   ├── layout.tsx        # 根布局（导航、主题、i18n）
│   ├── page.tsx          # 首页
│   ├── learn/page.tsx    # 学习页
│   └── practice/page.tsx # 练习页
├── components/           # React 组件
│   ├── theme-provider.tsx / theme-toggle.tsx
│   ├── locale-provider.tsx / locale-toggle.tsx   # i18n 上下文 + 切换器
│   ├── layout-client.tsx / nav-link.tsx / mobile-nav.tsx
│   ├── learn/            # character-grid / character-detail / quiz-dialog
│   ├── practice/         # writing-dialog / writing-canvas / quiz-dialog / weekly-progress / practice-options / practice-assets
│   ├── ui/               # shadcn 风格基础组件（button、dialog、tooltip、badge）
│   └── feature-card.tsx / stats-card.tsx / toast.tsx
├── hooks/                # use-progress / use-pronunciation / use-scroll-reveal
├── lib/                  # characters / character-types / storage / utils / i18n（index + translations/）
└── proxy.ts              # 基于 Nonce 的 Content Security Policy 中间件
```

## 页面介绍

| 页面 | 地址 | 说明 |
|------|------|------|
| 首页 | `/` | 了解应用功能，开始学习 |
| 学习 | `/learn` | 选择汉字学习，学习发音和书写，支持发音播放 |
| 练习 | `/practice` | 三种练习模式：书写练习、拼音测验、学习进度（已接通真实统计：连胜/准确率/周活动） |

## 技术栈

- **框架**: Next.js 16 (App Router)
- **UI 库**: React 19
- **样式**: Tailwind CSS 4.0 + 东方水墨·朱砂红设计系统
- **字体**: Space Grotesk, Playfair Display, Noto Serif SC, JetBrains Mono
- **国际化**: 自定义 i18n 上下文（11 种语言）

## 开发指南

### 代码规范

- 使用 TypeScript strict 模式
- 客户端组件使用 `'use client'` 指令
- 所有用户可见文本必须使用 i18n 翻译
- 遵循 Tailwind CSS 4.0 最佳实践

### 提交规范

基于 Angular 提交规范：

```
<type>: <description>

[可选正文]

[可选页脚]
```

类型：`feat` | `fix` | `docs` | `style` | `refactor` | `perf` | `test` | `build` | `ci` | `chore`

## 支持的语言

简体中文 · 繁體中文 · English · 日本語 · 한국어 · Español · Français · Deutsch · Português · العربية · Русский

## 部署

### Vercel

1. 连接 GitHub 仓库
2. 配置环境变量
3. 自动部署

### 腾讯云 EdgeOne Pages

1. 登录 EdgeOne Pages 控制台
2. 导入项目
3. 构建命令：`pnpm build`
4. 输出目录：`.next`

## 许可证

© 2026 HanziMaster 汉字大师 v5.2.23
