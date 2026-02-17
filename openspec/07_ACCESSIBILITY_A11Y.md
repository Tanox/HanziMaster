# 07. 无障碍访问规范 (A11y)

**版本**: v0.7.1
**状态**: 规划与执行中

## 1. 核心原则
HanziMaster 致力于为所有用户提供可访问的学习体验，遵循 WCAG 2.1 AA 标准作为最低要求。

## 2. 具体规范

### 2.1 书写区的无障碍化 (Canvas Accessibility)
Canvas 元素本身对屏幕阅读器是“黑盒”。必须通过 ARIA 和辅助 DOM 元素进行增强。
*   **角色与标签**: 
    *   Canvas 容器应有 `role="application"` 和一个描述性的 `aria-label`，例如 `aria-label="Hanzi practice area for the character '永'"`。
*   **实时区域 (Live Regions)**:
    *   使用一个视觉上隐藏但对屏幕阅读器可见的 `div` 元素，并设置 `aria-live="polite"`。
    *   通过 JavaScript 更新此区域的内容，以播报书写状态：
        *   "Stroke 1 of 8 completed successfully."
        *   "Incorrect stroke direction, please try again."
        *   "Practice complete for the character '永'."

### 2.2 多感官反馈 (Multisensory Feedback)
教学应用不应仅依赖视觉反馈。
*   **声音反馈 (Audio Feedback)**:
    *   **成功音效**: 正确完成一笔时，播放短促、清脆的“叮”声。
    *   **错误音效**: 书写错误时，播放低沉的“嗡”声。
*   **触觉反馈 (Haptic Feedback)**:
    *   在支持的移动设备上，书写错误时触发轻微震动 (`navigator.vibrate`)。
*   **开关控制**: 必须在设置中提供一个总开关，允许用户独立关闭所有非必要的音效或震动。

### 2.3 视觉辅助 (Visual Aids)
*   **高对比度**: 即使在默认的 Light Mode 下，笔画轨迹（墨色）与背景（宣纸白）的对比度必须满足 WCAG AA 标准 (>4.5:1)。朱砂红和翡翠绿等教学颜色同样需要满足此标准。
*   **减弱动态效果 (Reduced Motion)**:
    *   应用应尊重用户的 `prefers-reduced-motion` 系统设置。
    *   当该设置为 true 时，笔顺演示应禁用流体动画，直接分步显示完成的笔画。所有非必要的 UI 过渡动画（如淡入淡出）也应被禁用或替换为简单的交叉渐变。

### 2.4 键盘导航 (Keyboard Navigation)
*   所有交互元素（按钮、输入框、模式切换）必须可以通过 `Tab` 键访问。
*   焦点状态必须有清晰的视觉指示（例如，使用 `focus-visible` 和 Tailwind 的 `ring` 工具类）。

---
*文档维护: HanziMaster A11y Team*