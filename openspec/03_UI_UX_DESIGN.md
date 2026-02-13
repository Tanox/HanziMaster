
# 03. UI/UX 设计规范

## 1. 品牌愿景: “新古典主义书写”
我们将中国传统的笔墨纸砚美学（朱砂、宣纸、松烟）与现代科技的简洁高效相结合，打造宁静而专注的学习环境。

## 2. 视觉语言 (Visual Language)

### 2.1 色彩系统
*   **背景 - 宣纸白 (`#fdfbf7`)**: 带有微量噪点的纸张质感，模拟传统练习纸。
*   **主色 - 朱砂红 (`#cf352e`)**: 用于笔画高亮、核心拼音标注、成功激励。
*   **文字 - 松烟黑 (`#0f172a`)**: 确保长文本的高可读性。
*   **辅助色 - 湖水绿 (`#0d9488`)**: 用于进度条、按钮及成功反馈。

### 2.2 字体排版
*   **汉字展示**: `Noto Serif SC` (思源宋体)，展现汉字的结构美与笔锋感。
*   **拼音/西文**: `Inter` (Sans-serif)，确保音调符号在小字号下清晰可辨。

## 3. 核心组件规范

### 3.1 搜索框 (Search Input - v0.4.5 Updated)
*   **轻量化**: 最大宽度 `max-w-[320px]`，高度适中，不再使用通栏宽搜索框。
*   **文本样式**: 输入文字默认**居中对齐** (`text-center`)，字号 `text-xl`，强调“查字”的仪式感。
*   **形态**: 全圆角 (`rounded-full`)，聚焦时带有品牌色光晕 (`ring-teal-200`)。
*   **按钮**: 随机与搜索按钮内嵌于输入框右侧，图标尺寸 `20px`。

### 3.2 拼音显示 (Pinyin Display - v0.4.5 Updated)
*   **核心拼音 (主视窗上方)**:
    *   **字号**: `text-5xl` (Mobile) / `text-6xl` (Desktop)。
    *   **字体**: **衬线体** (`font-serif`)，与汉字风格呼应。
    *   **颜色**: 朱砂红 (`text-vermilion-600`)，夜间模式调整为 `text-vermilion-400`。
    *   **特效**: 轻微文字阴影 (`drop-shadow-sm`)，增加立体感。
    *   **动效**: 加载时使用 `animate-fade-in` 避免布局跳动。

### 3.3 练习格 (The Writing Grid)
*   **样式**: 
    *   **米字格 (Rice Grid)**: 外框 + 垂直/水平中线 + 两条对角线。
    *   **田字格 (Field Grid)**: 外框 + 垂直/水平中线。
*   **线条**: 
    *   浅色模式: `stroke-slate-200`，透明度 70%。
    *   深色模式: `stroke-slate-700`，透明度 70%。
*   **交互**: 触碰笔画时，轨迹应具有真实的物理反馈（0.05s 极低延迟）。

### 3.4 分享卡片 (Share Card)
*   **尺寸**: 1080px x 1080px (Square)。
*   **布局**: 
    *   中心：大尺寸汉字 + 米字格（占画面 60%）。
    *   底部：大号拼音 + App Logo + 域名水印。
*   **配色**: 必须严格遵循当前主题（深色/浅色），确保生成出的图片与用户看到的界面一致。

### 3.5 全局通知 (Toast Notifications)
*   **定位**: 屏幕顶部居中 (Top-Center)，距离顶部 20px，层级 z-50。
*   **动效**: 
    *   进场：`translate-y-[-100%] -> translate-y-0`, `opacity-0 -> opacity-100`。
    *   退场：`opacity-100 -> opacity-0`。
*   **样式规范**:
    *   **容器**: 圆角 `rounded-lg`，阴影 `shadow-lg`，背景模糊 `backdrop-blur-md`。
    *   **Success**: 背景 `bg-teal-50`，图标 `CheckCircle`。
    *   **Error**: 背景 `bg-red-50`，图标 `AlertCircle`。

### 3.6 欢迎页 (Welcome Screen)
*   **布局**: Logo + Slogan + 功能引导卡片 (Search, Watch, Practice)。
*   **动效**: 背景汉字视差流动，卡片交错淡入。

## 4. 交互动效 (Micro-interactions)

### 4.1 笔顺流动 (Stroke Flow)
*   采用 CSS `stroke-dasharray` 实现，动画曲线为 `cubic-bezier(0.4, 0, 0.2, 1)`。
*   支持“分步暂停”，用户点击任一笔画可定位至该步骤。

### 4.2 成功激励 (Reward Animation)
*   **朱砂印章**: 临摹完成后，右上方弹出带有“优”字的方形印章，伴随轻微旋转（6°）与触觉反馈（20ms Vibrate）。

## 5. 无障碍 (A11y)
*   **暗色模式**: 背景切换为 `slate-900`，纹理变为深灰色，确保夜间书写不刺眼。
*   **大点击区域**: 所有发音按钮最小触控面积为 44x44px。

---
*文档维护: HanziMaster Design System*
