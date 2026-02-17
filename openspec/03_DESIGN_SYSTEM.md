# 03. 设计系统与感知体验

**版本**: v1.0.0
**职责**: 定义视觉美学标准与多感官交互规范

## 1. 纸墨美学 (Paper & Ink)
视觉基石为“宣纸、松烟、朱砂”。
*   **`bg-paper`**: `#fdfbf7` 宣纸底色，叠加 0.03 强度噪点纹理。
*   **`text-ink`**: 模拟松烟墨色，支持通过 `opacity` 模拟笔触的浓淡。
*   **`animate-stamp`**: 朱砂印章专用的弹性缩放动画（Cubic-Bezier）。

## 2. 国际化 (I18n)
*   **策略**: 核心 UI 静态翻译 + AI 动态解析翻译。
*   **注入**: 调用 Gemini 时，必须将当前 `currentLang` 的全称（如 "French"）注入 Prompt 以保证语义对齐。
*   **RTL**: 针对 Arabic 语言环境，根容器需自动适配 `dir="rtl"`。

## 3. 无障碍访问 (A11y & Feedback)
*   **ARIA Live**: 笔顺进度（如 "Stroke 1 of 5"）必须实时同步至 Live Region 以支持读屏。
*   **多感官反馈**: 
    *   **触觉**: 书写错误触发 `navigator.vibrate([50, 50, 50])`。
    *   **听觉**: 正确/错误状态需配有极简的系统音效。
*   **对比度**: 墨色与纸色对比度严格遵循 WCAG 2.1 AA 标准 (> 7:1)。

---
*文档维护: HanziMaster Design Team*