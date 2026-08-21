# Changelog

## [5.2.16] - 完善 Community Health Files
### Docs / Chore
- 在 `.github/` 新增仓库治理与社区健康文件：行为准则 `CODE_OF_CONDUCT.md`、安全政策 `SECURITY.md`、支持指引 `SUPPORT.md`、赞助配置 `FUNDING.yml`、Issue 模板（`bug_report.yml` / `feature_request.yml` / `config.yml`）、Pull Request 模板 `PULL_REQUEST_TEMPLATE.md`。
- 所有 Health Files 统一遵循 Contributor Covenant v2.1 与项目既有协作规范（Angular 提交规范、SemVer 版本管理、200 行拆分等），未创建 `.github/readme.md` 以避免与根 README 重复。

### Feature / Fix
- `writing-canvas.tsx` 落实 `practice.writingDesc`「clear stroke-order guidance」承诺：全部笔画播放完成后再次点击画布，自动重置并从第一笔重新引导，而非此前画满后点击无反应。
- 笔顺进度标签国际化：底部「笔顺 X / Y」硬编码中文改为 `t('learn.strokeOrder')` + 已完成/总数，消除未走 i18n 的遗留。
- 版本展示位对齐：en.ts `footer.copyright`、README/README_EN 标题、character-detail/stroke-order-demo/writing-dialog 头注释统一至 v5.2.16（此前 en.ts 页脚与部分头注释滞后于真实 HEAD v5.2.16）。

## [5.2.17] - 书写描红准确度反馈
### Feature
- `writing-canvas.tsx` 新增「跟写描红」模式：引导动画播完某一笔后，用户可沿笔形描摹；松手时对该笔做贴合度判定，并累加整体均值回传。
- 新增 `scoreStroke`/`distToSegment`（`writing-canvas-utils.ts`）：基于 `Path2D.isPointInStroke` 容差判定，路径不可用时回退中位线折线距离，零外部依赖。
- `writing-dialog.tsx` 接入 `onAccuracyChange`，练习后展示「书写准确度 X%」（复用 `practice.accuracy` 键，无新增 i18n 键）。

### Chore
- 版本号同步至 v5.2.17：package.json、metadata.json、README/README_EN 标题与页脚、en.ts `footer.copyright`、被改文件头注释。

### Docs / Fix（原型）
- `prototype.html` 头注释版本号 v5.2.12 → v5.2.17，对齐真实 HEAD（此前原型滞后于代码 5 个小版本）。
- 补齐书写弹窗「笔顺引导演示」：点击画布逐笔点亮进度点并叠加当前笔示意轨迹，全部走完后 toast 模拟准确度，使 `practice.write.desc` 的 "stroke-order guidance" 承诺在原型中被演示兑现（真实代码由 `writing-canvas.tsx` 的 `scoreStroke` 实现，原型用轻量演示替代，未内联真实笔顺 path 数据）。
- 已知歧义（非 bug）：规范 `07-design-prototype.md` §4.1 称揭示态类为 `.revealed`，原型实际用 `.is-visible`（CSS 与 JS 一致），文档待统一。

## [5.2.15] - 学习页补实现笔顺展示
### Feature
- 新增 `src/components/learn/stroke-order-demo.tsx`：学习页笔顺演示组件，用 SVG 渲染汉字笔画（复用 `stroke-order-data` 的 Hanzi Writer 标准 path），点击「显示笔顺」逐笔播放书写动画（当前笔高亮朱砂红、已完成笔实线、未写笔浅灰），底部显示笔顺进度圆点，支持清除重置；无数据时回退灰字占位。
- `character-detail.tsx` 笔顺区由静态灰字 + 圆点升级为可交互 `StrokeOrderDemo`，兑现 `learn.strokeOrder`/`showStrokeOrder` 文案承诺。
- 版本号同步至 v5.2.15：package.json、metadata.json、README/README_EN、en.ts 头注释与 `footer.copyright`、本次改动文件头（character-detail、stroke-order-demo）、CHANGELOG 本小节。

## [5.2.14] - 清理冗余文件与冗余代码
### Refactor / Cleanup
- 删除 19 个未使用 shadcn `ui` 组件（accordion/avatar/card/command/dropdown-menu×4/input-group/input/textarea/label/pagination/select/separator/sheet/skeleton/slider/switch），保留实际在用的 button/dialog/tooltip/badge。
- 删除零引用死代码：`src/hooks/use-is-dark.ts`、`src/components/empty-state.tsx`。
- 移除冗余依赖：`hanzi-writer-data`（数据已内联至 stroke-order-data.ts，无实际 import）、`cmdk`（仅被未使用的 command.tsx 引用）、`eslint-plugin-react`、`globals`（eslint.config.js 未使用）。
- 设计产物移入 `prototype/`：`prototypes/character-detail.html` → `prototype/character-detail.html`；`docs/` 三份归档报告（OPTIMIZATION_SUMMARY/PROJECT_STRUCTURE/UI_UX_REVIEW）移入 `prototype/`，更新 PROJECT_STRUCTURE 目录树与引用。
- 同步版本号至 v5.2.14：package.json、metadata.json、README/README_EN、en.ts 头注释与 `footer.copyright`、本次改动文件头（character-detail、PROJECT_STRUCTURE）、CHANGELOG 本小节。

## [5.2.13] - 书写练习补实现笔顺引导动画
### Feature
- 引入 `hanzi-writer-data`（npm 本地包，构建时打包、离线可用），内联 12 个练习汉字（一/二/三/人/大/小/口/日/月/山/水/火）的标准笔画 SVG path 与中位线数据至 `src/lib/stroke-order-data.ts`。
- `WritingCanvas` 补实现"clear stroke-order guidance"：提供笔顺数据时，点击画布逐笔播放书写动画（沿中位线朱砂红描线，已完成笔浅色虚线轮廓），底部显示笔顺进度；无数据时回退原有淡字底图 + 自由书写。
- `WritingDialog` 从 `stroke-order-data` 查询当前字符笔画数据传入画布，兑现 `practice.writingDesc` 文案承诺。
- `character-types.ts` 新增 `StrokeOrderData` 接口。
- 拆分：`writing-canvas.tsx` 绘制工具函数抽离至新文件 `writing-canvas-utils.ts`（scale/parsePath/drawHint/drawMedianStroke/resolve 函数），主文件由 254 行降至约 167 行，符合单文件 ≤200 行规则。
- 同步版本号至 v5.2.13：package.json（新增 hanzi-writer-data 依赖 + version）、metadata.json、README/README_EN、en.ts 头注释与 `footer.copyright`、本次改动文件头（character-types、writing-canvas、writing-dialog）、CHANGELOG 本小节。

## [5.2.12] - 高保真原型打磨（prototype.html）
### Design / Prototype
- 修复 `src/components/mobile-nav.tsx` 移动抽屉硬编码版本 `HanziMaster v5.2.1` → `v5.2.12`，文件头注释 `v5.2.6` → `v5.2.12`，消除与全局版本（en.ts/package.json/metadata.json/README/README_EN）脱节。
- 暗色模式宣纸噪点纹理修复：原 `#2d2d2d`@0.4+soft-light 在近黑背景不可见，改为 `#ffffff`@0.06+overlay 混合，暗色下恢复宣纸质感。
- 导航 active 态补齐规范要求的「底部圆点」：`nav-links a.active::after` 增加真实样式（5px 朱砂红圆点），`.nav-links a` 加 `position:relative` 与底部 padding。
- 滚动揭示动画落地：新增 `.reveal`/`.is-visible` 类，IntersectionObserver 对 `.feature`/`.section-head`/`.stat`/`.progress-card` 生效（原 observer 仅设 style 未 observe，规范 §4.1 长期未实现）。
- 书写练习文案对齐：详情页/卡片 `practice.write.desc` 由 "real-time feedback" 降级为 "stroke-order guidance"，消除原型虚假承诺（grill-me 决策：不引入外部笔顺库）。
- 周进度「今日」态语义修正：今天(index4)改为未完成 pending + ring 高亮，不再既 done 又 today 造成混淆。
- 写画布弹窗新增关闭按钮 `#writeClose`（与 quizModal 对称），删除 JS 死代码防御性绑定。
- 语言菜单诚实化处理：保留 en/zh-CN/ja/es 完整翻译子集并加注释，避免「列出 11 种却 7 种回退英文」的虚假完整性。
- badge 对比度提升：`--muted-foreground` → `--foreground`，满足 WCAG AA 小字阈值。
- 同步版本号至 v5.2.12：package.json、metadata.json、README/README_EN、en.ts 头注释与 `footer.copyright`、prototype.html 头注、CHANGELOG 本小节。

## [5.2.11] - 代码审查问题修复与规范对齐
### Code Quality
- `prototypes/character-detail.html` 修正：`<html lang>` 由 en 改为 zh-CN；三处渲染函数重复的 `id="char-study-card"` 改为语义化唯一 id（`-scroll`/`-flashcard`/`-atelier`）；内联色值 `#fff` 替换为 `--primary-foreground` token；移除未使用的 `--indigo-*` 色阶（globals.css 单一来源中无此 token）。
- 补全 `openspec/02-architecture.md`、`openspec/05-deployment.md` 缺失的文档版本戳，使 `alignment-checklist.md` 快照表 §13.1 的 v5.2.11 标注与实际文件一致（原两文件无版本戳，快照表表述失实）。
- 同步版本号至 v5.2.11：package.json、metadata.json、README/README_EN、11 语言 i18n `footer.copyright` 与头注释、openspec 各文档版本戳、CHANGELOG 新增小节。

## [5.2.10] - 文档规范审查与一致性修复
### Documentation
- 统一全部 openspec 文档版本戳至 v5.2.10：index.md、01-overview.md、06-testing.md、ui-ux-review-report.md、03-development.md、coding-standards.md、alignment-checklist.md（含内部快照表 §8/§11/§13 同步）。
- `prototype/prototype.html` 头注同步至 v5.2.10；`prototypes/character-detail.html` 原为 v5.2.10（超前），本次统一后恰好对齐。
- 修正 `openspec/03-development.md` §3.6 与 `04-api-reference.md` §7.3 的设计令牌：主色 `#c0392b → #c53d43`、辅助色 `#3f51b5 → #4f46e5`、primary-dark/foreground 对齐 globals.css。
- 补全 `openspec/project.md`（原为空白占位模板）为实际项目上下文；精简 `openspec/AGENTS.md` 为项目实际协作约定（本仓库未接入 openspec CLI）。
- `README/README_EN` 移除死代码引用 `use-quiz`（v5.2.1 已删除）；`docs/PROJECT_STRUCTURE.md` 修复 `prototype.html` 断链（指向 `prototype/prototype.html`）。
- `docs/OPTIMIZATION_SUMMARY.md` 标注历史归档，更新已解决的「剩余问题」结论。
- 同步版本号至 v5.2.10：package.json、metadata.json、README/README_EN、11 语言 i18n `footer.copyright` 与头注释。

## [5.2.9] - 代码清理与规范对齐
### Code Quality
- 删除零引用的死代码组件 `src/components/ui/tabs.tsx`（`Tabs`/`TabsList`/`TabsTrigger`/`TabsContent` 全项目无任何消费方）。
- 移除 `package.json` 中未使用的死依赖 `@google/generative-ai`，与「应用无 AI 后端」事实及 openspec 规范保持一致。
- 修复 `src/components/practice/writing-canvas.tsx` 画布 `aria-label` 汉字重复的可用性问题（`${character} ${character} 书写练习画布` → `${character} 书写练习画布`）。
- `src/components/layout-client.tsx` 的 `header`/`footer` 补充语义化 id（`site-header`/`site-footer`），便于调试定位与可访问性锚点。
- 同步版本号至 v5.2.9：package.json、metadata.json、README/README_EN、11 语言 i18n `footer.copyright`，以及本次实际改动文件头（practice/page、writing-canvas、layout-client、en.ts）。未改动文件头注释按规则保持不变。

## [5.2.8] - GA 仅生产环境上报
### Feature
- `src/components/google-analytics.tsx` 新增 `ENABLE_ANALYTICS` 开关：`process.env.NODE_ENV === 'production'` 时才注入 gtag.js，开发/预览/构建期不再向 GA 发送数据，避免污染统计。
- 全站版本号统一至 v5.2.8（package.json、metadata.json）。

## [5.2.7] - 接入 Google Analytics（G-TZG68T8J31）
### Feature
- 新增 `src/components/google-analytics.tsx`，通过 `next/script` 在 `<head>` 注入 gtag.js 并初始化衡量 ID `G-TZG68T8J31`。
- `src/app/layout.tsx` 在 `<head>` 渲染 `GoogleAnalytics` 组件，全局收集页面访问数据。
- `next.config.mjs` CSP 放行 `googletagmanager.com` / `google-analytics.com` 的 script 与 connect 来源，确保严格 CSP 下脚本可加载。
- 全站版本号统一至 v5.2.7（package.json、metadata.json）。

## [5.2.6] - 适配腾讯云 EdgeOne Pages（Node 24.11.0）
### Chore
- 新增 `edgeone.json` 声明 EO Pages 部署配置（框架 nextjs、构建命令、Node 24.11.0 运行时、静态资源长缓存头），替代 Vercel 专用的 `vercel.json` 缓存策略。
- `.nvmrc` 精确匹配 EO Pages 运行时：`24.5.0` → `24.11.0`，避免本地/CI 与部署运行时版本漂移。
- `package.json` `engines.node` 收紧至 `>=24.11.0`，与 EO Pages 运行时对齐。
- 全站版本号统一至 v5.2.6。

## [5.2.5] - 编译修复与规范对齐
### Bug Fixes
- 修复 11 个 i18n 翻译文件 `writingDesc` 行尾缺失逗号导致的 TS1005 编译失败（含 fr.ts 未转义单引号 `l'écriture`）；项目此前完全无法编译构建。
- `src/app/layout.tsx` metadata 移除失实的 "AI-Powered" 标题与 'AI' keyword，改为真实功能描述（笔顺练习、自适应测验）。
- `next.config.mjs` 生产 CSP `connect-src` 移除残留的 `generativelanguage.googleapis.com` 白名单。

### Code Quality
- `src/lib/storage.ts` 移除 `console.warn`，localStorage 写入异常改为静默失败以符合编码规范（无 console.*）。
- 为关键 DOM 容器补充语义化 id（home-page/hero-section/features-section/learn-page/practice-page/character-grid/character-detail/writing-canvas/weekly-progress/practice-options/stats-card/quiz-dialog/theme-toggle/locale-toggle/mobile-nav/toast-container），便于调试定位与可访问性。
- 全站版本号统一至 v5.2.5（package.json、metadata.json、README/README_EN、openspec 文档头注释、源文件头注释）。

## [5.2.4] - 规范与代码一致性审查修复
### Documentation
- 同步全部版本呈现位至 v5.2.4：package.json、metadata.json、README/README_EN 标题与页脚、prototype.html 头注、openspec 文档版本戳（01-overview/index/03/04/06/alignment-checklist/coding-standards/ui-ux-review-report）。
- `openspec/04-api-reference.md` 修复严重脱节：主题色由过时 emerald `#10b981` 更正为朱砂红 `--primary #c0392b` / 靛蓝 `--accent #3f51b5`；字体表补 `--font-display`(Playfair Display)/`--font-heading`；暗色模式由 `dark:` 前缀更正为 `.dark` 类；CSS 变量名 `--primary` 对齐 globals.css；翻译对象结构 §1.5 对齐代码实际键（home/practice 节点）；NavLink 活跃高亮色由绿色更正为朱砂红。
- `openspec/06-testing.md` 修正误导：明确项目当前尚未接入自动化测试框架（无 jest 依赖、无 test 脚本），补充 §10 测试基础设施接入蓝图，避免开发者误跑 `npm test`。
- `openspec/03-development.md` 暗色模式规范对齐 `.dark` 类方案并补充设计令牌；版本同步位置清单补全 metadata/README/prototype/展示位。
- `openspec/alignment-checklist.md` 头版本同步，保留历史快照表。

### Code Quality
- `src/app/learn/page.tsx` Tailwind 4 规范：`:bg-gradient-to-b` → `bg-linear-to-b`。
- `src/app/page.tsx` 头注释版本戳同步至 v5.2.4。

## [5.2.3] - 下架 AI 虚假声明与健壮性修正
### Bug Fixes
- 下架全站「AI 驱动 / Gemini 实时反馈」虚假声明：README/README_EN、metadata.json keywords、11 语言 i18n 文案、proxy.ts 生产 CSP 的 Gemini 域名白名单，均改为与代码行为一致的真实功能描述（笔顺指引、结构提示、引导式练习）。
- 移除 `.env.example` 的 `GEMINI_API_KEY` 模板与 README「配置 AI」段落。

### Code Quality
- `src/app/learn/page.tsx` 移除内联 `speak` 实现，统一使用 `usePronunciation` hook。
- `src/hooks/use-progress.ts` 新增 `validateProgress` 运行时 schema 校验，过滤被篡改/旧版 localStorage 数据导致的非法字段。
- `src/components/practice/writing-canvas.tsx` 画布补充 `role="img"` 与动态 `aria-label`，改善无障碍。
- 删除 3 份基于旧架构（Next.js 15 / `next.config.js` / `responsecsp` 等）的失实安全审查报告；`code-review-report.md` 追加第三轮审查结论。

## [5.2.2] - 文档完善与一致性修正
### Documentation
- 中英文 README 结构对齐：中文补全「环境要求表格」「环境变量表格」「生产构建」「项目结构」「开发指南」章节；英文 Features/Core Pages 与实际功能对齐（移除偏离的 Adaptive Learning / Etymology & Culture 描述）。
- 新增 `CONTRIBUTING.md` 与 `CONTRIBUTING_EN.md` 贡献指南（开发环境、工作流、提交规范、版本管理、代码规范摘要）。
- 更新 `docs/PROJECT_STRUCTURE.md` 目录树：修正路径前缀、补全 `src/hooks`、`src/proxy.ts`、`components/learn|practice|ui` 子目录，原型位置改为 `prototype/`，同步文件统计与日期。
- 修正 `openspec/03-development.md` Node.js 版本要求 `>= 20.11.0` → `>= 24.5.0`，与 package.json / .nvmrc 一致。

### Docs & Versioning
- 同步 package.json、metadata.json 至 v5.2.2；README/README_EN 版本戳更新至 v5.2.2。

## [5.2.1] - i18n 类型安全与死代码清理
### Bug Fixes
- 修复 `practice/writing-dialog.tsx` 使用不存在的 i18n 键 `practice.writeTitle` / `practice.writeDesc`（应为 `practice.writingTitle` / `practice.writingDesc`），此前会渲染原始键名而非译文。

### Internationalization
- 为 `t()` 引入 `TranslationKey` 点分键联合类型（递归生成 `en.ts` 全部叶子键路径），约束 `locale-provider` 及所有键转发组件（feature-card/empty-state/stats-card/practice-assets/character-types/mobile-nav），在编译期拦截错误键名，防止回归。

### Code Quality
- 删除未引用的死代码 `hooks/use-quiz.ts`（其逻辑已在 learn/practice 页面内联实现）。
- 移除 `lib/storage.ts` 中未被使用的 `safeRemoveItem`。

### Docs & Versioning
- 同步全部文件头、package.json、metadata.json、README、README_EN、openspec 至 v5.2.1。

## [5.2.0] - Functional Completeness & Robustness
### Bug Fixes
- 修复 `learn/page.tsx` 答对后自动关闭弹窗的 `setTimeout` 未清理问题：用户提前关闭或路由切换后定时器仍触发，导致操作已卸载组件/关闭错误弹窗。改用 `useRef` 持有句柄并在关闭与卸载时清理。

### Functional Completeness
- 接通 `useProgress` 进度系统：书写练习调用 `markLearned`、拼音测验调用 `recordQuizResult`，结果持久化至 localStorage。
- `weekly-progress.tsx` 改为接收真实进度数据（已学字数/连胜/准确率/周活动），移除硬编码假数据，周网格按真实活动显示勾选并对今日高亮。

### Consistency
- 还原 3 处 `rounded-4xl`（按设计原型 §2.4/§8.4 合法，32px 大卡片圆角）以对齐原型规范（此前误改为 rounded-3xl）。
- 精简 `use-progress.ts` 未使用导出（`isLearned`/`getLearnedCharacters`/`learnedCharacterIds`）。

### Internationalization
- 校验 11 种语言翻译键与 `en.ts` 完全对齐（166 个键，无缺失/多余）。

### Docs & Versioning
- 同步全部文件头、package.json、metadata.json、README、README_EN 至 v5.2.1。
- 更新 README 说明进度系统已接通。

## [5.1.0] - Code Review & Robustness Hardening
### Code Review & Cleanup
- 删除未被引用且与原型规范偏离（米字格网格）的死代码 `hooks/use-canvas.ts`。
- 将 `components/practice/writing-dialog.tsx`（201 行）拆分为 `writing-canvas.tsx` 子模块，消除超 200 行文件。
- `writing-canvas.tsx` 改用指针事件（Pointer Events）+ `touch-none`，统一鼠标/触控/触控笔输入，避免绘制时页面滚动。

### Robustness
- `hooks/use-progress.ts` 的连胜、周活动与今日标记改用本地时区日期，修复 UTC 偏移导致的跨零点判定错误。

### Consistency
- 同步全部文件头、package.json、metadata.json、README 与 openspec 版本戳至 v5.1.0。
- 更新 README/README_EN 项目结构说明，对齐实际模块化架构。

## [5.0.0] - 东方水墨·朱砂红 Design System & Architecture Alignment
### Design System
- Replaced Apple-HIG-inspired theme with 东方水墨·朱砂红 design system (ink/vermilion/indigo color scales).
- Adopted fonts: Space Grotesk (sans), Playfair Display (display), Noto Serif SC (serif), JetBrains Mono (mono).
- Removed all hardcoded color values; single source of truth via Tailwind CSS `@theme` tokens.
- Eliminated arbitrary radius (`rounded-[Npx]`) and `transition-all` usages across UI components.

### Internationalization
- Audited all 11 language translation files; keys are mutually consistent.
- Added missing translation keys (common/location/learn/practice) used by the code.
- Fixed quiz result labels to use existing `practice.correct` / `practice.wrong` keys.

### Architecture & Modularization
- Split all source files exceeding 200 lines into focused modules:
  - `lib/characters.ts` → `character-types.ts` + `characters-part1.ts` + `characters-part2.ts`.
  - `app/learn/page.tsx` → `learn/character-grid.tsx` + `character-detail.tsx` + `quiz-dialog.tsx`.
  - `app/practice/page.tsx` → `practice/*` (options / weekly-progress / writing-dialog / quiz-dialog / assets).
  - `components/ui/dropdown-menu.tsx` → `dropdown-menu-core/items/sub` + barrel.
- Extracted scroll-reveal logic into `hooks/use-scroll-reveal.ts`.

### Quality & Consistency
- Synced all file header versions to v5.0.0.
- Synced package.json, metadata.json versions to 5.0.0.
- Updated README/README_EN to reflect current design system, fonts, and Next.js 16 stack.

### Prototype & Spec Best-Practice Alignment
- `prototype/prototype.html`: removed all hardcoded component colors (`#fff` / scrim `rgba`) → design tokens (`--primary-foreground` / `--scrim`); derived `--primary-dark` from `--primary` via `color-mix` (single source).
- `prototype/prototype.html`: button radius aligned to spec token `--radius-md` (was pill `999px`).
- `prototype/prototype.html`: Canvas writing now reads `--foreground` token instead of hardcoded hex; removed dead code in `goView`.
- `prototype/prototype.html`: added `--font-heading` / `--scrim` tokens; skip-link now translated via `common.skipToContent` (en/zh-CN/ja/es).
- `openspec/01-overview.md`: bumped to v5.0.0; corrected Apple-HIG → 东方水墨·朱砂红, Next.js 15 → 16, fonts Inter/Noto Sans SC → Space Grotesk/Playfair Display/Noto Serif SC/JetBrains Mono.
- `openspec/02-architecture.md`: Next.js 15 → 16.
- `openspec/04-api-reference.md`: font table `--font-sans` Inter → Space Grotesk; `--font-hanzi` Noto Sans SC → `--font-serif` Noto Serif SC.
- `openspec/index.md`: UI prototype description Apple 风格 v4.0 → 东方水墨·朱砂红 v5.0; doc version v3.0.0 → v5.0.0.
- `openspec/alignment-checklist.md`: fixed stale v3.0.0 version stamps (package.json, 01/02/04/index) → v5.0.0.

### Source Code Token & Best-Practice Audit
- `src/app/globals.css`: `.skip-to-content` hardcoded `white`/`8px` → `var(--color-primary-foreground)` / `var(--radius-md)`; `.glass` hardcoded `rgba(255,255,255,0.85)` / `rgba(13,13,13,0.85)` → `color-mix(in srgb, var(--color-card|--color-background) …)` (single source).
- `src/components/practice/writing-dialog.tsx`: Canvas hint now reads `--color-foreground` / `--font-serif` tokens instead of hardcoded `#1a1a1a` / `rgba(26,26,26,0.08)` / `serif`.
- `src/hooks/use-canvas.ts`: replaced the entire hardcoded `canvasColors` palette with `readCanvasColors()` that resolves from design tokens at runtime (bg/foreground/border via `color-mix`), theme-aware, no hardcoded hex/rgba.
- Tokenized all hardcoded surface colors: `bg-white`/`bg-white/N` → `bg-card`/`bg-card/N` across page, cards, dialogs, sheet, select, dropdown, input, and practice/learn components.
- Tokenized all hardcoded text-on-brand colors: `text-white` → `text-primary-foreground` on vermilion buttons/badges/seals; `bg-red-500` + `text-white` → `bg-destructive` + `text-destructive-foreground` (quiz/button/badge/input invalid state); `bg-black/10` scrims → `bg-ink-900/10`; toast hover `bg-black/5`/`bg-white/10` → `bg-ink-900/5`/`bg-ink-100/10`; tooltip `text-white` → `text-ink-50`.
- `src/components/ui/slider.tsx` thumb `bg-white` intentionally retained (always-light control thumb; documented exception).

## [2.2.1] - UI/UX Professional Review & Optimization (Complete)
### Theme System
- Added 3-state theme toggle: light → dark → system (previously lost system mode after manual toggle)
- Added hover tooltip showing current theme mode

### Accessibility
- Locale dropdown: added `aria-expanded`, `aria-haspopup`, `role="listbox"`, `role="option"`, `aria-selected`
- Locale dropdown: added keyboard navigation (Arrow keys, Escape to close)
- Locale dropdown: added `max-h-[70vh]` scroll for overflow on small screens
- Mobile drawer: removed duplicate theme/locale toggles (already in header)
- Mobile drawer: removed non-functional "Sign In" button

### Visual & Layout
- Fixed Home page CTA buttons: "Start Learning" → `/learn`, "Explore Library" → `/practice` (previously both `/learn`)
- Status badge text changed to "AI-Powered Learning" (was misusing heroTitle translation)
- Hero heading: reduced max font size from `text-7xl` to `text-6xl` for better proportion
- Mobile nav: removed emoji icons (🏠📖✏️) for professional consistency
- Practice page: unified responsive padding to `px-4 sm:px-6` (was fixed `px-6`)
- Practice page: added `sm:grid-cols-2` breakpoint for tablet optimization
- Weekly progress grid: responsive sizing with `gap-1 sm:gap-3 lg:gap-4`
- Weekly progress day cells: `minHeight: 72` for touch-friendly tapping
- Practice cards: added `active:scale-[0.98]` press feedback
- Stats cards: consistent responsive sizing (`text-3xl sm:text-4xl`)

### Interaction
- Learn page: re-clicking selected character no longer de-selects (was confusing UX)
- Learn page: added `grid-cols-2 xs:grid-cols-3` for very small screens
- Added `key={pathname}` to `<main>` for page transition animation via `animate-fade-in-up`

### Performance
- Added `font-display: swap` CSS declarations for Inter and Noto Sans SC fonts
- Added `will-change: background-position` to skeleton loading animation
- Created `container-page` utility class for consistent page containers
- Footer: removed dead "About" and "Contact" `#` links
- Desktop header: removed non-functional "Sign In" button
- Dark mode: improved footer divider contrast (`border-slate-600/60`)
- Dark mode: focus ring uses brighter `#34d399` emerald tint

### Code Quality
- Removed `as any` type assertion from locale-toggle (proper `Locale` type import)
- Updated version string to v2.2.1 throughout

### Learn Page
- Added character grid loading skeleton with shimmer animation (12 placeholder cards)
- Skeleton uses `role="status"` and `sr-only` for accessibility

### Practice Page
- Fixed re-clicking selected mode no longer de-selects (anti-pattern fix)
- Added selected card background fill and subtle ring for better visual feedback
- Card backgrounds change to tinted color when selected (emerald/blue/purple)

### Documentation
- Added `UI_UX_REVIEW.md` - comprehensive professional UI/UX audit report

### Bug Fixes (Round 3 - Final)
- Fixed `@tailwindcss/vite` → `@tailwindcss/postcss` (Vite plugin incompatible with Next.js)
- Fixed deprecated `images.domains` → `images.remotePatterns` in next.config.js
- Synced all file header versions to v2.2.1 (11 source files + 11 translation files)
- Synced package.json version to 2.2.1
- Fixed all translation footer copyright versions to v2.2.1

### Code Quality (Round 3)
- Removed `any` type from `getNestedValue()` → typed as `Translations`
- Removed `any` type from `getIcon()` → typed as `Record<string, string>`
- Removed dead `common.signIn` translation key from all 11 language files
- Added `common.theme.*` translations (light/dark/system) for all 11 languages
- Theme toggle tooltip now uses i18n translation instead of hardcoded English

### Learn Page
- Removed 300ms fake loading simulation (was decorative, no real data fetching)
- Page now renders instantly with character grid

## [2.2.0]
- Added complete i18n internationalization support with 11 languages: English, Simplified Chinese, Traditional Chinese, Spanish, Arabic, French, Portuguese (Brazil), German, Japanese, Korean, and Russian.
- Created I18nService with automatic browser language detection and localStorage persistence.
- Added LocaleToggle component for language switching.
- Updated all components (App, Home, Learn) to use i18n translations.
- Fixed vite.config.ts with proper version header and path alias.
- Fixed angular.json test configuration with correct styles path.
- Created missing tsconfig.spec.json file.
- Updated all file headers with v2.2.0.
- Updated metadata.json, package.json, and README files.
- Updated CHANGELOG.md with v2.2.0 release notes.

## [2.1.4]
- Fixed CSS comment format (changed from /* */ to // style).
- Added proper file headers to all configuration files (tsconfig, index.html).
- Updated Tailwind theme configuration with --font-hanzi variable.
- Updated .hanzi-font class to use CSS variable.
- Added OpenSpec documentation for project standards.
- Fixed duplicate header in tsconfig.json.
- Updated all version references (v2.1.3 → v2.1.4).

## [2.1.3]
- Added file header comments to all source files with versioning.
- Implemented localStorage theme persistence for dark/light mode.
- Added Noto Sans SC font for better Chinese character display.
- Improved dark mode support across all components (home, learn, app).
- Enhanced Learn page with character selection and detail panel.
- Added proper TypeScript interfaces and function comments.
- Added provideAnimations to app configuration.
- Fixed footer dark mode styling.
- Updated all version references (v2.1.2 → v2.1.3).

## [2.1.2]
- Re-initialized project as a modern Angular 21 application.
- Implemented zoneless change detection for better performance.
- Integrated Tailwind CSS 4.0.0 for styling.
- Added Material Icons for iconography.
- Created responsive hero section with AI-powered learning theme.
- Configured environment variables and global type declarations.
