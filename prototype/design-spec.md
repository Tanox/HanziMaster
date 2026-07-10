# HanziMaster 设计规范 v4.0

## 设计规划

### Visual Thesis
像 Apple 原生应用般纯净的汉字学习界面，以大量留白、精致的排版层次和克制的 Apple Blue 强调色，让每一次交互都像在触摸一本精装的中文典籍。

### Content Plan
1. **Hero**: HanziMaster 品牌 + "掌握汉字之美" + 开始学习 CTA + 永字视觉展示
2. **Support**: 三大核心功能（AI智能学习、书写练习、进度追踪）
3. **Detail**: 汉字学习流程展示、词组例句
4. **Final CTA**: 开始你的汉字学习之旅

### Interaction Thesis
1. Hero 区域内容按层次渐入（eyebrow → title → subtitle → CTA → visual card）
2. 滚动触发的内容揭示动画（Intersection Observer + fade-in-up）
3. 汉字选择卡片的悬停缩放 + 选中状态的光晕效果

## 设计系统

### 色彩
- 主色: `#007aff` (Apple Blue)
- 辅助色: `#af52de` (Apple Purple)
- 成功: `#34c759`
- 错误: `#ff3b30`
- 背景: 纯白 / 深灰 `#1d1d1f`

### 字体
- 英文: Inter (300, 400, 500, 600, 700)
- 中文: Noto Sans SC (300, 400, 500, 700, 800)
- 代码: JetBrains Mono

### 间距
- 基于 8px 网格
- xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px, 2xl: 48px, 3xl: 64px, 4xl: 80px

### 圆角
- xs: 8px, sm: 12px, md: 16px, lg: 20px, xl: 24px, 2xl: 32px, pill: 980px

### 动效
- Fast: 0.15s, Normal: 0.25s, Slow: 0.4s, Large: 0.6s
- Easing: `cubic-bezier(0.4, 0, 0.2, 1)`

## 组件库

### 基础组件
- Button: default / outline / ghost / destructive / link
- Input: default / focus / error / success / disabled
- Badge: default / success / warning / purple

### 复合组件
- Card: header + content + footer
- Dialog: 遮罩 + 内容 + 动画
- Sheet: 右侧滑入抽屉

### 业务组件
- FeatureCard: 图标 + 标题 + 描述 + 悬停效果
- StatsCard: 数值 + 标签 + 顶部装饰线
- CharacterCard: 汉字 + 拼音 + 选中状态

## 交互标准

### 反馈
- Hover: scale(1.02) + 阴影
- Active: scale(0.98) + translateY(1px)
- Focus: 2px outline #007aff + 2px offset

### 错误
- 表单: 红色边框 + 错误文字
- Toast: 红色背景 + 顶部滑入

### 空状态
- 图标 + 标题 + 描述 + CTA 按钮
