# HanziMaster (汉字大师) 🖌️

[中文文档](./README_CN.md) | **English**

> **The World's Best Hanzi Stroke Teaching Terminal**
>
> Combining traditional calligraphy aesthetics with modern AI technology to provide a comprehensive "Watch, Listen, Write" Hanzi learning experience.

![Version](https://img.shields.io/badge/version-2.1.1-blue?style=flat-square)
![License](https://img.shields.io/badge/license-GPLv3-green?style=flat-square)

## 1. Project Overview

### 1.1 Background & Goals
In Hanzi learning, "forgetting how to write" and "wrong stroke order" are common pain points for beginners and native speakers alike. Existing dictionary apps often only provide static images or simple GIFs, lacking interactivity and in-depth analysis.

**HanziMaster** aims to solve this by providing:
*   **Dynamic Demonstration**: Real-time SVG-based stroke animations.
*   **Interactive Practice**: Tracing and writing tests with real-time feedback.
*   **AI Assistance**: Google Gemini-powered character origin analysis, memory mnemonics, and intelligent scoring.
*   **PWA Support**: Installable as a native-like app with offline capabilities.
*   **User Profiles**: Dashboard with quick settings (Theme, Language, Offline Mode) and avatar support (Google/GitHub).

### 1.2 Tech Stack
*   **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS v4, next-pwa
*   **Animation**: Hanzi Writer, Framer Motion
*   **AI**: Google Gemini API
*   **Deployment**: Vercel (Serverless)

### 1.3 Architecture Design
Adopts a decoupled Serverless architecture. The frontend handles the ultimate interactive experience, while the backend provides data proxying and AI capabilities via API Routes. For detailed architecture, refer to [02. Architecture Design](./openspec/02_ARCHITECTURE.md).

## 2. Core Features
*   **Stroke Order Animation**: Vector animations for over 9000 Chinese characters with adjustable speed.
*   **Writing Practice & Scoring**: Real-time trajectory validation and scoring (0-100) using geometric algorithms.
*   **AI Tutor**: Gemini-driven etymology analysis and personalized mnemonics.
*   **Offline-First**: Downloadable vector stroke database and HSK offline dictionary.
*   **Progressive Web App (PWA)**: Installable on desktop and mobile devices.
*   **Dark/Light Mode**: Seamless theme switching optimized for readability.

## 3. Development Setup

```bash
# 1. Clone the repository
git clone https://github.com/sutchan/hanzimaster.git

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Add your NEXT_PUBLIC_GEMINI_API_KEY to .env.local

# 4. Run development server
npm run dev
```

## 4. Documentation (OpenSpec)
This project strictly follows the **OpenSpec** standard. See the `openspec/` directory for detailed specifications on UX, Architecture, Design System, Logic, Pedagogy, and Compliance.

## 5. License
GPL-3.0 License © 2026 Sut
