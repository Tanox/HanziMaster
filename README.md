
# HanziMaster 🖌️

[中文文档](./README_zh-CN.md) | **English**

> **The Soul of Hanzi, Reimagined by AI.**
>
> Master Chinese character stroke order with Zen-like visualization and Gemini AI insights.

![Version](https://img.shields.io/badge/version-0.5.2-blue?style=flat-square)
![License](https://img.shields.io/badge/license-GPLv3-green?style=flat-square)
![Offline Ready](https://img.shields.io/badge/offline-ready-success?style=flat-square)
![Powered by Gemini](https://img.shields.io/badge/AI-Gemini_Flash-8E75B2?style=flat-square)

## 📖 Introduction

**HanziMaster** is not just a dictionary. It is an interactive, **offline-first** web application designed to bridge the gap between traditional calligraphy and modern AI technology. 

Whether you are an HSK student struggling with stroke order, or a heritage learner curious about the story behind a character, HanziMaster provides a distraction-free, aesthetic environment to learn, practice, and understand.

## ✨ Why HanziMaster?

### 🧠 AI-Powered Intelligence
Stop rote memorization. We use **Google Gemini 3 Flash** to generate:
*   **Etymology**: Discover how "家" (Family) evolved from a pig under a roof.
*   **Mnemonics**: clever memory aids tailored to the character's structure.
*   **Native TTS**: Hybrid text-to-speech engine ensuring you hear the perfect tone, online or offline.

### ✍️ Zen Mode Writing
*   **Stroke Flow**: Mesmerizing, fluid animations based on vector data (9000+ characters).
*   **Interactive Practice**: Write directly on the screen with real-time accuracy validation.
*   **Aesthetics**: Designed with "Vermilion Ink" and "Rice Paper" textures for a calming experience.

### ⚡ Engineering Excellence
*   **Offline-First**: Built as a PWA. Download it once, use it on a plane, subway, or deep in the mountains.
*   **Privacy-Focused**: Bring Your Own Key (BYOK) architecture. Your API key stays in your browser.
*   **Shareable**: Generate beautiful, watermarked images of your practice to share on social media.

## 📚 Documentation (OpenSpec)

We follow strict **OpenSpec** standards. Dive into our design philosophy:
*   [01. Product Requirements](./openspec/01_PRODUCT_REQUIREMENTS.md)
*   [02. Technical Architecture](./openspec/02_TECHNICAL_ARCHITECTURE.md)
*   [03. UI/UX Design](./openspec/03_UI_UX_DESIGN.md)
*   [05. Marketing Strategy](./openspec/05_MARKETING_AND_PROMO.md)

## 🚀 Quick Start

### Prerequisites
*   Node.js v18+
*   A Google Gemini API Key (Optional for basic features, required for AI analysis)

### Installation

```bash
# 1. Clone
git clone https://github.com/yourusername/hanzimaster.git
cd hanzimaster

# 2. Install dependencies (includes data copying script)
npm install

# 3. Create env file (Optional)
echo "API_KEY=your_key" > .env

# 4. Run!
npm run dev
```

## 🤝 Contributing

We welcome calligraphy enthusiasts and developers! 
Please check [06. Testing & QA](./openspec/06_TESTING_AND_QA.md) before submitting PRs.

## 📄 License

GPLv3 © 2025 HanziMaster Team