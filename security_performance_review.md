# HanziMaster 项目审查报告

**项目**: HanziMaster - 汉字学习应用
**审查日期**: 2026-06-18
**技术栈**: Next.js 15, React 19, TypeScript, Tailwind CSS v4, shadcn/ui

---

## 执行摘要

本报告对 HanziMaster 项目进行了全面的安全审查和 React/Next.js 性能优化审查。整体代码质量良好，项目已遵循许多最佳实践。发现 **3 个中等安全问题** 和 **4 个性能优化建议**。

---

## 安全审查报告

### S-1: 缺少 Content Security Policy (CSP) 头 (中等)

**严重程度**: 中等
**影响**: 降低 XSS 攻击防护能力

**现状分析**:
- 项目在 `next.config.js` 中未配置 Content Security Policy
- 使用了 Google Fonts 外部资源加载，存在潜在风险

**建议修复**:
```javascript
// next.config.js
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://generativelanguage.googleapis.com",
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
];

const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'fonts.googleapis.com' },
      { protocol: 'https', hostname: 'fonts.gstatic.com' },
    ],
  },
};

module.exports = nextConfig;
```

---

### S-2: 外部 API 密钥暴露风险 (中等)

**严重程度**: 中等
**影响**: 敏感凭证可能泄露

**现状分析**:
- `.env.example` 包含 `GEMINI_API_KEY`
- 未检查该密钥是否正确存储在 `.env.local` 中
- 需要确保 API 密钥不会被打包到客户端代码

**建议修复**:
1. 确保 `.env.local` 已添加到 `.gitignore`
2. 考虑使用 Next.js 环境变量命名规范：
   - `NEXT_PUBLIC_` 前缀的变量会暴露给客户端
   - 服务器端变量不应使用此前缀
3. 添加 `.env.local.example` 区分本地开发配置

**当前 `.gitignore` 验证**:
检查确认 `.gitignore` 应包含：
```
.env.local
.env.*.local
```

---

### S-3: localStorage 安全使用 (低)

**严重程度**: 低
**影响**: 用户偏好数据可能在共享设备上被访问

**现状分析**:
- `theme-provider.tsx` 和 `locale-provider.tsx` 使用 localStorage 存储用户偏好
- 存储 key 格式正确（项目特定前缀）
- 有 try-catch 错误处理

**建议改进**:
考虑添加存储数据版本控制，以应对未来数据结构变更：

```typescript
// lib/storage.ts
const STORAGE_VERSION = 1;

export function safeGetItem<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) return defaultValue;
    const parsed = JSON.parse(item);
    if (parsed._v !== STORAGE_VERSION) return defaultValue;
    return parsed._d;
  } catch {
    return defaultValue;
  }
}

export function safeSetItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify({ _v: STORAGE_VERSION, _d: value }));
  } catch (e) {
    console.warn('Failed to save to localStorage:', e);
  }
}
```

---

## React/Next.js 性能优化报告

### P-1: 客户端组件过多 - layout.tsx 使用 'use client' (中等)

**严重程度**: 中等
**影响**: 降低服务器端渲染效率，增加 JavaScript bundle 大小

**现状分析**:
- `src/app/layout.tsx` 使用了 `'use client'`
- 整个布局都变成客户端组件，包含主题、语言提供者等

**建议改进**:
将布局拆分为客户端和服务器组件：

```typescript
// src/components/layout-client.tsx
'use client';
// 只包含需要客户端交互的部分

// src/app/layout.tsx
import { LayoutClient } from '@/components/layout-client';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
```

---

### P-2: 未使用 React.cache() 缓存翻译函数 (低)

**严重程度**: 低
**影响**: 轻微的重复计算

**现状分析**:
`locale-provider.tsx` 中的 `t()` 函数每次调用都会遍历翻译对象。

**建议改进**:
```typescript
// 使用 React.cache 缓存翻译函数
import { cache } from 'react';

export const useTranslation = () => {
  const { locale } = useLocale();
  const t = cache((key: string): string => {
    return getNestedValue(translations[locale], key);
  });
  return { t };
};
```

---

### P-3: Google Fonts 加载优化 (低)

**严重程度**: 低
**影响**: 字体加载可能阻塞渲染

**现状分析**:
`layout.tsx` 使用了 `next/font/google` 的 `Geist` 字体，但同时又手动加载了 Google Fonts CSS。

**建议改进**:
移除手动加载，使用 Next.js 的字体优化：

```typescript
// 方案 1: 仅使用 next/font (推荐)
// 已在使用 Geist，通过 CSS 变量 --font-sans 应用

// 方案 2: 使用 next/font/google 加载所有字体
import { Inter, JetBrains_Mono, Noto_Sans_SC } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });
const notoSansSC = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '800'],
  variable: '--font-hanzi',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable} ${notoSansSC.variable}`}>
      {/* 移除手动加载的 Google Fonts 链接 */}
      <body className="antialiased font-sans">
        {/* ... */}
      </body>
    </html>
  );
}
```

---

### P-4: 组件内联定义 - practice/page.tsx 中的 getIcon (低)

**严重程度**: 低
**影响**: 轻微的内存效率问题

**现状分析**:
`getIcon` 函数在组件内部定义，每次渲染都会重新创建。

**建议改进**:
将 `getIcon` 移到组件外部：

```typescript
// 移到组件外部
const getIcon = (iconName: string, className: string): React.ReactNode => {
  const icons: Record<string, React.ReactNode> = {
    pencil: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    // ...
  };
  return icons[iconName] || null;
};

export default function PracticePage() {
  // ...
}
```

---

## 正面发现 (已遵循最佳实践)

### 安全方面
1. **跳过链接 (Skip to content)**: `layout.tsx` 正确实现了可访问性跳转链接
2. **ARIA 属性**: SVG 图标正确使用 `aria-hidden="true"`，按钮有正确的 `aria-label`
3. **主题切换无闪烁**: 使用 `suppressHydrationWarning` 和服务器端类名避免闪烁
4. **移动导航焦点管理**: `mobile-nav.tsx` 正确管理焦点状态
5. **键盘导航支持**: `learn/page.tsx` 支持键盘操作

### 性能方面
1. **reactStrictMode**: 已启用
2. **prefers-reduced-motion**: 正确实现动画减少
3. **color-scheme**: 已添加 `light dark` 支持
4. **本地化翻译缓存**: 使用 `useCallback` 优化
5. **next/image 配置**: 已配置外部图片域名
6. **bundle 优化**: 使用了动态导入和 tree-shaking 友好的导入方式

---

## 总结

| 类别 | 严重 | 中等 | 低 |
|------|------|------|-----|
| 安全问题 | 0 | 2 | 1 |
| 性能问题 | 0 | 1 | 3 |

**整体评估**: 代码质量良好，建议优先修复 **S-1 (CSP)** 和 **P-1 (客户端组件拆分)**，其他问题可根据项目时间表安排修复。
