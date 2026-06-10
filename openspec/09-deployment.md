# 部署指南

---

## Meta 信息

| 字段 | 值 |
|-----|-----|
| **版本** | v2.3.1 |
| **更新日期** | 2026-06-10 |
| **维护者** | HanziMaster 开发团队 |
| **文档编号** | OS-09 |

---

## 1. 部署平台总览

| 平台 | 推荐程度 | 说明 |
|-----|---------|------|
| **Vercel** | ⭐⭐⭐⭐⭐ | Next.js 官方推荐，开箱即用，自动部署 |
| **腾讯云 EdgeOne Pages** | ⭐⭐⭐⭐ | 国内访问速度快，适合国内用户 |
| **Netlify** | ⭐⭐⭐ | 静态托管，支持 Next.js |
| **自托管** | ⭐⭐ | Docker/PM2 部署，需要运维能力 |

---

## 2. 前置准备

### 2.1 环境要求

| 项目 | 版本要求 |
|-----|---------|
| Node.js | >= 20.11.0（推荐 v20 LTS） |
| npm | 随 Node.js 安装（>= 10） |
| Git | 最新版本 |
| 浏览器 | Chrome/Firefox/Safari/Edge 最新版 |

### 2.2 环境变量

| 变量名 | 必填 | 说明 |
|-------|------|------|
| `GEMINI_API_KEY` | 否 | Google Gemini AI API 密钥，启用 AI 手写分析功能需要 |
| `NEXT_PUBLIC_SITE_URL` | 否 | 生产环境站点 URL，用于 meta 标签和 SEO |

### 2.3 项目依赖

```json
// package.json 核心依赖
{
  "dependencies": {
    "next": "^15.2.0",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "@google/generative-ai": "^0.24.0"
  },
  "devDependencies": {
    "typescript": "^5.7.3",
    "tailwindcss": "^4.0.12"
  },
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

---

## 3. Vercel 部署（推荐）

### 3.1 自动部署步骤

```
1. 推送到 GitHub/GitLab/Bitbucket
   git push origin main

2. 访问 https://vercel.com/new

3. 选择 Git 仓库
   - Framework: 自动识别为 Next.js
   - Root Directory: ./

4. 配置环境变量（可选）
   - Key: GEMINI_API_KEY
   - Value: your-api-key-here

5. 点击 "Deploy"

6. 完成！Vercel 会自动：
   - npm install
   - npm run build
   - 部署到 <project-name>.vercel.app
   - 提供生产域名绑定
```

### 3.2 vercel.json 配置（可选）

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "installCommand": "npm install",
  "outputDirectory": ".next",
  "env": {
    "NODE_VERSION": "20"
  }
}
```

### 3.3 自定义域名

```
Vercel 控制台 → Settings → Domains → Add Domain
CNAME 记录: cname.vercel-dns.com
等待 SSL 证书自动签发（通常几分钟内）
```

### 3.4 预览部署

```
每一个 Pull Request 都会自动生成预览部署：
  - URL: <project-name>-<branch>-<hash>.vercel.app
  - 可用于 QA 测试
  - 预览部署的环境变量可独立配置
```

---

## 4. 腾讯云 EdgeOne Pages 部署

### 4.1 构建配置

| 配置项 | 值 |
|-------|----|
| 构建命令 | `npm run build` |
| 输出目录 | `.next/` |
| Node.js 版本 | `>= 20.11.0` |

### 4.2 步骤

```
1. 访问 https://console.cloud.tencent.com/edgeone/pages

2. 新建 Pages 项目
   - 关联 Git 仓库
   - 框架选择: Next.js

3. 配置构建参数
   - 构建命令: npm run build
   - 输出目录: .next

4. 配置环境变量（如有）
   - GEMINI_API_KEY

5. 点击部署
```

### 4.3 国内访问加速

```
- 使用 EdgeOne 边缘节点（全球 300+ 节点，国内 30+ 节点）
- 启用 Brotli 压缩
- 启用 HTTP/2
- 静态资源缓存 30 天，HTML 页面缓存 1 分钟
```

---

## 5. 本地构建与自托管

### 5.1 本地构建

```bash
# 1. 安装依赖（如果尚未安装）
npm install

# 2. 生产环境构建
npm run build

# 3. 启动生产服务器（本地测试）
npm run start
# 服务器运行在 http://localhost:3000

# 4. 检查构建产物
ls -la .next/
```

### 5.2 使用 Docker 部署

```dockerfile
# Dockerfile
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm install

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
RUN npm install --production
EXPOSE 3000
CMD ["npm", "run", "start"]
```

```bash
# 构建与运行
docker build -t hanzimaster .
docker run -p 3000:3000 -e GEMINI_API_KEY=your-key hanzimaster
```

### 5.3 使用 PM2 部署

```bash
# 安装 PM2
npm install -g pm2

# ecosystem.config.js
module.exports = {
  apps: [{
    name: 'hanzimaster',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/hanzimaster',
    env: { NODE_ENV: 'production', PORT: 3000 },
    instances: 'max',
    exec_mode: 'cluster',
  }]
};

# 启动
pm2 start ecosystem.config.js

# 保存进程列表并设置开机自启
pm2 save
pm2 startup
```

---

## 6. 构建产物与缓存策略

### 6.1 Next.js 输出结构

```
.next/
├── server/          # 服务端资源（SSR/API）
├── static/          # 静态资源（CSS/JS/图片）
│   └── chunks/      # 代码分割产物
├── cache/           # 构建缓存
└── BUILD_ID         # 构建标识
```

### 6.2 推荐缓存策略

| 资源类型 | Cache-Control | 说明 |
|---------|--------------|------|
| HTML 页面 | `public, max-age=0, must-revalidate` | 每次重新验证 |
| 静态资源 (JS/CSS) | `public, max-age=31536000, immutable` | 哈希命名，长期缓存 |
| 图片/字体 | `public, max-age=2592000` | 30 天缓存 |

### 6.3 Nginx 配置示例

```nginx
server {
    listen 443 ssl http2;
    server_name hanzimaster.example.com;

    ssl_certificate /etc/letsencrypt/live/hanzimaster.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/hanzimaster.example.com/privkey.pem;

    # 压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript application/xml;
    gzip_min_length 1024;

    # 静态资源缓存
    location /_next/static/ {
        alias /var/www/hanzimaster/.next/static/;
        expires 1y;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # 图片缓存
    location /images/ {
        expires 30d;
        add_header Cache-Control "public, max-age=2592000";
    }

    # 反向代理到 Next.js
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## 7. 性能与监控

### 7.1 性能指标目标

| 指标 | 目标值 | 工具 |
|-----|--------|------|
| **LCP** | < 2.5s | Lighthouse, Web Vitals |
| **FID** | < 100ms | Lighthouse, Web Vitals |
| **CLS** | < 0.1 | Lighthouse, Web Vitals |
| **TTFB** | < 600ms | Server Logs |
| **Bundle Size** | < 200KB (gzip) | `next build` 输出 |

### 7.2 构建大小检查

```bash
npm run build

# Next.js 15 输出示例：
# Route (app)                       Size     First Load JS
# ┌ ○ /                              2.3 kB         96 kB
# ├ ○ /learn                         1.8 kB         94 kB
# └ ○ /practice                      1.5 kB         93 kB
# + First Load JS shared by all      88 kB
#   └ static/css/app.css             12 kB
```

### 7.3 监控建议

```
- Vercel Analytics（推荐，内置 Web Vitals）
- 腾讯云 EdgeOne 分析
- Sentry 错误监控
- Lighthouse CI 自动审计
```

---

## 8. SEO 配置

### 8.1 metadata.ts

```typescript
// src/app/layout.tsx
export const metadata = {
  title: {
    default: 'HanziMaster - AI 驱动的汉字学习平台',
    template: '%s | HanziMaster',
  },
  description: '现代化的汉字学习平台，采用 Apple 设计风格，使用 Google Gemini AI 提供个性化反馈。',
  keywords: ['汉字学习', '中文学习', 'Chinese characters', 'Hanzi', 'AI学习'],
  openGraph: {
    title: 'HanziMaster',
    description: 'AI 驱动的汉字学习平台',
    type: 'website',
    url: 'https://hanzimaster.example.com',
  },
};
```

### 8.2 robots.txt

```
User-agent: *
Allow: /
Sitemap: https://hanzimaster.example.com/sitemap.xml
```

---

## 9. 部署前检查清单

```
✅ 代码已提交到 Git 仓库并推送
✅ package.json version 已更新到最新版本
✅ CHANGELOG.md 已更新
✅ npm run build 可成功构建
✅ npm run lint 无严重错误
✅ 环境变量已在平台控制台配置
✅ 所有页面可正常访问（首页/learn/practice）
✅ 主题切换功能正常（浅色/深色/跟随系统）
✅ 语言切换功能正常（11 种语言）
✅ 响应式布局正常（移动/平板/桌面）
✅ 无障碍功能：键盘可操作，焦点环可见
✅ 字体加载正确（Inter / Noto Sans SC / JetBrains Mono）
✅ 生产构建文件大小合理（< 500KB）
✅ Lighthouse Performance 分数 ≥ 90
✅ Lighthouse Accessibility 分数 ≥ 90
```

---

## 10. 常见问题

| 问题 | 原因 | 解决方法 |
|-----|------|---------|
| 构建失败：Node 版本不匹配 | 平台使用了较旧的 Node 版本 | 在 vercel.json/engines 中指定 `"node": ">=20"` |
| 样式在生产中失效 | Tailwind content 配置遗漏文件 | 检查 tailwind.config.ts 确保覆盖所有文件 |
| 404 错误 | 路由文件缺失 | 检查 `src/app/[route]/page.tsx` 是否存在 |
| 中文方块字（缺失字体） | Noto Sans SC 未正确加载 | 检查 `next/font/local` 配置和字体文件 |
| API Key 客户端可见 | 未使用 Server Components | 确保 `GEMINI_API_KEY` 仅在 Server 端使用 |

---

## 11. Version History

| 版本 | 日期 | 说明 |
|-----|------|------|
| **v2.3.1** | 2026-06-10 | 统一版本号，完善 Vercel/腾讯云部署指南，Docker/PM2 自托管配置 |
| v2.3.0 | 2026-06-07 | 添加 Nginx 配置示例和缓存策略 |
| v2.2.1 | 2026-06-04 | 添加性能监控指标 |
| v2.2.0 | 2026-06-02 | 初始部署指南版本 |

---

## 12. 相关文档

- [项目概述](01-project-overview.md) - 项目基本信息和技术栈
- [技术架构](03-technical-architecture.md) - 系统架构设计和技术选型
- [API 规范](05-api-spec.md) - 详细的 API 文档和代码示例
- [安全与性能](10-security-performance.md) - 安全策略和性能优化指南

---

**本文档版本: v2.3.1**  
**最后更新: 2026-06-10**
