# 开发规范

## 代码规范

### 命名规范

| 类型 | 规范 | 示例 |
|-----|------|-----|
| 组件名 | PascalCase | `LocaleProvider`, `ThemeToggle` |
| 文件名 | kebab-case | `locale-provider.tsx` |
| 常量 | UPPER_CASE | `STORAGE_KEY` |
| 变量/函数 | camelCase | `isDarkMode`, `getBrowserLocale` |
| 类名 | PascalCase | `HomePage` |
| 接口名 | PascalCase（前缀 I 可选） | `User`, `IUser` |
| 目录名 | kebab-case | `learn`, `translations` |

### 文件头注释

所有源文件必须包含文件头注释，标注版本信息：

```typescript
// src/lib/i18n/index.ts v2.2.0
```

### 组件开发规范

1. **客户端组件标记**：
   - 所有需要使用 React hooks 的组件必须以 `'use client'` 开头
   - 服务端组件不需要此标记

2. **文件命名**：
   - 页面组件：`page.tsx`
   - 布局组件：`layout.tsx`
   - 普通组件：`kebab-case.tsx`

3. **样式规范**：
   - 使用 Tailwind CSS 类进行样式开发
   - 支持深色/浅色模式适配（使用 `dark:` 前缀）
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

项目当前无必填环境变量。

## 开发流程

1. 安装依赖：`npm install`
2. 启动开发服务器：`npm run dev`
3. 构建：`npm run build`
4. 生产环境构建：`npm run build`
5. 代码检查：`npm run lint`

## Next.js 特有规范

### 路由规范

- 使用 Next.js App Router 进行路由管理
- 页面组件放在 `src/app/` 目录下
- 动态路由使用 `[param]/page.tsx` 格式
- 嵌套布局使用 `layout.tsx`

### 组件类型

| 类型 | 说明 | 使用场景 |
|-----|------|-----|
| Server Components | 默认类型，无 `'use client'` 标记 | 数据获取、静态内容渲染 |
| Client Components | 有 `'use client'` 标记 | 需要交互、hooks、状态管理 |

### 路径别名

项目配置了以下路径别名（在 tsconfig.json 中）：

| 别名 | 实际路径 |
|-----|---------|
| `@/` | `src/` |

### 国际化规范

见 [coding-standards.md](coding-standards.md) 中的国际化章节
