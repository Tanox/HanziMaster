# 11. 安装与部署流程 (Installation & Deployment)

**项目**: HanziMaster (汉字大师)
**版本**: v1.4.0
**状态**: 现行规范

## 1. 环境依赖 (Prerequisites)

在开始之前，请确保您的开发环境满足以下要求：

*   **Node.js**: `v18.17.0` 或更高版本 (推荐使用 LTS)。
*   **npm**: `v9.0.0` 或更高版本。
*   **Git**: 用于版本控制。
*   **Google Gemini API Key**: 用于 AI 功能 (可选，但推荐)。

## 2. 本地开发环境搭建 (Local Development)

### 2.1 获取代码
```bash
git clone https://github.com/sutchan/hanzimaster.git
cd hanzimaster
```

### 2.2 安装依赖
```bash
npm install
```
*注意*: 安装过程中会自动执行 `postinstall` 脚本，生成必要的汉字数据索引。

### 2.3 配置环境变量
复制示例配置文件并重命名为 `.env.local`：
```bash
cp .env.example .env.local
```
编辑 `.env.local` 文件，填入您的 API Key：
```env
# Google Gemini API Key (获取地址: https://aistudio.google.com/)
NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
```

### 2.4 启动开发服务器
```bash
npm run dev
```
打开浏览器访问 `http://localhost:3000`。

### 2.5 验证安装
1.  访问首页，搜索框应正常显示。
2.  输入“爱”，点击搜索。
3.  应能看到笔顺动画播放。
4.  (如果配置了 API Key) 下方应显示 AI 生成的释义。

## 3. 多环境部署方案 (Multi-Environment Deployment)

本项目支持标准的 **Development**, **Preview**, **Production** 三级环境部署策略，推荐使用 **Vercel** 进行托管。

### 3.1 环境变量管理
| 变量名 | 描述 | Dev | Preview | Prod |
| :--- | :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_GEMINI_API_KEY` | Gemini API 密钥 | 开发者个人 Key | 团队共享 Key | **生产环境专用 Key** |
| `NEXT_PUBLIC_ANALYTICS_ID` | 统计 ID (可选) | - | 测试 ID | 正式 ID |

### 3.2 Vercel 部署 (推荐)

#### 步骤 1: 连接仓库
在 Vercel Dashboard 中点击 "Add New Project"，导入 GitHub 仓库。

#### 步骤 2: 配置构建设置
*   **Framework Preset**: Next.js
*   **Build Command**: `npm run build` (默认)
*   **Output Directory**: `.next` (默认)

#### 步骤 3: 配置环境变量
在 "Environment Variables" 面板中，根据 3.1 节添加变量。
*注意*: 生产环境建议使用独立的 Google Cloud Project 生成的 API Key，并设置配额限制。

#### 步骤 4: 部署
点击 "Deploy"。Vercel 会自动识别分支并部署：
*   `main` 分支 -> Production 环境
*   其他分支 -> Preview 环境 (自动生成预览链接)

### 3.3 Docker 部署 (自托管)

如果需要私有化部署，可以使用 Docker。

#### Dockerfile 示例
```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

#### 构建与运行
```bash
# 构建镜像
docker build -t hanzimaster .

# 运行容器
docker run -p 3000:3000 -e NEXT_PUBLIC_GEMINI_API_KEY=your_key hanzimaster
```

## 4. 验证与监控 (Verification & Monitoring)

### 4.1 部署后验证清单
- [ ] **首页加载**: 确保无 404 或 500 错误。
- [ ] **静态资源**: 检查 `hanzi-writer-data` 是否能从 CDN 或本地 API 正确加载。
- [ ] **API 连通性**: 检查 `/api/generate` (AI 功能) 是否响应正常。
- [ ] **PWA 功能**: 在移动端添加到主屏幕，断网后检查是否能加载已缓存的汉字。

### 4.2 故障排查
*   **构建失败**: 检查 `npm run build` 日志，常见原因为 TypeScript 类型错误。
*   **AI 无响应**: 检查 Vercel 环境变量是否正确设置，或 API Key 是否超额。
*   **笔顺不显示**: 检查网络面板，确认 SVG 数据请求是否成功。

---
*文档维护: HanziMaster DevOps Team*
