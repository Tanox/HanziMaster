# Changelog

## [2.2.1]
- Fixed practice page to use i18n translations properly.
- Added complete practice page translations to all 11 language files.
- Fixed README_EN.md incorrect tech stack description (was Angular 21, now correctly Next.js 15 + React 19).
- Added missing file headers to all source code files.
- Updated all source files to version v2.2.1.
- Verified i18n completeness across all language files.
- Added practice page translations for all supported languages.
- Fixed documentation consistency between README.md and README_EN.md.
- Ensured all components follow project specification guidelines.

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
