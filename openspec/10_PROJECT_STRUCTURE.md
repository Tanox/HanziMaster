
# 10. 项目文件结构 (Project Structure)

## 1. 目录概览
HanziMaster 采用标准的 React + Vite 项目结构，强调“功能模块化”与“离线优先”的数据分离。

```text
/
├── .github/                # GitHub Actions 工作流 (CI/CD)
├── dist/                   # 构建产物 (生产环境部署目录)
├── node_modules/           # 依赖包
├── openspec/               # [核心] 项目规范文档库 (Single Source of Truth)
├── public/                 # 静态资源
│   ├── hanzi-data/         # [核心] 9000+ 汉字 SVG 数据 (构建时自动生成)
│   ├── favicon.svg         # 站点图标
│   └── manifest.webmanifest# PWA 配置文件
├── scripts/                # 构建辅助脚本
│   └── copyHanziData.js    # 负责将 node_modules 中的汉字数据提取到 public 目录
├── src/                    # 源代码目录
│   ├── components/         # React 组件
│   │   ├── analysis/       # AI 解析展示相关组件
│   │   └── ...             # 通用组件 (Header, Footer, Controls)
│   ├── constants/          # 静态常量配置
│   ├── hooks/              # 自定义 Hooks (useAppController, useLocalStorage)
│   ├── locales/            # 多语言翻译文件 (i18n)
│   ├── services/           # 外部服务集成 (Gemini API, TTS, Hanzi Data Fetcher)
│   ├── types/              # TypeScript 类型定义
│   ├── utils/              # 工具函数 (几何计算, 图像生成)
│   ├── App.tsx             # 根组件
│   └── index.tsx           # 入口文件
├── index.html              # HTML 模板 (包含 CSP 与 SEO Meta)
├── package.json            # 依赖管理与脚本定义
├── tailwind.config.js      # 样式配置
├── tsconfig.json           # TypeScript 配置
└── vite.config.ts          # 构建工具配置 (PWA 插件配置)
```

## 2. 关键目录职责

### 2.1 `openspec/`
**绝对权威的文档库**。任何代码变更必须先在此处更新相应的规范文档。
*   **原则**: Code follows Spec.

### 2.2 `public/hanzi-data/`
**离线能力的基石**。
*   此目录不在 git 中提交（体积过大），而是在 `npm run build` 或 `npm run copy-data` 时由 `scripts/copyHanziData.js` 动态生成。
*   **PWA 策略**: Service Worker 会优先缓存此目录下的高频汉字文件。

### 2.3 `src/services/`
**业务逻辑与视图的隔离层**。
*   `geminiService.ts`: 处理与 Google Gemini 的通信，包含 Prompt 工程与 JSON 清洗逻辑。
*   `hanziService.ts`: 处理汉字数据的获取策略（Local -> CDN Fallback）。
*   `ttsService.ts`: 处理混合语音逻辑（Cache -> API -> Native）。

### 2.4 `src/hooks/useAppController.ts`
**全剧状态控制器**。
*   App.tsx 仅负责渲染，所有的状态流转（搜索、播放、模式切换、设置更新）均由此 Hook 统一管理。
*   实现 View 与 Logic 的彻底解耦。

## 3. 命名规范

| 类型 | 命名方式 | 示例 |
| :--- | :--- | :--- |
| **组件文件** | PascalCase | `StrokeViewer.tsx`, `SearchInput.tsx` |
| **Hook 文件** | camelCase (use前缀) | `useLocalStorage.ts` |
| **工具/服务** | camelCase | `geminiService.ts`, `geometry.ts` |
| **常量文件** | camelCase | `commonChars.ts`, `seasonalEvents.ts` |
| **CSS 类名** | kebab-case (Tailwind) | `bg-slate-900`, `text-vermilion-500` |

---
*文档维护: HanziMaster Architecture Team*
