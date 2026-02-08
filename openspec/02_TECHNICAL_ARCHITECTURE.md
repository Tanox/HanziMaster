# 02. Technical Architecture

## 1. System Overview

The application follows a **Client-Heavy, Serverless** architecture. It is built as a Single Page Application (SPA) wrapped as a Progressive Web App (PWA).

### Tech Stack
*   **Runtime**: Browser (Chrome/Safari/Edge/Firefox).
*   **Framework**: React 19 + TypeScript.
*   **Build System**: Vite.
*   **Styling**: Tailwind CSS (Utility-first).
*   **State Management**: React Hooks (`useState`, `useReducer`, `useContext`).
*   **AI Engine**: Google GenAI SDK (`@google/genai`).
*   **Data Transport**: REST / Fetch API.

## 2. Offline Strategy (PWA)

The core value proposition is "Offline-First". We use `vite-plugin-pwa` with Workbox.

### 2.1 Asset Caching
*   **App Shell**: HTML, JS bundles, CSS, and Icons are precached on install.
*   **Hanzi Data**: 
    *   We copy `node_modules/hanzi-writer-data` (~9000 JSON files) to `/public/hanzi-data` at build time.
    *   Service Worker is configured to cache these JSON files.
    *   Strategy: `CacheFirst` for data, falling back to CDN (`jsdelivr`) if local file is missing, then caching that response.

### 2.2 Feature Degradation Matrix

| Feature | Online | Offline |
| :--- | :--- | :--- |
| **Search** | Full functionality | Full functionality (Local Data) |
| **Animation** | Load from Local/CDN | Load from Cache/Local |
| **Analysis** | Gemini 3 Flash (Rich) | Static Placeholder / Basic Info |
| **Audio** | Gemini 2.5 TTS (Natural) | Browser `SpeechSynthesis` (Robotic) |

## 3. Module Design

### 3.1 `services/hanziService.ts`
*   Responsible for fetching vector data.
*   Logic: Try Local Path -> Fail -> Try CDN -> Fail -> Error.

### 3.2 `services/geminiService.ts`
*   Manages AI interaction.
*   **Safety**: Configured to `BLOCK_NONE` for Harassment/Hate/etc. to prevent false positives on historical/war-related etymologies (e.g., characters involving weapons "戈").
*   **Schema**: Uses `responseSchema` to guarantee JSON output.

### 3.3 `services/ttsService.ts`
*   Implements the Hybrid Audio pattern.
*   Maintains an in-memory `Map<string, AudioBuffer>` cache to prevent re-fetching the same character's audio during a session.
*   Handles `AudioContext` lifecycle (resume on user interaction).

## 4. Directory Structure
```
/
├── public/             # Static assets + Hanzi JSONs
├── openspec/           # Specifications (You are here)
├── src/
│   ├── components/     # UI Components (Presentational)
│   ├── services/       # Business Logic & API calls
│   ├── utils/          # Helpers
│   ├── locales/        # i18n dictionaries
│   ├── types/          # TypeScript definitions
│   ├── App.tsx         # Main Controller
│   └── main.tsx        # Entry point
```
