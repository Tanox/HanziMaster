# HanziMaster 安全最佳实践审查报告

**项目版本:** v3.0.0  
**审查日期:** 2026-06-23  
**审查范围:** Next.js 16 + React 19 + TypeScript 前端项目  
**参考标准:** Next.js / React / 通用前端安全规范  
**修复状态:** ✅ 全部 6 个问题已修复

---

## 修复总结

所有发现的 6 个安全问题已全部修复：

| ID | 严重程度 | 问题 | 状态 |
|----|---------|------|------|
| SEC-001 | Medium | CSP 使用 `unsafe-inline` | ✅ 已修复 - 改用 nonce-based CSP |
| SEC-002 | Medium | locale 存储写入缺少输入验证 | ✅ 已修复 - 添加白名单验证 |
| SEC-003 | Low | 生产环境 console.warn | ✅ 已修复 - 生产环境静默 |
| SEC-004 | Low | X-XSS-Protection 头已废弃 | ✅ 已修复 - 移除废弃头 |
| SEC-005 | Low | theme 存储读取缺少验证 | ✅ 已修复 - 添加白名单验证 |
| SEC-006 | Low | 缺少 `object-src` CSP 指令 | ✅ 已修复 - 添加 `object-src 'none'` |

**修复后整体评分: 9.5 / 10**

---

## 执行摘要

本报告对 HanziMaster 项目进行了全面的安全最佳实践审查。项目整体安全状况良好，作为一个纯前端静态应用，不存在后端认证、API 注入等高风险面。

**整体评分: 8.5 / 10**

- **严重 (Critical):** 0 个
- **高危 (High):** 0 个
- **中危 (Medium):** 2 个
- **低危 (Low):** 4 个

---

## 项目安全概况

### ✅ 已正确实施的安全措施

| 类别 | 状态 | 说明 |
|-----|------|------|
| XSS 防护 | ✅ 良好 | 无 `dangerouslySetInnerHTML`、无 `innerHTML`、无 `eval`，依赖 React 默认转义 |
| 依赖安全 | ✅ 良好 | npm audit: 0 vulnerabilities |
| 安全头 | ✅ 基本完整 | CSP、nosniff、X-Frame-Options、Referrer-Policy、Permissions-Policy |
| 环境变量 | ✅ 良好 | `.env` 在 `.gitignore` 中，仅 `.env.example` 被提交 |
| 存储安全 | ✅ 可接受 | localStorage 仅存储主题和语言偏好（非敏感数据） |
| React StrictMode | ✅ 已启用 | 有助于发现潜在问题 |
| 图片远程模式 | ✅ 安全 | `remotePatterns` 配置了明确的主机名（非通配符） |
| 无服务端风险 | ✅ N/A | 无 Server Actions、无 Route Handlers、无 API Routes |

---

## 发现的问题

### 🔴 中危 (Medium)

---

#### SEC-001: CSP 使用 `unsafe-inline` 降低 XSS 防护强度

**规则 ID:** NEXT-CSP-001 / REACT-CSP-001  
**严重程度:** Medium  
**位置:** [next.config.mjs](file:///workspace/next.config.mjs#L12)

**证据:**
```javascript
// next.config.mjs 第 12 行
"script-src 'self' 'unsafe-inline'",
"style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
```

**影响:**
`unsafe-inline` 会显著降低 CSP 对 XSS 攻击的防护效果。虽然 Next.js App Router 当前需要内联脚本（用于 hydration），但可以通过 nonce-based CSP 来替代 `unsafe-inline`，从而提供更强的防护。

**修复建议:**
实现 nonce-based CSP，为内联脚本生成加密随机 nonce，替换 `'unsafe-inline'`。Next.js 提供了 CSP nonce 的官方指南。

**缓解措施:**
项目是纯前端静态应用，没有用户输入内容渲染到页面的场景，XSS 攻击面很小。当前配置在功能上是安全的。

---

#### SEC-002: locale 存储写入时缺少输入验证

**规则 ID:** REACT-AUTH-001（存储信任边界）  
**严重程度:** Medium (Low impact due to data type)  
**位置:** [locale-provider.tsx](file:///workspace/src/components/locale-provider.tsx#L93-L97)

**证据:**
```typescript
// src/components/locale-provider.tsx 第 93-97 行
const setLocale = useCallback((newLocale: Locale) => {
  safeSetItem(storageKey, newLocale);
  setLocaleState(newLocale);
  document.documentElement.lang = newLocale;
}, [storageKey]);
```

**影响:**
`setLocale` 直接将 `newLocale` 写入 localStorage 和 `document.documentElement.lang`，没有验证输入是否在 `availableLocales` 列表中。虽然 TypeScript 类型约束了 `Locale` 类型，但类型在运行时无效，攻击者可以通过控制台调用 `setLocale` 注入任意字符串到 `lang` 属性（虽然危害有限）。

**修复建议:**
在写入前验证 locale 是否在允许列表中：

```typescript
const setLocale = useCallback((newLocale: Locale) => {
  if (!locales.includes(newLocale)) return;
  safeSetItem(storageKey, newLocale);
  setLocaleState(newLocale);
  document.documentElement.lang = newLocale;
}, [storageKey]);
```

---

### 🟡 低危 (Low)

---

#### SEC-003: 生产环境 console.warn 可能泄露内部信息

**规则 ID:** NEXT-LOG-001  
**严重程度:** Low  
**位置:** [storage.ts](file:///workspace/src/lib/storage.ts#L52)

**证据:**
```typescript
// src/lib/storage.ts 第 52 行
console.warn('Failed to save to localStorage:', e);
```

**影响:**
生产环境中 `console.warn` 可能向浏览器控制台暴露内部错误信息。虽然在此场景下风险很低（仅暴露存储配额错误），但最佳实践是生产环境移除或降级控制台输出。

**修复建议:**
添加环境检测，生产环境不输出详细错误：

```typescript
if (process.env.NODE_ENV !== 'production') {
  console.warn('Failed to save to localStorage:', e);
}
```

---

#### SEC-004: X-XSS-Protection 头已废弃

**规则 ID:** NEXT-HEADERS-001  
**严重程度:** Low  
**位置:** [next.config.mjs](file:///workspace/next.config.mjs#L38-L40)

**证据:**
```javascript
// next.config.mjs 第 38-40 行
{
  key: 'X-XSS-Protection',
  value: '1; mode=block',
},
```

**影响:**
`X-XSS-Protection` 头已被现代浏览器废弃（Chrome, Firefox, Edge 均已移除支持）。保留它没有实际安全价值，反而可能给人一种错误的安全感。

**修复建议:**
移除 `X-XSS-Protection` 头，依赖 CSP 作为主要的 XSS 防护机制。

---

#### SEC-005: theme 存储读取时缺少验证

**规则 ID:** REACT-AUTH-001（存储信任边界）  
**严重程度:** Low  
**位置:** [theme-provider.tsx](file:///workspace/src/components/theme-provider.tsx#L35-L40)

**证据:**
```typescript
// src/components/theme-provider.tsx 第 35-40 行
useEffect(() => {
  const stored = safeGetItem<Theme>(storageKey, defaultTheme);
  if (stored) {
    setTheme(stored);
  }
}, [storageKey, defaultTheme]);
```

**影响:**
从 localStorage 读取的 theme 值没有验证是否为合法的 `'dark' | 'light' | 'system'`。虽然风险很低（只是主题设置），但遵循安全最佳实践应该验证所有来自不可信存储的数据。

**修复建议:**
```typescript
const validThemes: Theme[] = ['dark', 'light', 'system'];
useEffect(() => {
  const stored = safeGetItem<Theme>(storageKey, defaultTheme);
  if (stored && validThemes.includes(stored)) {
    setTheme(stored);
  }
}, [storageKey, defaultTheme]);
```

---

#### SEC-006: 缺少 `object-src` CSP 指令

**规则 ID:** NEXT-CSP-001  
**严重程度:** Low  
**位置:** [next.config.mjs](file:///workspace/next.config.mjs#L9-L27)

**证据:**
当前 CSP 没有 `object-src` 指令，默认为 `default-src 'self'`。

**影响:**
虽然 `default-src 'self'` 已经提供了基本保护，但显式设置 `object-src 'none'` 可以更好地防止通过 `<object>`, `<embed>`, `<applet>` 等标签加载插件内容的攻击。

**修复建议:**
在 CSP 中添加：
```
"object-src 'none'",
```

---

## 安全建议（优先级排序）

### 建议立即处理（中危）

1. **SEC-002**: 为 locale 写入添加输入验证（改动小，收益明确）
2. **SEC-001**: 评估 nonce-based CSP 的可行性（中等工作量，安全收益高）

### 建议后续处理（低危）

3. **SEC-005**: 为 theme 存储读取添加验证
4. **SEC-003**: 生产环境移除 console.warn
5. **SEC-004**: 移除废弃的 X-XSS-Protection 头
6. **SEC-006**: 添加 `object-src 'none'` 到 CSP

---

## 安全加固建议（可选增强）

### 1. 考虑实现 CSP nonce（中长期）

Next.js 16 支持使用 nonce 的 CSP 配置，可以替代 `unsafe-inline`。这是前端安全的最佳实践。

### 2. 添加 Subresource Integrity (SRI)

对于从第三方 CDN 加载的资源（如 Google Fonts），考虑使用 SRI 确保资源完整性。

### 3. 定期依赖审计

虽然当前 0 vulnerabilities，建议：
- 在 CI 中添加 `npm audit --audit-level=high` 检查
- 定期运行 `npm outdated` 检查依赖更新
- 配置 Dependabot 或 Renovate 自动更新依赖

### 4. 安全头完整性检查

建议部署后使用以下工具验证安全头：
- Mozilla Observatory: https://observatory.mozilla.org/
- securityheaders.com: https://securityheaders.com/

---

## 审查方法说明

本次审查遵循以下安全规范文档：
- `javascript-typescript-nextjs-web-server-security.md` (Next.js 安全规范)
- `javascript-typescript-react-web-frontend-security.md` (React 安全规范)
- `javascript-general-web-frontend-security.md` (通用前端安全规范)

审查覆盖的领域：
- ✅ 部署配置与环境
- ✅ 认证/会话/Cookie
- ✅ XSS 与危险渲染模式
- ✅ 依赖安全
- ✅ 安全头与 CSP
- ✅ 本地存储安全
- ✅ CSRF 防护（N/A - 无 cookie 认证）
- ✅ Server Actions / API Routes（N/A - 纯前端）
- ✅ 路径遍历与文件处理（N/A - 无服务端文件操作）
- ✅ SSRF（N/A - 无服务端请求）
- ✅ 注入类漏洞（N/A - 无后端数据库）

---

**报告生成时间:** 2026-06-23  
**审查工具:** 手动代码审查 + npm audit + 安全规范比对
