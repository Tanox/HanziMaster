
# 03. 设计系统与感知体验

## 1. 设计哲学：纸墨精神 (Paper & Ink)
HanziMaster 的视觉基石是**“宣纸与朱砂”**。所有设计元素都旨在营造一个静谧、专注、具有人文气息的学习环境。

## 2. 核心调色盘 (The Palette)
所有色彩必须使用 Tailwind 类名，并在配置文件中定义：

| 名称 | Hex (Light) | Hex (Dark) | 用途 |
| :--- | :--- | :--- | :--- |
| **Paper (宣纸)** | `#fdfbf7` | `#0f172a` | 全局背景 |
| **Ink (松烟)** | `#0f172a` | `#f8fafc` | 主要文字、笔画轨迹 |
| **Vermilion (朱砂)** | `#bc221b` | `#e67872` | 重点标识、印章、当前笔画高亮 |
| **Jade (翡翠)** | `#0d9488` | `#38bdf8` | 辅助操作、拼音标注、成功状态 |

## 3. 排版与间距 (Typography & Spacing)
*   **字体栈**:
    *   **汉字**: `'Noto Serif SC', serif` (`font-hanzi`)
    *   **UI/拼音**: `'Inter', sans-serif` (`font-sans`)
*   **圆角**: 核心卡片统一使用 `rounded-2xl` (1rem)，弹出层使用 `rounded-[2.5rem]`。
*   **阴影**:
    *   `shadow-sm`: 用于普通卡片。
    *   `shadow-inner`: 用于练习区 Canvas，模拟纸张下陷感。

## 4. 无障碍访问规范 (Accessibility - WCAG 2.1 AA)
*   **书写区**: Canvas 容器必须拥有 `role="application"` 和动态的 `aria-label` (如: `aria-label="练习区，当前汉字：爱"`).
*   **实时播报**: 使用 `aria-live="polite"` 的隐藏 `div` 元素，通过 JS 更新内容以播报书写状态，例如：“第 1 笔书写正确”、“练习完成，得分 95”。
*   **多感官反馈**:
    *   **触觉**: 书写错误时，通过 `navigator.vibrate()` 提供轻微震动反馈。
    *   **听觉**: 提供开关，允许用户为正确/错误笔画启用音效。
*   **键盘导航**: 所有可交互元素必须可通过 `Tab` 键聚焦，并具有清晰的 `:focus-visible` 样式。

## 5. 国际化策略 (i18n)
*   **支持语言**: 支持 15+ 种主流语言，包括简体中文、繁体中文、英语、西班牙语、德语、日语等。
*   **技术架构**: 使用原生 TypeScript 对象映射 (`Record<string, UILabels>`)，接口定义在 `app/types.ts` 中，确保类型安全。
*   **回退机制**: 始终包含回退到英语 (`UI_LABELS['en']`) 的逻辑，确保应用健壮性。
*   **AI 本地化**: 调用 Gemini API 时，必须将当前语言名称注入到 System Prompt 中，以获取本地化的 AI 内容。

---
*文档维护: HanziMaster Design Team*
*文档版本: v2.1.1 | 最后更新: 2026*
