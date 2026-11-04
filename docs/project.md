# Project Context

> Document version: v5.2.34 (single source of truth: `package.json`)

This file is the English project context consumed by AI tooling. It is a **summary only**: the authoritative rules live in [coding-standards.md](coding-standards.md), [commit-template.md](commit-template.md), [git-workflow.md](git-workflow.md) and [index.md](index.md). If this file conflicts with them, fix this file.

## Purpose

HanziMaster (汉字大师) is a local-first Chinese character learning web app: guided practice, stroke-order demonstrations, Tian-zi-ge Canvas writing, pinyin quizzes and progress tracking. It has 11 languages, dark/light/system themes and a responsive interface. No accounts, no backend API, no cloud sync, no AI service.

## Tech Stack

- **Framework**: Next.js `16.4.4` (App Router) + React `^19.1.0` + TypeScript `^5.7.3` (strict, `noEmit`).
- **Styling**: Tailwind CSS `^4.0.12` + `@tailwindcss/postcss ^4.2.11`; design tokens have **two sources with distinct roles**: `src/app/globals.css` `@theme` (semantic `--color-*` tokens) and `tailwind.config.ts` (ink/vermilion/indigo scales, fonts, keyframes, shadows).
- **Fonts**: `next/font/google` — Space Grotesk (`--font-sans`), Playfair Display (`--font-display` / `--font-heading`), Noto Serif SC (`--font-serif`), JetBrains Mono (`--font-mono`).
- **Primitives**: shadcn/ui `radix-nova` preset (`components.json`); `src/components/ui/` currently contains only `button`, `badge`, `dialog`, `tooltip`.
- **i18n**: custom `LocaleProvider` context, 11 language packs in `src/lib/i18n/translations/`, `t()` constrained by the `TranslationKey` dotted union, `{{name}}` interpolation via `src/lib/i18n/translate.ts`.
- **State**: React Context (`ThemeProvider`, `LocaleProvider`) + `useProgress`; persistence through `src/lib/storage.ts` over `window.localStorage` (versioned + schema-validated).
- **Testing**: Vitest `^3.2.4` + jsdom `^30.1.3` + `@testing-library/react ^16.3.3`; 9 test files / 47 cases. See [06-testing.md](06-testing.md).
- **Tooling**: pnpm `11.24.0` (enforced by `preinstall` + `.npmrc`), Node `>= 24.11.0`, ESLint 9 flat config, `.prettierrc.json` exists but `prettier` is **not declared as a dependency** (`pnpm format` is currently unusable).
- **Deployment**: Vercel (`vercel.json`) / Tencent Cloud EdgeOne Pages (`edgeone.json`).

## Project Conventions

### Code Style

- Source files ≤ 200 lines; split by responsibility. Applies to code only — never split `.md` documents.
- First line of each source file: `// <repo-relative-path> vX.Y.Z`, updated **only for changed files**.
- kebab-case file names, PascalCase components/types (no `I` prefix), camelCase functions, UPPER_SNAKE_CASE constants, `use*` hooks, semantic kebab-case DOM ids.
- `'use client'` for interactive components; currently `layout.tsx` is a Server Component and all three pages (`/`, `/learn`, `/practice`) are Client Components.
- All user-visible text goes through `t()`; new keys must be added to all 11 language packs.
- No `any`, no `console.log`/`debugger`, no hardcoded colors, no `rounded-[Npx]`, no `transition-all`.
- See [coding-standards.md](coding-standards.md) for the full rules and the quality gates.

### Directory Layout

`src/app/` (routes + global styles), `src/components/` (`ui/`, `learn/`, `practice/`, `state/`, shared), `src/hooks/`, `src/lib/` (`i18n/`, data, utils, `version.ts`, `__tests__/`), `prototype/` (6 HTML skeletons + `styles/` + `scripts/`), `scripts/`, `docs/`, `reports/` (ignored). Full tree: [01-overview.md](01-overview.md) §6.

### Versioning

`package.json` `version` is the only authoritative source. `next.config.mjs` injects `NEXT_PUBLIC_APP_VERSION` and a build-time `NEXT_PUBLIC_BUILD_ID` (`yyyymmddhhmm`); `src/lib/version.ts` exposes `VERSION_LABEL`; `layout-client.tsx` interpolates it into `footer.copyright` (`{{versionLabel}}`). Translation files contain no literal versions. Every change bumps at least a patch and syncs `metadata.json`, both READMEs and `CHANGELOG.md`. There is no `common.appVersion` key and no `VERSION` file.

### Git Workflow

- Conventional Commits `<type>: <description>` with 10 allowed types; see [commit-template.md](commit-template.md).
- Branches: `main`, `develop`, `feature/*`, `fix/*`, `bugfix/*`, `hotfix/*`, `release/*`; PR + code review required; see [git-workflow.md](git-workflow.md).
- Tasks/backlog live **only** in [tasks.md](tasks.md); completed work is archived in [tasks-done.md](tasks-done.md).

### Quality Gates

`pnpm exec tsc --noEmit`, `pnpm lint`, `pnpm test`, `pnpm check:lines`, `pnpm security:audit`, `pnpm build`. On this machine, pnpm v10+ may fail with `ERR_PNPM_IGNORED_BUILDS`; run the equivalent Node commands directly or use `node scripts/run-tests.mjs`. See [coding-standards.md](coding-standards.md) §11.

## Domain Context

- Design system: 东方水墨·朱砂红 (Ink-and-Vermilion). Primary `#c53d43` (vermilion-500), accent `#4f46e5` (indigo-500), ink neutral scale.
- 11 locales: `en, zh-CN, zh-TW, es, ar, fr, pt-BR, de, ja, ko, ru`.
- `prototype/prototype.html` is the single authoritative high-fidelity prototype; `wireframes.html` documents states and breakpoints.
- `src/components/learn/quiz-dialog.tsx` and `src/components/practice/quiz-dialog.tsx` use distinct ids (`learn-quiz-dialog` / `practice-quiz-dialog`); list rendering must not reuse static ids.

## Important Constraints

- No environment variables are required at runtime. Google Fonts is the only network dependency at build time; offline `next build` may fail on font download (environment limitation, not a code defect).
- CSP and all security headers are injected centrally by `next.config.mjs` `headers()` for `/:path*`. There is **no** `middleware.ts` / `proxy.ts`; do not reintroduce it.
- Coverage tooling (`@vitest/coverage-v8`) and a CI workflow (`.github/workflows/`) are not yet configured; do not claim `pnpm test -- --coverage` works. Remaining work is tracked in [tasks.md](tasks.md).
- Historical `openspec/` paths inside `CHANGELOG.md` and archived documents are historical records — do not bulk-replace them.

## External Dependencies

- No third-party runtime API. Google Fonts (`next/font/google`) and Google Analytics domains are allowlisted in CSP.
- Deployment platforms: Vercel, Tencent Cloud EdgeOne Pages.
