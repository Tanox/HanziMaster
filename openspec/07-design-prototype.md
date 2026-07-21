# HanziMaster 设计规范文档 v5.0

## 1. 设计概述

### 1.1 设计理念

- **东方水墨美学**：融合中国传统书法艺术与现代极简设计
- **克制用色**：以水墨灰为主，朱砂红作为唯一强调色，靛蓝作为辅助色
- **呼吸感**：大量留白，元素间距遵循 8px 网格系统
- **一致性**：所有组件遵循统一的设计语言，通过 CSS 变量（`@theme`）确保 token 单一来源

### 1.2 技术架构

- **CSS 变量系统**：`globals.css` 的 `@theme` 块为所有设计 token 的权威来源
- **Tailwind v4**：通过 `@theme` 自动生成工具类，`tailwind.config.ts` 提供向后兼容
- **shadcn/ui**：所有基础组件已改造为 ink/vermilion 设计语言
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

#### 2.1.2 扩展色阶（tailwind.config.ts）

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

### 3.1 基础组件

所有基础组件位于 `src/components/ui/`，基于 shadcn/ui 改造为 ink/vermilion 设计语言。

| 组件 | 变体 | 关键样式 |
|------|------|---------|
| **Button** | default / outline / secondary / ghost / destructive / link | 朱砂红主色，hover 上移+阴影，active 下移 |
| **Input** | - | 2px ink 边框，focus 时 vermilion 边框+光环 |
| **Badge** | default / secondary / outline / ghost / success / warning / info / destructive | rounded-full，6px 间距 |
| **Card** | default / sm | 玻璃态 `bg-white/80 backdrop-blur-xl`，hover 上移+阴影 |
| **Switch** | - | checked 时 vermilion-500，unchecked 时 ink-200 |
| **Tabs** | default / line | 激活态 vermilion 下划线 |
| **Separator** | - | `bg-ink-200 dark:bg-ink-700` |
| **Skeleton** | - | `bg-ink-100 dark:bg-ink-800 rounded-xl animate-pulse` |
| **Tooltip** | - | `bg-ink-900 text-ink-50 rounded-xl shadow-ink` |

### 3.2 复合组件

| 组件 | 关键样式 |
|------|---------|
| **Dialog** | `bg-white/95 backdrop-blur-xl rounded-3xl shadow-ink-xl`，标题用 `display-font` |
| **Sheet** | `bg-white/95 backdrop-blur-xl shadow-ink-xl`，标题用 `display-font` |
| **Select** | 触发器 ink 边框+vermilion focus，内容 `bg-white/95 backdrop-blur-xl rounded-2xl` |
| **DropdownMenu** | `bg-white/95 backdrop-blur-xl rounded-2xl shadow-ink-lg`，hover `bg-ink-50` |
| **Accordion** | `border-ink-200`，trigger hover `text-vermilion-500`，accordion-down/up 动画 |

### 3.3 业务组件

| 组件 | 位置 | 说明 |
|------|------|------|
| **FeatureCard** | `src/components/feature-card.tsx` | 80px 渐变图标 + display-font 标题，hover 上移 8px |
| **StatsCard** | `src/components/stats-card.tsx` | `accentVariant: 'vermilion' \| 'indigo' \| 'success'` prop，顶部 3px 装饰条 |
| **EmptyState** | `src/components/empty-state.tsx` | 64px 圆形图标，描述 max-w-280px |
| **Toast** | `src/components/toast.tsx` | 4 类型（success/error/warning/info），位置 `top-20 right-4`，slide-in-right 动画 |
| **NavLink** | `src/components/nav-link.tsx` | active 态 `bg-vermilion-500/10` + 底部圆点 |
| **MobileNav** | `src/components/mobile-nav.tsx` | 右侧抽屉 w-72，backdrop-blur-xl，Escape 关闭 |
| **LayoutClient** | `src/components/layout-client.tsx` | 玻璃态 header，skip-link，page-transition |

## 4. 交互标准

### 4.1 交互模式

| 场景 | 模式 |
|------|------|
| 页面切换 | `fade-in-elegant` 动画（0.6s），`scroll-behavior: smooth` |
| 滚动揭示 | `.reveal` + `.revealed` 类，Intersection Observer 触发 |
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

| 场景 | 组件 |
|------|------|
| 无学习记录 | EmptyState（图标 + 标题 + 描述 + CTA 按钮） |
| 无搜索结果 | EmptyState（搜索图标 + "未找到结果" + 清除筛选按钮） |
| 加载失败 | EmptyState（警告图标 + "加载失败" + 重试按钮） |

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

**高保真原型**：`prototype/prototype.html`

功能：完整响应式设计、深色/浅色主题、页面切换、汉字选择交互、Toast 通知、移动端抽屉。

## 8. Token 维护规则

1. **单一来源**：`globals.css` 的 `@theme` 块为语义色 token 的权威来源
2. **深色模式**：通过 `.dark` 类覆盖 CSS 变量，不使用 Tailwind 的 `dark:` 前缀覆盖语义色
3. **扩展色阶**：`ink`、`vermilion`、`indigo` 色阶在 `tailwind.config.ts` 中定义
4. **禁止内联色值**：组件中不使用 `style={{ color: '#xxx' }}`，必须使用 Tailwind 类名
5. **圆角 token**：使用 `rounded-xl`/`rounded-2xl` 等 token，禁止 `rounded-[28px]` 任意值
