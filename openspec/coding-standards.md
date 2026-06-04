# 编码规范

## 1. 文件头注释

所有代码文件的第一行必须使用以下格式的单行注释：

```
// <文件相对路径> v<版本号>
```

示例：

```typescript
// src/lib/i18n/index.ts v2.2.0
```

## 2. 版本管理 (SemVer 2.0.0)

修改代码时必须同时更新以下文件的版本号：

| 序号 | 更新位置 | 说明 |
|------|----------|------|
| 1 | 当前文件头注释 | 更新版本号 |
| 2 | `package.json` | 更新 `version` 字段 |
| 3 | `CHANGELOG.md` | 新增条目（递增补丁版本，不记录日期） |

## 3. TypeScript 样式规范

| 规范项 | 要求 |
|--------|------|
| 严格模式 | 启用 `strict: true` |
| 文件扩展名 | `.ts` 用于工具函数，`.tsx` 用于 React 组件 |
| 客户端组件 | 使用 `'use client'` 指令标记 |

## 4. React 组件规范

### 4.1 组件类型

| 类型 | 标记 | 使用场景 |
|-----|------|---------|
| Server Components | 无标记（默认） | 数据获取、静态内容渲染 |
| Client Components | `'use client'` | 需要交互、hooks、状态管理 |

### 4.2 组件命名规范

| 类型 | 规范 | 示例 |
|-----|------|-----|
| 组件文件名 | kebab-case | `locale-provider.tsx` |
| 组件函数名 | PascalCase | `LocaleProvider` |
| 页面组件 | 固定文件名 | `page.tsx`, `layout.tsx` |

### 4.3 组件模板

```typescript
'use client';

import { useState, useEffect } from 'react';

export function MyComponent({ prop }: { prop: string }) {
  const [state, setState] = useState('');
  
  useEffect(() => {
    // 副作用逻辑
  }, [prop]);
  
  return (
    <div className="...">
      {prop}
    </div>
  );
}
```

## 5. CSS/Tailwind 规范

| 规范项 | 要求 |
|--------|------|
| 框架版本 | Tailwind CSS 4.0 |
| 深色模式 | 使用 `dark:` 前缀 |
| 汉字字体 | 使用 `.hanzi-font` 类 |
| 全局样式 | 在 `globals.css` 中定义 |
| CSS注释 | 使用 `/* */` 格式 |
| TS/JS注释 | 使用 `//` 格式 |

## 6. 路由规范

| 规范项 | 要求 |
|--------|------|
| 路由目录 | `src/app/` |
| 页面文件 | `page.tsx` |
| 布局文件 | `layout.tsx` |
| 动态路由 | `[param]/page.tsx` |
| 路径别名 | `@/` → `src/` |

## 7. 注释规范

- 所有公共函数必须包含简洁的 JSDoc 注释
- 复杂逻辑添加说明注释
- 注释尽量单行简洁
- 避免无意义的注释

## 8. 国际化 (i18n) 规范

### 8.1 翻译原则

| 规范项 | 要求 |
|--------|------|
| 用户可见文本 | 必须通过 `useTranslation` hook 进行翻译 |
| 翻译文件位置 | `src/lib/i18n/translations/` 目录 |
| 翻译访问 | 通过 `t()` 函数访问翻译数据 |
| 语言选择器 | 使用 `LocaleToggle` 组件 |
| 偏好存储 | 用户语言偏好自动保存到 localStorage |

### 8.2 支持的语言

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

### 8.3 翻译文件结构

翻译文件应按照功能模块组织：

```typescript
export const en = {
  common: { /* 通用翻译 */ },
  home: { /* 首页翻译 */ },
  learn: { /* 学习页翻译 */ },
  footer: { /* 页脚翻译 */ },
  meta: { /* 元数据翻译 */ }
};
```

### 8.4 翻译使用方式

```typescript
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

## 9. Git 提交规范

提交消息应遵循 [提交模板](commit-template.md) 的规范：

```
<类型>: <描述>

[可选正文]

[可选页脚]
```

## 10. 最佳实践

### 10.1 TypeScript 最佳实践

- **避免使用 `any` 类型**：尽量使用具体类型或 `unknown`
- **类型推导**：让 TypeScript 自动推导类型，避免过度声明
- **只读属性**：使用 `readonly` 修饰不应修改的属性
- **联合类型**：使用联合类型表示多种可能的值
- **类型守卫**：使用类型守卫来细化类型

### 10.2 React 最佳实践

- **组件单一职责**：每个组件只负责一个功能
- **合理使用 hooks**：遵循 hooks 规则，自定义 hooks 提取复用逻辑
- **避免不必要的重渲染**：使用 `memo`、`useMemo`、`useCallback`
- **Props 类型安全**：为组件 props 定义完整的 TypeScript 类型
- **错误边界**：使用错误边界处理组件错误

### 10.3 性能优化

- **使用 Server Components**：优先使用服务端组件减少客户端代码
- **代码分割**：合理使用动态导入
- **图片优化**：使用 Next.js Image 组件
- **避免内存泄漏**：清理 useEffect 中的事件监听器和订阅

### 10.4 代码质量

- **运行 lint**：提交前运行 `npm run lint` 检查代码
- **代码格式化**：使用一致的代码格式
- **Code Review**：重要变更经过代码审查
- **写注释**：为复杂逻辑写清晰的注释

## 11. 相关文档

- [项目概述](01-overview.md) - 项目基本信息和技术栈
- [技术架构](02-architecture.md) - 项目架构和目录结构
- [开发指南](03-development.md) - 开发流程和代码规范
- [API 参考](04-api-reference.md) - 组件 API 文档
- [提交模板](commit-template.md) - Git 提交消息规范