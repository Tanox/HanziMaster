
# 02. 技术架构与工程准则

## 1. 核心技术栈
*   **React**: `18.3.1` (禁止使用 v19 特性)
*   **Next.js**: `15.1.0`
*   **TypeScript**: `5.7+` (全局 `strict: true`)
*   **@google/genai**: `0.2.0+`
*   **Node.js**: `18.0+` (用于运行构建脚本)

## 2. 状态管理：Hooks 分层架构
为避免 `useAppController` 成为上帝对象，状态管理严格按下述原则抽离：
*   **`useAppController` (协调者)**: 应用的“大脑”。唯一持有 `activeChar` 与 `activeTerm`。负责 URL 解析、全局 Modal 状态、以及协调各子 Hook 间的交互。
*   **`useContentFetcher` (数据源)**: 负责获取与缓存 `HanziData` (笔顺)、`CharacterAnalysis` (AI 解析) 和 `IdiomAnalysis`。
*   **`useInteractionState` (交互态)**: 负责播放、重置、模式切换 (Watch/Practice) 等瞬时 UI 状态。
*   **`useUserProgress` (用户进度)**: 独立管理用户的学习历史 (`HistoryItem[]`) 和已学清单 (`learnedItems: string[]`)，并与 `LocalStorage` 通信。
*   **`useDataSync` (数据同步)**: 封装所有离线数据（笔顺库、词典）的下载、缓存与审计逻辑。

## 3. `app/` 核心源码目录
```text
app/
├── components/     # UI 组件
│   ├── analysis/   #   - 分析面板卡片
│   ├── dashboard/  #   - 主界面大型组合组件
│   ├── settings/   #   - 设置面板子组件
│   └── ui/         #   - 通用原子组件 (Toast)
├── constants/      # 静态常量数据 (常用字、离线词典)
├── context/        # React Context (ToastProvider)
├── hooks/          # 业务逻辑 Hooks (核心)
├── locales/        # i18n 语言文件
├── scripts/        # Node.js 构建脚本 (数据拷贝)
├── services/       # 外部服务交互层 (API 调用)
├── types.ts        # 全局 TypeScript 类型定义
└── utils/          # 通用工具函数 (几何计算等)
```

## 4. Git 工作流与编码规范
*   **分支模型**: 遵循 Git Flow (`main`, `dev`, `feature/*`, `fix/*`)。
*   **提交信息**: 必须遵循**语义化提交 (Semantic Commit Messages)**规范。
    *   `feat(practice): add ghosting hint mechanism`
    *   `fix(canvas): resolve touch event conflict on iOS`
    *   `docs(openspec): update a11y standards`
*   **命名**: 
    *   组件: `PascalCase` (e.g., `StrokeViewer.tsx`)
    *   Hooks: `useCamelCase` (e.g., `useAppController.ts`)
*   **文件头部注释**: 每个 `.ts` / `.tsx` 文件首行必须包含版本注释，例如 `// app/components/Header.tsx v1.0.6`。

---
*文档维护: HanziMaster Architecture Team*
