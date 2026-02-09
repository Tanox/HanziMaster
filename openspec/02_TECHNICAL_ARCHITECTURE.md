# 02. 技术架构

## 1. 系统概览

本应用采用 **重客户端、无服务 (Client-Heavy, Serverless)** 架构。它构建为封装成渐进式 Web 应用 (PWA) 的单页应用 (SPA)。

### 技术栈
*   **运行时**: 浏览器 (Chrome/Safari/Edge/Firefox)。
*   **框架**: React 19 + TypeScript。
*   **构建系统**: Vite。
*   **样式**: Tailwind CSS (原子化 CSS)。
*   **状态管理**: React Hooks (`useState`, `useRef`, `useEffect`)。
*   **AI 引擎**: Google GenAI SDK (`@google/genai`)。
*   **数据传输**: REST / Fetch API。

## 2. 离线策略 (PWA)

核心价值主张是“离线优先”。我们使用 `vite-plugin-pwa` 配合 Workbox 实现。

### 2.1 资源缓存
*   **App Shell**: HTML, JS 包, CSS, 和图标在安装时预缓存。
*   **汉字数据**:
    *   构建时脚本 (`scripts/copyHanziData.js`) 将 `hanzi-writer-data` (~9000 个 JSON 文件) 复制到 `/public/hanzi-data`。
    *   Service Worker 配置 (`vite.config.ts`) 为缓存这些 JSON 文件。
    *   策略: 优先使用缓存 (`CacheFirst`)，本地无文件则回退到 CDN (`jsdelivr`)。

### 2.2 功能降级矩阵

| 功能 | 在线状态 | 离线状态 |
| :--- | :--- | :--- |
| **搜索** | 全功能 | 全功能 (基于本地数据) |
| **动画** | 从本地/CDN 加载 | 从缓存/本地加载 |
| **解析** | Gemini 3 Flash (富内容) | 生成静态 Fallback 对象 / 基础信息 |
| **音频** | Gemini 2.5 TTS (自然人声) | 浏览器 `SpeechSynthesis` (机械音) |

## 3. 模块设计

### 3.1 `services/hanziService.ts`
*   负责获取矢量数据。
*   逻辑: 尝试本地 `/hanzi-data` -> 失败 -> 尝试 CDN -> 失败 -> 抛出错误。

### 3.2 `services/geminiService.ts`
*   管理 AI 交互 (Char Analysis)。
*   **模型**: `gemini-3-flash-preview`。
*   **安全**: 针对骚扰/仇恨言论等配置为 `BLOCK_NONE`，以防止对历史/战争相关的字源解析（如包含武器“戈”的字）产生误报。
*   **Schema**: 使用 `responseSchema` 强制要求 JSON 输出格式。

### 3.3 `services/ttsService.ts`
*   管理语音合成。
*   **模型**: `gemini-2.5-flash-preview-tts`。
*   **缓存**: 维护内存中的 `Map<string, AudioBuffer>`，防止重复请求。
*   **降级**: 当 API Key 缺失、网络断开或配额超限时，自动切换至 Web Speech API。

## 4. 目录结构
```
/
├── public/             # 静态资源 (icon, manifest) + hanzi-data
├── scripts/            # 构建辅助脚本 (copyHanziData.js)
├── openspec/           # 规范文档
├── src/
│   ├── components/     # UI 组件 (StrokeViewer, AnalysisPanel, etc.)
│   ├── services/       # 业务逻辑 (gemini, hanzi, tts)
│   ├── utils/          # 工具函数 (commonChars)
│   ├── locales/        # 多语言字典 (i18n)
│   ├── types/          # TypeScript 类型定义
│   ├── App.tsx         # 主控制器
│   └── main.tsx        # 入口点
```

## 5. 数据持久化 (v0.3)
当前版本使用 **LocalStorage** 进行轻量级数据存储，以保持架构简单。

*   **Key: `appSettings`**: 存储用户偏好（自动播放、离线模式、API Key 等）。
*   **Key: `practiceHistory`**: 存储最近练习的汉字列表（JSON 数组）。
*   **Key: `theme`**: 存储亮色/暗色模式偏好。

*(注：v0.4 计划引入 IndexedDB 以支持更复杂的 SRS 复习队列数据)*
