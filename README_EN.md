# HanziMaster 汉字大师 v2.2.0

[English](README_EN.md) | [简体中文](README.md)

HanziMaster is a modern, AI-powered Chinese character learning platform. It uses Gemini AI to provide personalized feedback on stroke order, balance, and aesthetics.

## Features
- **AI-Powered Insights**: Real-time feedback on your handwriting.
- **Adaptive Learning**: Personalized learning paths that adjust to your progress.
- **Etymology & Culture**: Discover the stories behind the characters.
- **Next.js 15**: High-performance, modern React framework.
- **React 19**: Using the latest version of the React ecosystem.
- **Tailwind CSS 3.4**: Beautiful, responsive design.
- **Dark/Light Mode**: System detection and persistent theme preferences.
- **Chinese Font Support**: Elegant display of Chinese characters using Noto Sans SC.
- **Internationalization (i18n)**: Supports 11 languages including English, Simplified Chinese, Traditional Chinese, Spanish, Arabic, French, Portuguese, German, Japanese, Korean, and Russian.
- **Locale Switcher**: Convenient language switching with persistence.

## Tech Stack
- **Framework**: Next.js 15 (React 19)
- **Styling**: Tailwind CSS 3.4
- **AI**: Google Gemini AI
- **Icons**: Lucide React
- **Animation**: Motion (Vanilla JS)
- **Fonts**: Inter, JetBrains Mono, Noto Sans SC
- **i18n**: React Context API + Custom i18n Provider, supporting 11 languages

## Getting Started
1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. Production build: `npm run build`

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
├── app/                 # Next.js App Router directory
│   ├── page.tsx       # Home page
│   ├── learn/         # Learn page
│   ├── layout.tsx     # Root layout
│   └── globals.css    # Global styles
├── components/         # React components directory
│   ├── theme-provider.tsx    # Theme provider
│   ├── theme-toggle.tsx       # Theme toggle component
│   ├── locale-provider.tsx   # Locale provider
│   └── locale-toggle.tsx     # Locale toggle component
├── public/            # Static assets
└── package.json       # Project configuration
```

## Migration from Angular to Next.js

This project has been migrated from Angular 21 to Next.js 15. Key changes include:

- **Routing**: Migrated from Angular Router to Next.js App Router
- **Components**: Migrated from Angular components to React functional components
- **State Management**: Migrated from Angular Signals to React Hooks (useState, useEffect)
- **Styling**: Maintained Tailwind CSS, upgraded to version 3.4
- **Icons**: Migrated from Angular Material Icons to Lucide React
- **Internationalization**: Migrated from Angular service to React Context API
- **Build Tool**: Migrated from Angular CLI to Next.js + TypeScript

## License
© 2026 HanziMaster. All rights reserved.
