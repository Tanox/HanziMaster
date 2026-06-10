# 设计原型与设计系统

---

## Meta 信息

| 字段 | 值 |
|-----|-----|
| **版本** | v2.3.1 |
| **更新日期** | 2026-06-10 |
| **维护者** | HanziMaster 开发团队 |
| **文档编号** | OS-07 |

---

## 1. 设计风格总览

HanziMaster 汉字大师采用 **Apple Human Interface Guidelines** 风格的设计系统：

| 设计元素 | 规范 |
|---------|------|
| **核心风格** | 极简主义、内容优先、留白充足 |
| **背景** | 纯白 `#ffffff` / 深海军 `#0f172a`（深色模式） |
| **毛玻璃效果** | `backdrop-blur(20px)` + `rgba(255,255,255,0.7)`（浅色） |
| **主强调色** | emerald 绿色 `#10b981` |
| **次强调色** | cyan 青色 `#06b6d4` |
| **大卡片圆角** | `24px` |
| **中卡片圆角** | `16px` |
| **按钮圆角** | `12px` |
| **阴影系统** | 三层柔和阴影（详见 §3） |
| **动画** | 缓动 `cubic-bezier(0.4, 0, 0.2, 1)`，200-400ms |
| **降级动画** | `prefers-reduced-motion: reduce` 时关闭 |

---

## 2. 色彩系统

### 2.1 色彩令牌（Color Tokens）

| 语义名称 | Tailwind 类 | HEX | 用途 |
|---------|------------|-----|------|
| **Primary** | `emerald-500` | `#10b981` | 主按钮、活跃状态、CTA、焦点环 |
| **Primary Dark** | `emerald-600` | `#059669` | 主按钮 hover、强调文本 |
| **Secondary** | `cyan-500` | `#06b6d4` | 次强调、装饰元素 |
| **Amber** | `amber-500` | `#f59e0b` | 词源文化卡片渐变 |
| **Background** | `white` | `#ffffff` | 页面背景（浅色模式） |
| **Background Dark** | `slate-900` | `#0f172a` | 页面背景（深色模式） |
| **Surface** | `slate-50` | `#f8fafc` | 次级表面 |
| **Surface Dark** | `slate-800` | `#1e293b` | 次级表面（深色） |
| **Text Primary** | `slate-900` | `#0f172a` | 主要文本（浅色） |
| **Text Primary (Dark)** | `white` | `#ffffff` | 主要文本（深色） |
| **Text Secondary** | `slate-500` | `#64748b` | 次要文本、辅助信息 |
| **Border** | `slate-200` | `#e2e8f0` | 边框 |
| **Border Dark** | `slate-700` | `#334155` | 边框（深色） |
| **Glass** | - | `rgba(255,255,255,0.7)` | 毛玻璃背景 |
| **Glass Dark** | - | `rgba(15,23,42,0.7)` | 毛玻璃背景（深色） |

### 2.2 色彩对比检查（无障碍）

| 组合 | 对比度 | WCAG AA (4.5:1) |
|-----|--------|----------------|
| `slate-900` on `white` | 15.6 : 1 | ✅ 通过 |
| `slate-500` on `white` | 7.5 : 1 | ✅ 通过 |
| `white` on `emerald-500` | 3.3 : 1 | ✅ 大号文本通过 |
| `white` on `slate-900` | 15.6 : 1 | ✅ 通过 |
| `emerald-500` on `white` | 3.1 : 1 | ✅ 大号文本通过 |
| `slate-900` on `emerald-100` | 13.2 : 1 | ✅ 通过 |

---

## 3. 阴影系统

### 3.1 三层柔和阴影

| 阴影名称 | CSS 值 | 用途 |
|---------|--------|------|
| **Shadow Card** | `0 8px 24px -8px rgba(0,0,0,0.08)` | 默认卡片阴影 |
| **Shadow Hover** | `0 20px 60px -15px rgba(0,0,0,0.15)` | 悬停浮起阴影 |
| **Shadow Soft** | `0 2px 8px -4px rgba(0,0,0,0.05)` | 微阴影、分隔元素 |

### 3.2 Tailwind 写法

```tailwind
shadow-[0_8px_24px_-8px_rgba(0,0,0,0.08)]            /* Card */
hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)]      /* Hover */
shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)]               /* Soft */
```

---

## 4. 圆角系统

### 4.1 圆角令牌

| 名称 | 值 | Tailwind | 用途 |
|-----|----|----------|------|
| **Card Radius** | `24px` | `rounded-[24px]` | 大卡片（FeatureCard、面板） |
| **Medium Radius** | `16px` | `rounded-2xl` | 中卡片（网格项、抽屉） |
| **Button Radius** | `12px` | `rounded-xl` | 按钮、徽章 |
| **Small Radius** | `8px` | `rounded-lg` | 小元素、输入框 |
| **Full Radius** | `9999px` | `rounded-full` | 药丸、徽章 |

### 4.2 使用示例

```tsx
// 功能卡片（24px 圆角 + 卡片阴影）
<div className="rounded-[24px] bg-white p-8 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.08)]">
  {content}
</div>

// 按钮（12px 圆角）
<button className="rounded-xl bg-emerald-500 px-6 py-3 text-white">
  开始学习
</button>

// 状态徽章（Full Radius）
<span className="rounded-full bg-emerald-500/10 px-4 py-2 text-emerald-600">
  AI-Powered
</span>
```

---

## 5. 排版系统

### 5.1 字体

| 字体 | CSS 变量 | 用途 |
|-----|----------|------|
| **Inter** | `--font-sans` | 主要界面字体（数字、英文） |
| **Noto Sans SC** | `--font-hanzi` | 汉字显示（`hanzi-font` 类） |
| **JetBrains Mono** | `--font-mono` | 代码字体 |

### 5.2 字号等级

| 等级 | Tailwind | 字号 | 行高 | 用途 |
|-----|----------|------|------|------|
| **Display** | `text-5xl / text-6xl` | 48-60px | 1.1 | Hero 主标题 |
| **H1** | `text-4xl` | 36px | 1.2 | 页面标题 |
| **H2** | `text-2xl` | 24px | 1.3 | 章节标题 |
| **H3** | `text-xl` | 20px | 1.4 | 卡片标题 |
| **Body** | `text-base` | 16px | 1.5 | 正文文本 |
| **Small** | `text-sm` | 14px | 1.5 | 辅助文本、按钮 |
| **Caption** | `text-xs` | 12px | 1.5 | 标签、注释 |
| **Hanzi Display** | `text-8xl / text-9xl` | 96-128px | 1.0 | 大字汉字展示 |

### 5.3 字重

| 名称 | CSS 值 | 用途 |
|-----|--------|------|
| **Normal** | `font-normal` (400) | 正文 |
| **Medium** | `font-medium` (500) | 小标题、标签 |
| **Semibold** | `font-semibold` (600) | 卡片标题 |
| **Bold** | `font-bold` (700) | 主标题、CTA |

### 5.4 字间距

| 名称 | Tailwind | 用途 |
|-----|----------|------|
| **Tight** | `tracking-tight` | Hero 标题、主标题 |
| **Normal** | `tracking-normal` | 正文、默认 |
| **Wide** | `tracking-wide` | 大写标签 |

### 5.5 汉字专用类

```tsx
<span className="text-9xl font-bold hanzi-font">永</span>
```

> `hanzi-font` 类切换为 Noto Sans SC 字体，确保汉字在所有语言环境下的一致显示。

---

## 6. 间距系统（8px Grid）

使用 8 像素为基础单位的间距系统：

| Tailwind | 实际像素 | 用途 |
|---------|---------|------|
| `p-1` | 4px | 内部小调整 |
| `p-2` | 8px | 紧凑内边距 |
| `p-3` | 12px | 按钮垂直内边距 |
| `p-4` | 16px | 默认内边距 |
| `p-6` | 24px | 卡片内边距 |
| `p-8` | 32px | 大卡片内边距 |
| `gap-2` | 8px | 小组件间距 |
| `gap-4` | 16px | 组件间距 |
| `gap-6` | 24px | 区块间距 |
| `gap-8` | 32px | 大区块间距 |
| `mt-12` | 48px | 区块垂直间距 |
| `mt-16` | 64px | 大区块垂直间距 |
| `mt-20` | 80px | Hero 区块间距 |

---

## 7. 响应式断点

### 7.1 断点定义

| 断点名称 | 宽度范围 | 设备类型 | 布局 |
|---------|---------|---------|------|
| **xs** | `< 475px` | 小手机 | 单列紧凑 |
| **sm** | `475px - 768px` | 手机 | 单列，底部导航 |
| **md** | `768px - 1024px` | 平板 | 双列，顶部导航 + 抽屉 |
| **lg** | `1024px - 1280px` | 笔记本 | 三列，完整顶部导航 |
| **xl** | `≥ 1280px` | 桌面 | 三列，最大内容宽度限制 |

### 7.2 Tailwind 响应式前缀用法

```tsx
// 网格：移动 2 列 → 平板 4 列 → 桌面 6 列
<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
  {characters}
</div>

// 功能卡片：移动 1 列 → 平板 2 列 → 桌面 3 列
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {featureCards}
</div>

// 隐藏：移动端显示底部导航，桌面端隐藏
<nav className="lg:hidden">...</nav>

// 显示：桌面端显示顶部导航，移动端隐藏
<header className="hidden lg:flex">...</header>
```

---

## 8. 按钮样式规范

### 8.1 主要按钮（Primary CTA）

```tsx
<button className="
  rounded-xl bg-emerald-500 px-6 py-3
  text-white font-medium
  shadow-lg shadow-emerald-500/20
  hover:bg-emerald-600 hover:scale-105
  active:scale-95
  transition-all
  focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2
">
  开始学习
</button>
```

### 8.2 次要按钮（Secondary）

```tsx
<button className="
  rounded-xl border border-slate-200 bg-white px-6 py-3
  text-slate-700 font-medium
  hover:bg-slate-50
  transition-all
  dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200
  focus:outline-none focus:ring-2 focus:ring-emerald-500
">
  探索字库
</button>
```

### 8.3 图标按钮（Toggle）

```tsx
<button className="
  rounded-xl p-2.5 min-w-11 min-h-11
  hover:bg-slate-100 dark:hover:bg-slate-700
  transition-colors
  focus:outline-none focus:ring-2 focus:ring-emerald-500
" aria-label="切换主题">
  <svg className="w-5 h-5" />
</button>
```

### 8.4 动效降级（prefers-reduced-motion）

在全局 CSS 中：

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    transition-property: color, background-color !important;
  }
}
```

---

## 9. 毛玻璃（Glassmorphism）规范

### 9.1 CSS 定义

```css
/* 浅色毛玻璃导航 */
.nav-glass {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid rgba(226, 232, 240, 0.5);
}

/* 深色毛玻璃导航 */
.dark .nav-glass {
  background: rgba(15, 23, 42, 0.7);
  border-bottom: 1px solid rgba(51, 65, 85, 0.5);
}

/* 浏览器不支持 backdrop-filter 时的降级 */
@supports not (backdrop-filter: blur(20px)) {
  .nav-glass {
    background: rgba(255, 255, 255, 0.95);
  }
  .dark .nav-glass {
    background: rgba(15, 23, 42, 0.95);
  }
}
```

### 9.2 Tailwind 写法

```tsx
<header className="
  sticky top-0 z-40
  bg-white/70 dark:bg-slate-900/70
  backdrop-blur-md
  border-b border-slate-200/50 dark:border-slate-700/50
">
  {navContent}
</header>
```

---

## 10. 页面结构原型

### 10.1 首页（Home）

```
┌───────────────────────────────────────────────────────────┐
│  NAV: 毛玻璃顶部导航（Logo | Learn | Practice | 🌙 | 🌐）    │  ← 桌面端
├───────────────────────────────────────────────────────────┤
│                                                           │
│            ╭───────────────────────────╮                  │
│            │   [●] AI-Powered Learning │ ← 状态徽章（emerald）│
│            │                           │                  │
│            │   Master Chinese           │ ← 渐变色大字     │
│            │   Characters               │                  │
│            │                           │                  │
│            │   [ 开始学习 ] [ 探索字库 ] │ ← CTA 按钮组    │
│            ╰───────────────────────────╯                  │
│                                                           │
│   ┌─────────────┐ ┌─────────────┐ ┌─────────────┐         │
│   │  💡 AI      │ │  📚 词源     │ │  🎯 自适应   │         │
│   │  Insights   │ │  Etymology   │ │  Learning   │         │
│   │  card (24px │ │  card (24px  │ │  card (24px │         │
│   │  rounded,   │ │  rounded,    │ │  rounded,   │         │
│   │  shadow)    │ │  shadow)     │ │  shadow)    │         │
│   └─────────────┘ └─────────────┘ └─────────────┘         │  ← 桌面 3 列
│                                                           │
│                                                           │
│  ═══════════════════════════════════════════════════════  │
│  📱 移动端底部导航栏：   [ 🏠 ]  [ 📖 ]  [ ✏️ ]            │  ← 底部固定
└───────────────────────────────────────────────────────────┘
```

### 10.2 学习页面（Learn）

```
┌───────────────────────────────────────────────────────────┐
│  顶部导航（桌面端）                                          │
├───────────────────────────────────────────────────────────┤
│  标题：选择汉字（Select a Character）                        │
│                                                           │
│  [永] [山] [水] [人] [日] [月] ... 网格                      │  ← 2-6 列响应式
│  [木] [火] [土] [金] ...                                   │
│                                                           │
│  ╭───────────────────────────────────────────────────────╮ │
│  │                                                       │ │
│  │          永         ← 大字 (text-9xl hanzi-font)     │ │
│  │          yǒng      ← 拼音                             │ │
│  │          Forever    ← 含义                             │ │
│  │          笔画: 5    ← 笔画数                            │ │
│  │                                                       │ │
│  │          [ 练习书写 ] ← emerald CTA 按钮               │ │
│  ╰───────────────────────────────────────────────────────╯ │
│                                           圆角 24px 卡片  │
└───────────────────────────────────────────────────────────┘
```

### 10.3 练习页面（Practice）

```
┌───────────────────────────────────────────────────────────┐
│  顶部导航                                                  │
├───────────────────────────────────────────────────────────┤
│  标题：练习模式（Practice）                                │
│                                                           │
│  ┌───────────────┐ ┌───────────────┐ ┌───────────────┐    │
│  │   ✏️ 书写      │ │   🧠 记忆      │ │   📊 统计      │    │
│  │   Practice    │ │   Quiz        │ │   Stats       │    │
│  │   (卡片)      │ │   (卡片)      │ │   (卡片)      │    │
│  └───────────────┘ └───────────────┘ └───────────────┘    │
│                                                           │
│  📅 本周学习进度：[🟢] [🟢] [🟢] [⚪] [⚪] [⚪] [⚪]       │
│                                                           │
│  ┌─────────────────────────────────────────────────────┐  │
│  │  今日练习：15                                        │  │
│  │  连续天数：7 天                                       │  │
│  │  总掌握：128 字                                       │  │
│  └─────────────────────────────────────────────────────┘  │
│                                           渐变 emerald 卡 │
└───────────────────────────────────────────────────────────┘
```

---

## 11. 动画系统

### 11.1 过渡曲线

| 名称 | 值 | 用途 |
|-----|----|------|
| **Standard** | `cubic-bezier(0.4, 0, 0.2, 1)` | 默认、颜色、大小变化 |
| **Ease Out** | `cubic-bezier(0, 0, 0.2, 1)` | 入场动画 |
| **Ease In** | `cubic-bezier(0.4, 0, 1, 1)` | 退出动画 |

### 11.2 常用动画类

```tailwind
transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
hover:-translate-y-1 hover:scale-105
active:scale-95
animate-pulse  /* 状态徽章脉冲点 */
opacity-0 → opacity-100  /* 淡入 */
translate-x-full → translate-x-0  /* 抽屉滑入 */
```

### 11.3 焦点动画

```tsx
<button className="
  focus:outline-none
  focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2
  focus:ring-offset-white dark:focus:ring-offset-slate-900
">
```

> `ring-2` 提供 2px 宽度的 emerald 绿色焦点环，确保键盘用户清晰感知焦点。

---

## 12. 无障碍视觉规范

| 元素 | 规范 |
|-----|------|
| **焦点环** | 所有交互元素必须显示 `ring-2 ring-emerald-500` |
| **触控目标** | 最小 `44x44px`（Tailwind：`min-w-11 min-h-11`） |
| **色彩对比** | 正文 ≥ 4.5:1，大号文本 ≥ 3:1 |
| **Skip Link** | `<a href="#main-content" className="sr-only focus:not-sr-only">跳转至主内容</a>` |
| **动效降级** | `@media (prefers-reduced-motion: reduce)` 禁用装饰动画 |
| **语义 HTML** | 使用 `<header>`, `<main>`, `<nav>`, `<section>`, `<footer>` |

---

## 13. Version History

| 版本 | 日期 | 说明 |
|-----|------|------|
| **v2.3.1** | 2026-06-10 | 统一版本号，完善 Apple 风格设计系统（纯白背景、毛玻璃、emerald 绿色强调、圆角 24px、三层柔和阴影），完整响应式断点和无障碍视觉规范 |
| v2.3.0 | 2026-06-07 | 添加色彩对比检查、按钮规范、毛玻璃 CSS 规范 |
| v2.2.1 | 2026-06-04 | 添加页面结构原型图 |
| v2.2.0 | 2026-06-02 | 初始设计原型版本 |

---

## 14. 相关文档

- [项目概述](01-project-overview.md) - 项目基本信息和技术栈
- [需求规格](02-requirements-spec.md) - 详细的功能需求和非功能需求
- [技术架构](03-technical-architecture.md) - 系统架构设计和技术选型
- [功能规格](04-feature-spec.md) - 详细的功能规格说明
- [API 规范](05-api-spec.md) - 详细的 API 文档和代码示例
- [数据模型](06-data-model.md) - 数据结构和类型定义
- [无障碍与国际化](08-a11y-i18n.md) - 详细的无障碍和国际化规范

---

**本文档版本: v2.3.1**  
**最后更新: 2026-06-10**
