# API 参考
============

## 1. I18nService 国际化服务

### 1.1 服务概述

`I18nService` 是应用的核心国际化服务，提供翻译、语言切换等功能。

**文件路径：** [app/i18n/i18n.service.ts](../app/i18n/i18n.service.ts)

### 1.2 类型定义

```typescript
type Locale = 
  | 'en' 
  | 'zh-CN' 
  | 'zh-TW' 
  | 'es' 
  | 'ar' 
  | 'fr' 
  | 'pt-BR' 
  | 'de' 
  | 'ja' 
  | 'ko' 
  | 'ru';
```

### 1.3 公共 API

| API | 类型 | 说明 |
|-----|------|------|
| `t` | `Computed<Translations>` | 计算属性，返回当前语言的翻译对象 |
| `setLocale(locale: Locale)` | `void` | 设置当前语言 |
| `getLocale()` | `Locale` | 获取当前语言 |
| `getAvailableLocales()` | `Locale[]` | 获取所有支持的语言列表 |

### 1.4 使用示例

```typescript
import { I18nService } from '@app/i18n/i18n.service';

@Component({
  // ...
})
export class MyComponent {
  i18n = inject(I18nService);
  
  changeLanguage() {
    this.i18n.setLocale('zh-CN');
  }
  
  getCurrentLanguage() {
    return this.i18n.getLocale();
  }
}
```

### 1.5 翻译对象结构

```typescript
{
  app: {
    title: string;
    learn: string;
    practice: string;
    signIn: string;
    copyright: string;
  },
  home: {
    poweredBy: string;
    hero: {
      title1: string;
      title2: string;
      title3: string;
      description: string;
      startLearning: string;
      exploreLibrary: string;
    },
    features: {
      aiInsights: { title: string; description: string; };
      etymology: { title: string; description: string; };
      adaptiveLearning: { title: string; description: string; };
    },
    demoCard: {
      characterLabel: string;
      strokeCountLabel: string;
      strokeCountValue: string;
      note: string;
    };
  },
  learn: {
    title: string;
    subtitle: string;
    streak: string;
    practiceWriting: string;
    hearPronunciation: string;
    characters: {
      [key: string]: { meaning: string; };
    };
  },
  theme: {
    light: string;
    dark: string;
  }
}
```

## 2. ThemeToggle 主题切换组件

### 2.1 组件概述

主题切换组件，支持深色/浅色模式切换，自动持久化用户偏好。

**文件路径：** [app/components/theme-toggle.ts](../app/components/theme-toggle.ts)

**选择器：** `app-theme-toggle`

### 2.2 输入/输出

该组件无输入或输出属性。

### 2.3 公共 API（内部）

| 属性/方法 | 类型 | 说明 |
|----------|------|------|
| `isDark` | `Signal<boolean>` | 当前是否为深色模式 |
| `toggleTheme()` | `void` | 切换主题 |

### 2.4 使用示例

```typescript
import { ThemeToggle } from '@app/components/theme-toggle';

@Component({
  imports: [ThemeToggle],
  template: `
    <app-theme-toggle></app-theme-toggle>
  `
})
export class MyComponent {}
```

### 2.5 持久化

- **LocalStorage Key：** `hanzi-master-theme`
- **值：** `'dark'` 或 `'light'`

## 3. LocaleToggle 语言切换组件

### 3.1 组件概述

语言切换组件，提供下拉菜单选择 11 种语言。

**文件路径：** [app/components/locale-toggle.ts](../app/components/locale-toggle.ts)

**选择器：** `app-locale-toggle`

### 3.2 输入/输出

该组件无输入或输出属性。

### 3.3 公共 API（内部）

| 属性/方法 | 类型 | 说明 |
|----------|------|------|
| `isMenuOpen` | `Signal<boolean>` | 菜单是否打开 |
| `availableLocales` | `Signal<Locale[]>` | 可用语言列表 |
| `toggleMenu(event)` | `void` | 切换菜单 |
| `selectLocale(locale)` | `void` | 选择语言 |

### 3.4 使用示例

```typescript
import { LocaleToggle } from '@app/components/locale-toggle';

@Component({
  imports: [LocaleToggle],
  template: `
    <app-locale-toggle></app-locale-toggle>
  `
})
export class MyComponent {}
```

### 3.5 语言名称映射

```typescript
{
  'en': 'English',
  'zh-CN': '简体中文',
  'zh-TW': '繁體中文',
  'es': 'Español',
  'ar': 'العربية',
  'fr': 'Français',
  'pt-BR': 'Português (BR)',
  'de': 'Deutsch',
  'ja': '日本語',
  'ko': '한국어',
  'ru': 'Русский'
}
```

## 4. 数据结构

### 4.1 Character 字符接口

```typescript
interface Character {
  id: number;
  hanzi: string;
  pinyin: string;
  meaning: string;
}
```

**使用位置：** [app/pages/learn/learn.ts](../app/pages/learn/learn.ts)

## 5. 应用配置

### 5.1 app.config.ts

**文件路径：** [app/app.config.ts](../app/app.config.ts)

**关键配置：**

```typescript
export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes, withComponentInputBinding()),
    provideAnimationsAsync()
  ]
};
```

### 5.2 路由配置

**文件路径：** [app/app.routes.ts](../app/app.routes.ts)

```typescript
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.Home)
  },
  {
    path: 'learn',
    loadComponent: () => import('./pages/learn/learn').then(m => m.Learn)
  }
];
```

## 6. 样式与主题

### 6.1 字体配置

**文件路径：** [app/styles.css](../app/styles.css)

| 字体变量 | 字体名称 | 用途 |
|----------|----------|------|
| `--font-sans` | Inter | 主要界面字体 |
| `--font-mono` | JetBrains Mono | 代码字体 |
| `--font-hanzi` | Noto Sans SC | 汉字字体 |

### 6.2 hanzi-font 类

用于显示汉字的专用类：

```css
.hanzi-font {
  font-family: var(--font-hanzi);
}
```

**使用示例：**

```html
<span class="text-4xl font-bold hanzi-font">永</span>
```

### 6.3 主题色

```css
:root {
  --primary: #10b981; /* emerald-500 */
  --primary-dark: #059669; /* emerald-600 */
}
```

## 7. 环境变量

| 变量名 | 说明 | 必填 | 示例值 |
|--------|------|------|--------|
| `GEMINI_API_KEY` | Google Gemini AI API 密钥 | 否 | `your-api-key-here` |

## 8. 浏览器要求

- 现代浏览器（Chrome、Firefox、Safari、Edge 最新版）
- 需要启用 JavaScript
- 需要支持 localStorage

## 9. 包大小预算

| 资源类型 | 限制 | 当前值 |
|---------|------|--------|
| 初始包 | 最大 500KB | 约 630KB |

## 10. 相关文档

- [项目概述](01-overview.md) - 项目基本信息和技术栈
- [技术架构](02-architecture.md) - 系统架构设计和技术选型
- [开发指南](03-development.md) - 开发环境配置和编码规范
