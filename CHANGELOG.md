
# Changelog

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
