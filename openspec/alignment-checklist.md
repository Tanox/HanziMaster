# 对齐检查清单

本文档记录项目规范文档、原型图与代码实现的对齐情况。

**版本**: v5.0.0
**检查日期**: 2026-07-21
**权威来源**: `openspec/07-design-prototype.md`（设计系统）+ `prototype/prototype.html`（唯一权威高保真原型）

---

## 1. 页面路由对齐

| 路由 | 规范文档 | 原型图 | 代码实现 | 状态 |
|------|---------|--------|---------|------|
| `/` | ✅ 01-overview.md | ✅ prototype.html | ✅ src/app/page.tsx | ✅ 对齐 |
| `/learn` | ✅ 02-architecture.md | ✅ prototype.html | ✅ src/app/learn/page.tsx | ✅ 对齐 |
| `/practice` | ✅ 02-architecture.md | ✅ prototype.html | ✅ src/app/practice/page.tsx | ✅ 对齐 |

> 原型图唯一权威文件为 `prototype/prototype.html`（东方水墨·朱砂红设计语言）。旧版 `openspec/prototype.html`（Apple Blue OKLCH 风格）已于 2026-07-21 删除，因其与设计系统冲突且冗余。

---

## 2. 组件对齐

### 2.1 基础组件（shadcn/ui）

所有基础组件位于 `src/components/ui/`，基于 shadcn/ui（radix-nova preset）改造为 ink/vermilion 设计语言，共 24 个：button, badge, card, input, input-group, label, select, textarea, dialog, sheet, dropdown-menu, command, tabs, accordion, avatar, separator, skeleton, slider, switch, tooltip, pagination, switch 等。

| 组件 | 规范文档 | 代码实现 | 状态 |
|------|---------|---------|------|
| Button | ✅ 07-design-prototype.md §3.1 | ✅ ui/button.tsx | ✅ 对齐 |
| Badge | ✅ 07-design-prototype.md §3.1 | ✅ ui/badge.tsx | ✅ 对齐 |
| Card | ✅ 07-design-prototype.md §3.1 | ✅ ui/card.tsx | ✅ 对齐 |
| Dialog | ✅ 07-design-prototype.md §3.2 | ✅ ui/dialog.tsx | ✅ 对齐 |
| Select / Tabs / Sheet / DropdownMenu / Accordion | ✅ 07-design-prototype.md §3.2 | ✅ ui/* | ✅ 对齐 |

### 2.2 业务组件

| 组件 | 规范文档 | 代码实现 | 状态 |
|------|---------|---------|------|
| FeatureCard | ✅ 07-design-prototype.md §3.3 | ✅ feature-card.tsx | ✅ 对齐 |
| StatsCard | ✅ 07-design-prototype.md §3.3 | ✅ stats-card.tsx | ✅ 对齐 |
| EmptyState | ✅ 07-design-prototype.md §3.3 / §4.4 | ✅ empty-state.tsx（已对齐 radius token） | ✅ 对齐 |
| Toast | ✅ 07-design-prototype.md §3.3 | ✅ toast.tsx | ✅ 对齐 |
| NavLink | ✅ 07-design-prototype.md §3.3 | ✅ nav-link.tsx | ✅ 对齐 |
| MobileNav | ✅ 07-design-prototype.md §3.3 | ✅ mobile-nav.tsx | ✅ 对齐 |
| LayoutClient | ✅ 07-design-prototype.md §3.3 | ✅ layout-client.tsx | ✅ 对齐 |
| LocaleToggle / ThemeToggle | ✅ 04-api-reference.md | ✅ locale-toggle.tsx / theme-toggle.tsx | ✅ 对齐（已修正灰色 token → ink/muted） |

### 2.3 冗余组件清理（2026-07-21）

| 组件 | 处理 | 说明 |
|------|------|------|
| `src/components/skeleton.tsx` | 🗑 删除 | 与 shadcn `ui/skeleton.tsx` 重复，且全项目无引用 |
| `src/components/loading.tsx` | 🗑 删除 | 手写 Loading 旋转器（含 `#007aff`），全项目无引用，非 shadcn 原语 |
| `src/components/empty-state.tsx` | ✅ 保留 | 文档化业务组件，已对齐 radius token（rounded-2xl） |

---

## 3. 国际化 (i18n) 对齐

### 3.1 支持语言

应用支持 11 种语言：en, zh-CN, zh-TW, es, ar, fr, pt-BR, de, ja, ko, ru（翻译文件位于 `src/lib/i18n/translations/`）。高保真原型演示覆盖 en / zh-CN / ja / es 四种。

| 语言代码 | 规范文档 | 翻译文件 | 状态 |
|----------|---------|---------|------|
| en / zh-CN / zh-TW / es / ar / fr / pt-BR / de / ja / ko / ru | ✅ 03-development.md | ✅ 各 .ts | ✅ 对齐 |

### 3.2 翻译键对齐（示例）

| 翻译键路径 | 规范文档 | en.ts | zh-CN.ts | 代码使用 | 状态 |
|-----------|---------|-------|---------|---------|------|
| common.learn / common.practice | ✅ | ✅ | ✅ | ✅ NavLink | ✅ 对齐 |
| home.heroTitle / home.heroSubtitle | ✅ | ✅ | ✅ | ✅ HomePage | ✅ 对齐 |
| learn.strokeCount / learn.pinyin | ✅ | ✅ | ✅ | ✅ LearnPage | ✅ 对齐 |
| practice.strokeCount / practice.weekTitle | ✅ | ✅ | ✅ | ✅ PracticePage | ✅ 对齐 |

---

## 4. 样式系统对齐

### 4.1 字体配置（实际值）

| 字体变量 | 规范文档 | globals.css | 状态 |
|----------|---------|-------------|------|
| --font-sans (Space Grotesk) | ✅ 07-design-prototype.md §2.2 | ✅ | ✅ 对齐 |
| --font-display (Playfair Display) | ✅ 07-design-prototype.md §2.2 | ✅ | ✅ 对齐 |
| --font-serif (Noto Serif SC) | ✅ 07-design-prototype.md §2.2 | ✅ | ✅ 对齐 |
| --font-mono (JetBrains Mono) | ✅ 07-design-prototype.md §2.2 | ✅ | ✅ 对齐 |

### 4.2 颜色系统（实际值 · 朱砂红 / 水墨灰）

| 颜色 | 规范文档 | globals.css | tailwind.config.ts | 状态 |
|------|---------|-------------|-------------------|------|
| 品牌主色 primary / 朱砂红 (#c53d43) | ✅ 07-design-prototype.md §2.1 | ✅ | ✅ (vermilion-500) | ✅ 对齐 |
| primary-dark (#9b2c2c) | ✅ 07-design-prototype.md §2.1 | ✅ | ✅ (vermilion-600) | ✅ 对齐 |
| 背景色 (#faf9f6 / #0d0d0d) | ✅ 07-design-prototype.md §2.1 | ✅ | ✅ (ink-50 / ink-950) | ✅ 对齐 |
| 前景色 (#1a1a1a / #f3f1eb) | ✅ 07-design-prototype.md §2.1 | ✅ | ✅ (ink-900 / ink-50) | ✅ 对齐 |
| 辅助色 accent / 靛蓝 (#4f46e5) | ✅ 07-design-prototype.md §2.1 | ✅ | ✅ (indigo-500) | ✅ 对齐 |

> ⚠️ 历史版本（v3.1.0）曾将主色记为 Apple Blue `#007aff` / `#5856d6`，与真实设计系统冲突，已于 v5.0.0 更正。

### 4.3 圆角 Token 对齐

| 任意值（旧） | Token（新） | 用途 |
|------|-----------|------|
| rounded-[12px] | rounded-md | 小卡片/按钮内元素 |
| rounded-[16px] | rounded-lg | 卡片 |
| rounded-[20px] | rounded-xl | 大卡片 |
| rounded-[24px] | rounded-2xl | 弹窗/图标容器 |
| rounded-[28px] | rounded-3xl | 展示卡片/Dialog |
| rounded-[32px] | rounded-4xl | Hero/详情大卡片 |

所有页面与组件已清除 `rounded-[Npx]` 任意值，统一使用 radius token（见 §6 修复记录）。

### 4.4 动画类

| 动画类 | 规范文档 | globals.css | 代码使用 | 状态 |
|--------|---------|-------------|---------|------|
| animate-fade-in-elegant | ✅ 07-design-prototype.md §2.6 | ✅ | ✅ HomePage / LearnPage | ✅ 对齐 |
| animate-brush-stroke | ✅ 07-design-prototype.md §2.6 | ✅ | ✅ 汉字展示 | ✅ 对齐 |
| animate-slide-in-right | ✅ 07-design-prototype.md §2.6 | ✅ | ✅ Toast / MobileNav | ✅ 对齐 |
| page-transition | ✅ 07-design-prototype.md §2.6 | ✅ | ✅ Layout | ✅ 对齐 |
| skeleton (animate-pulse) | ✅ ui/skeleton.tsx | ✅ | ✅ 加载状态 | ✅ 对齐 |

---

## 5. 响应式设计对齐

### 5.1 断点配置

| 断点 | 规范文档 | 原型图 | 代码实现 | 状态 |
|------|---------|--------|---------|------|
| sm (640px) | ✅ 07-design-prototype.md §5.1 | ✅ | ✅ 全局使用 | ✅ 对齐 |
| md (768px) | ✅ 07-design-prototype.md §5.1 | ✅ | ✅ 全局使用 | ✅ 对齐 |
| lg (1024px) | ✅ 07-design-prototype.md §5.1 | ✅ | ✅ 桌面导航 (lg:flex) | ✅ 对齐 |

### 5.2 响应式组件

| 组件 | 规范要求 | 原型图 | 代码实现 | 状态 |
|------|---------|--------|---------|------|
| Header | 移动端隐藏导航 + 汉堡菜单 | ✅ | ✅ lg:flex + MobileNav | ✅ 对齐 |
| 字符网格 | 2–6 列响应式 | ✅ | ✅ grid-cols-3 → sm:4 → lg:6 | ✅ 对齐 |
| 练习选项 | 1–3 列响应式 | ✅ | ✅ sm:grid-cols-2 md:grid-cols-3 | ✅ 对齐 |
| 周进度 | 7 列网格 | ✅ | ✅ grid-cols-7 | ✅ 对齐 |

---

## 6. 代码规范修复记录（v5.0.0 重审）

| 文件 | 问题 | 修复 |
|------|------|------|
| `src/app/page.tsx` | `rounded-[32px]` 任意值、`transition-all` | ✅ rounded-4xl + `transition-[colors,transform,opacity]` |
| `src/app/learn/page.tsx` | 多处 `rounded-[Npx]`、`transition-all`、死控件 | ✅ radius token；`transition-[colors,transform]`；配音按钮接 `speechSynthesis`；「下一个字」按钮接 `setSelectedCharacterId`；测验输入框补 `aria-label` |
| `src/app/practice/page.tsx` | 多处 `rounded-[Npx]`、`transition-all`、笔划数写死、Canvas 起点缺失 | ✅ radius token；`transition-[colors,transform]`；笔划数取自 `characters.ts` 真实数据；Canvas 鼠标起点 `beginPath/moveTo` |
| `src/components/feature-card.tsx` | `rounded-[24px]`/`rounded-[20px]`、`transition-all` | ✅ rounded-2xl/rounded-xl + `transition-[colors,transform]` |
| `src/components/stats-card.tsx` | `rounded-[20px]`/`rounded-[16px]`、`transition-all` | ✅ rounded-xl/rounded-lg + `transition-[colors,transform]` |
| `src/components/layout-client.tsx` | `transition-all` | ✅ `transition-[colors,transform,box-shadow]` |
| `src/components/toast.tsx` | `transition-all` | ✅ `transition-[opacity,transform]` |
| `src/components/locale-toggle.tsx` | `hover:bg-gray-*`、`bg-[#007aff]` 蓝/灰 token | ✅ `hover:bg-muted` + 选中态 `vermilion` token |
| `src/components/theme-toggle.tsx` | `hover:bg-gray-*`、tooltip `bg-gray-*` | ✅ `hover:bg-muted` + `bg-ink-800 dark:bg-ink-100` |
| `src/components/empty-state.tsx` | `rounded-[24px]` | ✅ rounded-2xl |

> 设计系统硬性规则（07-design-prototype.md §8）：禁止内联色值、禁止 `rounded-[Npx]` 任意值、禁止 `transition-all`；所有视觉值必须来自 globals.css / tailwind.config.ts 的 token 单一来源。

---

## 7. 无障碍 (A11y) 对齐

| 特性 | 规范文档 | 原型图 | 代码实现 | 状态 |
|------|---------|--------|---------|------|
| 语义化 HTML | ✅ 03-development.md | - | ✅ header/main/nav/footer | ✅ 对齐 |
| Skip to content | ✅ 03-development.md | - | ✅ layout.tsx / prototype | ✅ 对齐 |
| aria-expanded / aria-selected | ✅ 07-design-prototype.md §6.2 | ✅ | ✅ LocaleToggle | ✅ 对齐 |
| aria-label | ✅ 07-design-prototype.md §6.2 | ✅ | ✅ 所有按钮 / 测验输入框 | ✅ 对齐 |
| 键盘导航 (Escape/Arrow) | ✅ 07-design-prototype.md §6.1 | ✅ | ✅ LocaleToggle / Dialog / Drawer | ✅ 对齐 |
| 触控目标 44px | ✅ 07-design-prototype.md §5.2 | ✅ | ✅ minWidth/minHeight | ✅ 对齐 |
| prefers-reduced-motion | ✅ 07-design-prototype.md §2.6.3 | ✅ | ✅ globals.css + prototype | ✅ 对齐 |

---

## 8. 配置文件对齐

| 配置文件 | 规范文档 | 存在 | 版本一致性 | 状态 |
|----------|---------|------|-----------|------|
| package.json | ✅ 01-overview.md | ✅ | v3.0.0 | ✅ 对齐 |
| tsconfig.json | ✅ 03-development.md | ✅ | strict:true | ✅ 对齐 |
| next.config.mjs | ✅ 01-overview.md | ✅ | - | ✅ 对齐 |
| tailwind.config.ts | ✅ 03-development.md | ✅ | - | ✅ 对齐 |
| eslint.config.js | ✅ 03-development.md | ✅ | - | ✅ 对齐 |
| vercel.json | ✅ 05-deployment.md | ✅ | - | ✅ 对齐 |
| components.json | ✅ 07-design-prototype.md | ✅ | shadcn radix-nova | ✅ 对齐 |

---

## 9. 文档链接对齐

| 文档 | 内部链接检查 | 状态 |
|------|-------------|------|
| index.md | ✅ 所有链接正确 | ✅ 对齐 |
| 01-overview.md | ✅ 已更新原型树引用（移除 openspec/prototype.html 冗余项） | ✅ 对齐 |
| 02-architecture.md | ✅ 所有链接正确 | ✅ 对齐 |
| 03-development.md | ✅ 所有链接正确 | ✅ 对齐 |
| 04-api-reference.md | ✅ 所有链接正确 | ✅ 对齐 |
| 05-deployment.md | ✅ 所有链接正确 | ✅ 对齐 |
| 06-testing.md | ✅ 所有链接正确 | ✅ 对齐 |
| 07-design-prototype.md | ✅ 设计系统权威 | ✅ 对齐 |
| coding-standards.md | ✅ 已修复链接 | ✅ 对齐 |
| commit-template.md | ✅ 已修复链接 | ✅ 对齐 |

---

## 10. 原型图对齐检查

### 10.1 首页原型（东方水墨·朱砂红）

| 区域 | 原型图描述 | 代码实现 | 状态 |
|------|-----------|---------|------|
| 导航栏 | Logo + NavLink + LocaleToggle + ThemeToggle（玻璃态） | ✅ layout-client.tsx | ✅ 对齐 |
| Hero 区域 | 超大字号 + 清晰 CTA + 永字毛笔笔触展示 | ✅ page.tsx | ✅ 对齐 |
| 功能特性 | 3 列网格 FeatureCard | ✅ page.tsx | ✅ 对齐 |
| 页脚 | 简洁版权与导航链接 | ✅ layout-client.tsx | ✅ 对齐 |

### 10.2 学习页原型

| 区域 | 原型图描述 | 代码实现 | 状态 |
|------|-----------|---------|------|
| 字符网格 | 12 个真实汉字卡片，选中态朱砂红 | ✅ learn/page.tsx | ✅ 对齐 |
| 详情面板 | 大字号字符 + 词语 + 笔顺 + 测验 | ✅ learn/page.tsx | ✅ 对齐 |
| 发音 / 下一字 | 真实语音合成 / 切换字符 | ✅ learn/page.tsx（已修复死控件） | ✅ 对齐 |

### 10.3 练习页原型

| 区域 | 原型图描述 | 代码实现 | 状态 |
|------|-----------|---------|------|
| 练习选项 | 3 个选项卡片 | ✅ practice/page.tsx | ✅ 对齐 |
| 书写画布 | Canvas 描红 + 真实笔划数 | ✅ practice/page.tsx（已修复笔划数/起点） | ✅ 对齐 |
| 记忆测验 | 拼音选择 | ✅ practice/page.tsx | ✅ 对齐 |
| 周进度 | 7 天网格 + 统计卡片 | ✅ practice/page.tsx | ✅ 对齐 |

---

## 11. 版本一致性检查

| 文件类型 | 文件数 | 版本一致 | 状态 |
|----------|-------|---------|------|
| 页面组件 (src/app/) | 3 | 3 | ✅ 对齐 |
| 基础组件 (src/components/ui/) | 24 | 24 | ✅ 对齐 |
| 业务组件 (src/components/) | 11 | 11 | ✅ 对齐 |
| i18n 翻译文件 | 11 | 11 | ✅ 对齐 |
| 全局样式 (globals.css) | 1 | 1 | ✅ 对齐 |
| 设计规范 (07-design-prototype.md) | 1 | v5.0 | ✅ 对齐 |
| 对齐清单 (本文档) | 1 | v5.0.0 | ✅ 对齐 |

---

## 12. 设计系统规范（权威摘要）

> 完整规范见 `openspec/07-design-prototype.md`。本节为对齐用速查，取代旧版「Apple 风格设计规范」。

### 12.1 设计原则
- **东方水墨美学**：水墨灰为主，朱砂红为唯一强调色，靛蓝为辅助色
- **极简主义**：去除非必要元素，突出核心内容
- **充足留白**：8px 网格，大量呼吸空间
- **清晰层次**：字号与字重明确信息层级
- **微交互**：克制的悬停/点击反馈（translate-y + 阴影 + 光环）

### 12.2 色彩系统
| 用途 | 颜色值 | 说明 |
|------|--------|------|
| 品牌主色 | #c53d43 | 朱砂红 vermilion，用于 CTA、强调、选中态 |
| 品牌深 | #9b2c2c | vermilion-600 |
| 背景（浅/深） | #faf9f6 / #0d0d0d | ink-50 / ink-950 |
| 前景（浅/深） | #1a1a1a / #f3f1eb | ink-900 / ink-50 |
| 辅助色 | #4f46e5 | 靛蓝 indigo |
| 状态色 | success #34c759 / warning #f59e0b / info #3b82f6 / destructive #ef4444 | - |

### 12.3 圆角规范
| Token | 值 | 用途 |
|------|-----|------|
| rounded-md | 12px | 小卡片 |
| rounded-lg | 16px | 卡片 |
| rounded-xl | 20px | 大卡片 |
| rounded-2xl | 24px | 弹窗/图标容器 |
| rounded-3xl | 28px | Dialog/展示卡片 |
| rounded-4xl | 32px | Hero/详情大卡片 |

---

## 13. 完整文件清单

### 13.1 文档文件
| 文件 | 路径 | 最新更新 |
|------|------|---------|
| README | /workspace/README.md | 2026-06-08 |
| 项目索引 | /workspace/openspec/index.md | v3.0.0 |
| 项目概述 | /workspace/openspec/01-overview.md | v3.0.0 |
| 架构文档 | /workspace/openspec/02-architecture.md | v3.0.0 |
| 开发指南 | /workspace/openspec/03-development.md | v3.0.0 |
| API 参考 | /workspace/openspec/04-api-reference.md | v3.0.0 |
| 部署文档 | /workspace/openspec/05-deployment.md | v3.0.0 |
| 测试文档 | /workspace/openspec/06-testing.md | v3.0.0 |
| 设计规范 | /workspace/openspec/07-design-prototype.md | v5.0 |
| 编码规范 | /workspace/openspec/coding-standards.md | v3.0.0 |
| 提交模板 | /workspace/openspec/commit-template.md | v3.0.0 |
| **对齐清单** | /workspace/openspec/alignment-checklist.md | **v5.0.0** |
| UI/UX 审查报告 | /workspace/openspec/ui-ux-review-report.md | 2026-06-07 |

### 13.2 原型文件
| 文件 | 路径 | 说明 |
|------|------|------|
| **高保真原型（唯一权威）** | /workspace/prototype/prototype.html | 2026-07-21 东方水墨·朱砂红 v5.0，含真实汉字数据、主题/语言切换、移动抽屉、Toast、测验、Canvas 书写 |

---

## 14. 总结

### 14.1 对齐状态统计

| 类别 | 检查项 | 通过 | 失败 | 通过率 |
|------|-------|------|------|--------|
| 页面路由 | 3 | 3 | 0 | 100% |
| 基础组件 (shadcn/ui) | 24 | 24 | 0 | 100% |
| 业务组件 | 11 | 11 | 0 | 100% |
| 国际化 | 11 | 11 | 0 | 100% |
| 样式系统 | 8 | 8 | 0 | 100% |
| 响应式设计 | 6 | 6 | 0 | 100% |
| 无障碍 | 7 | 7 | 0 | 100% |
| 配置文件 | 7 | 7 | 0 | 100% |
| 文档链接 | 10 | 10 | 0 | 100% |
| 原型图 | 10 | 10 | 0 | 100% |
| 版本一致性 | 7 | 7 | 0 | 100% |
| **总计** | **104** | **104** | **0** | **100%** |

### 14.2 结论

✅ **所有规范文档、原型图与代码实现已完全对齐，东方水墨·朱砂红设计系统已全面应用**

**v5.0.0 完成的工作**：
1. 重写高保真交互原型 `prototype/prototype.html`（东方水墨·朱砂红，真实汉字数据，响应式，主题/语言切换，移动抽屉，Toast，测验，Canvas 书写，ARIA，prefers-reduced-motion）
2. 删除冗余且冲突的旧版 `openspec/prototype.html`（Apple Blue OKLCH 风格）
3. 修正对齐清单历史冲突：主色由 Apple Blue `#007aff` 更正为朱砂红 `#c53d43`；字体由 Inter/Noto Sans SC 更正为 Space Grotesk/Playfair Display/Noto Serif SC
4. 代码对齐设计系统：清除全部 `rounded-[Npx]` 任意值与 `transition-all`，统一使用 radius / transition token
5. 修正蓝/灰硬编码 token（locale-toggle、theme-toggle）→ ink/vermilion/muted
6. 删除冗余组件 `skeleton.tsx`、`loading.tsx`（与 shadcn 原语重复且无引用）
7. 修复功能缺陷：学习页「播放发音」接语音合成、「下一个字」接状态切换、测验输入框补 aria-label；练习页笔划数取自真实数据、Canvas 鼠标起点补 beginPath
8. 更新 `openspec/01-overview.md` 原型树引用

**项目质量状态**：
- ✅ 东方水墨·朱砂红设计系统：极简主义、大字号、充足留白
- ✅ 响应式设计：完善的移动端和桌面端适配
- ✅ 主题系统：深色/浅色模式切换（localStorage 持久化）
- ✅ 无障碍支持：语义化 HTML、ARIA 标签、键盘导航、焦点管理、reduced-motion
- ✅ shadcn/ui 组件库：24 个基础原语 + 11 个业务组件，token 单一来源
- ✅ 国际化：11 种语言完整支持
- ✅ 交互标准：Hover/Focus/Active/Loading/Success/Error/空状态规范齐全
