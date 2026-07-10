# HanziMaster 设计规范文档 v4.0

## 1. 设计概述

### 1.1 设计理念

- **东方水墨美学**：融合中国传统书法艺术与现代极简设计
- **现代美感**：使用水墨灰、朱砂红、靛蓝作为主色调，纸张纹理背景
- **响应式设计**：完美适配桌面端、平板和移动端
- **无障碍支持**：支持深色/浅色/系统主题，11 种语言，键盘导航

### 1.2 设计原则

1. **内容优先**：汉字是界面的主角，UI 元素不应抢夺注意力
2. **克制用色**：以水墨灰为主，朱砂红作为唯一强调色，靛蓝作为辅助色
3. **呼吸感**：大量留白，元素间距遵循 8px 网格系统
4. **一致性**：所有组件遵循统一的设计语言

## 2. 设计系统

### 2.1 色彩系统

#### 2.1.1 水墨灰系列 (ink)

| 色值 | 用途 | 浅色模式 | 深色模式 |
|------|------|----------|----------|
| ink-50 | 页面背景 | `#faf9f6` | - |
| ink-100 | 卡片背景 | `#f3f1eb` | - |
| ink-200 | 边框/分隔线 | `#e5e1d8` | `#2d2d2d` |
| ink-300 | 禁用状态 | `#c9c2b5` | `#4a4a4a` |
| ink-400 | 次要文本 | `#a69c89` | `#6b6356` |
| ink-500 | 辅助文本 | `#867d6a` | `#867d6a` |
| ink-600 | 正文 | `#6b6356` | `#c9c2b5` |
| ink-700 | 强调文本 | `#564f45` | `#e5e1d8` |
| ink-800 | 标题 | `#48433b` | `#f3f1eb` |
| ink-900 | 主标题 | `#1a1a1a` | `#faf9f6` |
| ink-950 | 深色背景 | - | `#0d0d0d` |

#### 2.1.2 朱砂红系列 (vermilion)

| 色值 | 用途 | 色值 |
|------|------|------|
| vermilion-50 | 成功背景 | `#fef2f2` |
| vermilion-100 | 悬停背景 | `#fee2e2` |
| vermilion-200 | 边框 | `#fecaca` |
| vermilion-300 | 图标 | `#fca5a5` |
| vermilion-400 | 高亮 | `#f87171` |
| vermilion-500 | **主品牌色** | `#c53d43` |
| vermilion-600 | 悬停状态 | `#9b2c2c` |
| vermilion-700 | 深色模式 | `#7f2727` |
| vermilion-800 | 强调 | `#6b2727` |
| vermilion-900 | 最深 | `#5a2525` |

#### 2.1.3 靛蓝系列 (indigo)

| 色值 | 用途 | 色值 |
|------|------|------|
| indigo | 辅助品牌色 | `#4f46e5` |
| indigo-foreground | 文字 | `#ffffff` |

#### 2.1.4 状态色

| 颜色名 | 用途 | 色值 |
|--------|------|------|
| Green | 成功状态 | `#34c759` |
| Red | 错误状态 | `#ef4444` |
| Amber | 警告状态 | `#f59e0b` |
| Blue | 信息状态 | `#3b82f6` |

#### 2.1.5 渐变色

| 渐变名 | 用途 | 色值 |
|--------|------|------|
| Vermilion Gradient | 主要强调 | `linear-gradient(135deg, #c53d43 0%, #9b2c2c 100%)` |
| Subtle Gradient | 卡片装饰 | `linear-gradient(135deg, #c53d43/10 0%, #4f46e5/10 100%)` |

### 2.2 字体系统

#### 2.2.1 字体家族

| 字体 | 用途 | 字重 |
|------|------|------|
| Playfair Display | 展示标题 | 400, 700 |
| Noto Serif SC | 汉字字体 | 400, 700 |
| Space Grotesk | 界面字体 | 400, 500, 600 |
| JetBrains Mono | 代码字体 | 400, 500 |

#### 2.2.2 字体大小系统

| Token | 大小 | 行高 | 用途 |
|-------|------|------|------|
| xs | 11px | 1.4 | 辅助标签、徽章 |
| sm | 13px | 1.5 | 小型文本、按钮 |
| base | 15px | 1.5 | 正文、默认 |
| lg | 17px | 1.5 | 强调文本 |
| xl | 19px | 1.4 | 小标题 |
| 2xl | 24px | 1.3 | 中标题 |
| 3xl | 32px | 1.2 | 大标题 |
| 4xl | 40px | 1.15 | 页面标题 |
| 5xl | 56px | 1.05 | Hero 标题 |
| 6xl | 72px | 1.02 | 超大标题 |

#### 2.2.3 字重规范

| 字重 | 值 | 用途 |
|------|-----|------|
| Light | 300 | 大字展示、装饰性文字 |
| Regular | 400 | 正文、描述文本 |
| Medium | 500 | 按钮、导航、标签 |
| Semibold | 600 | 小标题、强调 |
| Bold | 700 | 大标题、Hero |

### 2.3 间距系统

#### 2.3.1 基础间距 (8px 网格)

| Token | 值 | 用途 |
|-------|-----|------|
| xs | 4px | 极小间距 |
| sm | 8px | 紧凑间距 |
| md | 16px | 默认间距 |
| lg | 24px | 组件间距 |
| xl | 32px | 区块间距 |
| 2xl | 48px | 大区块间距 |
| 3xl | 64px | 页面间距 |
| 4xl | 80px | Section 间距 |
| 5xl | 120px | Hero 间距 |

#### 2.3.2 圆角系统

| Token | 值 | 用途 |
|-------|-----|------|
| sm | 8px | 小标签、输入框 |
| md | 12px | 按钮、小卡片 |
| lg | 16px | 卡片、面板 |
| xl | 20px | 大卡片 |
| 2xl | 24px | 弹窗、大面板 |
| 3xl | 28px | 展示卡片 |
| 4xl | 32px | Hero 卡片 |
| full | 9999px | 胶囊按钮 |

### 2.4 阴影系统

| Token | 值 | 用途 |
|-------|-----|------|
| shadow-ink | `0 4px 20px rgba(26, 26, 26, 0.08)` | 卡片默认 |
| shadow-ink-lg | `0 8px 40px rgba(26, 26, 26, 0.12)` | 卡片悬停 |
| shadow-ink-xl | `0 12px 60px rgba(26, 26, 0.16)` | 弹窗、抽屉 |
| shadow-vermilion-glow | `0 0 30px rgba(197, 61, 67, 0.2)` | 选中状态 |

### 2.5 动效系统

#### 2.5.1 动画时长

| Token | 值 | 用途 |
|-------|-----|------|
| duration-fast | 0.15s | 微交互、hover |
| duration-normal | 0.25s | 状态切换 |
| duration-slow | 0.4s | 页面过渡 |
| duration-lg | 0.6-0.8s | 入场动画 |

#### 2.5.2 缓动函数

| Token | 值 | 用途 |
|-------|-----|------|
| ease-out | `cubic-bezier(0.22, 1, 0.36, 1)` | 默认退出 |
| ease-spring | `cubic-bezier(0.175, 0.885, 0.32, 1.275)` | 弹性效果 |
| ease-smooth | `cubic-bezier(0.4, 0, 0.2, 1)` | 平滑过渡 |

#### 2.5.3 预设动画

| 动画名 | 效果 | 使用场景 |
|--------|------|---------|
| brush-stroke | 毛笔笔触 | 汉字展示 |
| ink-spread | 墨水扩散 | 元素入场 |
| paper-flip | 纸张翻转 | 卡片切换 |
| fade-in-elegant | 优雅淡入 | 页面加载 |
| float-gentle | 轻柔浮动 | 背景装饰 |

## 3. 组件库规范

### 3.1 基础组件

#### 3.1.1 Button 按钮

**变体 (Variants)**:
- `default`: 主按钮，朱砂红背景白字
- `outline`: 边框按钮，透明背景
- `secondary`: 次要按钮，水墨灰背景
- `ghost`: 幽灵按钮，仅文字+悬停背景
- `destructive`: 危险操作，红色系
- `link`: 链接样式按钮

**尺寸 (Sizes)**:
- `xs`: 28px 高
- `sm`: 36px 高
- `default`: 40px 高
- `lg`: 48px 高
- `icon`: 40px 正方形
- `icon-sm`: 32px 正方形
- `icon-lg`: 48px 正方形

**状态 (States)**:
- Normal: 默认状态
- Hover: `translateY(-0.5px)` + 阴影增强
- Active: `translateY(0.5px)`
- Disabled: `opacity: 0.5` + `pointer-events: none`
- Focus: 2px ring + vermilion-500/30

#### 3.1.2 Input 输入框

**状态**:
- Default: 2px border `#e5e1d8`
- Focus: border `#c53d43` + `box-shadow: 0 0 0 4px rgba(197,61,67,0.15)`
- Error: border `#ef4444` + `box-shadow: 0 0 0 4px rgba(239,68,68,0.15)`
- Disabled: `opacity: 0.5`

#### 3.1.3 Badge 徽章

**变体**:
- `default`: 朱砂红背景白字
- `secondary`: 水墨灰背景
- `outline`: 边框徽章
- `ghost`: 透明徽章
- `success`: 绿色背景
- `warning`: 琥珀色背景
- `info`: 蓝色背景
- `destructive`: 红色背景

### 3.2 复合组件

#### 3.2.1 Card 卡片

**样式**:
- 背景: `rgba(255,255,255,0.8)` + `backdrop-blur-xl`
- 圆角: 20px
- 边框: 1px `#e5e1d8`
- 阴影: 无 (默认) → `shadow-ink-lg` (悬停)
- 过渡: `transform 0.3s`, `box-shadow 0.3s`

#### 3.2.2 Dialog 对话框

**样式**:
- 遮罩: `bg-ink-900/30` + `backdrop-blur-sm`
- 容器: 圆角 24px, 最大宽度 520px-600px
- 背景: `rgba(255,255,255,0.95)` + `backdrop-blur-xl`
- 动画: `fade-in-elegant` + `scale-in`

#### 3.2.3 Sheet 抽屉

**样式**:
- 遮罩: `bg-ink-900/30` + `backdrop-blur-sm`
- 容器: 右侧滑入, 宽度 288px, 最大 85vw
- 背景: `rgba(255,255,255,0.95)` + `backdrop-blur-xl`
- 动画: `slide-in-right`

### 3.3 业务组件

#### 3.3.1 FeatureCard 功能卡片

**结构**:
- 图标容器: 80px, 渐变背景, 圆角 20px
- 标题: 20px, Semibold, Playfair Display
- 描述: 15px, Regular, 水墨灰

**交互**:
- Hover: `translateY(-8px)` + `shadow-ink-lg` + 图标 `scale(1.1)`
- 过渡: `0.3s cubic-bezier(0.22, 1, 0.36, 1)`

#### 3.3.2 StatsCard 统计卡片

**结构**:
- 数值: 36px, Bold, 品牌色
- 标签: 14px, Medium, 水墨灰
- 顶部装饰线: 3px 高, 品牌色

**交互**:
- Hover: `translateY(-4px)` + `shadow-ink`

#### 3.3.3 EmptyState 空状态

**结构**:
- 图标容器: 64px, 灰色背景圆形
- 标题: 18px, Semibold
- 描述: 15px, 灰色, 最大宽度 280px
- 操作按钮: 主要或次要按钮

**使用场景**:
- 无学习记录
- 无搜索结果
- 加载失败
- 无网络连接

#### 3.3.4 Toast 通知

**类型**:
- `success`: 绿色背景, 勾选图标, 3s 自动消失
- `error`: 红色背景, X 图标, 5s 自动消失
- `warning`: 琥珀色背景, 警告图标, 4s 自动消失
- `info`: 蓝色背景, 信息图标, 3s 自动消失

**行为**:
- 位置: 固定右上角, `z-index: 100`
- 动画: 右侧滑入, 淡出消失
- 堆叠: 多个 Toast 垂直排列, 间距 8px

## 4. 页面原型

### 4.1 首页 (Home)

#### 4.1.1 Hero 区域规范

- 最小高度: `calc(100svh - header-height)` 或 `90vh`
- 内容居中，max-width: 1152px (max-w-6xl)
- Eyebrow: 17px-21px, Medium, 朱砂红
- 主标题: 48px-72px, Bold, 行高 1.02-1.05, Playfair Display
- 副标题: 20px-28px, Regular, 水墨灰
- CTA: 主要按钮 (pill) + 次要按钮 (outline)

### 4.2 学习页面 (Learn)

#### 4.2.1 汉字选择网格

- 网格: 2-6 列 (响应式)
- 卡片尺寸: 1:1 宽高比
- 汉字大小: 40px-56px
- 选中状态: 朱砂红背景 + 白字 + 光晕阴影

### 4.3 练习页面 (Practice)

#### 4.3.1 练习选项卡片

- 布局: 1-3 列 (响应式)
- 卡片样式: 玻璃态 + 渐变背景图标
- 悬停效果: `translateY(-8px)` + 阴影

## 5. 交互标准

### 5.1 交互模式

- 页面切换: `fade-in-elegant` 动画, 0.6s
- 滚动行为: `scroll-behavior: smooth`
- 当前页面指示: 导航项底部圆点

### 5.2 反馈机制

- 加载状态: 骨架屏 `animate-pulse`
- 成功状态: Toast 绿色背景, 顶部滑入, 3s 自动消失
- 错误状态: Toast 红色背景, 顶部滑入, 5s 自动消失

### 5.3 错误处理

- 表单验证: 实时验证, 红色边框 + 错误文字
- 网络错误: 重试按钮 + 离线提示横幅

### 5.4 空状态

- 图标: 64px, 灰色背景圆形
- 标题: 18px, Medium
- 描述: 15px, 灰色, 最大宽度 280px
- 操作按钮: 主要或次要按钮

## 6. 响应式设计

### 6.1 断点

| 断点 | 宽度 | 设计调整 |
|------|------|----------|
| sm | 640px+ | 移动端优化 |
| md | 768px+ | 平板适配 |
| lg | 1024px+ | 桌面端完整布局 |
| xl | 1280px+ | 大屏幕优化 |

### 6.2 移动端适配

- 导航: 汉堡菜单 + 抽屉
- 汉字网格: 3-4 列 → 2-3 列
- 功能卡片: 3 列 → 1 列
- 统计卡片: 3 列 → 1 列
- 触控目标: 最小 44px

## 7. 无障碍设计

### 7.1 键盘导航

- Tab 顺序: 逻辑顺序
- Focus 可见: 2px outline, `#c53d43`
- Skip link: 跳转到主要内容

### 7.2 屏幕阅读器

- ARIA 标签: 所有交互元素
- 角色: `role="listbox"`, `role="option"`, `role="dialog"`
- 状态: `aria-selected`, `aria-expanded`, `aria-hidden`

### 7.3 减少动画

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## 8. 原型文件

### 8.1 文件位置

**高保真原型**: [../prototype/prototype.html](../prototype/prototype.html)

### 8.2 原型功能

- 完整的响应式设计
- 深色/浅色主题切换
- 页面切换导航
- 组件交互演示
- 设计系统展示

## 9. 相关文档

- [项目概述](01-overview.md)
- [技术架构](02-architecture.md)
- [开发指南](03-development.md)
- [API 参考](04-api-reference.md)