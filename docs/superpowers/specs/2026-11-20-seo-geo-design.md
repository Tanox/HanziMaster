# SEO / GEO 代码层收口 · 设计文档

> 设计基线：v5.2.57 · 2026-11-20 · 状态：方案 A 已获用户批准

## 意图与原因

站点已有较完整的 SEO/GEO 基础（11 语言 metadata、canonical/hreflang、JSON-LD `@graph`、55 条 sitemap、AI 爬虫友好的 robots、OG 图、可见 GEO 正文与 `llms.txt`）。用户要求进一步完善，并获得**可量化、覆盖桌面与移动端**的验证方式。因此本次不是从零搭建，而是收口现有实现的真实缺口，并把验证固化为脚本与文档。

## 目标 / 非目标 / 反目标

- **目标**：① 每页语义化层级正确（单一 h1、无跳级、单一 main）；② 结构化数据与当前路由/语言一致，补充面包屑，FAQ 仅出现在提供正文的页面；③ `llms.txt` 不再硬编码域名且提供多语言事实摘要；④ 客户端切语言后元数据与结构化数据同步；⑤ 建立量化指标与自动验证脚本。
- **非目标**：不新增单字详情路由、不引入 Lighthouse/新运行时依赖、不修改生产环境 `NEXT_PUBLIC_SITE_URL` 配置（P0-32 为平台侧事项）。
- **反目标**：不把无正文的页面标成 FAQPage；不在 JSON-LD 中声明与页面不符的事实；不编造未实测的 CWV 分数。

## 约束

- Next.js 16 App Router；语言前缀经 `src/proxy.ts` 注入请求头，客户端切语言仅改 cookie，服务端无法据此重渲染 metadata。
- 11 语言文案须复用既有 `geo.ts` / `seo.ts` 词条，不新增未翻译键。
- 源码单文件 ≤200 行；测试与门禁沿用 Vitest + Node 脚本；产物写 `reports/`，临时文件写 `.tmp/`。

## 方案选择

- **A（已选）**：代码层收口 + 量化验证。改动集中在语义化、结构化数据、`llms.txt`、语言切换同步与验证脚本，风险可控且指标可测。
- **B 最小修**：只修 h1 与结构化数据，无法提供用户要求的量化验证，淘汰。
- **C 深度 GEO**：新增 12 个汉字独立 URL 与深度内链，属新功能工程，超出本次「优化」范围，留作后续独立项目。

## 已决定的实现边界

1. **语义化**：`/learn`、`/practice` 补页面级 h1（复用已有翻译键）；`/privacy`、`/terms` 去掉重复 `<main>`；补齐面包屑 `<nav aria-label>` + `ol/li`。
2. **结构化数据**：`StructuredData` 接收当前路径；`WebPage` / `FAQPage` / `Course` 的 `@id` 与 `url` 随语言和路由变化；首页之外的非 FAQ 页面用 `BreadcrumbList` 替代 FAQPage；所有 `@id` 唯一且不跨页冲突。
3. **llms.txt**：由 Route Handler 从 `SITE_URL` 动态生成，复用 `geo.ts` 事实/问答提供英文与简中摘要（其余语言通过链接指向本地化页面），保留 `/llms.txt` URL 与引用指引。
4. **语言切换**：客户端切语言时同步 `document.title`、`description`、Open Graph / Twitter 标题描述与 JSON-LD 的 `inLanguage`，复用同一纯函数，避免第二套映射。
5. **量化与验证**：`docs/seo-geo.md` 固化指标表（每页 h1 数、标题层级、main 数、canonical/hreflang 覆盖率、JSON-LD 校验、CWV 与 Lighthouse 目标，桌面+移动）；`scripts/seo-audit.mjs` 对可访问站点输出 HTML 结构断言报告到 `reports/`；Vitest 补元数据/结构化数据/语义结构断言。

## 留给实施者的判断

- 面包屑在各页面组件内的插入位置、h1 的具体翻译键由实施者按现有词条选定，属细节，不改变方案。
- Lighthouse / CWV 的实际分数需在有网络与浏览器的环境采集；本仓库只提供目标值与本地可自动化的结构断言，不得写入未实测分数。
