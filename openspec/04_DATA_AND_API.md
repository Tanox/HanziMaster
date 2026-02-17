# 04. 数据与 API 协议

**版本**: v0.9.3
**状态**: 现行规范

## 1. 数据获取架构 (Data Acquisition)
HanziMaster 采用**三级降级 (3-Tier Fallback)**策略获取教学数据，以优先保障响应速度与离线可用性。

### 1.1 三级加载机制 (Tiered Loading)
| 层级 | 来源 | 内容 | 触发条件 |
| :--- | :--- | :--- | :--- |
| **Tier 1 (Local)** | `/public/hanzi-data/` | 基础笔顺 SVG & 骨架点 | 默认尝试，由 Service Worker 拦截并从 `CacheStorage` 返回 |
| **Tier 2 (CDN)** | `jsDelivr` (hanzi-writer-data) | 笔顺数据回退 | 本地文件缺失或 404 时触发，**v0.9.3 增加指数退避重试**，成功后自动写入 L1 缓存 |
| **Tier 3 (AI)** | Google Gemini API | 字源、记忆口诀、深度释义 | 联网状态下搜索新字时触发，结果写入 `LocalStorage` 缓存 |

## 2. 数据完整性校验 (Data Integrity)
为防止因网络截断或存储错误导致的 JSON 损坏，`hanziService` 必须执行以下结构校验：
*   **校验逻辑**:
    1.  检测 `strokes` 是否为非空数组。
    2.  **v0.9.3**: 检测 `strokes` 每一个元素是否为以 "M" 开头的合法 SVG 路径。
    3.  检测 `medians` 数组长度是否与 `strokes` 一致。
*   **异常处理**: 校验失败的本地资源将被丢弃，系统强制触发 Tier 2 (CDN) 重新拉取。

## 3. 离线词典协议 (Offline Dictionary)
*   **存储**: `LocalStorage` 下的 `offlineDictionary` 键。
*   **内容**: 预置 518 个 HSK 1-3 级高频字词。
*   **同步**: 用户可在设置面板手动触发“下载离线释义”，从本地静态常量加载。

## 4. AI 交互与数据解析 (AI Interaction)
*   **结构化响应**: 所有 AI 请求**必须**强制指定 `responseMimeType: "application/json"`，并提供严格的 `responseSchema`。
*   **数据清洗**: 前端实现 `cleanJsonResponse` 逻辑。

## 5. 语音协议 (TTS Protocol)
*   **在线优先**: 联网且 API Key 有效时，优先使用 Gemini Native Audio (`gemini-2.5-flash-native-audio-preview-12-2025`)。
*   **离线回退**: 自动回退至 `window.speechSynthesis`。

---
*文档维护: HanziMaster Data Group*