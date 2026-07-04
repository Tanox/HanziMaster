# Changelog

## [3.0.0] - 2026-07-04
### Added
- RTL (right-to-left) support for Arabic language
- Shared `useWritingCanvas` hook for canvas drawing logic
- Shared `useQuiz` hook for quiz state management
- Centralized character data in `src/lib/characters.ts`
- Custom hooks directory (`src/hooks/`)
- New translation keys for accessibility labels
- Focus trap in mobile navigation dialog
- `aria-current="page"` on active nav links
- `role="status"` and `aria-live="polite"` on quiz results
- RTL-aware CSS animations in globals.css
- Fisher-Yates shuffle algorithm for quiz options
- Canvas dark mode support with theme-aware colors
- System theme change listener for canvas color adaptation

### Changed
- Split `practice/page.tsx` (663→<200 lines) into modular components
- Split `learn/page.tsx` (437→<200 lines) using shared hooks
- All component className merging now uses `cn()` utility
- Replaced `w-*/h-*` with `size-*` Tailwind classes throughout
- Replaced `space-y-*` with `gap-*` for spacing
- Replaced hardcoded colors with semantic CSS variables
- Context providers now use `useMemo` for value objects
- `locale-provider` sets `document.documentElement.dir` for RTL
- CSS `--primary` variable now uses Apple Blue (#007aff)
- Removed manual font preconnect (handled by next/font)
- Unified `--radius-sm` to 8px per design spec
- Canvas drawing now uses theme-appropriate colors (dark/light)

### Fixed
- Homepage CTA button routing ("Explore Library" now links to /practice)
- Japanese translations with Chinese remnants
- Korean translation with Chinese remnant
- Dead translation keys removed
- Canvas `getPoint` function type safety (PointerEvent only)
- Missing file header comments added
- `storage.ts` runtime data validation
- `utils.ts` import quote style consistency
- Quiz shuffle bias (sort+random → Fisher-Yates)
- Missing `aria-hidden` on decorative SVGs
- Mobile nav close button SVG missing `aria-hidden`
- Theme toggle aria-label now uses i18n
- Homepage hero title translation key concatenation
- SSR build error: `window is not defined` in learn/practice pages
- Canvas dark mode background rendering

### Removed
- Dead translation keys: `common.foreverQuote`, `common.learners`, `common.strokeMastery`, `common.dayStreak`
- Unused `meaning` field from Character interfaces
- Duplicated canvas drawing code (~250 lines removed)
- Dead `TouchEvent`/`MouseEvent` branches in `getPoint`

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
