# 16. 部署与运维规范 (Deployment & Ops)

**版本**: v0.7.1
**状态**: 现行规范

## 1. 托管环境
*   **平台**: Vercel
*   **类型**: 静态站点 (Static Site / SPA)
*   **路由**: 由于是 SPA，必须配置 `vercel.json` 重写规则，将所有路由指向 `index.html`，以支持 React Router 的客户端路由。

## 2. 构建流水线 (Build Pipeline)
### 2.1 依赖安装与数据准备
在构建阶段 (`npm run build`)，脚本会自动执行以下步骤：
1.  `npm install`: 安装依赖。
2.  `npm run copy-data`: 执行 `app/scripts/copyHanziData.js`，生成 `public/hanzi-data/character-list.json` 和 `app/constants/dictionaryMeta.ts`。不再复制大量 JSON 文件，而是通过 API 路由按需读取。
3.  `tsc`: TypeScript 类型检查。
4.  `next build`: 生成生产环境代码。

### 2.2 环境变量
*   **NEXT_PUBLIC_GEMINI_API_KEY**: 生产环境部署时，**不应**在 Vercel 后台配置默认的 `NEXT_PUBLIC_GEMINI_API_KEY`，以强制用户使用 BYOK (Bring Your Own Key) 模式，避免开发者的配额被耗尽。Demo 环境可例外。

## 3. PWA 与缓存策略 (Caching Strategy)
应用使用 `next-pwa` 生成 Service Worker。
*   **策略**: **Stale-While-Revalidate** 或 **CacheFirst**。
*   **核心资源**:
    *   `index.html`, `assets/*.js`, `assets/*.css`: 预缓存 (Precache)，随版本更新自动失效。
    *   `/api/hanzi/*`: 运行时缓存 (Runtime Cache)，策略为 `CacheFirst`，过期时间 1 年。
    *   `Google Fonts`: 运行时缓存，策略为 `CacheFirst`。
*   **更新机制**: 应用内建 `ReloadPrompt` 组件。当 Service Worker 发现新版本并完成安装后，会提示用户“刷新以更新”。

## 4. 版本发布规范 (Release Cycle)
1.  **版本号**: 遵循 Semantic Versioning (X.Y.Z)。
    *   修改 `package.json`。
    *   修改 `app/App.tsx` 中的 `APP_VERSION` 常量。
    *   更新 `CHANGELOG.md`。
2.  **Git Tag**: 每次发布必须打 Tag，例如 `v0.7.1`。
3.  **文档同步**: 发布前必须检查 `openspec/` 文档是否与代码实现保持一致。

---
*文档维护: HanziMaster DevOps Team*