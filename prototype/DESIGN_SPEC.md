# HanziMaster 原型设计规范文档

> 版本 v5.2.18 · 与 `openspec/07-design-prototype.md` 互为补充，本文聚焦**原型交付侧**的细化规范（图标、布局网格、交互模式库、反馈/错误/空状态规范）。
> Design Token 单一来源为 `src/app/globals.css` 的 `@theme` 块，原型文件（`prototype.html` / `wireframes.html` / `learn.html` / `practice.html` / `progress.html` / `character-detail.html`）中的 CSS 变量须与之对齐。

---

## 1 · 设计系统规范

### 1.1 色彩规范

- **语义色 token**（`@theme` 权威）：`--color-background / foreground / primary / secondary / muted / card / popover / accent / destructive / border / input / ring / success / warning / info`，详见 `07-design-prototype.md §2.1`。
- **品牌色约束**：朱砂红 `--primary #c53d43` 为唯一强调色，用于主操作、选中态、链接；靛蓝 `--accent #4f46e5` 为辅助色，用于次要信息（拼音标注、分类指示）。
- **深色模式**：通过 `.dark` 类覆盖 CSS 变量，**禁止** Tailwind `dark:` 前缀覆盖语义色。
- **禁止**：组件内联 `style="color:#xxx"`；任意色值硬编码；多主色竞用造成视觉噪点。

### 1.2 字体规范

| 角色 | Token | 字体 | 用途 |
|------|-------|------|------|
| 展示标题 | `--font-display` | Playfair Display | Hero / 页面大标题 / 统计数字 |
| 组件标题 | `--font-heading` | Playfair Display | 卡片标题、弹窗标题 |
| 汉字展示 | `--font-serif` | Noto Serif SC | 汉字字形、书写练习 |
| 界面正文 | `--font-sans` | Space Grotesk | 所有 UI 文本 |
| 代码/拼音 | `--font-mono` | JetBrains Mono | 拼音标注、键位、技术文本 |

- 工具类：`.display-font` / `.serif-font` / `.mono-font`。
- 汉字字形统一用 `font-weight:500`，保证笔画清晰。

### 1.3 间距与布局规范

- **8px 网格**：所有间距取自 `4 / 8 / 16 / 24 / 32 / 48 / 64 / 80 / 120px`（Tailwind `1/2/4/6/8/12/16/20/30`）。
- **容器**：页面最大宽度 `1200px`（学习/进度）/ `880px`（练习），居中，左右内边距 `24px`（移动端 `16px`）。
- **栅格**：
  - 汉字网格：移动 1 列 / `sm` 2 列 / `md` 3 列 / `lg` 6 列。
  - 统计卡：自适应 `minmax(200px,1fr)`。
  - 双栏布局断点 `820px`（以下转单列）。
- **阅读宽度**：正文 ≤ 680px；空状态描述 ≤ 280px。
- **触控目标**：最小 `44px`（`.touch-target`）。

### 1.4 圆角规范

| Token | 值 | 用途 |
|-------|-----|------|
| `rounded-sm` | 8px | 小标签、搜索图标按钮 |
| `rounded-md` | 12px | 按钮、输入框 |
| `rounded-lg` | 16px | 卡片、弹窗内容 |
| `rounded-xl` | 20px | 大卡片 |
| `rounded-2xl` | 24px | 下拉/选择菜单 |
| `rounded-3xl` | 28px | 弹窗（Dialog/Sheet） |
| `rounded-4xl` | 32px | Hero 卡片 |

**禁止**任意值 `rounded-[Npx]`。

### 1.5 阴影规范

`shadow-ink`（卡片默认）/ `shadow-ink-lg`（hover）/ `shadow-ink-xl`（弹窗）/ `shadow-vermilion-glow`（选中态）。

### 1.6 图标规范

- **图标来源**：内联 SVG 或 Unicode 符号（原型阶段），生产环境统一接入 `lucide-react` 图标集，线宽 `1.5`，圆角端点。
- **语义映射**：导航/操作类用线性图标；业务特征卡用渐变方形容器（`80px`，`linear-gradient(135deg, primary, accent)`）包裹大号符号。
- **尺寸**：工具图标 `18–20px`；特征卡图标 `34px`；空状态图标 `28px`（圆形容器 `64px`）。
- **颜色**：图标默认继承 `currentColor` 或 `muted-foreground`；选中/激活态转 `primary`。
- **可访问性**：装饰性图标 `aria-hidden="true"`；功能性图标须有 `aria-label` 或关联文本。

### 1.7 动效规范

- **时长**：`--dur-fast 0.15s`（微交互）/ `--dur-normal 0.25s`（状态切换）/ `--dur-slow 0.4s` / `--dur-lg 0.6s`（页面/入场）。
- **缓动**：`--ease-out`（出场）/ `--ease-spring`（弹性回弹，如按钮、开关）/ `--ease-smooth`（通用）。
- **预设动画**：`brush-stroke`（笔触揭示）、`ink-spread`（墨水扩散入场）、`paper-flip`（卡片翻转）、`fade-in-elegant`（页面加载）、`float-gentle`（背景浮动）、`slide-in-right`（Toast）、`accordion-down/up`。
- **无障碍**：`prefers-reduced-motion: reduce` 时所有动画/过渡降至 `0.01ms`。

---

## 2 · 组件库规范

> 完整组件清单、变体与代码级规范见 `wireframes.html`（可交互组件库）。本节给出分类索引与契约要点。

### 2.1 基础组件（`src/components/ui/`）

| 组件 | 关键契约 |
|------|---------|
| Button | 6 变体（default/outline/secondary/ghost/destructive/link）；hover 上移 2px + 光环；active 下移 1px；3 尺寸 |
| Input | 2px 边框；focus 朱砂红 + 4px 光环；错误态 `destructive` 边 + 文案 |
| Badge | 8 语义变体；`rounded-full`；用于学习状态（已掌握/复习中/新词） |
| Card | 玻璃态 + hover 上移 8px；`default/sm` |
| Switch | checked 朱砂红，未选水墨灰；`role="switch"` + `aria-checked` |
| Tabs | 激活态朱砂红下划线 |
| Tooltip / Separator / Skeleton | 遵循 token，无独立样式偏离 |

### 2.2 复合组件

Dialog（玻璃态 + 缩放入场 + `role="dialog"` + Escape 关闭）、Sheet（右侧抽屉 + 背景遮罩）、Select（触发器 ink 边框 + vermilion focus）、DropdownMenu、Accordion（`accordion-down/up` 动画）。

### 2.3 业务组件（`src/components/`）

FeatureCard（80px 渐变图标 + 标题 hover 上移 8px）、StatsCard（`accentVariant: vermilion/indigo/success`，顶部 3px 装饰条）、EmptyState（64px 圆形图标 + 描述 + CTA）、Toast（4 类型，右上 `top-20 right-4`，`slide-in-right`）、NavLink（active 淡朱砂 + 底部圆点）、MobileNav（右侧抽屉）、LayoutClient（玻璃态 header + skip-link）。

### 2.4 组件使用规则

1. **间距**：卡片内边距 24px；元素间距遵循 8px 网格。
2. **状态**：默认 → hover（上移+阴影）→ focus（朱砂光环）→ 选中（淡朱砂底）→ 禁用（opacity 0.5）→ 加载（Skeleton pulse）→ 错误（destructive 边 + 文案）。
3. **无障碍**：`focus-visible` 2px `ring` 轮廓 + 2px offset；交互元素带 ARIA 角色与状态属性；Skip-link 至 `#main-content`。
4. **正反例**：✓ 用 token 类与 token 圆角；✗ 内联色值 / `dark:` 前缀 / 任意圆角。

---

## 3 · 交互标准

### 3.1 交互模式库

| 模式 | 触发 | 视觉表现 |
|------|------|---------|
| 页面切换 | 路由/视图切换 | `fade-in-elegant` 0.6s + `scroll-behavior:smooth` |
| 滚动揭示 | 元素进入视口 | `.reveal` + `.is-visible`，Intersection Observer |
| 错峰入场 | 列表/网格加载 | `.stagger-children`，6 阶延迟 0/120/240/360/480/600ms |
| Hero 入场 | 首页加载 | eyebrow → title → subtitle → CTA → visual 顺序 |
| 模态弹窗 | 打开 Dialog | 背景模糊遮罩 + 内容缩放入场 |
| 抽屉 | 打开 Sheet/MobileNav | 右侧滑入 + 遮罩 + Escape 关闭 |
| 汉字详情 | 点击汉字卡 | 弹窗展示笔顺/词语/字义，Tab 切换 |
| 即时校验 | 输入/失焦 | 实时边框变色 + 错误文案，无需提交 |

### 3.2 交互反馈规范

| 场景 | 反馈 |
|------|------|
| 按钮点击 | active 下移 1px |
| 卡片悬停 | 上移 8px + `shadow-ink-lg` |
| 表单聚焦 | 朱砂红边框 + `ring-primary/20` 光环 |
| 操作成功 | Toast success（绿，3s 自动消失） |
| 操作失败 | Toast error（红，5s 自动消失） |
| 加载中 | Skeleton `animate-pulse` |
| 书写完成 | 笔顺步骤逐格变朱砂红（`step.done`） |
| 测验作答 | 正确选项绿底、错误选项红底 + 显示正确答案 |

### 3.3 错误处理规范

| 场景 | 处理 |
|------|------|
| 表单验证 | 实时校验，错误边框 + 错误文案，阻止提交 |
| 网络错误 | Toast error + 重试按钮（如空状态「加载失败」） |
| 权限不足 | Toast warning + 引导文案 |
| 测验错误 | 即时红框 + 正确答案揭示，不阻断流程 |
| 无搜索结果 | EmptyState「未找到结果」+ 清除筛选按钮 |

### 3.4 空状态设计规范

所有空状态使用 `EmptyState` 组件，结构：**64px 圆形图标 + 标题 + 描述（≤280px）+ CTA 按钮**。常见场景：

| 场景 | 图标 | 文案 | CTA |
|------|------|------|-----|
| 无学习记录 | 📭 | 开始你的第一个汉字吧 | 开始学习 |
| 无搜索结果 | 🔍 | 试试其它关键词 | 清除筛选 |
| 加载失败 | ⚠️ | 网络似乎开了小差 | 重试 |
| 无收藏 | ⭐ | 还没有收藏的汉字 | 去浏览 |

---

## 4 · 原型文件索引

| 文件 | 用途 |
|------|------|
| `prototype.html` | 首页高保真交互原型（Hero / 功能 / 汉字展示） |
| `wireframes.html` | 组件库规范（基础/复合/业务组件 + 使用规则） |
| `learn.html` | 学习页（汉字网格、筛选、详情弹窗） |
| `practice.html` | 练习页（选择题、书写练习、进度条） |
| `progress.html` | 进度页（统计卡、热力图、掌握度、活动流） |
| `character-detail.html` | 汉字学习卡变体探索（设计探索，非最终） |

---

*本文档为原型交付规范，权威设计系统定义见 `openspec/07-design-prototype.md`。两者冲突时以 `07` 为准。*
