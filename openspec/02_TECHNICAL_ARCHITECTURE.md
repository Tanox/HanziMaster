

# 02. 技术架构规范

## 1. 设计哲学
*   **数据驱动**: 所有的 UI 状态（笔顺进度、解析内容）均由状态机统一管理。
*   **防御式设计**: 针对网络波动设计多级 Fallback 机制。
*   **模块化**: 渲染逻辑、AI 服务、数据持久化高度解耦。

## 2. 核心管线 (Core Pipelines)

### 2.1 笔画渲染与校验管线
1.  **数据解析**: 将 `HanziData` 中的 `strokes` 转换为 SVG 遮罩。
2.  **动画驱动**: 使用 `requestAnimationFrame` 配合 CSS `stroke-dasharray` 实现平滑流动。
3.  **几何校验**: 
    *   获取用户手写 `PointerEvent` 序列。
    *   计算轨迹点与 `medians` 路径的最近欧几里得距离。
    *   判定逻辑：起止点重合度 > 85% 且 路径偏差 < 阈值，判定为通过。

### 2.2 AI 响应管线
*   **并行请求**: 发起解析请求时，同时触发文本生成与 TTS 生成。
*   **上下文管理**: 维护最近 10 次查询的上下文，提高 AI 回复的相关性。
*   **异常处理**: 捕获 429 (频率限制) 和 5xx 错误，触发本地 `OfflineAnalysis` 生成器。

### 2.3 图像生成管线 (Image Generation)
*   **纯前端生成**: 使用 HTML5 Canvas API，无需后端服务。
*   **矢量转位图**: 解析 SVG 路径数据 (`HanziData.strokes`)，在 Canvas 上重绘为高分辨率位图。
*   **字体加载**: 监听 `document.fonts.ready` 事件，确保拼音和品牌文字渲染时字体已加载，避免乱码。
*   **主题适配**: 自动读取当前 DOM 的 `dark` class，生成对应配色（深色/浅色）的图片。

## 3. 存储与数据分层策略
*   **L1: 内存 (Memory)**: 运行时状态，音频 Buffer 缓存。
*   **L2: 本地缓存 (LocalStorage)**: 
    *   `appSettings`: 用户偏好。
    *   `practiceHistory`: 最近 50 条练习记录。
    *   `ai_pinyin_cache`: AI 动态补全的生僻字拼音映射表。
*   **L3: 静态资源 (Static/SW)**: `public/hanzi-data/` 下的 9000+ JSON 文件，通过构建脚本自动化生成，由 Service Worker 预缓存。

## 4. 混合语音架构 (Hybrid TTS)
为了平衡音质与可用性，系统采用以下优先级策略：
1.  **Cache Hit**: 优先检查内存中是否已有该文本的 `AudioBuffer`。
2.  **Gemini TTS**: 若在线且有 Key，请求 `gemini-2.5-flash-preview-tts` 获取高保真 PCM 音频流。
3.  **Native Fallback**: 若 API 失败、配额超限或离线，瞬间无缝切换至浏览器原生 `window.speechSynthesis`。

## 5. 安全性与隐私
*   **API Key 安全**: 支持用户在客户端设置自己的 API Key，不经过任何中转服务器。
*   **内容审查**: 开启 Gemini 的安全过滤设置，确保解释内容符合教育用途。

## 6. 构建与依赖管理 (Build & Deployment)
为确保生产环境的稳定性及 PWA 的离线可用性，必须严格遵守以下构建规范：

*   **Vite 独占构建**: 所有核心依赖（React, ReactDOM, Lucide, @google/genai）必须通过 `package.json` 管理并由 Vite 打包。
*   **禁止 ImportMap**: **严禁**在 `index.html` 中使用 `<script type="importmap">` 引入 CDN 资源。
    *   *原因 1*: ImportMap 会导致浏览器绕过本地打包文件直接请求外部 URL，引发 **CORS 跨域错误**（如 `Access to script ... blocked by CORS policy`）。
    *   *原因 2*: 外部 CDN 资源无法被 PWA Service Worker 有效预缓存，破坏离线优先体验。
    *   *原因 3*: 导致开发环境（HMR）与生产环境行为不一致。
*   **CSP 策略**: 
    *   `script-src`: 'self' 'unsafe-inline' (仅限必要)
    *   `connect-src`: 'self' https://generativelanguage.googleapis.com (Gemini API)
