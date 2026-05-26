# 部署指南

## 部署平台

项目支持以下部署平台：

1. Vercel
2. 腾讯云 EdgeOne Pages

## Vercel 部署

### 1. 配置文件

项目已配置 [vercel.json](file:///workspace/vercel.json)，包含：

- 构建命令：`npm run build:prod`
- 输出目录：`dist/hanzi-master`
- 静态资源缓存策略
- SPA 路由重写规则

### 2. 环境变量

在 Vercel 控制台中配置以下环境变量：

| 变量名 | 值 |
|-------|-----|
| GEMINI_API_KEY | 您的 Google Gemini AI API 密钥 |

### 3. 部署步骤

1. 将代码推送到 GitHub/GitLab 仓库
2. 在 Vercel 中导入项目
3. 配置环境变量
4. 点击部署

## 腾讯云 EdgeOne Pages 部署

### 1. 构建配置

- 构建命令：`npm run build`
- 输出目录：`dist/hanzi-master`

### 2. 环境变量配置

在控制台添加环境变量：
- `GEMINI_API_KEY`：您的 Gemini API 密钥

### 3. 重写规则配置（必须）

添加以下重写规则：
- 源路径：`/*`
- 目标路径：`/index.html`
- 类型：重写

### 4. Node.js 版本

确保使用 Node.js >= 20.11.0

## 本地构建测试

在部署前，建议先在本地进行构建测试：

```bash
# 生产环境构建
npm run build:prod

# 检查构建输出
ls -la dist/hanzi-master
```
