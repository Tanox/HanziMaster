# 已完成任务归档 · Tasks Done

> 文档版本：v5.2.43（与项目版本同步，权威版本见 `package.json`）
> 最近归档：2026-11-07 17:30（UTC+8）

## 说明

- 本文件归档 `docs/tasks.md` 中**已完成**的任务及其实现要点，作为唯一完成记录。
- 新增 / 进行中任务仍记录于 [tasks.md](tasks.md)；任务完成后移入本文件并注明完成版本。

## 归档（2026-11-04 批次）

| ID | 任务 | 分类 | 完成版本 | 实现要点 |
|----|------|------|---------|---------|
| T1 | 空状态 / 错误状态设计稿与代码实现 | UI/UX | v5.2.31 | `src/components/state/state-views.tsx`（EmptyState / ErrorState / LoadingSpinner）；全局 `src/app/error.tsx`、`not-found.tsx`、`loading.tsx`；学习页无选中时 EmptyState 兜底 |
| T2 | 焦点状态视觉增强 | UI/UX | v5.2.31 | `globals.css` 全局 `focus-visible`：2px `--color-ring` 描边 + 4px color-mix 光环（深色模式 38%） |
| T4 | React 组件与交互层测试 | 测试 | v5.2.31 | 安装 `@testing-library/react` / `jest-dom` / `user-event` / `jsdom`；新增 4 个测试文件（state-views / use-progress / use-pronunciation / character-grid），共 47 用例；vitest 环境切 jsdom，`vitest.setup.ts` 内存 Storage 兜底（规避 Node 24 实验性 localStorage getter 遮蔽）；`storage.ts` 改用 `window.localStorage` |
| T5 | 滚动出现动画扩展 | UI/UX | v5.2.31 | `reveal` 扩展至汉字网格与练习选项网格（复用既有 IntersectionObserver hook） |
| T6 | 移动端抽屉手势与触控区域 | UI/UX | v5.2.31 | `src/hooks/use-swipe-close.ts`（右滑 > 60px 关闭抽屉）；关闭 / 导航按钮保持 44px 触控目标 |
| T7 | 加载 / 反馈动画增强 | UI/UX | v5.2.31 | 路由级 `loading.tsx` 旋转指示；练习 / 测验 `use-haptic.ts` 震动反馈（正确 30ms / 错误 40-60-40ms）；按钮波纹为可选项未实现——按压反馈已由 button `active` 位移态覆盖 |
| T8 | 设计规范文档补充 | 文档 | v5.2.31 | `prototype/DESIGN_SPEC.md` 新增 §3.5「组件状态规范」（悬停 / 按压 / 禁用 / 焦点 / 选中 / 加载）与排版微调说明 |
| T9 | 键盘快捷键提示 | UI/UX | v5.2.31 | 学习页 ← / → 切换汉字（弹窗打开或组合键时忽略）+ `.kbd` 键位提示（11 语言 `learn.kbdHint`） |
| T10 | 卡片悬停微缩放 / 导航下划线 | UI/UX | v5.2.31 | 字符卡 `hover:scale-[1.03]`、`active:scale-[0.98]`；导航链接平滑下划线动画（origin-left scaleX） |
| T11 | 字符选择过渡 / 导航高亮平滑 | UI/UX | v5.2.31 | 详情面板按 `key` 重挂载重放 `animate-fade-in-elegant`；导航 active 下划线过渡 |
| T12 | color-mix 派生强调色 | UI/UX | v5.2.31 | `@theme` 新增 `--color-primary-hover / --color-primary-border`（color-mix 单一来源派生），字符卡 / 练习选项边框接入 |
| T13 | 排版微调 | UI/UX | v5.2.31 | h1–h3 统一 `-0.01em` 字间距；移动端（≤640px）小字号行高 ≥ 1.65 |
| T14 | 原型图增强 | 原型 | v5.2.31 | `wireframes.html` 新增 §3.5 状态可视化（强制态演示 / 状态组件 / 动画帧重播）+ 断点指示器（`wireframes-part2.css` / `wireframes-states.js`）；深色模式预览由既有 theme 切换支持 |
| T3 | 安全审计与修复（`pnpm audit --prod` 零漏洞） | 部署/安全 | v5.2.31 | `next` 16.2.9 → **16.4.4**（清零 16.2/16.3 系列 5 个 critical 公告）；`shadcn` 移至 devDependencies（切断 `systeminformation` critical 到生产路径）；`pnpm-workspace.yaml` overrides 钉住 14 个传递依赖补丁版下限（sharp / undici / vite / zod / js-yaml / fast-uri 等）；dev 工具链残留 moderate/low 不进入生产产物，随升级持续消化 |

> 以上为 2026-11-04 首批全部 14 项（T1–T14）的完成归档。

## 归档（2026-11-04 冗余文件清理批次）

| ID | 任务 | 分类 | 完成版本 | 实现要点 |
|----|------|------|---------|---------|
| P0-15 | 修复 security:audit 脚本（npm audit → pnpm audit） | 构建 | v5.2.33 | `security:audit` = `pnpm audit --prod --audit-level=high`、新增 `security:audit:dev` = `pnpm audit --audit-level=high`；`.github/SECURITY.md:40` 与 `docs/05-deployment.md:128` 命令同步；实测 `pnpm audit --prod` 0 漏洞 |
| P0-26 | 完善 scripts/ 测试运行器与产物目录 | 仓库卫生 | v5.2.33 | `scripts/run-tests.mjs` 支持 `--coverage` 透传、产物落 `reports/test-out.txt`；`scripts/check-line-count.mjs` 产物落 `reports/line-count.txt`；`.gitignore` 增 `/reports/`；`package.json` 新增 `test:run` / `check:lines` |
| P0-28 | 删除空 test/ 目录 | 仓库卫生 | v5.2.33 | 仓库根 `test/` 空目录已删除（E2E 目录预留改用 `e2e/`，见 P1-22） |

> 本批次为「项目冗余文件分析与清理」的执行结果：另删除 `i18n-add.mjs` / `sync-5231.mjs` / `audit-parse.mjs`（一次性迁移与解析脚本，能力已并入 `scripts/`）与 `test-out.txt` / `build-out.txt` / `build-err.txt` / `linecheck-result.txt` / `vitest-*.txt`（可再生产物）。

## 归档（2026-11-04 生产就绪度审查批次）

| ID | 任务 | 分类 | 完成版本 | 实现要点 |
|----|------|------|---------|---------|
| P0-25 | 删除根目录高危脚本 `deploy-fix.mjs` | 仓库卫生 | v5.2.32 | 该脚本硬编码 `V = '5.2.30'` 并会改写 `package.json` / `README` / `CHANGELOG`，误执行即污染版本号；已从仓库根删除。其版本同步能力由 P2-9（`scripts/sync-version.mjs`，版本号动态读取 `package.json`）承接 |
| P0-27 | 删除根目录审计与测试产物 JSON | 仓库卫生 | v5.2.32 | 删除 `audit-raw.json`（82.28 KB）、`audit-prod.json`（590 B）、`vitest-result.json`（18.3 KB，记录的是已过期的失败态 `success:false`）；实测基线为 Vitest 9 文件 / 47 用例全通过。产物落 `reports/` 由 P0-26 承接 |
| P0-14 | 修复 `pnpm lint` 脚本（`next lint` 已从 Next 16 移除） | 构建 | v5.2.32 | `package.json` 的 `"lint": "next lint"` → `"eslint ."`（覆盖 `src/` + `prototype/` + `scripts/`）；实测 `node node_modules/eslint/bin/eslint.js .` → 0 error / 0 warning，退出码 0 |

> 本批次由生产就绪度审查（P0 清单）派生；P0-15（`security:audit` 拆分生产/全量）、P0-26（scripts/ 测试运行器完善与 `reports/` 产物目录）仍在 `tasks.md` 中处于「进行中」。

## 归档（2026-11-05 任务推进批次 · v5.2.35）

本批次共完成 **51 项**。逐项实现要点、验收数字与依赖变更见 [CHANGELOG.md](../CHANGELOG.md) `v5.2.35` 小节；
本表保留 ID / 任务 / 分类 / 完成版本索引，不重复搬运描述。

| ID | 任务 | 分类 | 完成版本 |
|----|------|------|---------|
| P0-1 | 新增 MIT LICENSE 文件 | 法律 | v5.2.35 |
| P0-2 | package.json 补 license 字段 | 法律 | v5.2.35 |
| P0-3 | 新增 NOTICE 第三方许可声明 | 法律 | v5.2.35 |
| P0-4 | 笔顺数据来源署名与许可标注 | 法律 | v5.2.35 |
| P0-5 | 新增隐私政策内容模块 | 法律 | v5.2.35 |
| P0-6 | 新增服务条款内容模块 | 法律 | v5.2.35 |
| P0-7 | 新增 /privacy 路由页 | 法律 | v5.2.35 |
| P0-8 | 新增 /terms 路由页 | 法律 | v5.2.35 |
| P0-9 | i18n 新增 legal 区块（11 语言） | 法律/i18n | v5.2.35 |
| P0-10 | 新增追踪同意状态模块 | 法律 | v5.2.35 |
| P0-11 | 新增 Cookie 同意横幅组件 | 法律/UI | v5.2.35 |
| P0-12 | GA4 接入同意门控 + GA ID 走 env | 法律/安全 | v5.2.35 |
| P0-13 | 页脚注入法律链接与免责声明 | 法律/UI | v5.2.35 |
| P0-16 | 新增 GitHub Actions CI 工作流 | CI | v5.2.35 |
| P0-17 | CI 增加覆盖率门禁 | CI/测试 | v5.2.35 |
| P0-18 | 新增部署工作流 | CI/部署 | v5.2.35 |
| P0-19 | 新增 Dependabot 依赖更新配置 | CI | v5.2.35 |
| P0-20 | 新增 .env.example | 构建 | v5.2.35 |
| P0-21 | 接入错误监控（Sentry） | 运维 | v5.2.35 |
| P0-22 | 新增 global-error.tsx 根级错误兜底 | 运维/UI | v5.2.35 |
| P0-23 | 为 /learn、/practice 新增路由级 error.tsx | 运维/UI | v5.2.35 |
| P0-24 | 新增健康检查端点 | 运维 | v5.2.35 |
| P1-1 | 新增 sitemap.ts | SEO | v5.2.35 |
| P1-2 | 新增 robots.ts | SEO | v5.2.35 |
| P1-3 | 新增 manifest.ts | SEO/PWA | v5.2.35 |
| P1-4 | 补全根布局 metadata | SEO | v5.2.35 |
| P1-5 | 为 /learn、/practice 新增页面级 metadata | SEO | v5.2.35 |
| P1-6 | 新增 JSON-LD 结构化数据 | SEO | v5.2.35 |
| P1-10 | radix-ui 整包导入改按需子包 | 性能 | v5.2.35 |
| P1-13 | 接入 @next/bundle-analyzer | 性能 | v5.2.35 |
| P1-14 | 接入体积预算门禁 | 性能/CI | v5.2.35 |
| P1-15 | vitest 覆盖率配置与阈值 | 测试 | v5.2.35 |
| P1-16 | storage 模块单测 | 测试 | v5.2.35 |
| P1-20 | locale-provider / theme-provider 单测 | 测试 | v5.2.35 |
| P1-21 | toast 组件单测 | 测试 | v5.2.35 |
| P1-22 | 接入 Playwright E2E 冒烟测试 | 测试 | v5.2.35 |
| P1-23 | 接入 axe-core 自动化 a11y 测试 | 测试/a11y | v5.2.35 |
| P1-26 | listbox roving tabindex 规范 | a11y | v5.2.35 |
| P1-30 | CSP 补强 | 安全 | v5.2.35 |
| P1-31 | 移除废弃 X-XSS-Protection 响应头 | 安全 | v5.2.35 |
| P1-33 | 新增方向性判断模块 | i18n/RTL | v5.2.35 |
| P1-34 | LocaleProvider 同步 document.dir | i18n/RTL | v5.2.35 |
| P2-2 | 移除 next.config.mjs 无效 images.remotePatterns | 构建 | v5.2.35 |
| P2-3 | 移除 layout.tsx 冗余 preconnect | 性能 | v5.2.35 |
| P2-4 | 修复 useTheme undefined 检查死代码 | 代码质量 | v5.2.35 |
| P2-7 | README 免责声明与数据准确性声明 | 文档/法律 | v5.2.35 |
| P2-9 | 新增版本戳同步脚本 | 工具 | v5.2.35 |
| P2-10 | 补齐 ui/* 组件版本戳 | 代码质量 | v5.2.35 |
| P3-1 | format 脚本覆盖根目录 .mjs | 工具 | v5.2.35 |
| P3-3 | 社区文件与法律文件互链 | 文档 | v5.2.35 |
| P3-4 | 原型与实现一致性回归检查 | 工具 | v5.2.35 |


> 归档后 `tasks.md` 仅保留未完成任务；本批次实测基线：19 个测试文件 / 77 用例、覆盖率 92.77% 行 / 90.19% 函数、
> 生产构建 10 个路由全部成功、体积 1108 KB（预算 1500 KB）。
> 注：v5.2.36–v5.2.37 期间测试文件增至 24 个（writing-canvas-* 拆分、双 quiz-dialog 等），上数为 v5.2.35 快照，不再刷新。

## 归档（2026-11-07 文档同步批次）

| ID | 任务 | 分类 | 完成版本 | 实现要点 |
|----|------|------|---------|---------|
| P2-8 | 同步 docs 文档与实现 | 文档 | v5.2.37 | 全量文档-代码一致性审查：`01-overview`（目录树 / 依赖表 / env 表 / CI 与法律页）、`02-architecture`（安全头清单、路由表、测试数）、`03-development`（命令表补 8 脚本、env 指引）、`04-api-reference`（组件边界、`Translations` 类型、`resolvedTheme`、扩展模块、`/api/health`）、`06-testing`（24 个测试文件清单、E2E 章节、覆盖率阈值现状）、`alignment-checklist`（现状全面刷新）、双 README（脚本表、目录树、技术栈、页面表、env）；另修 `dependabot.yml` 失效 pattern、`SECURITY.md` 联系方式、token 术语与 `--duration-*` 命名。验收：文档所有命令在 `package.json` scripts 中存在且路径引用有效。 |
| P1-17 | 描红判定算法单测 | 测试 | v5.2.37 | 三个测试文件实测通过：`writing-canvas-utils.test.ts`（scoreStroke / judgeUserStroke 命中判定、容差边界、空笔画、坐标越界、drawHint）、`writing-canvas-drawing.test.ts`、`writing-canvas-geometry.test.ts`。覆盖率实测 `writing-canvas-utils.ts` **行覆盖 100%**（验收 ≥90%），分支 97.72%。 |
| P1-18 | learn 测验流程单测 | 测试 | v5.2.37 | `src/components/learn/__tests__/quiz-dialog.test.tsx` 实测通过：打开弹窗、输入拼音、答对/答错分支、得分回写 `useProgress`、关闭重置。 |
| P1-19 | practice 测验流程单测 | 测试 | v5.2.37 | `src/components/practice/__tests__/quiz-dialog.test.tsx` 实测通过：4 选 1 选择、正确率统计、答错提示、结果回写。 |

> 归档实测基线（2026-11-07，v5.2.37）：`pnpm install` 重建依赖后实测——Vitest **24 文件 / 137 用例**全通过；覆盖率 **93.88% 行 / 93.88% 语句 / 91.8% 函数 / 94.65% 分支**（阈值 80/70/80/80 通过）；`tsc --noEmit` 0 error；ESLint 0 error / 0 warning；`check:lines` / `i18n:lint` / `version:check` 全绿。

## 归档（2026-11-07 M1 收尾批次 · v5.2.38）

| ID | 任务 | 分类 | 完成版本 | 实现要点 |
|----|------|------|---------|---------|
| P2-15 | 404 / 错误页 noindex | SEO | v5.2.38 | `src/app/not-found.tsx` 拆为 Server 外壳（导出 `metadata.robots = { index: false, follow: false }`）+ 新增 Client 内核 `src/components/not-found-client.tsx`（交互逻辑不变）。`global-error.tsx` 为 Client Component，按 Next.js 规范无法导出 `metadata`，且 5xx 响应本身不被索引，已作降级说明。 |
| P2-16 | 发音能力降级提示 | UX/i18n | v5.2.38 | `use-pronunciation.ts` 新增 `speechSupported` 三态返回值（null = 检测中，挂载后 `useEffect` 检测，避免 hydration mismatch）；`character-detail.tsx` 在不支持或播放失败时禁用发音按钮并以 `role="status"` 展示可读提示；新增 i18n 键 `learn.pronunciationUnavailable`（11 语言同步，繁中用台湾用语「支援」），`i18n:lint` 与键一致性测试通过。 |
| P2-13 | loading.tsx 骨架屏细化 | UI/UX | v5.2.38 | 新增 `src/app/learn/loading.tsx`（标题 + 12 字卡网格，网格断点与 `character-grid.tsx` 完全一致 + 详情大卡）与 `src/app/practice/loading.tsx`（标题 + 双选项卡 + 周进度卡）骨架，均用语义 token + `animate-pulse`、`aria-hidden`；根 `loading.tsx` 保留旋转指示兜底。 |

> 归档实测基线（2026-11-07，v5.2.38）：Vitest **24 文件 / 138 用例**全通过（新增 `speechSupported` 用例）；`tsc --noEmit` 0 error；ESLint 0 error / 0 warning；`check:lines` / `i18n:lint` 全绿。

## 归档（2026-11-07 根目录卫生批次 · v5.2.40）

| ID | 任务 | 分类 | 完成版本 | 实现要点 |
|----|------|------|---------|---------|
| P0-29 | 根目录清洁度门禁与产物目录规范 | 仓库卫生 | v5.2.40 | 新增 `scripts/check-root-clean.mjs`（白名单制门禁，结果写 `reports/root-clean.txt`）+ `package.json` `check:root`；CI `quality` job 首步执行；`.gitignore` 兜底 `*.out` / `audit-*.json` / `*-result.json`；`coding-standards.md` §4 增产物目录强制说明、§11 门禁表加行；`03-development.md` §3 与两份 README 脚本表同步。配套将「脚本产物统一落 `reports/`、一次性脚本放 `scripts/`」固化为全局用户规则（`code-quality.mdc`） |

> 归档实测（2026-11-07，v5.2.40）：`check:root` → `root clean`；`version:check` → `v5.2.40 in sync`。

## 归档（2026-11-07 仓库页面优化批次 · v5.2.43）

| ID | 任务 | 分类 | 完成版本 | 实现要点 |
|----|------|------|---------|---------|
| P2-1 | 移除 Tailwind v4 死配置并迁移色阶 token | 构建/设计系统 | v5.2.43 | 死配置 `tailwind.config.ts`（v4 需 `@config` 才生效，从未引入）导致 `ink` / `vermilion` / `indigo` 色阶与 `shadow-ink*` 阴影从未进入产物 CSS——主页 hero CTA、导航 Logo 渐变、强调文字等在浅色模式白底白字不可见。修复：色阶与阴影迁入新增 `src/app/styles/theme-colors.css` 的 `@theme`；删除 `tailwind.config.ts`；`components.json` `tailwind.config` 置空；产物 CSS 实测含 `.bg-vermilion-500` / `.text-ink-900` / `.shadow-ink-lg` / `.from-vermilion-500`；10 处文档引用同步为单一来源表述 |

> 归档实测（2026-11-07，v5.2.43）：`next build` 成功；页面截图核实浅色/深色模式视觉恢复设计稿效果（`docs/assets/screenshots/`）。
