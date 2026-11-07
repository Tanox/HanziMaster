# 对齐检查清单

> 文档版本：v5.2.43（与项目版本同步，权威版本见 `package.json`）
> 基线日期：2026-11-07

本文记录**当前**规范文档、原型与代码实现的对齐状态。它是状态报告，**不是任务清单**：所有待办只在 [tasks.md](tasks.md) 维护。历史版本本文曾包含「113 项 100% 对齐」的快照与 24 个 UI 组件的统计，与代码不符，已整体替换；历史叙述保留在 `CHANGELOG.md` 中，不回改。

权威来源：编码/版本/门禁 → [coding-standards.md](coding-standards.md)；提交 → [commit-template.md](commit-template.md)；分支与审查 → [git-workflow.md](git-workflow.md)；设计系统 → [07-design-prototype.md](07-design-prototype.md)；高保真原型 → `prototype/prototype.html`。

## 1. 对齐基线

| 领域 | 权威文档 | 代码实现 | 状态 |
|------|---------|---------|------|
| 项目定位 / 技术栈 | `01-overview.md` | `package.json` / `src/` | 已对齐（依赖表含 Radix 按需子包与 Sentry） |
| 架构分层 | `02-architecture.md` | `src/app/` + `src/components/` + `src/lib/` | 已对齐（3 页面均为 Client Component，根布局 Server；法律页与 `/api/health` 为 Server） |
| 环境与命令 | `03-development.md` | `package.json` scripts / `scripts/`（7 个） | 已对齐（命令表与 21 条 scripts 一一对应） |
| 组件 API | `04-api-reference.md` | `src/components/` / `src/lib/` | 已对齐（签名按源码重写，含 `/api/health`） |
| 部署 | `05-deployment.md` | `vercel.json` / `edgeone.json` / `next.config.mjs` / workflows | 已对齐（CI 工作流一览 + 自动发布规则；`release.yml` 规划中） |
| 测试 | `06-testing.md` | `vitest.config.ts` / `vitest.setup.ts` / `playwright.config.ts` / 24 个单测 + 2 个 e2e | 已对齐（覆盖率阈值 80/70/80/80 已生效） |
| 编码规范 | `coding-standards.md` | `tsconfig.json` / `eslint.config.js` / `.prettierrc.json` | 已对齐（单一权威） |
| 提交规范 | `commit-template.md` | `CONTRIBUTING*` / `.trae/rules/` / PR 模板 | 已对齐（10 类 type 与版本标注） |
| Git 流程 | `git-workflow.md` | `.github/PULL_REQUEST_TEMPLATE.md` | 已对齐（新增分支与审查流程） |
| 设计系统 | `07-design-prototype.md` | `globals.css @theme` / `styles/theme-colors.css` | 已对齐（组件清单按真实 4 个原语修正） |
| 任务状态 | `tasks.md` / `tasks-done.md` | — | 单一来源，不在本文重复 |

## 2. 页面与组件

| 路由 / 分组 | 实际文件 | 备注 |
|------------|---------|------|
| `/` | `src/app/page.tsx` | Client |
| `/learn` | `src/app/learn/page.tsx` | Client |
| `/practice` | `src/app/practice/page.tsx` | Client |
| 路由态 | `error.tsx` / `loading.tsx` / `not-found.tsx` | 配合 `state/state-views.tsx` |
| 根布局 | `src/app/layout.tsx` | Server；字体、Metadata、Providers、GA |
| 基础原语 | `src/components/ui/{button,badge,dialog,tooltip}.tsx` | **共 4 个**，非历史文档的 24 个 |
| 业务组件 | `learn/` `practice/` `state/` 及跨页面组件 | `EmptyState` / `ErrorState` / `LoadingSpinner` 在 `state/state-views.tsx`，不存在 `empty-state.tsx` |
| 语义化 id | `site-header` / `site-footer` / `main-content` / `footer-version` / `drawer-version` / `learn-quiz-dialog` / `practice-quiz-dialog` | 列表渲染无重复静态 id |

## 3. 国际化

- 11 语言包：`en, zh-CN, zh-TW, es, ar, fr, pt-BR, de, ja, ko, ru`（`src/lib/i18n/translations/`）。
- `en.ts` 顶层 6 个键域：`common` / `home` / `learn` / `practice` / `footer` / `meta`；`i18n.test.ts` 校验 11 语言叶子键一致。
- `t()` 的 key 为 `TranslationKey` 点分联合类型；插值 `{{name}}` 由 `translate.ts` 处理。
- `footer.copyright` 用 `{{versionLabel}}`；**不存在 `common.appVersion`**，文档与代码均无此键。
- `home` 域的历史 `ai*` / `etymology*` / `adaptive*` 键仍被首页引用，只是文案键，不代表存在 AI 后端。

## 4. 设计系统

| 项 | 权威来源 | 实际值 |
|----|---------|--------|
| 语义 token | `src/app/globals.css` `@theme` | `--color-primary: #c53d43`、`--color-accent: #4f46e5`、`--color-ring: #c53d43` 等 |
| 扩展色阶 / 字体 / 动画 | `styles/theme-colors.css` + `styles/utilities.css` | ink 11 阶、vermilion 9 阶、indigo 10 阶、状态色与阴影；动画工具类在 utilities.css |
| 字体 | `next/font/google` | Space Grotesk / Playfair Display / Noto Serif SC / JetBrains Mono |
| 深色模式 | `ThemeProvider` → `.dark` | `@custom-variant dark (&:is(.dark *))` |
| 组件约束 | `coding-standards.md` §8 | 禁止硬编码色值、`rounded-[Npx]`、`transition-all` |

> 设计令牌是**双重来源、职责不同**，旧文档中的「单一 token 来源」表述已废弃。

## 5. 配置与工具链

| 配置 | 文件 | 现状 |
|------|------|------|
| 版本注入 | `next.config.mjs` | 读 `package.json`，注入 `NEXT_PUBLIC_APP_VERSION` / `NEXT_PUBLIC_BUILD_ID` |
| 安全响应头 | `next.config.mjs` `headers()` | CSP + 6 个安全头，作用于 `/:path*`；**无中间件** |
| 部署 | `vercel.json` / `edgeone.json` | 静态资源缓存；EdgeOne 安装命令先装 pnpm |
| 依赖约束 | `.npmrc` / `pnpm-workspace.yaml` | 强制 pnpm；`onlyBuiltDependencies` 与 `overrides` 在 workspace 文件 |
| 类型 / Lint | `tsconfig.json` / `eslint.config.js` | strict；ESLint 9 flat config |
| 格式化 | `.prettierrc.json` | `prettier ^3.9.10` 已安装，`pnpm format` 可用 |
| 测试 | `vitest.config.ts` / `vitest.setup.ts` / `playwright.config.ts` | jsdom + globals + 内存 Storage 兜底；coverage 阈值 80/70/80/80；Playwright chromium |
| CI | `.github/workflows/` | `ci.yml`（quality / coverage / e2e）+ `deploy.yml`（Vercel，无 Secrets 自动跳过）；`release.yml` 规划中（P1-37） |
| 覆盖率 | `@vitest/coverage-v8@3.2.4` | 已安装，`vitest.config.ts` 含 coverage 段与阈值门禁 |

## 6. 测试

当前 **24 个单测文件**（分布在 `src/lib` / `src/hooks` / `src/components` 的 `__tests__/`）+ **2 个 e2e 测试**（`e2e/home.spec.ts`、`e2e/a11y.spec.ts`）。使用 Vitest + Testing Library + Playwright，不使用 Jest；用例数以 `pnpm test` 输出为准。详见 [06-testing.md](06-testing.md) §2、§6。

## 7. 文档体系

- `docs/` 共 **16 篇**；[index.md](index.md) 的 §2 单一职责矩阵规定「一类规则只在一个文档定义」。
- 文档版本戳格式统一为 `> 文档版本：vX.Y.Z（与项目版本同步，权威版本见 package.json）`；**只更新本次改动的文档**，未改动文档保留旧戳合法。
- 术语、格式与 `npm` 字样豁免规则见 [index.md](index.md) §4 / §6。
- 归档文档 `prototype/UI_UX_REVIEW.md`、`prototype/OPTIMIZATION_SUMMARY.md`、`prototype/PROJECT_STRUCTURE.md` 与 `CHANGELOG.md` 历史条目按「历史记录不篡改」保留原文，不作为当前状态依据。

## 8. 原型

- 6 个 HTML 骨架：`prototype.html`（唯一权威高保真原型）、`wireframes.html`、`learn.html`、`practice.html`、`progress.html`、`character-detail.html`。
- 资源按职责拆到 `prototype/styles/*.css`（11 个）与 `prototype/scripts/*.js`（11 个），单文件均 ≤ 200 行。
- `prototype-fragments.js` / `wireframes-fragments.js` 必须**最先加载**，否则后续脚本引用的 DOM 不存在。
- 原型 ID 全量 kebab-case 语义命名；`aria-labelledby` 等引用零悬空。

## 9. 版本一致性

| 位置 | 值 / 机制 |
|------|----------|
| `package.json` `version` | `5.2.37`（唯一权威源） |
| `metadata.json` | `name` 内版本与 `version` 同步 |
| `README.md` / `README_EN.md` | 标题与页脚同步 |
| `CHANGELOG.md` | 新增 `5.2.34` 小节 |
| `src/lib/version.ts` / `next.config.mjs` | 不硬编码版本号，读注入值 |
| 11 语言 `footer.copyright` | `{{versionLabel}}` 插值，无需改动 |
| 页脚展示 | `#footer-version` 显示 `vX.Y.Z · build yymmddhhmm`（10 位 build 编号）；`#drawer-version` 显示版本号 |

## 10. 已知差异（不在本文跟踪）

以下为**当前实现与理想状态**的差异，进度与验收标准以 [tasks.md](tasks.md) 为准，本文不重复列任务：`release.yml` 自动发布工作流未创建（P1-37）、URL 级 `[locale]` 路由未迁移（P1-7/8/9）、部分历史文案键名仍带 `ai*` 前缀、`tailwind.config.ts` 与 `@theme` 双重来源待收敛（P2-1/P2-18）、EdgeOne 平台安全头透传待验证（P1-32）。

## 11. 维护规则

- 代码行为变更后，同批次更新受影响的权威文档、原型与本文对应表格。
- 本文只写「事实与对齐状态」，不写「待办」「计划」「建议」。
- 不得恢复历史快照中的 100% 对齐统计或虚构组件数量；需要历史数据时查 `CHANGELOG.md`。
- 改动本文时同步版本戳与 `CHANGELOG.md`，并遵守 [coding-standards.md](coding-standards.md) §3 的版本同步清单。
