# HanziMaster 汉字大师 - 规范文档 (openspec)

---

## Meta 信息

| 字段 | 值 |
|-----|-----|
| **版本** | v2.3.1 |
| **更新日期** | 2026-06-10 |
| **维护者** | HanziMaster 开发团队 |
| **文档库编号** | OS-ROOT |

---

## 📖 文档库说明

本目录包含 HanziMaster 汉字大师平台的全部规范文档，版本统一为 **v2.3.1**。

设计风格对齐 **Apple Human Interface Guidelines**：
- **纯白背景** `#ffffff`，深色模式 `#0f172a`
- **毛玻璃效果** `backdrop-blur(20px)` + 半透明
- **emerald 绿色强调** `#10b981`
- **圆角 24px** 大卡片 / 16px 中卡片 / 12px 按钮
- **柔和阴影**三层系统（卡片、浮起、微阴影）

---

## 📚 文档清单

| 编号 | 文档名称 | 文件名 | 说明 | 阅读顺序 |
|-----|---------|--------|------|---------|
| OS-01 | 项目概述 | [01-project-overview.md](01-project-overview.md) | 项目基本信息、技术栈、设计风格总览 | 1️⃣ |
| OS-02 | 需求规格 | [02-requirements-spec.md](02-requirements-spec.md) | 功能需求（FR）和非功能需求（NFR） | 2️⃣ |
| OS-03 | 技术架构 | [03-technical-architecture.md](03-technical-architecture.md) | Next.js 15 App Router、React 19、Tailwind 4、状态管理 | 3️⃣ |
| OS-04 | 功能规格 | [04-feature-spec.md](04-feature-spec.md) | 详细功能规格、页面结构、组件清单 | 4️⃣ |
| OS-05 | API 规范 | [05-api-spec.md](05-api-spec.md) | 组件 API、Context API、设计令牌系统 | 5️⃣ |
| OS-06 | 数据模型 | [06-data-model.md](06-data-model.md) | 类型定义、翻译结构、localStorage 模型 | 6️⃣ |
| OS-07 | 设计原型 | [07-design-prototype.md](07-design-prototype.md) | Apple 风格设计系统、色彩、排版、阴影、圆角 | 7️⃣ |
| OS-08 | 无障碍与国际化 | [08-a11y-i18n.md](08-a11y-i18n.md) | ARIA、键盘导航、Skip Link、prefers-reduced-motion、11 种语言 | 8️⃣ |
| OS-09 | 部署指南 | [09-deployment.md](09-deployment.md) | Vercel、腾讯云、Docker、PM2 部署方案 | 9️⃣ |
| OS-10 | 安全与性能 | [10-security-performance.md](10-security-performance.md) | API Key 安全、CSP、XSS 防护、Core Web Vitals | 🔟 |

---

## 🎯 快速导航

### 新进开发者

```
阅读路径：
  1. 项目概述 (OS-01)   ← 了解项目和设计风格
  2. 技术架构 (OS-03)   ← 了解技术选型和架构
  3. 设计原型 (OS-07)   ← 深入了解 Apple 风格设计规范
  4. API 规范 (OS-05)   ← 了解组件和 Context API
  5. 无障碍与国际化 (OS-08) ← 了解无障碍和多语言要求
```

### 设计师

```
重点阅读：
  • 07-design-prototype.md    ← 完整设计令牌系统
  • 01-project-overview.md    ← 项目设计风格总览
  • 08-a11y-i18n.md           ← 色彩对比、触控目标规范
```

### 运维工程师

```
重点阅读：
  • 09-deployment.md           ← Vercel、腾讯云、Docker 部署
  • 10-security-performance.md ← CSP、HSTS、API Key 安全
```

---

## ✨ 核心设计原则（全文档统一）

### 1. Apple 风格设计

```
┌────────────────────────────────────────────┐
│  设计令牌一览                                │
│                                              │
│  主背景    white / slate-900 (dark)          │
│  主强调色   emerald-500 (#10b981)            │
│  次强调色   cyan-500 (#06b6d4)               │
│                                              │
│  圆角      24px  卡片                        │
│           16px  中卡片                       │
│           12px  按钮                         │
│                                              │
│  阴影      0 8px 24px -8px rgba(0,0,0,0.08)  │
│           hover: 增大阴影 + 轻微上浮          │
│                                              │
│  毛玻璃     backdrop-blur(20px)               │
│           rgba(255,255,255,0.7)              │
│                                              │
│  动画      cubic-bezier(0.4, 0, 0.2, 1)       │
│           prefers-reduced-motion 时降级        │
└────────────────────────────────────────────┘
```

### 2. 无障碍（全文档要求）

| 要求 | 规范 | 文档位置 |
|-----|------|---------|
| **Skip Link** | 顶部跳转至主内容链接 | OS-08 §4 |
| **ARIA** | 按钮/菜单/对话框完整 ARIA 属性 | OS-08 §2 |
| **键盘导航** | Tab/Escape/Arrow 键完整支持 | OS-08 §3 |
| **焦点环** | `ring-2 ring-emerald-500` 可见 | OS-07 §12 |
| **色彩对比** | 正文 ≥ 4.5:1，大号文本 ≥ 3:1 | OS-08 §6 |
| **触控目标** | 最小 44x44px | OS-07 §12 |
| **动效降级** | `@media (prefers-reduced-motion: reduce)` | OS-08 §5 |

### 3. 响应式（全文档要求）

| 断点 | 设备 | 布局 | 导航 |
|-----|------|------|------|
| < 768px | 移动端 | 单列 | 底部导航栏（3 图标） |
| 768px - 1024px | 平板 | 双列 | 顶部导航 + 抽屉菜单 |
| ≥ 1024px | 桌面 | 三列 | 完整顶部毛玻璃导航 |

---

## 🔄 版本一致性

所有 openspec 文档统一版本 **v2.3.1**。

| 检查项 | 状态 |
|-------|------|
| 所有文档 Meta 信息版本 | v2.3.1 ✅ |
| 所有文档 Meta 信息日期 | 2026-06-10 ✅ |
| 设计风格描述一致 | Apple 风格 ✅ |
| 色彩令牌一致 | emerald-500 / white / slate-900 ✅ |
| 圆角令牌一致 | 24px / 16px / 12px ✅ |
| 响应式断点一致 | 768px / 1024px ✅ |
| 无障碍要求一致 | ARIA + Skip Link + reduced-motion ✅ |
| 国际化语言一致 | 11 种语言 ✅ |
| Version History v2.3.1 条目 | 所有文档包含 ✅ |

---

## 🔗 与实际代码的对应关系

```
openspec 文档           →  源代码位置
─────────────────────────────────────────
03-technical-architecture.md → src/app/layout.tsx
                           → src/app/page.tsx
                           → src/components/*

04-feature-spec.md          → src/app/learn/page.tsx
                           → src/app/practice/page.tsx

05-api-spec.md              → src/components/locale-provider.tsx
                           → src/components/theme-provider.tsx
                           → src/components/theme-toggle.tsx
                           → src/components/locale-toggle.tsx

06-data-model.md            → src/lib/i18n/index.ts
                           → src/lib/i18n/translations/*.ts

07-design-prototype.md      → src/app/globals.css
                           → tailwind.config.ts

08-a11y-i18n.md             → 所有组件的 aria-* 属性
                           → 所有组件的 focus: 样式
```

---

## 📝 变更日志

详细变更历史见 [CHANGELOG.md](CHANGELOG.md)。

---

## 👥 维护与贡献

### 新增规范文档时

1. 选择下一个可用编号（目前最大为 OS-10）
2. 复制 Meta 信息模板（版本、日期、文档编号）
3. 在 Version History 中添加 v2.3.1 条目
4. 在本 README 的「文档清单」表格添加一行
5. 在本 README 的 Version History 同步更新

### 更新现有规范时

1. 更新文档中的 Meta 信息
2. 在 Version History 顶部添加新条目
3. 确保设计令牌（色彩、圆角、阴影）与本文档一致
4. 确保无障碍要求（ARIA、Skip Link、reduced-motion）一致
5. 确保响应式断点（768px、1024px）一致

---

## 📋 检查清单（更新文档时使用）

```
文档更新检查清单：
  ✅ Meta 信息中的 version = 'v2.3.1'
  ✅ Meta 信息中的 日期 = '2026-06-10'
  ✅ 设计风格描述包含：纯白背景、毛玻璃、emerald 绿色、圆角 24px、柔和阴影
  ✅ 无障碍描述包含：ARIA、prefers-reduced-motion、焦点管理、Skip Link
  ✅ 响应式描述包含：移动端单列、桌面端三列、移动底部导航
  ✅ Version History 中包含 v2.3.1 条目（位于顶部）
  ✅ 文档编号唯一（OS-01 ~ OS-10 + OS-ROOT）
```

---

## Version History

| 版本 | 日期 | 说明 |
|-----|------|------|
| **v2.3.1** | 2026-06-10 | 统一版本号至 v2.3.1，对齐 Apple 设计风格实现（纯白背景、毛玻璃、emerald 绿色强调、圆角 24px、柔和阴影），完善无障碍（ARIA、prefers-reduced-motion、焦点管理、Skip Link）和响应式（移动端单列、桌面端三列、移动底部导航）描述，创建完整 10 篇规范文档 + README + CHANGELOG |
| v2.2.1 | 2026-06-07 | 添加对齐检查清单和文档版本跟踪 |
| v2.2.0 | 2026-06-04 | 初始 openspec 文档库版本 |

---

## 🔍 相关资源

- 📦 项目根 `package.json` - 查看当前依赖版本
- 📁 `src/app/` - Next.js App Router 页面
- 📁 `src/components/` - 可复用组件
- 📁 `src/lib/i18n/` - 国际化翻译文件
- 🎨 `src/app/globals.css` - 全局样式和设计令牌
- 📖 项目根 `README.md` - 快速上手指南
- 📖 项目根 `CHANGELOG.md` - 代码变更日志

---

**本文档版本: v2.3.1**  
**最后更新: 2026-06-10**  
**维护: HanziMaster 开发团队**
