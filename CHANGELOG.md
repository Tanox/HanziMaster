
# Changelog

## [1.6.0]
- **Auth**: Integrated real Firebase Authentication for secure user accounts.
- **Auth**: Added support for Email/Password, Google, and GitHub login providers.
- **Auth**: Implemented automatic auth state synchronization across the application.
- **Dev**: Added `.env.example` with required Firebase configuration variables.
- **Versioning**: Updated project version to v1.6.0.

## [1.5.0]
- **Auth**: Added user authentication flow with login/registration UI.
- **Auth**: Added "Login" entry points in Header and Welcome sections.
- **UI**: Replaced `<img>` with Next.js `<Image />` for better performance and SEO.
- **Versioning**: Updated project version to v1.5.0.

## [1.4.4]
- **UI**: Integrated total stroke count into the character structure card for a more consolidated view.
- **Feature**: Enhanced pronunciation functionality to ensure full words and idioms are spoken completely.

## [1.4.3]
- **UI**: Moved the "Random Character" button from the search bar to the main controls panel (left of the Play button) for better accessibility.

## [1.4.2]
- **UI**: Optimized idiom display layout to prevent text wrapping for better readability.

## [1.4.1]
- **L10N**: Updated the "Random Character" button label to "探索汉字" (Explore Hanzi) in Simplified Chinese.

## [1.4.0] - 2026-03-04
- Added dedicated **About** page with project vision and feature highlights.
- Added dedicated **Changelog** page that dynamically renders the project history.
- Localized About and Changelog pages in all 15 supported languages.
- Improved typography and layout for informational pages.
- Updated version to v1.4.0.

## [1.3.9] - 2026-03-04
- Optimized footer menu: replaced redundant links with Changelog and About pages.
- Updated version to v1.3.9.

## [1.3.8]

### UI
- **Optimization**: Removed sharing functionality from the practice result seal to streamline the user experience.
- **Optimization**: Removed "Practice complete" prompts and status text after finishing a character in practice mode.

## [1.3.7]

### UI
- **Optimization**: Removed duplicate generic share button from `ActionButtons` to streamline sharing functionality.
- **Feature**: Added a "Clear Strokes" button in practice mode to allow users to reset their drawing.
- **Enhancement**: Made the outline of the current stroke to be written more obvious in practice mode by changing its color to teal and increasing its thickness.
- **Refactor**: Temporarily removed the "Record Stroke Video" button and `VideoModal`.
- **Layout**: Moved Settings, Challenge, and Leaderboard buttons to the top right of the Header toolbar.
- **Styling**: Standardized the size of the Play, Reset, and Pronunciation buttons in the controls section.
- **Styling**: Adjusted the spacing above the learning progress container to match other containers.
- **Localization**: Translated footer menu strings.
- **Layout**: Moved the version number to the copyright container in the footer.

## [1.3.6]

### UI
- **Optimization**: Removed duplicate pronunciation button from `HeaderCard` on desktop screens, as it is already available in the `Controls` panel.
- **Optimization**: Removed duplicate close button from the `SettingsModal` footer to streamline the UI.

## [1.3.5]

### Refactor
- **Codebase**: Split `app/page.tsx` into smaller components (`ActionButtons`, `WelcomeContent`, `MobileTabs`) to improve maintainability.
- **Service**: Refactored `app/services/geminiService.ts` by extracting schemas and offline generators into separate files (`aiSchemas.ts`, `offlineGenerators.ts`).

## [1.3.4]

### Added
- **L10N**: Added comprehensive translations for the Learning Progress container across all supported languages.

## [1.3.3]

### Fixed
- **UI**: Fixed a bug where multiple share buttons appeared on the character details page by removing the redundant text share button from `HeaderCard`.

## [1.3.2]

### Changed
- **UI**: Removed duplicate stroke count display from HeaderCard.
- **UI**: Removed 'Demo end' prompt and reset button from StrokeViewer and Controls.
- **i18n**: Ensured LearningPath uses localized labels.
- **Versioning**: Synced version numbers across all files to 1.3.2.

## [1.3.1]

### Fixed
- **Build Stability**: Resolved a critical build failure by removing Next.js cache before build, ensuring consistent behavior.
- **Data Integrity**: Corrected the `copyHanziData.js` script to robustly locate the `hanzi-writer-data` package, preventing data copy errors.
- **Default Character**: Changed the default character on initial load from '永' to '一' for a faster and smoother startup experience.

## [1.3.0]

### Added
- **Challenge Mode**: Introduced a new "Hanzi Writing Challenge" feature where users can test their writing speed and accuracy against a 30-second timer.
- **Scoring System**: Implemented an automatic scoring algorithm based on stroke mistakes and remaining time.
- **Leaderboard**: Added a local leaderboard to track and display the top 10 highest scores.
- **Localization**: Updated all 15 supported languages with UI labels for the new challenge mode.

## [1.2.0]

### Changed
- **Data Model**: Updated the `HanziData` interface to include comprehensive character information: `pinyin`, `radical`, `simplified`, `traditional`, `meaning`, `strokeCount`, and `strokeOrder` (SVG paths).

## [1.1.7]

### Added
- **Veo Video**: Introduced a new feature to generate high-quality stroke order demonstration videos using the Veo model.
- **Aesthetic**: The generated videos feature a "Paper & Ink" design aesthetic, simulating traditional brush writing on rice paper.
- **Security**: Implemented the mandatory API key selection flow for Veo video generation to ensure compliance with billing requirements.

## [1.1.6]

### Added
- **SRS**: Implemented a comprehensive Spaced Repetition System (SRS) using the SuperMemo-2 (SM-2) algorithm. The system now tracks user practice performance and automatically schedules characters for review based on their mastery level.
- **UI**: Added a "Due for Review" section in the history panel that highlights characters requiring immediate attention, providing a personalized learning path.
- **Progress Tracking**: Enhanced the `useUserProgress` hook to store and manage SRS metadata, ensuring persistent learning data across sessions.

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
