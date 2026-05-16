# API 参考

## 环境变量
应用程序使用以下环境变量：

```bash
GEMINI_API_KEY=<您的API密钥>
APP_URL=<应用程序URL>
SHARED_APP_URL=<共享应用程序URL>
```

## 浏览器要求
- 现代浏览器 (Chrome, Firefox, Safari, Edge)
- 需要启用 JavaScript
- 需要支持 localStorage

## 构建和部署

### 启动开发服务器
```bash
npm install
npm start
```
开发服务器: http://localhost:3000

### 生产构建
```bash
npm run build
```
输出目录: `dist/hanzi-master`

### 运行测试
```bash
npm test
```

### 运行代码检查
```bash
npm run lint
```

## 包大小预算
- 初始包: 最大 500KB (当前约 629KB)
- 组件样式: 最大 4KB

## 动画提供者
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

## 主题切换
主题切换组件支持：
- localStorage 持久化（key: `hanzi-master-theme`）
- 系统偏好检测（`prefers-color-scheme: dark`）
- DOM 状态检查（`dark` class）
- 深色/浅色模式平滑切换

### ThemeToggle 组件
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

## 国际化 (i18n) 服务

### I18nService API
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

### 支持的语言
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

### 语言文件结构
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

### LocaleToggle 组件
语言切换器组件：

```typescript
// app/components/locale-toggle.ts
@Component({
  selector: 'app-locale-toggle',
  imports: [MatIconModule],
  template: `...`
})
export class LocaleToggle {
  i18n = inject(I18nService);
  
  // 语言名称映射
  localeNames: Record<string, string> = {
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
  selectLocale(locale: string): void;
}
```

### 在组件中使用 i18n
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

### 语言检测优先级
1. localStorage 中保存的用户偏好（key: `hanzi-master-locale`）
2. 浏览器语言设置
3. 默认语言（英语）

## 字体配置
Tailwind 主题中配置的字体：
- `--font-sans`: Inter 字体
- `--font-mono`: JetBrains Mono 字体
- `--font-hanzi`: Noto Sans SC 中文字体

### hanzi-font 类
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

## 路由配置
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

## 数据结构

### Character 接口
```typescript
// app/pages/learn/learn.ts
interface Character {
  id: number;
  hanzi: string;
  pinyin: string;
  meaning: string;
}
```

## 组件规范

### 必需的导入
```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
```

### 组件装饰器
```typescript
@Component({
  selector: 'app-[component-name]',
  imports: [/* 需要的模块 */],
  template: `...`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
```
