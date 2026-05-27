# 编码规范

## 1. 文件头注释

所有代码文件的第一行必须使用以下格式的单行注释：

```
// <文件相对路径> v<版本号>
```

示例：

```typescript
// app/app.ts v2.2.0
```

## 2. 版本管理 (SemVer 2.0.0)

修改代码时必须同时更新以下文件的版本号：

| 序号 | 更新位置 | 说明 |
|------|----------|------|
| 1 | 当前文件头注释 | 更新版本号 |
| 2 | HTML `<title>` 标签 | 添加版本号后缀 |
| 3 | `metadata.json` | 更新 `name` 和 `version` 字段 |
| 4 | `package.json` | 更新 `version` 字段 |
| 5 | `CHANGELOG.md` | 新增条目（递增补丁版本，不记录日期） |

## 3. TypeScript 样式规范

| 规范项 | 要求 |
|--------|------|
| 严格模式 | 启用 `strict: true` |
| 变更检测 | 使用 `ChangeDetectionStrategy.OnPush` |
| 组件格式 | 所有组件必须使用 standalone 格式 |
| 状态管理 | 使用 Angular 21 的信号机制 (Signals) |

## 4. Angular 组件规范

### 4.1 组件装饰器模板

```typescript
@Component({
  selector: 'app-[component-name]',
  imports: [/* 需要的模块 */],
  template: `...`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
```

### 4.2 组件命名规范

- 组件类名：`PascalCase`，如 `ThemeToggle`
- 组件选择器：`kebab-case`，如 `app-theme-toggle`
- 文件命名：`kebab-case`，如 `theme-toggle.ts`

## 5. CSS/Tailwind 规范

| 规范项 | 要求 |
|--------|------|
| 框架版本 | Tailwind CSS 4.0 |
| 深色模式 | 使用 `dark:` 前缀 |
| 汉字字体 | 使用 `.hanzi-font` 类 |
| 页面容器 | 添加语义化的 `id` |
| CSS注释 | 使用 `/* */` 格式 |
| TS/JS注释 | 使用 `//` 格式 |

## 6. 路由规范

| 规范项 | 要求 |
|--------|------|
| 加载方式 | 使用懒加载 `loadComponent` |
| 路径别名 | `@app/*` → `app/*` |

## 7. 注释规范

- 所有函数必须包含简洁的注释
- 复杂逻辑添加说明注释
- 注释尽量单行简洁
- 避免无意义的注释

## 8. 国际化 (i18n) 规范

### 8.1 翻译原则

| 规范项 | 要求 |
|--------|------|
| 用户可见文本 | 必须通过 `I18nService` 进行翻译 |
| 翻译文件位置 | `app/i18n/locales/` 目录 |
| 服务注入 | 使用 `inject(I18nService)` |
| 翻译访问 | 通过 `i18n.t()` 访问翻译数据 |
| 语言选择器 | 使用 `LocaleToggle` 组件 |
| 偏好存储 | 用户语言偏好自动保存到 localStorage |

### 8.2 支持的语言

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

### 8.3 翻译文件结构

翻译文件应按照功能模块组织：

```typescript
export const en = {
  app: { /* 应用级翻译 */ },
  home: { /* 首页翻译 */ },
  learn: { /* 学习页翻译 */ },
  theme: { /* 主题相关翻译 */ }
};
```

## 9. Git 提交规范

提交消息应遵循 [提交模板](commit-template.md) 的规范：

```
<类型>: <描述>

[可选正文]

[可选页脚]
```

## 10. 相关文档

- [项目概述](overview.md) - 项目基本信息和技术栈
- [API 参考](api-reference.md) - 详细的 API 文档和代码示例
- [提交模板](commit-template.md) - Git 提交消息规范
