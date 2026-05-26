# 项目概述

## 1. 基本信息

| 属性 | 值 |
|------|-----|
| 项目名称 | HanziMaster 汉字大师 |
| 版本 | v2.2.0 |
| 说明 | AI驱动的中文字符学习平台 |
| 框架 | Angular 21 (Zoneless) |
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
| 前端框架 | Angular 21 |
| 样式框架 | Tailwind CSS 4.0 |
| AI服务 | Google Gemini AI |
| 图标库 | Angular Material Icons |
| 动画库 | Motion (Vanilla JS) |
| 字体 | Inter, JetBrains Mono, Noto Sans SC |
| 国际化 | 自定义 i18n 服务 |

## 4. 项目结构

```
app/
├── components/           # 通用组件
│   ├── theme-toggle.ts   # 主题切换组件
│   └── locale-toggle.ts  # 语言切换组件
├── pages/               # 页面组件
│   ├── home/
│   │   └── home.ts
│   └── learn/
│       └── learn.ts
├── i18n/                # 国际化模块
│   ├── index.ts
│   ├── i18n.service.ts  # 国际化服务
│   └── locales/         # 语言文件目录
│       ├── en.ts, zh-CN.ts, zh-TW.ts, es.ts, ar.ts
│       └── fr.ts, pt-BR.ts, de.ts, ja.ts, ko.ts, ru.ts
├── app.config.ts        # 应用配置
├── app.routes.ts        # 路由配置
├── app.ts               # 根组件
├── globals.d.ts         # 全局类型定义
├── index.html           # 入口HTML
├── main.ts              # 应用入口
└── styles.css           # 全局样式
openspec/                # 项目规范文档
├── overview.md          # 项目概述（本文档）
├── api-reference.md     # API参考文档
├── coding-standards.md  # 编码规范
└── commit-template.md   # Git提交模板
```

## 5. 环境变量

| 变量名 | 说明 |
|--------|------|
| `GEMINI_API_KEY` | Gemini AI API 密钥 |
| `APP_URL` | 应用程序URL |
| `SHARED_APP_URL` | 共享应用程序URL |

## 6. 相关文档

- [API 参考](api-reference.md) - 详细的 API 文档和代码示例
- [编码规范](coding-standards.md) - 项目编码标准和最佳实践
- [提交模板](commit-template.md) - Git 提交消息规范
