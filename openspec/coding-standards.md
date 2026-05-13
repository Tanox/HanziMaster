# 编码规范

## 文件头注释
所有代码文件的第一行必须使用以下格式的单行注释：
```
// <文件相对路径> v<版本号>
```

示例：
```typescript
// app/app.ts v2.2.0
```

## 版本管理 (SemVer 2.0.0)
修改代码时必须同时更新以下文件的版本号：
1. 当前文件头注释
2. HTML `<title>` 标签
3. `metadata.json` 中的 `name` 和 `version` 字段
4. `package.json` 中的 `version` 字段
5. `CHANGELOG.md` 中新增条目（递增补丁版本，不记录日期）

## TypeScript 样式规范
- **严格模式**: 启用 `strict: true`
- **变更检测**: 使用 `ChangeDetectionStrategy.OnPush`
- **独立组件**: 所有组件必须使用 standalone 格式
- **信号 (Signals)**: 使用 Angular 21 的信号机制

## Angular 组件规范
```typescript
@Component({
  selector: 'app-[组件名称]',
  imports: [...],
  template: `...`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
```

## CSS/Tailwind 规范
- 使用 Tailwind CSS 4.0
- 深色模式: 使用 `dark:` 前缀
- 汉字字体: 使用 `.hanzi-font` 类
- 为页面容器添加语义化的 `id`
- CSS文件注释使用 `/* */` 格式
- TypeScript/JavaScript文件注释使用 `//` 格式

## 路由规范
- 使用懒加载: `loadComponent`
- 路径别名: `@app/*` → `app/*`

## 注释规范
- 所有函数必须包含简洁的注释
- 复杂逻辑添加说明注释
- 注释尽量单行简洁

## 国际化 (i18n) 规范
- 所有用户可见的文本必须通过 `I18nService` 进行翻译
- 翻译文件位于 `app/i18n/locales/` 目录
- 支持的语言: en, zh-CN, zh-TW, es, ar, fr, pt-BR, de, ja, ko, ru
- 使用 `inject(I18nService)` 访问翻译服务
- 通过 `i18n.t()` 访问翻译数据
- 语言选择器使用 `LocaleToggle` 组件
- 用户语言偏好自动保存到 localStorage
