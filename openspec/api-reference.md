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
- 初始包: 最大 500KB (当前 594KB - 需要优化)
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
- localStorage 持久化
- 系统偏好检测
- DOM 状态检查
- 深色/浅色模式平滑切换

## 字体配置
Tailwind 主题中配置的字体：
- `--font-sans`: Inter 字体
- `--font-mono`: JetBrains Mono 字体
- `--font-hanzi`: Noto Sans SC 中文字体
