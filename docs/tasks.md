# 任务清单 · Task Backlog

> 文档版本：v5.2.33（与项目版本同步，权威版本见 `package.json`）
> 最后更新：2026-11-04 21:20（UTC+8）

## 0. 说明与规则（单一来源）

- **本文件是项目所有任务（待办 / 改进 / backlog）的唯一来源。** 其他文档仅保留流程性检查表（如部署前检查、测试前检查）与状态报告，**不再重复记录任务或待办清单**。
- 新增任务请直接加入下方对应优先级小节，并标注【分类】与【状态】；任务状态统一用 `待办 / 进行中 / 已完成 / 已取消` 标记。
- **已完成任务移入 [tasks-done.md](tasks-done.md) 归档**（含完成版本与实现要点），本文件只保留未完成任务。
- 任务 ID 规则：`P0-xx` 阻断上线（正式发布前必须闭环）、`P1-xx` 高优先级（首个生产版本前完成）、`P2-xx` 中优先级（可排期）、`P3-xx` 低优先级（长期/可选）。
- 每个任务已拆到**最小可执行模块**：一个任务 = 一处明确改动 + 一条可验证验收标准。

### 0.1 当前清单概览（共 80 项）

| 优先级 | 数量 | 分组 | 含义 |
|--------|------|------|------|
| **P0** | 22 | 法律与合规 13 · 质量门禁与 CI 5 · 可观测性 4 | 正式发布前必须闭环 |
| **P1** | 36 | SEO 与 i18n 架构 9 · 性能 5 · 测试 9 · 无障碍 6 · 安全 3 · RTL 4 | 首个生产版本前完成 |
| **P2** | 18 | 代码质量 / 架构 / 文档 / 产品体验 | 可排期 |
| **P3** | 4 | 工具与流程 | 长期 / 可选 |

> 另有 6 项（P0-14、P0-15、P0-25、P0-26、P0-27、P0-28）已完成，归档于 [tasks-done.md](tasks-done.md)。

## 1. 生产就绪度评估结论（2026-11-04 审查）

### 1.1 实测质量门禁基线

| 门禁 | 命令 | 结果 |
|------|------|------|
| 类型检查 | `node node_modules/typescript/bin/tsc --noEmit` | ✅ 0 error |
| Lint | `node node_modules/eslint/bin/eslint.js src` | ✅ 0 error / 0 warning |
| 单测 | `node node_modules/vitest/vitest.mjs run` | ✅ 9 文件 / 47 用例全通过 |
| 生产依赖漏洞 | `pnpm audit --prod` | ✅ 0 漏洞（v5.2.31 T3） |

### 1.2 优势项（保持不退化）

- 代码卫生接近满分：`any` 0 处、`TODO/FIXME` 0 条、`console.log` 0 条、`@ts-ignore` 0 条、`dangerouslySetInnerHTML` 0 处。
- 单文件均 ≤200 行（代码文件），TS strict 开启，设计 token 单一来源。
- i18n 键类型级约束（`TranslationKey` 联合类型）+ 11 语言叶子键一致性单测；原型链安全与插值安全已处理。
- localStorage 版本化 + schema 校验（`validateProgress` 过滤 NaN/非法日期），无 token/PII 落盘。
- CSP + 完整安全响应头已注入；Radix 原生焦点陷阱、`focus-visible`、`prefers-reduced-motion` 全局落地。
- 版本注入单一来源（`package.json` → `NEXT_PUBLIC_APP_VERSION` / `NEXT_PUBLIC_BUILD_ID` → 页脚 `#footer-version`）。

### 1.3 核心缺口（本次拆解来源）

**代码面已经很干净，短板集中在「上线运营面」**：法律合规文件、CI/CD 与质量门禁脚本可用性、线上错误监控、SEO 基础设施（sitemap/robots/manifest/JSON-LD/hreflang）、覆盖率与关键路径测试、i18n 架构（纯客户端 → 无法 URL 级 i18n 与 RTL）、以及根目录临时脚本与产物的仓库卫生。

---

## 2. P0 · 阻断上线（正式发布前必须闭环）

### 2.1 法律与合规

#### P0-1 · 新增 MIT LICENSE 文件 `法律` `待办`

- **现状**：`search_file LICENSE*` 全仓 0 命中；`README.md:160-162` 仅一行 © 声明，公开仓库无开源许可文本。
- **目标**：仓库根新增 `LICENSE`，采用 MIT 全文，版权归属 `2026 HanziMaster 汉字大师`。
- **验收**：① `LICENSE` 文件存在且为完整 MIT 文本；② README / README_EN 许可证小节链接到 `LICENSE`。
- **涉及**：`LICENSE`、`README.md`、`README_EN.md`

#### P0-2 · package.json 补 license 字段 `法律` `待办`

- **现状**：`package.json` 无 `license` 字段（`private: true` 掩盖了缺口）。
- **目标**：`package.json` 增加 `"license": "MIT"`，与 `LICENSE` 一致。
- **验收**：`node -e "require('./package.json').license"` 输出 `MIT`。
- **涉及**：`package.json`

#### P0-3 · 新增 NOTICE 第三方许可声明 `法律` `待办`

- **现状**：无 `NOTICE` / `THIRD-PARTY-LICENSES`；依赖含 MIT/ISC 类库但未集中声明。
- **目标**：新增 `NOTICE`，列出 `next`、`react`、`react-dom`、`lucide-react`、`radix-ui`、`class-variance-authority`、`clsx`、`tailwind-merge`、`tw-animate-css` 的许可与版权。
- **验收**：`NOTICE` 覆盖 `package.json` 中全部 `dependencies` 条目，且每条含许可类型与项目主页。
- **涉及**：`NOTICE`、`package.json`

#### P0-4 · 笔顺数据来源署名与许可标注 `法律` `待办`

- **现状**：`src/lib/stroke-order-data.ts:2-3` 注释说明源自 hanzi-writer-data 内联，但未附该包许可文本与署名。
- **目标**：文件头注释补充数据来源、上游许可（MIT/Apache）与出处链接；`NOTICE` 同步登记。
- **验收**：文件头含 `来源 / 许可 / 出处` 三要素，`NOTICE` 有对应条目。
- **涉及**：`src/lib/stroke-order-data.ts`、`NOTICE`

#### P0-5 · 新增隐私政策内容模块 `法律` `待办`

- **现状**：全仓无隐私政策文本。
- **目标**：新增 `src/content/privacy.ts`，导出隐私政策分段结构（标题 + 段落数组），文案基于实际行为撰写（localStorage 存储项清单、GA4 使用、无账号无服务器存储）。
- **验收**：模块为纯数据，不含 JSX；条目与代码实现一致（存储键 `hanzi-master-progress` / `hanzi-master-locale` / 主题键均已列出）。
- **依赖**：P0-10（同意状态键需在政策中披露）
- **涉及**：`src/content/privacy.ts`

#### P0-6 · 新增服务条款内容模块 `法律` `待办`

- **现状**：无 ToS / 免责声明。
- **目标**：新增 `src/content/terms.ts`，导出服务条款分段结构，含「教育用途声明」「笔顺数据准确性说明」「无担保条款」。
- **验收**：模块为纯数据；含免责与教育用途两条明确表述。
- **涉及**：`src/content/terms.ts`

#### P0-7 · 新增 /privacy 路由页 `法律` `待办`

- **现状**：`src/app/` 下无 `/privacy` 路由。
- **目标**：新增 `src/app/privacy/page.tsx`（Server Component），渲染 `src/content/privacy.ts` 内容，导出 `metadata`（title / description / `robots: { index: true }`）。
- **验收**：访问 `/privacy` 返回 200；页面含 `id="privacy-page"` 主容器与语义化 `h1/h2`。
- **依赖**：P0-5、P0-9
- **涉及**：`src/app/privacy/page.tsx`

#### P0-8 · 新增 /terms 路由页 `法律` `待办`

- **现状**：同上，无 `/terms` 路由。
- **目标**：新增 `src/app/terms/page.tsx`，渲染 `src/content/terms.ts`，导出 `metadata`。
- **验收**：访问 `/terms` 返回 200；含 `id="terms-page"` 主容器。
- **依赖**：P0-6、P0-9
- **涉及**：`src/app/terms/page.tsx`

#### P0-9 · i18n 新增 legal 区块（11 语言） `法律/i18n` `待办`

- **现状**：`src/lib/i18n/translations/*.ts` 11 个文件各 196 行，无 `legal` 区块。
- **目标**：11 个语言文件各新增 `legal.privacy.*` / `legal.terms.*` / `legal.consent.*` 键；键集合由 `i18n.test.ts` 自动校验一致性。
- **验收**：① 11 语言文件均含新键；② `node node_modules/vitest/vitest.mjs run src/lib/__tests__/i18n.test.ts` 通过；③ 各语言文件仍 ≤200 行（超出则拆出 `translations/legal/*.ts` 子模块）。
- **涉及**：`src/lib/i18n/translations/{en,zh-CN,zh-TW,es,ar,fr,pt-BR,de,ja,ko,ru}.ts`

#### P0-10 · 新增追踪同意状态模块 `法律` `待办`

- **现状**：无同意状态概念；GA4 生产环境无条件加载。
- **目标**：新增 `src/lib/consent.ts`，导出 `getConsent()` / `setConsent()` / `hasDecided()`，基于 `window.localStorage` 存键 `hanzi-master-consent`，值域 `granted | denied | unset`；读写均 try/catch 容错。
- **验收**：模块不依赖 React，可在非客户端环境安全调用（`typeof window` 守卫）。
- **涉及**：`src/lib/consent.ts`

#### P0-11 · 新增 Cookie 同意横幅组件 `法律/UI` `待办`

- **现状**：无同意横幅。
- **目标**：新增 `src/components/consent-banner.tsx`（`'use client'`），固定底部横幅，含「接受 / 拒绝 / 隐私政策」三个动作，文案走 i18n，持久化到 `src/lib/consent.ts`；含 `role="region"` + `aria-label`。
- **验收**：① 首次访问可见，`localStorage` 有决策后不再出现；② 键盘可达、Esc 可关闭为「拒绝」；③ 含 `id="consent-banner"`。
- **依赖**：P0-9、P0-10
- **涉及**：`src/components/consent-banner.tsx`

#### P0-12 · GA4 接入同意门控 + GA ID 走 env `法律/安全` `待办`

- **现状**：`src/components/google-analytics.tsx:5` GA ID `G-TZG68T8J31` 硬编码；`:8,17-19` 生产环境无条件加载脚本。
- **目标**：GA ID 改读 `process.env.NEXT_PUBLIC_GA_ID`（缺省即不加载）；仅当 `getConsent() === 'granted'` 时注入 `gtag` 脚本。
- **验收**：① 未授权时不产生 googletagmanager 网络请求；② 授权后正常上报；③ 源码无硬编码 GA ID。
- **依赖**：P0-10、P0-20
- **涉及**：`src/components/google-analytics.tsx`、`next.config.mjs`

#### P0-13 · 页脚注入法律链接与免责声明 `法律/UI` `待办`

- **现状**：`src/components/layout-client.tsx:95-99` 页脚仅有 `/learn`、`/practice` 与版本行，无隐私政策 / 条款链接。
- **目标**：页脚导航补 `/privacy`、`/terms` 链接（文案走 i18n），版本行下方加一行免责声明短句。
- **验收**：页脚含 `/privacy` 与 `/terms` 两个可点击链接；11 语言文案完整。
- **依赖**：P0-7、P0-8、P0-9
- **涉及**：`src/components/layout-client.tsx`、`src/lib/i18n/translations/*.ts`

### 2.2 质量门禁与 CI/CD

#### P0-15 · 修复 security:audit 脚本（npm audit → pnpm audit） `构建` `已完成`

- **现状（已修）**：`package.json` 原为 `"security:audit": "npm audit --audit-level=high"`（项目强制 pnpm，仓库只有 `pnpm-lock.yaml`，`npm audit` 无 lockfile 可用 → 必失败）。
- **完成（v5.2.33）**：① 拆分为 `security:audit` = `pnpm audit --prod --audit-level=high`（生产依赖）与 `security:audit:dev` = `pnpm audit --audit-level=high`（全量含 dev 链）；② `.github/SECURITY.md:40` 的命令描述与两条脚本一一对应；③ `docs/05-deployment.md:128` 上线检查项同步为 `pnpm run security:audit`。
- **验收**：① `pnpm run security:audit` 与 `pnpm run security:audit:dev` 均可执行且退出码 0；② `SECURITY.md:40` 命令与实现一一对应。
- **涉及**：`package.json`、`.github/SECURITY.md`、`docs/05-deployment.md`

#### P0-16 · 新增 GitHub Actions CI 工作流 `CI` `待办`

- **现状**：`.github/` 下仅 9 个社区文件，**无 `workflows/` 目录**，每次提交无自动校验。
- **目标**：新增 `.github/workflows/ci.yml`，`on: [push, pull_request]`，job 顺序：`install`（pnpm + 缓存）→ `lint` → `typecheck`（`tsc --noEmit`）→ `test`（vitest run）→ `build`（`next build`）→ `audit`（`pnpm audit --prod`）。
- **验收**：① PR 上全绿；② 失败时定位到具体步骤；③ `node-version` 与 `package.json` `engines.node` 一致（24.x）。
- **涉及**：`.github/workflows/ci.yml`

#### P0-17 · CI 增加覆盖率门禁 `CI/测试` `待办`

- **现状**：`vitest.config.ts` 无 `coverage` 段，`@vitest/coverage-v8` 未安装；`docs/06-testing.md:31` 声称的 `pnpm test -- --coverage` 实际会失败。
- **目标**：安装 `@vitest/coverage-v8`（devDependency），`vitest.config.ts` 增 `coverage` 配置（provider / reporter / include `src/**` / exclude 测试与原型），并在 CI 中作为独立 job 执行。
- **验收**：① `pnpm test -- --coverage` 正常产出报告；② CI 覆盖率步骤失败会阻断合并；③ `docs/06-testing.md` 命令与阈值描述与实现一致。
- **依赖**：P0-16
- **涉及**：`package.json`、`vitest.config.ts`、`.github/workflows/ci.yml`、`docs/06-testing.md`

#### P0-18 · 新增部署工作流 `CI/部署` `待办`

- **现状**：仅有 `vercel.json` / `edgeone.json` 静态配置，无自动部署流程。
- **目标**：新增 `.github/workflows/deploy.yml`，main 分支触发，Vercel 走官方 action（`amondnet/vercel-action` 或 CLI + token），EdgeOne 走项目自有构建命令；产物名 `<产品名>-v<版本>-<os>-<arch>.<扩展名>` 规范（若产出归档）。
- **验收**：① main 合并后自动部署成功；② 部署使用同一 `pnpm-lock.yaml`；③ 回滚路径在 workflow 注释中说明。
- **依赖**：P0-16
- **涉及**：`.github/workflows/deploy.yml`

#### P0-19 · 新增 Dependabot 依赖更新配置 `CI` `待办`

- **现状**：无自动依赖更新，dev 链 moderate/low 公告需人工处理。
- **目标**：新增 `.github/dependabot.yml`，`package-manager: pnpm`，weekly 检查 `dependencies` 与 `devDependencies`，`groups` 聚合 patch/minor。
- **验收**：依赖 PR 自动创建且 CI 通过。
- **涉及**：`.github/dependabot.yml`

#### P0-20 · 新增 .env.example `构建` `待办`

- **现状**：`.gitignore:57` 已为 `!.env.example` 开白名单，但文件不存在。
- **目标**：新增 `.env.example`，列出 `NEXT_PUBLIC_APP_VERSION`（自动注入，勿手改）、`NEXT_PUBLIC_BUILD_ID`（自动注入）、`NEXT_PUBLIC_GA_ID`（可选）、`SENTRY_DSN`（可选）。
- **验收**：① 文件存在且不含真实密钥；② 注释说明哪些为构建期自动注入。
- **依赖**：P0-12、P0-21
- **涉及**：`.env.example`

### 2.3 可观测性与错误兜底

#### P0-21 · 接入错误监控（Sentry） `运维` `待办`

- **现状**：无 Sentry / Bugsnag / Datadog 依赖，无 `src/instrumentation.ts`，`src/app/error.tsx:15` 仅 1 条 `console.error` → 线上崩溃完全不可见。
- **目标**：安装 `@sentry/nextjs`（devDependency），新增 `sentry.client.config.ts` / `sentry.server.config.ts` / `sentry.edge.config.ts` 与 `src/instrumentation.ts`（register 导入 Sentry），`next.config.mjs` 用 `withSentryConfig` 包装；DSN 走 `process.env.SENTRY_DSN`。
- **验收**：① 未配置 DSN 时应用零报错启动；② 配置 DSN 后客户端异常能上报；③ `instrumentation.ts` 不破坏现有 `next build`。
- **依赖**：P0-20
- **涉及**：`package.json`、`next.config.mjs`、`src/instrumentation.ts`、`sentry.*.config.ts`

#### P0-22 · 新增 global-error.tsx 根级错误兜底 `运维/UI` `待办`

- **现状**：`src/app/` 下无 `global-error.tsx`；根 layout 自身崩溃会落到 Next 默认错误页，无品牌兜底、无上报。
- **目标**：新增 `src/app/global-error.tsx`（`'use client'`，必须自带 `<html>/<body>`），复用 `src/components/state/state-views.tsx` 的 `ErrorState`，并把错误交给 Sentry。
- **验收**：① 根 layout 抛错时展示品牌化错误页；② 错误被上报；③ 含 `id="global-error"`。
- **依赖**：P0-21
- **涉及**：`src/app/global-error.tsx`

#### P0-23 · 为 /learn、/practice 新增路由级 error.tsx `运维/UI` `待办`

- **现状**：`src/app/error.tsx` 仅覆盖 root segment，`/learn`、`/practice` 子路由无独立边界。
- **目标**：新增 `src/app/learn/error.tsx` 与 `src/app/practice/error.tsx`，复用 `ErrorState`，各自可重置。
- **验收**：两个子路由渲染异常时页面级错误态生效，不白屏。
- **涉及**：`src/app/learn/error.tsx`、`src/app/practice/error.tsx`

#### P0-24 · 新增健康检查端点 `运维` `待办`

- **现状**：`src/app/` 下无任何 `route.ts`，无 `/api/health`，平台无法做存活探针。
- **目标**：新增 `src/app/api/health/route.ts`，GET 返回 `{ status: 'ok', version: APP_VERSION, buildId: BUILD_ID, uptime }`，`Cache-Control: no-store`。
- **验收**：① `GET /api/health` 返回 200 且 JSON 字段齐全；② 不泄露任何内部路径或密钥；③ 在 `docs/04-api-reference.md` 登记。
- **涉及**：`src/app/api/health/route.ts`、`docs/04-api-reference.md`

### 2.4 仓库卫生

#### P0-26 · 完善 scripts/ 测试运行器与产物目录 `仓库卫生` `已完成`

- **完成（v5.2.33）**：`test-run.mjs` → `scripts/run-tests.mjs`、`line-check.mjs` → `scripts/check-line-count.mjs`（根目录临时脚本清零）；`scripts/run-tests.mjs` 支持 `--coverage` 参数透传 vitest 且产物落 `reports/test-out.txt`；`scripts/check-line-count.mjs` 产物落 `reports/line-count.txt`；`package.json` 新增 `test:run` / `check:lines` 脚本；`.gitignore` 增 `/reports/`。
- **验收**：① `node scripts/run-tests.mjs --coverage` 可产出覆盖率报告到 `reports/`；② 仓库根不再出现 `test-out.txt` / `linecheck-result.txt`；③ `pnpm run check:lines` 可运行。
- **涉及**：`scripts/run-tests.mjs`、`scripts/check-line-count.mjs`、`.gitignore`、`package.json`

#### P0-28 · 删除空 test/ 目录 `仓库卫生` `已完成`

- **现状**：`test/` 为 0 文件空目录（Git 不跟踪空目录，但本地残留易误导维护者）。
- **完成（v5.2.33）**：`test/` 空目录已删除；若后续引入 E2E 则按 P1-22 改用 `e2e/` 命名。
- **验收**：仓库根无 `test/` 空目录。
- **涉及**：`test/`（删除）

---

## 3. P1 · 高优先级（首个生产版本前完成）

### 3.1 SEO 与国际化架构

#### P1-1 · 新增 sitemap.ts `SEO` `待办`

- **现状**：`src/app/` 下无 `sitemap.ts`。
- **目标**：新增 `src/app/sitemap.ts`，输出 `/`、`/learn`、`/practice`、`/privacy`、`/terms` 五个 URL，含 `lastModified` / `changeFrequency` / `priority`。
- **验收**：`/sitemap.xml` 返回 200 且 URL 集合与实际路由一致（新增路由时同步更新）。
- **涉及**：`src/app/sitemap.ts`

#### P1-2 · 新增 robots.ts `SEO` `待办`

- **现状**：无 `robots.txt` 生成逻辑。
- **目标**：新增 `src/app/robots.ts`，允许全站抓取，声明 Sitemap 地址（用 `metadataBase` 拼绝对 URL），屏蔽 `/api/`。
- **验收**：`/robots.txt` 返回 200 且含 `Sitemap:` 行与 `/api/` 屏蔽规则。
- **依赖**：P1-4
- **涉及**：`src/app/robots.ts`

#### P1-3 · 新增 manifest.ts `SEO/PWA` `待办`

- **现状**：`metadata.json` 的 keywords 提到 PWA，但无 Web App Manifest。
- **目标**：新增 `src/app/manifest.ts`（Next 原生约定），含 name / short_name / start_url / display / background_color / theme_color / icons。
- **验收**：`/manifest.webmanifest` 返回 200 且可被浏览器识别；图标文件真实存在（新增 `public/icon-192.png`、`icon-512.png` 或 SVG）。
- **涉及**：`src/app/manifest.ts`、`public/`

#### P1-4 · 补全根布局 metadata `SEO` `待办`

- **现状**：`src/app/layout.tsx:37-47` 的 `openGraph` 仅 title/description/type，缺 `url` / `siteName` / `images` / `locale`；全仓无 `twitter` card、无 `metadataBase`、无 `alternates`/`canonical`。
- **目标**：新增 `metadataBase`（读 `process.env.NEXT_PUBLIC_SITE_URL`）、补全 `openGraph`（含 `images`）、新增 `twitter` card（`summary_large_image`）、新增 `alternates.canonical`。
- **验收**：① `NEXT_PUBLIC_SITE_URL` 缺失时有合理缺省；② 分享链接卡片正常渲染；③ `docs/04-api-reference.md` 记录新环境变量。
- **涉及**：`src/app/layout.tsx`、`.env.example`

#### P1-5 · 为 /learn、/practice 新增页面级 metadata `SEO` `待办`

- **现状**：`src/app/learn/page.tsx`、`src/app/practice/page.tsx` 无 `export const metadata`，标题全部继承首页。
- **目标**：两个页面各自导出 `metadata`（差异化 title / description / canonical），文案取自 i18n 词典（静态导出场景用 `en` 文案）。
- **验收**：`<title>` 与 `<meta name="description">` 在两个页面互不相同且与页面内容相符。
- **涉及**：`src/app/learn/page.tsx`、`src/app/practice/page.tsx`

#### P1-6 · 新增 JSON-LD 结构化数据 `SEO` `待办`

- **现状**：全仓无 `application/ld+json` / `schema.org`。
- **目标**：新增 `src/components/structured-data.tsx`，输出 `WebApplication` + `EducationalOrganization` JSON-LD（name / url / applicationCategory / inLanguage 11 语言 / offers price 0）。
- **验收**：① 富媒体测试工具能解析；② JSON 合法（`JSON.parse` 无异常）；③ 组件含 `id="structured-data"`。
- **依赖**：P1-4
- **涉及**：`src/components/structured-data.tsx`、`src/app/layout.tsx`

#### P1-7 · 新增 [locale] 路由骨架与重定向中间件 `i18n 架构` `待办`

- **现状**：i18n 为纯客户端（`locale-provider.tsx` 读 localStorage + 浏览器语言），URL 无语言前缀 → 架构上无法生成 hreflang、无法按语言分享、SSR 首屏语言恒为 `en`（`src/app/layout.tsx:65` 硬编码 `lang="en"`）。
- **目标**：新建 `src/app/[locale]/` 段；新增 `src/middleware.ts` 依据 `Accept-Language` / `NEXT_PUBLIC_LOCALE` cookie 做首访重定向到 `/{locale}/...`；`[locale]` 下用 `generateStaticParams` 枚举 11 语言。
- **验收**：① 首次访问 `/` 重定向到 `/en/`（按浏览器语言）；② 11 语言路径均可静态生成；③ 不破坏现有 `/learn`、`/practice` 深链（做 301 重定向）。
- **依赖**：P1-9
- **涉及**：`src/app/[locale]/`、`src/middleware.ts`

#### P1-8 · 迁移三个页面到 [locale] 段并生成 hreflang `i18n 架构` `待办`

- **现状**：无 URL 级 i18n，无 `alternates.languages`。
- **目标**：`home` / `learn` / `practice` 三页迁入 `src/app/[locale]/`；根 `layout.tsx` 用 `[locale]` 生成 `alternates.languages`（11 语言 hreflang）与动态 `<html lang>`。
- **验收**：① 11 语言页面 HTML 中 `<html lang>` 正确；② `hreflang` 链接齐全且互相指回；③ 现有链接（页脚 / 导航）不出现 404。
- **依赖**：P1-7
- **涉及**：`src/app/[locale]/**`、`src/components/layout-client.tsx`、`src/components/nav-link.tsx`

#### P1-9 · 语言切换器改为 URL 导航 `i18n 架构` `待办`

- **现状**：`src/components/locale-toggle.tsx` 切换后写 localStorage 并改 `document.documentElement.lang`，URL 不变（无法分享特定语言页面）。
- **目标**：切换语言时导航到对应 `/{locale}` 路径并保留当前页面段；localStorage 仅作为「首选语言」用于首访重定向。
- **验收**：① 切换语言后 URL 变化且内容随之切换；② 刷新后语言保持；③ 首选语言仍影响新访客首跳。
- **依赖**：P1-7
- **涉及**：`src/components/locale-toggle.tsx`、`src/components/locale-provider.tsx`

### 3.2 性能

#### P1-10 · radix-ui 整包导入改按需子包 `性能` `待办`

- **现状**：`src/components/ui/dialog.tsx:4` `import { Dialog as DialogPrimitive } from 'radix-ui'`；`src/components/ui/tooltip.tsx:4` 同样从 barrel 包导入 → 引入整个 Radix 集合，摇树风险高。
- **目标**：改为按需子包导入（如 `@radix-ui/react-dialog`、`@radix-ui/react-tooltip`），保留 `radix-ui` 作为 devDependency 供 `shadcn add` 使用。
- **验收**：① 构建产物中不再包含未使用的 Radix 组件；② UI 行为无回归（dialog 焦点陷阱 / tooltip 延迟均保持）；③ bundle 体积下降可量化。
- **依赖**：P1-13
- **涉及**：`src/components/ui/dialog.tsx`、`src/components/ui/tooltip.tsx`、`package.json`

#### P1-11 · 11 语言词典改为按需动态加载 `性能` `待办`

- **现状**：`src/lib/i18n/index.ts:2-12` 静态 import 全部 11 个翻译文件，`:37-49` 打进 `translations` 常量 → 11 语言文案无条件进入客户端包（约 2156 行文案）。
- **目标**：改为动态 `import()` 按需加载当前语言；`TranslationKey` 类型仍由 `en` 静态导出推导（类型安全不降级）。
- **验收**：① 首屏只下载当前语言文案；② 11 语言键一致性单测仍通过；③ 切换语言有加载态且不闪烁。
- **涉及**：`src/lib/i18n/index.ts`、`src/components/locale-provider.tsx`、`src/lib/i18n/translate.ts`

#### P1-12 · 笔顺数据与重型组件懒加载 `性能` `待办`

- **现状**：`src/lib/stroke-order-data.ts`（12.28 KB / 12 汉字 SVG path + medians）静态 import 进客户端包；`src/components/practice/writing-canvas.tsx`（191 行）等重型组件无懒加载；全仓 `next/dynamic` 0 命中。
- **目标**：笔顺数据按字符动态 import；`writing-canvas` / `writing-dialog` / `stroke-order-demo` 用 `next/dynamic` + `ssr: false` 拆分。
- **验收**：① 首页首屏 JS 体积下降（用 bundle analyzer 前后对比）；② 弹窗打开无明显延迟；③ 拆分后各文件 ≤200 行。
- **依赖**：P1-13
- **涉及**：`src/lib/stroke-order-data.ts`、`src/components/practice/writing-dialog.tsx`、`src/components/learn/character-detail.tsx`

#### P1-13 · 接入 @next/bundle-analyzer `性能` `待办`

- **现状**：无 bundle 分析工具，无法量化体积回归。
- **目标**：安装 `@next/bundle-analyzer`（devDependency），`next.config.mjs` 按 `ANALYZE=true` 启用；新增 `pnpm analyze` 脚本。
- **验收**：`ANALYZE=true pnpm build` 可产出分析报告。
- **涉及**：`package.json`、`next.config.mjs`

#### P1-14 · 接入体积预算门禁 `性能/CI` `待办`

- **现状**：无 bundlesize / Lighthouse CI / 性能预算。
- **目标**：基于 P1-13 报告设定首屏 JS 预算（如 ≤200 KB gzip），在 CI 中比对并超阈值失败；可选接入 Lighthouse CI 校验 LCP/CLS/可访问性分项。
- **验收**：① CI 中超预算时 PR 失败；② 预算数值记录在 `docs/05-deployment.md`。
- **依赖**：P1-13、P0-16
- **涉及**：`package.json`、`.github/workflows/ci.yml`、`docs/05-deployment.md`

### 3.3 测试

#### P1-15 · vitest 覆盖率配置与阈值 `测试` `待办`

- **现状**：`vitest.config.ts` 无 `coverage` 段；`package.json` 未装 `@vitest/coverage-v8`。
- **目标**：`vitest.config.ts` 增 `coverage`（provider `v8`、reporter `text` + `html` + `lcov`、thresholds 设定全局与关键目录阈值），`docs/06-testing.md:178-180` 的目标值与实现对齐。
- **验收**：① `pnpm test -- --coverage` 产出报告；② 阈值不达标时命令非 0 退出。
- **依赖**：P0-17
- **涉及**：`vitest.config.ts`、`docs/06-testing.md`

#### P1-16 · storage 模块单测 `测试` `待办`

- **现状**：`src/lib/storage.ts`（版本号迁移、JSON 解析失败、quota 超限分支）**零覆盖**。
- **目标**：新增 `src/lib/__tests__/storage.test.ts`，覆盖：正常读写、版本号不匹配返回默认值、损坏 JSON 降级、`setItem` 抛错时静默失败、SSR 环境（`typeof window === 'undefined'`）分支。
- **验收**：新增用例 ≥8 条且全通过；`storage.ts` 行覆盖率 100%。
- **涉及**：`src/lib/__tests__/storage.test.ts`

#### P1-17 · 描红判定算法单测 `测试` `待办`

- **现状**：`src/components/practice/writing-canvas-utils.ts`（153 行）的 `judgeUserStroke` / `drawHint` 是全项目最复杂算法，**零覆盖**。
- **目标**：新增 `src/components/practice/__tests__/writing-canvas-utils.test.ts`，覆盖笔画命中判定、容差边界、空笔画、坐标越界、`drawHint` 输出路径。
- **验收**：新增用例 ≥12 条且全通过；算法文件行覆盖率 ≥90%。
- **涉及**：`src/components/practice/__tests__/writing-canvas-utils.test.ts`

#### P1-18 · learn 测验流程单测 `测试` `待办`

- **现状**：`src/components/learn/quiz-dialog.tsx`（92 行）无测试。
- **目标**：新增测试覆盖：打开弹窗、输入拼音、答对/答错分支、得分回写 `useProgress`、关闭重置。
- **验收**：新增用例 ≥8 条且全通过。
- **涉及**：`src/components/learn/__tests__/quiz-dialog.test.tsx`

#### P1-19 · practice 测验流程单测 `测试` `待办`

- **现状**：`src/components/practice/quiz-dialog.tsx`（101 行）与 `src/app/practice/page.tsx` 的选项数据无测试。
- **目标**：新增测试覆盖 4 选 1 选择、正确率统计、答错提示、结果回写。
- **验收**：新增用例 ≥8 条且全通过。
- **涉及**：`src/components/practice/__tests__/quiz-dialog.test.tsx`

#### P1-20 · locale-provider / theme-provider 单测 `测试` `待办`

- **现状**：`src/components/locale-provider.tsx`（浏览器语言探测、切换、持久化）与 `src/components/theme-provider.tsx` 均无测试。
- **目标**：新增测试覆盖 `getBrowserLocale()` 映射（zh→zh-CN/zh-TW、8 种前缀）、初始 locale 恢复、`setLocale` 写入 localStorage、主题 `system/light/dark` 三态与持久化。
- **验收**：新增用例 ≥10 条且全通过。
- **涉及**：`src/components/__tests__/locale-provider.test.tsx`、`src/components/__tests__/theme-provider.test.tsx`

#### P1-21 · toast 组件单测 `测试` `待办`

- **现状**：`src/components/toast.tsx`（130 行）无测试。
- **目标**：新增测试覆盖：触发 toast → 渲染、自动消失定时器、手动关闭、堆叠计数、错误态样式分支。
- **验收**：新增用例 ≥6 条且全通过（需用 fake timers）。
- **涉及**：`src/components/__tests__/toast.test.tsx`

#### P1-22 · 接入 Playwright E2E 冒烟测试 `测试` `待办`

- **现状**：无 E2E；`docs/tasks.md` §5 已记录该缺口。
- **目标**：安装 `@playwright/test`，新增 `playwright.config.ts` 与 `e2e/` 冒烟用例：首页加载 → 进入学习页 → 选字打开详情 → 进入练习页 → 完成一次书写 → 切换语言 → 切换主题。
- **验收**：① `pnpm e2e` 在 CI 中可运行；② 用例在移动视口（375×667）与桌面视口均通过；③ 失败时保留 trace 与截图。
- **依赖**：P0-16
- **涉及**：`package.json`、`playwright.config.ts`、`e2e/`

#### P1-23 · 接入 axe-core 自动化 a11y 测试 `测试/a11y` `待办`

- **现状**：无 axe / jest-axe，a11y 靠人工核查。
- **目标**：安装 `axe-core` + `@axe-core/playwright`（或 `vitest-axe`），在 E2E 中对三个页面 + 两个弹窗执行 a11y 扫描，严重级别 serious 以上必须为 0。
- **验收**：① 扫描结果进 CI；② 存量违规全部清零或标注豁免理由。
- **依赖**：P1-22
- **涉及**：`package.json`、`e2e/a11y.spec.ts`

### 3.4 无障碍

#### P1-24 · 移动抽屉焦点陷阱与焦点返回 `a11y` `待办`

- **现状**：`src/components/mobile-nav.tsx:61-70` 自绘 `role="dialog" aria-modal="true"`，无 Tab 焦点环绕；打开时仅 `closeButtonRef.current?.focus()`（`:23-27`）；关闭后焦点不返回汉堡按钮（`src/components/layout-client.tsx:62-71` 按钮无 ref）。
- **目标**：实现焦点陷阱（Tab / Shift+Tab 环绕 + 背景内容 `inert`），打开时记录触发元素、关闭后焦点归还。
- **验收**：① 键盘 Tab 不会逃出抽屉；② 关闭后焦点回到汉堡按钮；③ 抽屉有 `id="mobile-nav-drawer"`。
- **涉及**：`src/components/mobile-nav.tsx`、`src/components/layout-client.tsx`

#### P1-25 · Canvas 书写练习键盘/读屏替代路径 `a11y` `待办`

- **现状**：`src/components/practice/writing-canvas.tsx:173-184` 的 `<canvas role="img">` 仅响应指针事件，无键盘绘制、无表单替代 → 核心功能对键盘 / 读屏用户完全不可用。
- **目标**：新增可访问替代路径（键盘方向键逐笔描绘的简化模式，或「用文本输入笔画序列」的替代练习），canvas 加 `aria-describedby` 说明操作方式。
- **验收**：① 纯键盘可完成一次书写练习；② 读屏可获知当前汉字与目标笔画；③ 替代路径与指针路径共享同一评分逻辑。
- **涉及**：`src/components/practice/writing-canvas.tsx`、`src/components/practice/writing-canvas-parts.tsx`

#### P1-26 · listbox roving tabindex 规范 `a11y` `待办`

- **现状**：`src/components/locale-toggle.tsx:97-113` 每个 `role="option"` 都写 `tabIndex={0}`（非 roving tabindex），容器缺 `aria-activedescendant`；`src/components/learn/character-grid.tsx:16-30` 的 `role="listbox"/"option"` 无方向键处理（全局方向键在 `src/app/learn/page.tsx:63-71` 只改选中态、不移动焦点）。
- **目标**：两处统一改为 roving tabindex（仅当前项 `tabIndex=0`，其余 -1），补 `aria-activedescendant` 与 `aria-selected`，方向键移动焦点。
- **验收**：① Tab 只停在列表容器一次；② ↑↓ 移动并更新 `aria-activedescendant`；③ 无 axe 违规。
- **涉及**：`src/components/locale-toggle.tsx`、`src/components/learn/character-grid.tsx`、`src/app/learn/page.tsx`

#### P1-27 · 测验选项暴露选中状态 `a11y` `待办`

- **现状**：`src/components/practice/quiz-dialog.tsx:63-78` 选项按钮无 `aria-pressed` / `role="radio"`，选中态仅靠颜色传达。
- **目标**：选项组加 `role="radiogroup"`，单选项加 `role="radio"` + `aria-checked`，选中态同时用边框/图标而非仅颜色。
- **验收**：① 读屏可读出当前选中项；② 颜色对比之外有第二视觉线索。
- **涉及**：`src/components/practice/quiz-dialog.tsx`

#### P1-28 · a11y 文案 i18n 化（8 处硬编码） `a11y/i18n` `待办`

- **现状**：8 处硬编码 aria-label 未走 i18n —— `src/components/ui/dialog.tsx:79`（`Close`）、`:118`（`Close`）、`src/components/toast.tsx:79`（`Close notification`）、`:124`（`Notifications`）、`src/components/locale-toggle.tsx:81`（`Change language (current: ...)`）、`:94`（`Select language`）、`src/components/learn/stroke-order-demo.tsx:73`（`笔顺演示`）、`src/components/practice/writing-canvas.tsx:177`（`书写练习画布...`）；与 `README.md:124`「所有用户可见文本必须使用 i18n 翻译」冲突。
- **目标**：11 语言新增 `common.close` / `common.closeNotification` / `common.notifications` / `common.changeLanguage` / `common.selectLanguage` / `learn.strokeDemoLabel` / `practice.canvasLabel` 键，逐处替换。
- **验收**：① 8 处全部改用 `t()`；② `i18n.test.ts` 通过；③ 翻译文件仍 ≤200 行（超出则按 P0-9 方式拆子模块）。
- **涉及**：`src/components/ui/dialog.tsx`、`src/components/toast.tsx`、`src/components/locale-toggle.tsx`、`src/components/learn/stroke-order-demo.tsx`、`src/components/practice/writing-canvas.tsx`、`src/lib/i18n/translations/*.ts`

#### P1-29 · 测验 meaning 字段 i18n 化（12 条） `i18n` `待办`

- **现状**：`src/app/practice/page.tsx:21-32` 的 `meaning: 'One'/'Two'/'Person'…` 共 12 条英文硬编码，经 `src/components/practice/quiz-dialog.tsx:58` 直接展示给所有语言用户。
- **目标**：将 12 条释义移入 11 语言词典（`practice.meanings.*`），页面按当前 locale 解析。
- **验收**：① 切换语言时释义随之变化；② 释义不再硬编码于 tsx；③ `i18n.test.ts` 通过。
- **涉及**：`src/app/practice/page.tsx`、`src/components/practice/quiz-dialog.tsx`、`src/lib/i18n/translations/*.ts`

### 3.5 安全

#### P1-30 · CSP 补强 `安全` `待办`

- **现状**：`next.config.mjs:21-39` 的 CSP 缺 `object-src 'none'`、`frame-src`、`worker-src`、`manifest-src`、`upgrade-insecure-requests`。
- **目标**：补齐上述指令；`script-src` 保持 `'unsafe-inline'`（Next App Router 内联脚本所需，`:16-17` 已注释说明）。
- **验收**：① 生产页面无 CSP 违规告警；② `object-src 'none'` 生效；③ `npm run build && npm run start` 后人工核对 header。
- **涉及**：`next.config.mjs`

#### P1-31 · 移除废弃 X-XSS-Protection 响应头 `安全` `待办`

- **现状**：`next.config.mjs:50-52` 仍下发 `X-XSS-Protection: 1; mode=block`，该头已被现代浏览器忽略，属历史遗留。
- **目标**：删除该 header 配置项，保留 `X-Content-Type-Options` / `X-Frame-Options` / `Referrer-Policy` / `Permissions-Policy`。
- **验收**：响应头中不再出现 `X-XSS-Protection`。
- **涉及**：`next.config.mjs`

#### P1-32 · EdgeOne 部署补齐安全响应头 `安全/部署` `待办`

- **现状**：`edgeone.json:6-16` 仅配置 `/_next/static/*` 的 Cache-Control，未确认平台是否透传 `next.config.mjs` 的安全响应头。
- **目标**：在 `edgeone.json` 中显式声明 CSP 等关键安全头，或在 `docs/05-deployment.md` 明确「平台透传验证方法 + 兜底配置」。
- **验收**：① EdgeOne 线上 `curl -I` 能看到 CSP 与安全头；② 文档记录验证命令与截图。
- **涉及**：`edgeone.json`、`docs/05-deployment.md`

### 3.6 RTL（阿拉伯语）支持

#### P1-33 · 新增方向性判断模块 `i18n/RTL` `待办`

- **现状**：`components.json:14` `"rtl": false`；全仓无 `dir=` 属性。
- **目标**：新增 `src/lib/direction.ts`，导出 `RTL_LOCALES`（`['ar']`）与 `getDirection(locale): 'rtl' | 'ltr'`。
- **验收**：纯函数，有单测覆盖 `ar` → `rtl`、其余 10 语言 → `ltr`。
- **涉及**：`src/lib/direction.ts`

#### P1-34 · LocaleProvider 同步 document.dir `i18n/RTL` `待办`

- **现状**：`src/components/locale-provider.tsx:63,69,78` 只设置 `document.documentElement.lang`，从不设置 `dir`。
- **目标**：语言切换与初始化时同步 `document.documentElement.dir`。
- **验收**：切到阿拉伯语后 `document.dir === 'rtl'`。
- **依赖**：P1-33
- **涉及**：`src/components/locale-provider.tsx`

#### P1-35 · 布局改用逻辑属性 `RTL` `待办`

- **现状**：布局大量硬编码 LTR 方向属性（如 `src/components/mobile-nav.tsx:66` 的 `right-0`、`ml-`/`mr-`/`pl-`/`pr-`）。
- **目标**：把方向相关类名改为 `ms-` / `me-` / `ps-` / `pe-` / `start-` / `end-` / `text-start` / `text-end`。
- **验收**：① 阿拉伯语下抽屉从右侧出现、文本与图标方向正确；② 无 `ml-/mr-/pl-/pr-/left-/right-` 残留（装饰性定位除外）。
- **依赖**：P1-34
- **涉及**：`src/components/mobile-nav.tsx`、`src/components/layout-client.tsx`、`src/app/globals.css`、`src/app/styles/*.css`

#### P1-36 · RTL 下书写练习与笔顺方向适配 `RTL` `待办`

- **现状**：`src/components/practice/writing-canvas.tsx` 与 `src/components/learn/stroke-order-demo.tsx` 的坐标与 SVG 未考虑 RTL 下的书写方向与镜像。
- **目标**：明确 RTL 下汉字笔顺动画不镜像（汉字本身 LTR 书写），但周边 UI 文案与布局镜像；SVG / Canvas 坐标保持字形正确。
- **验收**：阿拉伯语下笔顺动画与书写评分仍正确（不出现镜像字形）。
- **依赖**：P1-33
- **涉及**：`src/components/practice/writing-canvas.tsx`、`src/components/learn/stroke-order-demo.tsx`

---

## 4. P2 · 中优先级（可排期）

#### P2-1 · 移除 Tailwind v4 死配置 `构建` `待办`

- **现状**：`tailwind.config.ts`（5.36 KB）存在，但 v4 CSS-first 配置需 `@config` 指令才生效 —— `src/app/globals.css:1-6` 无 `@config`；实际 token 全在 `globals.css:11-90` 的 `@theme`。
- **实测证据（2026-11-04 清理批次）**：构建产物 `.next/static/chunks/*.css`（64.6 KB 主 CSS）中**有** `--color-primary`、`@keyframes brushStroke`，但**缺失** `--color-ink-500` / `.text-ink-900` / `.bg-vermilion-50` / `--shadow-ink-lg` / `--animate-brush-stroke`——这些 token 仅存在于 `tailwind.config.ts`；仓内 24 个文件使用 ink/vermilion 色类、14 个文件使用 `shadow-ink*` 与 `animate-*`，故「直接删除」虽不改产物，但会让这批类持续缺失。
- **目标**：删除 `tailwind.config.ts`，或补 `@config` 使其生效并消除双源 token。**建议**：先把 `ink` / `vermilion` 色阶、`shadow-ink*` / `shadow-vermilion-glow`、`animate-*`、`paper-texture` 迁入 `globals.css` 的 `@theme`（与 P2-18 合并做），再删除该文件；避免"删掉即永久缺失"。
- **验收**：① 构建产物 CSS 不变；② token 只有一个来源。
- **涉及**：`tailwind.config.ts`、`src/app/globals.css`

#### P2-2 · 移除 next.config.mjs 无效 images.remotePatterns `构建` `待办`

- **现状**：`next.config.mjs:79-90` 配置了 `images.remotePatterns`，但全仓无 `next/image` 使用。
- **目标**：删除该配置段；若未来引入图片再恢复。
- **验收**：`next.config.mjs` 无冗余配置。
- **涉及**：`next.config.mjs`

#### P2-3 · 移除 layout.tsx 冗余 preconnect `性能` `待办`

- **现状**：`src/app/layout.tsx:68-69` 手动 preconnect `fonts.googleapis.com` / `fonts.gstatic.com`，但字体已由 `next/font` 自托管（`:3,12-35`），preconnect 无用。
- **目标**：删除两个 `<link rel="preconnect">`。
- **验收**：构建后 HTML 无冗余 preconnect；字体仍正常加载。
- **涉及**：`src/app/layout.tsx`

#### P2-4 · 修复 useTheme undefined 检查死代码 `代码质量` `待办`

- **现状**：`src/components/theme-provider.tsx:25` 的 context 初值不是 `undefined`，导致 `:77-78` 的 `undefined` 检查永不触发（死代码）。
- **目标**：context 初值改为 `undefined` 或移除检查，二选一，保持 `useTheme` 在 Provider 外调用时抛出可读错误。
- **验收**：Provider 外调用 `useTheme()` 抛错而非返回 undefined 解构崩溃。
- **涉及**：`src/components/theme-provider.tsx`

#### P2-5 · 拆分客户端边界，提升 RSC 比例 `架构/性能` `待办`

- **现状**：三个页面全部 `'use client'`（`src/app/page.tsx:2`、`src/app/learn/page.tsx:2`、`src/app/practice/page.tsx:2`），零 RSC/SSG。
- **目标**：把纯展示区块（hero、feature-card、stats-card、页脚、导航）抽为 Server Component，仅交互区块保留 `'use client'`。
- **验收**：① 首屏 HTML 含实际内容（利于 SEO 与首屏）；② 交互行为无回归；③ 各文件仍 ≤200 行。
- **涉及**：`src/app/page.tsx`、`src/app/learn/page.tsx`、`src/app/practice/page.tsx`、`src/components/feature-card.tsx`、`src/components/stats-card.tsx`

#### P2-6 · 引入结构化日志 `运维` `待办`

- **现状**：全 src 仅 `src/app/error.tsx:15` 一条 `console.error`，无 request-id、无日志分级。
- **目标**：新增 `src/lib/logger.ts`（`level` + `context` 字段，dev 输出格式化文本、prod 输出 JSON），替换散落的 `console.*`。
- **验收**：① 日志含级别与上下文；② 生产不输出调试级日志。
- **依赖**：P0-21
- **涉及**：`src/lib/logger.ts`、`src/app/error.tsx`

#### P2-7 · README 免责声明与数据准确性声明 `文档/法律` `待办`

- **现状**：`README.md` 无「教育用途 / 笔顺数据准确性」免责声明。
- **目标**：README / README_EN 新增「免责声明」小节，说明内容仅供学习参考、笔顺数据来源于第三方开源数据可能有偏差、不构成专业教学建议。
- **验收**：两个 README 均有该小节，且链接到 `/terms`。
- **涉及**：`README.md`、`README_EN.md`

#### P2-8 · 同步 docs 文档与实现 `文档` `待办`

- **现状**：`docs/06-testing.md:31,178-180` 描述的覆盖率命令与阈值与实现不一致（provider 未安装）；`docs/05-deployment.md` 无 CI / 安全头 / 监控说明；`docs/04-api-reference.md` 无 health API。
- **目标**：随 P0-17、P1-15、P0-24、P0-16、P0-21 同步更新对应文档；补 `docs/07-design-prototype.md` 的 RTL 规范一节。
- **验收**：文档中所有命令均可直接执行成功。
- **依赖**：P0-17、P1-15、P0-24、P0-16、P0-21、P1-36
- **涉及**：`docs/06-testing.md`、`docs/05-deployment.md`、`docs/04-api-reference.md`、`docs/07-design-prototype.md`

#### P2-9 · 新增版本戳同步脚本 `工具` `待办`

- **现状**：60+ 源文件头部维护 `// path vX.Y.Z` 注释，每次发版需手工同步，易脱节（历史上多次出现代码已 bump 而头注释未改）。
- **目标**：新增 `scripts/sync-version.mjs`，从 `package.json` 读取版本，扫描并更新「被改动文件」与指定全局展示位的版本戳；支持 `--dry-run`。
- **验收**：① 脚本只改被改文件头注释，不全仓库盲刷；② `--dry-run` 输出待改文件清单。
- **涉及**：`scripts/sync-version.mjs`、`package.json`

#### P2-10 · 补齐 ui/* 组件版本戳 `代码质量` `待办`

- **现状**：`src/components/ui/{dialog,tooltip,button,badge}.tsx` 无 `// path vX.Y.Z` 头注释（shadcn 生成时未带）。
- **目标**：补齐头注释，版本取当前值。
- **验收**：4 个文件均有头注释且格式与既有文件一致。
- **涉及**：`src/components/ui/dialog.tsx`、`src/components/ui/tooltip.tsx`、`src/components/ui/button.tsx`、`src/components/ui/badge.tsx`

#### P2-11 · toast 模块级单例改 Context `架构` `待办`

- **现状**：`src/components/toast.tsx:89-98` 为模块级全局单例，多实例 / SSR / 并发场景受限。
- **目标**：改为 `ToastProvider` + `useToast()` Context，容器由 Provider 渲染。
- **验收**：① 多 Provider 实例互不干扰；② 现有调用点行为一致。
- **涉及**：`src/components/toast.tsx`、`src/components/layout-client.tsx`

#### P2-12 · 依赖版本钉住策略 `构建/安全` `待办`

- **现状**：`package.json` 中 `react` / `lucide-react` / `radix-ui` / `tailwindcss` 等使用 `^` 范围；`pnpm-workspace.yaml` overrides 仅钉住 14 个传递依赖补丁下限。
- **目标**：为运行时关键依赖显式钉住精确版本或收窄范围，并在 `docs/05-deployment.md` 记录升级策略与回滚方式。
- **验收**：① lockfile 与 `package.json` 约束一致；② 升级有回滚路径说明。
- **涉及**：`package.json`、`pnpm-workspace.yaml`、`docs/05-deployment.md`

#### P2-13 · loading.tsx 骨架屏细化 `UI/UX` `待办`

- **现状**：`src/app/loading.tsx` 仅 6 行旋转指示；三个页面无异步数据流，`loading.tsx` 实际几乎不会触发。
- **目标**：为 `/learn`、`/practice` 增加与真实布局一致的骨架屏（卡片网格占位），避免未来引入异步数据时布局跳动。
- **验收**：骨架与真实内容尺寸接近，无明显 CLS。
- **涉及**：`src/app/loading.tsx`、`src/app/learn/loading.tsx`、`src/app/practice/loading.tsx`

#### P2-14 · 完善 PWA / 离线兜底 `PWA` `待办`

- **现状**：`metadata.json` keywords 含 "PWA"，但无 manifest（见 P1-3）、无离线兜底、无安装引导。
- **目标**：在 P1-3 基础上补离线页（`public/offline.html`）与「添加到主屏幕」引导组件（仅 PWA 环境显示）。
- **验收**：① 断网访问可加载离线页；② 引导仅在可安装时出现。
- **依赖**：P1-3
- **涉及**：`public/offline.html`、`src/components/pwa-install-prompt.tsx`

#### P2-15 · 404 / 错误页 noindex `SEO` `待办`

- **现状**：`src/app/not-found.tsx` 未设置 `robots: { index: false }`。
- **目标**：404 与 `global-error` 页面导出 `metadata` 并设 `noindex`，避免错误页被收录。
- **验收**：404 页面 `<meta name="robots" content="noindex" />` 存在。
- **依赖**：P0-22
- **涉及**：`src/app/not-found.tsx`、`src/app/global-error.tsx`

#### P2-16 · 发音能力降级提示 `UX` `待办`

- **现状**：`src/hooks/use-pronunciation.ts` 依赖 Web Speech API；不支持该 API 的浏览器无任何提示。
- **目标**：能力检测失败时给用户明确降级提示（走 i18n），并在按钮上标注不可用态。
- **验收**：无 Speech API 环境下点击发音按钮有可读提示而非静默失败。
- **涉及**：`src/hooks/use-pronunciation.ts`、`src/components/learn/character-detail.tsx`

#### P2-17 · 学习进度导出/导入与重置 `产品` `待办`

- **现状**：`src/lib/storage.ts` 仅存进度，无导出/导入/清除入口；用户换设备即丢数据。
- **目标**：新增 `src/lib/progress-transfer.ts`（JSON 导入导出 + 校验 + 版本迁移）与设置面板入口。
- **验收**：① 导出文件可被导入还原；② 导入非法数据不破坏现有进度；③ 有「清除进度」二次确认。
- **涉及**：`src/lib/progress-transfer.ts`、`src/hooks/use-progress.ts`

#### P2-18 · 动画令牌单一来源收敛 `代码质量` `待办`

- **现状**：动画相关定义散落于 `src/app/styles/keyframes.css`、`src/app/globals.css` 的 `@theme`、`tailwind.config.ts`（死文件）、`src/app/page.tsx:34` 的内联 `style={{animation:...}}`；`animate-*` 工具类因 `tailwind.config.ts` 未生效而未进入产物 CSS（实测 `.animate-brush-stroke` 缺失），当前仅 `keyframes.css` 的裸 `@keyframes` 生效。
- **目标**：收敛为单一来源（`@theme` + `keyframes.css`），删除内联硬编码动画名。
- **验收**：① 动画名全部来自 token；② 视觉表现无变化。
- **依赖**：P2-1
- **涉及**：`src/app/page.tsx`、`src/app/styles/keyframes.css`、`src/app/globals.css`

---

## 5. P3 · 低优先级（长期 / 可选）

#### P3-1 · format 脚本覆盖根目录 .mjs `工具` `待办`

- **现状**：`package.json:14` 的 `format` 仅覆盖 `src/**/*.{ts,tsx,css}`，根目录 `.mjs` 脚本与 `next.config.mjs` 不在范围。
- **目标**：扩展 glob 至 `scripts/**/*.mjs` 与 `next.config.mjs`。
- **验收**：一次 `pnpm format` 覆盖全部受管代码文件。
- **涉及**：`package.json`

#### P3-2 · i18n 译文质量审校流程 `i18n/质量` `待办`

- **现状**：11 语言键一致性由单测保障，但译文质量（术语统一、语境正确）无流程约束。
- **目标**：新增 `docs/i18n-review.md` 描述审校清单（术语表、占位符、数字与单位、RTL 文本长度），并新增 `scripts/i18n-lint.mjs` 检查占位符集合一致与超长文案。
- **验收**：① 脚本可运行并报出问题；② 审校清单纳入 PR 检查表。
- **涉及**：`docs/i18n-review.md`、`scripts/i18n-lint.mjs`

#### P3-3 · 社区文件与法律文件互链 `文档` `待办`

- **现状**：`.github/` 下 CODE_OF_CONDUCT / SECURITY / SUPPORT / FUNDING 齐备，但与根 `LICENSE` / `NOTICE` 无互链。
- **目标**：`.github/SECURITY.md` 增「许可与致谢」小节指向 `LICENSE` / `NOTICE`；`CONTRIBUTING.md` 增法律文件说明。**禁止新建 `.github/readme.md`**。
- **验收**：法律文件被正确引用，且未新增 `.github/readme.md`。
- **涉及**：`.github/SECURITY.md`、`CONTRIBUTING.md`、`CONTRIBUTING_EN.md`

#### P3-4 · 原型与实现一致性回归检查 `工具` `待办`

- **现状**：`prototype/` 有 6 个 HTML + 11 个 CSS + 11 个 JS，与 `src/` 实现的一致性靠人工核对。
- **目标**：新增 `scripts/check-prototype-parity.mjs`，比对原型与实现的路由集合、语义化 id 集合、翻译键集合，输出差异报告。
- **验收**：① 能检出「原型有、实现无」的 id 与键；② CI 中作为非阻断步骤运行。
- **依赖**：P0-16
- **涉及**：`scripts/check-prototype-parity.mjs`、`.github/workflows/ci.yml`

---

## 6. 建议执行顺序（里程碑）

| 里程碑 | 包含任务 | 出口标准 |
|--------|----------|----------|
| **M1 仓库与门禁就绪** | P0-15、P0-16、P0-17、P0-19、P0-20、P0-26、P0-28 | `pnpm lint` / `pnpm security:audit` / `pnpm test --coverage` 可用；CI 在 PR 上全绿；根目录无临时脚本与过期产物 |
| **M2 合规闭环** | P0-1 ~ P0-13、P2-7 | LICENSE / NOTICE / 隐私政策 / 服务条款齐备；GA 需显式授权；页脚可跳转法律页 |
| **M3 线上可观测** | P0-21 ~ P0-24、P2-6、P2-15 | 异常可上报并告警；根/子路由均有错误边界；`/api/health` 可用 |
| **M4 SEO 与可访问** | P1-1 ~ P1-9、P1-24 ~ P1-29、P2-8 | sitemap / robots / manifest / JSON-LD / hreflang 齐备；axe 扫描 0 严重违规；核心功能键盘可达 |
| **M5 性能与 i18n 深度** | P1-10 ~ P1-14、P1-30 ~ P1-36 | 体积预算进 CI；11 语言 URL 可分享；阿拉伯语 RTL 可用 |
| **M6 测试完备** | P1-15 ~ P1-23、P2-16、P2-17 | 覆盖率达标；storage / 描红算法 / 测验流程均有单测；E2E 与 a11y 自动化进 CI |

---

## 7. 已知约束（非任务，仅记录）

- 离线环境下 `next build` 会因 `next/font/google` 联网下载字体失败，属环境限制而非代码缺陷；可选引入字体 fallback 或自托管字体。
- 本机 `pnpm` 为 v11 全局版，`pnpm exec` / `pnpm test` 会触发 deps 状态检查并因 `ERR_PNPM_IGNORED_BUILDS` 失败；本机验证请用 `node node_modules/typescript/bin/tsc --noEmit`、`node node_modules/eslint/bin/eslint.js src`、`node scripts/run-tests.mjs`（P0-26 后）。
- 本机 `git push` 到 GitHub 可能因 HTTP/2 报 `Internal Server Error`，用 `git -c http.version=HTTP/1.1 push origin main` 绕过。
- `pnpm audit` 全量（含 dev 工具链）仍存少量 moderate / low 公告，不进入生产构建产物；生产依赖已清零，dev 链随依赖升级持续消化。
- 应用无 AI 后端、无外部 API，仅 Google Fonts 与（可选的）Google Analytics / Sentry 为联网资源。
- Node 24 实验性 `globalThis.localStorage` getter 会遮蔽 vitest jsdom 实现，`vitest.setup.ts` 已兜底安装内存 Storage，业务代码统一用 `window.localStorage`。
