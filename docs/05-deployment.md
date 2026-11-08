# 部署指南

> 文档版本：v5.2.44（与项目版本同步，权威版本见 `package.json`）

本文描述项目的部署配置与上线流程。构建前的完整质量门禁见 [coding-standards.md](coding-standards.md) §11，发版与自动发布流程见 [git-workflow.md](git-workflow.md) §6 与 §6.1。

## 1. 部署目标与约束

| 平台 | 配置文件 | 说明 |
|------|---------|------|
| Vercel | `vercel.json` | Next.js 官方托管，框架自动识别 |
| 腾讯云 EdgeOne Pages | `edgeone.json` | 国内访问加速 |

共同约束：

- **运行时**：Node.js `>= 24.11.0`（`.nvmrc` 锁定 `24.11.0`），pnpm `>= 11`（`packageManager: pnpm@11.24.0`）。
- **包管理器**：项目强制 pnpm（`preinstall: npx only-allow pnpm`，`.npmrc` 设 `engine-strict` / `package-manager-strict`）。开发者侧命令一律 `pnpm`；仅 `edgeone.json` 内的 `npm run build` 是构建平台内部命令，见 §3。
- **环境变量**：运行应用**不需要任何环境变量**。`.env.local` 仅供本地可选配置，不提交仓库。
- **联网资源**：`next/font/google` 需访问 Google Fonts（Space Grotesk / Playfair Display / Noto Serif SC / JetBrains Mono）。离线/沙箱环境构建可能因字体下载失败，属环境限制而非代码缺陷，部署平台需允许该域名。
- **安全响应头**：CSP、`X-Content-Type-Options`、`X-Frame-Options`、`Referrer-Policy`、`Permissions-Policy` 由 `next.config.mjs` 的 `headers()` 统一注入到所有路由，**不要在平台配置里重复定义或覆盖**。
- **无中间件**：项目不含 `middleware.ts` / `proxy.ts`，不存在额外边缘运行时逻辑。

## 2. Vercel 部署

`vercel.json` 当前内容：

```json
{
  "framework": "nextjs",
  "headers": [
    {
      "source": "/(.*\\.(js|css|svg|png|jpg|jpeg|gif|ico|woff|woff2|ttf|eot))",
      "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
    }
  ]
}
```

即：框架识别 + 静态资源长期缓存；**未配置**自定义 `buildCommand` / `outputDirectory` / `rewrites`，均走 Vercel 的 Next.js 默认流程。

步骤：

1. 将代码推送到 Git 仓库（分支与合并规则见 [git-workflow.md](git-workflow.md)）。
2. 在 https://vercel.com/new 导入仓库，Framework Preset 选 `Next.js`。
3. 保持默认 Build Command（等价 `pnpm build`）与 Output Directory（`.next`）。
4. 点击 Deploy；平台按 `packageManager` 自动使用 pnpm。
5. 部署成功后在控制台绑定自定义域名（可选）。

## 3. 腾讯云 EdgeOne Pages 部署

`edgeone.json` 当前内容：

| 配置项 | 值 | 说明 |
|--------|-----|------|
| `name` | `hanzi-master` | 应用名 |
| `installCommand` | `npm install -g pnpm@11 && pnpm install` | 构建器先装 pnpm 再安装依赖；若直接用 `npm install` 会被项目 `preinstall` 的 only-allow 守卫拦截 |
| `buildCommand` | `npm run build` | 构建平台内部命令，等价 `pnpm build`；此处是平台约定写法，开发者本地不得照抄 |
| `nodeVersion` | `24.11.0` | 与 `.nvmrc` 一致 |
| `headers` | `/_next/static/*` → `public, max-age=31536000, immutable` | 静态产物长期缓存 |

步骤：

1. 将代码推送到 Git 仓库。
2. 在 EdgeOne Pages 控制台创建应用并关联仓库。
3. 确认上述 `installCommand` / `buildCommand` / `nodeVersion` 生效；输出目录按平台 Next.js 预设（`.next`），不要改成静态站点目录。
4. 触发部署，检查构建日志中字体下载与 CSP 响应头。
5. 绑定自定义域名与 HTTPS（可选）。

### 3.1 安全响应头：权威源、兜底与线上核验（P1-32）

- **权威源**：`next.config.mjs` 的 `securityHeaders` 通过 `headers()` 注入所有页面响应（CSP / X-Frame-Options / X-Content-Type-Options / Referrer-Policy / Permissions-Policy / COOP）。
- **平台兜底**：`edgeone.json` 的 `headers` 显式声明同一组头，`/*` 覆盖页面、`/_next/static/*` 覆盖 CDN 静态产物（避免平台只透传静态资源而丢头）。两处 CSP 字符串必须逐字一致；浏览器对重复 CSP 取交集，一致时无副作用。
- **线上核验命令**（部署后执行，本地无法代替）：

```bash
curl -sSI https://<your-domain>/ | grep -iE 'content-security-policy|x-frame-options|x-content-type-options|referrer-policy|permissions-policy|cross-origin-opener-policy'
curl -sSI https://<your-domain>/_next/static/<任一 chunk> | grep -iE 'cache-control|content-security-policy|x-content-type-options'
curl -sSI https://<your-domain>/learn | grep -i 'content-security-policy'
```

- **验收口径**：三者均返回预期头；若页面响应出现两条不同 CSP，说明平台覆盖了 Next 注入值，需在控制台关闭平台侧的 CSP 覆写，保留 `next.config.mjs` 单一来源。
- 本次交付为配置与核验流程；**线上 `curl -I` 实测需在有域名的部署环境执行**（本地构建不产生 EdgeOne 边缘响应），结果回填至本节。

## 4. 关于「静态托管」与 SPA 重写

本项目是 **Next.js App Router 应用，不是纯静态 SPA**：

- `.next` 是服务端构建产物目录，**不能**仅把 `.next/` 里的文件复制到任意静态托管就认为部署完成；需要支持 Next.js 服务端/边缘运行时的托管环境。
- 历史版本本文曾给出「所有路由重写到 `index.html`」的 Nginx / Netlify SPA 配置，该写法与 App Router 冲突，已删除。若迁移到自托管，应使用 `pnpm build && pnpm start` 启动 Next 服务，由反向代理转发到 Node 进程，而不是 rewrite 到单个 HTML 文件。

自托管最小流程：

```bash
pnpm install
pnpm build
pnpm start          # 默认监听 3000
```

反向代理把请求转发到该端口即可；保留 `next.config.mjs` 注入的响应头，不要在代理层重复设置冲突的 CSP。

## 5. 性能与缓存

- 静态资源（`/_next/static/*`、字体、图片）长期缓存 `public, max-age=31536000, immutable`，已在两个平台配置中声明。
- HTML / 页面响应由 Next.js 自行控制，不设长期强缓存。
- 启用 Gzip 或 Brotli 压缩；面向国内用户可配合 CDN。
- Google Analytics 相关域名由 CSP 的 `script-src` / `connect-src` 放行，新增第三方脚本须同步更新 `next.config.mjs` 的 `securityHeaders`。

## 6. CI/CD 工作流与自动发布

GitHub Actions 工作流（`.github/workflows/`）一览：

| 工作流 | 触发 | Job | 说明 |
|--------|------|-----|------|
| `ci.yml` | push / PR（`main`、`develop`）、手动 | `quality` / `coverage` / `e2e` | 全量质量门禁：lint、`tsc --noEmit`、单测、行数门禁、生产依赖审计、`pnpm build`、体积预算、i18n 与版本展示位校验；coverage 上传报告 artifact；e2e 含 a11y（Playwright + axe） |
| `deploy.yml` | push `main`、手动 | `vercel` | Vercel 生产部署；未配置 Secrets 时自动跳过（见工作流内 `::notice::`） |
| `release.yml` | push tag `v*`、手动 | `release` | **自动发布 GitHub Releases**：校验 tag/版本一致 → 校验同 commit 的 CI 全 job 与 Deploy 结论 → 同名 Release 查重 → 取 `CHANGELOG.md` 对应小节为正文，规则见 [git-workflow.md](git-workflow.md) §6.1 |

**自动发布规则**：推送 tag `vX.Y.Z` 后，仅当同一 commit 的 `ci.yml` 全部 job（`quality` / `coverage` / `e2e`）与 `deploy.yml` 均为绿色（Deploy 跳过视为可发布）、tag 与 `package.json` 版本一致、且同名 Release 不存在时，自动创建 GitHub Release——标题 `vX.Y.Z`，正文由 `scripts/extract-changelog.mjs` 从 `CHANGELOG.md` 抽取；任一门禁失败则不发布并在 Action 日志标注 `::error::` 原因。首次上线前需在有 Tag 的仓库实跑一次确认。

## 7. 部署前检查清单

- [ ] 代码已按 [git-workflow.md](git-workflow.md) 合并到目标分支，`CHANGELOG.md` 与版本号已同步
- [ ] `pnpm lint` 0 error / 0 warning
- [ ] `pnpm exec tsc --noEmit` 0 error
- [ ] `pnpm test` 全部通过
- [ ] `pnpm check:lines` 输出 `all <= 200`
- [ ] `pnpm security:audit`（`pnpm audit --prod --audit-level=high`）无高危
- [ ] `pnpm build` 成功
- [ ] CI 全部工作流在目标 commit 上为绿色；打 Tag 后确认 `release.yml` 自动创建 Release 且正文与 `CHANGELOG.md` 一致
- [ ] 生产页脚 `#footer-version` 显示 `vX.Y.Z · build yymmddhhmm`（10 位 build 编号；版本号来自 `package.json`，build 编号由 `next.config.mjs` 构建时注入，无需手工维护）
- [ ] CSP 与 `X-Frame-Options` 等响应头在部署环境生效
- [ ] 11 语言切换、深色模式、Canvas 书写与发音在目标环境手工验证

## 8. 依赖升级与回滚策略（P2-12）

`package.json` 的全部依赖钉为**精确版本**（不含 `^` / `~`），`pnpm-lock.yaml` 为唯一解析来源，CI 使用 `pnpm install --frozen-lockfile`。这样同一 commit 在任何环境构建产物一致，杜绝「装到更新小版本导致线上与 CI 行为不一致」。

**升级流程**：

1. 建分支 `chore/deps-<包名>-<版本>`；用 `pnpm up <包名>@<精确版本> --save-exact` 修改 `package.json` 与 lockfile（禁止手改 lockfile）。
2. 本地跑完整门禁：`pnpm lint`、`tsc --noEmit`、`pnpm test`、`pnpm check:lines`、`pnpm bundle:check`、`pnpm build`；升级 Next/React 时追加 `pnpm e2e`。
3. 按 git-workflow 规范 bump 一个 patch 版本、写 `CHANGELOG.md`（注明升级包与版本）后提 PR；CI 全绿方可合并。
4. 生产部署后复核页脚 build 编号、控制台错误与体积预算。

**回滚**：

- 依赖问题：回滚对应 commit（`git revert`，禁止改写已发布 Tag），重新 `pnpm install --frozen-lockfile` 构建部署；必要时删除 `node_modules` 与 `.next` 后重装。
- 平台回滚：Vercel / EdgeOne 控制台切回上一个成功部署；回滚后按 §3.1 复验安全响应头。
- 已发 Release 不删除不覆盖；修复后使用新的 patch 版本重新走 §6 发版流程（见 [git-workflow.md](git-workflow.md) §6.1）。

## 9. 相关文档

- [编码规范与质量门禁](coding-standards.md)
- [Git 工作流与发版流程](git-workflow.md)
- [技术架构：安全响应头与注入链路](02-architecture.md)
- [项目概述：环境与目录](01-overview.md)
