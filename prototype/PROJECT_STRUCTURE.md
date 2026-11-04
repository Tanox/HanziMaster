# 项目结构说明（归档）

> 文档版本：v5.2.34（与项目版本同步，权威版本见 `package.json`）
>
> **归档说明**：本文保留原型目录的结构说明与历史导航，属于归档层文档。**当前权威**是 [docs/index.md](../docs/index.md)（文档分层与单一职责矩阵）、[docs/01-overview.md](../docs/01-overview.md) §6（完整目录树）与 [docs/coding-standards.md](../docs/coding-standards.md) §4（目录组织规则）。三者与本文冲突时以权威文档为准。

## 当前目录结构

```
HanziMaster/
├── src/                          # 应用源码（75 个 TS/TSX/CSS 文件）
│   ├── app/                      # App Router：page / learn / practice / layout
│   │   ├── error.tsx / loading.tsx / not-found.tsx
│   │   ├── globals.css           # 语义 design token（@theme）
│   │   └── styles/               # utilities.css / keyframes.css
│   ├── components/               # ui/ learn/ practice/ state/ + 跨页面组件
│   │   ├── ui/                   # button / badge / dialog / tooltip（4 个）
│   │   └── state/                # state-views.tsx（EmptyState / ErrorState / LoadingSpinner）
│   ├── hooks/                    # use-progress / use-pronunciation / use-haptic /
│   │                             # use-scroll-reveal / use-swipe-close + __tests__/
│   └── lib/                      # characters* / stroke-order-data / progress-utils /
│                                 # storage / utils / version + __tests__/
│       └── i18n/                 # index.ts / translate.ts / translations/（11 语言）
├── docs/                         # 规范文档 16 篇（见 docs/index.md）
│   ├── 01 ~ 07                   # 概述 / 架构 / 开发 / API / 部署 / 测试 / 设计系统
│   ├── coding-standards.md       # 编码规范（权威）
│   ├── commit-template.md        # 提交规范（权威）
│   ├── git-workflow.md           # 分支 / PR / 审查 / 发版（权威）
│   ├── index.md · AGENTS.md · project.md
│   ├── alignment-checklist.md    # 对齐现状
│   └── tasks.md · tasks-done.md  # 任务清单与归档
├── prototype/                    # 6 个 HTML 骨架 + styles/（11）+ scripts/（11）
│   ├── prototype.html            # 唯一权威高保真原型
│   ├── wireframes.html           # 线框、状态可视化与断点指示器
│   ├── learn.html / practice.html / progress.html / character-detail.html
│   └── DESIGN_SPEC.md            # 原型交付侧细化规范
├── scripts/                      # run-tests.mjs / check-line-count.mjs
├── reports/                      # 脚本产物（gitignore，不提交）
├── .github/                      # PR / Issue 模板、SECURITY、SUPPORT 等
├── .trae/                        # 编辑器协作规则与命令
├── package.json                  # 依赖、脚本、版本唯一权威源
├── pnpm-lock.yaml / pnpm-workspace.yaml
├── next.config.mjs               # CSP 与安全响应头、版本 / build 注入
├── tsconfig.json / eslint.config.js / vitest.config.ts / vitest.setup.ts
├── tailwind.config.ts / postcss.config.js / components.json
├── vercel.json / edgeone.json
├── .npmrc / .nvmrc / .prettierrc.json / .prettierignore
├── README.md / README_EN.md / CONTRIBUTING.md / CONTRIBUTING_EN.md
├── CHANGELOG.md / metadata.json / HanziMaster.code-workspace
└── (无 VERSION、无 .env.example、无 .gitmessage、无 .github/workflows)
```

## 目录整理原则

1. 按职责分层：`src/` 源码、`docs/` 规范、`prototype/` 原型、`scripts/` 工具、`reports/` 产物、根目录配置与入口文档。
2. 避免冗余：一类规则只在一个权威文档定义；任务只在 `docs/tasks.md` 维护；不在仓库根放一次性脚本或产物。
3. 源码单文件 ≤ 200 行，超限按职责拆分；**文档不拆分**。
4. 命名约定以 [docs/coding-standards.md](../docs/coding-standards.md) §5 为准。

## 核心文档导航

| 目的 | 文档 |
|------|------|
| 文档分层与术语约定 | [docs/index.md](../docs/index.md) |
| 项目概述与完整目录树 | [docs/01-overview.md](../docs/01-overview.md) |
| 开发环境与命令 | [docs/03-development.md](../docs/03-development.md) |
| 编码规范 / 提交规范 / Git 流程 | [coding-standards.md](../docs/coding-standards.md) · [commit-template.md](../docs/commit-template.md) · [git-workflow.md](../docs/git-workflow.md) |
| 组件 API | [docs/04-api-reference.md](../docs/04-api-reference.md) |
| 设计系统与原型 | [docs/07-design-prototype.md](../docs/07-design-prototype.md) · [DESIGN_SPEC.md](DESIGN_SPEC.md) · [prototype.html](prototype.html) |
| 对齐现状 | [docs/alignment-checklist.md](../docs/alignment-checklist.md) |
| 任务清单 | [docs/tasks.md](../docs/tasks.md) |
| 历史归档 | [UI_UX_REVIEW.md](UI_UX_REVIEW.md) · [OPTIMIZATION_SUMMARY.md](OPTIMIZATION_SUMMARY.md) · [CHANGELOG.md](../CHANGELOG.md) |

## 文档统计（v5.2.34 实算）

| 类别 | 数量 |
|------|------|
| `docs/` 规范文档 | 16 篇 |
| `prototype/` 说明文档 | 4 篇 |
| `src/` TS / TSX / CSS 文件 | 75 个 |
| 原型 HTML / CSS / JS | 6 / 11 / 11 个 |
| 翻译文件（语言） | 11 个 |
| 测试文件 / 用例 | 9 / 47（以 `pnpm test` 输出为准） |

> 数字型统计随开发变化，引用前请实算；不要凭历史快照填写。

## 维护指南

- 结构或规范变更时先改 `docs/` 权威文档，再同步本文；本文只保留结构说明与导航。
- 版本戳、术语与格式约定见 [docs/index.md](../docs/index.md) §4 / §5；版本同步清单见 [docs/coding-standards.md](../docs/coding-standards.md) §3。
- 历史记录（`CHANGELOG.md` 旧条目、`openspec/` 路径、旧版本号）按「历史记录不篡改」保留，不批量替换。

---

**最后更新：** 2026-11-04（v5.2.34）
**维护者：** HanziMaster 开发团队
