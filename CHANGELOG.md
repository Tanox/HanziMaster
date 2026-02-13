
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.4.3] - 2025-05-22

### Fixed
- **Circular Dependency**: Fixed a critical circular dependency between `ToastContext` and `Toast` component that caused application load failure in some environments.
- **Locale Compatibility**: Made new Welcome Screen translation keys optional to prevent crashes when using legacy locale files (es, fr, de, etc.).
- **App Version**: Bumped version to v0.4.3.

## [0.4.2] - 2025-05-22

### Added
- **Global Toast System**: Replaced native alerts with a custom, non-intrusive Toast notification system (`ToastContext`, `Toast` component).
- **Database Audit**: Added a data health check in Settings to view local Pinyin coverage and copy missing characters.
- **App Reset**: Added a "Hazard Zone" in Settings to factory reset the application (clear LocalStorage and Caches).
- **OpenSpec**: Complete project specification documents added to `openspec/` directory.

### Changed
- Refactored `App.tsx` to use `ToastProvider`.
- Updated `SettingsModal` UI for better accessibility and grouping.
- Optimized `StrokeViewer` rendering logic for View/Practice mode switching.
- Standardized project structure to flat root-level layout.

### Fixed
- Fixed an issue where `practiceStrokeIndex` was not resetting correctly when switching characters.
- Fixed dark mode color contrast issues in the Settings modal.
- Removed deprecated hooks from the root directory.

## [0.4.0] - 2025-05-15

### Added
- **Share as Image**: Users can now generate and share images of their practice or character analysis.
- **Seasonal Suggestions**: The "Random" suggestions now prioritize seasonal terms (e.g., Spring Festival, Dragon Boat Festival) based on current date.

### Changed
- Upgraded Gemini API SDK to v0.2.0.

## [0.3.5] - 2025-05-01

### Added
- **Idiom Support**: Added `IdiomNavigator` for learning 4-character idioms stroke by stroke.
- **Gemini AI Analysis**: Integrated Gemini 3 Flash for etymology and mnemonic generation.

## [0.1.0] - 2025-04-01

### Added
- Initial release with Stroke Order visualization.
- Basic Offline support with PWA.
