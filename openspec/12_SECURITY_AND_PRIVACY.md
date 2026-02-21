# 12. 安全与隐私规范

**版本**: v0.7.1
**状态**: 现行规范

## 1. 核心原则：用户数据本地化 (User Data Localization)
HanziMaster 遵循**“零知识 (Zero-Knowledge)”**原则。我们不收集、不存储、也无法访问任何用户的个人学习数据。所有数据都 100% 留存在用户自己的浏览器中。

## 2. 学习数据隐私 (Learning Data Privacy)
*   **存储位置**: 用户的练习进度 (`practiceHistory`)、学习统计 (`learnedItems`)、应用设置 (`appSettings`) 和 AI 内容缓存 (`ai_analysis_cache`) 全部存储于浏览器 `LocalStorage`。
*   **无云端同步**: 当前版本不提供任何形式的云端账号同步功能。这从架构上杜绝了用户数据被上传到任何服务器的可能性。
*   **数据擦除**: 用户可以通过“设置”中的“重置应用”功能，一键清除所有 `LocalStorage` 和 `CacheStorage` 中的数据，彻底抹除使用痕迹。

## 3. API Key 安全 (BYOK - Bring Your Own Key)
*   **前端存储**: 用户可选输入的自定义 Gemini API Key 仅保存在客户端的 `LocalStorage` 中。
*   **直接调用**: 该 Key 仅用于从用户浏览器直接向 Google Gemini API 发起请求，不会经过 HanziMaster 的任何中间服务器。
*   **风险提示**: 在设置界面的 API Key 输入区域，必须明确告知用户上述策略，并提供指向 Google AI Studio 官方文档的链接，以增加透明度。
*   **非强制性**: 应用在没有用户提供自定义 Key 的情况下，仍能使用由开发者配置的默认 Key（或在离线模式下）提供核心功能，确保 AI 功能是可选增强项。

## 4. 内容安全 (Content Safety)
*   **场景**: 尽管汉字教学属于低风险领域，但在调用 Gemini API 生成字源故事、助记词等开放性内容时，仍需考虑模型幻觉 (hallucination) 产生不当内容的极低可能性。
*   **措施**: 在 `geminiService.ts` 中，所有对 `generateContent` 的调用都必须配置基本的 **Safety Filters**，至少屏蔽高风险内容 (`HARM_BLOCK_THRESHOLD_BLOCK_ONLY_HIGH`)。

---
*文档维护: HanziMaster Security Team*