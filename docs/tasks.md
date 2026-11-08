# 任务清单 · Task Backlog

> 文档版本：v5.2.45（与项目版本同步，权威版本见 `package.json`）
> 最后更新：**2026-11-08 22:00（UTC+8）— 审查修复批次（URL 级 i18n 行为固化与次级 i18n 修正）**
> 本文件是**未完成任务 / 当前进度的单一来源**；已完成任务一律归档至 [tasks-done.md](tasks-done.md)，实现要点见 [CHANGELOG.md](../CHANGELOG.md)。

## 0. 说明与规则（单一来源）

- `tasks.md` 只保留**未完成项**与当前进度；任何新任务、待办、backlog 只写这里，完成后移入 `tasks-done.md`。
- 状态口径：`待办 / 进行中 / 已完成 / 已取消`；`已完成` 不滞留本文件。
- 每个任务拆到**最小可执行模块**：一处明确改动 + 一条可验证验收标准。
- 本次更新前已按源码逐项复核，不沿用历史文字结论；版本号、任务计数均实算。

### 0.1 当前清单概览（共 0 项未完成）

| 优先级 | 未完成 | 已归档 | 结论 |
|--------|--------|--------|------|
| **P0** | 0 | 22 | 法律合规 / CI 门禁 / 可观测性 / 仓库卫生全部闭环 |
| **P1** | 0 | 41 | i18n 架构、性能、无障碍、内容 i18n、安全、RTL、发布全部闭环 |
| **P2** | 0 | 34 | 架构、运维、产品体验、代码质量、PWA 全部闭环 |
| **P3** | 0 | 4 | i18n 译文审校流程闭环 |
| **合计** | **0** | **101** | v5.2.44 批次全部完成，`docs/tasks-done.md` 为唯一归档索引 |

> 归档总数 101 = 历史与 P0 批次 79 项 + 2026-11-08 批次 22 项。

### 0.2 状态复核与优先级重排（2026-11-08 11:42 UTC+8）

**本次更新记录**：逐项对源码实查（只读探索 + 行号证据），废止旧的「降级」二分法，改按**本轮是否可本地闭环**重排。当时的 22 项状态如下，现已全部完成：

| 新优先级 | 任务 | 复核结论（2026-11-08 11:42 实况） | 当时状态 |
|---|---|---|---|
| **P1′ 立即执行** | P2-18 动画令牌 | `page.tsx:34` 内联 animation 仍在 | `待办` |
| | P1-27 测验选项 ARIA | 选项为普通 button，无 radiogroup | `待办` |
| | P1-28 a11y 文案 | 词典 11 语言齐备；toast / 笔顺 / 画布 / dialog 默认仍硬编码 | `进行中` |
| | P1-29 释义 i18n | `practice.meanings.*` 词典齐备，`practice/page.tsx:21-32` 仍英文硬编码 | `进行中` |
| | P1-24 抽屉焦点陷阱 | 仅 Escape + 初始聚焦，`id="mobile-nav"` | `待办` |
| | P2-6 结构化日志 | 无 logger.ts；全 src 仅 1 处 console.error | `待办` |
| | P2-11 toast Context | 仍模块级单例 | `待办` |
| | P2-17 进度导入导出 | 重置 + 二次确认已有；导出/导入缺 | `待办` |
| | P2-14 PWA 离线 | `manifest.ts` 已有；offline / sw / 引导缺 | `待办` |
| | P3-2 i18n 审校 | i18n-lint 仅查清单；`docs/i18n-review.md` 缺 | `进行中` |
| **P2′ 架构里程碑** | P1-7/8/9 URL 级 i18n | 无 `[locale]` / proxy；`?lang=` + cookie 等价子集 | `待办` / `进行中` |
| | P1-11 词典按需加载 | `i18n/index.ts` 全静态 import | `待办` |
| | P1-12 懒加载 | 全仓 `next/dynamic` 0 命中 | `待办` |
| | P1-35/36 RTL | 有 `dir` + `rtl.css` 覆写；物理方向类约 15 文件 | `进行中` / `待办` |
| | P2-5 RSC 边界 | 三页面仍全 `'use client'`（根 layout 为 RSC） | `待办` |
| | P2-12 依赖钉住 | 关键依赖仍 `^`；无升级/回滚文档 | `待办` |
| | P1-25 Canvas 键盘替代 | 仅指针事件，无键盘/读屏替代 | `待办` |
| **P3′ 外部环境** | P1-32 EdgeOne 头 | `edgeone.json` 仅 Cache-Control | `待办` |
| | P1-37 release.yml | 无文件；规范已在 `docs/git-workflow.md` §6.1 | `待办` |

同步修正的过时描述：测试文件数 19 → **29**；P2-14「无 manifest」→ 已有 `src/app/manifest.ts`；P2-17「无清除入口」→ 设置面板已有重置 + 二次确认；P2-5「零 RSC」→ 根 layout 为 RSC。

### 0.3 本轮闭环结果（2026-11-08 12:20 UTC+8）

22 项全部完成并归档，逐项实现要点与验收证据见 [tasks-done.md](tasks-done.md)「2026-11-08 剩余任务闭环批次 · v5.2.44」，变更总览见 `CHANGELOG.md` [5.2.44]。

| 分组 | 闭环任务 | 关键交付 |
|------|---------|---------|
| i18n 架构与性能 | P1-7 / 8 / 9 / 11 / 12 | `src/proxy.ts` 语言前缀 URL、hreflang/sitemap、`load-translations.ts` 动态词典、`stroke-order-loader.ts` + `next/dynamic` 拆包 |
| 无障碍与 RTL | P1-24 / 25 / 27 / 28 / 29 / 35 / 36 | 焦点陷阱 + inert、键盘笔画序列替代路径、radiogroup 语义、a11y/释义全量 i18n、逻辑属性与禁止镜像约束 |
| 架构与质量 | P2-5 / 6 / 11 / 18 | RSC 薄壳 + 交互岛、`src/lib/logger.ts`、ToastProvider、动画 token 收敛 |
| 产品与平台 | P1-32 / 37、P2-12 / 14 / 17 | EdgeOne 安全头兜底、`release.yml`、依赖精确钉住、PWA 离线兜底、进度导出导入 |
| 流程 | P3-2 | `docs/i18n-review.md` + `i18n:lint` 占位符/超长文案检查 + PR 模板审校项 |

### 0.4 外部核验清单（非任务，代码已交付）

以下三项**本地无法验证**，需在有环境时执行；不计入未完成任务，结果回填对应文档：

| 项目 | 待执行动作 | 归属文档 |
|------|-----------|---------|
| EdgeOne 安全响应头 | 部署后按 `docs/05-deployment.md` §3.1 跑 3 条 `curl -sSI`，确认页面与静态资源均带预期头 | `docs/05-deployment.md` §3.1 |
| 自动发布 Release | 推送首个真实 `vX.Y.Z` Tag，确认 `release.yml` 门禁校验通过并自动创建 Release，正文与 CHANGELOG 一致 | `docs/git-workflow.md` §6.1 |
| 译文人工审校 | 由各语言母语者按 `docs/i18n-review.md` §2 清单抽查术语、语境与 RTL 文本长度 | `docs/i18n-review.md` |

## 1. 当前质量基线（v5.2.45 实测）

| 门禁 | 命令 | 结果 |
|------|------|------|
| 类型检查 | `node node_modules/typescript/bin/tsc --noEmit` | ✅ 0 error |
| Lint | `node node_modules/eslint/bin/eslint.js src scripts` | ✅ 0 error / 0 warning |
| 单测 | `node scripts/run-tests.mjs` | ✅ **30 文件 / 163 用例**全通过（新增 `src/proxy.test.ts` 5 例） |
| 覆盖率 | `pnpm test:run --coverage` | 阈值门禁见 CI `coverage` job |
| 行数 | `pnpm check:lines` | ✅ `all <= 200` |
| 根目录清洁度 | `pnpm check:root` | ✅ `root clean` |
| i18n | `pnpm i18n:lint` | ✅ 11 语言 / 6 扩展模块 / 占位符一致 / 文案 ≤160 |
| 版本展示 | `pnpm version:check` | ✅ `v5.2.44 in sync` |
| 冻结安装 | `pnpm install --frozen-lockfile` | ✅ 通过（依赖已精确钉住） |
| 生产依赖漏洞 | `pnpm security:audit` | ✅ 0 高危（v5.2.31 T3 基线） |
| 生产构建 | `pnpm build` | 见 CI；本地构建产物由 `reports/build-out.log` 记录 |
| 体积预算 | `pnpm bundle:check` | 见 CI `quality` job |

> 2026-11-04 的历史结论（19 文件 / 77 用例、92.77% 覆盖率、1108 KB 产物、10 路由）已由上述实测取代；优势项（无 `any`/`TODO`/`console.log`（仅 logger 出口）/`dangerouslySetInnerHTML`、TS strict、token 单一来源、localStorage schema 校验）保持不退化。

## 2. 后续维护约定

- 新任务写入本文件并标注优先级 / 现状证据 / 验收标准 / 涉及文件；完成后立即移入 `tasks-done.md`。
- 每次改动按 `docs/git-workflow.md` bump 一个最小版本，同步 `CHANGELOG.md` 与全局展示位。
- 外部核验清单（§0.4）的结果回填后，把对应行标注「已核验 + 日期」并保留历史记录，不删除。
- 任务计数、测试数、版本号等数据型描述一律实算，禁止凭记忆填写。
