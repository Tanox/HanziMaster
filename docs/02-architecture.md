# 技术架构

> 文档版本：v5.2.43（与项目版本同步，权威版本见 `package.json`）

本文描述**当前代码的实际架构**。组件 API 见 [04-api-reference.md](04-api-reference.md)，设计系统见 [07-design-prototype.md](07-design-prototype.md)，编码约束见 [coding-standards.md](coding-standards.md)。

## 1. 架构分层

```
┌──────────────────────────────────────────────────────────┐
│ 入口层  src/app/                                          │
│   layout.tsx（Server Component：字体、Metadata、Providers） │
│   page.tsx / learn/page.tsx / practice/page.tsx           │
│   （三者均为 'use client'，依赖 i18n Context 与浏览器 API） │
│   error.tsx / loading.tsx / not-found.tsx                 │
├──────────────────────────────────────────────────────────┤
│ 状态层  React Context                                     │
│   LocaleProvider（locale / t / setLocale）                 │
│   ThemeProvider（theme / setTheme）                        │
│   useProgress（进度、连胜、准确率、周活动）                 │
├──────────────────────────────────────────────────────────┤
│ 组件层  src/components/                                   │
│   ui/（button / dialog / tooltip / badge）                 │
│   learn/ · practice/ · state/ · 导航与卡片                  │
├──────────────────────────────────────────────────────────┤
│ 逻辑层  src/hooks/ + src/lib/                             │
│   characters / stroke-order-data / progress-utils          │
│   i18n（index + translate + 11 语言） / storage / version  │
├──────────────────────────────────────────────────────────┤
│ 基础设施                                                  │
│   next.config.mjs（CSP + 安全头 + 版本/build 注入）         │
│   next/font/google（字体） · localStorage（持久化）         │
│   Vercel / EdgeOne（部署）                                 │
└──────────────────────────────────────────────────────────┘
```

> 历史版本本文的架构图把首页标为 Server Component，与代码不符。当前三个页面都是 Client Component；根布局保持 Server Component。规范不要求强行改造为 RSC，但新增纯静态区块应优先留在服务端边界。

## 2. 路由与页面

| 路由 | 文件 | 边界 | 职责 |
|------|------|------|------|
| `/` | `src/app/page.tsx` | Client | Hero、功能特性、永字八法演示 |
| `/learn` | `src/app/learn/page.tsx` | Client | 字符网格、详情、发音、笔顺、测验、键盘切换 |
| `/practice` | `src/app/practice/page.tsx` | Client | 书写练习、拼音测验、真实进度统计 |
| `/privacy` · `/terms` | `src/app/privacy/page.tsx` / `terms/page.tsx` | Server | 法律条款静态页（文案在 `src/content/`） |
| `/api/health` | `src/app/api/health/route.ts` | Server | 健康检查，返回版本与 build 编号 |
| SEO / PWA | `manifest.ts` / `robots.ts` / `sitemap.ts` | Server | manifest、robots、sitemap 生成 |
| 路由态 | `error.tsx` / `loading.tsx` / `not-found.tsx` / `global-error.tsx`（含 `learn/`、`practice/` 级 error） | Client | 错误边界、加载、404 |
| 根布局 | `layout.tsx` | Server | 字体、Metadata、Provider 组合、GA、`LayoutClient` |

`src/app/styles/` 存放从 `globals.css` 拆出的 `utilities.css`、`keyframes.css` 与 `rtl.css`（RTL 布局规则），保证单文件 ≤ 200 行。

## 3. 模块职责

| 模块 | 路径 | 职责 |
|------|------|------|
| 布局与导航 | `layout-client.tsx` / `nav-link.tsx` / `mobile-nav.tsx` | 站点头尾、桌面导航、移动抽屉、版本展示 |
| 设置 | `settings-dialog.tsx`、`lib/settings.ts` | 头部齿轮按钮 + 全局设置弹窗（主题/语言/震动/减少动效/重置进度），偏好版本化持久化于 `hanzi-master-settings` |
| 主题 | `theme-provider.tsx` / `theme-toggle.tsx` | dark / light / system 三态，`.dark` 类切换与持久化 |
| 国际化 | `components/locale-provider.tsx`、`lib/i18n/` | 语言状态、`t()` 插值、`TranslationKey` 类型、11 语言包 |
| 学习 | `components/learn/` | 字符网格/详情、笔顺演示、测验弹窗 |
| 练习 | `components/practice/` | 书写弹窗与 Canvas（拆为 `writing-canvas-*`）、练习选项、周进度、测验 |
| 状态视图 | `components/state/state-views.tsx` | `EmptyState` / `ErrorState` / `LoadingSpinner` |
| 基础原语 | `components/ui/` | `button` / `dialog` / `tooltip` / `badge`（shadcn 风格，radix-nova preset） |
| 数据与逻辑 | `lib/characters*.ts`、`stroke-order-data.ts`、`progress-utils.ts` | 12 个汉字数据、笔顺数据、进度计算 |
| 存储 | `lib/storage.ts` | `safeGetItem` / `safeSetItem`，版本化 + schema 校验，统一 `window.localStorage` |
| 版本 | `lib/version.ts` | `APP_VERSION` / `BUILD_ID` / `VERSION_LABEL`（读取注入值） |
| hooks | `hooks/use-*.ts` | 进度、发音、滚动 reveal、右滑关闭、震动反馈 |
| 通用 | `lib/utils.ts`、`feature-card.tsx`、`stats-card.tsx`、`toast.tsx` | 类名合并、卡片与提示 |

## 4. 数据流

```
用户交互
  ├─ 主题切换 → ThemeProvider → document.documentElement.classList(.dark)
  │            → safeSetItem('hanzi-master-theme')
  ├─ 语言切换 → LocaleProvider → document.documentElement.lang
  │            → safeSetItem('hanzi-master-locale') → 所有 t() 消费组件重渲染
  └─ 书写/测验 → useProgress → progress-utils 计算
               → safeSetItem('hanzi-master-progress') → 周活动/准确率/连胜视图
```

持久化统一走 `src/lib/storage.ts`（带 `STORAGE_VERSION` 与 schema 校验，过滤 NaN 与非法日期），业务代码不直接访问 `localStorage`。无云端同步，无第三方 API 调用。

## 5. 版本与构建标识

`package.json` 的 `version` 是唯一权威源。`next.config.mjs` 在 dev / build 时读取它，注入 `NEXT_PUBLIC_APP_VERSION` 与构建时刻的 `NEXT_PUBLIC_BUILD_ID`（`yymmddhhmm`，10 位）；`src/lib/version.ts` 暴露 `VERSION_LABEL`；`layout-client.tsx` 通过 `t('footer.copyright', { versionLabel })` 插值到 `#footer-version`，移动抽屉读 `#drawer-version`。因此 11 个语言文件不含字面版本号。完整链路见 [03-development.md](03-development.md) §4。

## 6. 安全与配置

- CSP 与 `X-Content-Type-Options` / `X-Frame-Options` / `Referrer-Policy` / `Permissions-Policy` / `Cross-Origin-Opener-Policy` 由 `next.config.mjs` 的 `headers()` 对 `/:path*` 统一注入；生产 CSP 放行 Google Fonts 与 Analytics 域名，`script-src` 因 App Router 内联脚本需要 `'unsafe-inline'`。已废弃的 `X-XSS-Protection` **不再发送**。
- **无中间件**：不存在 `middleware.ts` / `proxy.ts`；历史上曾存在名为 `proxy.ts` 的文件，因文件名不生效且与 CSP 重复已删除。不要在文档或代码中恢复该引用。
- `next/font/google` 是唯一联网构建依赖；离线构建失败属环境限制。
- `components.json` 记录 shadcn 配置（style `radix-nova`、`rsc: true`、别名 `@/components` 等）。
- 设计令牌单一来源：`globals.css @theme`（语义 token）+ `styles/theme-colors.css`（扩展色阶/阴影）+ `styles/utilities.css`（动画工具类），见 [coding-standards.md](coding-standards.md) §8。

## 7. 测试与质量

Vitest + jsdom，测试就近放在各模块 `__tests__/`，当前 **24 个单测文件**；`i18n.test.ts` 校验 11 语言叶子键一致。另有 Playwright E2E（`e2e/`，含 axe 无障碍断言）与覆盖率阈值门禁（`@vitest/coverage-v8`，80/70/80/80）。质量门禁（类型检查 / lint / 单测 / 行数 / 审计 / 构建 / 体积 / i18n / 版本展示位）见 [coding-standards.md](coding-standards.md) §11，测试细节见 [06-testing.md](06-testing.md)；CI 工作流见 [05-deployment.md](05-deployment.md) §6。

## 8. 技术选型理由

| 选择 | 理由 |
|------|------|
| Next.js 16 App Router | 文件系统路由、RSC 边界、内置构建与安全头注入 |
| React Context | 状态规模小，无需额外状态库；Provider 组合清晰 |
| Tailwind CSS 4 + `@theme` | 语义 token 与原子类结合，深色模式与响应式统一 |
| 自定义 i18n | 11 语言静态包 + `TranslationKey` 编译期约束，无运行时依赖 |
| localStorage | 本地优先、离线可用、无账户与后端成本 |
| Vitest + Testing Library | 与 Vite 生态一致，jsdom 覆盖组件与交互路径 |

## 9. 相关文档

- [项目概述](01-overview.md)
- [开发指南](03-development.md)
- [API 参考](04-api-reference.md)
- [编码规范](coding-standards.md)
- [设计系统规范](07-design-prototype.md)
- [部署指南](05-deployment.md)
