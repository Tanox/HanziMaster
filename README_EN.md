# HanziMaster 汉字大师 v2.2.1

[English](README_EN.md) | [简体中文](README.md)

HanziMaster is a modern, AI-powered platform for learning Chinese characters. It uses Gemini AI to provide personalized feedback on stroke order, balance, and aesthetics.

## Features

- **AI-Powered Insights**: Real-time feedback on your handwriting.
- **Adaptive Learning**: Personalized learning paths that adapt to your progress.
- **Etymology & Culture**: Discover the stories behind the characters.
- **Next.js 15 + React 19**: High-performance, modern full-stack framework.
- **Tailwind CSS 4.0**: Beautiful, responsive design.
- **Dark/Light Mode**: Persistent theme preference with system detection.
- **Chinese Font Support**: Noto Sans SC for elegant character display.
- **Internationalization (i18n)**: Support for 11 languages including English, Chinese (Simplified/Traditional), Spanish, Arabic, French, Portuguese, German, Japanese, Korean, and Russian.
- **Language Switcher**: Easy language switching with persistence.

## Tech Stack

- **Framework**: Next.js 15 + React 19
- **Styling**: Tailwind CSS 4.0
- **AI**: Google Gemini AI
- **Fonts**: Inter, JetBrains Mono, Noto Sans SC
- **Internationalization**: Custom i18n context with 11 languages

## Getting Started

1. Install dependencies: `npm install`
2. Start the development server: `npm run dev`
3. Build for production: `npm run build`

## Supported Languages

HanziMaster supports the following 11 languages:

- 🇺🇸 English
- 🇨🇳 简体中文
- 🇹🇼 繁體中文
- 🇪🇸 Español
- 🇸🇦 العربية
- 🇫🇷 Français
- 🇧🇷 Português (Brasil)
- 🇩🇪 Deutsch
- 🇯🇵 日本語
- 🇰🇷 한국어
- 🇷🇺 Русский

## Project Structure

```
src/
├── app/               # Next.js App Router
│   ├── globals.css    # Global styles
│   ├── layout.tsx     # Root layout
│   ├── page.tsx       # Home page
│   ├── learn/         # Learn page
│   │   └── page.tsx
│   └── practice/      # Practice page
│       └── page.tsx
├── components/        # React components
│   ├── theme-provider.tsx # Theme context
│   ├── theme-toggle.tsx   # Theme toggle
│   ├── locale-provider.tsx # i18n context
│   └── locale-toggle.tsx  # Language switcher
└── lib/              # Utilities
    └── i18n/         # Internationalization
        ├── index.ts
        └── translations/ # Translation files
```

## License

© 2026 HanziMaster 汉字大师. All rights reserved.
