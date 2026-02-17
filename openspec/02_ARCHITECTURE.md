# 02. 技术架构与工程准则

**版本**: v1.0.0
**职责**: 定义软件拓扑结构与工程质量边界

## 1. 架构分层 (Hook-Driven)
应用采用逻辑与 UI 彻底分离的 React 架构，强制执行以下 Hook 分层：
*   **`useAppController`**: 顶层协调者。负责全局 Modal 状态、路由解析、以及子 Hook 间的调度。
*   **`useUserProgress`**: (v1.0.0 核心重构项) 独立管理 HSK 进度、学习统计、SRS 时间戳。
*   **`useContentFetcher`**: 隔离 I/O 逻辑。负责 HanziData、AI 解析与拼音缓存的获取。
*   **`useInteractionState`**: 管理播放、重置、模式切换等瞬时 UI 状态。

## 2. 目录结构
```text
app/
├── components/         # 原子 UI 组件 (dashboard, settings, analysis)
├── constants/          # 静态真理 (HSK 词库, 拼音表, 节气)
├── hooks/              # 业务逻辑中心 (useUserProgress, useStrokeAnimation)
├── services/           # 外部服务适配器 (Gemini API, HanziService, TTS)
├── utils/              # 纯计算工具 (几何 Fréchet 计算, 图像生成)
└── types.ts            # 全局强类型定义
```

## 3. 编码准则 (Engineering Standards)
*   **强类型**: 禁止使用 `any`，所有函数需显式声明入参及返回类型。
*   **版本头部**: 每个 `.ts/tsx` 文件首行必须包含 `vX.Y.Z` 注释。
*   **离线优先**: 网络请求必须包含三级降级路径 (LocalStorage -> SW Cache -> CDN/AI)。
*   **Git 规范**: 必须使用语义化提交 (e.g., `feat(practice): ...`, `fix(canvas): ...`)。

---
*文档维护: HanziMaster Arch Team*