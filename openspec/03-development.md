# 开发指南
============

## 1. 开发环境准备

### 1.1 系统要求

| 工具 | 版本要求 | 说明 |
|------|---------|------|
| Node.js | >= 20.11.0 | 运行时环境 |
| npm | 随 Node.js 安装 | 包管理工具 |
| 现代浏览器 | Chrome、Firefox、Safari、Edge 最新版 | 开发和测试 |

### 1.2 安装步骤

```bash
# 1. 克隆项目
git clone <repository-url>
cd <project-directory>

# 2. 安装依赖
npm install

# 3. 配置环境变量（可选）
cp .env.example .env
# 编辑 .env 文件，填写 GEMINI_API_KEY

# 4. 启动开发服务器
npm start
```

### 1.3 开发服务器

开发服务器将在 `http://localhost:3000` 启动，支持热模块替换（HMR）。

## 2. 项目命令

| 命令 | 说明 |
|------|------|
| `npm start` | 启动开发服务器 |
| `npm run build` | 构建开发版本 |
| `npm run build:prod` | 构建生产版本 |
| `npm run watch` | 开发模式构建并监听文件变化 |
| `npm test` | 运行测试 |
| `npm run lint` | 运行代码检查 |

## 3. 编码规范

### 3.1 文件头注释

所有代码文件的第一行必须使用以下格式的单行注释：

```
// <文件相对路径> v<版本号>
```

示例：

```typescript
// app/app.ts v2.2.0
```

### 3.2 版本管理 (SemVer 2.0.0)

修改代码时必须同时更新以下文件的版本号：

| 序号 | 更新位置 | 说明 |
|------|----------|------|
| 1 | 当前文件头注释 | 更新版本号 |
| 2 | HTML `<title>` 标签 | 添加版本号后缀 |
| 3 | `metadata.json` | 更新 `name` 和 `version` 字段 |
| 4 | `package.json` | 更新 `version` 字段 |
| 5 | `CHANGELOG.md` | 新增条目（递增补丁版本，不记录日期） |

### 3.3 TypeScript 样式规范

| 规范项 | 要求 |
|--------|------|
| 严格模式 | 启用 `strict: true` |
| 变更检测 | 使用 `ChangeDetectionStrategy.OnPush` |
| 组件格式 | 所有组件必须使用 standalone 格式 |
| 状态管理 | 使用 Angular 21 的信号机制 (Signals) |

### 3.4 命名规范

| 类型 | 规范 | 示例 |
|------|------|------|
| 组件类名 | PascalCase | `Home`, `ThemeToggle` |
| 组件选择器 | kebab-case，带 `app-` 前缀 | `app-home`, `app-theme-toggle` |
| 文件名 | kebab-case | `theme-toggle.ts`, `home.ts` |
| 常量 | camelCase | `isDark`, `currentLocale` |
| 接口名 | PascalCase（前缀 I 可选） | `Character`, `ICharacter` |
| 函数名 | camelCase | `getLocale()`, `toggleTheme()` |

### 3.5 Angular 组件规范

#### 3.5.1 组件装饰器模板

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-[component-name]',
  imports: [/* 需要的模块 */],
  template: `...`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyComponent {
  // 组件逻辑
}
```

#### 3.5.2 组件开发原则

1. **使用 Standalone Components**：所有新组件必须使用 `standalone: true`
2. **OnPush 变更检测**：减少不必要的变更检测
3. **Signals 状态管理**：使用 Angular Signals 进行响应式状态管理
4. **单一职责**：每个组件只负责一个功能

### 3.6 CSS/Tailwind 规范

| 规范项 | 要求 |
|--------|------|
| 框架版本 | Tailwind CSS 4.0 |
| 深色模式 | 使用 `dark:` 前缀 |
| 汉字字体 | 使用 `.hanzi-font` 类 |
| 页面容器 | 添加语义化的 `id` |
| CSS 注释 | 使用 `/* */` 格式 |
| TS/JS 注释 | 使用 `//` 格式 |

### 3.7 路由规范

| 规范项 | 要求 |
|--------|------|
| 加载方式 | 使用懒加载 `loadComponent` |
| 路径别名 | `@app/*` → `app/*` |

### 3.8 注释规范

- 所有函数必须包含简洁的注释
- 复杂逻辑添加说明注释
- 注释尽量单行简洁
- 避免无意义的注释

## 4. 国际化 (i18n) 规范

### 4.1 翻译原则

| 规范项 | 要求 |
|--------|------|
| 用户可见文本 | 必须通过 `I18nService` 进行翻译 |
| 翻译文件位置 | `app/i18n/locales/` 目录 |
| 服务注入 | 使用 `inject(I18nService)` |
| 翻译访问 | 通过 `i18n.t()` 访问翻译数据 |
| 语言选择器 | 使用 `LocaleToggle` 组件 |
| 偏好存储 | 用户语言偏好自动保存到 localStorage |

### 4.2 支持的语言

| 语言代码 | 语言名称 |
|----------|----------|
| `en` | 英语 |
| `zh-CN` | 简体中文 |
| `zh-TW` | 繁体中文 |
| `es` | 西班牙语 |
| `ar` | 阿拉伯语 |
| `fr` | 法语 |
| `pt-BR` | 葡萄牙语（巴西） |
| `de` | 德语 |
| `ja` | 日语 |
| `ko` | 韩语 |
| `ru` | 俄语 |

### 4.3 翻译文件结构

翻译文件应按照功能模块组织：

```typescript
// app/i18n/locales/en.ts
export const en = {
  app: { /* 应用级翻译 */ },
  home: { /* 首页翻译 */ },
  learn: { /* 学习页翻译 */ },
  theme: { /* 主题相关翻译 */ }
};
```

### 4.4 使用示例

```typescript
// 在组件中
import { I18nService } from '@app/i18n/i18n.service';

@Component({
  // ...
})
export class MyComponent {
  i18n = inject(I18nService);
  
  // 在模板中使用
  // {{ i18n.t().home.hero.title }}
}
```

## 5. Git 提交规范

### 5.1 提交消息格式

基于 Angular 提交规范，格式如下：

```
<类型>: <描述>

[可选正文]

[可选页脚]
```

### 5.2 类型 (Type)

| 类型 | 说明 |
|------|------|
| `feat` | 新功能 |
| `fix` | 缺陷修复 |
| `docs` | 文档变更 |
| `style` | 代码格式变更（不影响功能） |
| `refactor` | 代码重构 |
| `perf` | 性能优化 |
| `test` | 测试添加/修改 |
| `build` | 构建系统变更 |
| `ci` | CI/CD 配置变更 |
| `chore` | 其他杂项变更 |

### 5.3 格式规范

| 规范项 | 要求 |
|--------|------|
| 标题长度 | 限制在 50 字符以内 |
| 首字母 | 小写 |
| 语气 | 祈使语气 |
| 结尾 | 不使用句号 |

### 5.4 示例

```bash
feat: 在学习页面实现字符选择功能
fix: 解决主题切换组件初始化问题
docs: 更新项目概述文档
refactor: 优化主题持久化逻辑
```

## 6. 目录结构规范

### 6.1 新增组件

```
app/components/
└── my-component/
    └── my-component.ts
```

### 6.2 新增页面

```
app/pages/
└── my-page/
    └── my-page.ts
```

### 6.3 新增服务

```
app/
└── my-service.service.ts
```

## 7. 最佳实践

### 7.1 性能优化

1. 使用 `ChangeDetectionStrategy.OnPush`
2. 路由懒加载
3. 避免在模板中使用复杂计算
4. 使用 `trackBy` 优化 `*ngFor`

### 7.2 可维护性

1. 组件单一职责
2. 类型安全，避免 `any`
3. 合理的代码注释
4. 遵循 DRY 原则

### 7.3 可访问性

1. 支持深色/浅色模式
2. 语义化 HTML
3. 响应式设计
4. 键盘导航支持

## 8. 相关文档

- [项目概述](01-overview.md) - 项目基本信息和技术栈
- [技术架构](02-architecture.md) - 系统架构设计和技术选型
- [API 参考](04-api-reference.md) - 详细的 API 文档和代码示例
- [测试规范](06-testing.md) - 测试策略和最佳实践
