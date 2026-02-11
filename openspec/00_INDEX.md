
# HanziMaster - 项目规范文档 (OpenSpec)

欢迎查阅 **HanziMaster** 的全套项目规范文档。本项目严格遵循 OpenSpec 标准，旨在为开发、产品、设计及市场团队提供统一的真理来源 (Single Source of Truth)。

## 📚 文档目录

| 编号 | 文档名称 | 核心内容 | 面向对象 |
| :--- | :--- | :--- | :--- |
| **01** | [产品需求文档 (PRD)](./01_PRODUCT_REQUIREMENTS.md) | 用户画像、功能列表、业务逻辑、版本规划 | 产品经理, 开发者 |
| **02** | [技术架构规范](./02_TECHNICAL_ARCHITECTURE.md) | 离线优先策略 (PWA)、AI 集成方案、渲染管线 | 架构师, 核心开发 |
| **03** | [UI/UX 设计规范](./03_UI_UX_DESIGN.md) | 视觉语言、设计变量、交互动效、组件规范 | 设计师, 前端开发 |
| **04** | [数据与 API 协议](./04_DATA_AND_API.md) | 数据模型、Gemini API 契约、Prompt 工程 | AI 工程师, 后端 |
| **05** | [营销与推广策略](./05_MARKETING_AND_PROMO.md) | 价值主张、GEO (生成式引擎优化)、品牌建设 | 市场, 运营 |
| **06** | [测试与质量保证 (QA)](./06_TESTING_AND_QA.md) | 几何校验算法测试、离线韧性、性能预算 | QA, 开发者 |
| **07** | [无障碍访问规范 (A11y)](./07_ACCESSIBILITY_A11Y.md) | WCAG 标准、ARIA 映射、键盘导航、低运动模式 | 开发者, 设计师 |
| **08** | [用户旅程 (User Journey)](./08_USER_JOURNEY.md) | 典型场景、交互流程、情感设计 | 产品, 设计 |
| **09** | [数据字典 (Data Dictionary)](./09_DATA_DICTIONARY.md) | 核心数据结构、离线字典覆盖率、补丁机制 | 开发, 数据 |

## 🛠 项目概况

*   **项目名称**: HanziMaster (汉字大师)
*   **当前版本**: v0.3.9 (Beta)
*   **核心理念**: 离线优先 (Offline-First) + AI 增强 (AI-Enhanced)
*   **技术栈**: React 19, TypeScript, Vite PWA, Tailwind CSS, Google Gemini API

## 📅 版本历史

*   **v0.1.0**: 核心笔顺动画引擎 (MVP)。实现基础 SVG 路径渲染与播放控制。
*   **v0.2.0**: 引入 Gemini AI 解析。集成 Character Analysis 与 TTS 发音降级机制。
*   **v0.3.0**: 交互系统升级。增加练习记录、随机推荐、多语言字典与 PWA 离线支持。
*   **v0.3.1**: 规范化建设。完善全套项目文档体系，优化代码注释。
*   **v0.3.2**: 架构重构。优化组件拆分，提升状态管理效率，改进几何校验算法。
*   **v0.3.3**: 系统稳定性优化。修复移动端触摸延迟，优化暗色模式视觉体验。
*   **v0.3.5**: **成语智能支持**。引入多字输入处理、成语导航器 (IdiomNavigator) 及深度典故解析。
*   **v0.3.9**: **数据完整性升级**。离线拼音库扩充至 2000+ 高频字，引入“数据自愈”缓存机制，优化随机推荐算法。
*   **v0.4.0 (Plan)**: 引入 SRS (间隔重复) 复习算法，集成 IndexedDB 持久化存储。

---
*文档维护: HanziMaster Engineering Team*
