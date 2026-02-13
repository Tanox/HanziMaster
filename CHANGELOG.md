
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.5.2] - 2025-05-22

### Added
- **Viral Sharing**: Added a global "Share App" button in the header toolbar, allowing users to quickly share the application via system share menu or clipboard with localized marketing messages.
- **Viral Content**: Added marketing copy for app sharing to all 15 supported language files to facilitate viral growth in different regions.

### Changed
- **Version Bump**: Updated application version to v0.5.2.

## [0.5.0] - 2025-05-22

### Added
- **Native Sharing**: Implemented Web Share API support for mobile devices in `ShareImageButton`.
- **Modular UI**: Split `CharacterDisplay` into specialized card components (`StructureCard`, `EtymologyCard`, etc.) for better maintainability.

### Changed
- **Share Image**: Redesigned the generated share image with a 1080x1080 vertical layout, improved typography, and branding.
- **Version Bump**: Updated application version to v0.5.0.

## [0.4.9] - 2025-05-22

### Refactored
- **Architecture**: Decomposed the monolithic `useAppController` into specialized hooks (`useContentFetcher`, `useInteractionState`) to improve separation of concerns between data fetching and UI interaction logic.
- **Stroke Engine**: Extracted animation logic into `useStrokeAnimation` and handwriting validation logic into `usePracticeDrawing` hooks. This significantly simplifies the `StrokeViewer` component.
- **Component Split**: 
  - Extracted `ShareImageButton` from `CharacterDisplay`.
  - Refactored `SettingsModal` by splitting it into 6 sub-components (`SettingsAppearance`, `SettingsGrid`, etc.) for better maintainability.
  - Extracted seasonal logic into `useSuggestions` hook.

### Changed
- **Debugging & QA**: Added semantic IDs to all major application containers, interactive elements, and layout grids. This significantly improves debuggability and supports automated testing (e.g., Selenium/Cypress) as per OpenSpec QA standards.

## [0.4.8] - 2025-05-22

### Fixed
- **Cache Strategy**: Fixed a critical issue where enabling "Offline Mode" would prevent the app from using locally cached character analysis data. Now the app prioritizes cache regardless of offline status.
- **Data Cleanup**: Removed duplicate entries in `PINYIN_MAP` to reduce bundle size and improve data integrity.
- **Version Sync**: Synchronized version numbers across all files to v0.4.8.

## [0.4.7] - 2025-05-22

### Changed
- **UI Optimization**: Replaced the intrusive offline banner with a subtle status indicator in the Header toolbar.
- **Data**: Expanded `SEASONAL_EVENTS` with more idioms for Chinese festivals.

## [0.4.6] - 2025-05-22

### Changed
- **Data Update**: Significantly expanded the offline Pinyin database (`PINYIN_MAP`) to cover a much broader range of academic, financial, and common characters, ensuring better coverage for "Random Suggestions" in offline mode.
- **Version Bump**: Updated application version to v0.4.6 across all configuration files and documentation.

## [0.4.5] - 2025-05-22

### Changed
- **UI Optimization**: Significantly improved the visibility and aesthetics of the Pinyin display for the current character. It now uses a larger, bolder serif font with drop shadows for better readability.
- **Documentation**: Updated project specification documents (`openspec/`) to align with the current version.

### Fixed
- **Version Alignment**: Synced version numbers across `package.json`, `App.tsx`, and documentation to v0.4.5.

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