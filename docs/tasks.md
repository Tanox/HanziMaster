# 任务清单 · Task Backlog

> 文档版本：v5.2.46（与项目版本同步，权威版本见 `package.json`）
> 最后更新：**2026-11-09 — 修复笔顺上下颠倒缺陷（坐标系未翻转 + 轮廓误描边）**
> 本文件是**未完成任务 / 当前进度的单一来源**；已完成任务一律归档至 [tasks-done.md](tasks-done.md)，实现要点见 [CHANGELOG.md](../CHANGELOG.md)。

## 0. 说明与规则（单一来源）

- `tasks.md` 只保留**未完成项**与当前进度；任何新任务、待办、backlog 只写这里，完成后移入 `tasks-done.md`。
- 状态口径：`待办 / 进行中 / 已完成 / 已取消`；`已完成` 不滞留本文件。
- 每个任务拆到**最小可执行模块**：一处明确改动 + 一条可验证验收标准。
- 本次更新前已按源码逐项复核，不沿用历史文字结论；版本号、任务计数均实算。

### 0.1 当前清单概览（共 7 项未完成）

| 优先级 | 未完成 | 已归档 | 结论 |
|--------|--------|--------|------|
| **P0** | 1 | 22 | 仅余生产环境变量必填校验（`NEXT_PUBLIC_SITE_URL` 漏配静默回退 localhost） |
| **P1** | 3 | 41 | OG 分享图、首次真实生产部署+线上头核验、Release 自动化验证 |
| **P2** | 3 | 34 | 双平台 CSP 一致性测试、CSP 字体冗余收紧、译文母语者审校 |
| **P3** | 0 | 4 | i18n 译文审校流程已闭环 |
| **合计** | **7** | **101** | 代码面已生产就绪；残差为上线前最后校验与少量打磨 |

> 归档总数 101 = 历史与 P0 批次 79 项 + 2026-11-08 批次 22 项。
> 7 项残差来自 **2026-11-09 新鲜度审查**：逐项对源码/部署配置/文档实查，不沿用历史结论。

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

### 0.4 外部核验（已升级为受跟踪任务）

以下三项原为「本地无法验证」的外部动作，现升级为受跟踪任务，结果回填对应文档：

- **P1-39** 首次真实生产部署 + 线上安全头 `curl` 核验（原「EdgeOne 安全响应头」，平台以实际部署为准，当前 CI 主路径为 Vercel）→ `docs/05-deployment.md` §3.1
- **P1-40** `release.yml` 真实 Tag 触发 Release 验证 → `docs/git-workflow.md` §6.1
- **P2-21** 译文母语者人工审校（11 语言关键路径抽查）→ `docs/i18n-review.md`

## 1. 当前质量基线（v5.2.45 实测）

| 门禁 | 命令 | 结果 |
|------|------|------|
| 类型检查 | `node node_modules/typescript/bin/tsc --noEmit` | ✅ 0 error |
| Lint | `node node_modules/eslint/bin/eslint.js src scripts` | ✅ 0 error / 0 warning |
| 单测 | `node scripts/run-tests.mjs` | ✅ **30 文件 / 165 用例**全通过（v5.2.46 笔顺坐标修正后同步更新 36 例断言） |
| 覆盖率 | `pnpm test:run --coverage` | 阈值门禁见 CI `coverage` job |
| 行数 | `pnpm check:lines` | ✅ `all <= 200` |
| 根目录清洁度 | `pnpm check:root` | ✅ `root clean` |
| i18n | `pnpm i18n:lint` | ✅ 11 语言 / 6 扩展模块 / 占位符一致 / 文案 ≤160 |
| 版本展示 | `pnpm version:check` | ✅ `v5.2.46 in sync` |
| 冻结安装 | `pnpm install --frozen-lockfile` | ✅ 通过（依赖已精确钉住） |
| 生产依赖漏洞 | `pnpm security:audit` | ✅ 0 高危（v5.2.31 T3 基线） |
| 生产构建 | `pnpm build` | 见 CI；本地构建产物由 `reports/build-out.log` 记录 |
| 体积预算 | `pnpm bundle:check` | 见 CI `quality` job |

> 2026-11-04 的历史结论（19 文件 / 77 用例、92.77% 覆盖率、1108 KB 产物、10 路由）已由上述实测取代；优势项（无 `any`/`TODO`/`console.log`（仅 logger 出口）/`dangerouslySetInnerHTML`、TS strict、token 单一来源、localStorage schema 校验）保持不退化。

## 2. 生产就绪残差缺口（2026-11-09 新鲜度审查）

> 来源：对 v5.2.45 代码库逐项实查（重跑门禁、读 `next.config.mjs` / `edgeone.json` / `vercel.json` / `deploy.yml` / `layout.tsx` / `site.ts` / `docs/05-deployment.md`），不沿用历史文字结论。结论：**代码面已生产就绪**，残差为「上线前最后必做校验 + 少量打磨」共 7 项。

### 2.1 阻断上线（P0）

#### P0-30 · 生产环境变量 `NEXT_PUBLIC_SITE_URL` 必填校验 `构建/SEO` `待办`

- **现状**：`src/lib/site.ts:7` `SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000')`；`layout.tsx:27` `metadataBase`、canonical、`sitemap.ts` / `robots.ts` / `layout.tsx` 的 hreflang、`structured-data.tsx:11` 的 OG `url` 全部派生自 `SITE_URL`。生产若漏配 `NEXT_PUBLIC_SITE_URL`，上述绝对 URL 全指向 `localhost:3000`，SEO canonical / hreflang / sitemap 与社媒分享链全部错误；`.env.example` 注释「本地开发可留空」但未声明**生产必填**，且构建 / 启动环节无任何强制校验。
- **目标**：① production 下未设置 `NEXT_PUBLIC_SITE_URL` 时显式 `logger.warn`（或 `throw` 阻断构建）；② `docs/05-deployment.md` §7 部署前清单将其列为必填。
- **验收**：① 空值 + `NODE_ENV=production` 下 CI / 构建日志出现明确告警（或退出码非 0）；② 部署清单含该项；③ `src/lib/__tests__/site.test.ts` 覆盖回退与告警分支。
- **涉及**：`src/lib/site.ts`、`next.config.mjs`（或 build 脚本）、`docs/05-deployment.md`、`src/lib/__tests__/site.test.ts`
- **依赖**：P0-21（logger 已就绪）

### 2.2 高优先级（P1）

#### P1-38 · 补全 OG / Twitter 分享预览图 `SEO/社媒` `待办`

- **现状**：`layout.tsx:42-54` `openGraph` 无 `images`、`twitter` 无 `image`；微信 / X / Slack 等分享无预览图，点击率受损；`public/` 仅有 `icon.svg` / `offline.html` / `sw.js`，无默认 OG 图。
- **目标**：产出默认分享图（建议 `public/og-default.png` 1200×630，或 `app/opengraph-image.tsx` 动态生成含 Logo + 标题），在 `metadata.openGraph.images` / `twitter.images` 引用；后续可扩展按语言本地化。
- **验收**：① 页面 `<head>` 含 `og:image` / `twitter:image` 绝对 URL（依赖 P0-30 的 `SITE_URL`）；② 抓图工具（如社交调试器）可取图。
- **涉及**：`src/app/layout.tsx`、`public/og-default.png`（或 `app/opengraph-image.tsx`）
- **依赖**：P0-30

#### P1-39 · 首次真实生产部署 + 线上安全头核验 `部署/安全` `待办`

- **现状**：`deploy.yml` 仅 Vercel 自动部署（缺 Secrets 时跳过），EdgeOne 为手动备选；`docs/05-deployment.md` §3.1 的「线上 `curl` 实测」从未执行（无生产域）。安全头在 Vercel 上由 `next.config.mjs` `headers()` 注入、EdgeOne 上由 `edgeone.json` 兜底。
- **目标**：在选定平台完成首次生产部署，按 §3.1 跑 3 条 `curl -sSI` 确认页面与 `/_next/static/*` 均带 CSP / X-Frame-Options / X-Content-Type-Options / Referrer-Policy / Permissions-Policy / COOP；结果回填文档。
- **验收**：① 生产域可访问、构建成功；② 6 类安全头实测存在；③ 文档回填核验日期与样本。
- **涉及**：`.github/workflows/deploy.yml`、`docs/05-deployment.md` §3.1
- **依赖**：P0-30（SITE_URL）、平台 Secrets 配置
- **注**：原 §0.4「EdgeOne 安全响应头」升级项，平台以实际部署为准（当前 CI 主路径 Vercel）。

#### P1-40 · `release.yml` 真实 Tag 触发 Release 验证 `CI/发布` `待办`

- **现状**：`.github/workflows/release.yml`（P1-37 新增）校验 tag / 版本一致 → 门禁 → 创建 Release，但从未用真实 Tag 触发；`docs/git-workflow.md` §6.1 规范已写。
- **目标**：推送首个真实 `vX.Y.Z` Tag，确认 `release.yml` 门禁通过并自动建 Release，正文与 CHANGELOG 一致；记录任何异常。
- **验收**：① 打 Tag 后 Release 自动生成；② 正文与 CHANGELOG 一致；③ 版本一致 / 同名查重门禁生效。
- **涉及**：`.github/workflows/release.yml`、`docs/git-workflow.md` §6.1

### 2.3 中优先级（P2）

#### P2-19 · 双平台 CSP 字符串一致性测试 `安全/质量` `待办`

- **现状**：`next.config.mjs:22-50` 与 `edgeone.json:48` 各自声明同一组 CSP；`docs/05-deployment.md` §3.1 要求「两处 CSP 字符串必须逐字一致，浏览器取交集」，但**无自动化校验**，长期易漂移。
- **目标**：新增测试 / 脚本断言 `edgeone.json` 的 CSP 值 == `next.config.mjs` `securityHeaders` 中 CSP 值（归一化后逐字一致）。
- **验收**：① 脚本 / 测试纳入 CI `quality` job；② 人为改一处 CSP 即失败。
- **涉及**：`scripts/`（新增或并入既有检查）、`next.config.mjs`、`edgeone.json`、CI `quality` job
- **依赖**：P1-32（双配置已落地）

#### P2-20 · 收紧 CSP 中自托管字体的冗余 CDN 条目 `安全` `待办`

- **现状**：字体经 `next/font/google` 构建期自托管（`layout.tsx:16-19`），运行时无 `fonts.googleapis.com` / `fonts.gstatic.com` 请求；但 `next.config.mjs:28-31` 与 `edgeone.json` CSP 仍允许这两域（style / font / connect），属冗余且略微放宽。
- **目标**：确认无运行时字体 CDN 依赖后，移除冗余字体 CDN 条目（保留 `googletagmanager` / `google-analytics` 的 GA4 项），两处 CSP 同步更新。
- **验收**：① CSP 不再含字体 CDN 域；② 构建后字体仍正常（自托管）；③ 与 P2-19 一致性测试通过。
- **涉及**：`next.config.mjs`、`edgeone.json`
- **依赖**：P2-19

#### P2-21 · 译文母语者人工审校排期 `i18n/质量` `待办`

- **现状**：`docs/i18n-review.md`（P3-2）已定义术语 / 语境 / RTL 长度等审校清单与 PR 模板项，但 11 语言译文**尚未经过母语者人工抽查**，机器 / 对齐翻译可能存在语境错误。
- **目标**：各语言母语者按 `docs/i18n-review.md` §2 抽查关键路径（导航 / 设置 / 练习 / 测验 / 法律页）译文，记录并修正问题。
- **验收**：① 11 语言至少各抽 1 名审校并提交问题清单；② 关键路径译文错误已修正并复测 `i18n:lint` 通过。
- **涉及**：`docs/i18n-review.md`、各语言词典
- **依赖**：P3-2（流程已建）

### 2.4 建议执行顺序

1. **上线前必做**：P0-30（SITE_URL 校验）→ P1-39（首次部署 + 头核验）→ P1-40（Release 验证）。
2. **上线同期打磨**：P1-38（OG 图）→ P2-19（CSP 一致性测试）→ P2-20（CSP 收紧）→ P2-21（译文审校，可后置但建议发版前启动）。

## 3. 后续维护约定

- 新任务写入本文件并标注优先级 / 现状证据 / 验收标准 / 涉及文件；完成后立即移入 `tasks-done.md`。
- 每次改动按 `docs/git-workflow.md` bump 一个最小版本，同步 `CHANGELOG.md` 与全局展示位。
- 外部核验任务（§0.4 / §2）的结果回填后，把对应行标注「已核验 + 日期」并保留历史记录，不删除。
- 任务计数、测试数、版本号等数据型描述一律实算，禁止凭记忆填写。
