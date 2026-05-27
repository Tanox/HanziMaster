# 部署指南

## 腾讯云 EdgeOne Pages 部署

### 1. 构建配置
- **构建命令**: `npm run build`
- **输出目录**: `dist/hanzi-master`

### 2. 环境变量配置
在控制台添加环境变量：
- `GEMINI_API_KEY`: 您的 Gemini API Key

### 3. 重写规则配置（必须）
添加以下重写规则：
- 源路径: `/*`
- 目标路径: `/index.html`
- 类型: 重写

### 4. Node.js 版本
确保使用 Node.js >= 20.11.0

---

## Vercel 部署

### 1. 配置文件
已创建 [vercel.json](file:///workspace/vercel.json) 配置文件

### 2. 环境变量配置
在 Vercel 控制台添加：
- `GEMINI_API_KEY`: 您的 Gemini API Key

### 3. 自动部署
Vercel 会自动识别配置并部署
