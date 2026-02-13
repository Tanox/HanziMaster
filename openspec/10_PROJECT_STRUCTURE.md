
# 10. 项目文件结构 (Project Structure)

## 1. 目录概览
HanziMaster 采用扁平化的 React + Vite 项目结构，将源码直接置于根目录以简化引用，强调“功能模块化”与“离线优先”的数据分离。

```text
/
├── .github/                # GitHub Actions 工作流 (CI/CD)
├── .trae/                  # IDE 配置文件及项目规则
│   └── rules/              # 项目开发规则
├── dist/                   # 构建产物 (生产环境部署目录)
├── node_modules/           # 依赖包
├── openspec/               # [核心] 项目规范文档库 (Single Source of Truth)
├── public/                 # 静态资源
│   ├── hanzi-data/         # [核心] 9000+ 汉字 SVG 数据 (构建时自动生成)
│   ├── favicon.svg         # 站点图标
│   └── manifest.webmanifest# PWA 配置文件
├── scripts/                # 构建辅助脚本
│   └── copyHanziData.js    # 负责将 node_modules 中的汉字数据提取到 public 目录
├── components/             # React 组件
│   ├── analysis/           # AI 解析展示相关组件 (CharacterDisplay, IdiomDisplay, ShareImageButton)
│   ├── settings/           # [v0.4.9] 设置面板子组件 (SettingsAppearance, SettingsGrid, etc.)
│   ├── ui/                 # [v0.4.2] 通用 UI 组件 (Toast)
│   └── ...                 # 通用组件 (Header, Footer, Controls, SettingsModal, WelcomeScreen)
├── context/                # React Context (ToastContext)
├── constants/              # 静态常量配置 (commonChars, pinyinData, seasonalEvents)
├── hooks/                  # 自定义 Hooks
│   ├── useAppController.ts # [核心] 主控制器，协调数据与交互
│   ├── useContentFetcher.ts# [v0.4.9] 数据获取与 AI 分析逻辑
│   ├── useInteractionState.ts # [v0.4.9] 交互模式与动画状态管理
│   ├── usePracticeDrawing.ts # [v0.4.9] 临摹手写逻辑与几何校验
│   ├── useStrokeAnimation.ts # [v0.4.9] SVG 笔顺动画引擎
│   ├── useSuggestions.ts   # [v0.4.9] 随机/节庆推荐逻辑
│   └── useLocalStorage.ts  # 持久化存储 Hook
├── locales/                # 多语言翻译文件 (i18n)
├── services/               # 外部服务集成 (Gemini API, TTS, Hanzi Data Fetcher)
├── types/                  # TypeScript 类型定义
├── utils/                  # 工具函数 (几何计算, 图像生成)
├── App.tsx                 # 根组件
├── index.tsx               # 入口文件
├── index.html              # HTML 模板 (包含 CSP 与 SEO Meta)
├── metadata.json           # [环境] AI 容器/沙盒环境配置 (权限声明)
├── package.json            # 依赖管理与脚本定义
├── tailwind.config.js      # 样式配置
├── tsconfig.json           # TypeScript 配置
├── vercel.json             # [部署] Vercel 路由重写配置
├── vite.config.ts          # 构建工具配置 (PWA 插件配置)
└── vite-env.d.ts           # Vite 类型定义声明
```

## 2. 关键目录职责

### 2.1 `hooks/` (架构核心)
HanziMaster 采用 **Hook-based Architecture**，将业务逻辑从 UI 组件中彻底剥离：
*   **控制器 (Orchestrator)**: `useAppController.ts` 是唯一入口，负责组装所有子 Hooks。
*   **能力层 (Capabilities)**: 
    *   `useContentFetcher`: 负责 Gemini API 调用、本地 JSON 获取及 L2 缓存策略。
    *   `useInteractionState`: 管理 View/Practice 模式切换及播放状态。
*   **引擎层 (Engines)**:
    *   `useStrokeAnimation`: 封装 `requestAnimationFrame` 驱动的 SVG 动画。
    *   `usePracticeDrawing`: 封装 Canvas 手写轨迹捕获与欧几里得距离校验算法。

### 2.2 `components/settings/`
为了避免 `SettingsModal` 过于臃肿，v0.4.9 引入了子组件拆分策略：
*   将外观、网格、学习、API Key 等模块拆分为独立文件。
*   提高代码可读性与维护性。

### 2.3 `public/hanzi-data/`
**离线能力的基石**。
*   此目录不在 git 中提交（体积过大），而是在 `npm run build` 或 `npm run copy-data` 时由 `scripts/copyHanziData.js` 动态生成。
*   **PWA 策略**: Service Worker 会优先缓存此目录下的高频汉字文件。

## 3. 命名规范

| 类型 | 命名方式 | 示例 |
| :--- | :--- | :--- |
| **组件文件** | PascalCase | `StrokeViewer.tsx`, `Toast.tsx` |
| **Hook 文件** | camelCase (use前缀) | `useAppController.ts`, `useStrokeAnimation.ts` |
| **Context 文件** | PascalCase | `ToastContext.tsx` |
| **工具/服务** | camelCase | `geminiService.ts`, `geometry.ts` |
| **常量文件** | camelCase | `commonChars.ts`, `pinyinData.ts` |
| **CSS 类名** | kebab-case (Tailwind) | `bg-slate-900`, `text-vermilion-500` |

---
*文档维护: HanziMaster Architecture Team*
