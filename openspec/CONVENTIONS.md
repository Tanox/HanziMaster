# 开发规范

## 代码规范

### 命名规范

| 类型 | 规范 | 示例 |
|-----|------|-----|
| 组件名 | PascalCase | `AppComponent`, `ThemeToggle` |
| 文件名 | kebab-case | `theme-toggle.ts` |
| 常量 | camelCase | `isDarkMode` |
| 类名 | PascalCase | `HomeComponent` |
| 接口名 | PascalCase（前缀 I 可选） | `User`, `IUser` |

### 文件头注释

所有源文件必须包含文件头注释，标注版本信息：

```typescript
// app/app.ts v2.1.3
```

### 组件开发规范

1. 使用独立组件（Standalone Components）：
   - 所有新组件必须使用 `@Component({ standalone: true })`
   - 在 `imports` 数组中声明依赖

2. 变更检测策略：
   - 使用 `ChangeDetectionStrategy.OnPush`
   - 减少不必要的变更检测

3. 样式规范：
   - 使用 Tailwind CSS 类进行样式开发
   - 支持深色/浅色模式适配
   - 响应式设计

## 提交规范

### Git 提交信息应遵循以下格式：

```
<类型>(<范围>): <描述>

[可选的详细描述]
```

类型：
- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档变更
- `style`: 代码格式调整
- `refactor`: 重构
- `test`: 测试相关
- `chore`: 构建/工具链相关

## 环境变量

项目使用以下环境变量：

| 变量名 | 说明 | 必填 |
|-------|------|------|
| GEMINI_API_KEY | Google Gemini AI API 密钥 | 是 |

## 开发流程

1. 安装依赖：`npm install`
2. 启动开发服务器：`npm start`
3. 构建：`npm run build`
4. 生产环境构建：`npm run build:prod`
5. 代码检查：`npm run lint`
