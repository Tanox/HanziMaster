# 04. 数据与 API 协议

**版本**: v0.7.1
**状态**: 现行规范

## 1. 数据获取架构 (Data Acquisition)
HanziMaster 采用**三级降级 (3-Tier Fallback)**策略获取教学数据，以优先保障响应速度与离线可用性。

### 1.1 三级加载机制 (Tiered Loading)
| 层级 | 来源 | 内容 | 触发条件 |
| :--- | :--- | :--- | :--- |
| **Tier 1 (Local)** | `/public/hanzi-data/` | 基础笔顺 SVG & 骨架点 | 默认尝试，由 Service Worker 拦截并从 `CacheStorage` 返回 |
| **Tier 2 (CDN)** | `jsDelivr` (hanzi-writer-data) | 笔顺数据回退 | 本地文件缺失或 404 时触发，成功后自动写入 L1 缓存 |
| **Tier 3 (AI)** | Google Gemini API | 字源、记忆口诀、深度释义 | 联网状态下搜索新字时触发，结果写入 `LocalStorage` 缓存 |

## 2. 笔顺数据协议 (Stroke Data Protocol)
*   **格式**: JSON (完全兼容 `hanzi-writer-data` 规范)。
*   **关键字段**: 
    *   `strokes`: (string[]) SVG `path` 字符串数组，定义每个笔画的轮廓。
    *   `medians`: (number[][][]) 定义每个笔画中轴线的点集，用于练习校验。
*   **获取逻辑**: 
    *   查询字 `char` -> 计算 Unicode 编码 -> 请求 `LOCAL_BASE_URL/{char}.json`。

## 3. AI 交互与数据解析 (AI Interaction)
*   **服务模块**: 所有 AI 请求必须通过 `app/services/geminiService.ts` 模块。
*   **结构化响应**: 所有 AI 请求**必须**强制指定 `responseMimeType: "application/json"`，并提供严格的 `responseSchema` 以确保输出格式的稳定性。Schema 定义见 `09_DATA_DICTIONARY.md`。
*   **数据清洗**: 前端**必须**实现 `cleanJsonResponse` 逻辑，该逻辑能处理 AI 可能输出的 Markdown 代码块标识（```json ... ```）或其他前置文本，确保 `JSON.parse` 的成功率。

## 4. 离线更新策略 (Offline Sync)
*   **数据审计 (Audit)**: 应用内置“数据审计”模块，通过比对 `COMMON_CHARS` (常用字表) 与本地 `CacheStorage` 中的条目，实时计算离线笔顺库的覆盖率。
*   **手动增量更新**: 用户在设置界面手动触发“全量下载”，应用将并发请求 9000+ 字符数据并写入 `CacheStorage`。该过程支持断点续传。

## 5. 语音协议 (TTS Protocol)
*   **服务模块**: 所有 TTS 请求必须通过 `app/services/ttsService.ts` 模块。
*   **在线优先**: 联网且 API Key 有效时，优先使用 Gemini Native Audio (`gemini-2.5-flash-native-audio-preview-12-2025`) 生成高质量音频。
*   **离线回退**: 在线 TTS 失败或处于离线模式时，自动回退至 `window.speechSynthesis`，匹配当前系统的中文语音包。

---
*文档维护: HanziMaster Data Group*