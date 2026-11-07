# 开发指南

> 文档版本：v5.2.40（与项目版本同步，权威版本见 `package.json`）

本文负责**开发环境、命令表与日常流程**。编码风格、命名、目录组织、设计 token、i18n、版本号与质量门禁的唯一权威是 [coding-standards.md](coding-standards.md)；提交、分支与审查见 [git-workflow.md](git-workflow.md)。

## 1. 环境要求

| 工具 | 要求 | 依据 |
|------|------|------|
| Node.js | `>= 24.11.0` | `package.json` `engines` / `.nvmrc`（`24.11.0`） |
| pnpm | `>= 11`，锁定 `pnpm@11.24.0` | `packageManager` / `.npmrc` `package-manager-strict` |
| 浏览器 | Chrome / Firefox / Safari / Edge 最新两个主要版本 | 开发与手工验证 |

强制 pnpm：`preinstall` 为 `npx only-allow pnpm`，执行 `npm install` / `yarn` 会被拦截；`.npmrc` 设 `engine-strict=true` 与 `package-manager-strict=true`，版本不符直接报错。仓库只有 `pnpm-lock.yaml`，不使用 `package-lock.json` / `yarn.lock`。

`pnpm-workspace.yaml` 在 pnpm v10+ 承载 `onlyBuiltDependencies`（esbuild / sharp）与 `overrides`（传递依赖补丁版本下限），不要把这些配置写回 `package.json` 的 `pnpm` 字段。

## 2. 安装与启动

```bash
git clone <repository-url>
cd HanziMaster
pnpm install
pnpm dev
```

开发服务器默认 `http://localhost:3000`，支持 HMR。生产验证：

```bash
pnpm build
pnpm start
```

构建产物位于 `.next/`。核心页面无需任何环境变量即可运行；可选变量（站点地址 / GA / Sentry / 体积分析）见 `.env.example` 与 [01-overview.md](01-overview.md) §7，`.env.local` 为本地可选文件且不提交。

## 3. 命令表

与 `package.json` `scripts` 一一对应：

| 命令 | 底层调用 | 说明 |
|------|---------|------|
| `pnpm dev` | `next dev` | 开发服务器 |
| `pnpm build` | `next build` | 生产构建 |
| `pnpm start` | `next start` | 生产服务器 |
| `pnpm lint` | `eslint .` | ESLint 检查（flat config） |
| `pnpm lint:fix` | `eslint . --fix` | 自动修复 |
| `pnpm test` | `vitest run` | 单元测试 |
| `pnpm test:watch` | `vitest` | 监听模式 |
| `pnpm test:run` | `node scripts/run-tests.mjs` | 包装器，产物写 `reports/`，可透传 `--coverage` |
| `pnpm check:lines` | `node scripts/check-line-count.mjs` | 单文件 ≤ 200 行门禁，结果写 `reports/line-count.txt` |
| `pnpm check:root` | `node scripts/check-root-clean.mjs` | 根目录清洁度门禁（白名单制），结果写 `reports/root-clean.txt` |
| `pnpm bundle:check` | `node scripts/check-bundle-size.mjs` | 构建产物体积预算门禁（写 `reports/`） |
| `pnpm e2e` | `playwright test` | Playwright 端到端测试（`e2e/`，含 axe 无障碍断言） |
| `pnpm e2e:ui` | `playwright test --ui` | E2E 可视化调试模式 |
| `pnpm analyze` | `node scripts/analyze.mjs` | 构建产物分析（配合 `ANALYZE=1`） |
| `pnpm i18n:lint` | `node scripts/i18n-lint.mjs` | 11 语言键一致性与扩展模块校验 |
| `pnpm version:sync` | `node scripts/sync-version.mjs` | 以 `package.json` 为权威源同步全局版本展示位 |
| `pnpm version:check` | `node scripts/sync-version.mjs --check` | 只校验不同步，CI 使用 |
| `pnpm prototype:parity` | `node scripts/prototype-parity.mjs` | 原型与应用的 token / 结构对齐校验 |
| `pnpm format` | `prettier --write`（覆盖 `src/**`、`e2e/**`、`scripts/**`、`*.{ts,mjs,js}`、`prototype/scripts/**`、`prototype/styles/**`） | 按 `.prettierrc.json` 格式化；`prettier ^3.9.10` 已安装 |
| `pnpm security:audit` | `pnpm audit --prod --audit-level=high` | 生产依赖审计 |
| `pnpm security:audit:dev` | `pnpm audit --audit-level=high` | 全量（含 dev 链）审计 |

类型检查无独立脚本，用 `pnpm exec tsc --noEmit`（`tsconfig.json` 已设 `noEmit: true`）。

## 4. 版本与 build 注入链路

```
package.json version（唯一权威源）
  └─ next.config.mjs 读取并注入（dev / build 均生效）
       ├─ NEXT_PUBLIC_APP_VERSION = <package.json 的 version，无硬编码>
       └─ NEXT_PUBLIC_BUILD_ID   = yymmddhhmm（构建时刻本地时间的 10 位编号）
            └─ src/lib/version.ts
                 ├─ APP_VERSION / BUILD_ID / VERSION_LABEL
                 └─ layout-client.tsx 用 t('footer.copyright', { versionLabel }) 插值
                      └─ #footer-version / #drawer-version 展示
```

- `VERSION_LABEL` 格式：`vX.Y.Z · build yymmddhhmm`（10 位 build 编号，如 `v5.2.40 · build 2611071530`）；`BUILD_ID` 缺失时回退为 `vX.Y.Z`。
- 11 个语言包的 `footer.copyright` 只含 `{{versionLabel}}` 占位符，**发版不需要改动翻译文件**。
- 不存在 `common.appVersion` 键；`src/lib/version.ts` 与 `next.config.mjs` 不含硬编码版本号。
- 需要手工同步的全局展示位见 [coding-standards.md](coding-standards.md) §3。

## 5. 日常开发流程

1. 实查版本与状态：`node -e "console.log(require('./package.json').version)"`，确认工作区无意外改动。
2. 从 `develop` 创建分支（命名与例外见 [git-workflow.md](git-workflow.md) §1）。
3. 编码前读 [coding-standards.md](coding-standards.md) 与 [04-api-reference.md](04-api-reference.md)，确认复用既有组件与 hooks。
4. 涉及设计改动时对照 [07-design-prototype.md](07-design-prototype.md) 与 `prototype/prototype.html`。
5. 本地验证：格式化 → 类型检查 → lint → 单测 → 行数 → 审计 → 构建（命令见 §3 与 [coding-standards.md](coding-standards.md) §11）。
6. 按 [commit-template.md](commit-template.md) 提交并 bump 版本；按 [git-workflow.md](git-workflow.md) §5 发起 PR 与审查。
7. 任务状态更新到 [tasks.md](tasks.md)（唯一来源），完成后归档到 [tasks-done.md](tasks-done.md)。

## 6. 本机工具链注意事项

- pnpm v10+ 的 deps 状态检查可能因 esbuild / sharp 构建脚本被忽略而报 `ERR_PNPM_IGNORED_BUILDS`，阻断 `pnpm exec` / `pnpm test`。此时用 Node 直跑等价命令：
  - `node node_modules/typescript/bin/tsc --noEmit`
  - `node node_modules/vitest/vitest.mjs run --reporter=dot`
  - `node node_modules/eslint/bin/eslint.js src`
  - `node scripts/check-line-count.mjs`
- 含 `vitest` 字样的长命令可能被工具误判为 watch 并提前中断，用 `node scripts/run-tests.mjs` 包装并读取 `reports/test-out.txt`。
- Node 24 的 `globalThis.localStorage` getter 会遮蔽 jsdom 实现，`vitest.setup.ts` 已安装内存 Storage 兜底；业务代码统一用 `window.localStorage`（见 [06-testing.md](06-testing.md) §1）。
- 离线环境 `next build` 可能因 `next/font/google` 下载字体失败，见 [05-deployment.md](05-deployment.md) §1。
- 推送 GitHub 返回 `remote: Internal Server Error` 时，用 `git -c http.version=HTTP/1.1 push origin <branch>` 重试。

## 7. 相关文档

- [编码规范（权威）](coding-standards.md)
- [提交信息规范](commit-template.md)
- [Git 工作流与代码审查](git-workflow.md)
- [API 参考](04-api-reference.md)
- [测试规范](06-testing.md)
- [部署指南](05-deployment.md)
- [文档中心与术语约定](index.md)
