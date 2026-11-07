# 设计规范与原型

> 文档版本：v5.2.43（与项目版本同步，权威版本见 `package.json`）

本文是设计系统的权威说明。编码层面的 token 使用约束见 [coding-standards.md](coding-standards.md) §8；原型交付侧细化规范见 `prototype/DESIGN_SPEC.md`。文中组件清单以 `src/components/` 实际文件为准。

## 1. 设计概述

### 1.1 设计理念

- **东方水墨美学**：融合中国传统书法艺术与现代极简设计
- **克制用色**：以水墨灰为主，朱砂红作为唯一强调色，靛蓝作为辅助色
- **呼吸感**：大量留白，元素间距遵循 8px 网格系统
- **一致性**：所有组件遵循统一的设计语言，token 单一来源（`@theme` 语义 token + `styles/theme-colors.css` 扩展色阶，见 §8.1），不引入硬编码色值

### 1.2 技术架构

- **CSS 变量系统**：`globals.css` 的 `@theme` 块定义语义 token（`--color-*` / 字体 / 圆角）
- **Tailwind v4**：`@theme` 自动生成全部语义与色阶工具类（扩展色阶与阴影在 `styles/theme-colors.css`，动画工具类在 `styles/utilities.css`）
- **shadcn/ui**：当前 4 个基础原语（`button` / `badge` / `dialog` / `tooltip`）已改造为 ink/vermilion 设计语言
- **深色模式**：通过 `.dark` 类切换 CSS 变量，覆盖所有语义色 token

## 2. 设计系统

### 2.1 色彩系统

#### 2.1.1 语义化 Token（globals.css @theme）

| Token | 浅色模式 | 深色模式 | 用途 |
|-------|----------|----------|------|
| `--color-background` | `#faf9f6` | `#0d0d0d` | 页面背景 |
| `--color-foreground` | `#1a1a1a` | `#f3f1eb` | 主文本 |
| `--color-primary` | `#c53d43` | `#c53d43` | 品牌朱砂红 |
| `--color-primary-foreground` | `#ffffff` | `#ffffff` | 品牌色上的文字 |
| `--color-secondary` | `#f3f1eb` | `#2d2d2d` | 次要背景 |
| `--color-secondary-foreground` | `#1a1a1a` | `#f3f1eb` | 次要背景上的文字 |
| `--color-muted` | `#f3f1eb` | `#1a1a1a` | 静默背景 |
| `--color-muted-foreground` | `#6b6356` | `#a69c89` | 静默文字 |
| `--color-card` | `#ffffff` | `#1a1a1a` | 卡片背景 |
| `--color-card-foreground` | `#1a1a1a` | `#f3f1eb` | 卡片文字 |
| `--color-popover` | `#ffffff` | `#1a1a1a` | 弹出层背景 |
| `--color-popover-foreground` | `#1a1a1a` | `#f3f1eb` | 弹出层文字 |
| `--color-accent` | `#4f46e5` | `#6366f1` | 辅助色靛蓝 |
| `--color-accent-foreground` | `#ffffff` | `#ffffff` | 辅助色上的文字 |
| `--color-destructive` | `#ef4444` | `#f87171` | 危险/错误色 |
| `--color-destructive-foreground` | `#ffffff` | `#ffffff` | 危险色上的文字 |
| `--color-border` | `#e5e1d8` | `#2d2d2d` | 边框 |
| `--color-input` | `#e5e1d8` | `#2d2d2d` | 输入框边框 |
| `--color-ring` | `#c53d43` | `#c53d43` | 焦点环 |
| `--color-success` | `#34c759` | `#34c759` | 成功状态 |
| `--color-warning` | `#f59e0b` | `#f59e0b` | 警告状态 |
| `--color-info` | `#3b82f6` | `#3b82f6` | 信息状态 |

#### 2.1.2 扩展色阶（styles/theme-colors.css）

**水墨灰 ink**（11 阶）：50 `#faf9f6` → 950 `#0d0d0d`
**朱砂红 vermilion**（9 阶）：50 `#fef2f2` → 900 `#5a2525`，主色 500 `#c53d43`
**靛蓝 indigo**（10 阶）：50 `#eef2ff` → 900 `#1e1b4b`，主色 500 `#4f46e5`
**状态色**：success / warning / info 各 4 阶（50/100/500/600）

### 2.2 字体系统

| Token | 字体 | 用途 |
|-------|------|------|
| `--font-display` | Playfair Display | 展示标题（英文） |
| `--font-heading` | Playfair Display | 组件标题（等同 display） |
| `--font-serif` | Noto Serif SC | 汉字展示 |
| `--font-sans` | Space Grotesk | 界面文本（正文） |
| `--font-mono` | JetBrains Mono | 代码字体 |

工具类：`.display-font`、`.serif-font`

### 2.3 间距系统

遵循 8px 网格，使用 Tailwind 默认间距值（1=4px, 2=8px, 4=16px, 6=24px, 8=32px...）。

| 语义 | Tailwind 值 | 像素 |
|------|------------|------|
| xs | 1 | 4px |
| sm | 2 | 8px |
| md | 4 | 16px |
| lg | 6 | 24px |
| xl | 8 | 32px |
| 2xl | 12 | 48px |
| 3xl | 16 | 64px |
| 4xl | 20 | 80px |
| 5xl | 30 | 120px |

### 2.4 圆角系统

| Token | 值 | 用途 |
|-------|-----|------|
| `--radius-sm` | 0.5rem (8px) | 小标签 |
| `--radius-md` | 0.75rem (12px) | 按钮 |
| `--radius-lg` | 1rem (16px) | 卡片 |
| `--radius-xl` | 1.25rem (20px) | 大卡片 |
| `--radius-2xl` | 1.5rem (24px) | 下拉/选择菜单（Select、DropdownMenu 内容） |
| `--radius-3xl` | 1.75rem (28px) | 弹窗（Dialog、Sheet） |
| `--radius-4xl` | 2rem (32px) | Hero 卡片 |

### 2.5 阴影系统

| Token | 值 | 用途 |
|-------|-----|------|
| `shadow-ink` | `0 4px 20px rgba(26,26,26,0.08)` | 卡片默认 |
| `shadow-ink-lg` | `0 8px 40px rgba(26,26,26,0.12)` | 卡片悬停 |
| `shadow-ink-xl` | `0 12px 60px rgba(26,26,26,0.16)` | 弹窗 |
| `shadow-vermilion-glow` | `0 0 30px rgba(197,61,67,0.2)` | 选中状态 |

### 2.6 动效系统

#### 2.6.1 时长与缓动

| Token | 值 |
|-------|-----|
| `--duration-fast` | 0.15s |
| `--duration-normal` | 0.25s |
| `--duration-slow` | 0.4s |
| `--duration-lg` | 0.6s |
| `--ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` |
| `--ease-spring` | `cubic-bezier(0.175, 0.885, 0.32, 1.275)` |
| `--ease-smooth` | `cubic-bezier(0.4, 0, 0.2, 1)` |

#### 2.6.2 预设动画

| 动画名 | 效果 | 使用场景 |
|--------|------|---------|
| `brush-stroke` | 毛笔笔触（clipPath 揭示） | 汉字展示 |
| `ink-spread` | 墨水扩散（scale+blur） | 元素入场 |
| `paper-flip` | 纸张翻转（rotateY） | 卡片切换 |
| `fade-in-elegant` | 优雅淡入（translateY+blur） | 页面加载 |
| `float-gentle` | 轻柔浮动（6s 循环） | 背景装饰 |
| `slide-in-right` | 右侧滑入 | Toast 通知 |
| `accordion-down/up` | 高度展开/收起 | 手风琴 |

工具类：`.animate-brush-stroke`、`.animate-fade-in-elegant`、`.animate-slide-in-right` 等

#### 2.6.3 无障碍

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 2.7 纸张纹理

页面背景使用 SVG 噪点纹理，`background-blend-mode: soft-light` 营造宣纸质感。

## 3. 组件库规范

### 3.1 基础原语（实际存在）

`src/components/ui/` 当前只有 4 个基础原语，均基于 shadcn/ui（radix-nova preset）改造：

| 组件 | 文件 | 关键样式 |
|------|------|---------|
| **Button** | `ui/button.tsx` | `class-variance-authority` 变体；朱砂红主色，hover 上移 + 阴影，active 下移 |
| **Badge** | `ui/badge.tsx` | 圆角胶囊，状态色取 token |
| **Dialog** | `ui/dialog.tsx` | 遮罩 + 内容缩放入场；Radix 焦点陷阱；标题关联 `aria-labelledby` |
| **Tooltip** | `ui/tooltip.tsx` | 含 `TooltipProvider`；`bg-ink-900` + `shadow-ink` |

> 历史版本本节列出 Input / Card / Switch / Tabs / Separator / Skeleton / Sheet / Select / DropdownMenu / Accordion 等 20+ 组件，均**未在仓库中实现**，已移除。需要新增原语时用 `components.json` 的 shadcn 配置生成，并同步本节与 [04-api-reference.md](04-api-reference.md) §6。

### 3.2 弹窗与抽屉（业务实现）

| 组件 | 位置 | 说明 |
|------|------|------|
| 学习页测验弹窗 | `components/learn/quiz-dialog.tsx` | id `learn-quiz-dialog` |
| 练习页测验弹窗 | `components/practice/quiz-dialog.tsx` | id `practice-quiz-dialog` |
| 书写弹窗 | `components/practice/writing-dialog.tsx` | 内嵌 Canvas，拆分为 `writing-canvas-*` 模块 |
| 移动导航抽屉 | `components/mobile-nav.tsx` | 右侧滑入、遮罩、Escape / 右滑关闭、`aria-modal` |

两个测验弹窗 id 必须保持区分，禁止列表渲染复用静态 id。

### 3.3 业务组件

| 组件 | 位置 | 说明 |
|------|------|------|
| **FeatureCard** | `components/feature-card.tsx` | 渐变图标 + `display-font` 标题，hover 上移 |
| **StatsCard** | `components/stats-card.tsx` | `accentVariant` prop，顶部装饰条 |
| **EmptyState / ErrorState / LoadingSpinner** | `components/state/state-views.tsx` | 空 / 错 / 加载态统一出口；**不存在 `empty-state.tsx`** |
| **Toast** | `components/toast.tsx` | 4 类型（success/error/warning/info），`slide-in-right` 动画 |
| **NavLink** | `components/nav-link.tsx` | active 态朱砂红文字 + 下划线指示器 |
| **LayoutClient** | `components/layout-client.tsx` | 玻璃态 header、skip-link、页脚版本插值 |

## 4. 交互标准

### 4.1 交互模式

| 场景 | 模式 |
|------|------|
| 页面切换 | `fade-in-elegant` 动画（0.6s），`scroll-behavior: smooth` |
| 滚动揭示 | `.reveal` + `.is-visible` 类，Intersection Observer 触发 |
| 错峰入场 | `.stagger-children`，6 阶延迟（0/120/240/360/480/600ms） |
| Hero 入场 | `.hero-eyebrow` → `.hero-title` → `.hero-subtitle` → `.hero-cta` → `.hero-visual` |
| 模态弹窗 | 背景模糊遮罩 + 内容缩放入场 |
| 抽屉 | 右侧滑入 + 背景遮罩 + Escape 关闭 |

### 4.2 反馈机制

| 场景 | 反馈方式 |
|------|---------|
| 按钮点击 | `translate-y-0.5`（active 下移） |
| 卡片悬停 | `translate-y-[-8px]` + `shadow-ink-lg` |
| 表单聚焦 | `border-vermilion-500` + `ring-vermilion-500/20` |
| 操作成功 | Toast success（绿色，3s 自动消失） |
| 操作失败 | Toast error（红色，5s 自动消失） |
| 加载中 | Skeleton `animate-pulse` |

### 4.3 错误状态

| 场景 | 处理方式 |
|------|---------|
| 表单验证 | 实时验证，`border-red-500` + `ring-red-500/20` + 错误文字 |
| 网络错误 | Toast error + 重试按钮 |
| 权限不足 | Toast warning + 引导文案 |

### 4.4 空状态

| 场景 | 组件与文案键 |
|------|-------------|
| 无学习记录 | `EmptyState`（`components/state/state-views.tsx`），`common.emptyTitle` / `common.emptyDesc` |
| 运行错误 | `ErrorState` + `common.errorTitle` / `common.errorDesc` / `common.retry`，或路由级 `error.tsx` |
| 加载中 | `LoadingSpinner` 或路由级 `loading.tsx` |
| 404 | `not-found.tsx` + `common.notFoundTitle` / `common.notFoundDesc` |

所有场景文案须走 i18n，11 语言键一致。

## 5. 响应式设计

### 5.1 断点

| 断点 | 宽度 | 布局变化 |
|------|------|---------|
| 默认 | <640px | 移动端：单列布局，汉堡菜单 |
| sm | 640px+ | 小屏：2 列汉字网格 |
| md | 768px+ | 平板：3 列汉字网格 |
| lg | 1024px+ | 桌面：完整布局，6 列汉字网格，3 列功能卡片 |

### 5.2 移动端规范

- 触控目标：最小 44px（`.touch-target` 工具类）
- 安全区域：`.safe-bottom`（`env(safe-area-inset-bottom)`）
- 导航：汉堡菜单 + 右侧抽屉
- 按钮宽度：100%（移动端 CTA）

## 6. 无障碍设计

### 6.1 键盘导航

- Tab 顺序：逻辑顺序
- Focus 可见：`outline: 2px solid var(--color-ring)` + `outline-offset: 2px`
- Skip link：跳转到 `#main-content`

### 6.2 屏幕阅读器

- ARIA 标签：所有交互元素
- 角色：`role="dialog"`、`role="option"`、`role="listbox"`
- 状态：`aria-selected`、`aria-expanded`、`aria-hidden`

### 6.3 减少动画

`prefers-reduced-motion: reduce` 时，所有动画/过渡降至 0.01ms。

## 7. 原型文件

`prototype/` 下 6 个 HTML 页面骨架，均为结构标记 + 语义化 id；样式与脚本按职责外置：

| 文件 | 用途 |
|------|------|
| `prototype.html` | **唯一权威高保真原型**：响应式、主题/语言切换、汉字选择、Toast、移动抽屉、测验、Canvas 书写 |
| `wireframes.html` | 线框规范、组件状态可视化（§3.5）与断点指示器 |
| `learn.html` / `practice.html` / `progress.html` / `character-detail.html` | 分页面骨架 |

- `prototype/styles/*.css`（11 个）与 `prototype/scripts/*.js`（11 个）单文件均 ≤ 200 行。
- `prototype-fragments.js` / `wireframes-fragments.js` 承载外置静态标记片段，通过 `innerHTML` 注入占位容器，**必须最先加载**。
- 原型 id 全量 kebab-case 语义命名；ARIA 引用、锚点与选择器零悬空；书写弹窗 `aria-labelledby` 指向 sr-only 标题 `writing-title`。
- 原型 I18N 的 AI 生成式能力声明已下架，对齐生产真实能力（笔顺反馈 / 互动学习）；字典键 `feat.ai.*` 已改为 `feat.feedback.*`。

## 8. Token 维护规则

1. **单一来源、分层组织**：`globals.css` 的 `@theme` 定义语义 token（`--color-*` / 字体 / 圆角）；`styles/theme-colors.css` 的 `@theme` 定义 `ink` / `vermilion` / `indigo` 扩展色阶、状态色阶与阴影；`styles/utilities.css` 定义动画工具类。不得另立他源或互相覆盖。
2. **深色模式**：通过 `.dark` 类覆盖 CSS 变量（`@custom-variant dark`），不用随意的色值分支替代语义色。
3. **禁止内联色值**：组件中不使用 `style={{ color: '#xxx' }}` / `bg-[#...]`，统一取 `var(--color-*)` 或对应 Tailwind 类。
4. **圆角与过渡**：使用 `rounded-xl` / `rounded-2xl` 等 token 与 transition token，禁止 `rounded-[28px]` 任意值、`transition-all`。
5. **派生色**：`--color-primary-hover` / `--color-primary-border` 用 `color-mix()` 从 `--color-primary` 派生，不新增平行色值。
6. **改动同步**：修改 token 时同批次更新本文、[04-api-reference.md](04-api-reference.md) §10、原型 CSS 变量与 [alignment-checklist.md](alignment-checklist.md) §4。

完整编码约束见 [coding-standards.md](coding-standards.md) §8。
