# 项目概述

> 文档版本：v5.2.34（与项目版本同步，权威版本见 `package.json`）

## 1. 基本信息

| 项目属性 | 值 |
|---------|-----|
| 项目名称 | HanziMaster 汉字大师 |
| 当前版本 | v5.2.34（权威源 `package.json` 的 `version`） |
| 项目类型 | 汉字学习 Web 应用（纯前端，本地优先） |
| 主要语言 | TypeScript（strict） |
| 应用框架 | Next.js 16 App Router + React 19 |
| Node.js | `>= 24.11.0`（`.nvmrc` 锁定 `24.11.0`） |
| 包管理器 | pnpm `>= 11`（`packageManager: pnpm@11.24.0`，强制） |
| 部署平台 | Vercel / 腾讯云 EdgeOne Pages |
| 规范文档 | `docs/`（入口 [index.md](index.md)） |

## 2. 项目简介

HanziMaster 汉字大师通过引导式练习、笔顺展示与结构提示帮助用户掌握汉字书写，提供基础学习、田字格书写练习、拼音测验与学习进度追踪；界面支持深色/浅色模式、11 种语言与移动端适配。所有进度数据保存在浏览器 localStorage，无用户账户体系、无后端 API、无 AI 服务依赖。

## 3. 目标与范围

**目标**：提供个性化、引导式的汉字学习体验；用东方水墨·朱砂红设计系统打造一致、响应式、可访问的界面；以类型安全与 11 语言一致的多语言支持降低维护成本。

**目标用户**：中文学习者（入门到进阶）、需要练习汉字书写的用户、对汉字笔顺与结构感兴趣的用户。

**包含**：笔顺与结构反馈、汉字学习、Canvas 书写练习、拼音测验、进度统计、主题切换、11 语言国际化、响应式设计、安全响应头。

**不包含**：用户账户与云端同步、社交功能、在线课程购买、服务端数据存储、AI 生成式能力（原型与应用文案中残留的历史键名不代表存在 AI 后端）。

## 4. 核心功能

| 模块 | 说明 | 主要实现 |
|------|------|---------|
| 笔顺与结构反馈 | 笔画顺序指引与结构提示 | `src/lib/stroke-order-data.ts`、`src/components/learn/stroke-order-demo.tsx` |
| 汉字学习 | 12 个基础汉字、词条/例句/发音、键盘切换 | `src/lib/characters*.ts`、`src/components/learn/` |
| 田字格书写 | Canvas 手写，支持鼠标/触控/触控笔，带发音播放 | `src/components/practice/writing-canvas*.tsx` |
| 拼音测验 | 4 选 1，实时正确/错误统计与准确率 | `src/components/practice/quiz-dialog.tsx`、`src/components/learn/quiz-dialog.tsx` |
| 学习进度 | 连胜天数、准确率、周活动，本地持久化 | `src/hooks/use-progress.ts`、`src/lib/progress-utils.ts` |
| 主题 | 深色 / 浅色 / 跟随系统，偏好持久化 | `src/components/theme-provider.tsx`、`src/components/theme-toggle.tsx` |
| 国际化 | 11 语言切换，浏览器语言检测，类型安全键 | `src/lib/i18n/`、`src/components/locale-provider.tsx` |
| 状态视图 | 空 / 错误 / 加载态与路由错误边界 | `src/components/state/state-views.tsx`、`src/app/error.tsx` 等 |

## 5. 技术栈（与 `package.json` 一致）

| 分类 | 技术 | 声明版本 | 用途 |
|------|------|---------|------|
| 框架 | Next.js | `16.4.4` | App Router、构建、安全响应头、字体加载 |
| UI | React / React DOM | `^19.1.0` | 组件与 RSC |
| 语言 | TypeScript | `^5.7.3` | 类型系统（strict） |
| 样式 | Tailwind CSS | `^4.0.12` | 原子化样式 |
| 样式编译 | `@tailwindcss/postcss` / PostCSS | `^4.2.11` / `8.5.15` | 构建链 |
| 设计令牌 | `globals.css @theme` + `tailwind.config.ts` | — | 语义 token 与扩展色阶（双重来源，职责不同） |
| 组件原语 | `radix-ui ^1.5.0` / `shadcn ^4.11.0`（dev） / `lucide-react ^0.544.0` | — | 基础组件、图标 |
| 样式工具 | `clsx` / `tailwind-merge` / `class-variance-authority` / `tw-animate-css` | — | 类名合并与变体 |
| 国际化 | 自定义 i18n Context | — | 11 语言，`TranslationKey` 联合类型 |
| 测试 | Vitest `^3.2.4` + jsdom `^30.1.3` + Testing Library `^16.3.3` | — | 9 文件 / 47 用例 |
| Lint | ESLint `^9.39.4` + `@typescript-eslint ^8.60.0` + Next 插件 | — | flat config |
| 格式化 | `.prettierrc.json`（配置存在） | — | `format` 脚本存在，但 `prettier` **尚未声明为依赖**，暂不可用 |
| 字体 | `next/font/google` | — | Space Grotesk / Playfair Display / Noto Serif SC / JetBrains Mono |

版本信息的唯一权威源是 `package.json`；本表在依赖变更时同步，勿按记忆填写。运行期版本展示链路见 [03-development.md](03-development.md) §4。

## 6. 仓库目录结构

```
HanziMaster/
├── src/                            # 应用源码
│   ├── app/                        # App Router：page / learn / practice / layout
│   │   ├── error.tsx / loading.tsx / not-found.tsx
│   │   ├── globals.css             # 语义 design token（@theme）
│   │   └── styles/                 # utilities.css / keyframes.css
│   ├── components/                 # ui/ learn/ practice/ state/ 与跨页面组件
│   ├── hooks/                      # use-progress / use-pronunciation / use-haptic …
│   └── lib/                        # characters / storage / utils / version / progress-utils
│       ├── i18n/                   # index.ts / translate.ts / translations/*.ts（11 语言）
│       └── __tests__/              # 纯逻辑单测
├── docs/                           # 规范文档 16 篇（见 docs/index.md）
├── prototype/                      # 6 个 HTML 骨架 + styles/ + scripts/ + 4 篇文档
├── scripts/                        # run-tests.mjs / check-line-count.mjs
├── reports/                        # 脚本产物（gitignore，不提交）
├── .github/                        # PR 模板、Issue 模板、SECURITY / SUPPORT 等社区文件
├── .trae/                          # 编辑器协作规则与命令
├── package.json                    # 依赖、脚本、版本唯一权威源
├── pnpm-lock.yaml / pnpm-workspace.yaml
├── metadata.json                   # 项目展示元数据（版本需同步）
├── next.config.mjs                 # CSP 与安全响应头、版本/build 注入
├── tsconfig.json / eslint.config.js / vitest.config.ts / vitest.setup.ts
├── tailwind.config.ts / postcss.config.js / components.json
├── vercel.json / edgeone.json      # 部署平台配置
├── .npmrc / .nvmrc / .prettierrc.json / .prettierignore
├── README.md / README_EN.md / CONTRIBUTING.md / CONTRIBUTING_EN.md
├── CHANGELOG.md / HanziMaster.code-workspace
└── (无 VERSION 文件、无 .env.example、无 .gitmessage、无 .github/workflows)
```

> `.env.local` 若存在属于本地可选文件且被忽略；仓库中不存在 `.env.example`，因为运行应用不需要环境变量。原型与归档文档目录说明见 `prototype/PROJECT_STRUCTURE.md`（归档性质，以本文与 [index.md](index.md) 为准）。

## 7. 环境变量

| 变量 | 说明 | 必填 |
|------|------|------|
| （无） | 应用无需任何环境变量；版本与 build 编号由 `next.config.mjs` 构建时注入 `NEXT_PUBLIC_APP_VERSION` / `NEXT_PUBLIC_BUILD_ID` | 否 |

## 8. 相关文档

- [文档中心与术语约定](index.md)
- [技术架构](02-architecture.md)
- [开发指南](03-development.md)
- [API 参考](04-api-reference.md)
- [编码规范](coding-standards.md)
- [部署指南](05-deployment.md)
