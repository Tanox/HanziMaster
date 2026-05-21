# 架构设计

## 整体架构

HanziMaster 采用基于组件的单页应用（SPA）架构，使用 Angular 21 框架和 Zoneless 变更检测策略，确保高性能和良好的用户体验。

## 目录结构

```
/workspace/
├── app/                      # 应用源代码目录
│   ├── components/           # 可复用组件
│   │   └── theme-toggle.ts   # 主题切换组件
│   ├── pages/                # 页面组件
│   │   ├── home/             # 首页
│   │   │   └── home.ts
│   │   └── learn/            # 学习页面
│   │       └── learn.ts
│   ├── app.ts                # 根组件
│   ├── app.routes.ts         # 路由配置
│   ├── app.config.ts         # 应用配置
│   ├── main.ts               # 应用入口
│   ├── index.html            # HTML 模板
│   └── styles.css            # 全局样式
├── openspec/                 # 项目规范文档
├── package.json              # 项目依赖配置
└── vercel.json               # 部署配置
```

## 核心模块架构

### 1. 应用入口层

- [main.ts](file:///workspace/app/main.ts)：应用启动入口，配置并启动 Angular 应用
- [app.config.ts](file:///workspace/app/app.config.ts)：应用配置，包括路由、变更检测策略等
- [app.ts](file:///workspace/app/app.ts)：根组件，包含布局结构和导航

### 2. 路由系统

- [app.routes.ts](file:///workspace/app/app.routes.ts)：定义应用的路由配置
- 支持懒加载组件，优化初始加载性能

### 3. 页面层

- [Home](file:///workspace/app/pages/home/home.ts)：首页，展示应用介绍和主要功能
- [Learn](file:///workspace/app/pages/learn/learn.ts)：学习页面，提供汉字学习功能

### 4. 组件层

- [ThemeToggle](file:///workspace/app/components/theme-toggle.ts)：主题切换组件，支持深色/浅色模式切换

## 数据流

应用采用 Angular 的单向数据流和组件通信模式：
- 组件间通过输入属性和输出事件进行通信
- 使用 localStorage 进行主题偏好的持久化存储
- 与 Google Gemini AI 集成进行智能汉字分析

## 设计原则

1. **组件化**：UI 拆分为可复用、独立的组件
2. **响应式**：使用 Tailwind CSS 实现完全响应式设计
3. **性能优先**：采用 Zoneless 变更检测和懒加载优化性能
4. **可访问性**：支持深色/浅色模式和系统主题检测
