# Changelog

## [5.2.9] - 代码清理与规范对齐
### Code Quality
- 删除零引用的死代码组件 `src/components/ui/tabs.tsx`（`Tabs`/`TabsList`/`TabsTrigger`/`TabsContent` 全项目无任何消费方）。
- 移除 `package.json` 中未使用的死依赖 `@google/generative-ai`，与「应用无 AI 后端」事实及 openspec 规范保持一致。
- 修复 `src/components/practice/writing-canvas.tsx` 画布 `aria-label` 汉字重复的可用性问题（`${character} ${character} 书写练习画布` → `${character} 书写练习画布`）。
- `src/components/layout-client.tsx` 的 `header`/`footer` 补充语义化 id（`site-header`/`site-footer`），便于调试定位与可访问性锚点。
- 全站版本号统一至 v5.2.9（package.json、metadata.json、README/README_EN、en.ts footer）。

## [5.2.8] - GA 仅生产环境上报
### Feature
- `src/components/google-analytics.tsx` 新增 `ENABLE_ANALYTICS` 开关：`process.env.NODE_ENV === 'production'` 时才注入 gtag.js，开发/预览/构建期不再向 GA 发送数据，避免污染统计。
- 全站版本号统一至 v5.2.8（package.json、metadata.json）。

## [5.2.7] - 接入 Google Analytics（G-TZG68T8J31）
### Feature
- 新增 `src/components/google-analytics.tsx`，通过 `next/script` 在 `<head>` 注入 gtag.js 并初始化衡量 ID `G-TZG68T8J31`。
- `src/app/layout.tsx` 在 `<head>` 渲染 `GoogleAnalytics` 组件，全局收集页面访问数据。
- `next.config.mjs` CSP 放行 `googletagmanager.com` / `google-analytics.com` 的 script 与 connect 来源，确保严格 CSP 下脚本可加载。
- 全站版本号统一至 v5.2.7（package.json、metadata.json）。

## [5.2.6] - 适配腾讯云 EdgeOne Pages（Node 24.11.0）
### Chore
- 新增 `edgeone.json` 声明 EO Pages 部署配置（框架 nextjs、构建命令、Node 24.11.0 运行时、静态资源长缓存头），替代 Vercel 专用的 `vercel.json` 缓存策略。
- `.nvmrc` 精确匹配 EO Pages 运行时：`24.5.0` → `24.11.0`，避免本地/CI 与部署运行时版本漂移。
- `package.json` `engines.node` 收紧至 `>=24.11.0`，与 EO Pages 运行时对齐。
- 全站版本号统一至 v5.2.6。

## [5.2.5] - 编译修复与规范对齐
### Bug Fixes
- 修复 11 个 i18n 翻译文件 `writingDesc` 行尾缺失逗号导致的 TS1005 编译失败（含 fr.ts 未转义单引号 `l'écriture`）；项目此前完全无法编译构建。
- `src/app/layout.tsx` metadata 移除失实的 "AI-Powered" 标题与 'AI' keyword，改为真实功能描述（笔顺练习、自适应测验）。
- `next.config.mjs` 生产 CSP `connect-src` 移除残留的 `generativelanguage.googleapis.com` 白名单。

### Code Quality
- `src/lib/storage.ts` 移除 `console.warn`，localStorage 写入异常改为静默失败以符合编码规范（无 console.*）。
- 为关键 DOM 容器补充语义化 id（home-page/hero-section/features-section/learn-page/practice-page/character-grid/character-detail/writing-canvas/weekly-progress/practice-options/stats-card/quiz-dialog/theme-toggle/locale-toggle/mobile-nav/toast-container），便于调试定位与可访问性。
- 全站版本号统一至 v5.2.5（package.json、metadata.json、README/README_EN、openspec 文档头注释、源文件头注释）。

## [5.2.4] - 规范与代码一致性审查修复
### Documentation
- 同步全部版本呈现位至 v5.2.4：package.json、metadata.json、README/README_EN 标题与页脚、prototype.html 头注、openspec 文档版本戳（01-overview/index/03/04/06/alignment-checklist/coding-standards/ui-ux-review-report）。
- `openspec/04-api-reference.md` 修复严重脱节：主题色由过时 emerald `#10b981` 更正为朱砂红 `--primary #c0392b` / 靛蓝 `--accent #3f51b5`；字体表补 `--font-display`(Playfair Display)/`--font-heading`；暗色模式由 `dark:` 前缀更正为 `.dark` 类；CSS 变量名 `--primary` 对齐 globals.css；翻译对象结构 §1.5 对齐代码实际键（home/practice 节点）；NavLink 活跃高亮色由绿色更正为朱砂红。
- `openspec/06-testing.md` 修正误导：明确项目当前尚未接入自动化测试框架（无 jest 依赖、无 test 脚本），补充 §10 测试基础设施接入蓝图，避免开发者误跑 `npm test`。
- `openspec/03-development.md` 暗色模式规范对齐 `.dark` 类方案并补充设计令牌；版本同步位置清单补全 metadata/README/prototype/展示位。
- `openspec/alignment-checklist.md` 头版本同步，保留历史快照表。

### Code Quality
- `src/app/learn/page.tsx` Tailwind 4 规范：`:bg-gradient-to-b` → `bg-linear-to-b`。
- `src/app/page.tsx` 头注释版本戳同步至 v5.2.4。

## [5.2.3] - 下架 AI 虚假声明与健壮性修正
### Bug Fixes
- 下架全站「AI 驱动 / Gemini 实时反馈」虚假声明：README/README_EN、metadata.json keywords、11 语言 i18n 文案、proxy.ts 生产 CSP 的 Gemini 域名白名单，均改为与代码行为一致的真实功能描述（笔顺指引、结构提示、引导式练习）。
- 移除 `.env.example` 的 `GEMINI_API_KEY` 模板与 README「配置 AI」段落。

### Code Quality
- `src/app/learn/page.tsx` 移除内联 `speak` 实现，统一使用 `usePronunciation` hook。
- `src/hooks/use-progress.ts` 新增 `validateProgress` 运行时 schema 校验，过滤被篡改/旧版 localStorage 数据导致的非法字段。
- `src/components/practice/writing-canvas.tsx` 画布补充 `role="img"` 与动态 `aria-label`，改善无障碍。
- 删除 3 份基于旧架构（Next.js 15 / `next.config.js` / `responsecsp` 等）的失实安全审查报告；`code-review-report.md` 追加第三轮审查结论。

## [5.2.2] - 文档完善与一致性修正
### Documentation
- 中英文 README 结构对齐：中文补全「环境要求表格」「环境变量表格」「生产构建」「项目结构」「开发指南」章节；英文 Features/Core Pages 与实际功能对齐（移除偏离的 Adaptive Learning / Etymology & Culture 描述）。
- 新增 `CONTRIBUTING.md` 与 `CONTRIBUTING_EN.md` 贡献指南（开发环境、工作流、提交规范、版本管理、代码规范摘要）。
- 更新 `docs/PROJECT_STRUCTURE.md` 目录树：修正路径前缀、补全 `src/hooks`、`src/proxy.ts`、`components/learn|practice|ui` 子目录，原型位置改为 `prototype/`，同步文件统计与日期。
- 修正 `openspec/03-development.md` Node.js 版本要求 `>= 20.11.0` → `>= 24.5.0`，与 package.json / .nvmrc 一致。

### Docs & Versioning
- 同步 package.json、metadata.json 至 v5.2.2；README/README_EN 版本戳更新至 v5.2.2。

## [5.2.1] - i18n 类型安全与死代码清理
### Bug Fixes
- 修复 `practice/writing-dialog.tsx` 使用不存在的 i18n 键 `practice.writeTitle` / `practice.writeDesc`（应为 `practice.writingTitle` / `practice.writingDesc`），此前会渲染原始键名而非译文。

### Internationalization
- 为 `t()` 引入 `TranslationKey` 点分键联合类型（递归生成 `en.ts` 全部叶子键路径），约束 `locale-provider` 及所有键转发组件（feature-card/empty-state/stats-card/practice-assets/character-types/mobile-nav），在编译期拦截错误键名，防止回归。

### Code Quality
- 删除未引用的死代码 `hooks/use-quiz.ts`（其逻辑已在 learn/practice 页面内联实现）。
- 移除 `lib/storage.ts` 中未被使用的 `safeRemoveItem`。

### Docs & Versioning
- 同步全部文件头、package.json、metadata.json、README、README_EN、openspec 至 v5.2.1。

## [5.2.0] - Functional Completeness & Robustness
### Bug Fixes
- 修复 `learn/page.tsx` 答对后自动关闭弹窗的 `setTimeout` 未清理问题：用户提前关闭或路由切换后定时器仍触发，导致操作已卸载组件/关闭错误弹窗。改用 `useRef` 持有句柄并在关闭与卸载时清理。

### Functional Completeness
- 接通 `useProgress` 进度系统：书写练习调用 `markLearned`、拼音测验调用 `recordQuizResult`，结果持久化至 localStorage。
- `weekly-progress.tsx` 改为接收真实进度数据（已学字数/连胜/准确率/周活动），移除硬编码假数据，周网格按真实活动显示勾选并对今日高亮。

### Consistency
- 还原 3 处 `rounded-4xl`（按设计原型 §2.4/§8.4 合法，32px 大卡片圆角）以对齐原型规范（此前误改为 rounded-3xl）。
- 精简 `use-progress.ts` 未使用导出（`isLearned`/`getLearnedCharacters`/`learnedCharacterIds`）。

### Internationalization
- 校验 11 种语言翻译键与 `en.ts` 完全对齐（166 个键，无缺失/多余）。

### Docs & Versioning
- 同步全部文件头、package.json、metadata.json、README、README_EN 至 v5.2.1。
- 更新 README 说明进度系统已接通。

## [5.1.0] - Code Review & Robustness Hardening
### Code Review & Cleanup
- 删除未被引用且与原型规范偏离（米字格网格）的死代码 `hooks/use-canvas.ts`。
- 将 `components/practice/writing-dialog.tsx`（201 行）拆分为 `writing-canvas.tsx` 子模块，消除超 200 行文件。
- `writing-canvas.tsx` 改用指针事件（Pointer Events）+ `touch-none`，统一鼠标/触控/触控笔输入，避免绘制时页面滚动。

### Robustness
- `hooks/use-progress.ts` 的连胜、周活动与今日标记改用本地时区日期，修复 UTC 偏移导致的跨零点判定错误。

### Consistency
- 同步全部文件头、package.json、metadata.json、README 与 openspec 版本戳至 v5.1.0。
- 更新 README/README_EN 项目结构说明，对齐实际模块化架构。

## [5.0.0] - 东方水墨·朱砂红 Design System & Architecture Alignment
### Design System
- Replaced Apple-HIG-inspired theme with 东方水墨·朱砂红 design system (ink/vermilion/indigo color scales).
- Adopted fonts: Space Grotesk (sans), Playfair Display (display), Noto Serif SC (serif), JetBrains Mono (mono).
- Removed all hardcoded color values; single source of truth via Tailwind CSS `@theme` tokens.
- Eliminated arbitrary radius (`rounded-[Npx]`) and `transition-all` usages across UI components.

### Internationalization
- Audited all 11 language translation files; keys are mutually consistent.
- Added missing translation keys (common/location/learn/practice) used by the code.
- Fixed quiz result labels to use existing `practice.correct` / `practice.wrong` keys.

### Architecture & Modularization
- Split all source files exceeding 200 lines into focused modules:
  - `lib/characters.ts` → `character-types.ts` + `characters-part1.ts` + `characters-part2.ts`.
  - `app/learn/page.tsx` → `learn/character-grid.tsx` + `character-detail.tsx` + `quiz-dialog.tsx`.
  - `app/practice/page.tsx` → `practice/*` (options / weekly-progress / writing-dialog / quiz-dialog / assets).
  - `components/ui/dropdown-menu.tsx` → `dropdown-menu-core/items/sub` + barrel.
- Extracted scroll-reveal logic into `hooks/use-scroll-reveal.ts`.

### Quality & Consistency
- Synced all file header versions to v5.0.0.
- Synced package.json, metadata.json versions to 5.0.0.
- Updated README/README_EN to reflect current design system, fonts, and Next.js 16 stack.

### Prototype & Spec Best-Practice Alignment
- `prototype/prototype.html`: removed all hardcoded component colors (`#fff` / scrim `rgba`) → design tokens (`--primary-foreground` / `--scrim`); derived `--primary-dark` from `--primary` via `color-mix` (single source).
- `prototype/prototype.html`: button radius aligned to spec token `--radius-md` (was pill `999px`).
- `prototype/prototype.html`: Canvas writing now reads `--foreground` token instead of hardcoded hex; removed dead code in `goView`.
- `prototype/prototype.html`: added `--font-heading` / `--scrim` tokens; skip-link now translated via `common.skipToContent` (en/zh-CN/ja/es).
- `openspec/01-overview.md`: bumped to v5.0.0; corrected Apple-HIG → 东方水墨·朱砂红, Next.js 15 → 16, fonts Inter/Noto Sans SC → Space Grotesk/Playfair Display/Noto Serif SC/JetBrains Mono.
- `openspec/02-architecture.md`: Next.js 15 → 16.
- `openspec/04-api-reference.md`: font table `--font-sans` Inter → Space Grotesk; `--font-hanzi` Noto Sans SC → `--font-serif` Noto Serif SC.
- `openspec/index.md`: UI prototype description Apple 风格 v4.0 → 东方水墨·朱砂红 v5.0; doc version v3.0.0 → v5.0.0.
- `openspec/alignment-checklist.md`: fixed stale v3.0.0 version stamps (package.json, 01/02/04/index) → v5.0.0.

### Source Code Token & Best-Practice Audit
- `src/app/globals.css`: `.skip-to-content` hardcoded `white`/`8px` → `var(--color-primary-foreground)` / `var(--radius-md)`; `.glass` hardcoded `rgba(255,255,255,0.85)` / `rgba(13,13,13,0.85)` → `color-mix(in srgb, var(--color-card|--color-background) …)` (single source).
- `src/components/practice/writing-dialog.tsx`: Canvas hint now reads `--color-foreground` / `--font-serif` tokens instead of hardcoded `#1a1a1a` / `rgba(26,26,26,0.08)` / `serif`.
- `src/hooks/use-canvas.ts`: replaced the entire hardcoded `canvasColors` palette with `readCanvasColors()` that resolves from design tokens at runtime (bg/foreground/border via `color-mix`), theme-aware, no hardcoded hex/rgba.
- Tokenized all hardcoded surface colors: `bg-white`/`bg-white/N` → `bg-card`/`bg-card/N` across page, cards, dialogs, sheet, select, dropdown, input, and practice/learn components.
- Tokenized all hardcoded text-on-brand colors: `text-white` → `text-primary-foreground` on vermilion buttons/badges/seals; `bg-red-500` + `text-white` → `bg-destructive` + `text-destructive-foreground` (quiz/button/badge/input invalid state); `bg-black/10` scrims → `bg-ink-900/10`; toast hover `bg-black/5`/`bg-white/10` → `bg-ink-900/5`/`bg-ink-100/10`; tooltip `text-white` → `text-ink-50`.
- `src/components/ui/slider.tsx` thumb `bg-white` intentionally retained (always-light control thumb; documented exception).

## [2.2.1] - UI/UX Professional Review & Optimization (Complete)
### Theme System
- Added 3-state theme toggle: light → dark → system (previously lost system mode after manual toggle)
- Added hover tooltip showing current theme mode

### Accessibility
- Locale dropdown: added `aria-expanded`, `aria-haspopup`, `role="listbox"`, `role="option"`, `aria-selected`
- Locale dropdown: added keyboard navigation (Arrow keys, Escape to close)
- Locale dropdown: added `max-h-[70vh]` scroll for overflow on small screens
- Mobile drawer: removed duplicate theme/locale toggles (already in header)
- Mobile drawer: removed non-functional "Sign In" button

### Visual & Layout
- Fixed Home page CTA buttons: "Start Learning" → `/learn`, "Explore Library" → `/practice` (previously both `/learn`)
- Status badge text changed to "AI-Powered Learning" (was misusing heroTitle translation)
- Hero heading: reduced max font size from `text-7xl` to `text-6xl` for better proportion
- Mobile nav: removed emoji icons (🏠📖✏️) for professional consistency
- Practice page: unified responsive padding to `px-4 sm:px-6` (was fixed `px-6`)
- Practice page: added `sm:grid-cols-2` breakpoint for tablet optimization
- Weekly progress grid: responsive sizing with `gap-1 sm:gap-3 lg:gap-4`
- Weekly progress day cells: `minHeight: 72` for touch-friendly tapping
- Practice cards: added `active:scale-[0.98]` press feedback
- Stats cards: consistent responsive sizing (`text-3xl sm:text-4xl`)

### Interaction
- Learn page: re-clicking selected character no longer de-selects (was confusing UX)
- Learn page: added `grid-cols-2 xs:grid-cols-3` for very small screens
- Added `key={pathname}` to `<main>` for page transition animation via `animate-fade-in-up`

### Performance
- Added `font-display: swap` CSS declarations for Inter and Noto Sans SC fonts
- Added `will-change: background-position` to skeleton loading animation
- Created `container-page` utility class for consistent page containers
- Footer: removed dead "About" and "Contact" `#` links
- Desktop header: removed non-functional "Sign In" button
- Dark mode: improved footer divider contrast (`border-slate-600/60`)
- Dark mode: focus ring uses brighter `#34d399` emerald tint

### Code Quality
- Removed `as any` type assertion from locale-toggle (proper `Locale` type import)
- Updated version string to v2.2.1 throughout

### Learn Page
- Added character grid loading skeleton with shimmer animation (12 placeholder cards)
- Skeleton uses `role="status"` and `sr-only` for accessibility

### Practice Page
- Fixed re-clicking selected mode no longer de-selects (anti-pattern fix)
- Added selected card background fill and subtle ring for better visual feedback
- Card backgrounds change to tinted color when selected (emerald/blue/purple)

### Documentation
- Added `UI_UX_REVIEW.md` - comprehensive professional UI/UX audit report

### Bug Fixes (Round 3 - Final)
- Fixed `@tailwindcss/vite` → `@tailwindcss/postcss` (Vite plugin incompatible with Next.js)
- Fixed deprecated `images.domains` → `images.remotePatterns` in next.config.js
- Synced all file header versions to v2.2.1 (11 source files + 11 translation files)
- Synced package.json version to 2.2.1
- Fixed all translation footer copyright versions to v2.2.1

### Code Quality (Round 3)
- Removed `any` type from `getNestedValue()` → typed as `Translations`
- Removed `any` type from `getIcon()` → typed as `Record<string, string>`
- Removed dead `common.signIn` translation key from all 11 language files
- Added `common.theme.*` translations (light/dark/system) for all 11 languages
- Theme toggle tooltip now uses i18n translation instead of hardcoded English

### Learn Page
- Removed 300ms fake loading simulation (was decorative, no real data fetching)
- Page now renders instantly with character grid

## [2.2.0]
- Added complete i18n internationalization support with 11 languages: English, Simplified Chinese, Traditional Chinese, Spanish, Arabic, French, Portuguese (Brazil), German, Japanese, Korean, and Russian.
- Created I18nService with automatic browser language detection and localStorage persistence.
- Added LocaleToggle component for language switching.
- Updated all components (App, Home, Learn) to use i18n translations.
- Fixed vite.config.ts with proper version header and path alias.
- Fixed angular.json test configuration with correct styles path.
- Created missing tsconfig.spec.json file.
- Updated all file headers with v2.2.0.
- Updated metadata.json, package.json, and README files.
- Updated CHANGELOG.md with v2.2.0 release notes.

## [2.1.4]
- Fixed CSS comment format (changed from /* */ to // style).
- Added proper file headers to all configuration files (tsconfig, index.html).
- Updated Tailwind theme configuration with --font-hanzi variable.
- Updated .hanzi-font class to use CSS variable.
- Added OpenSpec documentation for project standards.
- Fixed duplicate header in tsconfig.json.
- Updated all version references (v2.1.3 → v2.1.4).

## [2.1.3]
- Added file header comments to all source files with versioning.
- Implemented localStorage theme persistence for dark/light mode.
- Added Noto Sans SC font for better Chinese character display.
- Improved dark mode support across all components (home, learn, app).
- Enhanced Learn page with character selection and detail panel.
- Added proper TypeScript interfaces and function comments.
- Added provideAnimations to app configuration.
- Fixed footer dark mode styling.
- Updated all version references (v2.1.2 → v2.1.3).

## [2.1.2]
- Re-initialized project as a modern Angular 21 application.
- Implemented zoneless change detection for better performance.
- Integrated Tailwind CSS 4.0.0 for styling.
- Added Material Icons for iconography.
- Created responsive hero section with AI-powered learning theme.
- Configured environment variables and global type declarations.
