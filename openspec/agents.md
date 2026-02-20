# HanziMaster AI 协作规范 (Agents)

**版本**: v0.7.1
**状态**: 现行规范

本文档定义了 AI 助手在协助开发 HanziMaster 时的特定工作准则，以确保代码质量、一致性和项目目标的实现。

## 1. 产品原则 (Product Principles)
*   **教学为本 (Teaching First)**: 所有功能开发和代码修改必须优先考虑“教学价值”。例如，一个精确的错误反馈逻辑比一个华丽但无关紧要的动画更重要。
*   **纸墨美学 (Paper & Ink Aesthetic)**: 默认且优先优化浅色模式（模拟宣纸）。Dark Mode 仅作为辅助适配，无需过度设计。所有 UI 元素都应符合“静谧、专注”的设计哲学。
*   **隐私优先 (Privacy First)**: 严禁编写任何可能将用户数据（包括练习历史、API Key）发送到外部服务器的代码。所有数据必须保持在客户端。

## 2. 编码约束 (Coding Constraints)
*   **React 18**: 严格使用 React 18 API。**禁止**使用 React 19 的实验性特性（如 `use()` Hook 或 React Compiler），直到项目正式决定升级。
*   **零 Node.js 运行时依赖**: 前端源码 (`app/` 目录) 中禁止引入 `fs`, `path`, `process` 等任何 Node.js 核心模块。这些模块仅允许在 `next.config.mjs` 或 `app/scripts/` 等构建时环境中使用。
*   **严格遵循 SDK 规范**: 所有对 `@google/genai` 的使用必须遵循项目 `.trae/` 目录下定义的最新编码规范。

## 3. Google GenAI SDK 使用规范
*   **初始化**: 必须使用 `new GoogleGenAI({ apiKey: ... })` 的命名参数形式。
*   **模型选择**:
    *   文本与 JSON 解析: `gemini-3-flash-preview`
    *   文本转语音 (TTS): `gemini-2.5-flash-preview-tts`
*   **结构化输出**: 必须为需要 JSON 输出的请求配置 `responseMimeType: "application/json"` 和 `responseSchema`，以确保 API 的可靠性。

## 4. 文档驱动开发 (Documentation-Driven Development)
*   **先查阅，后编码**: 在进行任何非琐碎的代码修改（如添加新功能、重构核心逻辑）之前，**必须**先查阅 `openspec/` 中的对应规范文档。如果相关规范不存在，应先提出文档更新草案。
*   **代码与文档同步**: 代码变更后，如果影响了产品功能、技术架构或 API 协议，**必须**同步更新相关的 `openspec/` 文档，并递增其版本号。
*   **Changelog**: 每次有意义的提交合并到 `dev` 分支后，都应在 `CHANGELOG.md` 中添加相应的记录。

---
*文档维护: HanziMaster Architect*