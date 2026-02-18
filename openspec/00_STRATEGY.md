
# 00. 项目总纲与协作策略

## 1. 品牌愿景 (Brand Vision)
融合传统书法美学与 AI 智慧，打造全球领先的**沉浸式汉字教学平台**。我们不仅教如何“写”，更致力于传承汉字背后的文化温度与美学价值。

## 2. 里程碑规划 (Roadmap)
*   **Phase 1 (v0.x - 已完成)**: 核心矢量渲染引擎、PWA 离线机制、三级数据降级策略。
*   **Phase 2 (v1.0.x - 当前)**: 
    *   ✅ **规范标准化**: 升级至 OpenSpec 7 模块体系。
    *   ✅ **架构重构**: 抽离 `useUserProgress` 等 Hooks，实现关注点分离。
    *   ✅ **数据健壮性**: 完善离线词典与笔顺库下载机制。
    *   ✅ **多感官反馈**: 新增练习音效反馈系统。
*   **Phase 3 (v1.1.x - 规划中)**: 
    *   **课程体系**: HSK 1-6 级联课程体系落地。
    *   **学习算法**: 集成 SRS 智能复习算法。
    *   **功能扩展**: 书写轨迹动态回放与分享。

## 3. AI 协作准则 (Agent Rules)
为确保代码库的高质量与一致性，所有协作 AI Agent 必须遵循：

### 3.1. 核心原则
*   **教学为本 (Teaching First)**: 功能开发必须优先考虑教学价值。一个精确的错误反馈比一个华丽的动画更重要。
*   **隐私禁令 (Privacy First)**: 严禁编写任何可能将用户数据（包括 API Key、练习历史）发送到外部服务器的代码。
*   **SSOT 准则**: 修改前必查 `openspec/` 索引；变更后必同步更新文档。

### 3.2. 技术约束
*   **React 18**: 严格使用 React 18 API，**禁止**使用 React 19 的实验性特性（如 `use()` Hook）。
*   **零 Node.js 运行时依赖**: 前端源码 (`app/` 目录) 中禁止引入 `fs`, `path` 等 Node.js 核心模块。
*   **SDK 规范**: 严格遵循 `@google/genai` 最新版 SDK 规范。
    *   **初始化**: 必须使用 `new GoogleGenAI({ apiKey: ... })` 的命名参数形式。
    *   **模型选择**: 
        *   文本与 JSON 解析: `gemini-3-flash-preview`
        *   文本转语音 (TTS): `gemini-2.5-flash-preview-tts`
    *   **结构化输出**: 必须为需要 JSON 输出的请求配置 `responseMimeType: "application/json"` 和 `responseSchema`。
---
*文档维护: HanziMaster Strategy Team*
