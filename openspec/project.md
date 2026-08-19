# Project Context

## Purpose

HanziMaster 汉字大师是一个现代化的汉字学习平台，通过引导式练习、笔顺展示与结构提示，帮助用户高效掌握汉字书写。支持 11 种语言国际化、深色/浅色模式与响应式设计。

## Tech Stack

- **框架**: Next.js 16 (App Router) + React 19 + TypeScript 5.7（strict 模式）
- **样式**: Tailwind CSS 4.0 + 东方水墨·朱砂红设计系统（单一 token 来源 `globals.css @theme`）
- **字体**: Space Grotesk / Playfair Display / Noto Serif SC / JetBrains Mono（经 next/font/google）
- **组件**: shadcn/ui（radix-nova preset）基础原语，改造为 ink/vermilion 设计语言
- **国际化**: 自定义 LocaleProvider 上下文，11 种语言，`t()` 受 `TranslationKey` 点分联合类型约束
- **部署**: Vercel / 腾讯云 EdgeOne Pages

## Project Conventions

### Code Style

- 源文件单文件 ≤ 200 行，超限按职责拆分（UI 组件、hooks、工具函数、常量分别成文件）。
- 客户端组件使用 `'use client'` 指令；服务端组件默认无标记。
- 所有用户可见文本必须通过 i18n `t()` 翻译。
- 主要容器/区块加语义化 id（kebab-case），便于调试、无障碍与测试定位。
- 设计令牌单一来源 `globals.css @theme`；禁止内联色值、`rounded-[Npx]` 任意值、`transition-all`。

### Architecture Patterns

- App Router 路由（`src/app/`），页面组件拆分为 `src/app/<page>/` 与 `src/components/` 子模块。
- 状态管理采用 React Context（LocaleProvider / ThemeProvider）+ localStorage 持久化。
- 进度系统：`useProgress` 接收真实数据（markLearned / recordQuizResult），无硬编码假数据。

### Testing Strategy

- 当前尚未接入自动化测试框架（`package.json` 无 test 脚本、无 Jest/Vitest 依赖）。目标规范见 `06-testing.md` §10 蓝图。
- 质量门禁以 `tsc --noEmit` 为准（权威类型验证，勿用 `npx tsc`）。

### Git Workflow

- 提交格式 `<type>: <description>`，type ∈ feat/fix/docs/style/refactor/perf/test/build/ci/chore。
- 分支：main / dev / feature|fix|hotfix|bugfix|release/*。
- 每次修改 bump 最小版本号（patch 至少 +1），仅更新被改文件头注释与全局单一来源版本位。

## Domain Context

- 设计系统为东方水墨·朱砂红：主色朱砂红 `#c53d43`（vermilion-500）、辅助色靛蓝 `#4f46e5`（indigo-500）、水墨灰 ink 色阶。
- 应用无 AI 后端，无 Gemini 依赖（已移除）；「笔顺指引 / 结构提示 / 引导式练习」为真实能力描述。
- 11 种语言：en, zh-CN, zh-TW, es, ar, fr, pt-BR, de, ja, ko, ru。

## Important Constraints

- 无外部服务依赖，无需环境变量即可运行（离线可构建需处理 next/font/google 联网字体）。
- `next build` 在离线环境会因字体下载失败，属环境限制而非代码缺陷。

## External Dependencies

- 无第三方 API；仅 Google Fonts（next/font/google）为联网资源。
- 部署平台 Vercel / 腾讯云 EdgeOne Pages。
