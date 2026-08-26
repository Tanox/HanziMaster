# Contributing

Thank you for considering contributing to **HanziMaster 汉字大师**! This document explains how to get involved in development and submit changes.

[中文](CONTRIBUTING.md)

## Code of Conduct

Please keep communication friendly and respectful, and focus on technical issues.

## Development Setup

```bash
# 1. Fork and clone the repository
git clone https://github.com/<your-username>/HanziMaster.git
cd HanziMaster

# 2. Install dependencies (Node.js >= 24.11.0 required, pnpm only)
pnpm install

# 3. Start the dev server
pnpm dev
```

> This project enforces pnpm: running `npm install` / `yarn` is blocked by the `preinstall` hook (`only-allow pnpm`).

The dev server runs at `http://localhost:3000` by default.

## Development Workflow

1. Create a feature branch from `main`: `git checkout -b feature/<short-desc>` or `fix/<short-desc>`.
2. Implement your change locally and make sure lint and build pass:
   ```bash
   pnpm lint
   pnpm build
   ```
3. Commit your changes (see Commit Convention below).
4. Push the branch and open a Pull Request against `main`.

## Commit Convention

This project follows the Angular commit convention:

```
<type>: <description>

[optional body]

[optional footer]
```

| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation change |
| `style` | Code style only (no logic change) |
| `refactor` | Code refactoring |
| `perf` | Performance improvement |
| `test` | Test changes |
| `build` | Build/dependency changes |
| `ci` | CI/CD changes |
| `chore` | Other misc changes |

Rules: lowercase first letter, imperative mood, ≤ 50 characters, no trailing period.

## Versioning

Any code or docs change must bump the version per [SemVer](https://semver.org/) (minimum is a patch bump):

- Fix/docs/config → `x.y.Z+1`
- New feature (backward-compatible) → `x.Y+1.0`
- Breaking change → `X+1.0.0`

Update: the file-header `// path vX.Y.Z` comment on changed files, the `version` field in `package.json`, and add a new section in `CHANGELOG.md`.

## Code Standards Summary

- Use TypeScript strict mode; avoid `any`.
- Mark client components with `'use client'`.
- All user-visible text must go through i18n (see `src/lib/i18n/`).
- Split any source file exceeding 200 lines by responsibility.
- Follow Tailwind CSS 4.0 and the design-system tokens; no hardcoded colors.

See [openspec/03-development.md](openspec/03-development.md) and [openspec/coding-standards.md](openspec/coding-standards.md) for details.

## Reporting Issues

Please open a GitHub Issue with:

- Steps to reproduce
- Expected vs. actual behavior
- Browser/OS environment
- Screenshots if relevant

---

© 2026 HanziMaster 汉字大师
