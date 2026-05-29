# 项目概述

## 1. 基本信息

| 属性 | 值 |
|------|-----|
| 项目名称 | HanziMaster 汉字大师 |
| 版本 | v2.2.0 |
| 说明 | AI驱动的中文字符学习平台 |
| 框架 | Next.js 15 + React 19 |
| 样式 | Tailwind CSS 4.0 |

## 2. 核心功能

1. AI驱动的手写分析和实时反馈
2. 自适应学习路径
3. 字符和文化词源学习
4. 深色/浅色模式支持，本地存储主题偏好
5. 国际化(i18n)支持，包含11种语言
6. 语言切换器，支持本地存储偏好

## 3. 技术栈

| 分类 | 技术 |
|------|------|
| 前端框架 | Next.js 15 + React 19 |
| 样式框架 | Tailwind CSS 4.0 |
| AI服务 | Google Gemini AI |
| 图标 | SVG Icons |
| 字体 | Inter, JetBrains Mono, Noto Sans SC |
| 国际化 | 自定义 i18n 服务 |
| 构建工具 | Next.js CLI |

## 4. 项目结构

```
src/
├── app/                  # Next.js App Router 目录
│   ├── learn/            # 学习页面路由
│   │   └── page.tsx      # 学习页面组件
│   ├── globals.css       # 全局样式（Tailwind CSS）
│   ├── layout.tsx        # 根布局组件
│   └── page.tsx          # 首页组件
├── components/           # 通用组件
│   ├── locale-provider.tsx    # 国际化上下文提供组件
│   ├── locale-toggle.tsx      # 语言切换组件
│   ├── theme-provider.tsx     # 主题上下文提供组件
│   └── theme-toggle.tsx       # 主题切换组件
└── lib/                  # 工具函数和配置
    └── i18n/            # 国际化模块
        ├── translations/ # 翻译文件目录
        │   ├── en.ts, zh-CN.ts, zh-TW.ts, es.ts, ar.ts
        │   └── fr.ts, pt-BR.ts, de.ts, ja.ts, ko.ts, ru.ts
        └── index.ts      # 国际化配置导出
openspec/                # 项目规范文档
├── overview.md          # 项目概述（本文档）
├── ARCHITECTURE.md      # 架构设计文档
├── CONVENTIONS.md       # 开发规范
├── PROJECT.md           # 项目说明
├── STACK.md             # 技术栈文档
└── coding-standards.md  # 编码规范
```

## 5. 开发命令

| 命令 | 说明 |
|------|------|
| `npm install` | 安装依赖 |
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 构建生产版本 |
| `npm run lint` | 代码检查 |

## 6. 相关文档

- [架构设计](ARCHITECTURE.md) - 项目架构和目录结构
- [开发规范](CONVENTIONS.md) - 开发流程和代码规范
- [项目说明](PROJECT.md) - 项目概述和核心功能
- [技术栈](STACK.md) - 技术栈详情
- [编码规范](coding-standards.md) - 项目编码标准和最佳实践