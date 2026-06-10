# 安全与性能规范

---

## Meta 信息

| 字段 | 值 |
|-----|-----|
| **版本** | v2.3.1 |
| **更新日期** | 2026-06-10 |
| **维护者** | HanziMaster 开发团队 |
| **文档编号** | OS-10 |

---

## 1. 安全策略总览

HanziMaster 汉字大师是一个前端 Web 应用，主要使用 localStorage 存储用户偏好。核心安全原则：

| 原则 | 说明 |
|-----|------|
| **最小权限** | 不请求不必要的浏览器权限 |
| **数据最小化** | 仅存储必要的用户偏好，不收集个人信息 |
| **API Key 保护** | 所有服务端密钥绝不暴露到客户端 |
| **安全默认** | 默认启用 CSP、HTTPS、Secure Cookie |

---

## 2. API Key 安全

### 2.1 安全原则

```
❌ 绝对不能：
   - 在客户端代码中硬编码 API Key
   - 在 git 仓库中提交 API Key
   - 分享 API Key 到公共渠道

✅ 必须：
   - 使用环境变量存储：process.env.GEMINI_API_KEY
   - 在 .env.example 中使用占位符
   - 每个开发环境使用独立的 API Key
   - 定期轮换密钥
```

### 2.2 .env 配置

```dotenv
# .env.example（可提交到 git）
GEMINI_API_KEY=your-api-key-here

# .env（本地使用，必须在 .gitignore 中）
GEMINI_API_KEY=AIzaSyDuMmY...（真实密钥）
```

### 2.3 .gitignore

```gitignore
# 环境变量
.env
.env.local
.env.development.local
.env.production.local

# 依赖
node_modules/

# Next.js 构建产物
.next/
out/
build/

# 日志
npm-debug.log*
yarn-debug.log*

# 操作系统文件
.DS_Store
Thumbs.db

# 编辑器
.idea/
.vscode/
*.swp
```

### 2.4 Next.js 环境变量机制

```
Next.js 中两种变量：

1. 服务器端变量（无 NEXT_PUBLIC_ 前缀）
   process.env.GEMINI_API_KEY
   ✅ 仅在服务器端可用
   ✅ 不会打包到客户端 JS

2. 公开变量（带 NEXT_PUBLIC_ 前缀）
   process.env.NEXT_PUBLIC_SITE_URL
   ❌ 会嵌入到客户端 bundle
   ⚠️ 仅用于非敏感信息
```

---

## 3. Content Security Policy (CSP)

### 3.1 推荐配置

```tsx
// src/app/layout.tsx
export const metadata = {
  // Next.js 15 的 metadata API
};

// 或在 next.config.js 中配置 headers
async headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'Content-Security-Policy',
          value: [
            "default-src 'self'",
            "script-src 'self' 'unsafe-eval' 'unsafe-inline'",  // Next.js 需要
            "style-src 'self' 'unsafe-inline'",
            "font-src 'self' data:",
            "img-src 'self' data: https:",
            "connect-src 'self' https://generativelanguage.googleapis.com",
            "frame-ancestors 'none'",
            "form-action 'self'",
            "base-uri 'self'",
          ].join('; '),
        },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
      ],
    },
  ];
}
```

### 3.2 HTTP 安全头说明

| 头名称 | 值 | 说明 |
|-------|----|------|
| Content-Security-Policy | 见上 | 防止 XSS、数据注入 |
| X-Content-Type-Options | `nosniff` | 防止 MIME 类型嗅探 |
| X-Frame-Options | `DENY` | 防止点击劫持 |
| Strict-Transport-Security | `max-age=63072000; includeSubDomains` | 强制 HTTPS |
| Referrer-Policy | `strict-origin-when-cross-origin` | 控制 Referer 信息 |
| Permissions-Policy | `camera=(), microphone=()` | 禁用不必要的权限 |

---

## 4. localStorage 安全

### 4.1 数据清单

| Key | 内容 | 敏感度 | 存储上限 |
|-----|------|--------|---------|
| `hanzi-master-theme` | `'light' | 'dark' | 'system'` | 低 | ~10B |
| `hanzi-master-locale` | 语言代码 (`'zh-CN'` 等) | 低 | ~10B |
| `hanzi-master-progress:v1` | 学习进度 JSON | 低（匿名用户数据） | ~1KB |

### 4.2 安全注意事项

```
✅ 只存储非敏感信息（主题、语言、学习统计）
❌ 绝不存储：密码、个人身份信息、API Key

✅ 验证读取的数据（JSON parse 用 try/catch）
❌ 不要信任 localStorage 的数据完整性

✅ 数据版本化（如 :v1 后缀）
   方便迁移和向前兼容
```

### 4.3 安全的 localStorage 封装

```typescript
// src/lib/storage.ts
export function safeGet<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback; // SSR 安全
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function safeSet<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // 容量超限或隐私模式下静默失败
  }
}
```

---

## 5. XSS 防护

### 5.1 主要风险点

| 场景 | 风险 | 防护措施 |
|-----|------|---------|
| 用户输入到 AI | 用户提供的汉字或描述 | 在服务端使用 Gemini SDK 时进行长度限制 |
| 动态渲染翻译 | 翻译文本包含 HTML | 所有文本通过 React `{t('key')}` 渲染（自动转义） |
| dangerouslySetInnerHTML | HTML 注入 | ❌ 禁止使用 |

### 5.2 正确做法

```tsx
// ✅ 安全：React 自动转义
<h1>{t('home.heroTitle')}</h1>

// ❌ 危险：禁止使用
<div dangerouslySetInnerHTML={{ __html: userInput }} />
```

---

## 6. 性能优化策略

### 6.1 Core Web Vitals 目标

| 指标 | 良好 | 需要改进 | 较差 | 工具 |
|-----|------|---------|------|------|
| **LCP** | < 2.5s | 2.5s - 4s | > 4s | Lighthouse |
| **FID** | < 100ms | 100ms - 300ms | > 300ms | Web Vitals |
| **CLS** | < 0.1 | 0.1 - 0.25 | > 0.25 | Lighthouse |
| **TTFB** | < 600ms | - | - | Server Logs |

### 6.2 Next.js 15 性能特性

| 特性 | 说明 | 实现状态 |
|-----|------|---------|
| **React Server Components** | 默认 Server 组件，减少客户端 JS | ✅ 默认启用 |
| **App Router** | 文件系统路由，自动代码分割 | ✅ 使用中 |
| **Automatic Image Optimization** | 自动压缩、懒加载图片 | ✅ `next/image` |
| **Automatic Font Optimization** | 内联 CSS、预加载字体 | ✅ `next/font/local` |
| **Streaming** | 增量渲染，提升首屏 | ✅ Suspense 支持 |

### 6.3 Tailwind CSS 4.0 性能

```
Tailwind CSS 4.0 特性：
  ✓ Oxc 解析器（Rust 编写，100x 更快）
  ✓ 零运行时，仅输出使用的 CSS
  ✓ CSS-first 配置
  ✓ @theme 块，语义化设计令牌

生产 CSS 目标：< 20KB (gzipped)
```

### 6.4 字体优化

```tsx
// src/app/layout.tsx
import { Inter, Noto_Sans_SC, JetBrains_Mono } from 'next/font/google';

// 自动：
//   ✓ 自托管字体（不依赖 Google Fonts CDN）
//   ✓ 预加载关键字体
//   ✓ font-display: swap 避免 FOIT
//   ✓ 自动子集化（subset）
//   ✓ 内联 CSS 避免布局偏移

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-sans' });
const notoSansSC = Noto_Sans_SC({ subsets: ['latin'], weight: ['400', '500', '700'], display: 'swap', variable: '--font-hanzi' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], display: 'swap', variable: '--font-mono' });
```

---

## 7. 性能预算 (Performance Budget)

### 7.1 资源大小限制

| 资源 | 目标大小 (gzip) | 警告阈值 |
|-----|---------------|---------|
| 首页 HTML | < 30KB | 50KB |
| 全局 CSS | < 20KB | 40KB |
| 首页 JS | < 100KB | 200KB |
| 单路由 JS | < 50KB | 100KB |
| 字体文件 | < 100KB | 200KB |

### 7.2 构建后检查命令

```bash
npm run build

# 观察 Next.js 输出：
# ┌ ○ /                        2.3 kB         96 kB
# ├ ○ /learn                   1.8 kB         94 kB
# └ ○ /practice                1.5 kB         93 kB
#   First Load JS shared by    88 kB

# 目标：
#   - 路由大小 < 5KB
#   - First Load JS < 150KB (gzip < 50KB)
```

### 7.3 Lighthouse 分数目标

| 类别 | 目标分数 | 当前分数（示例） |
|-----|---------|----------------|
| Performance | ≥ 95 | 98 |
| Accessibility | ≥ 95 | 96 |
| Best Practices | ≥ 90 | 100 |
| SEO | ≥ 90 | 100 |

---

## 8. 性能优化技巧

### 8.1 组件级优化

```tsx
// ✅ Server Components（默认）: 无客户端 JS，零运行时
export default function Page() {
  return <FeatureCards />;  // 纯 HTML 输出
}

// ✅ 仅在需要交互时标记 'use client'
'use client';
export function ThemeToggle() {
  const { theme } = useTheme();
  return <button>...</button>;
}

// ✅ 使用动态导入减少首屏
const HeavyChart = dynamic(() => import('./components/heavy-chart'), {
  ssr: false,
  loading: () => <div className="skeleton">Loading...</div>,
});
```

### 8.2 避免常见性能陷阱

| 问题 | 影响 | 解决方法 |
|-----|------|---------|
| 全页 Client Component | 增大 JS bundle | 仅在交互节点标记 'use client' |
| 未使用的 CSS | 增大 CSS bundle | Tailwind JIT 自动处理（v4 默认启用） |
| 字体阻塞渲染 | LCP 延迟 | 使用 `next/font` 自动优化 |
| 布局偏移 (CLS) | 体验差 | 预定义容器尺寸、使用 `aspect-ratio` |
| 大图片未优化 | LCP 延迟 | 使用 `next/image` 自动压缩 |

### 8.3 响应式图片优化

```tsx
import Image from 'next/image';

// ✅ 自动优化：压缩、懒加载、响应式
<Image
  src="/images/hero.png"
  alt="Hero"
  width={1200}
  height={600}
  priority   // LCP 元素添加 priority
  className="rounded-2xl"
/>
```

---

## 9. 安全审计清单

```
✅ HTTPS 全站启用
✅ HTTP 严格传输安全 (HSTS)
✅ Content Security Policy 配置
✅ X-Frame-Options: DENY 防止点击劫持
✅ X-Content-Type-Options: nosniff
✅ Referrer-Policy 限制 Referer 泄露
✅ Permissions-Policy 禁用不必要权限
✅ API Key 仅在服务端使用
✅ .env 在 .gitignore 中
✅ 无 dangerouslySetInnerHTML 使用
✅ localStorage 仅存非敏感数据
✅ 输入长度限制（如 AI 功能用户输入）
✅ 无 eval() / new Function() 动态代码执行
```

---

## 10. 性能审计清单

```
✅ LCP < 2.5s (移动 3G)
✅ LCP < 1s (桌面宽带)
✅ CLS < 0.1
✅ FID < 100ms
✅ TTFB < 600ms
✅ 首页 HTML < 30KB (gzip)
✅ CSS < 20KB (gzip)
✅ 首页 JS < 100KB (gzip)
✅ 字体 < 100KB
✅ 使用 next/image 优化图片
✅ 使用 next/font 优化字体
✅ Server Components 优先
✅ 仅必要组件标记 'use client'
✅ Tailwind JIT 模式启用
✅ prefers-reduced-motion 动画降级
✅ 生产构建无警告
✅ 无未使用的导入 (tree-shaken)
```

---

## 11. Version History

| 版本 | 日期 | 说明 |
|-----|------|------|
| **v2.3.1** | 2026-06-10 | 统一版本号，完善安全策略（API Key 保护、CSP、XSS 防护）和性能优化（Core Web Vitals、Next.js 15 特性、字体图片优化） |
| v2.3.0 | 2026-06-07 | 添加性能预算指标和审计清单 |
| v2.2.1 | 2026-06-04 | 添加 CSP 配置示例 |
| v2.2.0 | 2026-06-02 | 初始安全与性能版本 |

---

## 12. 相关文档

- [项目概述](01-project-overview.md) - 项目基本信息和技术栈
- [技术架构](03-technical-architecture.md) - 系统架构设计和技术选型
- [API 规范](05-api-spec.md) - 详细的 API 文档和代码示例
- [部署指南](09-deployment.md) - 部署流程、环境配置和运维指南

---

**本文档版本: v2.3.1**  
**最后更新: 2026-06-10**
