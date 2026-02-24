# 11. 开发指南 (Development Guide)

**版本**: v0.7.1
**状态**: 现行规范

## 1. 技术栈锁定 (Tech Stack)
为保证项目稳定性和一致性，开发中必须遵循以下技术栈版本：
*   **Next.js**: `15.1.0` (App Router)。
*   **React**: `18.3.1`。
*   **TypeScript**: `5.7+` (项目已开启 `strict: true`，所有代码必须强类型)。
*   **@google/genai**: `0.2.0+`
*   **Node.js**: `18.0+` (用于运行构建脚本)。

## 2. 编码规范 (Coding Standards)
*   **格式化**: 所有代码提交前必须通过 Prettier (或等效工具) 进行格式化。
*   **命名**: 
    *   组件: `PascalCase` (e.g., `StrokeViewer.tsx`)
    *   Hooks: `useCamelCase` (e.g., `useAppController.ts`)
    *   变量/函数: `camelCase`
    *   常量: `UPPER_SNAKE_CASE`
*   **Import 顺序**: 遵循以下顺序，以提高可读性。
    1.  React / 外部库 (`import React from 'react';`)
    2.  内部类型 (`import type { HanziData } from '../types';`)
    3.  内部服务 (`import { geminiService } from '../services/geminiService';`)
    4.  内部组件/Hooks/Utils (`import StrokeViewer from './StrokeViewer';`)
    5.  样式文件 (`import './style.css';`)
*   **文件头部注释**: 每个 `.ts` / `.tsx` 文件首行必须包含版本注释，例如 `/** HanziMaster v0.7.1 */`。

## 3. Git 工作流 (Git Workflow)
*   **分支模型**: 遵循 Git Flow。
    *   `main`: 生产分支，只接受来自 `dev` 的合并。
    *   `dev`: 开发集成分支。
    *   `feature/feature-name`: 功能开发分支，从 `dev` 创建。
    *   `fix/bug-description`: Bug 修复分支，从 `dev` 创建。
*   **提交信息 (Commit Message)**: 必须遵循**语义化提交 (Semantic Commit Messages)**规范。
    *   `feat(practice): add ghosting hint mechanism`
    *   `fix(canvas): resolve touch event conflict on iOS`
    *   `docs(openspec): update a11y standards`
    *   `refactor(service): improve geminiService error handling`
    *   `chore(deps): upgrade vite to 6.0.3`

## 4. 离线数据处理 (Offline Data)
*   **数据源**: `hanzi-writer-data` 是一个 `devDependency`，其数据不会直接打包进应用。
*   **构建步骤**: 运行 `npm run copy-data` 时，会自动执行 `app/scripts/copyHanziData.js` 脚本。此脚本会生成 `public/hanzi-data/character-list.json` 和 `app/constants/dictionaryMeta.ts`。
*   **API 路由**: 汉字数据通过 `/app/api/hanzi/[char]/route.ts` 按需提供，避免了大量静态文件的复制。
*   **缓存策略**: `next-pwa` 配置会自动对 `/api/hanzi/*` 路径下的所有文件应用 `CacheFirst` 策略，确保一旦加载，后续访问将从本地缓存读取。

---
*文档维护: HanziMaster Dev Team*