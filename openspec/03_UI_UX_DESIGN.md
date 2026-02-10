# 03. UI/UX 设计规范

## 1. 设计哲学 (Design Philosophy)
*   **新旧融合**: 汉字展示使用衬线体 (Serif) 传达书法的传统韵味，UI 界面使用现代无衬线体 (Sans-serif) 保持清晰高效。
*   **内容为王**: 汉字动画是绝对的视觉焦点。所有控制栏、设置项均为辅助元素，采用极简设计。
*   **触觉反馈**: 在临摹模式下，书写正确给予微震动反馈，增强物理书写感。

## 2. 设计变量 (Design Tokens)

### 2.1 色彩系统 (Color Palette)
基于 Tailwind CSS 扩展配置。

*   **品牌色 (Brand / Vermilion)**: 取自中国传统印泥颜色。
    *   `vermilion-500` (`#cf352e`): 主色，用于图标、印章、正确笔画轨迹。
    *   `vermilion-50` (`#fdf3f2`): 浅色背景，用于高亮区域。
*   **功能色 (Functional / Teal)**: 代表智慧与生长。
    *   `teal-600` (`#0d9488`): 主按钮，行动点 (CTA)。
    *   `teal-50` / `teal-900`: 用于强调块背景。
*   **背景色 (Surface)**:
    *   **Light**: `Paper` (`#fdfbf7`): 暖色调米纸白，模仿宣纸质感，带噪点纹理。
    *   **Dark**: `Slate-900` (`#0f172a`): 深蓝灰，护眼且专注。
*   **状态色**:
    *   **Error**: `Red-500`: 书写错误轨迹提示。
    *   **Success**: 隐式反馈，通过自动前进和震动表达。

### 2.2 排版 (Typography)
*   **UI 字体 (Sans)**: `Inter`, system-ui, -apple-system.
*   **汉字字体 (Serif)**: `'Noto Serif SC'`, `'STKaiti'` (华文楷体), `'KaiTi'`, `'PMingLiU'`, serif. 
    *   *规范*: 必须使用衬线体以匹配 SVG 笔画的笔锋风格，避免黑体造成的视觉割裂。

## 3. 组件交互规范

### 3.1 笔顺播放器 (StrokeViewer)
*   **容器**: 保持 1:1 宽高比，最大宽度 **400px**，居中显示。
*   **背景网格**: 支持“米字格”、“田字格”或无背景，线条使用虚线，透明度低 (Opacity 20%)。
*   **动效**:
    *   **View Mode**: 使用 SVG `stroke-dasharray` 动画路径，进度 0 -> 1。
    *   **Practice Mode**: 
        *   当前笔画显示轮廓 (Outline) 并伴随呼吸效果 (`animate-pulse`)。
        *   用户书写轨迹实时渲染为红色 (`#cf352e`)，笔触圆润 (`round` cap/join)。
        *   成功匹配后，显示“优”字印章动画。

### 3.2 解析面板 (AnalysisPanel)
*   **布局**: Bento Grid (便当盒) 自适应网格。
    *   Desktop: 4列布局。
    *   Mobile: 单列堆叠。
*   **骨架屏 (Skeleton)**: AI加载期间，必须显示与文本行高匹配的灰色脉冲块，避免布局跳动 (CLS)。
*   **降级展示**: 当 AI 不可用时，隐藏“字源”、“记忆口诀”卡片，仅保留核心释义，确保界面整洁。

### 3.3 导航与控制
*   **Header**: 玻璃拟态 (Glassmorphism)，背景模糊 (`backdrop-blur-md`)，吸顶 (`sticky`).
*   **Controls**: 播放控制区悬浮于播放器下方，按钮采用圆形设计，主操作（播放/暂停）加大尺寸。

## 4. 动画与过渡
*   **全局过渡**: 颜色切换持续时间 `300ms`。
*   **微交互**: 
    *   按钮 Hover: `scale-105`。
    *   卡片 Hover: 边框颜色加深。
*   **出现动画**: 新内容加载使用 `animate-fade-in` (透明度 0->1, Y轴位移)。

## 5. 暗色模式 (Dark Mode)
*   **策略**: 手动切换 + 跟随系统。
*   **适配**: 
    *   文字颜色反转 (`slate-900` -> `slate-100`).
    *   背景纹理调整透明度 (`opacity-3` -> `opacity-5`).
    *   笔画背景色调整为深灰，以保证对比度。

---
*文档维护: HanziMaster Team*
