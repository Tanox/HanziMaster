# openspec 规范文档变更日志

---

## Meta 信息

| 字段 | 值 |
|-----|-----|
| **版本** | v2.3.1 |
| **更新日期** | 2026-06-10 |
| **维护者** | HanziMaster 开发团队 |
| **文档编号** | OS-CHANGELOG |

---

> 本文件记录 **openspec 目录内规范文档** 的版本变更。关于项目代码的变更日志，请查看项目根目录的 `CHANGELOG.md`。

---

## 版本说明

本项目遵循 **语义化版本 (SemVer 2.0.0)**：

```
MAJOR.MINOR.PATCH
  │     │     │
  │     │     └─  纯修复/文档更新（如 v2.3.0 → v2.3.1）
  │     └─  新增功能，向后兼容（如 v2.3.1 → v2.4.0）
  └─  破坏性变更（如 v2.3.1 → v3.0.0）
```

---

## [v2.3.1] - 2026-06-10 ✨ 当前版本

### 概览
统一 openspec 规范文档库的版本号，对齐当前 **Apple 设计风格**的代码实现。新增完整的设计令牌系统、无障碍规范和响应式规范。

### 新增文档
- 📄 **01-project-overview.md** (OS-01) — 项目概述、技术栈、设计风格总览
- 📄 **02-requirements-spec.md** (OS-02) — 功能需求（FR）和非功能需求（NFR）
- 📄 **03-technical-architecture.md** (OS-03) — Next.js 15 + React 19 + Tailwind 4 架构
- 📄 **04-feature-spec.md** (OS-04) — 详细功能规格（首页/学习/练习/导航/主题/语言）
- 📄 **05-api-spec.md** (OS-05) — LocaleProvider / ThemeProvider / 组件 API / 设计令牌
- 📄 **06-data-model.md** (OS-06) — TypeScript 类型定义、翻译对象结构、localStorage 模型
- 📄 **07-design-prototype.md** (OS-07) — Apple 风格设计系统（色彩/圆角/阴影/排版/间距/动画）
- 📄 **08-a11y-i18n.md** (OS-08) — 完整无障碍规范 + 11 种语言国际化规范
- 📄 **09-deployment.md** (OS-09) — Vercel / 腾讯云 / Docker / PM2 部署指南
- 📄 **10-security-performance.md** (OS-10) — API Key 安全、CSP、XSS 防护、Core Web Vitals
- 📄 **README.md** (OS-ROOT) — 文档库索引、统一设计令牌、检查清单
- 📄 **CHANGELOG.md** (OS-CHANGELOG) — 本文档（规范文档变更日志）

### 设计令牌统一

| 令牌类别 | 规范值 | 影响文档 |
|---------|--------|---------|
| **背景色** | `white` / `slate-900` | 全部 10 篇文档 |
| **主强调色** | `emerald-500` (#10b981) | 全部 10 篇文档 |
| **大卡片圆角** | `24px` | 01, 04, 05, 07 |
| **中卡片圆角** | `16px` | 01, 04, 07 |
| **按钮圆角** | `12px` | 05, 07 |
| **卡片阴影** | `0 8px 24px -8px rgba(0,0,0,0.08)` | 07 |
| **悬停阴影** | `0 20px 60px -15px rgba(0,0,0,0.15)` | 07 |
| **毛玻璃** | `backdrop-blur(20px) + rgba(255,255,255,0.7)` | 01, 03, 07 |
| **动画缓动** | `cubic-bezier(0.4, 0, 0.2, 1)` | 02, 07 |

### 无障碍规范统一
所有文档均要求以下无障碍特性：
- ✅ Skip Link（跳转至主内容链接）
- ✅ ARIA 属性（`aria-label`, `aria-expanded`, `aria-selected`, `aria-current`）
- ✅ 键盘导航（Tab / Enter / Space / Escape / Arrow 键）
- ✅ `prefers-reduced-motion` 动效降级
- ✅ 可见焦点环（`ring-2 ring-emerald-500`）
- ✅ 触控目标 ≥ 44x44px
- ✅ 色彩对比度（正文 ≥ 4.5:1，大号文本 ≥ 3:1）

### 响应式规范统一
- **移动端** (< 768px)：单列布局、底部导航栏
- **平板** (768px - 1024px)：双列布局、顶部导航 + 抽屉菜单
- **桌面端** (≥ 1024px)：三列布局、完整顶部毛玻璃导航

### 国际化规范统一
- 支持 **11 种语言**：en, zh-CN, zh-TW, es, ar, fr, pt-BR, de, ja, ko, ru
- 阿拉伯语（ar）RTL 布局支持
- 翻译键组织为 `common / home / learn / practice / nav / footer / meta` 模块

### 版本号统一
- ✅ 全部 12 篇文档 Meta 信息 `version` = `v2.3.1`
- ✅ 全部 12 篇文档 Meta 信息 `更新日期` = `2026-06-10`
- ✅ 全部 12 篇文档 `Version History` 顶部包含 v2.3.1 条目

---

## [v2.3.0] - 2026-06-07

### 概览
完善 API 参考文档，添加主题翻译键说明，整理项目目录结构。

### 变更
- **docs**: 扩展 `05-api-spec.md`（原 API 参考文档），添加 ThemeProvider/LocaleProvider 参数说明
- **docs**: 完善色彩令牌规范，添加 Tailwind v4 配置说明
- **docs**: 更新组件 Props 类型定义表

---

## [v2.2.2] - 2026-06-05

### 概览
修复部分文档链接错误，更新对齐检查清单。

### 变更
- **docs**: 修复 `index.md` 中 3 个无效交叉引用
- **docs**: 更新 `alignment-checklist.md` 组件版本矩阵

---

## [v2.2.1] - 2026-06-04

### 概览
添加组件级无障碍检查规范，完善数据流说明。

### 变更
- **docs**: 添加键盘行为规范（Escape/Tab/Arrow 键）
- **docs**: 添加 Version History 模板
- **docs**: 完善主题切换和语言切换流程图

---

## [v2.2.0] - 2026-06-02

### 概览
项目 UI/UX 审查完成后首次建立 openspec 规范文档库。

### 初始文档
- 01-overview.md（项目概述）
- 02-architecture.md（技术架构）
- 03-development.md（开发指南）
- 04-api-reference.md（API 参考）
- 05-deployment.md（部署指南）
- 06-testing.md（测试规范）
- 07-design-prototype.md（设计原型）
- index.md（文档索引）
- alignment-checklist.md（对齐检查清单）
- coding-standards.md（编码标准）
- commit-template.md（Git 提交模板）

---

## 版本对照矩阵

| openspec 版本 | 项目 package.json 版本 | 说明 |
|--------------|----------------------|------|
| v2.3.1 | v2.3.1 | 当前：Apple 风格设计全面对齐，完整 12 篇规范文档 |
| v2.3.0 | v2.3.0 | API 文档完善 |
| v2.2.2 | v2.2.2 | 链接修复 |
| v2.2.1 | v2.2.1 | 无障碍规范扩展 |
| v2.2.0 | v2.2.0 | 首次建立规范文档库 |

---

## 📝 更新规范文档时的步骤

1. **修改文档内容**（根据代码变更或设计调整）
2. **更新该文档的 Meta 信息**：
   - `version` → 递增 PATCH 版本号（如 v2.3.1 → v2.3.2）
   - `更新日期` → 当前日期
3. **在该文档的 Version History 顶部添加一条记录**
4. **在本 CHANGELOG.md 顶部添加相应版本条目**
5. **更新 openspec/README.md 的版本号和 Version History**
6. **同步更新 package.json 版本号（如涉及代码变更）**

---

## ✅ 当前状态

```
openspec 文档库:  v2.3.1 (12 篇文档)
文档编号:         OS-01 到 OS-10 + OS-ROOT + OS-CHANGELOG
设计风格:         Apple HIG（纯白、毛玻璃、emerald、圆角 24px、柔和阴影）
无障碍:           WCAG 2.1 AA 级 + 完整 ARIA + Skip Link
响应式:           移动优先（<768px 单列） → 平板 → 桌面（≥1024px 三列）
国际化:           11 种语言，含 RTL（阿拉伯语）支持
```

---

**本文档版本: v2.3.1**  
**最后更新: 2026-06-10**
