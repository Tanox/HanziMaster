
# 12. 安全与隐私规范 (Security & Privacy)

## 1. 架构安全模型
HanziMaster 采用 **无后端 (Serverless / Client-Side Only)** 架构。
*   **零数据收集**: 我们没有数据库，不收集用户的查询历史、API Key 或练习记录。
*   **数据所有权**: 所有用户数据（设置、历史）仅存储在用户浏览器的 `LocalStorage` 中。

## 2. API Key 管理 (BYOK 策略)

### 2.1 客户端直连
*   用户输入的 Gemini API Key 直接存储在 `LocalStorage` (`appSettings.apiKey`)。
*   **传输安全**: Key 仅用于向 `generativelanguage.googleapis.com` 发起 HTTPS 请求，绝不发送至任何第三方统计服务器。

### 2.2 风险缓解
*   **前端混淆**: 虽然提供了默认的 `process.env.API_KEY` 以供演示，但该 Key 在前端构建中是可见的。生产环境部署时，必须限制该 Key 的 Referrer 仅为官方域名。
*   **用户提示**: 在设置界面明确提示用户使用自己的 Key 以避免配额限制，并解释 Key 的存储位置。

## 3. 内容安全策略 (CSP)

为了防止 XSS 攻击及非授权的数据外泄，`index.html` 应遵循以下 CSP 原则（建议配置在 Web 服务器头信息中）：

```http
Content-Security-Policy: 
  default-src 'self';
  script-src 'self' 'unsafe-inline';  # React/Vite 需要
  connect-src 'self' https://generativelanguage.googleapis.com; # 允许连接 Gemini
  img-src 'self' data: blob:;         # 允许 SVG 和 Canvas 图片生成
  style-src 'self' 'unsafe-inline';   # Tailwind
  font-src 'self' https://fonts.gstatic.com;
```

## 4. 数据持久化与清理

### 4.1 LocalStorage 策略
*   **敏感数据**: API Key。
*   **非敏感数据**: 练习历史、偏好设置、缓存。

### 4.2 清理机制
*   提供“重置应用”或“清除数据”按钮，调用 `localStorage.clear()`，彻底移除所有本地痕迹。

## 5. 生成内容安全 (AI Safety)
*   **过滤器配置**: 在 `geminiService.ts` 中，显式设置 `HarmCategory` 阈值。虽然汉字教学风险较低，但仍需防止 AI 生成仇恨言论或不当的例句。
*   **输入清洗**: 对用户输入的搜索词进行长度限制（Max 4 chars）和正则校验（仅限汉字），防止 Prompt Injection 攻击。

---
*文档维护: HanziMaster Security Team*
