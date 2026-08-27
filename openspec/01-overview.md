# 项目概述
============

## 1. 项目基本信息

| 项目属性 | 值 |
|---------|-----|
| **项目名称** | HanziMaster 汉字大师 |
| **版本** | v5.2.24 |
| **说明** | 中文字符学习平台 |
| **主要语言** | TypeScript |
| **项目类型** | Web 应用 |
| **前端框架** | Next.js 16 |
| **Node.js 要求** | >= 24.11.0 |

## 2. 项目简介

HanziMaster 汉字大师是一个现代化的汉字学习平台。它通过引导式练习、笔顺展示与结构提示，帮助用户高效学习汉字书写。

## 3. 目标与范围

### 3.1 项目目标

- 提供个性化、引导式的汉字学习体验
- 结合传统学习方法与清晰的笔顺结构提示
- 打造美观、响应式的用户界面（东方水墨·朱砂红设计系统）
- 支持多语言国际化
- 实现高效的汉字书写练习和分析功能

### 3.2 目标用户

- 中文学习者（初学者到高级学习者）
- 需要练习汉字书写的用户
- 对汉字文化和词源感兴趣的用户

### 3.3 项目范围

**包含功能：**
- 笔顺展示与结构反馈
- 汉字学习和练习功能
- 深色/浅色模式支持
- 多语言国际化
- 响应式设计，支持多种设备
- 东方水墨·朱砂红的极简 UI 设计

**暂不包含：**
- 用户账户和进度云端同步（仅本地存储）
- 社交功能
- 在线课程购买

## 4. 核心功能

| 功能模块 | 说明 |
|---------|------|
| 笔顺与结构反馈 | 提供清晰的笔画顺序指引与结构提示，帮助规范书写 |
| 多种学习模式 | 基础学习、书写练习、拼音测验、学习进度追踪 |
| 田字格书写练习 | Canvas 手写绘制，支持触摸屏与鼠标，带实时发音播放 |
| 拼音测验 | 4 选 1 拼音测试，实时正确/错误统计与准确率分析 |
| 个性化进度 | 书写/测验结果自动持久化，连续学习天数、准确率、周活动可视化 |
| 深色/浅色模式 | 支持持久化主题偏好和系统自动检测 |
| 国际化 (i18n) | 支持 11 种语言，包括英语、简体中文、繁体中文、西班牙语、阿拉伯语、法语、葡萄牙语、德语、日语、韩语和俄语 |
| 语言切换器 | 便捷的语言切换并支持本地存储偏好 |
| 中文优化显示 | 集成 Noto Serif SC 字体提供优雅的汉字展示 |

## 5. 技术栈

| 分类 | 技术 | 版本 | 用途 |
|------|-----|------|------|
| **前端框架** | Next.js | ^16.2.9 | 前端应用框架（App Router） |
| **UI 库** | React | ^19.1.0 | UI 组件库 |
| **编程语言** | TypeScript | ^5.7.3 | 开发语言 |
| **样式框架** | Tailwind CSS | ^4.0.12 | 样式框架 |

| **图标库** | Lucide React | ^0.544.0 | 图标 |
| **字体** | Space Grotesk, Playfair Display, Noto Serif SC, JetBrains Mono | - | 界面/展示/汉字/代码字体 |
| **包管理器** | pnpm | >= 11（锁定 11.24.0） | 依赖管理（强制，only-allow 拦截 npm/yarn） |
| **测试框架** | Vitest | ^3.2.4 | 单元测试 |
| **代码格式化** | Prettier | - | 代码风格 |
| **部署平台** | Vercel, 腾讯云 EdgeOne Pages | - | 部署平台 |

## 6. 项目结构

```
HanziMaster/
├── src/                            # 应用源代码目录
│   ├── app/                        # Next.js App Router 目录
│   │   ├── learn/                  # 学习页面路由
│   │   │   └── page.tsx            # 学习页面组件
│   │   ├── practice/               # 练习页面路由
│   │   │   └── page.tsx            # 练习页面组件
│   │   ├── globals.css             # 全局样式（Tailwind CSS + 设计 token）
│   │   ├── layout.tsx              # 根布局组件
│   │   └── page.tsx                # 首页组件
│   ├── components/                 # 可复用组件
│   │   ├── learn/ practice/ ui/    # 业务/基础组件子目录
│   │   ├── locale-provider.tsx     # 国际化上下文提供组件
│   │   ├── locale-toggle.tsx       # 语言切换组件
│   │   ├── theme-provider.tsx      # 主题上下文提供组件
│   │   ├── theme-toggle.tsx        # 主题切换组件
│   │   ├── mobile-nav.tsx           # 移动端导航抽屉组件
│   │   ├── nav-link.tsx             # 导航链接组件
│   │   ├── feature-card.tsx         # 功能特性卡片组件
│   │   └── stats-card.tsx           # 统计数据显示卡片组件
│   ├── hooks/                      # 自定义 hooks（use-progress / use-pronunciation / use-scroll-reveal …）
│   └── lib/                        # 工具函数和配置
│       └── i18n/                   # 国际化模块
│           ├── translations/        # 翻译文件目录（en/zh-CN/zh-TW/es/ar/fr/pt-BR/de/ja/ko/ru）
│           └── index.ts            # 国际化配置导出（含 TranslationKey 类型）
├── openspec/                       # 项目规范文档
│   ├── index.md                    # 文档索引
│   ├── 01-overview.md              # 项目概述（本文档）
│   ├── 02-architecture.md          # 技术架构
│   ├── 03-development.md           # 开发指南
│   ├── 04-api-reference.md         # API 参考
│   ├── 05-deployment.md            # 部署指南
│   ├── 06-testing.md              # 测试规范
│   ├── coding-standards.md         # 编码规范
│   └── commit-template.md          # 提交模板
├── prototype/                      # 原型设计文件（唯一权威，含 prototype.html / learn.html / practice.html / progress.html / DESIGN_SPEC.md / wireframes.html）
├── pnpm-lock.yaml                  # 依赖锁定文件（pnpm）
├── package.json                    # 项目依赖配置
├── tsconfig.json                   # TypeScript 配置
├── next.config.mjs                 # Next.js 配置（含安全响应头）
├── postcss.config.js               # PostCSS 配置
├── vitest.config.ts                # Vitest 配置
├── vercel.json / edgeone.json      # 部署配置
├── .npmrc                          # pnpm 强制约束（engine-strict / package-manager-strict）
├── .env.example                    # 环境变量示例
├── .nvmrc                          # Node 版本配置（>= 24.11.0）
├── README.md / README_EN.md        # 项目说明
└── CHANGELOG.md                    # 变更日志
```

## 7. 环境变量

| 变量名 | 说明 | 必填 | 示例值 |
|--------|------|------|--------|
| （无） | HanziMaster 无需任何环境变量即可运行 | 否 | — |

## 8. 相关文档

- [技术架构](02-architecture.md) - 系统架构设计和技术选型
- [开发指南](03-development.md) - 开发环境配置和编码规范
- [API 参考](04-api-reference.md) - 详细的 API 文档和代码示例
- [部署指南](05-deployment.md) - 部署流程和环境配置
- [测试规范](06-testing.md) - 测试策略和最佳实践
