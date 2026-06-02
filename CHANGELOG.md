# Changelog

## [2.2.1] - UI/UX Professional Review & Optimization
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
- Footer: removed unused "Sign In" button from desktop header

### Documentation
- Added `UI_UX_REVIEW.md` - comprehensive professional UI/UX audit report

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
