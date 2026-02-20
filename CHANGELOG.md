
# Changelog

## [1.1.6]

### Changed
- **Migration**: Completed migration from Vite to Next.js using Pages Router.
- **Structure**: Created `pages/` directory with `index.tsx`, `_app.tsx`, and `_document.tsx`.
- **Cleanup**: Removed Vite-specific files: `vite.config.ts`, `vite-env.d.ts`, `index.html`, `index.tsx`.

### Chore
- **Versioning**: Unified version numbers across all project files to v1.1.6 for consistency.

## [1.1.5]

### Fixed
- **API**: Improved robustness of the Gemini API service by adding a check for empty JSON responses. This prevents crashes from `JSON.parse` errors and ensures a graceful fallback to offline analysis when the AI returns an empty result.

## [1.1.4]

### Fixed
- **Offline**: Fortified the lexicon download mechanism by implementing a multi-source CDN mirror fallback system. The sync process now automatically cycles through local, jsDelivr, and unpkg sources, dramatically increasing download success rates under adverse network conditions.

## [1.1.3]

### Fixed
- **Offline**: Fixed a critical bug where pinyin was not displayed in offline mode. The offline analysis fallback now correctly queries the extensive local `PINYIN_MAP` before defaulting to an empty state, ensuring pinyin is available for common characters without a network connection.

## [1.1.2]

### Fixed
- **Offline**: Fixed an issue where lexicon download failures were silently ignored. Implemented a robust fetch-with-retry mechanism and precise error tracking to ensure sync reliability and provide accurate user feedback.

## [1.1.1]

### Added
- **UI**: Added a prominent stroke count display next to the main character in the `HeaderCard` component, ensuring this key information is immediately visible to the user.

## [1.1.0]

### Changed
- **Offline**: Overhauled the lexicon sync to download the complete 9,000+ character library instead of a limited subset, providing full offline stroke animation capability.
- **Build**: The build script now auto-generates a master character list and updates lexicon metadata for accurate progress tracking.

## [1.0.9]

### Fixed
- **Accuracy**: Prioritized the definitive stroke count from `hanziData` over the AI-provided count in `CharacterDisplay`, ensuring the displayed number perfectly matches the stroke animation data.

## [1.0.8]

### Added
- **Onboarding**: Implemented a new multi-step welcome screen to better onboard new users.
- **Welcome Step 1**: Focuses on the app's philosophy and provides an integrated language selector.
- **Welcome Step 2**: Introduces the four core features (Search, Watch, Practice, AI Insights) using descriptive cards.
- **i18n**: Added new locale keys to all 15 languages to support the content of the new welcome screen.

## [1.0.7]

### Fixed
- **Build**: Resolved a critical build failure (TS2307) by correcting the import path for the `dictionaryData` module within the `useDataSync` hook.

## [1.0.6]

### Changed
- **Docs**: Completed the definitive consolidation of all `openspec/` documentation. All content from 18 legacy specification files has been merged into the 7 core modules, which now serve as the project's comprehensive Single Source of Truth.

## [1.0.5]

### Added
- **Audio Feedback**: Implemented a new `soundService` to provide multi-sensory feedback during practice mode. Added distinct sounds for correct strokes, incorrect strokes, and character completion.
- **Settings**: Added a "Sound Effects" toggle in the settings panel to allow users to enable or disable audio feedback.

## [1.0.4]

### Chore
- **Docs**: Removed all (18) deprecated specification files from the `openspec/` directory to enforce the 7 core modules as the Single Source of Truth, aligning the project with its established documentation strategy.

## [1.0.3]

### Changed
- **Architecture**: Refactored the complex data synchronization logic from the `SettingsDataAudit` component into a dedicated `useDataSync` hook, improving separation of concerns and code clarity.
- **Docs**: Completed the final cleanup of the `openspec/` directory by removing all deprecated specification files, establishing the 7 core modules as the single source of truth.

## [1.0.2]

### Fixed
- **History**: Ensured that the "Clear History" button correctly resets both the practice history list and the learning statistics for a consistent user experience.

## [1.0.1]

### Chore
- **Versioning**: Unified all project file versions to `1.0.1` for consistency.

## [1.5.0]

### Changed
- **Architecture**: Refactored state management to align with OpenSpec v1.0.0.
- **`useUserProgress`**: Created new hook to isolate all user progress logic (history, learned stats), improving separation of concerns.
- **`useAppController`**: Simplified the main controller hook to act as a coordinator, delegating state management to specialized sub-hooks.

## [1.4.0]

### Added
- **OpenSpec**: Upgraded to v1.4.0. Completed the full component topology map, TypeScript interface contract, and design tokens.
- **Developer Guide**: The specification documents are now sufficient to support a 1:1 rebuild of the entire application from scratch without referencing old code.

## [1.3.0]
... (之前的记录)
