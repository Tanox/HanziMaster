# 项目概述

## 基本信息
- **项目名称**: HanziMaster 汉字大师
- **版本**: v2.1.4
- **说明**: AI驱动的中文字符学习平台
- **框架**: Angular 21 (Zoneless)
- **样式**: Tailwind CSS 4.0

## 核心功能
1. AI驱动的手写分析和实时反馈
2. 自适应学习路径
3. 字符和文化词源学习
4. 深色/浅色模式支持
5. 本地存储主题偏好

## 技术栈
- **前端**: Angular 21
- **样式**: Tailwind CSS 4.0
- **AI**: Google Gemini AI
- **图标**: Angular Material Icons
- **动画**: Motion (Vanilla JS)
- **字体**: Inter, JetBrains Mono, Noto Sans SC

## 项目结构
```
app/
├── components/
│   └── theme-toggle.ts
├── pages/
│   ├── home/
│   │   └── home.ts
│   └── learn/
│       └── learn.ts
├── app.config.ts
├── app.routes.ts
├── app.ts
├── globals.d.ts
├── index.html
├── main.ts
└── styles.css
openspec/
├── overview.md
├── coding-standards.md
├── commit-template.md
└── api-reference.md
```

## 环境变量
- `GEMINI_API_KEY`: Gemini AI API密钥
- `APP_URL`: 应用程序URL
- `SHARED_APP_URL`: 共享应用程序URL
