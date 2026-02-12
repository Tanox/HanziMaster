# 项目审查报告

**审查时间**: 2026-02-12 22:49
**审查版本**: v0.4.2
**审查状态**: ⚠️ 有条件通过 (Conditional Pass)

## 1. 概览

本次审查针对 HanziMaster 代码库进行全面深度审查，覆盖服务层、组件层、本地化、构建配置及 OpenSpec 文档。项目整体架构清晰，离线优先与 AI 增强的核心理念实现良好，但存在若干需修复的规范性问题。

## 2. 🔴 严重问题 (Blocking)

### 2.1 版本号严重不同步

项目中存在 **6 种不同版本号** 散布在 40+ 个源文件中，违反了 SemVer 同步规范。

| 版本 | 文件 |
| :--- | :--- |
| **v0.3.1** | `vite.config.ts`, `geminiService.ts`, `ttsService.ts`, `hanziService.ts`, `types/index.ts`, `geometry.ts`, `locales/index.ts`, 及 10 个组件 |
| **v0.3.4** | `commonChars.ts` |
| **v0.3.5** | `IdiomNavigator.tsx`, `IdiomDisplay.tsx`, 及 10 个 locale 文件 (ar/de/es/fr/id/it/ja/ko/pt/ru/th/vi) |
| **v0.3.6** | `index.tsx`, `CharacterDisplay.tsx` |
| **v0.4.0** | `index.html`, `imageGenerator.ts`, `ShareButton.tsx`, `commonTerms.ts` |
| **v0.4.1** | `pinyinData.ts`, `seasonalEvents.ts` |
| **v0.4.2** | `SettingsModal.tsx`, `RandomSuggestions.tsx`, `ReloadPrompt.tsx`, `en.ts/zh-CN.ts/zh-TW.ts`, `types.ts` |

**缺失头注释**: `App.tsx`, `useAppController.ts`, `useLocalStorage.ts`

> [!CAUTION]
> `package.json` 中 `version` 为 `0.4.0`，但最新修改的文件标注为 `v0.4.2`，两者不一致。应统一至最新版本。

### 2.2 硬编码英文字符串未本地化

以下 UI 字符串直接硬编码在组件中，绕过了本地化系统：

| 文件 | 行号 | 硬编码字符串 |
| :--- | :--- | :--- |
| `StrokeViewer.tsx` | L390 | `Stroke {n} / {total}` |
| `StrokeViewer.tsx` | L393 | `Please write the next stroke.` |
| `RandomSuggestions.tsx` | L198 | `Refresh Suggestions` |
| `App.tsx` | L66 | `"Offline Mode: Using local data & native voice."` 及 `" Enabled"` 后缀 |

## 3. 🟡 中等问题 (Non-Blocking)

### 3.1 UX: `alert()` 调用

3 处原生 `alert()` 弹窗不符合应用的纯净 UI 设计语言：

- `SettingsModal.tsx` L74 — `alert('Missing characters copied to clipboard!')`
- `ShareButton.tsx` L53 — `alert('Failed to copy.')`
- `SearchInput.tsx` L45 — `alert(invalidCharMessage)`

**建议**: 替换为内嵌 Toast 提示或浮动通知组件。

### 3.2 `index.html` importmap 冗余

`importmap` 中包含 `fs`, `path`, `url` 三个 Node.js 模块的 esm.sh shim（L93-95），在浏览器环境中完全不需要。
且 `02_TECHNICAL_ARCHITECTURE.md` 中明确记录了 "No-ImportMap" 构建策略，与当前实现矛盾。

### 3.3 安全: API Key 暴露在 `process.env.API_KEY`

`index.html` L14 初始化 `window.process = { env: { API_KEY: "" } }`，`vite.config.ts` 通过 `define` 将 `API_KEY` 注入。这可能导致 API Key 在生产构建中暴露在客户端代码中。已在 `12_SECURITY_AND_PRIVACY.md` 中记录了此风险，但应增加使用说明或环境检测。

### 3.4 离线模式提示文案不一致

`App.tsx` L66 离线提示中存在中英文混合问题：
```tsx
state.settings.offlineMode ? labels.settingOfflineMode + " Enabled" : "Offline Mode: Using local data & native voice."
```
应全部使用 `labels` 中的本地化字符串。

## 4. ✅ 优势确认

### 4.1 服务层
- `geminiService.ts`: 错误处理完善（429 限流、网络异常、JSON 解析失败）均有优雅降级
- `ttsService.ts`: 三级降级策略（Cache → Gemini TTS → Native TTS）设计优秀
- `hanziService.ts`: 本地优先 + CDN 回退策略正确

### 4.2 PWA 配置
- Workbox 缓存策略合理：`/hanzi-data/` 和 Google Fonts 均为 `CacheFirst`，TTL 1 年
- `registerType: 'prompt'` 符合最佳实践，避免强制刷新

### 4.3 状态管理
- `useAppController` 使用自定义 `useLocalStorage` hook 持久化核心设置，结构清晰
- 二级缓存（L2 Cache）设计合理，支持分析结果和拼音的离线复用
- 缓存有 150 条上限和 LRU 式清理策略

### 4.4 本地化体系
- 支持 15 种语言，类型安全的 `UILabels` 接口
- 使用索引签名 `[key: string]` 支持动态节庆 key 查找

### 4.5 组件设计
- `StrokeViewer` 练习模式的几何校验算法（阈值 = max(150, strokeLen × 0.4)）设计合理
- `RandomSuggestions` 节庆词自动推荐算法良好

## 5. 📋 修复建议优先级

| 优先级 | 问题 | 工作量 |
| :--- | :--- | :--- |
| P0 | 统一全部文件版本号至 v0.4.2 | 小 |
| P0 | 补充缺失的文件头注释 | 小 |
| P1 | 本地化 4 处硬编码英文字符串 | 小 |
| P1 | 修复 `App.tsx` 离线提示的中英混合 | 小 |
| P2 | 替换 3 处 `alert()` 为 Toast 组件 | 中 |
| P2 | 清理 `index.html` 中无用的 importmap shim | 小 |
| P3 | 增加单元测试（`utils/geometry.ts` 等） | 中 |
| P3 | 为 `StrokeViewer` SVG 增加 `aria-description` | 小 |

## 6. 结论

项目核心功能实现优秀，服务层错误处理完善，PWA 离线策略到位。主要问题集中在**版本号管理混乱**和**本地化不完整**两个方面，均为规范性问题，修复难度低。建议统一版本号后发布 v0.4.2 的正式构建。
