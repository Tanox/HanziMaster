# 03. UI/UX 设计规范

**版本**: v1.0.0
**状态**: 现行规范

## 1. 设计哲学：纸墨精神 (Paper & Ink)
HanziMaster 的视觉基石是**“宣纸与朱砂”**。

## 2. 样式原子化 (Atomic Styling)

### 2.1 纸墨质感扩展 (Tailwind Extends)
禁止在 JSX 中分散编写复杂的背景滤镜。所有质感效果必须整合至 `tailwind.config`：

*   **`bg-paper`**: 包含宣纸底色 (`#fdfbf7`)。
*   **`texture-ink`**: 包含模拟噪点的 SVG 滤镜扩展，支持透明度调节。
*   **`animate-stamp`**: 专用于朱砂印章的缩放/旋转弹出效果。

### 2.2 视觉反馈分级
*   **Primary (墨色)**: 宁静、稳定。用于 UI 文字和已完成笔画。
*   **Action (朱砂)**: 警示、引导。用于当前笔画高亮和印章。
*   **Success (翡翠)**: 宁静、肯定。用于正确反馈。

## 3. 响应式布局规范
*   **Canvas 伸缩**: 练习区 Canvas 必须通过 `aspect-ratio: 1/1` 强制保持比例，在不同屏幕下通过父容器 Flex 进行居中对齐。

---
*文档维护: HanziMaster Design Team*