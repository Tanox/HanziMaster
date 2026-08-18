# HanziMaster 汉字大师 v5.2.6

[English](README_EN.md) | [简体中文](README.md)

HanziMaster is a Chinese character learning app that helps you master handwriting through guided practice, stroke-order demonstrations, and immersive review.

## Features

- **Stroke & Structure Feedback**: Clear stroke-order guidance and structure hints to help you write standard, beautiful characters.
- **Multiple Learning Modes**: Basic learning, handwriting practice, pinyin quizzes, and progress tracking.
- **Tian-zi-ge Writing Practice**: Canvas handwriting with touchscreen and mouse support, plus real-time pronunciation playback.
- **Pinyin Quiz**: 4-choice pinyin test with live correct/incorrect stats and accuracy analysis.
- **Personalized Progress**: Writing/quiz results are persisted automatically; visualize streak days, accuracy, and weekly activity.
- **11 Languages**: Simplified Chinese, Traditional Chinese, English, Japanese, Korean, and more.
- **Dark Mode**: Follow system or toggle manually.
- **Ink-and-Vermilion Design System**: Unified ink/vermilion/indigo color scales with a single token source.
- **Mobile Friendly**: Fully optimized for phones and tablets.

## Tech Stack

- **Framework**: Next.js 16
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4.0 + Ink-and-Vermilion Design System
- **Fonts**: Space Grotesk, Playfair Display, Noto Serif SC, JetBrains Mono
- **Internationalization**: Custom i18n context with 11 languages

## Getting Started

### Prerequisites

- Node.js >= 24.5.0
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

3. Start the development server
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
├── app/                  # Next.js App Router
│   ├── globals.css       # Global styles + 东方水墨·朱砂红 design tokens
│   ├── layout.tsx        # Root layout (nav, theme, i18n)
│   ├── page.tsx          # Home page
│   ├── learn/page.tsx    # Learn page
│   └── practice/page.tsx # Practice page
├── components/           # React components
│   ├── theme-provider.tsx / theme-toggle.tsx
│   ├── locale-provider.tsx / locale-toggle.tsx   # i18n context + switcher
│   ├── layout-client.tsx / nav-link.tsx / mobile-nav.tsx
│   ├── learn/            # character-grid / character-detail / quiz-dialog
│   ├── practice/         # writing-dialog / writing-canvas / quiz-dialog / weekly-progress / practice-options / practice-assets
│   ├── ui/               # shadcn-style primitives (button, card, badge, dialog, dropdown-menu, ...)
│   └── feature-card.tsx / stats-card.tsx / empty-state.tsx / toast.tsx
├── hooks/                # use-quiz / use-progress / use-pronunciation / use-is-dark / use-scroll-reveal
├── lib/                  # characters / character-types / storage / utils / i18n (index + translations/)
└── proxy.ts              # OpenNext dev proxy (CSP injection)
```

## Core Pages

### Home (/)
- Hero section showcasing app features
- Feature introduction (Stroke Feedback, Etymology & Culture, Adaptive Learning)
- Responsive design with dark/light mode support

### Learn (/learn)
- 12 basic Chinese characters for learning
- Character selection and detail display
- Writing practice and pronunciation playback

### Practice (/practice)
- Handwriting practice mode (Tian-zi-ge canvas)
- Pinyin quiz mode (4-choice)
- Learning progress tracking with real stats (streak / accuracy / weekly activity)

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

No environment variables are required to run HanziMaster. The app works fully offline with localStorage-based progress tracking.

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

© 2026 HanziMaster 汉字大师 v5.2.6. All rights reserved.
