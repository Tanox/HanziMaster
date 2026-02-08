# 03. UI/UX Design Specifications

## 1. Design Philosophy
*   **Academic yet Modern**: Use Serif fonts for Hanzi to convey tradition, Sans-serif for UI to convey modernity.
*   **Focus-Driven**: The character animation is the center stage. All controls are secondary.
*   **Responsive**: Layout shifts from Single Column (Mobile) to Split Column (Desktop).

## 2. Design Tokens (Tailwind)

### 2.1 Color Palette
*   **Primary**: `Teal-600` (Light) / `Teal-400` (Dark). Used for Primary Actions, Highlights.
*   **Background**: `Slate-50` (Light) / `Slate-900` (Dark). High contrast, easy on eyes.
*   **Surface**: `White` (Light) / `Slate-800` (Dark). Cards and panels.
*   **Feedback**:
    *   Success: `Emerald` (Practice mode correct stroke).
    *   Error: `Red-500` (Practice mode wrong stroke).

### 2.2 Typography
*   **UI Font**: `Inter` (System-ui fallback).
*   **Hanzi Font**: `Noto Serif SC` (Google Fonts). Essential for correct rendering of strokes (Serif style matches standard calligraphy better than Sans).

## 3. Component Specifications

### 3.1 StrokeViewer
*   **Container**: Square aspect ratio.
*   **Grid**: "Rice" Grid (米字格) background to guide structure.
*   **Interaction**: 
    *   **View**: SVG Paths with `stroke-dasharray` animation.
    *   **Practice**: HTML5 Canvas overlay for drawing. `pointer-events` handling for touch/mouse.

### 3.2 AnalysisPanel
*   **Layout**: Grid-based cards.
*   **Loading State**: Skeleton screens (gray pulsing blocks) matching the text height.
*   **Typography**: Large Hanzi display, clear Pinyin.

### 3.3 Controls
*   **Placement**: Centered below the viewer.
*   **Style**: Floating Action Button (FAB) style for Play/Pause. Secondary buttons (Reset, Speed) are smaller/outline.
*   **States**: Disabled states when loading.

## 4. Accessibility (A11y)
*   **Theme**: Respects system `prefers-color-scheme`.
*   **Contrast**: Text colors must meet WCAG AA standards against backgrounds.
*   **Labels**: All icon-only buttons (Play, Shuffle, TTS) must have `aria-label` or `title`.
*   **Keyboard**: Tab index managed for Search input -> Controls -> Analysis.

## 5. Animations
*   **Micro-interactions**: Hover effects on buttons (scale up slightly).
*   **Transitions**: Fade-in for AI content (avoid layout thrashing).
*   **Stroke Animation**: Smooth interpolation using `requestAnimationFrame`.
