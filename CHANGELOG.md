# Changelog

## [3.0.0] — Design System Overhaul & High-Fidelity Prototype (BREAKING)

### Design System v3.0 (Apple HIG Inspired)
- **色彩系统 Color Palette**: 统一品牌色为 Apple-style `#007AFF` → `#AF52DE` 渐变；定义语义化 tokens（bg/fg/border/success/warning/error）；9 级中性色阶；系统色（Green/Orange/Red/Yellow/Pink/Teal/Indigo）
- **字体系统 Typography**: 定义 8 级字体层级（Hero / Display 1–2 / H1–3 / Body / Caption）；字体族 Inter + Noto Sans SC + JetBrains Mono；`font-display: swap` 避免 FOIT
- **间距与布局 Spacing & Layout**: 4px 基准网格；`space-1` 至 `space-20` 共 10 档；圆角 4 档 (`8/12/20/24/32/980px pill`)
- **图标规范 Icons**: 2px stroke 线条图标统一风格；支持 hover 状态反色
- **动效规范 Motion**: `ease-out` / spring 缓动；页面 `fade-in-up`、模态 `scale-in`、卡片 `hover-lift`；动画时长 0.25–0.6s

### Components v3.0 组件库
- **基础组件**: Button (primary/secondary/outline/success/danger/icon/disabled)；Input (default/value/error) + `aria-*` keyboard；Toggle switch；Badge
- **复合组件**: Feature Card；Character Grid (汉字选择网格)；Stats Card；Alert (info/success/warning/error)；Progress Bar (多指标分段展示)；Weekly Progress Panel
- **业务组件**: Learning Mode Card (书写练习 / 记忆测验 / 学习统计)；Empty State；Character Detail Panel（含笔画/部首/结构/掌握度）
- **组件使用规则**: 单一职责；可访问性；主题支持；响应式（sm/lg 断点）；`44×44 px` 最小触摸目标

### Interaction Standards 交互标准
- **交互模式库**: Hover-First / Keyboard-First / Touch-Friendly / Optimal Feedback
- **交互反馈规范**: 100ms 内视觉响应；`transform: translateY` + `box-shadow` 悬浮反馈；`scale-[0.98]` 按压反馈
- **错误处理规范**: 表单字段级 + 顶部总结；错误自动聚焦；offline 保留缓存并显示离线徽章
- **空状态设计规范**: 统一插图 + 文案 + CTA 按钮；避免空白页面

### High-Fidelity Prototype 高保真原型
- 新增 **prototype/design-system.html**: 完整设计系统规范文档与演示
- 新增 **prototype/components.html**: 组件库规范与交互演示
- 重构 **prototype/index.html**: 包含首页、学习、练习三个核心页面，支持页面切换与响应式
- 所有原型统一使用 v3.0 design tokens（字体、间距、色彩、动效）

### Project Cleanup 项目精简
- 删除 `prototype/UI_OPTIMIZATION.md`（已并入 CHANGELOG）
- 删除 `prototype/design-spec.html`（旧版规范已废弃）
- 删除 `prototype/prototype.html`（旧版原型已被新版 index.html 替代）

### Documentation
- `prototype/` 下的三个 HTML 文件相互互联，形成完整的设计系统 → 组件库 → 原型的浏览链路

---

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
