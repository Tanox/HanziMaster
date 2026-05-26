# HanziMaster 汉字大师 v2.2.0

[English](README_EN.md) | [简体中文](README.md)

HanziMaster is a modern, AI-powered platform for learning Chinese characters. It uses Gemini AI to provide personalized feedback on stroke order, balance, and aesthetics.

## Features
- **AI-Powered Insights**: Real-time feedback on your handwriting.
- **Adaptive Learning**: Personalized learning paths that adapt to your progress.
- **Etymology & Culture**: Discover the stories behind the characters.
- **Zoneless Angular 21**: High-performance, modern architecture.
- **Tailwind CSS 4.0**: Beautiful, responsive design.
- **Dark/Light Mode**: Persistent theme preference with system detection.
- **Chinese Font Support**: Noto Sans SC for elegant character display.
- **Internationalization (i18n)**: Support for 11 languages including English, Chinese (Simplified/Traditional), Spanish, Arabic, French, Portuguese, German, Japanese, Korean, and Russian.
- **Language Switcher**: Easy language switching with persistence.

## Tech Stack
- **Framework**: Angular 21 (Zoneless)
- **Styling**: Tailwind CSS 4.0
- **AI**: Google Gemini AI
- **Icons**: Angular Material Icons
- **Animations**: Motion (Vanilla JS)
- **Fonts**: Inter, JetBrains Mono, Noto Sans SC
- **Internationalization**: Custom i18n service with 11 languages

## Getting Started
1. Install dependencies: `npm install`
2. Start the development server: `npm start`
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
app/
├── components/          # Components directory
│   ├── theme-toggle.ts # Theme toggle component
│   └── locale-toggle.ts # Language switcher component
├── pages/             # Pages directory
│   ├── home/          # Home page
│   └── learn/          # Learn page
├── i18n/              # Internationalization directory
│   ├── locales/       # Language files
│   └── i18n.service.ts # i18n service
├── app.config.ts      # App configuration
├── app.routes.ts      # Route configuration
├── app.ts            # Root component
├── main.ts          # Entry point
└── styles.css        # Global styles
```

## License
© 2026 HanziMaster 汉字大师. All rights reserved.
