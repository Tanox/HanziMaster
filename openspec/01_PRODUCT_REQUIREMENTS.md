# 01. Product Requirements Document (PRD)

**Project**: HanziMaster AI  
**Version**: 0.2.1  
**Status**: Active Development

## 1. Executive Summary
HanziMaster AI is a web-based educational tool that bridges the gap between traditional rote memorization of Chinese characters and modern linguistic understanding. By combining vector-based stroke animations with Generative AI (Google Gemini), it provides users with immediate visual guidance and deep semantic context.

## 2. User Personas
*   **The Beginner**: Needs to know *how* to write "你好" without looking like a child's drawing. Needs pronunciation.
*   **The Scholar**: Wants to know why "休" (rest) is a person leaning against a tree.
*   **The Traveler**: Needs a reliable dictionary that works on a plane or in areas with poor reception.

## 3. Functional Requirements

### 3.1 Core Learning (Offline Capable)
*   **Stroke Animation**: 
    *   Must render stroke-by-stroke animations for 9000+ characters.
    *   Controls: Play, Pause, Reset, Speed (0.5x, 1x, 1.5x).
    *   Must work completely without internet access via PWA precaching.
*   **InteractionMode**:
    *   **View Mode**: Passive watching.
    *   **Practice Mode**: User draws on canvas; system validates accuracy and provides haptic/visual feedback.
*   **Native TTS (Fallback)**:
    *   When offline, use `window.speechSynthesis` for pronunciation.

### 3.2 AI Integration (Online Enhanced)
*   **Linguistic Analysis**: 
    *   Use Gemini 3 Flash to generate: Pinyin, Radical, Etymology, Mnemonic, and Common Words.
    *   Graceful degradation: If network fails, show basic local data or a "Network Unavailable" state without crashing.
*   **Neural TTS**:
    *   Use Gemini 2.5 Flash TTS for natural, human-like prosody when online.

### 3.3 Discovery & Engagement
*   **Search**: fast lookup by character.
*   **Random Suggestion**: 
    *   Display 3-6 random characters (responsive count) at the bottom of the UI.
    *   Source from a local list of 5000 common characters.
*   **Multi-language**: Interface and AI content must support 12 major languages.

## 4. Non-Functional Requirements
*   **Performance**: First Contentful Paint (FCP) < 1.0s. Time to Interactive (TTI) < 1.5s.
*   **Reliability**: Offline mode must function for all static assets and cached API calls.
*   **Accessibility**: ARIA labels for all icon buttons; keyboard navigability for player controls.
*   **Compatibility**: Support modern browsers (Chrome, Safari, Edge, Firefox) and mobile OS (iOS, Android).

## 5. Roadmap
*   **v0.1**: Basic stroke rendering.
*   **v0.2**: AI analysis, TTS, and PWA Offline support. (Current)
*   **v0.3**: User accounts, progress tracking, "Spaced Repetition" (SRS) system.
