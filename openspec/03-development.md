# 开发指南
============

## 1. 开发环境准备

### 1.1 系统要求

| 工具 | 版本要求 | 说明 |
|------|---------|------|
| Node.js | >= 24.11.0 | 运行时环境 |
| pnpm | >= 11（由 `packageManager` 锁定 `pnpm@11.24.0`） | 唯一包管理器 |
| 现代浏览器 | Chrome、Firefox、Safari、Edge 最新版 | 开发和测试 |

### 1.2 安装步骤

```bash
# 1. 克隆项目
git clone <repository-url>
cd <project-directory>

# 2. 安装依赖（仅允许 pnpm）
pnpm install

# 3. 启动开发服务器
pnpm dev
```

> **强制使用 pnpm**：`package.json` 的 `preinstall` 钩子为 `npx only-allow pnpm`，执行 `npm install` / `yarn` 会被拦截并报错。根目录 `.npmrc` 设 `engine-strict=true` 与 `package-manager-strict=true`，版本不符时 pnpm 直接报错。pnpm 全局依赖仓库通过 `pnpm config set store-dir ~/.pnpm-store` 共享，避免重复下载。

### 1.3 开发服务器

开发服务器将在 `http://localhost:3000` 启动，支持热模块替换（HMR）。

## 2. 项目命令

| 命令 | 说明 |
|------|------|
| `pnpm dev` | 启动开发服务器 |
| `pnpm build` | 构建生产版本 |
| `pnpm start` | 启动生产服务器 |
| `pnpm lint` | 运行 ESLint 检查 |
| `pnpm test` | 运行单元测试（Vitest） |
| `pnpm test:watch` | 监听模式运行测试 |
| `pnpm format` | Prettier 格式化 `src/**/*.{ts,tsx,css}` |

## 3. 编码规范

### 3.1 文件头注释

所有代码文件的第一行必须使用以下格式的单行注释：

```
// <文件相对路径> v<版本号>
```

示例：

```typescript
// src/lib/i18n/index.ts v5.2.24
```

### 3.2 版本管理 (SemVer 2.0.0)

修改代码时必须同时更新以下文件的版本号：

| 序号 | 更新位置 | 说明 |
|------|----------|------|
| 1 | 当前改动的源文件头注释 | 仅更新本次实际新增/修改的文件（`// <路径> v<版本>`），未改动文件不批量刷写 |
| 2 | `package.json` | 更新 `version` 字段（单一权威来源） |
| 3 | `metadata.json` | 同步 `name` 中的版本与 `version` 字段 |
| 4 | `CHANGELOG.md` | 新增对应版本小节（递增补丁版本，不记录日期） |
| 5 | `README.md` / `README_EN.md` | 同步页脚版本号与版本徽章 |
| 6 | `prototype/prototype.html` | 同步文件头注释版本号 |
| 7 | 运行期展示位 | 如 `footer.copyright`（`common.appVersion`）等页面呈现版本 |

### 3.3 TypeScript 样式规范

| 规范项 | 要求 |
|--------|------|
| 严格模式 | 启用 `strict: true` |
| 文件扩展名 | `.ts` 用于工具函数，`.tsx` 用于 React 组件 |
| 客户端组件 | 使用 `'use client'` 指令标记 |

### 3.4 命名规范

| 类型 | 规范 | 示例 |
|------|------|------|
| 组件函数名 | PascalCase | `LocaleProvider`, `ThemeToggle` |
| 文件名 | kebab-case | `locale-provider.tsx`, `theme-toggle.tsx` |
| 常量 | UPPER_CASE | `STORAGE_KEY`, `LOCAL_STORAGE_KEY` |
| 变量/函数 | camelCase | `isDarkMode`, `getBrowserLocale()` |
| 接口名 | PascalCase（前缀 I 可选） | `Character`, `ICharacter` |

### 3.5 React 组件规范

#### 3.5.1 组件类型

| 类型 | 标记 | 使用场景 |
|-----|------|---------|
| Server Components | 无标记（默认） | 数据获取、静态内容渲染 |
| Client Components | `'use client'` | 需要交互、hooks、状态管理 |

#### 3.5.2 组件开发原则

1. **区分组件类型**：根据需求选择 Server 或 Client 组件
2. **单一职责**：每个组件只负责一个功能
3. **类型安全**：使用 TypeScript 严格模式
4. **可复用性**：设计可复用的通用组件

### 3.6 CSS/Tailwind 规范

| 规范项 | 要求 |
|--------|------|
| 框架版本 | Tailwind CSS 4.0 |
| 深色模式 | 通过根节点切换 `.dark` 类（由 ThemeProvider 注入，`globals.css` 中 `.dark` 选择器定义暗色变量） |
| 汉字字体 | 使用 `.hanzi-font` 类（Noto Serif SC 展示字体） |
| 全局样式 | 在 `globals.css` 中定义 CSS 变量与设计令牌 |
| 设计令牌 | 朱砂红 `--primary`(`#c53d43`) / 靛蓝 `--accent`(`#4f46e5`)，字体 `--font-sans`/`--font-display`/`--font-serif`/`--font-mono` |
| CSS 注释 | 使用 `/* */` 格式 |
| TS/JS 注释 | 使用 `//` 格式 |

### 3.7 路由规范

| 规范项 | 要求 |
|--------|------|
| 路由目录 | `src/app/` |
| 页面文件 | `page.tsx` |
| 布局文件 | `layout.tsx` |
| 动态路由 | `[param]/page.tsx` |
| 路径别名 | `@/` → `src/` |

### 3.8 注释规范

- 所有公共函数必须包含简洁的 JSDoc 注释
- 复杂逻辑添加说明注释
- 注释尽量单行简洁
- 避免无意义的注释

## 4. 国际化 (i18n) 规范

### 4.1 翻译原则

| 规范项 | 要求 |
|--------|------|
| 用户可见文本 | 必须通过 `useTranslation` hook 进行翻译 |
| 翻译文件位置 | `src/lib/i18n/translations/` 目录 |
| 翻译访问 | 通过 `t()` 函数访问翻译数据 |
| 语言选择器 | 使用 `LocaleToggle` 组件 |
| 偏好存储 | 用户语言偏好自动保存到 localStorage |

### 4.2 支持的语言

| 语言代码 | 语言名称 | 文件名 |
|----------|----------|--------|
| `en` | 英语 | `en.ts` |
| `zh-CN` | 简体中文 | `zh-CN.ts` |
| `zh-TW` | 繁体中文 | `zh-TW.ts` |
| `es` | 西班牙语 | `es.ts` |
| `ar` | 阿拉伯语 | `ar.ts` |
| `fr` | 法语 | `fr.ts` |
| `pt-BR` | 葡萄牙语（巴西） | `pt-BR.ts` |
| `de` | 德语 | `de.ts` |
| `ja` | 日语 | `ja.ts` |
| `ko` | 韩语 | `ko.ts` |
| `ru` | 俄语 | `ru.ts` |

### 4.3 翻译文件结构

翻译文件应按照功能模块组织：

```typescript
// src/lib/i18n/translations/en.ts
export const en = {
  common: { /* 通用翻译：导航、主题、操作等 */ },
  home: { /* 首页翻译：hero、特性、永字八法演示 */ },
  learn: { /* 学习页翻译：汉字词条与例句 */ },
  practice: { /* 练习页翻译：书写/测验/进度 */ },
  footer: { /* 页脚翻译 */ },
  meta: { /* 元数据翻译 */ }
};
```

### 4.4 使用示例

```typescript
// 在客户端组件中
'use client';

import { useTranslation } from '@/components/locale-provider';

function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('home.title')}</h1>
      <p>{t('common.description')}</p>
    </div>
  );
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
src/components/
└── my-component.tsx
```

### 6.2 新增页面

```
src/app/
└── my-page/
    └── page.tsx
```

### 6.3 新增工具函数

```
src/lib/
└── my-utility.ts
```

## 7. 最佳实践

### 7.1 性能优化

1. 使用 React Server Components 进行服务端渲染
2. 合理使用 Client Components
3. 避免在渲染函数中进行复杂计算
4. 使用 React.memo 优化组件重渲染

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
