# API 参考

## 1. 环境变量

应用程序使用以下环境变量：

| 变量名 | 说明 |
|--------|------|
| `GEMINI_API_KEY` | Gemini AI API 密钥 |
| `APP_URL` | 应用程序 URL |
| `SHARED_APP_URL` | 共享应用程序 URL |

## 2. 浏览器要求

- 现代浏览器 (Chrome, Firefox, Safari, Edge)
- 需要启用 JavaScript
- 需要支持 localStorage

## 3. 构建和部署

### 3.1 启动开发服务器

```bash
npm install
npm start
```

开发服务器: `http://localhost:3000`

### 3.2 生产构建

```bash
npm run build
```

输出目录: `dist/hanzi-master`

### 3.3 运行测试

```bash
npm test
```

### 3.4 运行代码检查

```bash
npm run lint
```

## 4. 包大小预算

| 资源类型 | 限制 | 当前值 |
|----------|------|--------|
| 初始包 | 最大 500KB | 约 629KB |
| 组件样式 | 最大 4KB | - |

## 5. 动画提供者

Angular Material 动画使用 `provideAnimationsAsync()`：

```typescript
// app/app.config.ts
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync()
  ]
};
```

## 6. 主题切换

主题切换组件支持：
- localStorage 持久化（key: `hanzi-master-theme`）
- 系统偏好检测（`prefers-color-scheme: dark`）
- DOM 状态检查（`dark` class）
- 深色/浅色模式平滑切换

### 6.1 ThemeToggle 组件

```typescript
// app/components/theme-toggle.ts
@Component({
  selector: 'app-theme-toggle',
  imports: [MatIconModule],
  template: `
    <button (click)="toggleTheme()" class="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
      <mat-icon>{{ isDark() ? 'light_mode' : 'dark_mode' }}</mat-icon>
    </button>
  `
})
export class ThemeToggle implements OnInit {
  isDark = signal(false);
  
  ngOnInit() { /* 初始化主题 */ }
  toggleTheme() { /* 切换主题 */ }
}
```

## 7. 国际化 (i18n) 服务

### 7.1 I18nService API

I18nService 提供完整的国际化支持：

```typescript
// app/i18n/i18n.service.ts
@Injectable({ providedIn: 'root' })
export class I18nService {
  // 计算属性，返回当前翻译
  t = computed(() => locales[this.currentLocale()]);
  
  // 设置语言
  setLocale(locale: Locale): void;
  
  // 获取当前语言
  getLocale(): Locale;
  
  // 获取支持的语言列表
  getAvailableLocales(): Locale[];
}
```

### 7.2 支持的语言

```typescript
type Locale = 
  | 'en'           // 英语
  | 'zh-CN'        // 简体中文
  | 'zh-TW'        // 繁体中文
  | 'es'           // 西班牙语
  | 'ar'           // 阿拉伯语
  | 'fr'           // 法语
  | 'pt-BR'        // 葡萄牙语（巴西）
  | 'de'           // 德语
  | 'ja'           // 日语
  | 'ko'           // 韩语
  | 'ru';          // 俄语
```

### 7.3 语言文件结构

```typescript
// app/i18n/locales/en.ts
export const en = {
  app: {
    title: 'HanziMaster',
    learn: 'Learn',
    practice: 'Practice',
    signIn: 'Sign In',
    copyright: '© 2026 HanziMaster 汉字大师 v2.2.0. All rights reserved.'
  },
  home: {
    poweredBy: 'Powered by Gemini AI',
    hero: {
      title1: 'Master Chinese',
      title2: 'One Stroke',
      title3: 'at a Time.',
      description: '...',
      startLearning: 'Start Learning Now',
      exploreLibrary: 'Explore Library'
    },
    features: {
      aiInsights: { title: '...', description: '...' },
      etymology: { title: '...', description: '...' },
      adaptiveLearning: { title: '...', description: '...' }
    },
    demoCard: {
      characterLabel: 'yǒng • Forever',
      strokeCountLabel: 'Stroke Count',
      strokeCountValue: '5 Strokes',
      note: '"The character for \'forever\' contains all 8 basic strokes."'
    }
  },
  learn: {
    title: 'Daily Practice',
    subtitle: 'Master the most common 100 characters.',
    streak: '5 Day Streak',
    practiceWriting: 'Practice Writing',
    hearPronunciation: 'Hear Pronunciation',
    characters: {
      '一': { meaning: 'One' },
      '二': { meaning: 'Two' },
      // ...
    }
  },
  theme: {
    light: 'Light Mode',
    dark: 'Dark Mode'
  }
};
```

### 7.4 LocaleToggle 组件

语言切换器组件：

```typescript
// app/components/locale-toggle.ts
@Component({
  selector: 'app-locale-toggle',
  imports: [MatIconModule],
  template: `...`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocaleToggle {
  i18n = inject(I18nService);
  isMenuOpen = signal(false);
  
  localeNames: Record<Locale, string> = {
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
  };
  
  toggleMenu(): void;
  selectLocale(locale: Locale): void;
}
```

### 7.5 在组件中使用 i18n

```typescript
// app/pages/home/home.ts
@Component({ ... })
export class Home {
  i18n = inject(I18nService);
  
  // 在模板中使用
  // {{ i18n.t().home.hero.title1 }}
  // {{ i18n.t().app.learn }}
}
```

### 7.6 语言检测优先级

1. localStorage 中保存的用户偏好（key: `hanzi-master-locale`）
2. 浏览器语言设置
3. 默认语言（英语）

## 8. 字体配置

Tailwind 主题中配置的字体：

| 字体变量 | 字体名称 |
|----------|----------|
| `--font-sans` | Inter |
| `--font-mono` | JetBrains Mono |
| `--font-hanzi` | Noto Sans SC |

### 8.1 hanzi-font 类

用于显示汉字的专用类：

```css
/* app/styles.css */
.hanzi-font {
  font-family: var(--font-hanzi);
}
```

使用示例：

```html
<span class="text-4xl font-bold hanzi-font">永</span>
```

## 9. 路由配置

应用使用懒加载路由：

```typescript
// app/app.routes.ts
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

## 10. 数据结构

### 10.1 Character 接口

```typescript
// app/pages/learn/learn.ts
interface Character {
  id: number;
  hanzi: string;
  pinyin: string;
  meaning: string;
}
```

## 11. 组件规范

### 11.1 必需的导入

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
```

### 11.2 组件装饰器

```typescript
@Component({
  selector: 'app-[component-name]',
  imports: [/* 需要的模块 */],
  template: `...`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
```

## 12. 相关文档

- [项目概述](overview.md) - 项目基本信息和技术栈
- [编码规范](coding-standards.md) - 项目编码标准和最佳实践
- [提交模板](commit-template.md) - Git 提交消息规范
