# Technical Specification (技术规范)

## 1. 架构概览

本项目采用 **Progressive Web App (PWA)** 架构，旨在提供“类原生”的离线体验。前端负责所有交互与渲染，后端逻辑（AI 生成）通过无服务器 API 调用实现，并具备完善的离线降级策略。

### 技术栈
*   **Frontend Core**: React 19, TypeScript
*   **Build Tool**: Vite
*   **Styling**: Tailwind CSS
*   **AI SDK**: `@google/genai` (Google Gemini API)
*   **Icons**: Lucide React
*   **Data Source**: Hanzi Writer Data (Local Mirror + CDN Fallback)
*   **PWA**: `vite-plugin-pwa` (Workbox)

## 2. 数据流 (Data Flow)

### 2.1 笔画数据流 (Hybrid Strategy)
1.  **请求**：`hanziService` 请求 `/hanzi-data/{char}.json`。
2.  **Service Worker 拦截**：
    *   **Hit**: 从 Cache Storage 返回预缓存的 JSON 文件（支持离线）。
    *   **Miss**: 网络请求本地 `/public` 目录。
    *   **Fallback**: 若本地文件不存在，请求 `jsdelivr` CDN。
3.  **渲染**：`StrokeViewer` 解析数据并渲染 SVG。

### 2.2 AI 解析流 (Graceful Degradation)
1.  **检查网络**：`geminiService` 检查 `navigator.onLine`。
2.  **在线**：调用 `gemini-3-flash-preview` API，获取完整 JSON 分析。
3.  **离线**：返回本地生成的 `Mock/Fallback` 对象（包含基础占位符），UI 层展示“离线模式”提示。

### 2.3 语音流 (TTS Fallback Strategy)
1.  **请求**：用户触发发音。
2.  **判断**：检查是否有 API Key 且网络在线。
3.  **分支 A (Gemini High-Quality)**：
    *   调用 `gemini-2.5-flash-preview-tts`。
    *   Base64 -> ArrayBuffer -> AudioContext 解码播放。
    *   缓存：将解码后的 AudioBuffer 存入内存 `Map`。
4.  **分支 B (Native Fallback)**：
    *   条件：离线、无 Key 或 API 失败。
    *   调用 `window.speechSynthesis.speak()`。
    *   设置语言为 `zh-CN`。

## 3. 模块详细设计

### 3.1 离线数据构建 (`scripts/copyHanziData.js`)
*   **目标**：将 `node_modules/hanzi-writer-data` 中的所有 JSON 文件（约 9000+）复制到 `public/hanzi-data`。
*   **时机**：`npm run build` 阶段执行。
*   **产物**：构建后的 `dist` 目录包含完整的静态笔画数据库。

### 3.2 PWA 配置 (`vite.config.ts`)
*   **Strategy**: `generateSW` (Auto Update).
*   **Precache**: 显式包含 `hanzi-data/*.json`。
*   **Runtime Caching**: 对 Google Fonts 和 CDN 资源配置缓存策略。
*   **Limit**: 适当放宽 `maximumFileSizeToCacheInBytes` 以容纳数据文件。

### 3.3 Gemini 服务 (`services/geminiService.ts`)
*   **Model**: `gemini-3-flash-preview`
*   **Prompt Strategy**: Structured JSON output (`responseMimeType: "application/json"`).
*   **Safety**: 调整 Safety Settings 以允许显示汉字字源中可能涉及的古代兵器/狩猎等历史内容。

## 4. 离线策略总结

| 功能 | 在线行为 | 离线行为 |
| :--- | :--- | :--- |
| **应用加载** | 加载最新资源 | Service Worker 返回缓存资源 |
| **笔顺动画** | 读取本地/CDN 数据 | 读取 PWA 缓存的本地数据 (9000+字) |
| **汉字解析** | Gemini AI 深度解析 | 显示基础静态信息 + 离线提示 |
| **语音朗读** | Gemini TTS (真人级) | 浏览器原生 TTS (机械音) |
| **搜索/随机** | 完整支持 | 完整支持 (基于本地 Common Chars 列表) |

## 5. API 接口定义 (Internal Ref)

### 5.1 Gemini Analysis
```json
// Request
{
  "model": "gemini-3-flash-preview",
  "contents": "Analyze '永'...",
  "config": { "responseSchema": { ... } }
}
```

### 5.2 Gemini TTS
```json
// Request
{
  "model": "gemini-2.5-flash-preview-tts",
  "contents": "Read '永'",
  "config": { "responseModalities": ["AUDIO"] }
}
```

## 6. 安全性
*   **API Key**: 通过 `process.env.API_KEY` 注入。
*   **离线安全**: 即使无 Key，应用也能降级运行基础功能。