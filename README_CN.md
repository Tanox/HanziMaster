# 汉字大师 (HanziMaster) 🖌️

**中文文档** | [English](./README.md)

> **全球体验最佳的汉字笔顺教学终端**
> 
> 结合传统书法美学与 Gemini AI 深度解析的下一代汉字学习终端。

![Version](https://img.shields.io/badge/version-2.1.1-blue?style=flat-square)
![License](https://img.shields.io/badge/license-GPLv3-green?style=flat-square)

## 📖 简介

**汉字大师** 是一款**离线优先**的 PWA 应用。我们遵循 **“脚手架 (Scaffolding)”** 教学法，构建了“观察 -> 临摹 -> 默写”的学习闭环，旨在通过逐步减少辅助来巩固用户的肌肉记忆和结构理解。

### 核心功能
*   **笔顺演示**: 支持超过 9000 个汉字的矢量动画，速度可调。
*   **交互练习**: 提供“米字格/田字格”引导，实时校验轨迹并评分。
*   **AI 助教**: Gemini 驱动的字源演变解析、个性化记忆口诀。
*   **离线优先**: 支持下载完整的矢量笔顺数据库和 HSK 离线词典。
*   **PWA 支持**: 支持安装到桌面和移动设备，提供原生应用体验。
*   **深色/浅色模式**: 无缝的主题切换，优化阅读体验。
*   **用户档案**: 仪表盘集成快捷设置（主题、语言、离线模式）及头像支持（Google/GitHub）。

## 📚 项目统一规范 (OpenSpec)

本项目遵循 **OpenSpec** 规范。以下文档是项目的唯一真理之源：

1.  [**00. 策略与协作规则**](./openspec/00_STRATEGY.md) - 项目愿景与 AI 协作规则。
2.  [**01. 产品与用户体验**](./openspec/01_PRODUCT_UX.md) - PRD、用户旅程与增长策略。
3.  [**02. 架构与开发指南**](./openspec/02_ARCHITECTURE.md) - Hook 分层与工程标准。
4.  [**03. 设计系统**](./openspec/03_DESIGN_SYSTEM.md) - 纸墨美学、无障碍设计与国际化。
5.  [**04. 逻辑与数据模型**](./openspec/04_LOGIC_DATA.md) - 核心算法、API 与数据模型。
6.  [**05. 教学大纲**](./openspec/05_PEDAGOGY.md) - HSK 课程体系与复习逻辑。
7.  [**06. 合规与运维**](./openspec/06_COMPLIANCE_OPS.md) - 质量保证、安全性与部署流程。

## 🚀 快速开始

```bash
# 1. 克隆项目
git clone https://github.com/sutchan/hanzimaster.git

# 2. 安装依赖
npm install

# 3. 配置环境变量 (复制 .env.example)
cp .env.example .env.local

# 4. 启动开发服务器
npm run dev
```

访问 `http://localhost:3000` 即可开始使用。

## 📄 许可证 (License)
GPL-3.0 License © 2026 Sut
