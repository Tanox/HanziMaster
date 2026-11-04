# Contributing

Thank you for considering contributing to **HanziMaster 汉字大师**. This page is the **entry point**; the authoritative rules live in `docs/`.

[中文](CONTRIBUTING.md) · [Documentation hub](docs/index.md)

## Code of Conduct

Keep communication friendly and respectful, focused on technical issues. See `.github/CODE_OF_CONDUCT.md`; report security issues per `.github/SECURITY.md`.

## Development Setup

```bash
git clone https://github.com/<your-username>/HanziMaster.git
cd HanziMaster
pnpm install
pnpm dev
```

- Node.js `>= 24.11.0`, pnpm `>= 11` (pinned `11.24.0`). pnpm is enforced; `npm install` / `yarn` are blocked by the `preinstall` hook.
- Dev server: `http://localhost:3000`. No environment variables are required.
- Full setup and script table: [docs/03-development.md](docs/03-development.md).

## Development Workflow

1. Branch from `develop`: `feature/<desc>` or `fix/<desc>`. Naming and exceptions: [docs/git-workflow.md](docs/git-workflow.md) §1.
2. Read the [coding standards](docs/coding-standards.md) (naming, layout, i18n, design tokens, line limit, version sync) and the [API reference](docs/04-api-reference.md).
3. Run all [quality gates](docs/coding-standards.md) §11: type check, lint, unit tests, line count, security audit, build.
4. Write commits per the [commit convention](docs/commit-template.md), including the new version number in the body/footer.
5. Push the branch, open a PR using the [PR template](.github/PULL_REQUEST_TEMPLATE.md), and complete the [code review flow](docs/git-workflow.md) §5 before a reviewer merges it.

> If `pnpm exec` / `pnpm test` fails locally with `ERR_PNPM_IGNORED_BUILDS`, use the equivalent Node commands in [coding standards](docs/coding-standards.md) §11 and note them in the PR.

## Rule Index (not redefined here)

| Topic | Authoritative document |
|-------|------------------------|
| Code style, naming, directory layout, i18n, design tokens, quality gates | [docs/coding-standards.md](docs/coding-standards.md) |
| Commit message format and the 10 allowed types | [docs/commit-template.md](docs/commit-template.md) |
| Branches, PRs, code review, release | [docs/git-workflow.md](docs/git-workflow.md) |
| Test organization and conventions | [docs/06-testing.md](docs/06-testing.md) |
| Deployment and release checklist | [docs/05-deployment.md](docs/05-deployment.md) |
| Terminology, formatting, document version stamps | [docs/index.md](docs/index.md) §4 / §5 |
| All pending tasks and improvements | [docs/tasks.md](docs/tasks.md) |

## Versioning Summary

Every change (including docs) bumps at least a patch version. `package.json` `version` is the single source of truth; also sync `metadata.json`, both READMEs, `CHANGELOG.md`, and the header comment / version stamp of changed files. Full list: [docs/coding-standards.md](docs/coding-standards.md) §3.

## Reporting Issues

Open a GitHub Issue with: reproduction steps, expected vs actual behavior, browser/OS, and screenshots if relevant.

---

© 2026 HanziMaster 汉字大师
