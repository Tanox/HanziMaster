# 贡献指南 (Contributing)

感谢你考虑为 **HanziMaster 汉字大师** 做出贡献！本文档说明如何参与开发与提交变更。

[English](CONTRIBUTING_EN.md)

## 行为准则

请始终保持友善、尊重的交流氛围，专注于技术问题本身。

## 开发环境搭建

```bash
# 1. Fork 并克隆仓库
git clone https://github.com/<your-username>/HanziMaster.git
cd HanziMaster

# 2. 安装依赖（需 Node.js >= 24.5.0）
npm install

# 3. 启动开发服务器
npm run dev
```

开发服务器默认运行在 `http://localhost:3000`。

## 开发工作流

1. 从 `main` 分支创建功能分支：`git checkout -b feature/<简短描述>` 或 `fix/<简短描述>`。
2. 在本地完成开发，确保通过 lint 与构建：
   ```bash
   npm run lint
   npm run build
   ```
3. 提交变更（参见下方提交规范）。
4. 推送分支并发起 Pull Request 到 `main`。

## 提交规范

本项目采用基于 Angular 的提交规范：

```
<type>: <description>

[可选正文]

[可选页脚]
```

| 类型 | 说明 |
|------|------|
| `feat` | 新功能 |
| `fix` | 缺陷修复 |
| `docs` | 文档变更 |
| `style` | 代码格式（不影响功能） |
| `refactor` | 代码重构 |
| `perf` | 性能优化 |
| `test` | 测试变更 |
| `build` | 构建/依赖变更 |
| `ci` | CI/CD 变更 |
| `chore` | 其他杂项 |

要求：描述首字母小写、祈使语气、不超过 50 字符、结尾无句号。

## 版本管理

任何代码或文档修改都需按 [SemVer](https://semver.org/lang/zh-CN/) 升级版本号（最小为 patch）：

- 修复/文档/配置 → `x.y.Z+1`
- 新功能（向后兼容） → `x.Y+1.0`
- 破坏性变更 → `X+1.0.0`

需同步更新的位置：被改动文件的文件头 `// path vX.Y.Z` 注释、`package.json` 的 `version` 字段、以及 `CHANGELOG.md` 新增对应版本小节。

## 代码规范摘要

- 使用 TypeScript strict 模式，避免 `any`。
- 客户端组件使用 `'use client'` 指令。
- 所有用户可见文本必须通过 i18n 翻译（见 `src/lib/i18n/`）。
- 单文件超过 200 行需按职责拆分为更小模块。
- 遵循 Tailwind CSS 4.0 与设计系统 token，禁止硬编码颜色值。

详细规范参见 [openspec/03-development.md](openspec/03-development.md) 与 [openspec/coding-standards.md](openspec/coding-standards.md)。

## 报告问题

请在 GitHub Issues 中提交 bug 或功能建议，并尽量包含：

- 复现步骤
- 期望与实际行为
- 浏览器/系统环境
- 相关截图（如有）

---

© 2026 HanziMaster 汉字大师
