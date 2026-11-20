# SEO / GEO 量化目标与验证

> 文档版本：v5.2.57（与项目版本同步，权威版本见 `package.json`）
> 本文是**可量化指标与验证方式**的单一来源；实现细节见 `docs/04-api-reference.md`，未完成项见 `docs/tasks.md`。

## 1. 指标与目标

| 类别 | 指标 | 目标值 | 验证方式 | 覆盖 |
|------|------|--------|----------|------|
| 语义结构 | 每页 `h1` 数量 | 恰好 1 | Vitest + `node scripts/seo-audit.mjs` | en / zh-CN × 5 页 × 桌面/移动 UA |
| 语义结构 | 标题层级 | `h1 → h2 → h3` 无跳级、首标题为 h1 | `seo-audit.mjs` | 同上 |
| 语义结构 | `<main>` 地标数量 | 恰好 1（全局布局提供） | `seo-audit.mjs` | 同上 |
| 索引 | canonical | 每页 1 条，与语言前缀路径一致 | `src/lib/__tests__/metadata.test.ts` + `seo-audit.mjs` | 11 语言 × 5 页 |
| 索引 | hreflang | 11 语言 + `x-default` = 12 条 | `metadata.test.ts` + `seo-audit.mjs` | 55 条 sitemap URL |
| 索引 | sitemap / robots | 55 条规范 URL；robots 显式允许 4+ AI 爬虫 UA | `src/app/__tests__/seo.test.tsx` | 全站 |
| 结构化数据 | JSON-LD `@graph` | 含 WebSite / Organization / WebPage；首页 FAQPage 3 问，内页 BreadcrumbList 2 项；URL 与当前路由/语言一致 | `seo.test.tsx` | 首页与内页分别断言 |
| GEO | `/llms.txt` | 由 `SITE_URL` 派生，含英中双语事实与 FAQ、11 语言首页链接、5 页面链接 | `src/app/__tests__/llms.test.ts` | 全站 |
| 元数据 | 客户端切语言 | title / description / OG / Twitter / JSON-LD 与服务端一致 | `clientMetadataPatch` + `buildStructuredDataGraph` 单测 | 11 语言 |
| 性能 | LCP / CLS / INP | LCP ≤ 2.5s、CLS ≤ 0.1、INP ≤ 200ms | Lighthouse / CrUX 实测（见 §3） | 桌面 + 移动 |
| 性能 | Lighthouse 评分 | SEO ≥ 95、Performance ≥ 90 | Lighthouse 实测（见 §3） | 桌面 + 移动 |
| 性能 | 资源预算 | 总 chunk ≤ 1500 KB、单 chunk ≤ 500 KB | `pnpm bundle:check` | 构建产物 |

> 未实测的 CWV / Lighthouse 分数不写入文档，避免把目标值误当现状；按 §3 采集后写入 `reports/`（gitignore）。

## 2. 可自动验证命令

```bash
pnpm test                                      # 元数据、JSON-LD、llms.txt、sitemap/robots 断言
node scripts/seo-audit.mjs http://localhost:3000 # 桌面/移动 UA 抓取 en + zh-CN × 5 页，报告写 reports/seo-audit.txt
pnpm bundle:check                              # 构建体积预算
pnpm check:root && pnpm check:lines            # 仓库与源码门禁
```

`seo-audit.mjs` 需本地服务已启动（`pnpm dev` 或 `pnpm start`）；可用 `SEO_AUDIT_URL` 指定线上域名。审计失败项与退出码 1 对应 `reports/seo-audit.txt` 中的明细。

## 3. 桌面端与移动端手动验证

1. Chrome DevTools → Lighthouse → 分别选 **Mobile** 与 **Desktop** → Analyze，导出报告到 `reports/lighthouse-mobile.json` / `reports/lighthouse-desktop.json`。
2. 关注 LCP / CLS / INP 与 SEO 评分；若未达标，优先检查首屏字体、动态导入组件与第三方脚本 consent 门控。
3. Search Console → URL Inspection 抽查 `/zh-CN/`、`/en/learn` 的索引状态；提交 `sitemap.xml` 并确认 hreflang 互指。
4. Rich Results Test 验证 FAQPage（首页）与 BreadcrumbList（内页）无错误。
5. 生成式引擎抽查：向 ChatGPT / Perplexity 提问「HanziMaster 是否免费、是否用 AI 评分、覆盖多少字」，核对回答与 `/llms.txt` 及首页可见正文一致。

## 4. 当前边界

- **P0-32（平台侧）**：生产域若未配置 `NEXT_PUBLIC_SITE_URL`，canonical / hreflang / sitemap 会回退 `localhost`。代码已 fail-closed 告警，需部署后按本节步骤复验。
- 面包屑 UI 使用品牌名作为首页锚文本，JSON-LD 与 UI 共用 `pageTitle` 映射，避免两处文案漂移。
- `llms.txt` 已从静态 `public/` 文件改为 Route Handler，域名始终从 `SITE_URL` 派生。
