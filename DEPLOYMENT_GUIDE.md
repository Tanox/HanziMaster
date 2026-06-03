# 部署指南

## 腾讯云 EdgeOne Pages 部署

### 1. 构建配置
- **构建命令**: `npm run build`
- **输出目录**: `.next`

### 2. 环境变量配置
在控制台添加环境变量：
- `GEMINI_API_KEY`: 您的 Gemini API Key

### 3. 框架预设
- 框架类型：Next.js
- Next.js 应用会自动处理路由重写，无需手动配置

### 4. Node.js 版本
确保使用 Node.js >= 20.11.0

---

## Vercel 部署

### 1. 配置文件
项目根目录已包含 `vercel.json` 配置文件，Vercel 会自动识别。

### 2. 环境变量配置
在 Vercel 控制台添加：
- `GEMINI_API_KEY`: 您的 Gemini API Key

### 3. 自动部署
连接 GitHub 仓库后，Vercel 会自动识别 Next.js 项目配置并部署。
