# Project Context

## Purpose
HanziMaster（汉字大师）是一个基于 AI 的汉字学习平台，帮助用户高效学习汉字书写。利用 AI 技术提供关于笔画顺序、平衡和美感的个性化反馈，支持多语言界面，让全球用户都能轻松学习中文。

## Tech Stack
- **框架**: Next.js 16+ (App Router)
- **语言**: TypeScript 5.7+
- **UI 库**: React 19+, shadcn/ui (radix-nova preset)
- **样式**: Tailwind CSS v4
- **字体**: Inter (UI), Noto Sans SC (汉字), JetBrains Mono (代码)
- **国际化**: 自建 i18n 模块，支持 11 种语言
- **部署**: Vercel / 腾讯云 EdgeOne Pages
- **Node.js**: >= 24.5.0

## Project Conventions

### Code Style
- 使用 TypeScript strict 模式
- 函数/组件使用 PascalCase，变量/属性使用 camelCase
- 常量使用 SCREAMING_SNAKE_CASE
- 文件头注释格式: `// 路径 vX.X.X`
- 使用 `cn()` 合并 Tailwind 类名
- 间距使用 `gap-*`，避免 `space-x-*`
- 等宽等高使用 `size-*`

### Architecture Patterns
- App Router 目录结构，页面放在 `src/app/` 下
- 客户端组件标记 `'use client'`，默认为服务端组件
- 使用 Context API 管理全局状态（主题、语言）
- shadcn/ui 组件放在 `src/components/ui/`，业务组件放在 `src/components/`
- 国际化模块放在 `src/lib/i18n/`

### Testing Strategy
- 使用 Jest + React Testing Library
- 覆盖率目标: 语句 80%，分支 75%，函数 80%，行 80%
- 测试文件与源文件同目录，`.test.tsx` 后缀

### Git Workflow
- 分支命名: `trae/solo-agent-*` 或 `feature/*`
- 提交消息遵循 Conventional Commits
- 标题限制在 72 字符以内
- 格式: `type(scope): description`

## Domain Context
- 汉字学习应用，核心数据为常用汉字（笔画、部首、结构、拼音、释义）
- 支持三种练习模式：书写练习、记忆测验、学习统计
- Canvas API 驱动的书写画布，支持田字格辅助
- 基于艾宾浩斯遗忘曲线的复习提醒

## Important Constraints
- 支持 11 种语言（zh-CN, zh-TW, en, ja, ko, ar, de, es, fr, pt-BR, ru）
- 所有用户可见文本必须通过 i18n 翻译，禁止硬编码
- 支持 light/dark/system 三种主题模式
- 遵循 WCAG 2.1 AA 无障碍标准
- 生产环境使用 nonce-based CSP 安全策略

## External Dependencies
- Google Fonts (Inter, Noto Sans SC, JetBrains Mono)
- @google/generative-ai (Gemini AI，用于书写反馈)
- Radix UI (shadcn/ui 底层组件)
- Tailwind CSS v4
