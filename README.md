# HanziMaster AI

[中文文档](./README_zh-CN.md) | **English**

**HanziMaster AI** is an interactive web application designed to help users master Chinese characters (Hanzi). It combines accurate stroke order animations with the power of Google's Gemini AI to provide linguistic insights, etymology, mnemonics, and **pronunciation**.

## ✨ Features

*   **Stroke Order Visualization:** Animated, stroke-by-stroke rendering of Chinese characters using SVG data.
*   **Handwriting Practice:** Interactive touch-friendly mode to practice writing strokes with accuracy validation.
*   **AI-Powered Analysis:** Leverages **Google Gemini 3 Flash** to generate:
    *   Pinyin & Meaning
    *   Radical breakdown
    *   Etymology / Origin stories
    *   Creative Mnemonics (Memory aids)
    *   Common compound words
*   **Text-to-Speech (TTS):** Uses **Gemini 2.5 Flash TTS** to pronounce characters and words with high-quality, natural audio.
*   **Playback Controls:** Play, pause, reset, and adjust the speed of the stroke animation.
*   **Multi-Language Support:** The interface and AI responses support 10 languages (English, Spanish, French, German, Japanese, Korean, Russian, Portuguese, Italian, Vietnamese).
*   **Modern UI:** Built with React, Tailwind CSS, and Lucide Icons for a clean, responsive experience.

## 🛠 Tech Stack

*   **Frontend:** React 19, TypeScript
*   **Styling:** Tailwind CSS
*   **AI Model:** Google Gemini API (`gemini-3-flash-preview` & `gemini-2.5-flash-preview-tts`)
*   **Data Source:** Hanzi Writer Data (CDN)
*   **Icons:** Lucide React

## 🚀 Getting Started

### Prerequisites

*   Node.js (v18 or higher recommended)
*   A Google Gemini API Key

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/hanzimaster-ai.git
    cd hanzimaster-ai
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Set up your API Key:
    Create a `.env` file in the root directory and add your Google Gemini API key:
    ```env
    API_KEY=your_actual_api_key_here
    ```
    *(Note: Ensure your build tool is configured to expose this key to `process.env`)*

4.  Run the development server:
    ```bash
    npm run dev
    ```

## 🎮 Usage

1.  **Enter a Character:** Type a single Chinese character (e.g., "爱", "龙") into the search bar.
2.  **Select Language:** Use the dropdown menu in the header to choose your preferred instruction language.
3.  **Watch & Learn:**
    *   Use the player controls to watch the stroke order animation.
    *   Click the **Speaker Icon** to hear the pronunciation.
    *   Read the "Memory Aid" and "Origin" sections to deepen your understanding.
4.  **Practice:** Switch to "Practice Mode" (Pen icon) to write the character yourself on the screen.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the GNU General Public License v3.0.