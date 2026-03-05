
# HanziMaster (汉字大师) 🖌️

[中文文档](./README_zh-CN.md) | **English**

> **全球体验最佳的汉字笔顺教学终端**
>
> 结合传统书法美学与现代 AI 技术，提供“视、听、写”全方位的汉字学习体验。

![Version](https://img.shields.io/badge/version-1.4.0-blue?style=flat-square)
![License](https://img.shields.io/badge/license-GPLv3-green?style=flat-square)

## 1. 项目概述 (Project Overview)

### 1.1 背景与目标
汉字学习中，“提笔忘字”和“倒插笔”是初学者乃至母语使用者的常见痛点。现有的字典类应用往往只提供静态图片或简单的 GIF，缺乏互动性和深度解析。

**HanziMaster** 旨在解决这一问题，通过：
*   **动态演示**: 基于 SVG 的实时笔顺动画。
*   **交互练习**: 带有实时反馈的临摹与书写测试。
*   **AI 辅助**: 利用 Google Gemini 提供字源解析、记忆口诀和智能评分。

### 1.2 技术栈 (Tech Stack)
*   **前端**: Next.js 15 (App Router), TypeScript, Tailwind CSS v4
*   **动画**: Hanzi Writer, Framer Motion
*   **AI**: Google Gemini API
*   **部署**: Vercel (Serverless)

### 1.3 架构设计
采用前后端分离的 Serverless 架构。前端负责极致的交互体验，后端通过 API Routes 提供数据代理和 AI 能力。详细架构请参考 [02. 应用架构设计](./openspec/02_ARCHITECTURE.md)。

## 2. 文档导航 (Documentation)

本项目遵循 **OpenSpec** 标准，所有文档位于 `openspec/` 目录下：

*   **产品与设计**:
    *   [01. 产品需求文档 (PRD)](./openspec/01_PRODUCT_REQUIREMENTS.md)
    *   [03. UI/UX 设计规范](./openspec/03_UI_UX_DESIGN.md)
    *   [08. 用户操作指南](./openspec/08_USER_MANUAL.md)
*   **技术与开发**:
    *   [02. 应用架构设计](./openspec/02_ARCHITECTURE.md)
    *   [04. 功能模块说明](./openspec/04_FUNCTIONAL_MODULES.md)
    *   [05. API 接口文档](./openspec/05_API_REFERENCE.md)
    *   [11. 安装与部署流程](./openspec/11_INSTALLATION_AND_DEPLOYMENT.md)
*   **支持**:
    *   [99. 常见问题与故障排除](./openspec/99_FAQ.md)

## 3. 快速开始 (Quick Start)

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

## 4. 许可证 (License)
GPLv3 © 2025 Sut
