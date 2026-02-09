# 汉字大师 (HanziMaster)

**中文文档** | [English](./README.md)

**汉字大师** 是一款交互式汉字学习 Web 应用。它结合了精准的笔画顺序动画与 Google Gemini AI 的强大能力，为用户提供汉字的语言学解析、字源故事、记忆口诀以及**真人级语音朗读**。

## 📚 项目规范 (OpenSpec)
查看详细的项目技术与产品规范，请参阅 [OpenSpec](./openspec/00_INDEX.md) 目录：
*   [产品需求文档 (PRD)](./openspec/01_PRODUCT_REQUIREMENTS.md)
*   [技术架构文档](./openspec/02_TECHNICAL_ARCHITECTURE.md)
*   [UI/UX 设计规范](./openspec/03_UI_UX_DESIGN.md)
*   [数据与 API 协议](./openspec/04_DATA_AND_API.md)

## ✨ 功能特性

*   **离线优先架构 (Offline-First)**：
    *   **内置数据**：集成 **9000+ 汉字**（覆盖 HSK 1-6 及更多）的笔画数据。
    *   **离线模式**：无网络状态下，笔顺动画、查字、随机练习完全可用。
*   **笔画顺序可视化**：基于 SVG 数据，逐笔画动态展示汉字的书写过程。
*   **手写练习模式**：支持触摸屏和鼠标的交互式描红练习，提供实时反馈。
*   **AI 智能解析 (联网)**：利用 **Google Gemini 3 Flash** 模型生成深度解析：
    *   字源/词源故事 & 创意记忆口诀
    *   部首拆解与常用词组
*   **混合语音朗读 (Hybrid TTS)**：
    *   **在线**：集成 **Gemini 2.5 Flash TTS**，提供自然的人声发音。
    *   **离线**：自动回退至浏览器原生语音合成 (`SpeechSynthesis`)，确保发音功能永不掉线。
*   **多语言支持**：界面及 AI 回复支持全球 10 种常用语言。

## 🛠 技术栈

*   **前端框架**：React 19, TypeScript
*   **离线支持**：Vite PWA (Workbox)
*   **AI 模型**：Google Gemini API (`gemini-3-flash-preview` & `gemini-2.5-flash-preview-tts`)
*   **数据源**：Hanzi Writer Data (本地构建 + 静态资源化)

## 🚀 快速开始

### 前置要求

*   Node.js (建议 v18 或更高版本)
*   Google Gemini API Key (用于 AI 解析功能)

### 安装步骤

1.  克隆仓库：
    ```bash
    git clone https://github.com/yourusername/hanzimaster.git
    cd hanzimaster
    ```

2.  安装依赖：
    ```bash
    npm install
    ```

3.  配置 API Key：
    在项目根目录创建一个 `.env` 文件：
    ```env
    API_KEY=你的_API_KEY
    ```

4.  构建与运行：
    ```bash
    npm run build
    npm run preview
    ```
    *注意：`npm run build` 会自动执行脚本，将数千个汉字数据文件复制到 `public` 目录，以便离线使用。*

## 🎮 使用指南

1.  **离线体验**：尝试断开网络，你依然可以搜索汉字、观看笔画动画并听到基础发音。
2.  **AI 解析**：连接网络后，应用将自动启用 Gemini AI，提供深度的字源故事和记忆技巧。

## 🤝 贡献指南

欢迎提交 Pull Request 或 Issue 来改进这个项目！

## 📄 许可证

本项目采用 GNU General Public License v3.0 许可证。