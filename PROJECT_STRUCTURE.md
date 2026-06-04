# HanziMaster 项目结构说明

## 📁 当前项目目录结构

```
/workspace/
├── .codebuddy/              # AI 助手记忆目录
│   └── memory/
│       └── 2026-06-02.md    # AI 助手会话记忆
├── docs/                    # 📚 项目文档和报告
│   ├── UI_UX_REVIEW.md     # 🎯 UI/UX 专业审查报告
│   └── OPTIMIZATION_SUMMARY.md # ⚡ 项目优化执行总结
├── openspec/                # 📖 项目规范文档
│   ├── index.md             # 📇 文档索引（必读）
│   ├── 01-overview.md       # 📋 项目概述
│   ├── 02-architecture.md   # 🏗️ 技术架构
│   ├── 03-development.md   # 🚀 开发指南
│   ├── 04-api-reference.md # 📡 API 参考
│   ├── 05-deployment.md    # 🌐 部署指南
│   ├── 06-testing.md       # 🧪 测试规范
│   ├── 07-design-prototype.md # 🎨 原型设计
│   ├── coding-standards.md  # 📝 编码标准
│   └── commit-template.md   # 📌 Git 提交模板
├── src/                     # 💻 源代码目录
│   ├── app/                # Next.js App Router
│   │   ├── learn/          # 学习页面
│   │   ├── practice/       # 练习页面
│   │   ├── globals.css     # 全局样式
│   │   ├── layout.tsx      # 根布局
│   │   └── page.tsx        # 首页
│   ├── components/          # React 组件
│   │   ├── feature-card.tsx
│   │   ├── locale-provider.tsx
│   │   ├── locale-toggle.tsx
│   │   ├── mobile-nav.tsx
│   │   ├── nav-link.tsx
│   │   ├── stats-card.tsx
│   │   ├── theme-provider.tsx
│   │   └── theme-toggle.tsx
│   └── lib/                # 工具库
│       └── i18n/           # 国际化模块
│           ├── translations/ # 11种语言翻译
│           └── index.ts
├── prototype.html           # 🎨 高保真 HTML 原型图
├── package.json            # npm 依赖配置
├── package-lock.json       # 依赖锁定文件
├── tsconfig.json          # TypeScript 配置
├── next.config.js         # Next.js 配置
├── postcss.config.js      # PostCSS 配置
├── vercel.json            # Vercel 部署配置
├── eslint.config.js       # ESLint 配置
├── .env.example          # 环境变量示例
├── .nvmrc                # Node 版本配置
├── .gitignore            # Git 忽略配置
├── README.md             # 项目说明（中文）
├── README_EN.md          # 项目说明（英文）
├── CHANGELOG.md          # 变更日志
└── HanziMaster.code-workspace # VS Code 工作区配置
```

---

## 🎯 目录整理原则

### 1. **文档分类清晰**
- `docs/` - 项目报告、审查、优化总结等辅助文档
- `openspec/` - 项目规范文档（编码、架构、开发、测试等）
- 根目录 - README、CHANGELOG、配置文件等核心文件

### 2. **避免冗余**
- 删除重复的文档文件
- 整合相似内容
- 统一文档格式

### 3. **最小颗粒度对齐**
- 文档描述与实际代码完全一致
- API 参考与组件实现同步更新
- 翻译键与代码使用保持一致

---

## 📖 核心文档说明

### 🎯 必读文档

| 文档 | 路径 | 说明 |
|------|------|------|
| 文档索引 | [openspec/index.md](openspec/index.md) | 项目所有文档的导航和索引 |
| 项目概述 | [openspec/01-overview.md](openspec/01-overview.md) | 项目基本信息、技术栈、核心功能 |
| 开发指南 | [openspec/03-development.md](openspec/03-development.md) | 开发环境搭建、项目命令、编码规范 |

### 🔧 开发人员必读

| 文档 | 路径 | 说明 |
|------|------|------|
| API 参考 | [openspec/04-api-reference.md](openspec/04-api-reference.md) | 所有组件的 API 文档 |
| 编码标准 | [openspec/coding-standards.md](openspec/coding-standards.md) | 代码风格、最佳实践 |
| 提交模板 | [openspec/commit-template.md](openspec/commit-template.md) | Git 提交规范 |

### 🎨 设计师必读

| 文档 | 路径 | 说明 |
|------|------|------|
| 原型设计 | [openspec/07-design-prototype.md](openspec/07-design-prototype.md) | 设计规范、原型说明 |
| HTML 原型 | [prototype.html](prototype.html) | 可直接在浏览器打开的高保真原型 |

---

## 🔗 快速链接

### 在线资源
- [项目文档索引](openspec/index.md) - 所有文档的导航
- [HTML 原型图](prototype.html) - 可视化原型预览

### 核心文档
- [项目概述](openspec/01-overview.md) - 了解项目基本信息
- [技术架构](openspec/02-architecture.md) - 了解系统架构
- [API 参考](openspec/04-api-reference.md) - 查看组件 API

### 辅助文档
- [UI/UX 审查报告](docs/UI_UX_REVIEW.md) - 专业设计评估
- [优化总结](docs/OPTIMIZATION_SUMMARY.md) - 历史优化记录

---

## 📊 文档统计

| 类别 | 数量 | 说明 |
|------|------|------|
| 核心规范文档 | 10 | openspec/ 目录下的所有文档 |
| 项目报告 | 2 | docs/ 目录下的报告文档 |
| 源代码文件 | 12 | src/ 目录下的 TSX/TS 文件 |
| 翻译文件 | 11 | 11种语言的翻译 |
| 配置文件 | 8 | 根目录下的配置文件 |

---

## 🔄 维护指南

### 文档更新流程

1. **发现问题** → 发现文档与代码不一致
2. **更新文档** → 修改对应的 openspec/ 文档
3. **更新索引** → 更新 index.md 的交叉引用
4. **验证一致性** → 确保文档与代码完全对齐

### 文件命名规范

- **Markdown 文档**: `kebab-case.md`
- **React 组件**: `kebab-case.tsx`
- **工具函数**: `kebab-case.ts`
- **翻译文件**: `locale.ts` (如 zh-CN.ts)

---

**最后更新：** 2026-06-04  
**维护者：** HanziMaster 开发团队
