# API 参考

> 文档版本：v5.2.37（与项目版本同步，权威版本见 `package.json`）

本文列出应用内部**公开模块与组件的真实签名**。类型与导出以源码为准；本文只做稳定契约说明，不逐字复制实现。设计 token 完整色板见 [07-design-prototype.md](07-design-prototype.md)，编码用法见 [coding-standards.md](coding-standards.md)。

## 1. 组件边界总览

| 文件 | 边界 | 主要导出 |
|------|------|---------|
| `src/app/layout.tsx` | Server | 默认导出根布局 |
| `src/app/page.tsx` / `learn/page.tsx` / `practice/page.tsx` | Client | 默认导出页面组件 |
| `src/app/privacy/page.tsx` / `terms/page.tsx` | Server | 法律条款静态页（文案取 `src/content/`） |
| `src/app/api/health/route.ts` | Server | `GET` 健康检查（见 §10） |
| `src/app/manifest.ts` / `robots.ts` / `sitemap.ts` | Server | PWA manifest、robots、sitemap 生成 |
| `src/app/global-error.tsx`、`learn/error.tsx`、`practice/error.tsx` | Client | 根级 / 路由级错误兜底 |
| `src/components/locale-provider.tsx` | Client | `LocaleProvider`、`useLocale`、`useTranslation` |
| `src/components/theme-provider.tsx` | Client | `ThemeProvider`、`useTheme` |
| `src/components/*-toggle.tsx` | Client | `ThemeToggleClient`、`LocaleToggleClient` |
| `src/components/state/state-views.tsx` | Client | `EmptyState`、`ErrorState`、`LoadingSpinner` |
| `src/components/ui/*` | Client | `Button`、`Badge`、`Dialog`、`Tooltip` 等原语 |

## 2. LocaleProvider 与翻译 hooks

**路径**：`src/components/locale-provider.tsx`

Props：

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `children` | `React.ReactNode` | — | 子组件 |
| `defaultLocale` | `Locale` | 浏览器检测值 | 初始语言 |
| `storageKey` | `string` | `hanzi-master-locale` | 偏好存储键 |

`useLocale()` 与 `useTranslation()` 返回同一上下文对象：

| 字段 | 类型 | 说明 |
|------|------|------|
| `locale` | `Locale` | 当前语言 |
| `t` | `(key: TranslationKey, params?: Record<string, string \| number>) => string` | 翻译 + `{{name}}` 插值 |
| `setLocale` | `(locale: Locale) => void` | 切换语言并持久化 |
| `availableLocales` | `Locale[]` | 11 种语言列表 |

```tsx
'use client';

import { useTranslation } from '@/components/locale-provider';

export function Example() {
  const { t, locale, setLocale } = useTranslation();
  return (
    <button onClick={() => setLocale('zh-CN')}>
      {t('home.heroTitle')} · {locale}
    </button>
  );
}
```

`t()` 的 key 受 `TranslationKey` 点分联合类型约束；传入不存在的键会在类型检查阶段报错。插值由 `src/lib/i18n/translate.ts` 的 `interpolate` 完成，已处理原型链与占位符安全。

## 3. ThemeProvider 与主题组件

**路径**：`src/components/theme-provider.tsx`、`src/components/theme-toggle.tsx`

| 项 | 签名 / 值 |
|----|----------|
| `Theme` | `'dark' \| 'light' \| 'system'` |
| `ThemeProvider` Props | `children`、`defaultTheme?: Theme`（默认 `system`）、`storageKey?: string`（默认 `hanzi-master-theme`） |
| `useTheme()` | 返回 `{ theme: Theme; resolvedTheme: 'dark' \| 'light'; setTheme: (theme: Theme) => void }`；`resolvedTheme` 是 `system` 解析后的实际主题 |
| `ThemeToggleClient` | 无 props，三态循环切换：`light → dark → system → light` |

主题由根节点 `.dark` 类切换（`globals.css` 内定义暗色变量），偏好经 `safeSetItem` 持久化；Tooltip 文案取 `common.theme.*`。

## 4. 导航与语言切换组件

| 组件 | 路径 | 签名 / 说明 |
|------|------|------------|
| `LocaleToggleClient` | `components/locale-toggle.tsx` | 无 props；11 语言下拉，`role="listbox"`、`aria-expanded`、Escape / 方向键、点击外部关闭 |
| `NavLink` | `components/nav-link.tsx` | `({ href, children }: NavLinkProps)`；活跃态朱砂红文字 + 下划线 |
| `MobileNav` | `components/mobile-nav.tsx` | `({ isOpen, onClose, t }: MobileNavProps)`；`t` 类型同 §2；抽屉支持 Escape 关闭、右滑关闭（`useSwipeClose`）、滚动锁定、`aria-modal` |
| `LayoutClient` | `components/layout-client.tsx` | 站点头尾与抽屉编排；页脚 `#footer-version` 用 `VERSION_LABEL` 插值 |

`MobileNavProps.t` 是显式传入的翻译函数，类型使用 `TranslationKey`，**不是** `(key: string) => string`。

## 5. 状态视图

**路径**：`src/components/state/state-views.tsx`

| 导出 | 用途 |
|------|------|
| `EmptyState` | 空数据态（标题、描述、可选操作） |
| `ErrorState` | 错误态与重试 |
| `LoadingSpinner` | 加载指示，接受 `className` |

配合路由级 `src/app/error.tsx` / `loading.tsx` / `not-found.tsx` 使用，文案取 `common.empty*` / `common.error*` / `common.notFound*`。

## 6. 基础原语与通用组件

`src/components/ui/` 当前只有 4 个基础原语：`button.tsx`、`badge.tsx`、`dialog.tsx`、`tooltip.tsx`（含 `TooltipProvider`）。历史文档曾列 24 个，属过时快照，勿据此引用不存在的组件。

跨页面组件：`feature-card.tsx`、`stats-card.tsx`、`toast.tsx`、`google-analytics.tsx`。业务子组件按页面归入 `components/learn/`、`components/practice/`。

## 7. Hooks

**路径**：`src/hooks/`

| Hook | 职责 |
|------|------|
| `useProgress` | 读写 `hanzi-master-progress`，提供连胜、准确率、周活动与记录接口 |
| `usePronunciation` | 浏览器语音合成发音播放 |
| `useScrollReveal` | IntersectionObserver 滚动入场动效 |
| `useSwipeClose` | 移动抽屉右滑关闭手势 |
| `useHaptic` | 震动反馈（受设备能力约束） |

所有 hooks 只能在 Client Component 中调用；进度相关逻辑的纯函数位于 `src/lib/progress-utils.ts`。

## 8. i18n 模块 API

**路径**：`src/lib/i18n/index.ts`、`src/lib/i18n/translate.ts`

| 导出 | 类型 / 说明 |
|------|------------|
| `Locale` | `'en' \| 'zh-CN' \| 'zh-TW' \| 'es' \| 'ar' \| 'fr' \| 'pt-BR' \| 'de' \| 'ja' \| 'ko' \| 'ru'` |
| `Translations` | `ReturnType<typeof extendTranslations>`：以 `en.ts` 为基准 + `extensions/` 合并后的最终结构 |
| `TranslationKey` | `Translations` 全部叶子键的点分联合类型 |
| `translations` | `Record<Locale, Translations>` |
| `locales` | `Locale[]`，由 `Object.keys(translations)` 生成 |
| `getNestedValue` | `(obj: Translations, path: string) => string`，按点分路径取值 |
| `interpolate` | 把 `{{name}}` 占位符替换为传入参数 |

翻译文件：`src/lib/i18n/translations/{en,zh-CN,zh-TW,es,ar,fr,pt-BR,de,ja,ko,ru}.ts`，共 11 个。`src/lib/__tests__/i18n.test.ts` 校验其余 10 语言的叶子键与 `en` 完全一致；`pnpm i18n:lint` 做同口径的命令行校验。

**扩展文案模块**：`src/lib/i18n/translations/extensions/` 下共 3 组（`a11y`、`legal`、`meanings`）+ 1 个 `index.ts` 合并入口；`extendTranslations(base, locale)` 把三组文案合并进 11 个语言包，`Translations` 与 `TranslationKey` 类型随之自动扩展。新增文案模块时必须 11 语言齐全并保持叶子键一致。

### 8.1 翻译键域

`en.ts` 顶层共 6 个键域；**具体键以 `en.ts` 源码为准**，新增键须同步 11 个语言文件：

| 键域 | 内容 | 示例 |
|------|------|------|
| `common` | 导航、主题、通用操作、空/错/404 状态 | `common.theme.dark`、`common.emptyTitle` |
| `home` | 首页 Hero、特性、永字八法 | `home.heroTitle`、`home.featuresTitle` |
| `learn` | 12 个汉字词条、例句、笔顺、测验、键盘提示 | `learn.showStrokeOrder`、`learn.kbdHint` |
| `practice` | 三种练习模式、弹窗/测验/进度文案、星期 | `practice.writingTitle`、`practice.accuracy` |
| `footer` | 页脚版权 | `footer.copyright` |
| `meta` | 页面元数据 | `meta.title`、`meta.description` |

`footer.copyright` 固定使用 `{{versionLabel}}` 占位符（如 `© 2026 HanziMaster 汉字大师 {{versionLabel}}. All rights reserved.`），由 `layout-client.tsx` 用 `VERSION_LABEL` 插值；**不存在 `common.appVersion` 键**，禁止把版本号写进翻译文件。

> `home` 域中保留 `aiInsights*` / `etymology*` / `adaptive*` / `aiBadge` 等历史键名，首页仍有引用；它们只是文案键，不代表项目存在 AI 后端或 Gemini 依赖。

## 9. 工具模块 API

| 路径 | 导出 | 说明 |
|------|------|------|
| `src/lib/storage.ts` | `safeGetItem<T>(key, defaultValue)`、`safeSetItem<T>(key, value)` | 版本化 + schema 校验，内部统一 `window.localStorage`，异常静默降级 |
| `src/lib/utils.ts` | `cn(...inputs: ClassValue[])` | `clsx` + `twMerge` 合并类名 |
| `src/lib/version.ts` | `APP_VERSION`、`BUILD_ID`、`VERSION_LABEL` | 读取 `NEXT_PUBLIC_*` 注入值，缺失时回退 |
| `src/lib/site.ts` | `SITE_URL` | 站点绝对地址（`NEXT_PUBLIC_SITE_URL`，回退 `http://localhost:3000`），供 canonical / sitemap 使用 |
| `src/lib/consent.ts` | GA 同意状态读写 | 同意门控（`getConsent` / `setConsent` 等），配合 `consent-banner.tsx` |
| `src/lib/error-reporting.ts` | 错误上报封装 | 未配置 Sentry DSN 时为空操作 |
| `src/lib/characters*.ts` | 汉字数据与类型 | 12 个基础汉字，拆分为 `characters-part1/2.ts` |
| `src/lib/stroke-order-data.ts` | 笔顺数据 | 学习页笔顺演示 |
| `src/lib/progress-utils.ts` | 连胜 / 准确率 / 周活动纯函数 | 由 `useProgress` 调用 |

## 10. HTTP 端点

| 端点 | 方法 | 响应 |
|------|------|------|
| `/api/health` | `GET` | `{ status: 'ok', version, build }`；`version` / `build` 取 `NEXT_PUBLIC_APP_VERSION` / `NEXT_PUBLIC_BUILD_ID`，未注入时为 `unknown`。用于部署后健康探测，无鉴权、无副作用。 |

这是当前唯一的 HTTP 端点；应用无业务后端 API。

## 11. 样式与主题 token

语义 token 定义在 `src/app/globals.css` 的 `@theme`，命名带 `--color-` 前缀：

| Token | 值（浅色） | 用途 |
|-------|-----------|------|
| `--color-primary` | `#c53d43` | 朱砂红品牌主色 |
| `--color-primary-dark` | `#9b2c2c` | 主色深阶 |
| `--color-primary-hover` / `--color-primary-border` | `color-mix(...)` 派生 | 悬停 / 边框 |
| `--color-accent` | `#4f46e5` | 靛蓝辅助色 |
| `--color-background` / `--color-foreground` | `#faf9f6` / `#1a1a1a` | 页面背景 / 主文本 |
| `--color-ring` | `#c53d43` | 焦点环 |
| `--color-destructive` | `#ef4444` | 危险色 |

字体变量：`--font-sans`（Space Grotesk）、`--font-display` / `--font-heading`（Playfair Display）、`--font-serif`（Noto Serif SC）、`--font-mono`（JetBrains Mono）。汉字用 `.hanzi-font`（`--font-serif`）。

> 旧版本本文使用 `--primary` / `--accent`（无 `--color-` 前缀）并把 `--font-heading` 写成 Space Grotesk，均与 `globals.css` 不符，已纠正。扩展色阶与动画见 `tailwind.config.ts`，完整设计系统见 [07-design-prototype.md](07-design-prototype.md)。

## 12. 环境变量与浏览器要求

- 环境变量：核心页面**无需任何**即可运行；可选变量（`NEXT_PUBLIC_SITE_URL` / GA / Sentry / `ANALYZE`）见 `.env.example` 与 [01-overview.md](01-overview.md) §7。运行期版本由 `next.config.mjs` 注入 `NEXT_PUBLIC_APP_VERSION` / `NEXT_PUBLIC_BUILD_ID`，不需手工配置。
- 浏览器：Chrome / Firefox / Safari / Edge 最新两个主要版本；需启用 JavaScript、`localStorage`、Canvas 与（发音功能）Web Speech API。
- 构建期联网资源：`next/font/google`（Google Fonts）。

## 13. 相关文档

- [技术架构](02-architecture.md)
- [编码规范](coding-standards.md)
- [国际化与命名约定](coding-standards.md) §9
- [设计系统规范](07-design-prototype.md)
- [测试规范](06-testing.md)
