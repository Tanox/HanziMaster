# 编码规范

> 文档版本：v5.2.43（与项目版本同步，权威版本见 `package.json`）

本文是项目**编码风格、命名约定、目录组织与质量门禁的唯一权威**。提交信息、分支与代码审查见 [git-workflow.md](git-workflow.md)，环境与命令见 [03-development.md](03-development.md)。其他文档只做摘要与链接，不得另立一套规则。

## 1. 适用范围

- 约束对象：`src/`、`prototype/`、`scripts/` 下所有 `.ts` / `.tsx` / `.js` / `.mjs` / `.css` 源码，以及根级配置文件。
- 文档（`.md`）不受本文的命名、行数与注释规则约束；文档须保持单文件完整连贯，不拆分。
- 规范优先级：本文 > [03-development.md](03-development.md) 摘要 > [README.md](../README.md) 摘要。冲突时以本文为准，并在此后修正摘要。

## 2. 文件头注释

所有源码文件首行使用单行注释标注路径与版本：

```typescript
// src/lib/version.ts v5.2.35
```

- 路径为**仓库根目录起算的相对路径**，分隔符用 `/`。
- 版本号取本次发版的完整 SemVer；无历史头注释的新文件在新增时按当前版本写入。
- **仅更新本次实际改动的文件**；未改动文件的头注释保持不变，禁止全仓库批量刷写。仓库内存在历史遗留的变体写法（如 `// <path> · 说明（vX.Y.Z）`），新文件与改动文件一律统一为上述格式。
- 文档的版本戳格式见 [index.md](index.md) §5，与源码头注释是两套机制，不要混用。

## 3. 版本管理（SemVer 2.0.0）

任何文件（代码、文档、配置）的增改删都**至少 bump 一次 patch**；新功能用 minor，破坏性变更用 major，不叠加 patch。

| 级别 | 场景 | 变更 |
|------|------|------|
| patch | 修复、文档、重构、样式、配置、依赖 | `x.y.Z → x.y.Z+1` |
| minor | 向后兼容的新功能 | `x.Y.z → x.Y+1.0` |
| major | 破坏性变更 | `X.y.z → X+1.0.0` |

发版必须同步的**全局单一来源位置**：

1. `package.json` 的 `version`（**唯一权威源**，运行期版本号由此注入）。
2. `metadata.json` 的 `name` 内版本与 `version`。
3. `README.md` / `README_EN.md` 的标题与页脚版本号。
4. `CHANGELOG.md` 新增对应版本小节。
5. 本次改动源码文件的头注释（见 §2）与本次改动文档的版本戳（见 [index.md](index.md) §5）。

**不需要**随发版改动的位置：`src/lib/version.ts`（读取注入值）、`next.config.mjs`（读取 `package.json`）、11 个语言包的 `footer.copyright`（使用 `{{versionLabel}}` 插值）、未改动的任何文件。`common.appVersion` 键不存在，禁止在文档或代码中引用。版本与 build 编号注入链路见 [03-development.md](03-development.md) §4。

## 4. 目录组织

```
HanziMaster/
├── src/
│   ├── app/                     # App Router 路由与全局样式
│   │   ├── page.tsx             # /          首页
│   │   ├── learn/page.tsx       # /learn     学习页
│   │   ├── practice/page.tsx    # /practice  练习页
│   │   ├── layout.tsx           # 根布局（Server Component）
│   │   ├── error.tsx            # 路由错误边界
│   │   ├── loading.tsx          # 路由加载态
│   │   ├── not-found.tsx        # 404 页面
│   │   ├── globals.css          # 语义 design token（@theme）
│   │   └── styles/              # utilities.css / keyframes.css
│   ├── components/              # 可复用组件
│   │   ├── ui/                  # shadcn 风格基础原语（button / dialog / tooltip / badge）
│   │   ├── learn/               # 学习页子组件
│   │   ├── practice/            # 练习页子组件（含 writing-canvas-* 拆分模块）
│   │   ├── state/               # EmptyState / ErrorState / LoadingSpinner
│   │   ├── __tests__/ 或同级     # 组件测试就近放于所属模块 __tests__/
│   │   └── *.tsx                # 跨页面组件（Provider、导航、卡片、Toast 等）
│   ├── hooks/                   # use-* 自定义 hooks + __tests__/
│   └── lib/                     # 纯逻辑与数据
│       ├── i18n/                # index.ts / translate.ts / translations/*.ts
│       ├── __tests__/           # 纯逻辑单测
│       └── *.ts                 # characters / storage / utils / version / progress-utils …
├── prototype/                   # 原型（6 个 HTML 骨架 + styles/ + scripts/）
├── scripts/                     # 可复用工具脚本（run-tests / check-line-count）
├── docs/                        # 规范文档
└── reports/                     # 脚本产物（已被 .gitignore 忽略，不提交）
```

新增文件放置规则：

| 变更类型 | 目标位置 | 命名 |
|---------|---------|------|
| 新页面 | `src/app/<route>/page.tsx` | 路由名 kebab-case |
| 新组件 | `src/components/` 或对应业务子目录 | `my-component.tsx` |
| 新基础原语 | `src/components/ui/` | 与 shadcn 命名一致 |
| 新 hook | `src/hooks/` | `use-xxx.ts` |
| 新纯逻辑 / 数据 | `src/lib/` | `xxx-utils.ts` / `xxx-data.ts` |
| 新测试 | 所属模块 `__tests__/` | `<被测文件>.test.ts(x)` |
| 新工具脚本 | `scripts/` | `xxx-yyy.mjs`，产物写 `reports/` |

禁止：在仓库根新增一次性脚本或产物文件；把跨页面组件塞进页面目录；把纯函数与 UI 混写在同一文件。

> 根目录清洁度由 `pnpm check:root`（`scripts/check-root-clean.mjs`，白名单制）强制：新增会产生落盘产物的脚本，输出必须指向 `reports/`（或对应生成目录）并先 `mkdir -p`；`.gitignore` 预置 `*.out` / `audit-*.json` / `*-result.json` 兜底。CI 首步即执行该门禁。

## 5. 命名约定

| 对象 | 规则 | 示例 |
|------|------|------|
| 源码文件名 / 目录名 | kebab-case | `locale-provider.tsx`、`writing-canvas-utils.ts` |
| 组件函数 / 类型 / 接口 | PascalCase，**不加 `I` 前缀** | `LocaleProvider`、`Character`、`ThemeProps` |
| 变量 / 普通函数 | camelCase | `isDarkMode`、`getBrowserLocale()` |
| 自定义 hook | `use` + PascalCase | `useProgress`、`useSwipeClose` |
| 模块级常量 | UPPER_SNAKE_CASE | `STORAGE_KEY`、`LOCALES` |
| 翻译键 | 点分小写驼峰路径 | `home.heroTitle`、`common.theme.dark` |
| DOM `id` | kebab-case 语义命名 | `site-footer`、`footer-version`、`main-content` |
| 测试文件 | `<name>.test.ts(x)` | `progress-utils.test.ts` |
| 分支 / 提交 | 见 [git-workflow.md](git-workflow.md) | `feature/stroke-order-hint` |

Next.js 约定文件名（`page.tsx` / `layout.tsx` / `error.tsx` / `loading.tsx` / `not-found.tsx`）与配置文件名（`next.config.mjs` 等）不适用 kebab-case 规则。

**语义化 id**：页面级容器、主要区块、图表与关键交互 DOM 必须加唯一 id；列表渲染（`.map`）内禁止使用静态 id，重复 id 需按实体区分（如 `learn-quiz-dialog` / `practice-quiz-dialog`）。id 用于调试定位、ARIA 关联与 e2e 选择器，命名须表达用途。

## 6. TypeScript 与代码风格

- `tsconfig.json` 开启 `strict: true`，`target`/`lib` 为 `ES2024`，`moduleResolution: bundler`，`noEmit: true`。
- 路径别名 `@/*` → `src/*`；跨目录引用一律用别名，页面内相对引用仅限同目录。
- 禁止 `any`，用具体类型或 `unknown` + 类型守卫；禁止 `@ts-ignore`、`@ts-expect-error`；避免不必要的类型断言。
- 用 `type` 定义 Props 与联合类型；导出给外部使用的类型显式声明。
- 让 TypeScript 推导局部变量类型，不写冗余注解；不应修改的字段用 `readonly`。
- 格式化以 `.prettierrc.json` 为准：`semi: true`、`singleQuote: true`、`trailingComma: all`、`printWidth: 100`、`tabWidth: 2`、`arrowParens: always`、`endOfLine: lf`。
- v5.2.35 起 `prettier` 已声明为开发依赖，`pnpm format` 可用；格式化范围由 `package.json` 的 `format` 脚本定义。
- ESLint 采用 flat config（`eslint.config.js`）：Next 推荐规则 + `core-web-vitals` + `@typescript-eslint/no-unused-vars`（`varsIgnorePattern: "^_"`）。**error 与 warning 都必须清零**。
- 禁止 `console.log` / `debugger` 进入提交；Promise 必须显式处理错误。

## 7. React 与 App Router

- 根布局 `src/app/layout.tsx` 为 Server Component；当前 `/`、`/learn`、`/practice` 三个页面均为 Client Component（依赖 i18n Context 与浏览器 API），文件首行必须 `'use client';`。
- 需要 hooks、事件、浏览器 API 的组件标 `'use client'`；纯静态内容与数据渲染保持 Server Component，不滥用客户端边界。
- 状态管理用 React Context（`ThemeProvider` / `LocaleProvider`）+ localStorage；进度数据由 `useProgress` 读写，禁止硬编码假数据。
- 组件单一职责，Props 类型完整；副作用在 `useEffect` 内声明清理函数（事件监听、订阅、定时器）。
- 公共函数写简洁 JSDoc；复杂逻辑写中文说明注释；注释单行、避免复述代码；CSS 用 `/* */`，TS/JS 用 `//`。
- 错误边界与路由态使用 `error.tsx` / `loading.tsx` / `not-found.tsx`；空/错/加载态复用 `src/components/state/state-views.tsx`。

## 8. 样式与设计令牌

**单一来源，分层组织，不得另立他源**：

| 来源 | 负责内容 |
|------|---------|
| `src/app/globals.css` 的 `@theme` | 语义 token：`--color-background` / `--color-primary` / `--color-ring` / 字体与圆角变量 |
| `src/app/styles/theme-colors.css` 的 `@theme` | 扩展色阶（ink / vermilion / indigo / success / warning / info）与阴影（`shadow-ink*` / `shadow-vermilion-glow`） |
| `src/app/styles/utilities.css` | 动画工具类（`animate-*`）与复合工具类 |

- 组件用 `var(--color-*)` 或对应 Tailwind 语义类取色，**禁止硬编码色值**（含 `bg-[#...]` / `style={{ color: '#...' }}`）。
- 禁止 `rounded-[Npx]` 任意值与 `transition-all`，使用 radius / transition token。
- 深色模式由 `ThemeProvider` 在根节点切换 `.dark` 类，`globals.css` 中定义暗色变量；不要依赖 `dark:` 前缀之外的自定义分支。
- 汉字展示用 `.hanzi-font`（`--font-serif` = Noto Serif SC）；界面文本 `--font-sans` = Space Grotesk；展示标题 `--font-display` = Playfair Display；等宽 `--font-mono` = JetBrains Mono。
- 完整色板、间距、圆角、动效与无障碍规范见 [07-design-prototype.md](07-design-prototype.md)。

## 9. 国际化（i18n）

- 用户可见文本**一律**经 `useTranslation()` 的 `t()` 渲染，禁止硬编码中文/英文文案。
- 翻译文件：`src/lib/i18n/translations/{en,zh-CN,zh-TW,es,ar,fr,pt-BR,de,ja,ko,ru}.ts`，共 11 种语言。
- `src/lib/i18n/index.ts` 导出 `translations` / `locales` / `Locale` / `TranslationKey`；`t(key, vars?)` 的 key 受 `TranslationKey` 点分联合类型约束，插值用 `{{name}}`。
- 新增或修改翻译键必须**同步 11 个语言文件**；`src/lib/__tests__/i18n.test.ts` 校验 11 语言叶子键与 `en` 完全一致，缺键即失败。
- `footer.copyright` 使用 `{{versionLabel}}` 占位符，由 `layout-client.tsx` 用 `VERSION_LABEL` 插值；**不得**把版本号写进翻译文件。
- 存储读写统一走 `src/lib/storage.ts` 的 `safeGetItem` / `safeSetItem`（`window.localStorage`），业务代码不直接访问 `localStorage`。

## 10. 文件规模与拆分

- 单个源码文件 **≤ 200 行**（含空行与注释）。超限按职责拆分：UI 子组件 → `parts.tsx`、纯函数/校验器 → `*-utils.ts`、常量与类型 → `constants.ts` / `types.ts`、样式 → `src/app/styles/`。
- 拆分不得改变外部行为与导出契约；`prototype/` 的 HTML 骨架、CSS 与 JS 同样受 200 行约束。
- 门禁：`pnpm check:lines`（`scripts/check-line-count.mjs`，扫描 `src/`、`prototype/scripts/`、`prototype/styles/`，结果写 `reports/line-count.txt`，超限退出码 1）。

## 11. 质量门禁（提交前必跑）

| 门禁 | 标准命令 | 通过条件 |
|------|---------|---------|
| 类型检查 | `pnpm exec tsc --noEmit` | 0 error |
| Lint | `pnpm lint` | 0 error / 0 warning |
| 单测 | `pnpm test` | 全部通过 |
| 行数 | `pnpm check:lines` | `all <= 200` |
| 根目录清洁度 | `pnpm check:root` | 根目录条目全部命中白名单（临时脚本/产物禁止落仓库根） |
| 格式化 | `pnpm format` | 按 `.prettierrc.json` 无遗留 diff |
| 安全审计 | `pnpm security:audit` | 生产依赖 0 高危 |
| 构建 | `pnpm build` | 构建成功 |

> 本机 pnpm v10+ 的 `pnpm exec` / `pnpm test` 可能因 `ERR_PNPM_IGNORED_BUILDS` 被 deps 状态检查阻断。此时用 Node 直跑等价命令：`node node_modules/typescript/bin/tsc --noEmit`、`node node_modules/vitest/vitest.mjs run`、`node node_modules/eslint/bin/eslint.js src`、`node scripts/check-line-count.mjs`。测试与覆盖率细节见 [06-testing.md](06-testing.md)。

## 12. 相关文档

- [文档中心与术语约定](index.md)
- [开发指南：环境与命令](03-development.md)
- [Git 工作流、分支与代码审查](git-workflow.md)
- [提交信息规范](commit-template.md)
- [测试规范](06-testing.md)
- [设计系统规范](07-design-prototype.md)
