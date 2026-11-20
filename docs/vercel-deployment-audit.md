# Vercel 部署阻塞项审计

> 文档版本：v5.2.56（与项目版本同步，权威版本见 `package.json`）
> 审计时间：2026-11-20（UTC+8） · 基线：HEAD `86a512d` / v5.2.56
> 审计性质：**只读静态审计**——未修改代码、未访问 Vercel / GitHub 控制台（本机无平台凭据）。线上结论引用仓库已记录的实测证据（`docs/tasks.md` §6.2、`docs/05-deployment.md` §3.1、`CHANGELOG.md` 5.2.54）。

## 0. 结论摘要

| 优先级 | 数量 | 性质 | 核心结论 |
|--------|------|------|---------|
| **P0 阻断** | 2 | 平台配置 | ① 部署 Secrets 缺失导致 Deploy「跳过但成功」；② `NEXT_PUBLIC_SITE_URL` 未在 Vercel 项目生效，构建 fail-closed 或产出 localhost 绝对 URL |
| **P1 高** | 5 | 配置/路由 | Sentry 构建路径从未验证、Node/pnpm 版本未显式锁定、proxy 误拦截 OG 图路由、GA4 构建期内联易误配、双部署通道与 Release 门禁把 skip 视为成功 |
| **P2 中** | 4 | 健壮性 | 平台缓存规则过宽、构建期字体外网依赖、Blob 云同步未配置且备份上限超 Serverless body limit、文档/配置漂移 |

**一句话**：源码侧没有「必然构建失败」的硬缺陷，**真正的 P0 全在 Vercel/GitHub 平台配置**；P1 中有两项（OG 图路由、Sentry 构建路径）是部署后才会暴露的隐藏风险。

---

## 1. P0 阻断项

### P0-A · Vercel Secrets 未配置，Deploy 空跑成功

- **具体表现**：
  - `.github/workflows/deploy.yml:31-43` 检查 `VERCEL_TOKEN` / `VERCEL_ORG_ID` / `VERCEL_PROJECT_ID`，缺任一项输出 `Vercel secrets 未配置，跳过部署` 并令 `ready=false`；`:45-56` 的真正部署步骤被跳过。
  - `docs/tasks.md:201` 记录真实运行 `44727890228` 命中该路径；`CHANGELOG.md:34` 同样记录。`docs/05-deployment.md:116` 明示该行为。
  - `.github/workflows/release.yml:85-92` 将 `skipped` 的 Deploy 结论视为「可发布」，因此 Tag 可以成功建 Release，但**生产域没有更新**。
  - `docs/tasks.md:190-195` 线上实测：`<html lang="en">`、canonical 为 `http://localhost:3000`、hreflang 0 条、无 og:image、链接无语言前缀——均与新代码不符，确认线上仍是旧构建。
- **影响范围**：所有 `main` 推送均不产生新部署；SEO/i18n/分享图等已归档改动全部未上线；Release 产物与生产实际版本脱节；误导 CI 绿灯判断。
- **排查所需信息**：
  1. GitHub 仓库 `Settings → Secrets and variables → Actions` 中三项 Secret 是否**存在**（只核名称，不打印值）；
  2. Vercel 项目的 `Project ID` / `Org ID`，Token 的权限范围（personal/team、是否含 deploy 权限）；
  3. Vercel Dashboard 的 Deployments 列表：最近一次生产部署的时间与 commit；
  4. 生产域 `hanzi.ewuse.com` 当前解析到 Vercel 还是 EdgeOne（`dig +short hanzi.ewuse.com`）；
  5. 是否同时开启了 Vercel Git Integration（见 P1-E）。
- **验证方式**：
  - 重新 `workflow_dispatch` 触发 Deploy，日志**不得**出现「跳过部署」，须出现 `vercel build` / `vercel deploy` 输出与部署 URL；
  - Vercel Dashboard 出现新 Deployment 且 `Production` 标签指向该 commit；
  - `curl -sS https://<域名>/api/health` 返回的 `version` / `build` 与 `package.json` 及最新构建编号一致。

### P0-B · `NEXT_PUBLIC_SITE_URL` 未在 Vercel 项目生效

- **具体表现**：
  - `next.config.mjs:22-40`：生产环境该变量缺失或非法（缺协议、带 query/hash、重复尾斜杠）即 `throw`，**构建直接失败**。
  - `src/lib/site.ts:7,21-25`：运行时默认回退 `http://localhost:3000`；canonical/hreflang（`src/lib/build-metadata.ts:16,32-35`）、`sitemap.ts:12,19`、`robots.ts:26-27`、JSON-LD 全部派生自它。
  - `.github/workflows/ci.yml:55-59` 用 `vars.NEXT_PUBLIC_SITE_URL || 'https://example.com'` 兜底，所以**CI 构建成功不能证明 Vercel 项目变量已配**。
  - `.env.local` 被 `.gitignore:73-75` 排除且本机仅含与站点无关的原型用 key，不会被 Vercel 继承。
- **影响范围**：构建阻断，或生成指向 localhost 的 canonical / hreflang / sitemap / robots / JSON-LD，SEO/GEO 全链路失效；`docs/tasks.md:191,195` 已记录线上事故表现。
- **排查所需信息**：Vercel Project Settings → Environment Variables 中 `NEXT_PUBLIC_SITE_URL` 在 **Production** 与 **Preview** 环境的值（_shape_ 应为 `https://hanzi.ewuse.com`，无尾斜杠/query/hash）；GitHub Actions Variables 中的同名值；是否设置为仅 Build-time 而非 Runtime。
- **验证方式**：
  - 平台构建日志无 `NEXT_PUBLIC_SITE_URL must be a valid absolute http(s) URL` 报错；
  - `curl -sSL https://<域名>/sitemap.xml | grep -i '<loc>' | head -5` 与 `curl -sSL https://<域名>/robots.txt` **不得出现 localhost**；
  - `curl -sSL https://<域名>/zh-CN | grep -iE 'canonical|hreflang'` 全部为正式域名。
  - 本地等价复现：`NEXT_PUBLIC_SITE_URL=https://hanzi.ewuse.com pnpm build`。

---

## 2. P1 高优先级

### P1-A · Sentry 构建路径从未被任何门禁验证

- **具体表现**：`next.config.mjs:108-117` 仅在 `SENTRY_DSN` 存在时用 `withSentryConfig` 包装（含 `org` / `project` / `tunnelRoute:'/monitoring'`）；`src/instrumentation.ts:4-12` 按 `NEXT_RUNTIME` 动态加载 server/edge 配置；`src/instrumentation-client.ts` 依赖 `NEXT_PUBLIC_SENTRY_DSN`。CI（`ci.yml:55-59`）与本地构建均**未设置这些变量**，因此当前所有绿灯只覆盖「无 Sentry」路径。`.env.example:17-24` 列了 5 个变量但平台是否设置未知。
- **影响范围**：平台一旦设置 `SENTRY_DSN`，构建链与已验证链不同——source map 上传（需 `SENTRY_AUTH_TOKEN`/ORG/PROJECT）或 `@sentry/nextjs 11.11.0` 与 Next 16.4.4 的兼容问题可能直接阻断构建；只设置 DSN 不设置 Org/Project 会造成上报配置不完整。未设置则完全没有线上错误可见性。
- **排查所需信息**：Vercel 项目是否设置 `SENTRY_DSN` / `NEXT_PUBLIC_SENTRY_DSN` / `SENTRY_ORG` / `SENTRY_PROJECT` / `SENTRY_AUTH_TOKEN`；Sentry 项目 slug 与 DSN host；`@sentry/nextjs` 与 Next 16 的官方兼容矩阵。
- **验证方式**：在 Preview 环境用与生产同款变量跑 `SENTRY_DSN=... NEXT_PUBLIC_SENTRY_DSN=... SENTRY_ORG=... SENTRY_PROJECT=... SENTRY_AUTH_TOKEN=... NEXT_PUBLIC_SITE_URL=https://preview.example pnpm build`；确认构建成功、source map 上传日志无 error；`curl -sSI https://<域名>/monitoring` 不被 302（`src/proxy.ts:54-57` 已显式排除该路径）。

### P1-B · Node / pnpm 版本未显式锁定，安装命令存在分歧

- **具体表现**：`package.json:6` 固定 `pnpm@11.24.0`、`:77-80` `engines.node >= 24.11.0`、`engines.pnpm >=11`，`.nvmrc:1` 为 `24.11.0`；但 `vercel.json:1-11` 只有 `framework` 与缓存头，**没有** `buildCommand` / `installCommand` / `nodeVersion`。`package.json:34` 的 `preinstall: npx only-allow pnpm` 会拒绝 npm/yarn 安装。文档 `docs/05-deployment.md:17` 声称存在 `.npmrc` 的 `engine-strict` / `package-manager-strict`，仓库实际**没有** `.npmrc`。
- **影响范围**：若 Vercel 项目的 Node 版本低于 24.11 或安装命令走 npm，`preinstall` 守卫或 engines 约束会令安装/构建失败；若依赖由不带 `--frozen-lockfile` 的流程解析，可能产生与 CI 不同的依赖集。
- **排查所需信息**：Vercel Project Settings → Build & Development Settings 的 Node.js Version / Install Command / Build Command；是否识别 `packageManager` 使用 pnpm；构建日志前 20 行的 `node -v` / `pnpm -v` / install 命令。
- **验证方式**：构建日志显示 Node 24.11.x 与 pnpm 11.24.0；本地干净环境 `pnpm install --frozen-lockfile && pnpm build` 通过。建议修复方向：在 `vercel.json` 显式写 `nodeVersion`、`installCommand: pnpm install --frozen-lockfile`、`buildCommand: pnpm build`，并把 `.npmrc` 文档表述改为实际机制（`packageManager` + `preinstall`）。

### P1-C · proxy 误拦截 OG/Twitter 动态图路由（新发现，代码层风险）

- **具体表现**：`src/proxy.ts:54-57` 的 matcher 仅排除 `_next/`、`api/`、`monitoring` 与**带点号**的静态文件；约定式图片路由 `/opengraph-image`（`src/app/opengraph-image.tsx`）与 `/twitter-image`（`src/app/twitter-image.tsx`）都不含点号也不是合法 locale，命中 `:43-51` 的分支，被 **302 到 `/en/opengraph-image`**。`docs/tasks.md:193` 记录线上 `/opengraph-image`、`/twitter-image` 均 302 且 og:image MISSING——此前归因于旧构建，但按当前代码推演，新构建部署后该 302 **仍会发生**。
- **影响范围**：社交分享卡片缺图（微信/X/Slack/多数爬虫不跟随 302 取图）；同时任何新增的「无点号、无语言前缀」路由都会被误重定向，属通用路由缺陷。
- **排查所需信息**：部署后 `/opengraph-image`、`/twitter-image` 的 HTTP 状态与 `content-type`；HTML 中 `og:image` / `twitter:image` 的最终 URL；社交调试器（如 X Card Validator）抓取结果。
- **验证方式**：
  ```
  curl -sSI https://<域名>/opengraph-image          # 期望 200 + image/png，而非 302
  curl -sSL https://<域名>/zh-CN | grep -io '<meta[^>]*og:image[^>]*>'
  ```
  修复方向：扩展 proxy matcher 排除 `opengraph-image|twitter-image|icon|manifest` 等无点号约定路由，或把这些图片路由改为语言前缀形式并同步 metadata。

### P1-D · GA4 变量构建期内联，易出现「配了但不生效」

- **具体表现**：`src/components/google-analytics.tsx:10,48-67` 读取 `NEXT_PUBLIC_GA_MEASUREMENT_ID` 并加载 `www.googletagmanager.com/gtag/js`；`NEXT_PUBLIC_*` 在 **build 时**内联，运行时改变量无效；加载还需 `NODE_ENV=production` 且用户同意；CSP 放行域名见 `next.config.mjs:49-50,63`。
- **影响范围**：仅在 Preview/Runtime 设置该变量时统计脚本不会出现在产物中（数据缺失但不阻断构建）；误配生产 ID 到 Preview 会污染数据。
- **排查所需信息**：Vercel Production/Preview 环境中该变量是否存在及值前缀（`G-`）；同意横幅的 consent update 是否按 `docs/tasks.md` P1-46 要求联动；浏览器控制台 CSP 违规报告。
- **验证方式**：未同意时 Network 面板无 `googletagmanager.com` 请求；同意后请求 200 且 HTML 含正确测量 ID；`curl -sSL https://<域名> | grep -o 'gtag/js?id=G-[^"&]*'`。

### P1-E · 双部署通道与 Release 门禁把「跳过」视为成功

- **具体表现**：`deploy.yml:3-6` 在每次 `main` push 触发；Vercel 侧如同时开启 Git Integration 会额外自动部署，两者可能竞争同一 commit 的产物。`release.yml:85-92` 明确允许 Deploy 为 `skipped` 仍发布 Release（`docs/05-deployment.md:119` 也如此描述）。
- **影响范围**：同一 commit 产生两个部署、版本号/build 编号漂移；Tag 可发出正式 Release 而生产仍是旧构建，形成「发布成功但没上线」的事故模式（P0-A 已实际发生一次）。
- **排查所需信息**：Vercel 项目 Git Integration 是否启用、Production Branch 映射；GitHub Actions 与 Vercel Deployments 的时间线对照；自定义域当前指向哪个部署。
- **验证方式**：在 Vercel Deployments 与 Actions 列表逐条比对同一 SHA 的部署数与最终 serving deployment；临时只保留一个通道并观察一次 push；修正 Release 门禁为「Deploy 必须 success 且指向该 SHA」。

---

## 3. P2 中优先级

### P2-A · `vercel.json` 缓存规则覆盖非哈希资源（含 SW）

- **表现**：`vercel.json:3-10` 对所有 `.js|css|svg|png|...` 一律 `max-age=31536000, immutable`，包括 `public/sw.js`、`public/icon.svg`。SW 注册 URL 带 `?v=${APP_VERSION}-${BUILD_ID}`（`src/components/pwa-install-prompt.tsx:23-28`，build id 为 10 位 yymmddhhmm），版本变化会换 URL，因此当前不会永久锁死；但规则过宽且 `next.config.mjs:94-96` 已对页面响应注入安全头，平台侧还可能有第二套缓存/头行为。
- **影响**：SW 更新依赖查询串而非标准缓存语义，若 CDN 忽略 query 或未来注册逻辑改动会出现旧 SW 常驻；非哈希静态资源更新延迟。
- **排查信息**：`curl -sSI https://<域名>/sw.js` 的 `Cache-Control`；Vercel 控制台是否有额外 Headers 覆写。
- **验证**：部署新版本后浏览器 DevTools → Application → Service Workers 显示新脚本 URL；旧缓存被清理。建议把 immutable 限定到 `/_next/static/*` 与带哈希资产。

### P2-B · 构建期 Google Fonts 外网依赖

- **表现**：`src/app/layout.tsx:4,20-40` 使用 `next/font/google` 的 4 个字体族，构建期需访问 Google Fonts；`docs/05-deployment.md:19` 已注明离线/沙箱构建可能失败。
- **影响**：若 Vercel 构建容器无法访问 `fonts.googleapis.com` / `fonts.gstatic.com`，构建直接失败（非代码缺陷，但需平台放行）。
- **排查信息**：构建日志中的字体下载错误；平台出网策略/代理设置。
- **验证**：平台构建日志无字体下载失败；产物 CSS 含自托管 `@font-face`，页面 `font-src 'self'` 下字体正常显示（`next.config.mjs:61`）。

### P2-C · Vercel Blob 云同步未配置 + 备份上限超 Serverless body limit

- **表现**：`src/app/api/progress/route.ts:13,21,44` 只有在 `BLOB_READ_WRITE_TOKEN` 或 `BLOB_STORE_ID` 存在时才启用，否则 `/api/progress` 返回 503、前端保持本地模式；`.env.example:30-33` 只说明本地读写 token，**未说明线上 OIDC 需要的 `BLOB_STORE_ID`**。`src/lib/cloud-sync.ts:8` 的 `MAX_BACKUP_BYTES = 5 * 1024 * 1024`（5 MB）高于 Vercel Serverless 常见 4.5 MB 请求体上限。
- **影响**：未配置 Blob store 时云同步功能不可用（核心学习/练习不受影响）；配置后接近 5 MB 的备份可能在平台层被 413 拒绝，早于应用校验。
- **排查信息**：Vercel 项目是否关联 Blob store、`BLOB_STORE_ID` 是否存在；控制台 Blob 用量；云同步按钮的实际错误码。
- **验证**：`curl -sS -i https://<域名>/api/progress?code=test` ——未配置时预期 503 `not_configured`；配置后小备份 PUT/GET 往返成功，>4.5 MB 备份在平台层的行为需实测后把应用上限下调至 ≤4 MB。

### P2-D · 文档/配置漂移与不可复现的部署命令

- **表现**：
  - `docs/05-deployment.md:145` 称「全部依赖精确版本」，但 `package.json:41` 的 `@vercel/blob` 为 `^2.9.0`（lockfile 解析 2.9.0）。
  - `docs/05-deployment.md:17` 声称 `.npmrc` 存在，实际不存在（唯一强制点为 `packageManager` + `preinstall`）。
  - `deploy.yml:54-56` 使用 `npx vercel`（CLI 未钉版本，随时解析最新版），构建可复现性弱于其余链路。
  - `scripts/check-csp-consistency.mjs:15-17` 只比对 `edgeone.json` 与 `next.config.mjs`，**未校验 `vercel.json`**；不过 `vercel.json` 当前只设缓存头，暂无 CSP 冲突。
- **影响**：误导排障、升级/回滚策略与实际不一致；CLI 大版本升级可能破坏部署脚本。
- **排查信息**：`pnpm-lock.yaml` 的 specifier 与 resolve；Vercel CLI 版本构建日志；平台 Headers 配置截图。
- **验证**：把文档表述改为事实；为 deploy 钉 `vercel@<version>` 或加入 devDependencies；扩展 `check:csp` 覆盖 Vercel 配置。

---

## 4. 已排除的疑似阻塞（有证据，可不再排查）

| 疑似问题 | 排除依据 |
|---|---|
| `proxy.ts` 在 Edge 运行时用 Node-only API | `src/proxy.ts:6-8` 只导入 `next/server` 与纯 TS 模块；`:31-35,49-51` 只用 `Headers`/`NextResponse`；无 `fs/path/child_process`；仓库无 `middleware.ts` |
| i18n 需要静态生成多套页面 / ISR 缓存失效 | 无 `revalidate` / `generateStaticParams` / `force-cache`；语言前缀由 proxy 重写到同一页面；`layout.tsx` 用 `headers()`/`cookies()` 走请求期动态渲染，Vercel Serverless/Edge 均支持 |
| Sentry tunnel 被语言协商重定向 | `src/proxy.ts:54-57` matcher 显式排除 `monitoring` |
| 静态资源缺失导致断链 | `public/` 实有 `icon.svg`、`llms.txt`、`offline.html`、`sw.js`；SW 依赖的两个文件均存在；`docs/assets/screenshots/*` 仅 README 使用，不参与站点发布 |
| 数据库/后端连接阻塞 | 无数据库；主流程仅 localStorage；唯一外部 API 是可选的 Vercel Blob（见 P2-C） |
| `reports/` / `coverage/` 进入构建 | `.gitignore:41,43` 忽略；coverage 目录为 `cache/coverage`，CI 仅上传 artifact；`vercel.json` 无自定义 outputDirectory |
| 本机 `.env.local` 会带密钥上 Vercel | 文件被 `.gitignore:73-75` 排除，且内容仅含一个与站点无关的原型用 key |

---

## 5. 建议处置顺序与一次性验证清单

**顺序**：P0-B（平台填 `NEXT_PUBLIC_SITE_URL`）→ P0-A（三项 Secrets + 重跑 Deploy，确认不再 skip）→ P1-C（修 proxy 图片路由，可与 P0 并行改代码）→ P1-B / P1-A（显式锁版本、用临时 Preview 验证带 Sentry 的构建）→ P1-D / P1-E（GA 与部署通道收敛）→ P2 各项。

**部署后一次性线上核验**（全部在正式域执行，替换 `<域名>`）：

```bash
# 版本是否真正更新（对照 package.json / CHANGELOG）
curl -sS https://<域名>/api/health

# SEO / i18n（不得出现 localhost；<html lang> 与正文语言一致）
curl -sSL https://<域名>/zh-CN | grep -iE '<html|canonical|hreflang|<h1|og:image'
curl -sSL https://<域名>/sitemap.xml | grep -i '<loc>' | head -5
curl -sSL https://<域名>/robots.txt
curl -sSL https://<域名>/llms.txt | head -5

# 社交图（应 200 image/png，而非 302）
curl -sSI https://<域名>/opengraph-image
curl -sSI https://<域名>/twitter-image

# 安全头与缓存
curl -sSI https://<域名>/ | grep -iE 'content-security-policy|x-frame-options|cache-control'
curl -sSI https://<域名>/sw.js | grep -i 'cache-control'

# 可选云同步（未配置时预期 503 not_configured）
curl -sS -i 'https://<域名>/api/progress?code=test'
```

**仍需外部输入才能继续的事项**：Vercel Token/Org/Project 三项 Secret 的**存在性确认**、平台环境变量清单、Node/Install/Build 三项设置、Blob store 与 Sentry 项目配置、是否启用 Git Integration、生产域解析目标。上述信息只要补齐，P0 两项即可在本机之外闭环；P1-C 与 P2-D 可先由代码侧独立修复。
