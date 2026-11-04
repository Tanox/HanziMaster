# 部署指南

> 文档版本：v5.2.34（与项目版本同步，权威版本见 `package.json`）

本文描述项目的部署配置与上线流程。构建前的完整质量门禁见 [coding-standards.md](coding-standards.md) §11，发版流程见 [git-workflow.md](git-workflow.md) §6。

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

## 6. 部署前检查清单

- [ ] 代码已按 [git-workflow.md](git-workflow.md) 合并到目标分支，`CHANGELOG.md` 与版本号已同步
- [ ] `pnpm lint` 0 error / 0 warning
- [ ] `pnpm exec tsc --noEmit` 0 error
- [ ] `pnpm test` 全部通过
- [ ] `pnpm check:lines` 输出 `all <= 200`
- [ ] `pnpm security:audit`（`pnpm audit --prod --audit-level=high`）无高危
- [ ] `pnpm build` 成功
- [ ] 生产页脚 `#footer-version` 显示 `vX.Y.Z · build yyyymmddhhmm`（版本号来自 `package.json`，build 编号由 `next.config.mjs` 构建时注入，无需手工维护）
- [ ] CSP 与 `X-Frame-Options` 等响应头在部署环境生效
- [ ] 11 语言切换、深色模式、Canvas 书写与发音在目标环境手工验证

## 7. 相关文档

- [编码规范与质量门禁](coding-standards.md)
- [Git 工作流与发版流程](git-workflow.md)
- [技术架构：安全响应头与注入链路](02-architecture.md)
- [项目概述：环境与目录](01-overview.md)
