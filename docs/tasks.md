# 任务清单 · Task Backlog

> 文档版本：v5.2.52（与项目版本同步，权威版本见 `package.json`）
> 最后更新：**2026-11-20 18:42（UTC+8）— 按复核清单完成 12 项代码任务并归档，剩余 3 项均为外部核验（P0-32 部署复验、P1-40 Tag/Release、P2-21 母语者审校）；全量门禁 36 文件 / 200 用例通过（§7）**
> 本文件是**未完成任务 / 当前进度的单一来源**；已完成任务一律归档至 [tasks-done.md](tasks-done.md)，实现要点见 [CHANGELOG.md](../CHANGELOG.md)。

## 0. 说明与规则（单一来源）

- `tasks.md` 只保留**未完成项**与当前进度；任何新任务、待办、backlog 只写这里，完成后移入 `tasks-done.md`。
- 状态口径：`待办 / 进行中 / 已完成 / 已取消`；`已完成` 不滞留本文件。
- 每个任务拆到**最小可执行模块**：一处明确改动 + 一条可验证验收标准。
- 本次更新前已按源码逐项复核，不沿用历史文字结论；版本号、任务计数均实算。

### 0.1 当前清单概览（共 3 项未完成）

| 优先级 | 未完成 | 已归档 | 结论 |
|--------|--------|--------|------|
| **P0** | 1 | 24 | P0-32：生产部署后 SEO / i18n 全链路复验（线上仍跑旧构建，属事故） |
| **P1** | 1 | 50 | P1-40：真实 Tag 触发 Release 验证（需 GitHub 推送权限） |
| **P2** | 1 | 42 | P2-21：11 语言母语者人工审校（需外部审校人） |
| **P3** | 0 | 4 | 已闭环 |
| **合计** | **3** | **137** | 2026-11-20 两批归档共 18 项后，代码侧任务全部闭环；余下 3 项均需平台/人工介入 |

> 剩余 3 项均为**外部核验**，本机无法闭环；不得以「代码已实现」替代验收结果。
> 本轮完成的 12 项见 §7 与 `tasks-done.md`「2026-11-20 18:42 批次」。

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

## 1. 当前质量基线（v5.2.52 实测；后续以命令输出为准）

| 门禁 | 命令 | 结果 |
|------|------|------|
| 类型检查 | `node node_modules/typescript/bin/tsc --noEmit` | ✅ 0 error |
| Lint | `node node_modules/eslint/bin/eslint.js .` | ✅ 0 error / 0 warning |
| 单测 | `node scripts/run-tests.mjs` | ✅ **36 文件 / 200 用例**全通过（v5.2.52 实测） |
| 覆盖率 | `pnpm test:run --coverage` | 阈值门禁见 CI `coverage` job；数值以实测为准 |
| 行数 | `pnpm check:lines` | ✅ `all <= 200` |
| 根目录清洁度 | `pnpm check:root` | ✅ `root clean`（`.tmp/` 为唯一放行的临时子目录） |
| i18n | `pnpm i18n:lint` | ✅ 11 语言 / 9 扩展模块 / 占位符一致 / 文案 ≤160 |
| 版本展示 | `pnpm version:check` | ✅ `v5.2.52 in sync` |
| 冻结安装 | `pnpm install --frozen-lockfile` | ✅ 通过（依赖已精确钉住） |
| 生产依赖漏洞 | `pnpm security:audit` | ✅ 0 高危（v5.2.31 T3 基线） |
| 生产构建 | `pnpm build` | 见 CI；本地构建产物由 `reports/build-out.log` 记录 |
| 体积预算 | `pnpm bundle:check` | 见 CI `quality` job |

> 2026-11-04 的历史结论（19 文件 / 77 用例、92.77% 覆盖率、1108 KB 产物、10 路由）已由上述实测取代；优势项（无 `any`/`TODO`/`console.log`（仅 logger 出口）/`dangerouslySetInnerHTML`、TS strict、token 单一来源、localStorage schema 校验）保持不退化。

## 2. 生产就绪残差缺口（2026-11-09 新鲜度审查）

> 来源：对 v5.2.45 代码库逐项实查（重跑门禁、读 `next.config.mjs` / `edgeone.json` / `vercel.json` / `deploy.yml` / `layout.tsx` / `site.ts` / `docs/05-deployment.md`），不沿用历史文字结论。结论：**代码面已生产就绪**，残差为「上线前最后必做校验 + 少量打磨」共 7 项。

### 2.1 阻断上线（P0）

### 2.2 高优先级（P1）

#### P1-40 · `release.yml` 真实 Tag 触发 Release 验证 `CI/发布` `待办`

- **现状**：`.github/workflows/release.yml`（P1-37 新增）校验 tag / 版本一致 → 门禁 → 创建 Release，但从未用真实 Tag 触发；`docs/git-workflow.md` §6.1 规范已写。
- **目标**：推送首个真实 `vX.Y.Z` Tag，确认 `release.yml` 门禁通过并自动建 Release，正文与 CHANGELOG 一致；记录任何异常。
- **验收**：① 打 Tag 后 Release 自动生成；② 正文与 CHANGELOG 一致；③ 版本一致 / 同名查重门禁生效。
- **涉及**：`.github/workflows/release.yml`、`docs/git-workflow.md` §6.1

### 2.3 中优先级（P2）

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

### 3.2 高优先级（P1）

### 3.3 中优先级（P2）

### 3.4 设计方向（供实现时参考，不另立任务）

以「田字格 + 真实笔顺动画」为唯一记忆点：删掉两枚 blur 光球、玻璃卡、字距 eyebrow 等通用 SaaS 装饰；中文标题统一中文字体与朴素标点；特性卡换成真实功能（12 字库 / 笔顺演示 / 拼音测验 / 本地进度），删除「72%」等虚构统计并补「无需注册 · 进度仅存本机」信任点。约束：一屏一个记忆点、动效只在用户触发时（播放笔顺）出现、尊重减少动效、焦点可见、对比度 AA、11 语言与 RTL 不退化。

### 3.5 v5.2.49 实施进展（2026-11-12，代码已落地 / 待线上复验）

| 任务 | 本批次已落地 | 剩余验收（需部署后执行） |
|------|-------------|------------------------|
| P0-30 | `getSiteUrlWarning` 纯函数 + `layout.tsx` / `next.config.mjs` 生产告警；`.env.example` 与部署清单明确必填 | 生产平台设置 `NEXT_PUBLIC_SITE_URL=https://<正式域名>` 并重新部署；`curl` 全链路不得出现 localhost |
| P0-31 | `proxy.ts` 注入 `x-hanzi-locale` / `x-hanzi-path`；`layout.tsx` 服务端预载词典 + `LocaleProvider.initialDictionary` | 禁用 JS / `curl` 抓 `/zh-CN` 得 `lang="zh-CN"` 且正文中文；浏览器首帧无语言跳动 |
| P1-38 | `opengraph-image.tsx` / `twitter-image.tsx` 动态 1200×630 分享图 | 线上 `/opengraph-image` 返回 200，`og:image` 为生产绝对 URL |
| P1-43 | `generateMetadata` 按 11 语言输出 title / description / `og:locale` / canonical / hreflang；4 个子页面本地化标题 | `curl` 比对 `/en`、`/zh-CN`、`/ja` 的 `<title>` / og 标签两两不同 |
| P1-44 | 全站 `Link` 统一 `/{locale}/...`，active 判定去前缀 | 从 `/zh-CN` 点击所有站内链接直达、network 无 302 |
| GEO（本批次新增） | `llms.txt`、JSON-LD `@graph`、首页事实/FAQ、`robots.ts` AI 爬虫规则、`sitemap.ts` 55 条规范 URL + hreflang | 线上访问 `llms.txt` / `robots.txt` / `sitemap.xml`；搜索控制台与生成式引擎收录观察 |

> 线上核验命令见 `docs/05-deployment.md` §7。代码侧门禁（`tsc` / 全量单测 / ESLint / `i18n:lint` 8 模块 / `check:lines`）已全绿；**上述 5 项验收含线上 `curl`，完成前不归档**。

## 4. 全面代码审查（2026-11-20）

> 完整报告：[code-review-2026-11-20.md](code-review-2026-11-20.md)（含每项问题原因与修改思路）。18 项已修复项已归档至 `tasks-done.md`。

### 4.1 本轮已修复（两轮共 45 项：第一轮 18 + 第二轮 27）

| 类别 | 修复点 | 主要文件 |
|------|--------|---------|
| 进度与统计 | 跨标签页同步、hydration 一致、答题记录上限、id/时间戳严格校验、未来日期连胜、准确率满分钳制、空进度不写回键 | `use-progress.ts`、`progress-utils.ts` |
| 存储与插值 | envelope 缺 `_d` 回退默认值、替换值不再二次解析、写入失败不再广播假成功 | `storage.ts`、`i18n/translate.ts`、`consent.ts`、`settings.ts` |
| 懒加载 | 笔顺 chunk 失败可重试 + 三处消费端 `.catch()`、发音 API 构造检测与异常捕获 | `stroke-order-loader.ts`、`writing-dialog.tsx`、`stroke-order-demo.tsx`、`locale-provider.tsx`、`use-pronunciation.ts` |
| 配置与 SEO | Sentry tunnel 不再被 302、AI 爬虫组补敏感路径禁入、`SITE_URL` 非法值生产构建阻断、Accept-Language q 权重与 manifest 语言协商 | `proxy.ts`、`robots.ts`、`site.ts`、`next.config.mjs`、`request-locale.ts`、`manifest.ts` |
| RTL / 可访问性 / 性能 | 对话框与提示 RTL 居中、抽屉手势方向、重复 DOM id、i18n aria-label、移除 `main key`、测验结果播报与选项键盘导航（含 practice roving tabindex 条件修正）、Object URL 延迟释放、错误页 `lang`/`dir`、Toast 计时器清理 | `dialog.tsx`、`use-swipe-close.ts`、`theme-toggle.tsx`、`locale-toggle.tsx`、`layout-client.tsx`、两个 `quiz-dialog.tsx`、`progress-transfer-controls.tsx`、`global-error.tsx`、`toast.tsx` |
| CI / Release / 门禁 | 删除失效 e2e job 与门禁依赖、tag 注入修复、按实际 commit 查询门禁、i18n-lint 按键与扩展检查、3 处测试假阳性修正、行数与 bundle 脚本边界 | `.github/workflows/ci.yml`、`release.yml`、`scripts/i18n-lint.mjs`、3 个测试文件、`check-line-count.mjs`、`check-bundle-size.mjs` |

详细逐项清单见 `docs/code-review-2026-11-20.md` §2/§3。

### 4.2 新增待办（4 项）

## 6. 任务状态复核与线上核验（2026-11-20 18:18 UTC+8）

> 本轮逐项读取当前源码、并对生产域 `https://hanzi.ewuse.com` 实测（证据 `reports/online-audit.txt`），不沿用历史结论。

### 6.1 本次更新记录

- **归档 6 项**（详见 `tasks-done.md` 同批次小节）：P0-30、P0-31、P1-38、P1-39、P1-43、P1-44。其中 P1-39 **完全闭环**；其余 5 项为**代码侧完成**、线上验收拆出 P0-32。
- **状态更新 5 项**：P1-41、P2-24、P1-46、P2-26、P2-27 由「待办」改为「部分完成」，并写入复核后的剩余项与行号证据。
- **优先级调整**：新增 P0-32（生产部署复验）为 **P0**——线上实际仍在跑旧构建，SEO / i18n 事故未消除。
- **时间戳**：2026-11-20 18:18（UTC+8）；任务计数实算为未完成 15 / 已归档 125。

### 6.2 线上实测结论

| 检查项 | 实测结果 | 结论 |
|--------|---------|------|
| 安全头（`/zh-CN` 与 `/_next/static/*.css`） | CSP / X-Frame-Options: DENY / X-Content-Type-Options: nosniff / Referrer-Policy / Permissions-Policy / COOP 六类齐全 | ✅ P1-39 闭环 |
| `<html>` | `lang="en" dir="ltr"`（`/zh-CN`、`/ja` 同样） | ❌ SSR 语言未上线 |
| canonical / hreflang | `<link rel="canonical" href="http://localhost:3000"/>`；hreflang 0 条 | ❌ SITE_URL 未在生产生效 |
| `<title>` / `og:locale` | `/zh-CN`、`/en`、`/ja` 均为中文标题、`og:locale=en_US` | ❌ 本地化 metadata 未上线 |
| `og:image` / `twitter:image` | MISSING；`/opengraph-image` 与 `/twitter-image` 均 302 | ❌ 分享图未上线 |
| 站内链接 | `/learn` `/practice` `/privacy` `/terms` 均无语言前缀 | ❌ 本地化链接未上线 |
| sitemap / robots | 200，但内容含 `localhost` | ❌ 绝对 URL 未上线 |

### 6.3 新增任务

#### P0-32 · 生产部署后 SEO / i18n 全链路复验 `部署/SEO/事故` `待办`

- **现状**：代码侧 P0-30 / P0-31 / P1-38 / P1-43 / P1-44 已实现并归档，但生产域实测仍为旧构建（证据见 §6.2）——canonical / hreflang / sitemap / robots 全指向 `localhost:3000`，非默认语言页 SSR 为英文且 `lang="en"`，分享图 302、链接无前缀。搜索引擎与社媒抓取结果错误，属**线上事故**。
- **目标**：① 将当前 `main` 部署到生产平台并确认构建号更新；② 在平台配置 `NEXT_PUBLIC_SITE_URL=https://hanzi.ewuse.com`，重新部署；③ 按 `docs/05-deployment.md` §7 逐项 `curl` 复验 P0-30/31、P1-38/43/44 的验收标准。
- **验收**：① `/zh-CN` / `/ja` 的 `<html lang>`、`<title>`、`og:locale` 与页面语言一致，首帧正文中文/日文（禁 JS 抓取）；② canonical / hreflang / sitemap / robots / JSON-LD 全为 `https://hanzi.ewuse.com`，无 `localhost`；③ `og:image` / `twitter:image` 为生产绝对 URL，`/opengraph-image` 返回 200 且 `content-type: image/png`；④ 站内链接均为 `/{locale}/...`；⑤ 结果回填 `docs/05-deployment.md` §7 并注明日期。
- **涉及**：部署平台环境变量与 Deploy、`docs/05-deployment.md` §7
- **依赖**：当前 `main` 已含全部代码改动；需平台部署权限（非本机可闭环）

## 5. 后续维护约定

- 新任务写入本文件并标注优先级 / 现状证据 / 验收标准 / 涉及文件；完成后立即移入 `tasks-done.md`。
- 每次改动按 `docs/git-workflow.md` bump 一个最小版本，同步 `CHANGELOG.md` 与全局展示位。
- 外部核验任务（§0.4 / §2）的结果回填后，把对应行标注「已核验 + 日期」并保留历史记录，不删除。
- 任务计数、测试数、版本号等数据型描述一律实算，禁止凭记忆填写。

## 7. 本轮闭环结果与剩余外部任务（2026-11-20 18:42 UTC+8）

### 7.1 代码侧已全部闭环

按 §6 复核清单推进并完成 **12 项**，全部移入 `tasks-done.md`「2026-11-20 18:42 批次」：

| 分组 | 任务 | 交付摘要 |
|------|------|---------|
| SEO / 安全 | P2-19 / P2-20 | `check:csp` 双平台一致性门禁纳入 CI；两处 CSP 移除冗余字体 CDN |
| 首页体验 | P1-42 / P2-23 / P2-24 / P2-25 | 首页重构为「左文右田字格笔顺演示」，删除虚构统计与通用装饰，真实能力卡与 CTA 对齐，标题层级与中文字体修正 |
| 无障碍 / 动效 | P1-41 / P2-22 / P2-26 | 横幅标题降级、减少动效零延迟与无 JS 兜底、设置面板焦点归还 |
| 隐私 / 主题 | P1-45 / P1-46 | head 主题预设消除 FOUC；设置面板可撤回统计同意并同步 GA4 consent update |
| 交互健壮性 | P2-27 | 学习页测验重开清空状态、作答后禁用提交、Enter 防重复 |

**实测门禁**：`tsc --noEmit` 0 error；`eslint .` 0 error / 0 warning；Vitest **36 文件 / 200 用例**全通过；`check:lines` `all <= 200`；`check:root` `root clean`；`check:csp` `csp consistent`；`i18n:lint` 11 语言 / 10 扩展模块 / 175 键；`version:check` v5.2.52 in sync。

### 7.2 剩余 3 项（均需平台 / 人工介入）

| ID | 优先级 | 任务 | 阻塞原因 | 下一步 |
|----|--------|------|---------|--------|
| P0-32 | P0 | 生产部署后 SEO / i18n 全链路复验 | 生产域仍跑旧构建；需在平台设 `NEXT_PUBLIC_SITE_URL` 并重新部署 | 部署后按 `docs/05-deployment.md` §7 逐项 `curl`，回填结果 |
| P1-40 | P1 | 真实 Tag 触发 Release 验证 | 需向 GitHub 推送 `vX.Y.Z` Tag | 推送 Tag 后核对 `release.yml` 生成的 Release 正文与 CHANGELOG |
| P2-21 | P2 | 11 语言母语者人工审校 | 需外部审校人，非代码可闭环 | 按 `docs/i18n-review.md` §2 抽查并记录问题清单 |

> 本清单不再保留「代码已完成但未验收」的条目：实现完成即归档，验收动作独立建任务跟踪。
