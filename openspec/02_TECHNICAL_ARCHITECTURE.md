# 02. 技术架构

## 1. 系统概览

本应用采用 **重客户端、无服务 (Client-Heavy, Serverless)** 架构。它构建为封装成渐进式 Web 应用 (PWA) 的单页应用 (SPA)。

### 技术栈
*   **运行时**: 浏览器 (Chrome/Safari/Edge/Firefox)。
*   **框架**: React 19 + TypeScript。
*   **构建系统**: Vite。
*   **样式**: Tailwind CSS (原子化 CSS)。
*   **状态管理**: React Hooks (`useState`, `useReducer`, `useContext`)。
*   **AI 引擎**: Google GenAI SDK (`@google/genai`)。
*   **数据传输**: REST / Fetch API。

## 2. 离线策略 (PWA)

核心价值主张是“离线优先”。我们使用 `vite-plugin-pwa` 配合 Workbox 实现。

### 2.1 资源缓存
*   **App Shell**: HTML, JS 包, CSS, 和图标在安装时预缓存。
*   **汉字数据**:
    *   构建时将 `node_modules/hanzi-writer-data` (~9000 个 JSON 文件) 复制到 `/public/hanzi-data`。
    *   Service Worker 配置为缓存这些 JSON 文件。
    *   策略: 优先使用缓存 (`CacheFirst`)，如果本地文件缺失则回退到 CDN (`jsdelivr`)，并将响应结果缓存。

### 2.2 功能降级矩阵

| 功能 | 在线状态 | 离线状态 |
| :--- | :--- | :--- |
| **搜索** | 全功能 | 全功能 (基于本地数据) |
| **动画** | 从本地/CDN 加载 | 从缓存/本地加载 |
| **解析** | Gemini 3 Flash (富内容) | 静态占位符 / 基础信息 |
| **音频** | Gemini 2.5 TTS (自然人声) | 浏览器 `SpeechSynthesis` (机械音) |

## 3. 模块设计

### 3.1 `services/hanziService.ts`
*   负责获取矢量数据。
*   逻辑: 尝试本地路径 -> 失败 -> 尝试 CDN -> 失败 -> 报错。

### 3.2 `services/geminiService.ts`
*   管理 AI 交互。
*   **安全**: 针对骚扰/仇恨言论等配置为 `BLOCK_NONE`，以防止对历史/战争相关的字源解析（如包含武器“戈”的字）产生误报。
*   **Schema**: 使用 `responseSchema` 强制要求 JSON 输出格式。

### 3.3 `services/ttsService.ts`
*   实现混合音频模式。
*   维护内存中的 `Map<string, AudioBuffer>` 缓存，防止在同一次会话中重复请求相同的字符音频。
*   管理 `AudioContext` 生命周期（在用户交互时恢复上下文）。

## 4. 目录结构
```
/
├── public/             # 静态资源 + 汉字 JSON 数据
├── openspec/           # 规范文档 (当前位置)
├── src/
│   ├── components/     # UI 组件 (展示层)
│   ├── services/       # 业务逻辑 & API 调用
│   ├── utils/          # 工具函数
│   ├── locales/        # 多语言字典
│   ├── types/          # TypeScript 类型定义
│   ├── App.tsx         # 主控制器
│   └── main.tsx        # 入口点
```