# 任务清单 · Task Backlog

> 文档版本：v5.2.47（与项目版本同步，权威版本见 `package.json`）
> 最后更新：**2026-11-09 — 线上首页审计（https://hanzi.ewuse.com/zh-CN）新增 9 项改进任务**
> 本文件是**未完成任务 / 当前进度的单一来源**；已完成任务一律归档至 [tasks-done.md](tasks-done.md)，实现要点见 [CHANGELOG.md](../CHANGELOG.md)。

## 0. 说明与规则（单一来源）

- `tasks.md` 只保留**未完成项**与当前进度；任何新任务、待办、backlog 只写这里，完成后移入 `tasks-done.md`。
- 状态口径：`待办 / 进行中 / 已完成 / 已取消`；`已完成` 不滞留本文件。
- 每个任务拆到**最小可执行模块**：一处明确改动 + 一条可验证验收标准。
- 本次更新前已按源码逐项复核，不沿用历史文字结论；版本号、任务计数均实算。

### 0.1 当前清单概览（共 16 项未完成）

| 优先级 | 未完成 | 已归档 | 结论 |
|--------|--------|--------|------|
| **P0** | 2 | 22 | 生产环境变量漏配**已在线上复现**（canonical / sitemap / robots 全为 localhost）；SSR 首屏语言与 URL 前缀不符 |
| **P1** | 7 | 41 | 首访横幅遮挡主视觉、Hero 承诺与真实能力不符、metadata 未本地化、站内链接丢语言前缀，+ 原 3 项 |
| **P2** | 7 | 34 | 减少动效下首屏空白、标题层级与中文排版、CTA 错配与内容深度、首屏高度，+ 原 3 项 |
| **P3** | 0 | 4 | i18n 译文审校流程已闭环 |
| **合计** | **16** | **101** | 线上首页审计后新增 9 项；P0 两项直接影响搜索引擎收录与首屏语言，须优先修复 |

> 归档总数 101 = 历史与 P0 批次 79 项 + 2026-11-08 批次 22 项。
> 7 项残差来自 **2026-11-09 新鲜度审查**：逐项对源码/部署配置/文档实查，不沿用历史结论。
> 9 项新增来自 **2026-11-09 线上首页审计**（§3）：真实浏览器 1280×720 / 390×844、SSR 原始 HTML、sitemap / robots 实测取证，每项均带线上证据。

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
- **线上已复现（2026-11-09，§3 审计）**：`https://hanzi.ewuse.com/zh-CN` 的 `<link rel="canonical">` 为 `http://localhost:3000/`，11 条 hreflang 全为 `http://localhost:3000/{locale}/`；`/sitemap.xml` 的 `<loc>` 与 `/robots.txt` 的 `Host` / `Sitemap` 亦全为 `http://localhost:3000`；JSON-LD / OG 同源。搜索引擎已拿到错误绝对 URL，**由预防性任务升级为线上事故**。
- **目标**：① 在生产平台配置 `NEXT_PUBLIC_SITE_URL=https://hanzi.ewuse.com` 并重新部署（先修线上，再补防线）；② production 下未设置时显式 `logger.warn`（或 `throw` 阻断构建）；③ `docs/05-deployment.md` §7 部署前清单将其列为必填。
- **验收**：① 线上 `curl -sSL https://hanzi.ewuse.com/zh-CN | Select-String localhost` 无命中，canonical / hreflang / `og:url` 全为生产域；② `/sitemap.xml` 与 `/robots.txt` 全为生产域；③ 空值 + `NODE_ENV=production` 下 CI / 构建日志出现明确告警（或退出码非 0）；④ 部署清单含该项；⑤ `src/lib/__tests__/site.test.ts` 覆盖回退与告警分支。
- **涉及**：`src/lib/site.ts`、`next.config.mjs`（或 build 脚本）、`docs/05-deployment.md`、`src/lib/__tests__/site.test.ts`
- **依赖**：P0-21（logger 已就绪）

### 2.2 高优先级（P1）

#### P1-38 · 补全 OG / Twitter 分享预览图 `SEO/社媒` `待办`

- **现状**：`layout.tsx:42-54` `openGraph` 无 `images`、`twitter` 无 `image`；微信 / X / Slack 等分享无预览图，点击率受损；`public/` 仅有 `icon.svg` / `offline.html` / `sw.js`，无默认 OG 图。**线上核实（2026-11-09）**：`/zh-CN` 的 `<head>` meta 列表无 `og:image` / `twitter:image`，分享链接确无预览图。
- **目标**：产出默认分享图（建议 `public/og-default.png` 1200×630，或 `app/opengraph-image.tsx` 动态生成含 Logo + 标题），在 `metadata.openGraph.images` / `twitter.images` 引用；后续可扩展按语言本地化。
- **验收**：① 页面 `<head>` 含 `og:image` / `twitter:image` 绝对 URL（依赖 P0-30 的 `SITE_URL`）；② 抓图工具（如社交调试器）可取图。
- **涉及**：`src/app/layout.tsx`、`public/og-default.png`（或 `app/opengraph-image.tsx`）
- **依赖**：P0-30

#### P1-39 · 首次真实生产部署 + 线上安全头核验 `部署/安全` `待办`

- **现状**：`deploy.yml` 仅 Vercel 自动部署（缺 Secrets 时跳过），EdgeOne 为手动备选；`docs/05-deployment.md` §3.1 的「线上 `curl` 实测」从未执行。安全头在 Vercel 上由 `next.config.mjs` `headers()` 注入、EdgeOne 上由 `edgeone.json` 兜底。**线上核实（2026-11-09）**：生产域 `https://hanzi.ewuse.com` 已可访问（首页 / `/zh-CN` / `/en` / `/learn` 200，浏览器控制台 0 error / 0 warning），故本项的「首次部署」部分已完成，**仅剩 6 类安全头 `curl` 核验与结果回填**；同时 P0-30 的 SITE_URL 漏配已在该域复现。
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

0. **线上事故优先（§3 审计新增）**：P0-30（先修生产域 SITE_URL 并重新部署）→ P0-31（SSR 语言）→ P1-41（首访横幅遮挡）。
1. **上线前必做**：P1-39（安全头核验）→ P1-40（Release 验证）。
2. **上线同期打磨**：P1-38（OG 图）→ P2-19（CSP 一致性测试）→ P2-20（CSP 收紧）→ P2-21（译文审校，可后置但建议发版前启动）。

## 3. 线上首页审计（2026-11-09，https://hanzi.ewuse.com/zh-CN）

### 3.0 取证方式与总体结论

| 手段 | 实测证据 |
|------|---------|
| 真实浏览器 1280×720 / 390×844 | 客户端最终为简中、控制台 **0 error / 0 warning**；首访「统计与隐私」横幅在桌面浮于首屏中央、在移动占底部约 190px，均遮挡「永字八法」主视觉卡；`/learn` 经 302 跳到 `/zh-CN/learn` |
| SSR 原始 HTML | `/zh-CN` 返回 `<html lang="en" dir="ltr">`、h1 为英文 `Master Chinese`，整页 SSR 文案英文（web_fetch 同证）；客户端 hydration 后才切中文 |
| head / SEO | `<link rel="canonical">` = `http://localhost:3000/`；11 条 hreflang 全为 localhost；`/sitemap.xml` 的 `<loc>` 与 `/robots.txt` 的 `Host` / `Sitemap` 全为 localhost；无 `og:image` / `twitter:image`；`/en` 页 `<title>` / `og:title` 仍为中文 |
| 无障碍 / 动效 | `prefers-reduced-motion: reduce` 下 `.hero-title` 实测 `opacity:0`、`animation-delay:0.3s`、`animation-duration:1e-05s` → 首屏标题前 0.3s 空白（`.hero-visual` 延迟 0.75s）；横幅无 `role=dialog` / `aria-modal`，且 `H2` 混入内容标题层级；页面 `H1 → H3` 跳级 |
| 源码对照 | `home-page.tsx` 硬编码「72%」进度、3 张特性卡宣称「词源与文化 / 自适应学习（我们的算法）」但应用无字源内容与自适应算法（`docs/04-api-reference.md` 已注明历史键名不代表 AI 后端）、`min-h-[90vh]`、自建 IntersectionObserver；`layout.tsx` 静态中文 metadata；`proxy.ts` rewrite + `?lang=`；`locale-provider.tsx` 首屏 `useEffect` 才切语言 |

**结论**：工程基线健康（无控制台错误、响应式与设置/主题/语言入口齐全），但线上 SEO 配置与首屏语言属阻断级事故；首页在「内容真实性、首访体验、可访问性、国际化一致性」四个维度有系统性问题，且 Hero 未把产品最独特的笔顺演示作为主视觉。

### 3.1 阻断（P0）

#### P0-31 · SSR 首屏语言与 URL 前缀不一致 `i18n/SEO` `待办`

- **现状**：`proxy.ts:33-43` 把 `/{locale}/...` rewrite 到无前缀页面并附加 `?lang=`，但 `layout.tsx` 只从 cookie 读 `initialLocale`，`locale-provider.tsx:85-90` 在客户端 `useEffect` 才按 URL 前缀切语言、再异步加载词典。首次访问 `/zh-CN` 时请求尚无该 cookie，于是 SSR 输出 `lang="en"` + 英文 hero/features，客户端才换中文 → 10 个非默认语言首屏闪烁；爬虫与社媒抓到的内容语言与 URL / hreflang 冲突。
- **目标**：服务端在 rewrite 时把 locale 传给 RSC（读取 `?lang=` 并注入请求 cookie，或由 `layout.tsx` 读 `searchParams`），SSR 直接输出对应 `html lang` / `dir`，并把 `defaultLocale` 与预载词典注入 `LocaleProvider`，消灭客户端二次切语言。
- **验收**：① 禁用 JS / `curl` 抓 `/zh-CN` 得到 `lang="zh-CN"` 且正文中文，`/en` 得到 `lang="en"` 且正文英文；② 浏览器首帧截图无「英文→中文」跳动；③ 现有 `providers.test.tsx` / i18n 门禁仍通过。
- **涉及**：`src/proxy.ts`、`src/app/layout.tsx`、`src/components/locale-provider.tsx`、`src/lib/i18n/load-translations.ts`、相关测试
- **依赖**：无（与 P0-30 同批修复可共享部署）

### 3.2 高优先级（P1）

#### P1-41 · 首访 Cookie 同意横幅遮挡首屏主视觉 `UX/无障碍` `待办`

- **现状**：线上截图显示横幅为居中浮层（桌面 1280×720 盖住「永字八法」卡上半部；移动 390×844 占底部约 190px 完全盖住卡片），且无 `role=dialog` / `aria-modal`、无焦点管理，标题用 `H2` 插进内容层级。
- **目标**：改为底部非模态贴条（或置于主视觉之下），高度受控、可关闭、不覆盖 CTA 与主视觉；补 `role="region"`（或 dialog）+ `aria-label`、焦点可达、标题降级。
- **验收**：① 首访 1280×720 与 390×844 截图主视觉完整可见；② Tab 可到达「拒绝 / 接受」且焦点可见；③ axe / 人工检查标题层级无 `H1 → H2(横幅) → H3` 混入。
- **涉及**：`src/components/consent-banner.tsx`（及样式）、`src/app/globals.css` / `styles/`、设置面板的减少动效规则
- **依赖**：无

#### P1-42 · Hero 承诺与真实能力不符、缺真实产品演示 `内容/设计` `待办`

- **现状**：Hero 为通用 SaaS 模板（超大标题 + 双 CTA + 玻璃卡 + 两枚 blur 光球 + 字距 eyebrow），核心汉字资产只是**静态**「永」字；文案「精通中文」与实际仅 12 个基础汉字不符；特性卡「词源与文化」「自适应学习／我们的算法」在应用内无对应功能，`docs/04-api-reference.md` 已注明这些是历史键名、不表示存在 AI 后端；卡片「笔画掌握 72%」为 `home-page.tsx:87` 硬编码的虚构数字。
- **目标**：① 以「田字格 + 可播放笔顺动画」替代静态大字作为首屏唯一记忆点（复用现有 stroke-order 组件 / `stroke-order-loader.ts`），删除光球与玻璃卡等通用装饰；② 文案对齐真实能力（12 个基础汉字、笔顺演示、拼音测验、本地进度），删除或改写虚构特性与 72% 进度；③ 用「无需注册 · 进度仅存本机」作为信任点。
- **验收**：① 首屏可直接播放/重播笔顺演示；② 3 张特性卡文案均能在应用内找到对应功能，或改为真实功能卡；③ 源码无 `72%` / `w-[72%]` 等硬编码统计；④ 11 语言文案同步且 `i18n:lint` 通过；⑤ 桌面/移动首屏截图无装饰遮挡。
- **涉及**：`src/components/pages/home-page.tsx`、`src/components/feature-card.tsx`、11 语言 `home.*` 键、`src/app/styles/utilities.css`
- **依赖**：P1-41（横幅不遮挡后再验视觉）

#### P1-43 · metadata 未按语言本地化 `SEO/i18n` `待办`

- **现状**：`layout.tsx` 的 `title` / `description` / `openGraph` / `twitter` 为静态中文；线上 `/en` 的 `<title>` 与 `og:title` 仍为「HanziMaster 汉字大师 — 汉字笔顺与书写练习」而页面 h1 为英文，`og:locale` 亦未随语言变化，11 个语言页共用同一组中文描述。
- **目标**：用 `generateMetadata` 按服务端 locale（P0-31 的产物）输出本地化 `title` / `description` / `og:title` / `og:description` / `og:locale`，各语言词典提供 `meta.*` 文案；与 P1-38 的 OG 图一并落 `og:url`。
- **验收**：`curl` 抓 `/en`、`/zh-CN`、`/ja` 的 `<title>` / `og:title` / `og:locale` 两两不同且与页面语言一致；`i18n:lint` 通过。
- **涉及**：`src/app/layout.tsx`、11 语言 `meta.*` 键、`docs/04-api-reference.md`
- **依赖**：P0-30（SITE_URL）、P0-31（服务端 locale）

#### P1-44 · 站内链接不带语言前缀 `i18n/导航` `待办`

- **现状**：线上首页所有站内 `<a>` 均为 `/learn` `/practice` `/privacy` `/terms`（无前缀），点击 `/learn` 由 `proxy.ts` 302 到 `/zh-CN/learn`；语言靠 cookie 侥幸保住，但每次导航多一跳、分享链接丢语言、SEO 权重分散。
- **目标**：`Link` 统一生成 `/{locale}/...`（CTA、导航、页脚、移动抽屉、设置面板跳转），语言切换后 `syncUrlLocale` 与链接前缀同步；保留旧深链 302 兼容。
- **验收**：从 `/zh-CN` 点击全部站内链接直达 `/zh-CN/...`（浏览器 network 无 302）；切换语言后链接前缀立即更新；`/learn` 等旧链接仍 302 到对应语言。
- **涉及**：`src/components/pages/home-page.tsx`、`src/components/layout-client.tsx`、`src/components/mobile-nav.tsx`、`src/components/nav-link.tsx`
- **依赖**：P0-31

### 3.3 中优先级（P2）

#### P2-22 · 减少动效下首屏空白与 `.reveal` 无兜底 `无障碍` `待办`

- **现状**：实测 `prefers-reduced-motion: reduce` 下 `.hero-title` 仍 `opacity:0` 且 `animation-delay:0.3s`（`.hero-subtitle` 0.45s / `.hero-cta` 0.6s / `.hero-visual` 0.75s），`globals.css` 与设置面板 `html.reduce-motion` 规则只压 `animation-duration`，未清 `animation-delay` / `transition-delay`；`.reveal` 初始 `opacity:0` 且首页自建 observer 未读取「减少动效」设置（`use-scroll-reveal.ts` 已处理但首页未复用），JS 失败时特性区不可见。
- **目标**：① 两条减少动效规则清零所有 delay 并保证 hero 初始可见；② 首页复用 `use-scroll-reveal`，减少动效时立即为 `.reveal` 添加 `revealed`；③ 为无 JS 场景提供 CSS 可见兜底。
- **验收**：模拟 `reducedMotion: 'reduce'` 刷新后 100ms 内 hero 标题/CTA/主视觉全部可见（computed opacity=1、无延迟）；开启设置面板「减少动效」后未滚动的特性区文本也可见；禁用 JS 时特性区文案可见。
- **涉及**：`src/app/globals.css`、`src/app/styles/utilities.css`、`src/components/pages/home-page.tsx`、`src/hooks/use-scroll-reveal.ts`
- **依赖**：无

#### P2-23 · 首页标题层级与中文排版 `无障碍/排版` `待办`

- **现状**：`H1`（主标题）后直接 `H3`（永字八法）跳级，横幅 `H2` 混入内容层级；eyebrow 对中文使用 `uppercase tracking-[0.2em]`（中文无大小写、字距散乱）；中文 h1 使用 `display-font`（Playfair Display 无中文字形，回退系统字体）与 `serif-font` 副标题不一致；标题中全角逗号夹在 `<span>` 外。
- **目标**：修正标题层级（`H1 → H2 → H3`）；中文标题统一走中文衬线字体并去掉 uppercase / 大字距；统一标点与断行。
- **验收**：axe / 人工检查无标题跳级；`/zh-CN` 与 `/en` 截图标题字体渲染一致、无异常字距；移动 390px 下标题不溢出。
- **涉及**：`src/components/pages/home-page.tsx`、`src/app/globals.css` 字体 token、横幅组件（配合 P1-41）
- **依赖**：P1-41

#### P2-24 · CTA 文案与落地页错配、首页内容深度不足 `IA/内容` `待办`

- **现状**：「浏览字库」指向 `/practice`（实际是三种练习模式），「立即开始学习」指向 `/learn`（字库 + 学习）；「永字八法」大卡为死内容（无按钮 / 链接、72% 静态）；整页仅 hero + 特性两个 section，未展示「能学哪 12 个字 / 怎么学 / 真实界面」，访客难以判断产品范围。
- **目标**：① 次 CTA 改为「开始练习」→ `/practice`，主卡增加「查看笔顺演示」入口；② 新增「12 字示例网格」或「三步学习路径」区（复用既有字符数据，不新增后端），把真实产品能力前置。
- **验收**：CTA 文案与落地页一致；主卡可交互且到达 `/learn` 对应演示；新增区块在 11 语言下均有文案、桌面/移动布局不溢出；`check:lines` 通过。
- **涉及**：`src/components/pages/home-page.tsx`、`src/lib/characters-*.ts` 数据复用、11 语言 `home.*` 键
- **依赖**：P1-42（Hero 文案同步）

#### P2-25 · 首屏高度与移动端留白 `响应式/设计` `待办`

- **现状**：hero `min-h-[90vh]` + `py-20` + 大卡片，1280×720 首屏卡片只露出顶部（被折叠线切断）；390×844 下标题、副标题、双 CTA 已占满整屏，主视觉需滚动才见。
- **目标**：hero 压到约 `70vh`，桌面改为左文右演示两栏、CTA 紧随标题，主视觉进入首屏；移动端收紧纵向留白。
- **验收**：1280×720 首屏可见完整主视觉；390×844 首屏可见 CTA 与主视觉入口（配合 P1-41 横幅不遮挡）；无横向溢出。
- **涉及**：`src/components/pages/home-page.tsx`、`src/app/globals.css`（如需新断点）
- **依赖**：P1-41、P1-42

### 3.4 设计方向（供实现时参考，不另立任务）

以「田字格 + 真实笔顺动画」为唯一记忆点：删掉两枚 blur 光球、玻璃卡、字距 eyebrow 等通用 SaaS 装饰；中文标题统一中文字体与朴素标点；特性卡换成真实功能（12 字库 / 笔顺演示 / 拼音测验 / 本地进度），删除「72%」等虚构统计并补「无需注册 · 进度仅存本机」信任点。约束：一屏一个记忆点、动效只在用户触发时（播放笔顺）出现、尊重减少动效、焦点可见、对比度 AA、11 语言与 RTL 不退化。

## 4. 后续维护约定

- 新任务写入本文件并标注优先级 / 现状证据 / 验收标准 / 涉及文件；完成后立即移入 `tasks-done.md`。
- 每次改动按 `docs/git-workflow.md` bump 一个最小版本，同步 `CHANGELOG.md` 与全局展示位。
- 外部核验任务（§0.4 / §2）的结果回填后，把对应行标注「已核验 + 日期」并保留历史记录，不删除。
- 任务计数、测试数、版本号等数据型描述一律实算，禁止凭记忆填写。
