# Technical Specification (技术规范)

## 1. 架构概览

本项目采用单页应用 (SPA) 架构，前端负责所有交互与渲染，后端逻辑（AI 生成）通过无服务器 API 调用实现。

### 技术栈
*   **Frontend Core**: React 19, TypeScript
*   **Build Tool**: Vite (Implicit via current setup)
*   **Styling**: Tailwind CSS
*   **AI SDK**: `@google/genai` (Google Gemini API)
*   **Icons**: Lucide React
*   **Data Source**: Hanzi Writer Data (CDN: jsdelivr)

## 2. 数据流

1.  **用户输入**：用户在 `SearchInput` 组件输入汉字。
2.  **并行请求**：
    *   **笔画数据**：`hanziService` 请求 CDN 获取 SVG 路径数据。
    *   **AI 解析**：`geminiService` 调用 `gemini-3-flash-preview` 模型。
3.  **状态管理**：`App.tsx` 统一管理 `hanziData` (视觉) 和 `analysis` (文本) 状态。
4.  **渲染**：
    *   `StrokeViewer` 根据 SVG 路径和 `medians` 计算裁剪路径，实现书写动画。
    *   `AnalysisPanel` 根据 AI 返回的 JSON 数据渲染信息卡片。

## 3. 模块详细设计

### 3.1 Gemini 服务 (`services/geminiService.ts`)
*   **Model**: `gemini-3-flash-preview`
*   **Prompt Strategy**: Structured JSON output mode (`responseMimeType: "application/json"`).
*   **System Instruction**: 设定专家人设 ("Professional Chinese etymologist") 以保证输出质量。
*   **Localization**: 提示词中动态插入 `${languageName}`，强制模型以目标语言输出。

### 3.2 笔画动画引擎 (`components/StrokeViewer.tsx`)
*   **原理**：使用 SVG `clipPath` 和 `stroke-dasharray` 动画技术。
*   **同步机制**：使用 `requestAnimationFrame` 确保高性能渲染。
*   **坐标系转换**：处理 Hanzi Writer 数据特有的垂直翻转坐标系 (`scale(1, -1)`).

### 3.3 国际化 (`locales.ts`)
*   **结构**：简单的 Key-Value 字典对象。
*   **扩展性**：新增语言只需在 `LANGUAGES` 数组添加条目并在 `UI_LABELS` 中添加对应翻译。

## 4. API 接口定义

### 4.1 Gemini API Request
```json
{
  "model": "gemini-3-flash-preview",
  "contents": "Analyze the Chinese character '永'...",
  "config": {
    "responseSchema": { ... }
  }
}
```

### 4.2 Gemini API Response (Expected Schema)
```typescript
interface CharacterAnalysis {
  char: string;
  pinyin: string;
  meaning: string;
  radical: string;
  strokeCount: number;
  etymology: string;
  mnemonic: string;
  examples: Array<{ word: string, pinyin: string, meaning: string }>
}
```

## 5. 安全性与部署
*   **API Key 管理**：必须通过环境变量 `process.env.API_KEY` 注入，避免硬编码。
*   **输入验证**：仅允许单个汉字输入（Regex: `[\u4E00-\u9FFF]`）。
