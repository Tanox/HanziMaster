# 11. 开发指南 (Development Guide)

## 1. 技术栈 (Tech Stack)

### 1.1 核心框架
*   **Runtime**: React 18.3.1 (已锁定版本以确保 PWA 稳定性)
*   **Language**: TypeScript 5.7+
*   **Build Tool**: Vite 6+

## 3. 代码规范 (Coding Standards)

### 3.4 国际化 (I18n) 同步要求
*   **严禁单点修改**: 在 `locales/en.ts` 或 `zh-CN.ts` 增加 Key 后，必须同步在所有 15 种语言文件中添加对应的 Key（可暂时填充英文）。
*   **自动化**: 使用 `npm run i18n-audit` (规划中) 检查缺失的翻译键。
