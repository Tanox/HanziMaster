# 项目概述
============

## 1. 项目基本信息

| 项目属性 | 值 |
|---------|-----|
| **项目名称** | HanziMaster 汉字大师 |
| **版本** | v3.0.0 |
| **说明** | AI 驱动的中文字符学习平台 |
| **主要语言** | TypeScript |
| **项目类型** | Web 应用 |
| **前端框架** | Next.js 15 |
| **Node.js 要求** | >= 24.5.0 |

## 2. 项目简介

HanziMaster 汉字大师是一个现代化的、基于人工智能的汉字学习平台。它利用 Google Gemini AI 提供关于笔画顺序、平衡和美感的个性化反馈，帮助用户高效学习汉字。

## 3. 目标与范围

### 3.1 项目目标

- 提供个性化、智能化的汉字学习体验
- 结合传统学习方法与现代 AI 技术
- 打造美观、响应式的用户界面（Apple 风格设计）
- 支持多语言国际化
- 实现高效的汉字书写练习和分析功能

### 3.2 目标用户

- 中文学习者（初学者到高级学习者）
- 需要练习汉字书写的用户
- 对汉字文化和词源感兴趣的用户

### 3.3 项目范围

**包含功能：**
- AI 驱动的手写分析和实时反馈
- 汉字学习和练习功能
- 深色/浅色模式支持
- 多语言国际化
- 响应式设计，支持多种设备
- Apple 风格的极简 UI 设计

**暂不包含：**
- 用户账户和进度云端同步（仅本地存储）
- 社交功能
- 在线课程购买

## 4. 核心功能

| 功能模块 | 说明 |
|---------|------|
| AI 驱动的洞察 | 对用户的手写提供实时反馈，包括笔画顺序、平衡性和美学评估 |
| 自适应学习 | 根据用户进度调整个性化学习路径 |
| 词源与文化 | 发现汉字背后的历史故事和文化背景 |
| 深色/浅色模式 | 支持持久化主题偏好和系统自动检测 |
| 国际化 (i18n) | 支持 11 种语言，包括英语、简体中文、繁体中文、西班牙语、阿拉伯语、法语、葡萄牙语、德语、日语、韩语和俄语 |
| 语言切换器 | 便捷的语言切换并支持本地存储偏好 |
| 中文优化显示 | 集成 Noto Sans SC 字体提供优雅的汉字显示 |

## 5. 技术栈

| 分类 | 技术 | 版本 | 用途 |
|------|-----|------|------|
| **前端框架** | Next.js | ^15.2.0 | 前端应用框架 |
| **UI 库** | React | ^19.1.0 | UI 组件库 |
| **编程语言** | TypeScript | ^5.7.3 | 开发语言 |
| **样式框架** | Tailwind CSS | ^4.0.12 | 样式框架 |
| **AI 服务** | @google/generative-ai | ^0.24.0 | Google Gemini AI SDK |
| **图标库** | Lucide React | - | 图标 |
| **字体** | Inter, JetBrains Mono, Noto Sans SC | - | 界面和代码字体 |
| **构建工具** | Next.js CLI | ^15.2.0 | 项目构建 |
| **开发服务器** | Vite | (通过 Next.js) | 开发服务器 |
| **部署平台** | Vercel, 腾讯云 EdgeOne Pages | - | 部署平台 |

## 6. 项目结构

```
/workspace/
├── src/                            # 应用源代码目录
│   ├── app/                        # Next.js App Router 目录
│   │   ├── learn/                  # 学习页面路由
│   │   │   └── page.tsx            # 学习页面组件
│   │   ├── practice/               # 练习页面路由
│   │   │   └── page.tsx            # 练习页面组件
│   │   ├── globals.css             # 全局样式（Tailwind CSS）
│   │   ├── layout.tsx              # 根布局组件
│   │   └── page.tsx                # 首页组件
│   ├── components/                 # 可复用组件
│   │   ├── locale-provider.tsx     # 国际化上下文提供组件
│   │   ├── locale-toggle.tsx       # 语言切换组件
│   │   ├── theme-provider.tsx      # 主题上下文提供组件
│   │   ├── theme-toggle.tsx        # 主题切换组件
│   │   ├── mobile-nav.tsx           # 移动端导航抽屉组件
│   │   ├── nav-link.tsx             # 导航链接组件
│   │   ├── feature-card.tsx         # 功能特性卡片组件
│   │   └── stats-card.tsx           # 统计数据显示卡片组件
│   └── lib/                        # 工具函数和配置
│       └── i18n/                   # 国际化模块
│           ├── translations/        # 翻译文件目录
│           │   ├── en.ts
│           │   ├── zh-CN.ts
│           │   ├── zh-TW.ts
│           │   ├── es.ts
│           │   ├── ar.ts
│           │   ├── fr.ts
│           │   ├── pt-BR.ts
│           │   ├── de.ts
│           │   ├── ja.ts
│           │   ├── ko.ts
│           │   └── ru.ts
│           └── index.ts            # 国际化配置导出
├── openspec/                       # 项目规范文档
│   ├── index.md                    # 文档索引
│   ├── 01-overview.md              # 项目概述（本文档）
│   ├── 02-architecture.md          # 技术架构
│   ├── 03-development.md           # 开发指南
│   ├── 04-api-reference.md         # API 参考
│   ├── 05-deployment.md            # 部署指南
│   ├── 06-testing.md              # 测试规范
│   ├── coding-standards.md         # 编码规范
│   ├── commit-template.md          # 提交模板
│   └── (已移除冗余 prototype.html — 见 prototype/ 唯一权威原型)
├── prototype/                      # 原型设计文件（唯一权威）
│   └── prototype.html              # 东方水墨·朱砂红高保真交互原型 (v5.0)
├── package.json                    # 项目依赖配置
├── package-lock.json               # 依赖锁定文件
├── tsconfig.json                   # TypeScript 配置
├── next.config.js                  # Next.js 配置
├── postcss.config.js               # PostCSS 配置
├── vercel.json                     # Vercel 部署配置
├── .env.example                    # 环境变量示例
├── .nvmrc                          # Node 版本配置
├── README.md                       # 项目说明（中文）
├── README_EN.md                    # 项目说明（英文）
└── CHANGELOG.md                   # 变更日志
```

## 7. 环境变量

| 变量名 | 说明 | 必填 | 示例值 |
|--------|------|------|--------|
| `GEMINI_API_KEY` | Google Gemini AI API 密钥 | 否 | `your-api-key-here` |

## 8. 相关文档

- [技术架构](02-architecture.md) - 系统架构设计和技术选型
- [开发指南](03-development.md) - 开发环境配置和编码规范
- [API 参考](04-api-reference.md) - 详细的 API 文档和代码示例
- [部署指南](05-deployment.md) - 部署流程和环境配置
- [测试规范](06-testing.md) - 测试策略和最佳实践
