# 04. Data & API Specifications

## 1. Internal Data Models
Located in `src/types/index.ts`.

### 1.1 HanziData (Visuals)
Based on *Hanzi Writer* format.
```typescript
interface HanziData {
  strokes: string[];    // SVG Path commands for the visible stroke
  medians: number[][][]; // Coordinates [x, y] for the skeleton/median line used for grading
  radStrokes?: number[]; // Indices of strokes that make up the radical
}
```

### 1.2 CharacterAnalysis (Linguistics)
The aggregated data object used by the UI.
```typescript
interface CharacterAnalysis {
  char: string;
  pinyin: string;
  meaning: string;
  radical: string;
  strokeCount: number;
  etymology: string;
  mnemonic: string;
  examples: ExampleWord[];
}

interface ExampleWord {
  word: string;
  pinyin: string;
  meaning: string;
}
```

## 2. API Contracts

### 2.1 Google Gemini (Analysis)
*   **Model**: `gemini-3-flash-preview`
*   **Input**: Text prompt with target language.
*   **Output Config**: `responseMimeType: "application/json"`.
*   **Schema Enforcement**:

```json
{
  "type": "OBJECT",
  "properties": {
    "char": { "type": "STRING" },
    "pinyin": { "type": "STRING" },
    "meaning": { "type": "STRING" },
    "radical": { "type": "STRING" },
    "strokeCount": { "type": "INTEGER" },
    "etymology": { "type": "STRING" },
    "mnemonic": { "type": "STRING" },
    "examples": {
      "type": "ARRAY",
      "items": {
        "type": "OBJECT",
        "properties": {
          "word": { "type": "STRING" },
          "pinyin": { "type": "STRING" },
          "meaning": { "type": "STRING" }
        }
      }
    }
  },
  "required": ["char", "pinyin", "meaning", "etymology", "mnemonic", "examples"]
}
```

### 2.2 Google Gemini (TTS)
*   **Model**: `gemini-2.5-flash-preview-tts`
*   **Config**:
    *   `responseModalities`: `['AUDIO']`
    *   `voiceName`: 'Kore' (Balanced neutral voice)
*   **Output**: Base64 encoded raw PCM/WAV data.

## 3. Local Storage / Caching
*   **Service Worker Cache**: Stores `hanzi-data/*.json`.
*   **Browser Cache**: Stores fonts.
*   **Runtime Memory**:
    *   `audioCache`: `Map<string, AudioBuffer>` to prevent redundant TTS calls.

## 4. Prompt Engineering
The system prompt used for analysis:
> "You are a professional Chinese etymologist and calligraphy expert. You provide accurate, scholarly, yet accessible explanations of Chinese characters."

Specific instructions are injected to handle multilingual support (e.g., "Provide a detailed breakdown in Spanish").
