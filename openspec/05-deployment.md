# 部署指南
============

## 1. 部署平台

项目支持以下部署平台：

| 平台 | 说明 |
|------|------|
| Vercel | 官方推荐，开箱即用 |
| 腾讯云 EdgeOne Pages | 国内访问速度快 |
| 其他静态托管 | 任何支持 SPA 的静态托管服务 |

## 2. Vercel 部署

### 2.1 配置文件

项目已配置 [vercel.json](../vercel.json)，包含：

- 构建命令：`npm run build:prod`
- 输出目录：`dist/hanzi-master`
- 静态资源缓存策略
- SPA 路由重写规则

### 2.2 环境变量

在 Vercel 控制台中配置以下环境变量：

| 变量名 | 说明 | 必填 |
|--------|------|------|
| `GEMINI_API_KEY` | Google Gemini AI API 密钥 | 否 |

### 2.3 部署步骤

1. **将代码推送到 GitHub/GitLab 仓库**

2. **在 Vercel 中导入项目**
   - 访问 https://vercel.com/new
   - 选择你的 Git 仓库
   - 点击 "Import"

3. **配置项目**
   - Project Name：填写项目名称
   - Framework Preset：选择 "Angular"
   - Root Directory：保持默认或根据需要调整
   - Build Command：`npm run build:prod`（已在 vercel.json 配置）
   - Output Directory：`dist/hanzi-master`（已在 vercel.json 配置）

4. **配置环境变量**
   - 在 "Environment Variables" 部分
   - 添加 `GEMINI_API_KEY`（如需要）

5. **点击 "Deploy"**

### 2.4 自定义域名

部署成功后，可以在 Vercel 控制台配置自定义域名。

## 3. 腾讯云 EdgeOne Pages 部署

### 3.1 构建配置

| 配置项 | 值 |
|--------|-----|
| 构建命令 | `npm run build` |
| 输出目录 | `dist/hanzi-master` |
| Node.js 版本 | >= 20.11.0 |

### 3.2 环境变量配置

在控制台添加环境变量：

| 变量名 | 说明 | 必填 |
|--------|------|------|
| `GEMINI_API_KEY` | Google Gemini AI API 密钥 | 否 |

### 3.3 重写规则配置（必须）

由于是 SPA 应用，需要配置重写规则：

1. 进入 Pages 应用管理
2. 找到 "路由规则" 或 "重定向/重写" 配置
3. 添加以下重写规则：
   - 源路径：`/*`
   - 目标路径：`/index.html`
   - 类型：重写

### 3.4 部署步骤

1. 将代码推送到 Git 仓库
2. 在腾讯云控制台创建 Pages 应用
3. 关联 Git 仓库
4. 配置构建设置
5. 配置环境变量
6. 配置重写规则
7. 点击部署

## 4. 其他静态托管部署

### 4.1 本地构建

```bash
# 生产环境构建
npm run build:prod

# 检查构建输出
ls -la dist/hanzi-master
```

### 4.2 部署构建产物

构建完成后，将 `dist/hanzi-master` 目录下的所有文件部署到你的静态托管服务。

### 4.3 SPA 路由配置

无论使用哪种托管服务，都需要配置 SPA 路由重写规则，确保所有路由都指向 `index.html`。

**Nginx 配置示例：**

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

**Netlify 配置（netlify.toml）：**

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## 5. 部署前检查清单

- [ ] 代码已提交到 Git 仓库
- [ ] 所有测试通过（`npm test`）
- [ ] 本地构建成功（`npm run build:prod`）
- [ ] 环境变量已配置（如需要）
- [ ] 构建产物大小在合理范围内
- [ ] 检查是否有安全漏洞（`npm audit`）

## 6. 性能优化建议

### 6.1 启用 Gzip 压缩

确保托管服务启用了 Gzip 或 Brotli 压缩。

### 6.2 配置缓存策略

静态资源配置长期缓存：

```
Cache-Control: public, max-age=31536000, immutable
```

HTML 文件配置短期缓存或不缓存：

```
Cache-Control: no-cache
```

### 6.3 使用 CDN

将静态资源托管到 CDN，加速全球访问。

## 7. 相关文档

- [项目概述](01-overview.md) - 项目基本信息和技术栈
- [开发指南](03-development.md) - 开发环境配置和编码规范
