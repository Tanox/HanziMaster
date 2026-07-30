# Changelog

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
