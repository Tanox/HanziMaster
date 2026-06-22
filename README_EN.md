# HanziMaster 汉字大师 v3.0.0

[English](README_EN.md) | [简体中文](README.md)

HanziMaster is a modern, AI-powered platform for learning Chinese characters. It uses Gemini AI to provide personalized feedback on stroke order, balance, and aesthetics.

## Features

- **AI-Powered Insights**: Real-time feedback on your handwriting.
- **Adaptive Learning**: Personalized learning paths that adapt to your progress.
- **Etymology & Culture**: Discover the stories behind the characters.
- **Responsive Design**: Flawless support for desktop and mobile devices.
- **Dark/Light Mode**: Persistent theme preference with system detection.
- **Chinese Font Support**: Noto Sans SC for elegant character display.
- **Internationalization (i18n)**: Support for 11 languages including English, Chinese (Simplified/Traditional), Spanish, Arabic, French, Portuguese, German, Japanese, Korean, and Russian.
- **Language Switcher**: Easy language switching with persistence.

## Tech Stack

- **Framework**: Next.js 15
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4.0
- **AI**: Google Gemini AI
- **Fonts**: Inter, JetBrains Mono, Noto Sans SC
- **Internationalization**: Custom i18n context with 11 languages

## Getting Started

### Prerequisites

- Node.js >= 20.11.0
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Configure environment variables (optional)
   ```bash
   cp .env.example .env
   # Edit .env file and fill in GEMINI_API_KEY
   ```

4. Start the development server
   ```bash
   npm run dev
   ```

The development server will start at `http://localhost:3000`.

### Production Build

```bash
npm run build
npm run start
```

## Project Structure

```
src/
├── app/               # Next.js App Router
│   ├── globals.css    # Global styles
│   ├── layout.tsx     # Root layout (nav, theme, i18n)
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

## Core Pages

### Home (/)
- Hero section showcasing app features
- Feature introduction (AI Insights, Etymology & Culture, Adaptive Learning)
- Responsive design with dark/light mode support

### Learn (/learn)
- 12 basic Chinese characters for learning
- Character selection and detail display
- Writing practice and pronunciation features

### Practice (/practice)
- Writing practice mode
- Memory quiz mode
- Learning progress tracking
- Weekly learning statistics

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

## Environment Variables

| Variable | Description | Required | Example |
|----------|------------|----------|---------|
| `GEMINI_API_KEY` | Google Gemini AI API key | No | `your-api-key-here` |

## Development Guide

### Code Standards

- Use TypeScript strict mode
- Use `'use client'` directive for client components
- All user-visible text must use i18n translations
- Follow Tailwind CSS 4.0 best practices

### Commit Convention

Based on Angular commit convention:

```
<type>: <description>

[optional body]

[optional footer]
```

Types: `feat` | `fix` | `docs` | `style` | `refactor` | `perf` | `test` | `build` | `ci` | `chore`

## Deployment

### Vercel Deployment

1. Connect GitHub repository
2. Configure environment variables
3. Auto-deploy

### Tencent Cloud EdgeOne Pages

1. Log in to EdgeOne Pages console
2. Import project
3. Configure build command: `npm run build`
4. Configure output directory: `.next`

## License

© 2026 HanziMaster 汉字大师. All rights reserved.
