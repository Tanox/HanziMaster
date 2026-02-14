# HanziMaster AI 协作规范 (Agents)

本文档定义了 AI 助手在协助开发 HanziMaster 时的特定工作准则，旨在确保代码库的简洁性与 AI 响应的专业性。

## 1. Google GenAI 实施准则
AI 助手在编写 `services/` 相关代码时必须遵守以下硬性约束：
- **SDK 引用**: 必须使用 `import { GoogleGenAI } from "@google/genai";`。
- **模型选择**: 
  - 文本解析: `gemini-3-flash-preview`。
  - 语音合成 (TTS): `gemini-2.5-flash-preview-tts`。
- **Prompt 注入**: 所有的系统指令（System Instruction）必须强调“字源学专家”角色，输出必须为严谨的 JSON 格式。
- **API Key**: 严禁在 UI 层处理 Key，必须通过环境变量获取，或从 `AppSettings` 中读取。

## 2. 笔画引擎开发规范
在处理 `hooks/useStrokeAnimation` 或 `hooks/usePracticeDrawing` 时：
- **几何算法**: 优先使用平面几何计算而非重量级第三方库，保持轻量级。
- **坐标系**: 统一以 1024x1024 为基准坐标，Y 轴向下偏移 900 单位进行镜像转换。
- **性能**: 动画驱动必须使用 `requestAnimationFrame`，禁止使用 `setInterval`。

## 3. UI/UX 协作规范
- **Tailwind 优先**: 禁止编写自定义 CSS 文件，除非处理复杂的 SVG 滤镜或 Canvas 纹理。
- **响应式**: 所有新组件必须同时提供 Mobile-First 的布局方案，点击区域（Touch Target）不得小于 44px。
- **反馈闭环**: 任何异步操作（加载、保存、复制）必须触发全局 `Toast` 通知。

## 4. 文档同步要求
AI 助手在每次完成重大功能开发后，必须主动提出更新 `openspec/` 对应文档的建议，确保“文档即代码”。

---
*署名：Sut (HanziMaster Architect)*