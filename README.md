# HanziMaster 汉字大师 v5.2.34

[English](README_EN.md) | [简体中文](README.md)

一款汉字学习应用，通过引导式练习、笔顺展示与沉浸式复习帮助你掌握汉字书写。纯前端、本地优先：进度保存在浏览器 localStorage，无账户、无后端 API。

## 主要功能

- **笔顺与结构反馈** — 笔画顺序指引与结构提示
- **多种学习模式** — 基础学习、书写练习、拼音测验、进度追踪
- **田字格书写练习** — Canvas 手写，支持鼠标/触控/触控笔，带发音播放
- **拼音测验** — 4 选 1，实时正确/错误统计与准确率分析
- **个性化进度** — 结果自动持久化，连胜天数、准确率、周活动可视化
- **11 种语言** — 简中、繁中、英、日、韩、西、法、德、葡、阿、俄
- **深色模式** — 跟随系统或手动切换（浅色 / 深色 / 系统）
- **东方水墨·朱砂红设计系统** — ink / vermilion / indigo 色阶，token 双重来源
- **移动端适配** — 手机与平板完整支持

## 快速开始

### 环境要求

| 工具 | 要求 | 说明 |
|------|------|------|
| Node.js | `>= 24.11.0` | `.nvmrc` 锁定 `24.11.0` |
| 包管理器 | pnpm `>= 11` | 强制（`preinstall: npx only-allow pnpm`、`.npmrc`） |
| 浏览器 | Chrome / Firefox / Safari / Edge 最新版 | 开发与测试 |

### 安装与启动

```bash
git clone <仓库地址>
cd HanziMaster
pnpm install
pnpm dev
```

访问 `http://localhost:3000`。生产构建：

```bash
pnpm build
pnpm start
```

### 常用脚本

| 命令 | 说明 |
|------|------|
| `pnpm dev` | 开发服务器（HMR） |
| `pnpm build` | 生产构建 |
| `pnpm start` | 生产服务器（默认端口 3000） |
| `pnpm lint` | ESLint 检查（`eslint .`） |
| `pnpm lint:fix` | ESLint 自动修复 |
| `pnpm test` | 单元测试（Vitest） |
| `pnpm test:watch` | 监听模式 |
| `pnpm test:run` | 测试包装器（产物落 `reports/`，透传 `--coverage`） |
| `pnpm check:lines` | 源文件行数门禁（≤ 200 行） |
| `pnpm format` | Prettier 格式化；**当前 `prettier` 未声明为依赖，暂不可用** |
| `pnpm security:audit` | 生产依赖审计（`pnpm audit --prod --audit-level=high`） |
| `pnpm security:audit:dev` | 全量审计（含 dev 链） |

类型检查用 `pnpm exec tsc --noEmit`。本机若遇 `ERR_PNPM_IGNORED_BUILDS`，见 [docs/coding-standards.md](docs/coding-standards.md) §11 的 Node 直跑等价命令。

> 项目强制 pnpm：`npm install` / `yarn` 会被 `preinstall` 钩子拦截；仓库只有 `pnpm-lock.yaml`。

## 项目结构

```
src/
├── app/                     # App Router：page / learn / practice / layout
│   ├── error.tsx / loading.tsx / not-found.tsx
│   ├── globals.css          # 语义 design token（@theme）
│   └── styles/              # utilities.css / keyframes.css
├── components/              # ui/ learn/ practice/ state/ 与跨页面组件
│   ├── ui/                  # button / badge / dialog / tooltip
│   ├── learn/ · practice/   # 页面业务子组件
│   └── state/               # EmptyState / ErrorState / LoadingSpinner
├── hooks/                   # use-progress / use-pronunciation / use-haptic …
└── lib/                     # characters / storage / utils / version / progress-utils
    ├── i18n/                # index + translate + 11 语言 translations/
    └── __tests__/           # 纯逻辑单测

prototype/                   # 6 个 HTML 骨架 + styles/ + scripts/（源码均 ≤200 行）
docs/                        # 规范文档 16 篇（入口 docs/index.md）
scripts/                     # run-tests.mjs / check-line-count.mjs
reports/                     # 脚本产物（gitignore，不提交）
```

CSP 与安全响应头由 `next.config.mjs` 的 `headers()` 统一注入；项目无中间件。完整目录树见 [docs/01-overview.md](docs/01-overview.md) §6。

## 版本与构建标识

版本号唯一权威源是 `package.json` 的 `version`。`next.config.mjs` 在 dev / build 时读取并注入 `NEXT_PUBLIC_APP_VERSION` 与构建时刻的 `NEXT_PUBLIC_BUILD_ID`（`yyyymmddhhmm`），`src/lib/version.ts` 统一暴露。页脚 `#site-footer` / `#footer-version` 与移动抽屉 `#drawer-version` 展示 `vX.Y.Z · build yyyymmddhhmm`；11 语言 `footer.copyright` 使用 `{{versionLabel}}` 插值，发版无需改动翻译文件。详见 [docs/03-development.md](docs/03-development.md) §4。

## 页面介绍

| 页面 | 地址 | 说明 |
|------|------|------|
| 首页 | `/` | 功能介绍、永字八法演示 |
| 学习 | `/learn` | 12 个基础汉字、发音、笔顺、测验、键盘切换 |
| 练习 | `/practice` | 书写练习、拼音测验、真实进度统计 |

## 技术栈

| 分类 | 技术 |
|------|------|
| 框架 | Next.js `16.4.4`（App Router）+ React `^19.1.0` |
| 语言 | TypeScript `^5.7.3`（strict） |
| 样式 | Tailwind CSS `^4.0.12` + `@tailwindcss/postcss ^4.2.11` |
| 组件 | shadcn / radix-ui 原语、lucide-react 图标 |
| 字体 | Space Grotesk / Playfair Display / Noto Serif SC / JetBrains Mono（`next/font/google`） |
| 国际化 | 自定义 i18n Context，11 语言，`TranslationKey` 类型约束 |
| 测试 | Vitest `^3.2.4` + jsdom + Testing Library（9 文件 / 47 用例） |
| 部署 | Vercel / 腾讯云 EdgeOne Pages |

## 开发规范

以下文档是规则的唯一权威，本文不重复定义：

| 主题 | 文档 |
|------|------|
| 文档中心、术语与格式约定 | [docs/index.md](docs/index.md) |
| 编码风格、命名、目录组织、i18n、设计 token、版本同步、质量门禁 | [docs/coding-standards.md](docs/coding-standards.md) |
| 提交信息格式与类型 | [docs/commit-template.md](docs/commit-template.md) |
| 分支管理、PR、代码审查、发版 | [docs/git-workflow.md](docs/git-workflow.md) |
| 开发环境与命令 | [docs/03-development.md](docs/03-development.md) |
| 测试规范 | [docs/06-testing.md](docs/06-testing.md) |
| 贡献入口 | [CONTRIBUTING.md](CONTRIBUTING.md) |
| 任务清单（唯一来源） | [docs/tasks.md](docs/tasks.md) |

提交信息采用 Conventional Commits：`<type>: <description>`，type ∈ `feat` / `fix` / `docs` / `style` / `refactor` / `perf` / `test` / `build` / `ci` / `chore`；每次改动至少 bump 一次 patch 版本。

## 支持的语言

简体中文 · 繁體中文 · English · 日本語 · 한국어 · Español · Français · Deutsch · Português · العربية · Русский

## 部署

应用**无需环境变量**；`vercel.json` / `edgeone.json` 仅配置静态资源缓存与 EdgeOne 构建命令。Vercel 使用默认 Next.js 流程；EdgeOne 构建命令 `pnpm build`（平台配置文件内为 `npm run build`，属平台内部写法），输出目录 `.next`。部署前检查清单见 [docs/05-deployment.md](docs/05-deployment.md) §6。

> `next/font/google` 是唯一联网构建依赖，离线环境构建可能因字体下载失败，属环境限制。

## 许可证

© 2026 HanziMaster 汉字大师 v5.2.34
