# 02. 应用架构设计 (Architecture Design)

**项目**: HanziMaster (汉字大师)
**版本**: v1.4.0
**状态**: 现行规范

## 1. 架构概览 (Architecture Overview)

HanziMaster 采用 **现代化的单页应用 (SPA) 架构**，结合 **Serverless 后端服务**，以实现高性能、高可用和易扩展性。核心设计理念是 **前后端分离**，前端负责极致的交互体验，后端提供数据支撑和 AI 能力。

## 2. 技术栈选型 (Technology Stack)

### 2.1 前端 (Frontend)
*   **框架**: **Next.js 15 (App Router)**
    *   *理由*: 业内领先的 React 框架，支持 SSR/SSG，SEO 友好，且 App Router 提供了优秀的路由和数据获取体验。
*   **语言**: **TypeScript**
    *   *理由*: 强类型系统，提高代码质量和可维护性，减少运行时错误。
*   **样式**: **Tailwind CSS v4**
    *   *理由*: 原子化 CSS，开发效率高，易于维护设计系统，且 v4 性能更优。
*   **动画**: **Framer Motion** & **Motion**
    *   *理由*: 声明式动画库，易于实现复杂的 UI 交互和转场效果。
*   **核心库**: **Hanzi Writer**
    *   *理由*: 专为汉字笔顺动画设计的轻量级 JS 库，支持 SVG 渲染和交互。
*   **图标**: **Lucide React**
    *   *理由*: 风格统一，轻量且易于定制。

### 2.2 后端 (Backend) & 服务 (Services)
*   **API 路由**: **Next.js API Routes** (Serverless Functions)
    *   *理由*: 与前端同构，部署简单，适合处理轻量级业务逻辑。
*   **AI 服务**: **Google Gemini API**
    *   *理由*: 强大的多模态大模型，用于生成汉字释义、组词、造句及智能评分建议。
*   **TTS 服务**: **Web Speech API** / **Google Cloud TTS** (可选)
    *   *理由*: 优先使用浏览器原生 API 降低成本，必要时回退到云服务保证质量。

### 2.3 数据存储 (Database & Storage)
*   **汉字数据**: **JSON / Static Files** (本地/CDN)
    *   *理由*: 汉字笔顺数据相对静态且体积可控，直接打包或通过 CDN 分发最为高效。
*   **用户数据**: **LocalStorage / IndexedDB** (当前阶段)
    *   *理由*: 保护隐私，无需登录即可使用，且读写速度极快。未来可扩展至云端数据库 (如 Firebase/Supabase)。

### 2.4 部署与运维 (DevOps)
*   **平台**: **Vercel / Google Cloud Run**
    *   *理由*: 自动化 CI/CD，全球 CDN 加速，Serverless 弹性伸缩。
*   **包管理**: **npm**
    *   *理由*: 标准且广泛支持。

## 3. 核心模块设计 (Core Modules)

### 3.1 用户界面模块 (UI Module)
*   **职责**: 负责页面渲染、用户交互、路由管理。
*   **组件**:
    *   `Layout`: 全局布局（Header, Footer, Sidebar）。
    *   `SearchInput`: 搜索框组件，处理输入和联想。
    *   `Dashboard`: 核心工作台，集成 Viewer 和 Controls。
    *   `SettingsModal`: 设置弹窗。

### 3.2 汉字数据库模块 (Hanzi Data Module)
*   **职责**: 提供汉字的笔顺数据、拼音、释义等静态信息。
*   **交互**:
    *   前端通过 `useHanziData` Hook 请求数据。
    *   优先从本地缓存读取，缺失时从 CDN 动态加载。
    *   数据格式遵循 `HanziData` 接口规范。

### 3.3 笔画动画模块 (Stroke Animation Module)
*   **职责**: 核心业务模块，负责汉字的动态绘制和交互。
*   **技术**: 基于 `hanzi-writer` 封装。
*   **功能**:
    *   `animateCharacter()`: 播放笔顺动画。
    *   `quiz()`: 启动书写测验模式。
    *   `loop()`: 循环播放。
    *   `showOutline()` / `hideOutline()`: 控制轮廓显示。

### 3.4 练习评估模块 (Evaluation Module)
*   **职责**: 对用户的书写进行实时评分和反馈。
*   **逻辑**:
    *   采集用户书写轨迹坐标 `(x, y, t)`。
    *   与标准笔画 SVG 路径进行比对 (Hausdorff 距离算法)。
    *   计算准确度 (Accuracy) 和 笔顺正确性 (Stroke Order)。
    *   生成综合评分 (0-100) 并高亮错误笔画。

### 3.5 AI 辅助模块 (AI Assistant Module)
*   **职责**: 调用 Gemini API 获取更深度的汉字知识。
*   **功能**:
    *   `analyzeCharacter(char)`: 获取字源、构词、例句。
    *   `generateFeedback(score)`: 根据评分生成鼓励性评语。

## 4. 数据流向 (Data Flow)

1.  **用户输入**: 用户在 `SearchInput` 输入汉字。
2.  **数据获取**:
    *   `DataService` 检查本地缓存。
    *   若无，请求 CDN 获取 `char_data.json`。
    *   同时调用 `GeminiService` 获取 AI 解析数据。
3.  **渲染展示**:
    *   `ViewerSection` 接收数据，初始化 `HanziWriter` 实例。
    *   `AnalysisSection` 展示拼音、释义和 AI 内容。
4.  **交互反馈**:
    *   用户点击 `Controls` -> 触发 `HanziWriter` 动画。
    *   用户书写 -> `HanziWriter` 捕获事件 -> `EvaluationService` 计算评分 -> UI 更新分数。

---
*文档维护: HanziMaster Architecture Team*
