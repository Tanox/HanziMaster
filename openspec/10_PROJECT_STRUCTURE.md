# 10. 项目文件结构

**版本**: v0.7.1
**状态**: 现行规范

## 1. 根目录结构 (Root Structure)
```
.
├── app/                  # 核心前端源码
├── openspec/             # 项目规范文档 (Single Source of Truth)
├── public/               # 静态资源 (icons, fonts, hanzi-data)
├── .github/              # (可选) CI/CD 工作流
├── .trae/                # AI 代理规则
├── CHANGELOG.md          # 版本更新日志
├── index.html            # 应用入口
├── package.json          # 依赖与脚本
├── tsconfig.json         # TypeScript 配置
└── vite.config.ts        # Vite 构建配置
```

## 2. `app/` 核心源码目录
`app/` 目录遵循“按功能领域划分 (Feature-based)”和“按文件类型划分 (Type-based)”相结合的策略。

```text
app/
├── components/         # 可复用的 React UI 组件
│   ├── analysis/       # 分析面板内的卡片组件
│   ├── dashboard/      # 应用主界面的大型组合组件
│   ├── settings/       # 设置面板内的子组件
│   └── ui/             # 通用原子组件 (Toast, Button, etc.)
├── constants/          # 应用内的静态常量数据 (常用字、拼音表等)
├── context/            # React Context (如 ToastProvider)
├── hooks/              # 业务逻辑 Hooks (自定义 Hooks)
├── locales/            # 国际化 (i18n) 语言文件
├── scripts/            # Node.js 构建脚本 (如数据拷贝)
├── services/           # 外部服务交互层 (API 调用)
├── types/              # 全局 TypeScript 类型定义
└── utils/              # 通用工具函数 (无副作用的纯函数)
```

## 3. 规范说明
*   **关注点分离 (Separation of Concerns)**:
    *   **`components/`**: 只负责 UI 渲染和用户事件的初步处理。禁止在组件内部直接进行 API 调用或复杂的业务逻辑计算。
    *   **`hooks/`**: 封装所有状态管理和业务逻辑。例如，`useAppController` 是整个应用的“大脑”。
    *   **`services/`**: 隔离所有外部世界的交互。所有网络请求（如 `fetch` 或 `new GoogleGenAI`）必须封装在此目录下。这使得替换 API 或增加缓存层变得容易。
    *   **`utils/`**: 存放纯计算逻辑（如 `geometry.ts` 中的几何计算），不得包含任何 React 代码或 JSX，确保其可被轻松测试和复用。
*   **绝对路径与相对路径**:
    *   在 `app/` 内部，优先使用相对路径 (`../`) 引用模块，以保持模块的内聚性。
    *   引用 `public/` 下的静态资源时，必须使用根相对路径 (`/favicon.svg`)。

---
*文档维护: HanziMaster Arch Team*