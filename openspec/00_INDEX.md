
# HanziMaster - 项目规范文档 (OpenSpec)

欢迎查阅 **HanziMaster** 的全套项目规范文档。本项目严格遵循 OpenSpec 标准，旨在为开发、产品、设计及市场团队提供统一的真理来源 (Single Source of Truth)。

## 📚 文档目录

| 编号 | 文档名称 | 核心内容 | 面向对象 |
| :--- | :--- | :--- | :--- |
| **01** | [产品需求文档 (PRD)](./01_PRODUCT_REQUIREMENTS.md) | 节庆推荐、**重置功能**、业务逻辑、版本规划 | 产品经理, 开发者 |
| **02** | [技术架构规范](./02_TECHNICAL_ARCHITECTURE.md) | **Hook 架构**、离线优先策略 (PWA)、AI 集成 | 架构师, 核心开发 |
| **03** | [UI/UX 设计规范](./03_UI_UX_DESIGN.md) | **轻量化搜索**、**高视拼音**、Toast 通知、组件规范 | 设计师, 前端开发 |
| **04** | [数据与 API 协议](./04_DATA_AND_API.md) | 数据模型、Gemini API 契约、Prompt 工程 | AI 工程师, 后端 |
| **05** | [营销与推广策略](./05_MARKETING_AND_PROMO.md) | 价值主张、病毒式传播、GEO (生成式引擎优化) | 市场, 运营 |
| **06** | [测试与质量保证 (QA)](./06_TESTING_AND_QA.md) | **CORS/CSP 校验**、离线韧性、性能预算 | QA, 开发者 |
| **07** | [无障碍访问规范 (A11y)](./07_ACCESSIBILITY_A11Y.md) | WCAG 标准、ARIA 映射、键盘导航、低运动模式 | 开发者, 设计师 |
| **08** | [用户旅程 (User Journey)](./08_USER_JOURNEY.md) | 典型场景、交互流程、情感设计 | 产品, 设计 |
| **09** | [数据字典 (Data Dictionary)](./09_DATA_DICTIONARY.md) | 核心数据结构、**多级缓存模型**、离线字典覆盖率 | 开发, 数据 |
| **10** | [项目文件结构 (Project Structure)](./10_PROJECT_STRUCTURE.md) | **Hook 目录拆分**、模块职责划分、命名规范 | 开发者 |
| **11** | [开发指南 (Development Guide)](./11_DEVELOPMENT_GUIDE.md) | 技术栈版本、代码风格、Git 提交规范 | 开发者 |
| **12** | [安全与隐私规范 (Security)](./12_SECURITY_AND_PRIVACY.md) | API Key 处理、CSP 策略、数据持久化规则 | 架构师, 安全 |

## 📊 项目审查

| 报告类型 | 版本 | 状态 |
| :--- | :--- | :--- |
| [最新项目审查报告](./reports/project_review_20250522_1400.md) | v0.5.0 | ✅ 通过 |
| [历史审查报告 (v0.4.5)](./reports/project_review_20250522_1200.md) | v0.4.5 | ✅ 通过 |

## 🛠 项目概况

*   **项目名称**: HanziMaster (汉字大师)
*   **当前版本**: v0.5.0 (Cards & Sharing Update)
*   **核心理念**: 离线优先 (Offline-First) + AI 增强 (AI-Enhanced)
*   **技术栈**: React 19, TypeScript, Vite PWA, Tailwind CSS, Google Gemini API

## 📅 版本历史

*   **v0.1.0**: 核心笔顺动画引擎 (MVP)。
*   **v0.2.0**: 引入 Gemini AI 解析与 TTS。
*   **v0.3.0**: 交互系统升级（练习记录、随机推荐、多语言）。
*   **v0.3.5**: 成语智能支持与 IdiomNavigator。
*   **v0.4.0**: 社交分享 (Share as Image) 与时令推荐。
*   **v0.4.2**: **UX 完善与架构规范化**。引入 Toast 系统，数据自检与重置机制。
*   **v0.4.5**: **视觉精修 (Visual Polish)**。搜索框轻量化，拼音显像优化，网格坐标修复。
*   **v0.4.9**: **架构重构与模块化**。拆分 Hooks，解耦 UI 与逻辑，提升代码可维护性。
*   **v0.5.0**: **组件拆分与分享升级**。拆分 CharacterDisplay 卡片，支持移动端原生分享。

---
*文档维护: HanziMaster Engineering Team*