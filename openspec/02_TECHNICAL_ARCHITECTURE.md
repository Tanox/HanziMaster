# 02. 技术架构规范

**版本**: v0.7.1
**状态**: 现行规范

## 1. 架构总览
HanziMaster 采用基于 **React 18** 和 **Vite** 的现代化前端架构。核心设计思想是 **离线优先 (Offline-First)** 和 **组件化 (Component-Driven)**。

*   **UI 层**: React 18 + Tailwind CSS
*   **逻辑层**: 自定义 Hooks (`useAppController`, `useContentFetcher` 等)
*   **服务层**: 隔离的 Service 模块 (`geminiService`, `hanziService`, `ttsService`)
*   **PWA**: `vite-plugin-pwa` (Workbox)

## 2. 数据生命周期管理 (Data Lifecycle)

### 2.1 三层数据加载策略 (3-Tier Data Loading)
为最大化性能和离线可用性，所有数据获取遵循以下降级策略：
1.  **L1 - 本地缓存 (CacheStorage)**: Service Worker 拦截对 `/hanzi-data/` 的请求。若命中，直接返回缓存资源，响应时间 < 5ms。
2.  **L2 - CDN 回退 (jsDelivr)**: 若 L1 未命中或请求失败，`hanziService` 会尝试从 CDN 获取 `hanzi-writer-data`。成功后，资源会被 Service Worker 自动缓存，供下次 L1 使用。
3.  **L3 - AI 动态生成 (Gemini API)**: 针对字源、助记词等深度内容，`geminiService` 在联网且 API Key 有效时发起实时请求。结果会被缓存到 `LocalStorage` 以减少重复调用。

### 2.2 数据同步引擎 (Sync Engine)
位于 `app/components/settings/SettingsDataAudit.tsx`。
*   **分片下载**: 为避免主线程阻塞，批量下载 9000+ 笔顺文件时，采用 50 个/组的并发限制。
*   **增量更新**: 下载前通过 `cache.match()` 检查本地缓存，仅下载缺失的文件，实现断点续传。

### 2.3 缓存失效逻辑
当应用版本（如 `package.json` 中的 `version`）更新时，新的 Service Worker 会被激活。Workbox 的 `cleanupOutdatedCaches` 策略会确保旧版本的缓存被清除，从而在用户刷新后触发对新资源的请求。

## 3. 安全与隐私 (Security & Privacy)
*   **API Key 隔离 (BYOK)**: 用户输入的自定义 API Key 仅存储在 `LocalStorage` 中，并且在 `geminiService` 中被直接调用，不会经过任何中间服务器。
*   **学习数据本地化**: 所有用户练习历史、统计数据均存储在本地。应用不设后端用户系统，确保用户数据隐私。
*   **数据导出**: 未来版本将支持用户导出 `LocalStorage` 中的练习记录为 JSON 文件，实现本地备份。

---
*文档维护: HanziMaster Architecture Team*