# HanziMaster

[中文文档](./README_zh-CN.md) | **English**

**HanziMaster** is an interactive web application designed to help users master Chinese characters (Hanzi). It combines accurate stroke order animations with the power of Google's Gemini AI to provide linguistic insights, etymology, mnemonics, and **pronunciation**.

## 📚 Documentation (OpenSpec)
For detailed project specifications (available in Chinese), please refer to the [OpenSpec](./openspec/00_INDEX.md) folder:
*   [01. Product Requirements](./openspec/01_PRODUCT_REQUIREMENTS.md)
*   [02. Technical Architecture](./openspec/02_TECHNICAL_ARCHITECTURE.md)
*   [03. UI/UX Design](./openspec/03_UI_UX_DESIGN.md)
*   [04. Data & API](./openspec/04_DATA_AND_API.md)
*   [05. Marketing & Promotion](./openspec/05_MARKETING_AND_PROMO.md)
*   [06. Testing & QA](./openspec/06_TESTING_AND_QA.md)
*   [07. Accessibility Guidelines](./openspec/07_ACCESSIBILITY_A11Y.md)

## ✨ Features

*   **Offline-First Architecture:** 
    *   **Built-in Data:** Includes stroke data for **9000+ characters** (covering HSK 1-6 and beyond).
    *   **Offline Mode:** Fully functional stroke animations and native pronunciation support even without an internet connection.
*   **Stroke Order Visualization:** Animated, stroke-by-stroke rendering of Chinese characters using SVG data.
*   **Handwriting Practice:** Interactive touch-friendly mode to practice writing strokes with accuracy validation.
*   **AI-Powered Analysis (Online):** Leverages **Google Gemini 3 Flash** to generate:
    *   Pinyin & Meaning
    *   Radical breakdown
    *   Etymology / Origin stories
    *   Creative Mnemonics (Memory aids)
    *   Common compound words
*   **Hybrid Text-to-Speech (TTS):** 
    *   **Online:** Uses **Gemini 2.5 Flash TTS** for high-quality, natural audio.
    *   **Offline:** Fallback to browser-native TTS (`SpeechSynthesis`) ensuring audio is always available.
*   **GEO Optimized:** Includes structured data (JSON-LD) for better visibility in AI-driven search engines.
*   **Multi-Language Support:** The interface and AI responses support 10 languages (English, Spanish, French, German, Japanese, Korean, Russian, Portuguese, Italian, Vietnamese).

## 🛠 Tech Stack

*   **Frontend:** React 19, TypeScript
*   **PWA:** Vite PWA (Workbox) for offline caching
*   **AI Model:** Google Gemini API (`gemini-3-flash-preview` & `gemini-2.5-flash-preview-tts`)
*   **Data Source:** Hanzi Writer Data (Local copy for offline support)
*   **Icons:** Lucide React
*   **Analytics:** Google Analytics 4

## 🚀 Getting Started

### Prerequisites

*   Node.js (v18 or higher recommended)
*   A Google Gemini API Key (for AI features)

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/hanzimaster.git
    cd hanzimaster
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```
    *Note: This will also install the `hanzi-writer-data` package needed for offline support.*

3.  Set up your API Key:
    Create a `.env` file in the root directory:
    ```env
    API_KEY=your_actual_api_key_here
    ```

4.  Build & Run (to verify data copying):
    ```bash
    npm run build
    npm run preview
    ```
    *The build script will automatically copy character data to the `public/hanzi-data` directory.*

## 🎮 Usage

1.  **Enter a Character:** Type a single Chinese character (e.g., "爱", "龙").
2.  **Offline Use:** Disconnect your internet. You can still search, view stroke animations, and hear native pronunciation.
3.  **Online Analysis:** Connect to the internet to get detailed AI-generated etymology and mnemonics.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the GNU General Public License v3.0.