# 原型图设计文档 v3.0.0

> 本文件同步于 `prototype/design-system.html` + `prototype/components.html` + `prototype/index.html`，所有视觉规范以原型为准。

## 1. 设计概述

HanziMaster v3.0 采用 **Apple Human Interface Guidelines 风格** 的克制、优雅、信息优先的设计语言。

### 1.1 设计理念

- **简洁优先 Clarity**：去除所有视觉噪音，让汉字本身成为主角
- **层级清晰 Hierarchy**：通过字体大小与字重（非颜色）建立信息层级
- **克制的色彩 Restraint**：主操作使用品牌渐变蓝紫，辅助信息使用中性灰
- **动效服务于感知 Motion as Feedback**：所有动画时长 ≤ 0.6s，缓动为 ease-out
- **响应式优先**：桌面优先，移动端 ≥ 375px 保证可用；触摸目标 ≥ 44×44 px

### 1.2 原型文件索引

| 文件 | 用途 | 主要内容 |
|------|------|---------|
| [`prototype/index.html`](../prototype/index.html) | 高保真交互原型 | 首页 / 学习 / 练习 三页切换 |
| [`prototype/design-system.html`](../prototype/design-system.html) | 设计系统规范 | 色彩 / 字体 / 间距 / 图标 / 动效 |
| [`prototype/components.html`](../prototype/components.html) | 组件库规范 | 基础 / 复合 / 业务组件 + 交互标准 |

---

## 2. 设计系统规范 Design System

### 2.1 色彩系统 Colors

**品牌色 Brand**：
- 主色 `#007AFF` — Apple Blue
- 次色 `#AF52DE` — Purple
- 品牌渐变 `linear-gradient(135deg, #007AFF 0%, #AF52DE 100%)`

**系统色 System**（用于状态反馈，绝不可作为主要信息色）：
| Token | HEX | 用途 |
|-------|-----|------|
| `--apple-green`  | `#34C759` | 成功 / 通过 |
| `--apple-orange` | `#FF9500` | 警告 / 待处理 |
| `--apple-red`    | `#FF3B30` | 错误 / 删除 |
| `--apple-yellow` | `#FFCC00` | 提示 / 高亮 |
| `--apple-pink`   | `#FF2D55` | 收藏 / 偏好 |
| `--apple-teal`   | `#30B0C7` | 统计 / 图表 |

**中性色 Neutrals**（9 级灰阶）：
- `#000000` / `#1D1D1F` / `#48484A` / `#6E6E73` / `#86888A`
- `#A1A1A6` / `#D2D2D7` / `#E8E8ED` / `#F5F5F7` / `#FBFBFD` / `#FFFFFF`

**语义化 Tokens**（使用这些而非直接的 HEX）：
| Token | 用途 |
|-------|------|
| `--color-bg`      | 页面背景（`#FFFFFF`） |
| `--color-fg`      | 主要文本（`#1D1D1F`） |
| `--color-muted`   | 次要文本/辅助信息（`#6E6E73`） |
| `--color-border`  | 分隔线/边框（`#E8E8ED`） |
| `--color-card`    | 卡片背景（`#FBFBFD`） |

### 2.2 字体系统 Typography

**字体族 Font Family**：
- 主要界面：`Inter`（字重 300–800，`font-display: swap`）
- 汉字显示：`Noto Sans SC`（`.hanzi-font` 工具类）
- 代码/元数据：`JetBrains Mono`

**字号层级 Scale**（共 8 档，移动/桌面自适应）：
| Token | 字号 | 字重 | 用途 |
|-------|------|------|------|
| Hero      | 80px | 700 | 首页主标题 |
| Display 1 | 60px | 700 | 产品展示 / 数字焦点 |
| Display 2 | 44px | 600 | 页面主标题 |
| H1        | 32px | 600 | 节标题 |
| H2        | 24px | 600 | 卡片标题 |
| H3        | 19px | 600 | 小标题 / 按钮 |
| **Body**  | **17px** | **400** | **正文（默认字号）** |
| Caption   | 14px | 400 | 辅助信息 / 元数据 |

> 行高规则：正文 `1.47`（Apple 默认），大号标题收紧到 `1.05` 以增强视觉张力。

### 2.3 间距与布局 Spacing & Layout

**基准单位**：4px（`space-1 = 4px`）

**间距刻度**：4 / 8 / 12 / 16 / 20 / 24 / 32 / 48 / 64 / 80 px

**圆角 Radius**：
| Token | 尺寸 | 用途 |
|-------|------|------|
| `--radius-sm`   | 8px  | 徽章 / 标签 |
| `--radius-md`   | 12px | 输入框 / 图标按钮 |
| `--radius-xl`   | 20px | 小卡片 |
| `--radius-2xl`  | 24px | 主要卡片 |
| `--radius-3xl`  | 32px | Hero 展示卡片 |
| `--radius-pill` | 980px | 按钮 / 胶囊 |

**阴影 Shadows**（克制的 `box-shadow`，颜色为 `rgba(0,0,0,0.06)`–`rgba(0,0,0,0.16)`）：
- `--shadow-sm`: `0 2px 8px rgba(0,0,0,0.06)` — 输入框聚焦
- `--shadow-md`: `0 4px 16px rgba(0,0,0,0.08)` — 卡片悬浮
- `--shadow-lg`: `0 12px 32px rgba(0,0,0,0.12)` — 模态
- `--shadow-xl`: `0 20px 48px rgba(0,0,0,0.16)` — Hero

### 2.4 图标规范 Icons

- 统一 **2px stroke** 线条图标（Lucide / Feather 风格）
- `viewBox="0 0 24 24"`，`stroke-linecap: round; stroke-linejoin: round`
- 可点击图标周围保留 44×44 px 的触摸区域
- Hover 状态：图标与背景反色（深色卡片上变白）

### 2.5 动效规范 Motion

**缓动曲线**：
- `ease-out` — 页面元素出现（`0.5–0.6s`）
- `cubic-bezier(0.175, 0.885, 0.32, 1.275)` — spring 弹性（模态/弹出）
- `ease-in-out` — 循环动画（pulse `2s infinite`）

**动效类型**：
| 动画名 | 效果 | 使用场景 |
|--------|------|---------|
| `fade-in-up`    | 淡入 + 上移 8px | 页面加载/元素出现 |
| `scale-in`      | 从 0.8 缩放 | 模态框/弹出菜单 |
| `slide-in-right` | 左→右滑入 | 侧栏导航 |
| `hover-lift`    | 上移 4–6px + 阴影增强 | 卡片悬停 |
| `pulse`         | 脉冲缩放 | 状态指示器 |

---

## 3. 组件库规范 Components

### 3.1 基础组件 Basic Components

**Button 按钮**：
- `btn-primary`：深色填充（`#1D1D1F`），圆角 pill，17px，用于主要 CTA
- `btn-secondary`：透明背景 + 品牌色文字/图标，用于次要操作
- `btn-outline`：白底 + 1px 边框
- `btn-success` / `btn-danger`：仅用于确认/删除操作
- `btn-icon`：48×48 px，方形圆角，hover 变灰

**Input 输入框**：
- 16px 垂直内边距，17px 文字，12px 圆角
- 聚焦：`border-color: #007AFF` + `box-shadow: 0 0 0 4px rgba(0,122,255,0.15)`
- 错误：`border-color: #FF3B30` + 红色下方提示文字

**Toggle 开关**：
- 51×31 px 容器，27 px 滑块
- 关闭：`#D2D2D7` 背景；开启：`#34C759` 背景
- 交互：`transition: transform .25s cubic-bezier(...)`（spring 弹性）

**Badge 徽章**：
- Pill 胶囊形；默认蓝，成功绿，警告橙，危险红；ghost 灰色变体

### 3.2 复合组件 Composite Components

**Card 卡片**（`.card`）：
- `#FBFBFD` 背景 / 1px 浅灰边框 / 24px 圆角
- Hover：`translateY(-4px)` + `shadow-md`
- 内部结构：Icon 容器（56×56px，渐变背景 12px 圆角）→ H4 → 描述

**Character Grid 汉字选择网格**（`.char-card`）：
- 宽高比 1:1；网格 `auto-fit, minmax(120px, 1fr)`
- 默认白底 + 灰边；选中态 `#1D1D1F` 深色背景 + 白色汉字
- Hover：`translateY(-2px) scale(1.02)` + 蓝边

**Stats Card 统计卡片**：
- Value 40px / 700；Label 14px / 灰色

**Alert 提示**（4 态：info/success/warning/error）：
- 左侧 32px 图标容器 + 文本；16px 垂直内边距
- 背景色：主题色 8% 透明度；边框：主题色 20% 透明度

**Progress Bar 进度条**（`.progress-bar` + `.progress-fill`）：
- 8px 高度容器；渐变填充 `#007AFF → #AF52DE`
- 数字/百分比右对齐

**Weekly Panel 周进度面板**：
- 7 个格子 = 7 天；完成态深色（✓ 对勾），今日蓝边 + 外发光 4px `rgba(0,122,255,0.15)`
- 下方 4 个 summary stat（汉字数/连续天数/正确率/时长）

### 3.3 业务组件 Business-Specific Components

**Learning Mode Card**（3 张：书写练习 / 记忆测验 / 学习统计）：
- 顶部 64×64 px 渐变图标容器（每张不同渐变色）
- Hover：translateY -4px + shadow-lg
- 选中态：深色填充反色

**Character Detail Panel**（汉字详情）：
- 左：280×280 px 渐变大字 + 拼音
- 右：笔画 / 部首 / 结构 / 掌握度 四个 stat 卡片 + 操作按钮

**Empty State 空状态**：
- 插图 + 标题 + 描述 + 主按钮（CTA）
- 避免空白页面

### 3.4 组件使用规则

1. **单一职责**：每个组件只做一件事
2. **可访问性**：键盘可达，语义化 HTML，`aria-label` / `role`
3. **主题支持**：颜色永远用 CSS 变量，禁止写死 HEX
4. **响应式**：网格布局使用 `auto-fit` + `minmax`，自动适配列数
5. **触摸目标 ≥ 44×44 px**：所有可点击元素保证最小尺寸

---

## 4. 交互标准 Interaction Standards

### 4.1 交互模式库 Interaction Patterns

| 模式 | 说明 | 实现要点 |
|------|------|---------|
| **Hover-First** | 所有可交互元素应有明确的悬停反馈 | `translateY(-2px)` + `box-shadow` + 边框高亮 |
| **Keyboard-First** | 主要操作支持键盘 | Tab 导航，Enter 确认，Esc 关闭，Arrow keys 移动 |
| **Touch-Friendly** | 移动端触摸体验 | 最小 44×44 px 触摸目标，`minHeight: 72` 单元格 |
| **Optimal Feedback** | 操作后 100ms 内有视觉响应 | `active: scale-[0.98]` 按压反馈 + 加载状态 |

### 4.2 交互反馈规范

- **按钮点击**：轻微缩放 `scale(0.98)` + 颜色瞬时加深
- **卡片悬停**：`translateY(-4px)` + 阴影从 `sm` → `md`
- **表单提交**：按钮进入 loading 状态（禁用 + spinner）
- **异步操作**：乐观更新（先展示成功，失败后回滚并显示错误 Toast）
- **页面切换**：顶部 `animate-fade-in-up` 动画，`key={pathname}`

### 4.3 错误处理规范

- **表单验证错误**：字段级 inline error + 顶部总结 alert；第一个错误字段自动 focus
- **网络错误**：离线徽章 + "重新加载"按钮；已缓存内容保留并展示"离线模式"提示
- **服务器错误 (5xx)**：友好错误页面 + 一键重试按钮
- **权限错误 (4xx)**：引导登录 / 联系管理员

### 4.4 空状态设计规范

**必须包含**：
1. 语义化插图（SVG 风格，与品牌色一致）
2. 主标题（一句话说明当前状态）
3. 辅助描述（解释原因 / 下一步操作）
4. **至少一个 CTA 按钮**（引导用户离开空状态）

**常见场景**：暂无学习记录、搜索无结果、网络异常、收藏为空

---

## 5. 响应式断点 Responsive Breakpoints

| Tailwind Token | 屏幕宽度 | 设计目标 |
|----------------|---------|---------|
| `sm`  | 640px+  | 小屏手机 → 大手机 |
| `md`  | 768px+  | 平板横屏 |
| `lg`  | 1024px+ | 桌面完整布局（双列网格变为双列） |
| `xl`  | 1280px+ | 大屏优化 |
| `2xl` | 1536px+ | 最大内容宽度 `1440px` 居中 |

> 原型页面使用原生 CSS media queries，Next.js 源码使用 Tailwind 对应 tokens。

---

## 6. 页面原型 Page Prototypes

详见 [`prototype/index.html`](../prototype/index.html)，包含三个可切换页面：

- **首页 Home**：Hero 主标题 + "永" 字展示卡 + 6 个功能卡片 + Stats 数据条
- **学习 Learn**：12 个汉字网格（可点击切换）+ 汉字详情面板（笔画/部首/结构/掌握度）
- **练习 Practice**：3 种学习模式卡片选择 + 周进度面板（7 天格子 + 统计数据）

---

## 7. 相关文档 Related

- [项目概述](01-overview.md)
- [技术架构](02-architecture.md)
- [开发指南](03-development.md)
- [原型文件目录](../prototype/)
