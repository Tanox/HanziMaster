# HanziMaster UI/UX 专业审查报告

> 审查日期：2026-06-02 | 审查版本：v2.2.0  
> 审查视角：资深 UI/UX 设计师

---

## 一、总体评分

| 维度 | 评分 | 说明 |
|------|------|------|
| 视觉设计 | ⭐⭐⭐⭐ | 配色和谐，暗黑模式完整，圆角语言统一 |
| 交互设计 | ⭐⭐⭐ | 存在多个可用性缺陷（见下文） |
| 信息架构 | ⭐⭐⭐ | 层级清晰但存在死链接和冗余入口 |
| 响应式适配 | ⭐⭐⭐ | 断点丰富但部分页面不一致 |
| 无障碍性 | ⭐⭐⭐ | 基础覆盖但有遗漏 |
| 性能与动效 | ⭐⭐⭐⭐ | 动效克制优雅，但缺乏页面过渡 |

**综合评分：3.3 / 5.0**

---

## 二、🔴 严重问题（需立即修复）

### 2.1 主题切换丢失 'system' 模式

**位置**：`src/components/theme-toggle.tsx`

**问题**：ThemeToggle 只在 `'dark'` 和 `'light'` 之间切换，完全丢失了 `'system'` 选项。用户一旦手动切换后，无法恢复为跟随系统。

**当前代码逻辑**：
```ts
if (theme === 'dark') { setTheme('light'); }
else { setTheme('dark'); }
```

**影响**：
- 用户在日间手动切到暗色后，夜间使用系统会自动跟随暗色，但用户被锁定在暗色
- 违背了 `ThemeProvider` 初始化为 `'system'` 的设计意图

**严重程度**：🔴 高 - 核心交互功能缺陷

### 2.2 语言切换下拉框缺少 ARIA 属性和键盘支持

**位置**：`src/components/locale-toggle.tsx`

**问题**：
- 无 `aria-expanded`、`aria-haspopup` 属性
- 无 `role="menu"` / `role="menuitem"` 标签
- 不支持 Escape 关闭、Arrow 键导航
- 列表过长(11种语言)，高度溢出屏幕底部无处理

**严重程度**：🔴 高 - 无障碍合规问题

### 2.3 移动端抽屉内容冗余

**位置**：`src/app/layout.tsx` (MobileNav 组件)

**问题**：
- 主题切换、语言切换在 Header 和 Drawer 中各出现一次（重复）
- 登录按钮存在于 Drawer 底部，但系统无认证功能
- 导航链接使用 emoji 图标(🏠📖✏️)，与项目专业风格不匹配

**严重程度**：🟡 中 - 体验割裂

---

## 三、🟡 中等问题

### 3.1 首页两 CTA 按钮指向同一目标

**位置**：`src/app/page.tsx` 第 66-85 行

**问题**："开始学习"和"浏览字库"两个按钮都链接到 `/learn`，用户期望不同行为。建议：
- "开始学习" → `/learn`（字符学习页）
- "浏览字库" → `/practice`（练习中心）

### 3.2 字符网格点击逻辑反直觉

**位置**：`src/app/learn/page.tsx` 第 37-40 行

**问题**：点击已选中的字符会取消选择 → 详情面板消失。用户期望重新点击应当保持选中或滚动回顶部。更自然的做法：
- 再次点击不取消，或提供明确的"关闭"按钮
- 首次点击时平滑滚动至详情面板

### 3.3 Status Badge 文本拼接不当

**位置**：`src/app/page.tsx` 第 47 行

**问题**：`AI {t('home.heroTitle')}` 拼接后显示 "AI Master Chinese" / "AI 精通中文"  
语义上像是"AI 精通中文"而非"AI 驱动的中文学习平台"。应使用独立的翻译键。

### 3.4 Practice 页面响应式间距不一致

**位置**：`src/app/practice/page.tsx` 第 90 行

**问题**：
- 容器使用 `px-6`（无移动端变体），而其他页面使用 `px-4 sm:px-6`
- 移动端 7 列周进度网格过度拥挤，触控目标不足 44px

### 3.5 页脚死链接

**位置**：`src/app/layout.tsx` 第 241-242 行

**问题**：`About` 和 `Contact` 链接指向 `#`，无实际内容。应移除或指向有效页面。

---

## 四、🟢 优化建议

### 4.1 添加页面间过渡动画

当前页面切换为即时跳转，无过渡。建议为 `<main>` 添加 `animate-fade-in-up` 或使用 `layoutTransition`。

### 4.2 优化 Hero 区域的空间利用

- Hero 左侧描述文字 `max-w-lg` 在大屏(≥1440px)下留下大量空白
- 右侧演示卡片在小屏时被挤压到底部，建议在 768-1024px 区间使用更合理的布局

### 4.3 补充 Loading Skeleton

所有页面均为 CSR，但无加载状态。建议为字符网格添加 skeleton 占位。

### 4.4 Practice 卡片点击缺少反馈

选择练习模式后仅边框颜色变化，建议增加：
- 选中态使用填充色背景
- 非选中态降低不透明度

### 4.5 字体加载优化

当前 Google Fonts 加载使用 `display=swap` 但无 `font-display` CSS 备用。建议添加 `font-display: swap` 到 `@theme` 中。

---

## 五、优化实施清单

| # | 优化项 | 文件 | 优先级 | 预计工时 |
|---|--------|------|--------|----------|
| 1 | 主题切换支持 system 模式 | theme-toggle.tsx | 🔴 | 15 min |
| 2 | 语言下拉无障碍增强 | locale-toggle.tsx | 🔴 | 20 min |
| 3 | 移动端抽屉去重去 emoji | layout.tsx | 🟡 | 15 min |
| 4 | 首页 CTA 差异化链接 | page.tsx | 🟡 | 5 min |
| 5 | 字符网格不取消选择 | learn/page.tsx | 🟡 | 10 min |
| 6 | Status Badge 文本修正 | page.tsx | 🟡 | 5 min |
| 7 | Practice 响应式间距 | practice/page.tsx | 🟡 | 10 min |
| 8 | 移除页脚死链接 | layout.tsx | 🟢 | 2 min |
| 9 | 添加页面过渡动效 | globals.css + layout.tsx | 🟢 | 10 min |
| 10 | 字体加载优化 | globals.css | 🟢 | 5 min |

---

## 六、响应式断点一致性审计

当前项目各页面使用的 padding 断点对比：

| 页面 | 容器 padding | 标题字号 | 卡片 gap |
|------|-------------|----------|----------|
| Home | `px-4 sm:px-6` | `text-4xl sm:text-5xl lg:text-7xl` | `gap-6 sm:gap-8` |
| Learn | `px-4 sm:px-6` | `text-2xl sm:text-3xl lg:text-4xl` | `gap-3 sm:gap-4 lg:gap-5` |
| Practice | `px-6` ⚠️ | `text-4xl lg:text-5xl` | `gap-8` ⚠️ |

**建议**：统一使用 `px-4 sm:px-6` + `gap-3 sm:gap-6 lg:gap-8` 标准。

---

## 七、暗色模式审查

✅ 优秀之处：
- 所有交互元素均有暗色变量
- 阴影在暗色模式下降级合理
- 渐变色彩反向映射到位

⚠️ 可改进：
- Footer 分隔线 `border-slate-200/50` 在暗色下偏低对比度
- Focus ring 始终使用 `#10b981`，暗色下可微调为更亮的绿色
