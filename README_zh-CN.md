# 汉字大师 (HanziMaster) 🖌️

**中文文档** | [English](./README.md)

> **重塑汉字之魂，探寻笔墨奥秘。**
> 
> 结合传统书法美学与 Gemini AI 深度解析的下一代汉字学习终端。

![Version](https://img.shields.io/badge/version-0.7.1-blue?style=flat-square)
![License](https://img.shields.io/badge/license-GPLv3-green?style=flat-square)
![Offline Ready](https://img.shields.io/badge/offline-ready-success?style=flat-square)
![Powered by Gemini](https://img.shields.io/badge/AI-Gemini_Flash-8E75B2?style=flat-square)

## 📖 简介

**汉字大师** 不仅仅是一本字典。它是一款**离线优先**的 PWA 应用，致力于弥合传统书法与现代 AI 技术之间的鸿沟。

我们遵循 **“脚手架 (Scaffolding)”** 教学法，构建了 **“观察 -> 临摹 -> 默写”** 的学习闭环。无论你是正在备考 HSK 的留学生，还是对汉字文化感兴趣的书法爱好者，汉字大师都能为你提供一个宁静、专注、富有美感的学习环境。

## ✨ 核心亮点 (v0.7.1)

### 🎓 沉浸式教学系统
*   **笔顺流体**: 基于 SVG 矢量数据的 9000+ 汉字动态演示，如行云流水。
*   **智能临摹**: 在米字格上进行实时手写练习，包含严格的几何级数轨迹校验。
*   **虚影救生圈**: 连续书写错误 3 次后，系统会自动浮现半透明的笔画轮廓，提供引导。

### 🧠 AI 赋能 (Gemini Inside)
告别死记硬背。我们利用 **Google Gemini 3 Flash** 为你提供：
*   **字源演变**: 了解“家”为什么是屋顶下一头猪。
*   **记忆口诀**: AI生成的创意助记词，过目不忘。
*   **混合语音**: 在线时享受 AI 神经元人声，离线时无缝切换系统语音。

### ⚡ 极致工程
*   **离线可用**: 完整的 PWA 支持。下载一次，在飞机、地铁或深山中皆可流畅使用。
*   **隐私安全**: BYOK (Bring Your Own Key) 架构，你的 API Key 仅保存在本地浏览器。
*   **东方美学**: 朱砂红、松烟黑、宣纸白，UI 设计致敬传统文房四宝。

## 📚 项目规范 (OpenSpec)

本项目严格遵循 **OpenSpec** 标准，文档即真理：
*   [项目总纲](./openspec/project.md)
*   [AI 协作规范](./openspec/agents.md)
*   [01. 产品需求文档 (PRD)](./openspec/01_PRODUCT_REQUIREMENTS.md)
*   [02. 技术架构规范](./openspec/02_TECHNICAL_ARCHITECTURE.md)
*   [03. UI/UX 设计规范](./openspec/03_UI_UX_DESIGN.md)
*   [04. 数据与 API 协议](./openspec/04_DATA_AND_API.md)
*   [06. 测试与质量保证 (QA)](./openspec/06_TESTING_AND_QA.md)
*   [09. 数据字典](./openspec/09_DATA_DICTIONARY.md)
*   [13. 核心算法逻辑](./openspec/13_EVALUATION_LOGIC.md)
*   [14. 课程内容体系](./openspec/14_LEARNING_CURRICULUM.md)

## 🚀 快速开始

### 前置要求
*   Node.js v18+
*   Google Gemini API Key (可选，用于解锁 AI 功能)

### 安装运行

```bash
# 1. 克隆项目
git clone https://github.com/sutchan/HanziMaster.git
cd HanziMaster

# 2. 安装依赖 (自动执行数据拷贝脚本)
npm install

# 3. 配置 Key (可选)
echo "API_KEY=你的密钥" > .env

# 4. 启动预览
npm run dev
```

## 🤝 参与贡献

欢迎书法爱好者与极客开发者加入！提交代码前请阅读 [测试规范](./openspec/06_TESTING_AND_QA.md)。

## 📄 许可证

GPLv3 © 2025 HanziMaster Team