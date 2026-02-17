# HanziMaster 🖌️

[中文文档](./README_zh-CN.md) | **English**

> **The Digital Calligraphy Classroom.**
>
> Master Chinese character stroke order with Zen-like visualization, interactive practice, and Gemini AI insights.

![Version](https://img.shields.io/badge/version-0.8.1-blue?style=flat-square)
![License](https://img.shields.io/badge/license-GPLv3-green?style=flat-square)
![Offline Ready](https://img.shields.io/badge/offline-ready-success?style=flat-square)
![Pedagogy](https://img.shields.io/badge/focus-Education-orange?style=flat-square)

## 📖 Introduction

**HanziMaster** is more than a dictionary—it is a **comprehensive teaching terminal**. Designed for learners of all levels, it bridges the gap between traditional calligraphy and modern AI technology.

Our pedagogy follows the **Scaffolding** method, structured as a three-step learning loop: **Watch -> Trace -> Write**.

## ✨ Key Features (v0.8.1)

### 🎓 Interactive Teaching System
*   **Fluid Demonstration**: Vector-based animations showing the exact rhythm and flow of writing.
*   **Smart Tracing**: Practice directly on the screen with "Rice Grid" guides and real-time geometric validation.
*   **AI Scoring System**: Get instant scores (0-100) based on shape accuracy and stroke direction.
*   **Ghosting Lifeline**: After 3 consecutive mistakes, a ghost hint appears to guide your hand.

### 🧠 AI Tutor (Gemini Inside)
*   **Etymology**: Understand the *why* behind the *how* with AI-powered historical analysis.
*   **Mnemonics**: AI-generated memory aids tailored to character structure and meaning.
*   **Native TTS**: High-quality pronunciation for every character, with seamless fallback to system voice when offline.

### ⚡ Engineering Excellence
*   **Offline-First**: Fully functional PWA. Practice anywhere, anytime, with on-demand data sync.
*   **Privacy-Focused**: Your progress and optional API keys stay exclusively in your browser's local storage.
*   **Paper & Ink UI**: A distraction-free, light-mode-first aesthetic inspired by traditional Xuan paper and vermilion ink.

## 📚 Specifications (OpenSpec)

This project is governed by **OpenSpec**. The documentation is the single source of truth.
*   [Project Strategy](./openspec/project.md)
*   [AI Agents Guide](./openspec/agents.md)
*   [01. Product Requirements (PRD)](./openspec/01_PRODUCT_REQUIREMENTS.md)
*   [02. Technical Architecture](./openspec/02_TECHNICAL_ARCHITECTURE.md)
*   [03. UI/UX Design](./openspec/03_UI_UX_DESIGN.md)
*   [04. Data & API Protocol](./openspec/04_DATA_AND_API.md)
*   [06. Testing & QA](./openspec/06_TESTING_AND_QA.md)
*   [09. Data Dictionary](./openspec/09_DATA_DICTIONARY.md)
*   [13. Core Algorithms](./openspec/13_EVALUATION_LOGIC.md)
*   [14. Learning Curriculum](./openspec/14_LEARNING_CURRICULUM.md)

## 🚀 Quick Start

```bash
# 1. Clone
git clone https://github.com/sutchan/HanziMaster.git
cd HanziMaster

# 2. Install (includes data copy)
npm install

# 3. Run
npm run dev
```

## 📄 License

GPLv3 © 2025 Sut