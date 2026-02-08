# HanziMaster AI (汉字大师 AI)

**中文文档** | [English](./README.md)

**HanziMaster AI** 是一款交互式汉字学习 Web 应用。它结合了精准的笔画顺序动画与 Google Gemini AI 的强大能力，为用户提供汉字的语言学解析、字源故事以及记忆口诀。

## ✨ 功能特性

*   **笔画顺序可视化**：基于 SVG 数据，逐笔画动态展示汉字的书写过程。
*   **AI 智能解析**：利用 **Google Gemini 3 Flash** 模型生成深度解析：
    *   拼音与释义
    *   部首拆解与结构
    *   字源/词源故事
    *   创意记忆口诀 (Mnemonics)
    *   常用词组示例
*   **播放控制**：支持播放、暂停、重置以及调节书写动画的速度。
*   **多语言支持**：界面及 AI 回复支持全球 10 种常用语言（英语、西班牙语、法语、德语、日语、韩语、俄语、葡萄牙语、意大利语、越南语）。
*   **现代 UI 设计**：基于 React、Tailwind CSS 和 Lucide Icons 构建，提供简洁、响应式的用户体验。

## 🛠 技术栈

*   **前端框架**：React 19, TypeScript
*   **样式库**：Tailwind CSS
*   **AI 模型**：Google Gemini API (`gemini-3-flash-preview`)
*   **数据源**：Hanzi Writer Data (CDN)
*   **图标库**：Lucide React

## 🚀 快速开始

### 前置要求

*   Node.js (建议 v18 或更高版本)
*   Google Gemini API Key

### 安装步骤

1.  克隆仓库：
    ```bash
    git clone https://github.com/yourusername/hanzimaster-ai.git
    cd hanzimaster-ai
    ```

2.  安装依赖：
    ```bash
    npm install
    ```

3.  配置 API Key：
    在项目根目录创建一个 `.env` 文件，并添加你的 Google Gemini API 密钥：
    ```env
    API_KEY=你的_API_KEY
    ```
    *(注意：请确保你的构建工具已配置为将此 Key 暴露给 `process.env`)*

4.  启动开发服务器：
    ```bash
    npm run dev
    ```

## 🎮 使用指南

1.  **输入汉字**：在搜索栏中输入一个想要学习的汉字（例如："爱"、"龙"）。
2.  **选择语言**：通过顶部的语言下拉菜单选择你熟悉的教学语言。
3.  **观看与学习**：
    *   使用播放控件观察正确的笔画顺序。
    *   阅读“字源”和“记忆口诀”部分以加深理解。
4.  **拓展练习**：查看“常用词组”卡片，学习该汉字在实际语境中的用法。

## 🤝 贡献指南

欢迎提交 Pull Request 或 Issue 来改进这个项目！

## 📄 许可证

本项目采用 MIT 许可证。
