
# 07. 无障碍访问规范 (A11y)

## 1. 语义化与 ARIA 映射
*   **主视窗**: 汉字容器需设置 `role="img"`，`aria-label` 需包含动态信息，如：“汉字‘爱’的笔顺动画，共 10 画”。
*   **拼音关联**: 使用 `<ruby>` 与 `<rt>` 标签，确保屏幕阅读器（如 VoiceOver）能识别“注音”关系。

## 2. 键盘与焦点控制
*   **Tab 顺序**: 搜索框 -> 拼音发音 -> 播放控制 -> 练习切换。
*   **焦点环**: 统一使用 `focus-visible:ring-2 focus-visible:ring-teal-500`，确保对比度。

## 3. 听觉辅助
*   **练习反馈**: 临摹成功时，除视觉动画外，需播放短促的清脆音效（或触发 `aria-live="polite"` 播报“练习完成”）。
*   **错误提示**: 笔画错误时使用低频震动提示。

## 4. 减弱动态 (Reduced Motion)
*   响应 `prefers-reduced-motion: reduce`。
*   在此模式下，自动禁用笔画流动动画，改为瞬间切换显示。

---
*文档维护: HanziMaster A11y Group*
