# 功能规格说明

---

## Meta 信息

| 字段 | 值 |
|-----|-----|
| **版本** | v2.3.1 |
| **更新日期** | 2026-06-10 |
| **维护者** | HanziMaster 开发团队 |
| **文档编号** | OS-04 |

---

## 1. 功能清单总览

| 模块编号 | 功能模块 | 子功能数 | 优先级 | 状态 |
|---------|---------|---------|--------|------|
| F-01 | 首页展示 | 4 | 高 | ✅ 已实现 |
| F-02 | 汉字学习页面 | 3 | 高 | ✅ 已实现 |
| F-03 | 汉字练习页面 | 4 | 高 | ✅ 已实现 |
| F-04 | 主题系统 | 3 | 高 | ✅ 已实现 |
| F-05 | 国际化系统 | 3 | 高 | ✅ 已实现 |
| F-06 | 响应式导航系统 | 3 | 高 | ✅ 已实现 |
| F-07 | AI 手写分析 | 2 | 中 | ⚙️ 集成中 |

---

## 2. F-01: 首页展示

### 2.1 功能描述

首页作为用户进入应用的第一个页面，展示应用品牌、核心价值主张、主要入口按钮和功能特性卡片。

### 2.2 子功能清单

| 子功能 | 描述 |
|-------|------|
| F-01-01 | AI Powered 状态徽章 |
| F-01-02 | Hero 区域主标题/副标题/描述 |
| F-01-03 | CTA 按钮组（开始学习 / 探索字库） |
| F-01-04 | 功能特性卡片（3 列：AI 洞察、词源文化、自适应学习） |

### 2.3 设计规范

| 元素 | 样式规范 |
|-----|---------|
| **页面背景** | `bg-white dark:bg-slate-900` |
| **Hero 容器** | `max-w-5xl mx-auto px-4 text-center` |
| **状态徽章** | `inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-600 dark:text-emerald-400` + 脉冲动画圆点 |
| **主标题** | `bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent` |
| **主 CTA 按钮** | `rounded-xl bg-emerald-500 px-6 py-3 text-white font-medium hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20 hover:scale-105 active:scale-95` |
| **次 CTA 按钮** | `rounded-xl border border-slate-200 bg-white px-6 py-3 text-slate-700 font-medium hover:bg-slate-50 transition-all dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200` |
| **功能卡片** | `rounded-[24px] bg-white p-8 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] transition-all hover:-translate-y-1 dark:bg-slate-800` |
| **响应式** | 移动端单列 → `md:grid-cols-2` → `lg:grid-cols-3` |

### 2.4 无障碍要求

| 要求 | 实现 |
|-----|------|
| Skip Link | `<a href="#main-content" class="sr-only focus:not-sr-only">跳转至主内容</a>` |
| 按钮 ARIA | CTA 按钮含完整文本 + `aria-label`（如适用） |
| 动画降级 | `@media (prefers-reduced-motion: reduce) { .transition-all { transition: none; } }` |
| 焦点样式 | `focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2` |
| 语义化标签 | `<header>`、`<main>`、`<section>`、`<footer>` 正确嵌套 |

### 2.5 验收标准

- [ ] 加载时间 < 1s（宽带）/ < 2.5s（移动 3G）
- [ ] 在 1024px 以下变为单列布局
- [ ] Tab 键可按逻辑顺序聚焦所有可交互元素
- [ ] 深色/浅色模式切换后所有元素色彩正确

---

## 3. F-02: 汉字学习页面

### 3.1 功能描述

汉字学习页面提供可选汉字网格、选中后展示详情面板（大字显示、拼音、含义、笔画数），提供「练习书写」入口。

### 3.2 子功能清单

| 子功能 | 描述 |
|-------|------|
| F-02-01 | 汉字网格选择（响应式 2-6 列） |
| F-02-02 | 选中汉字详情面板 |
| F-02-03 | 练习书写操作按钮 |

### 3.3 设计规范

| 元素 | 样式规范 |
|-----|---------|
| **汉字卡片（网格）** | `rounded-2xl bg-white p-6 text-center cursor-pointer transition-all hover:shadow-lg dark:bg-slate-800 ring-1 ring-slate-100` |
| **选中状态** | `ring-2 ring-emerald-500 shadow-lg shadow-emerald-500/20 scale-105` |
| **汉字大字展示** | `hanzi-font text-9xl font-bold text-slate-900 dark:text-white`（Noto Sans SC） |
| **详情面板** | `rounded-[24px] bg-white p-8 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.08)] dark:bg-slate-800` |
| **响应式网格** | `grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6` |
| **触控目标** | 单个汉字卡片 ≥ 64x64px，确保触控友好 |

---

## 4. F-03: 汉字练习页面

### 4.1 功能描述

练习页面提供三种练习模式入口、周学习进度网格、学习统计数据。

### 4.2 子功能清单

| 子功能 | 描述 |
|-------|------|
| F-03-01 | 练习选项卡片（书写练习 / 记忆测验 / 进度统计） |
| F-03-02 | 一周学习进度网格（7 列，已学习日期用 emerald 色标记） |
| F-03-03 | 统计数据卡片（今日练习 / 连续天数 / 总掌握） |
| F-03-04 | 数据从 localStorage 加载 |

### 4.3 设计规范

| 元素 | 样式规范 |
|-----|---------|
| **练习选项卡片** | `rounded-2xl bg-white p-6 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all dark:bg-slate-800`（响应式 `grid-cols-1 md:grid-cols-3`） |
| **周进度单元格** | `rounded-xl aspect-square` |
| **已学习标记** | `bg-emerald-500 text-white` |
| **未学习标记** | `bg-slate-100 text-slate-400 dark:bg-slate-700` |
| **统计卡片** | `rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white p-6 shadow-lg shadow-emerald-500/20` |

---

## 5. F-04: 主题系统

### 5.1 功能描述

三态主题切换系统：浅色模式 / 深色模式 / 跟随系统。

### 5.2 子功能清单

| 子功能 | 描述 |
|-------|------|
| F-04-01 | 主题切换按钮（三态循环） |
| F-04-02 | 主题持久化到 localStorage |
| F-04-03 | 系统主题偏好监听（prefers-color-scheme） |

### 5.3 设计规范

| 元素 | 样式规范 |
|-----|---------|
| **切换按钮** | `rounded-xl p-2.5 min-w-11 min-h-11 hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500`（触控目标 ≥ 44x44px） |
| **图标** | SVG（太阳 / 月亮 / 显示器），`w-5 h-5`，颜色随主题自适应 |
| **工具提示** | `title` + 自定义 hover 工具提示（`common.theme.{state}` 翻译键） |
| **状态图标** | 浅色：☀️ 太阳；深色：🌙 月亮；系统：🖥️ 显示器 |
| **过渡动画** | `transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]`（`prefers-reduced-motion` 时禁用） |

### 5.4 ARIA 规范

- `aria-label` 描述当前主题：如「切换主题（当前：浅色）」
- `aria-pressed` 或 `data-theme` 属性标记当前状态
- 可通过键盘 Space/Enter 激活

---

## 6. F-05: 国际化系统

### 6.1 功能描述

支持 11 种语言的完整国际化系统，提供下拉菜单式语言选择，完整键盘导航和 ARIA 支持。

### 6.2 子功能清单

| 子功能 | 描述 |
|-------|------|
| F-05-01 | 语言切换下拉菜单（11 种语言，最大高度 70vh） |
| F-05-02 | 完整 ARIA 无障碍 + 键盘导航 |
| F-05-03 | 翻译键组织 + localStorage 持久化 |

### 6.3 支持语言

| 代码 | 语言名称（原生） | 语言名称（英文） |
|-----|----------------|-----------------|
| `en` | English | English |
| `zh-CN` | 简体中文 | Chinese (Simplified) |
| `zh-TW` | 繁體中文 | Chinese (Traditional) |
| `es` | Español | Spanish |
| `ar` | العربية | Arabic |
| `fr` | Français | French |
| `pt-BR` | Português (BR) | Portuguese (Brazil) |
| `de` | Deutsch | German |
| `ja` | 日本語 | Japanese |
| `ko` | 한국어 | Korean |
| `ru` | Русский | Russian |

### 6.4 设计规范

| 元素 | 样式规范 |
|-----|---------|
| **触发器按钮** | `rounded-xl p-2.5 min-w-11 min-h-11 hover:bg-slate-100 dark:hover:bg-slate-700` |
| **下拉容器** | `absolute top-full right-0 mt-2 w-48 rounded-2xl bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] overflow-hidden dark:bg-slate-800` |
| **菜单项** | `w-full px-4 py-3 text-left hover:bg-slate-50 dark:hover:bg-slate-700` + `aria-selected` 时 `bg-emerald-500 text-white` |
| **最大高度** | `max-h-[70vh] overflow-y-auto` |

### 6.5 ARIA 规范

| 属性 | 值 | 说明 |
|-----|----|------|
| 触发器 `role` | - (button) | 原生按钮元素 |
| 触发器 `aria-haspopup` | `listbox` | 声明有下拉菜单 |
| 触发器 `aria-expanded` | `true/false` | 菜单展开状态 |
| 容器 `role` | `listbox` | 列表框容器 |
| 项 `role` | `option` | 单个可选项 |
| 项 `aria-selected` | `true/false` | 当前选中项 |
| 容器 `aria-label` | 「选择语言」 | 供屏幕阅读器朗读 |

### 6.6 键盘导航

| 按键 | 行为 |
|-----|------|
| Enter/Space（触发器） | 打开/关闭下拉菜单 |
| Arrow Down | 移动到下一项（绕回） |
| Arrow Up | 移动到上一项（绕回） |
| Enter（菜单项） | 选择当前项并关闭菜单 |
| Escape | 关闭菜单，焦点回到触发器 |
| Tab | 关闭菜单并移动到下一个可聚焦元素 |

---

## 7. F-06: 响应式导航系统

### 7.1 功能描述

桌面端顶部毛玻璃导航栏 + 移动端底部图标导航栏 + 侧边抽屉菜单。

### 7.2 子功能清单

| 子功能 | 描述 |
|-------|------|
| F-06-01 | 桌面端顶部导航（Logo + NavLink + 主题/语言切换） |
| F-06-02 | 移动端底部导航栏（Home / Learn / Practice 图标按钮） |
| F-06-03 | 移动端侧边抽屉菜单（MobileNav，hamburger 触发） |

### 7.3 设计规范

| 元素 | 样式规范 |
|-----|---------|
| **顶部导航** | `sticky top-0 z-40 backdrop-blur(20px) bg-white/70 dark:bg-slate-900/70 border-b border-slate-200/50 dark:border-slate-700/50` |
| **底部导航（移动）** | `fixed bottom-0 left-0 right-0 z-40 backdrop-blur(20px) bg-white/80 dark:bg-slate-900/80 border-t border-slate-200/50` + `lg:hidden` |
| **NavLink 活跃态** | `bg-emerald-500 text-white rounded-xl`（桌面）/ `text-emerald-500`（底部图标） |
| **抽屉遮罩** | `fixed inset-0 bg-black/50 backdrop-blur-sm` |
| **抽屉面板** | `fixed right-0 top-0 h-full w-72 bg-white dark:bg-slate-900 shadow-2xl` + `role="dialog" aria-modal="true"` |

### 7.4 断点策略

| 断点 | 宽度 | 导航形态 |
|-----|------|---------|
| `< 1024px` | 移动端/平板 | 底部导航栏（3 个图标按钮） + 可选抽屉 |
| `≥ 1024px` | 桌面 | 顶部毛玻璃导航栏（Logo + 文本链接 + 切换按钮） |

---

## 8. F-07: AI 手写分析（可选功能）

### 8.1 功能描述

调用 Google Gemini API 对用户手写汉字进行分析，提供笔画、平衡、美感的个性化反馈。

### 8.2 子功能清单

| 子功能 | 描述 |
|-------|------|
| F-07-01 | 手写画布（Canvas 绘制） |
| F-07-02 | AI 反馈面板（API 响应展示） |

### 8.3 启用条件

- 配置 `process.env.GEMINI_API_KEY` 环境变量
- 客户端检测到 API Key 后展示「AI 分析」按钮
- 未配置时显示「AI 功能暂不可用」提示

---

## 9. 功能优先级与依赖关系

### 9.1 优先级排序

```
F-01 首页展示 → F-06 导航系统 → F-04 主题系统 → F-05 国际化系统
                                 ↓
                      F-02 汉字学习 → F-03 汉字练习
                                 ↓
                          F-07 AI 分析（可选）
```

### 9.2 核心依赖

| 功能 | 依赖组件 | 依赖 Context |
|-----|---------|------------|
| 所有页面文本 | - | LocaleContext (t 函数) |
| 所有页面色彩 | - | ThemeContext (dark 类) |
| 所有导航 | NavLink / MobileNav | 路由系统 |
| 汉字学习 | 汉字数据模型 | LocaleContext |

---

## 10. Version History

| 版本 | 日期 | 说明 |
|-----|------|------|
| **v2.3.1** | 2026-06-10 | 统一版本号，对齐 Apple 设计风格（纯白背景、毛玻璃、emerald 绿色、圆角 24px、柔和阴影），完善无障碍 ARIA + Skip Link + prefers-reduced-motion、响应式断点描述 |
| v2.3.0 | 2026-06-07 | 细化组件样式规范表 |
| v2.2.1 | 2026-06-04 | 添加子功能清单 |
| v2.2.0 | 2026-06-02 | 初始功能规格版本 |

---

## 11. 相关文档

- [项目概述](01-project-overview.md) - 项目基本信息和技术栈
- [需求规格](02-requirements-spec.md) - 详细的功能需求和非功能需求
- [技术架构](03-technical-architecture.md) - 系统架构设计和技术选型
- [API 规范](05-api-spec.md) - 详细的 API 文档和代码示例
- [数据模型](06-data-model.md) - 数据结构和类型定义
- [设计原型](07-design-prototype.md) - 完整的设计规范和原型图说明
- [无障碍与国际化](08-a11y-i18n.md) - 详细的无障碍和国际化规范

---

**本文档版本: v2.3.1**  
**最后更新: 2026-06-10**
