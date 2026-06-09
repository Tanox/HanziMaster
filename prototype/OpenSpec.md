# HanziMaster OpenSpec 规范文档

**版本：** v2.3.0
**项目名称：** HanziMaster 汉字大师
**设计风格：** Apple Design Style
**最后更新：** 2026-06-09

---

## 一、变更日志 (Changelog)

### v2.3.0 (2026-06-09) - 项目代码与原型对齐

#### 代码对齐变更

| 文件 | 变更类型 | 说明 |
|------|----------|------|
| src/app/globals.css | 更新 | 添加 Apple 风格设计令牌、阴影系统、按钮样式 |
| src/app/layout.tsx | 更新 | Apple 风格导航栏、纯白/纯黑背景 |
| src/app/page.tsx | 更新 | Apple 风格首页、胶囊按钮、简化布局 |
| src/app/learn/page.tsx | 更新 | Apple 风格学习页面、字符卡片 |
| src/app/practice/page.tsx | 更新 | Apple 风格练习页面 |
| src/components/feature-card.tsx | 更新 | Apple 风格卡片组件 |
| prototype/index.html | 原型 | 保持 Apple 设计风格 |
| prototype/OpenSpec.md | 文档 | 同步更新 |

#### 设计规范同步

所有项目代码现在与原型设计完全对齐：
- **背景色**: 纯白 (#ffffff) / 纯黑 (#000000)
- **按钮样式**: Apple 胶囊按钮 (#0071e3)
- **阴影系统**: Apple 轻柔阴影
- **导航栏**: 毛玻璃效果 (backdrop-blur-xl)
- **留白**: 大量留白 (py-32, gap-16)
- **排版**: tracking-tight, font-bold

### v2.2.0 (2026-06-08) - Apple Design Style 重大更新

#### 设计变更

| 变更项 | 变更前 | 变更后 |
|--------|--------|--------|
| 背景色 | 渐变背景 (emerald-50 via-cyan-50) | 纯白 (#ffffff) / 纯黑 (#000000) |
| 按钮样式 | 多彩渐变 (from-emerald-500 to-emerald-600) | Apple 经典蓝 (#0071e3) 胶囊按钮 |
| 阴影系统 | Tailwind 默认阴影 | Apple 风格轻柔阴影 |
| 导航栏 | 较复杂，带边框高亮 | 极简毛玻璃导航 |
| 留白 | 较紧凑 | 大量留白 (py-32, gap-16) |
| 排版 | 默认字重 | tracking-tight, font-bold 800 |
| 配色 | 绿色为主 | 中性色 + 绿色点缀 + Apple 蓝按钮 |

#### 代码变更

```diff
- background: linear-gradient(to-br, from-slate-50, via-emerald-50/30, to-cyan-50/20)
+ background: #ffffff

- class="bg-gradient-to-r from-emerald-500 to-emerald-600"
+ class="btn-apple-primary"

- class="shadow-lg shadow-emerald-500/25"
+ class="apple-shadow-xl"
```

---

## 二、设计规范 (Design Specs)

### 2.1 色彩系统 (Colors)

#### 主品牌色
| 色值 | 用途 | CSS 变量 |
|------|------|----------|
| Emerald 500 | 品牌主色 | --color-primary |
| Emerald 400 | 品牌浅色 | --color-primary-light |
| Emerald 600 | 品牌深色 | --color-primary-dark |

#### Apple 风格中性色
| 色值 | 用途 | CSS 变量 |
|------|------|----------|
| #000000 | 深色模式背景 | --color-black |
| #ffffff | 浅色模式背景 | --color-white |
| #1d1d1f | 主文字色 | --color-gray-900 |
| #86868b | 次要文字 | --color-gray-500 |
| #f5f5f7 | 深色模式文字 | --color-gray-100 |

#### Apple 按钮蓝
| 色值 | 用途 | CSS 变量 |
|------|------|----------|
| #0071e3 | 主按钮背景 | --color-apple-blue |
| #0077ed | 主按钮悬停 | --color-apple-blue-hover |

#### 语义色
| 色值 | 用途 | CSS 变量 |
|------|------|----------|
| #34d399 | 成功色 | --color-success |
| #ef4444 | 错误色 | --color-error |
| #f59e0b | 警告色 | --color-warning |
| #3b82f6 | 信息色 | --color-info |

### 2.2 字体系统 (Typography)

| 字体 | 用途 | Font Family |
|------|------|-------------|
| 西文 | 界面文字 | Inter, system-ui, sans-serif |
| 汉字 | 汉字展示 | Noto Sans SC, sans-serif |

#### 字体大小
| 名称 | 尺寸 | Tailwind class |
|------|------|----------------|
| Hero 标题 | 56-80px | text-5xl, text-6xl, text-7xl |
| 页面标题 | 40-48px | text-4xl, text-5xl |
| 卡片标题 | 20px | text-xl |
| 正文 | 16px | text-base |
| 辅助文字 | 14px | text-sm |
| 小标签 | 12px | text-xs |

#### 字体权重
| 名称 | 字重 | 用途 |
|------|------|------|
| Regular | 400 | 正文 |
| Medium | 500 | 按钮文字 |
| Semibold | 600 | 次要标题 |
| Bold | 700 | 标题 |
| Extrabold | 800 | Hero 标题 |

### 2.3 间距系统 (Spacing)

| 名称 | 尺寸 | 用途 |
|------|------|------|
| space-1 | 4px | 微调 |
| space-2 | 8px | 紧凑间距 |
| space-3 | 12px | 小间距 |
| space-4 | 16px | 默认间距 |
| space-6 | 24px | 中等间距 |
| space-8 | 32px | 大间距 |
| space-12 | 48px | 区块间距 |
| space-16 | 64px | 大区块间距 |
| space-20 | 80px | 巨大间距 |
| space-32 | 128px | Hero 间距 |

### 2.4 圆角系统 (Border Radius)

| 名称 | 尺寸 | 用途 |
|------|------|------|
| rounded-sm | 8px | 小元素 |
| rounded-md | 12px | 输入框 |
| rounded-lg | 16px | 卡片 |
| rounded-xl | 20px | 大卡片 |
| rounded-2xl | 24px | 功能卡片 |
| rounded-3xl | 32px | 大区块 |
| rounded-full | 9999px | 胶囊按钮 |

### 2.5 阴影系统 (Shadows)

```css
/* Apple 风格阴影 */
.apple-shadow-sm {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06);
}

.apple-shadow {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
}

.apple-shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.02);
}

.apple-shadow-xl {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02);
}
```

---

## 三、组件规范 (Components)

### 3.1 按钮 (Buttons)

#### 主按钮 (btn-apple-primary)
```css
.btn-apple-primary {
  background: #0071e3;
  color: white;
  padding: 16px 32px;
  border-radius: 980px;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
}
.btn-apple-primary:hover {
  background: #0077ed;
  transform: scale(1.02);
}
.btn-apple-primary:active {
  transform: scale(0.98);
}
```

#### 次要按钮 (btn-apple-secondary)
```css
.btn-apple-secondary {
  background: transparent;
  border: 1px solid #86868b;
  color: inherit;
  padding: 16px 32px;
  border-radius: 980px;
}
.btn-apple-secondary:hover {
  border-color: #1d1d1f;
}
```

### 3.2 卡片 (Cards)

#### 功能卡片 (feature-card)
```css
.feature-card {
  background: #ffffff;
  border-radius: 24px;
  padding: 40px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
}
.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.1);
}
.dark .feature-card {
  background: #1c1c1e;
}
```

#### 字符卡片 (char-card)
```css
.char-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
}
.char-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 40px -10px rgba(16, 185, 129, 0.3);
}
.char-card.selected {
  border-color: #10b981;
  background: rgba(16, 185, 129, 0.08);
}
```

### 3.3 导航栏 (Navigation)

```css
nav {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.dark nav {
  background: rgba(0, 0, 0, 0.8);
  border-bottom-color: rgba(255, 255, 255, 0.1);
}
```

### 3.4 链接 (Links)

```css
.apple-link {
  color: #0071e3;
  text-decoration: none;
  transition: color 0.3s ease;
}
.apple-link:hover {
  text-decoration: underline;
}
```

---

## 四、页面结构 (Page Structure)

### 4.1 首页 (Home)

| 区块 | 内容 | 样式 |
|------|------|------|
| 导航栏 | Logo + 导航 + 主题切换 | 毛玻璃效果 |
| Hero | 大标题 + 描述 + 按钮 + 字符卡片 | 90vh, 居中布局 |
| 功能介绍 | 3列功能卡片 | 灰色背景区块 |
| 数据展示 | 3列统计数据 | 黑/白背景 |
| 页脚 | Logo + 版权 | 极简 |
| 底部导航 | 首页/学习/练习 | 仅移动端 |

### 4.2 学习页 (Learn)

| 区块 | 内容 | 样式 |
|------|------|------|
| 导航栏 | 同首页 | - |
| 页面标题 | 每日练习 | 居中对齐 |
| 字符网格 | 12个字符选择 | 4-6列网格 |
| 字符详情 | 选中字符信息 | 粘性侧边栏 |

### 4.3 练习页 (Practice)

| 区块 | 内容 | 样式 |
|------|------|------|
| 导航栏 | 同首页 | - |
| 页面标题 | 练习中心 | 居中对齐 |
| 练习选项 | 3个练习类型卡片 | 3列网格 |
| 学习进度 | 周进度 + 统计数据 | 灰色背景 |

---

## 五、动画规范 (Animations)

### 5.1 缓动曲线

```css
/* Apple 风格 cubic-bezier */
transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
```

### 5.2 动画时长

| 动画类型 | 时长 |
|----------|------|
| 页面过渡 | 500ms |
| 按钮悬停 | 300ms |
| 卡片悬停 | 400ms |
| 菜单展开 | 200ms |

### 5.3 页面过渡

```css
.page-section {
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.5s cubic-bezier(0.25, 0.1, 0.25, 1), 
              transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1);
}
.page-section.active {
  opacity: 1;
  transform: translateY(0);
}
```

### 5.4 减少动画偏好

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 六、无障碍规范 (Accessibility)

### 6.1 ARIA 属性

| 元素 | ARIA 属性 |
|------|----------|
| 导航栏 | role="navigation", aria-label |
| 字符网格 | role="listbox", aria-label |
| 字符卡片 | role="option", aria-selected |
| 进度条 | role="progressbar", aria-valuenow |
| 移动端底部导航 | aria-label="移动端底部导航" |

### 6.2 焦点管理

```css
:focus-visible {
  outline: 2px solid #10b981;
  outline-offset: 2px;
}
:focus:not(:focus-visible) {
  outline: none;
}
```

### 6.3 跳过链接

```html
<a href="#main-content" class="skip-link">跳转到主要内容</a>
```

### 6.4 触摸目标

```css
.touch-target {
  min-width: 44px;
  min-height: 44px;
}
```

---

## 七、响应式断点 (Responsive Breakpoints)

| 断点 | 宽度 | 设备 |
|------|------|------|
| 默认 | < 640px | 手机 |
| sm | 640px+ | 大手机 |
| md | 768px+ | 平板 |
| lg | 1024px+ | 桌面 |

---

## 八、文件清单 (Files)

### 原型文件 (prototype/)

| 文件 | 描述 | 版本 |
|------|------|------|
| index.html | 完整原型页面 | v2.3.0 |
| UI_OPTIMIZATION.md | UI/UX 优化建议 | v2.3.0 |
| OpenSpec.md | 规范文档 | v2.3.0 |

### 项目源码 (src/)

| 文件 | 描述 | 版本 |
|------|------|------|
| src/app/globals.css | 全局样式与设计令牌 | v2.3.0 |
| src/app/layout.tsx | 根布局组件 | v2.3.0 |
| src/app/page.tsx | 首页 | v2.3.0 |
| src/app/learn/page.tsx | 学习页面 | v2.3.0 |
| src/app/practice/page.tsx | 练习页面 | v2.3.0 |
| src/components/feature-card.tsx | 功能卡片组件 | v2.3.0 |
| src/components/theme-toggle.tsx | 主题切换组件 | - |
| src/components/locale-toggle.tsx | 语言切换组件 | - |
| src/components/mobile-nav.tsx | 移动端导航组件 | - |

---

## 九、参考资料 (References)

- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Apple.com.cn](https://www.apple.com.cn)
- [Tailwind CSS](https://tailwindcss.com/)
- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
- [Google Material Design](https://material.io/design/)

---

*本文档为 HanziMaster 项目的设计规范，记录所有设计决策和变更。*
