# 任务清单 · Task Backlog

> 文档版本：v5.2.38（与项目版本同步，权威版本见 `package.json`）
> 最后更新：2026-11-07 18:40（UTC+8）
> 本次更新：依赖重建后实测归档 P1-17/18/19；完成并归档 P2-15（404 noindex）、P2-16（发音降级提示）、P2-13（骨架屏）；清单收敛至 23 项。

## 0. 说明与规则（单一来源）

- **本文件是项目所有任务（待办 / 改进 / backlog）的唯一来源。** 其他文档仅保留流程性检查表（如部署前检查、测试前检查）与状态报告，**不再重复记录任务或待办清单**。
- 新增任务请直接加入下方对应优先级小节，并标注【分类】与【状态】；任务状态统一用 `待办 / 进行中 / 已完成 / 已取消` 标记。
- **已完成任务移入 [tasks-done.md](tasks-done.md) 归档**（含完成版本与实现要点），本文件只保留未完成任务。
- 任务 ID 规则：`P0-xx` 阻断上线（正式发布前必须闭环）、`P1-xx` 高优先级（首个生产版本前完成）、`P2-xx` 中优先级（可排期）、`P3-xx` 低优先级（长期/可选）。
- 每个任务已拆到**最小可执行模块**：一个任务 = 一处明确改动 + 一条可验证验收标准。

### 0.1 当前清单概览（共 23 项未完成）

| 优先级 | 数量 | 分组 | 含义 |
|--------|------|------|------|
| **P0** | 0 | 法律与合规 / 质量门禁与 CI / 可观测性 | **22 项已全部闭环并归档** |
| **P1** | 14 | i18n 架构 3 · 性能 2 · 无障碍 4 · 内容 i18n 1 · 安全 1 · RTL 2 · CI/发布 1 | 首个生产版本前完成 |
| **P2** | 8 | 构建 / 架构 / 运维 / 产品体验 / 代码质量 | 可排期 |
| **P3** | 1 | i18n 译文质量审校流程 | 长期 / 可选 |

> 归档记录共 78 项：历史批次 20 项（T1–T14 与 P0 系列 6 项），2026-11-05 批次 **51 项**，2026-11-07 批次 **7 项**（文档同步 1 + 测试实测 3 + UX/SEO/骨架屏 3），见 [tasks-done.md](tasks-done.md)。
> 本文件只保留未完成任务；`进行中` 6 项（已有等价实现或部分落地）、`待办（降级）` 13 项（需独立里程碑 / 外部环境）、`待办` 4 项。

### 0.2 本轮执行结果与状态重排（2026-11-05 12:38 UTC+8）

- **状态口径**：统一为 `待办 / 进行中 / 已完成 / 已取消`；`已完成` 项一律归档，不留在本文。
- **完成 51 / 80 项**：P0 全部 22 项闭环（LICENSE / NOTICE / 隐私条款 / GA 同意门控 / CI / Sentry / 错误边界 / health）；P1 完成 20 项（SEO 全套、按需 Radix、覆盖率与阈值、单测、E2E + axe、CSP、RTL 基础）；P2 完成 6 项、P3 完成 3 项。逐项索引见 [tasks-done.md](tasks-done.md)，实现要点见 [CHANGELOG.md](../CHANGELOG.md) `v5.2.35`。
- **实测基线**：`tsc --noEmit` 0 error；ESLint 0 error / 0 warning；Vitest **19 文件 / 77 用例**全通过；覆盖率 **92.77% 行 / 90.19% 函数 / 93.66% 分支**（阈值门禁通过）；`next build` 10 个路由成功；产物 1108 KB（预算 1500 KB）；单文件 ≤200 行。
- **`进行中` 6 项**：P1-8/9/28/29/35 与 P3-2 已落地等价或自动化子集，尚缺完整迁移 / 人工审校。
- **`待办（降级）` 13 项**：`[locale]` 路径迁移、词典动态加载、懒加载、RSC 拆分等需独立里程碑；Sentry DSN、Vercel Secrets、Playwright 浏览器等需外部环境，本地不冒充「已验证」。
- **优先级重排**：剩余 29 项按 §6 的 M1（测试与文档）/ M2（架构）/ M3（体验与平台）三批重排；安全与合规类已无阻断项。

## 1. 生产就绪度评估结论（2026-11-04 审查 · 历史快照）

> 本节为审查当时的结论，其中「核心缺口」大部分已由 v5.2.35 批次闭环；表格中的门禁结果已按本批次实测刷新。历史叙述保留原样，请以 §0.2 与 [tasks-done.md](tasks-done.md) 为当前状态依据。

### 1.1 实测质量门禁基线

| 门禁 | 命令 | 结果 |
|------|------|------|
| 类型检查 | `node node_modules/typescript/bin/tsc --noEmit` | ✅ 0 error |
| Lint | `node node_modules/eslint/bin/eslint.js src` | ✅ 0 error / 0 warning |
| 单测 | `node node_modules/vitest/vitest.mjs run` | ✅ 19 文件 / 77 用例全通过 |
| 生产依赖漏洞 | `pnpm audit --prod` | ✅ 0 漏洞（v5.2.31 T3） |
| 覆盖率门禁 | `pnpm test:run --coverage` | ✅ 92.77% 行 / 90.19% 函数 |
| 生产构建 | `pnpm build` | ✅ 10 个路由成功 |
| 体积预算 | `pnpm bundle:check` | ✅ 1108 KB / 1500 KB |

### 1.2 优势项（保持不退化）

- 代码卫生接近满分：`any` 0 处、`TODO/FIXME` 0 条、`console.log` 0 条、`@ts-ignore` 0 条、`dangerouslySetInnerHTML` 0 处。
- 单文件均 ≤200 行（代码文件），TS strict 开启，设计 token 单一来源。
- i18n 键类型级约束（`TranslationKey` 联合类型）+ 11 语言叶子键一致性单测；原型链安全与插值安全已处理。
- localStorage 版本化 + schema 校验（`validateProgress` 过滤 NaN/非法日期），无 token/PII 落盘。
- CSP + 完整安全响应头已注入；Radix 原生焦点陷阱、`focus-visible`、`prefers-reduced-motion` 全局落地。
- 版本注入单一来源（`package.json` → `NEXT_PUBLIC_APP_VERSION` / `NEXT_PUBLIC_BUILD_ID` → 页脚 `#footer-version`）。

### 1.3 核心缺口（本次拆解来源）

**代码面已经很干净，短板集中在「上线运营面」**：法律合规文件、CI/CD 与质量门禁脚本可用性、线上错误监控、SEO 基础设施（sitemap/robots/manifest/JSON-LD/hreflang）、覆盖率与关键路径测试、i18n 架构（纯客户端 → 无法 URL 级 i18n 与 RTL）、以及根目录临时脚本与产物的仓库卫生。

---

## 2. P0 · 阻断上线（正式发布前必须闭环）

### 2.1 法律与合规

> 本组任务已于 v5.2.35 全部完成并归档，见 [tasks-done.md](tasks-done.md)。


### 2.2 质量门禁与 CI/CD

> 本组任务已于 v5.2.35 全部完成并归档，见 [tasks-done.md](tasks-done.md)。


### 2.3 可观测性与错误兜底

> 本组任务已于 v5.2.35 全部完成并归档，见 [tasks-done.md](tasks-done.md)。


### 2.4 仓库卫生

> 本组任务已于 v5.2.35 全部完成并归档，见 [tasks-done.md](tasks-done.md)。


---


## 3. P1 · 高优先级（首个生产版本前完成）

### 3.1 SEO 与国际化架构


#### P1-7 · 新增 [locale] 路由骨架与重定向中间件 `i18n 架构` `待办（降级）`

- **现状**：i18n 为纯客户端（`locale-provider.tsx` 读 localStorage + 浏览器语言），URL 无语言前缀 → 架构上无法生成 hreflang、无法按语言分享、SSR 首屏语言恒为 `en`（`src/app/layout.tsx:65` 硬编码 `lang="en"`）。
- **目标**：新建 `src/app/[locale]/` 段；新增 `src/middleware.ts` 依据 `Accept-Language` / `NEXT_PUBLIC_LOCALE` cookie 做首访重定向到 `/{locale}/...`；`[locale]` 下用 `generateStaticParams` 枚举 11 语言。
- **验收**：① 首次访问 `/` 重定向到 `/en/`（按浏览器语言）；② 11 语言路径均可静态生成；③ 不破坏现有 `/learn`、`/practice` 深链（做 301 重定向）。
- **依赖**：P1-9
- **涉及**：`src/app/[locale]/`、`src/middleware.ts`

#### P1-8 · 迁移三个页面到 [locale] 段并生成 hreflang `i18n 架构` `进行中`

- **现状**：无 URL 级 i18n，无 `alternates.languages`。
- **目标**：`home` / `learn` / `practice` 三页迁入 `src/app/[locale]/`；根 `layout.tsx` 用 `[locale]` 生成 `alternates.languages`（11 语言 hreflang）与动态 `<html lang>`。
- **验收**：① 11 语言页面 HTML 中 `<html lang>` 正确；② `hreflang` 链接齐全且互相指回；③ 现有链接（页脚 / 导航）不出现 404。
- **依赖**：P1-7
- **涉及**：`src/app/[locale]/**`、`src/components/layout-client.tsx`、`src/components/nav-link.tsx`

#### P1-9 · 语言切换器改为 URL 导航 `i18n 架构` `进行中`

- **现状**：`src/components/locale-toggle.tsx` 切换后写 localStorage 并改 `document.documentElement.lang`，URL 不变（无法分享特定语言页面）。
- **目标**：切换语言时导航到对应 `/{locale}` 路径并保留当前页面段；localStorage 仅作为「首选语言」用于首访重定向。
- **验收**：① 切换语言后 URL 变化且内容随之切换；② 刷新后语言保持；③ 首选语言仍影响新访客首跳。
- **依赖**：P1-7
- **涉及**：`src/components/locale-toggle.tsx`、`src/components/locale-provider.tsx`

### 3.2 性能


#### P1-11 · 11 语言词典改为按需动态加载 `性能` `待办（降级）`

- **现状**：`src/lib/i18n/index.ts:2-12` 静态 import 全部 11 个翻译文件，`:37-49` 打进 `translations` 常量 → 11 语言文案无条件进入客户端包（约 2156 行文案）。
- **目标**：改为动态 `import()` 按需加载当前语言；`TranslationKey` 类型仍由 `en` 静态导出推导（类型安全不降级）。
- **验收**：① 首屏只下载当前语言文案；② 11 语言键一致性单测仍通过；③ 切换语言有加载态且不闪烁。
- **涉及**：`src/lib/i18n/index.ts`、`src/components/locale-provider.tsx`、`src/lib/i18n/translate.ts`

#### P1-12 · 笔顺数据与重型组件懒加载 `性能` `待办（降级）`

- **现状**：`src/lib/stroke-order-data.ts`（12.28 KB / 12 汉字 SVG path + medians）静态 import 进客户端包；`src/components/practice/writing-canvas.tsx`（191 行）等重型组件无懒加载；全仓 `next/dynamic` 0 命中。
- **目标**：笔顺数据按字符动态 import；`writing-canvas` / `writing-dialog` / `stroke-order-demo` 用 `next/dynamic` + `ssr: false` 拆分。
- **验收**：① 首页首屏 JS 体积下降（用 bundle analyzer 前后对比）；② 弹窗打开无明显延迟；③ 拆分后各文件 ≤200 行。
- **依赖**：P1-13
- **涉及**：`src/lib/stroke-order-data.ts`、`src/components/practice/writing-dialog.tsx`、`src/components/learn/character-detail.tsx`


### 3.3 测试

> 本组任务（P1-15/16/17/18/19/20/21/22/23）已全部完成并归档。

### 3.4 无障碍

#### P1-24 · 移动抽屉焦点陷阱与焦点返回 `a11y` `待办（降级）`

- **现状**：`src/components/mobile-nav.tsx:61-70` 自绘 `role="dialog" aria-modal="true"`，无 Tab 焦点环绕；打开时仅 `closeButtonRef.current?.focus()`（`:23-27`）；关闭后焦点不返回汉堡按钮（`src/components/layout-client.tsx:62-71` 按钮无 ref）。
- **目标**：实现焦点陷阱（Tab / Shift+Tab 环绕 + 背景内容 `inert`），打开时记录触发元素、关闭后焦点归还。
- **验收**：① 键盘 Tab 不会逃出抽屉；② 关闭后焦点回到汉堡按钮；③ 抽屉有 `id="mobile-nav-drawer"`。
- **涉及**：`src/components/mobile-nav.tsx`、`src/components/layout-client.tsx`

#### P1-25 · Canvas 书写练习键盘/读屏替代路径 `a11y` `待办（降级）`

- **现状**：`src/components/practice/writing-canvas.tsx:173-184` 的 `<canvas role="img">` 仅响应指针事件，无键盘绘制、无表单替代 → 核心功能对键盘 / 读屏用户完全不可用。
- **目标**：新增可访问替代路径（键盘方向键逐笔描绘的简化模式，或「用文本输入笔画序列」的替代练习），canvas 加 `aria-describedby` 说明操作方式。
- **验收**：① 纯键盘可完成一次书写练习；② 读屏可获知当前汉字与目标笔画；③ 替代路径与指针路径共享同一评分逻辑。
- **涉及**：`src/components/practice/writing-canvas.tsx`、`src/components/practice/writing-canvas-parts.tsx`


#### P1-27 · 测验选项暴露选中状态 `a11y` `待办（降级）`

- **现状**：`src/components/practice/quiz-dialog.tsx:63-78` 选项按钮无 `aria-pressed` / `role="radio"`，选中态仅靠颜色传达。
- **目标**：选项组加 `role="radiogroup"`，单选项加 `role="radio"` + `aria-checked`，选中态同时用边框/图标而非仅颜色。
- **验收**：① 读屏可读出当前选中项；② 颜色对比之外有第二视觉线索。
- **涉及**：`src/components/practice/quiz-dialog.tsx`

#### P1-28 · a11y 文案 i18n 化（8 处硬编码） `a11y/i18n` `进行中`

- **现状**：8 处硬编码 aria-label 未走 i18n —— `src/components/ui/dialog.tsx:79`（`Close`）、`:118`（`Close`）、`src/components/toast.tsx:79`（`Close notification`）、`:124`（`Notifications`）、`src/components/locale-toggle.tsx:81`（`Change language (current: ...)`）、`:94`（`Select language`）、`src/components/learn/stroke-order-demo.tsx:73`（`笔顺演示`）、`src/components/practice/writing-canvas.tsx:177`（`书写练习画布...`）；与 `README.md:124`「所有用户可见文本必须使用 i18n 翻译」冲突。
- **目标**：11 语言新增 `common.close` / `common.closeNotification` / `common.notifications` / `common.changeLanguage` / `common.selectLanguage` / `learn.strokeDemoLabel` / `practice.canvasLabel` 键，逐处替换。
- **验收**：① 8 处全部改用 `t()`；② `i18n.test.ts` 通过；③ 翻译文件仍 ≤200 行（超出则按 P0-9 方式拆子模块）。
- **涉及**：`src/components/ui/dialog.tsx`、`src/components/toast.tsx`、`src/components/locale-toggle.tsx`、`src/components/learn/stroke-order-demo.tsx`、`src/components/practice/writing-canvas.tsx`、`src/lib/i18n/translations/*.ts`

#### P1-29 · 测验 meaning 字段 i18n 化（12 条） `i18n` `进行中`

- **现状**：`src/app/practice/page.tsx:21-32` 的 `meaning: 'One'/'Two'/'Person'…` 共 12 条英文硬编码，经 `src/components/practice/quiz-dialog.tsx:58` 直接展示给所有语言用户。
- **目标**：将 12 条释义移入 11 语言词典（`practice.meanings.*`），页面按当前 locale 解析。
- **验收**：① 切换语言时释义随之变化；② 释义不再硬编码于 tsx；③ `i18n.test.ts` 通过。
- **涉及**：`src/app/practice/page.tsx`、`src/components/practice/quiz-dialog.tsx`、`src/lib/i18n/translations/*.ts`

### 3.5 安全


#### P1-32 · EdgeOne 部署补齐安全响应头 `安全/部署` `待办（降级）`

- **现状**：`edgeone.json:6-16` 仅配置 `/_next/static/*` 的 Cache-Control，未确认平台是否透传 `next.config.mjs` 的安全响应头。
- **目标**：在 `edgeone.json` 中显式声明 CSP 等关键安全头，或在 `docs/05-deployment.md` 明确「平台透传验证方法 + 兜底配置」。
- **验收**：① EdgeOne 线上 `curl -I` 能看到 CSP 与安全头；② 文档记录验证命令与截图。
- **涉及**：`edgeone.json`、`docs/05-deployment.md`

### 3.6 RTL（阿拉伯语）支持


#### P1-35 · 布局改用逻辑属性 `RTL` `进行中`

- **现状**：布局大量硬编码 LTR 方向属性（如 `src/components/mobile-nav.tsx:66` 的 `right-0`、`ml-`/`mr-`/`pl-`/`pr-`）。
- **目标**：把方向相关类名改为 `ms-` / `me-` / `ps-` / `pe-` / `start-` / `end-` / `text-start` / `text-end`。
- **验收**：① 阿拉伯语下抽屉从右侧出现、文本与图标方向正确；② 无 `ml-/mr-/pl-/pr-/left-/right-` 残留（装饰性定位除外）。
- **依赖**：P1-34
- **涉及**：`src/components/mobile-nav.tsx`、`src/components/layout-client.tsx`、`src/app/globals.css`、`src/app/styles/*.css`

#### P1-36 · RTL 下书写练习与笔顺方向适配 `RTL` `待办（降级）`

- **现状**：`src/components/practice/writing-canvas.tsx` 与 `src/components/learn/stroke-order-demo.tsx` 的坐标与 SVG 未考虑 RTL 下的书写方向与镜像。
- **目标**：明确 RTL 下汉字笔顺动画不镜像（汉字本身 LTR 书写），但周边 UI 文案与布局镜像；SVG / Canvas 坐标保持字形正确。
- **验收**：阿拉伯语下笔顺动画与书写评分仍正确（不出现镜像字形）。
- **依赖**：P1-33
- **涉及**：`src/components/practice/writing-canvas.tsx`、`src/components/learn/stroke-order-demo.tsx`

#### P1-37 · 新增 release.yml 自动发布 GitHub Releases `CI/发布` `待办`

- **现状**：`.github/workflows/` 仅有 `ci.yml`（quality / coverage / e2e）与 `deploy.yml`（Vercel 生产部署），无 Release 发布工作流；发版打 Tag 后需手工在 GitHub 网页上创建 Release，存在漏发、漏写说明的风险。
- **目标**：按 [git-workflow.md](git-workflow.md) §6.1 新增 `.github/workflows/release.yml`，实现「**所有工作流全绿后自动发布 Releases**」：
  - 触发：`on: push: tags: ['v*']` + `workflow_dispatch`（手动兜底）。
  - 前置门禁：`release` job 必须在本次 tag 触发的 CI 全部 job（quality / coverage / e2e）成功后执行；发布前用 `gh api` 校验同一 commit SHA 在 `main` 上最近一次 `deploy.yml` 运行结论为 `success`（Deploy 因未配置 Secrets 被跳过时视为可发布）。
  - 发布内容：用 `softprops/action-gh-release`（或 `gh release create`）创建 Release，标题 `vX.Y.Z`，正文取 `CHANGELOG.md` 中该版本小节；附件为 GitHub 自动生成的源码归档。
- **验收**：① 推送 tag `vX.Y.Z` 且 CI 全绿 + Deploy 绿 → 自动创建同名 Release，正文与 CHANGELOG 一致；② 任一 job 失败或 Deploy 非 `success` → 不发布且在 Action 日志中给出原因；③ `workflow_dispatch` 手动触发可用；④ `release.yml` 单文件 ≤200 行，权限最小化（`contents: write`）。
- **依赖**：现有 `ci.yml` / `deploy.yml`（已就绪）
- **涉及**：`.github/workflows/release.yml`

---

## 4. P2 · 中优先级（可排期）

#### P2-1 · 移除 Tailwind v4 死配置 `构建` `待办（降级）`

- **现状**：`tailwind.config.ts`（5.36 KB）存在，但 v4 CSS-first 配置需 `@config` 指令才生效 —— `src/app/globals.css:1-6` 无 `@config`；实际 token 全在 `globals.css:11-90` 的 `@theme`。
- **实测证据（2026-11-04 清理批次）**：构建产物 `.next/static/chunks/*.css`（64.6 KB 主 CSS）中**有** `--color-primary`、`@keyframes brushStroke`，但**缺失** `--color-ink-500` / `.text-ink-900` / `.bg-vermilion-50` / `--shadow-ink-lg` / `--animate-brush-stroke`——这些 token 仅存在于 `tailwind.config.ts`；仓内 24 个文件使用 ink/vermilion 色类、14 个文件使用 `shadow-ink*` 与 `animate-*`，故「直接删除」虽不改产物，但会让这批类持续缺失。
- **目标**：删除 `tailwind.config.ts`，或补 `@config` 使其生效并消除双源 token。**建议**：先把 `ink` / `vermilion` 色阶、`shadow-ink*` / `shadow-vermilion-glow`、`animate-*`、`paper-texture` 迁入 `globals.css` 的 `@theme`（与 P2-18 合并做），再删除该文件；避免"删掉即永久缺失"。
- **验收**：① 构建产物 CSS 不变；② token 只有一个来源。
- **涉及**：`tailwind.config.ts`、`src/app/globals.css`


#### P2-5 · 拆分客户端边界，提升 RSC 比例 `架构/性能` `待办（降级）`

- **现状**：三个页面全部 `'use client'`（`src/app/page.tsx:2`、`src/app/learn/page.tsx:2`、`src/app/practice/page.tsx:2`），零 RSC/SSG。
- **目标**：把纯展示区块（hero、feature-card、stats-card、页脚、导航）抽为 Server Component，仅交互区块保留 `'use client'`。
- **验收**：① 首屏 HTML 含实际内容（利于 SEO 与首屏）；② 交互行为无回归；③ 各文件仍 ≤200 行。
- **涉及**：`src/app/page.tsx`、`src/app/learn/page.tsx`、`src/app/practice/page.tsx`、`src/components/feature-card.tsx`、`src/components/stats-card.tsx`

#### P2-6 · 引入结构化日志 `运维` `待办（降级）`

- **现状**：全 src 仅 `src/app/error.tsx:15` 一条 `console.error`，无 request-id、无日志分级。
- **目标**：新增 `src/lib/logger.ts`（`level` + `context` 字段，dev 输出格式化文本、prod 输出 JSON），替换散落的 `console.*`。
- **验收**：① 日志含级别与上下文；② 生产不输出调试级日志。
- **依赖**：P0-21
- **涉及**：`src/lib/logger.ts`、`src/app/error.tsx`


#### P2-11 · toast 模块级单例改 Context `架构` `待办（降级）`

- **现状**：`src/components/toast.tsx:89-98` 为模块级全局单例，多实例 / SSR / 并发场景受限。
- **目标**：改为 `ToastProvider` + `useToast()` Context，容器由 Provider 渲染。
- **验收**：① 多 Provider 实例互不干扰；② 现有调用点行为一致。
- **涉及**：`src/components/toast.tsx`、`src/components/layout-client.tsx`

#### P2-12 · 依赖版本钉住策略 `构建/安全` `待办（降级）`

- **现状**：`package.json` 中 `react` / `lucide-react` / `radix-ui` / `tailwindcss` 等使用 `^` 范围；`pnpm-workspace.yaml` overrides 仅钉住 14 个传递依赖补丁下限。
- **目标**：为运行时关键依赖显式钉住精确版本或收窄范围，并在 `docs/05-deployment.md` 记录升级策略与回滚方式。
- **验收**：① lockfile 与 `package.json` 约束一致；② 升级有回滚路径说明。
- **涉及**：`package.json`、`pnpm-workspace.yaml`、`docs/05-deployment.md`

#### P2-14 · 完善 PWA / 离线兜底 `PWA` `待办`

- **现状**：`metadata.json` keywords 含 "PWA"，但无 manifest（见 P1-3）、无离线兜底、无安装引导。
- **目标**：在 P1-3 基础上补离线页（`public/offline.html`）与「添加到主屏幕」引导组件（仅 PWA 环境显示）。
- **验收**：① 断网访问可加载离线页；② 引导仅在可安装时出现。
- **依赖**：P1-3
- **涉及**：`public/offline.html`、`src/components/pwa-install-prompt.tsx`

#### P2-17 · 学习进度导出/导入与重置 `产品` `待办`

- **现状**：`src/lib/storage.ts` 仅存进度，无导出/导入/清除入口；用户换设备即丢数据。
- **目标**：新增 `src/lib/progress-transfer.ts`（JSON 导入导出 + 校验 + 版本迁移）与设置面板入口。
- **验收**：① 导出文件可被导入还原；② 导入非法数据不破坏现有进度；③ 有「清除进度」二次确认。
- **涉及**：`src/lib/progress-transfer.ts`、`src/hooks/use-progress.ts`

#### P2-18 · 动画令牌单一来源收敛 `代码质量` `待办`

- **现状**：动画相关定义散落于 `src/app/styles/keyframes.css`、`src/app/globals.css` 的 `@theme`、`tailwind.config.ts`（死文件）、`src/app/page.tsx:34` 的内联 `style={{animation:...}}`；`animate-*` 工具类因 `tailwind.config.ts` 未生效而未进入产物 CSS（实测 `.animate-brush-stroke` 缺失），当前仅 `keyframes.css` 的裸 `@keyframes` 生效。
- **目标**：收敛为单一来源（`@theme` + `keyframes.css`），删除内联硬编码动画名。
- **验收**：① 动画名全部来自 token；② 视觉表现无变化。
- **依赖**：P2-1
- **涉及**：`src/app/page.tsx`、`src/app/styles/keyframes.css`、`src/app/globals.css`

---

## 5. P3 · 低优先级（长期 / 可选）


#### P3-2 · i18n 译文质量审校流程 `i18n/质量` `进行中`

- **现状**：11 语言键一致性由单测保障，但译文质量（术语统一、语境正确）无流程约束。
- **目标**：新增 `docs/i18n-review.md` 描述审校清单（术语表、占位符、数字与单位、RTL 文本长度），并新增 `scripts/i18n-lint.mjs` 检查占位符集合一致与超长文案。
- **验收**：① 脚本可运行并报出问题；② 审校清单纳入 PR 检查表。
- **涉及**：`docs/i18n-review.md`、`scripts/i18n-lint.mjs`

---

## 6. 里程碑与剩余排期（2026-11-05 重排）

| 批次 | 目标 | 剩余任务 | 前置 / 说明 |
|------|------|---------|------------|
| **M1 · 测试与文档** | 补齐关键路径测试与文档全面同步 | P2-18, P3-2 | 覆盖率与 11 语言键校验基建已就绪；可立即执行 |
| **M2 · 架构独立里程碑** | URL 级 i18n、按需词典、懒加载、客户端边界收敛 | P1-7, P1-8, P1-9, P1-11, P1-12, P2-1, P2-5, P2-6, P2-11, P2-12 | 涉及 middleware / 边缘运行时与构建产物，需单独验证与回归 |
| **M3 · 体验与平台** | 无障碍深度适配、RTL 完整迁移、平台侧能力 | P1-24, P1-25, P1-27, P1-28, P1-29, P1-32, P1-35, P1-36, P1-37, P2-14, P2-17 | 部分需真实设备 / 部署平台 Secrets / 人工译文审校；P1-37 需真实 Tag 推送验证 |

> 三批合计 23 项，与 §0.1 概览一致。每批完成后按单一来源规则把条目移入 [tasks-done.md](tasks-done.md)，并同步 `CHANGELOG.md` 与全局版本展示位。
