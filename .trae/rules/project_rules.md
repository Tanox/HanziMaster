# HanziMaster 项目开发规则

## 1. 核心技术栈
- **框架**: React 18.3.1 + TypeScript + Next.js 15.1.0 (App Router)
- **样式**: Tailwind CSS (支持 Dark Mode)
- **AI SDK**: `@google/genai` (v0.2.0+)
- **构建**: Next.js + PWA

## 2. 环境配置
- **npm**: 使用全局模式，不在项目中创建 node_modules
- **配置**: .npmrc 中设置 `global=true`
- **禁止**: 创建 .next、node_modules 等本地缓存目录

## 3. Google GenAI 编码规范
本项目严格遵循 `@google/genai` 最新版 SDK 规范：

### 3.1 初始化
- 必须使用命名参数初始化客户端：
  ```ts
  // ✅ 正确
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  // ❌ 错误
  const ai = new GoogleGenAI(process.env.API_KEY);
  ```

### 3.2 模型调用
- **文本生成**: 使用 `ai.models.generateContent`。
- **TTS 生成**: 使用 `ai.models.generateContent` 并配置 `responseModalities: [Modality.AUDIO]`。
- **禁止使用**: `GoogleGenerativeAI`, `google.generativeai` 等旧版对象。

### 3.3 类型定义
- 使用 `GenerateContentResponse` 而非 Result。
- 响应 Schema 定义使用 `Type` 枚举 (如 `Type.OBJECT`)，禁止使用 `SchemaType`。

### 3.4 API Key 管理
- 所有的 Key 获取必须通过 `process.env.API_KEY` 或用户在设置面板输入的自定义 Key。
- 代码中禁止硬编码任何 Key。

## 4. 目录与文件规范
- **根目录**: 项目源码直接位于根目录（无 `src/` 层级）。
- **文件编码**: UTF-8, CRLF 行尾。
- **组件结构**: 每个组件文件头部必须包含版本注释，例如 `/** HanziMaster v0.7.7 */`。

## 5. UI/UX 设计原则
- **色彩**: 遵循 "Vermilion (朱砂)" + "Slate (松烟)" 配色体系。
- **字体**: 汉字必须使用 `Noto Serif SC` (font-hanzi)，UI 文本使用 `Inter` (font-sans)。
- **响应式**: 必须优先适配移动端触摸操作 (44px+ 点击区域)。
- **交互反馈**: 严禁使用 browser native `alert()` or `confirm()`. 必须使用全局 `Toast` 组件或自定义 Modal 进行用户提示。

## 6. 离线优先 (Offline-First)
- 任何网络请求（Hanzi Data, AI Analysis, TTS）都必须包含 Fallback 机制。
- 必须处理 `navigator.onLine` 状态变化。
- 关键数据（如高频字拼音）应在本地缓存或硬编码。

## 7. 代码质量
- **注释**: 复杂逻辑（尤其是几何计算、Canvas 绘制）必须添加函数级注释。
- **Lint**: 保持 `npm run build` 无 TypeScript 错误。
- **Imports**: 优先使用相对路径引入本地模块。

## 8. 文档规范 (OpenSpec)
- **同步更新**: 任何架构变更、API 协议修改或新功能发布，必须同步更新 `openspec/` 下的对应文档。
- **版本审计**: 每次发布新版本前，需更新 `CHANGELOG.md` 并生成项目审查报告 (`openspec/reports/`)。
- **真理来源**: `openspec/` 文档是项目的 Single Source of Truth，代码实现需以文档定义为准。
