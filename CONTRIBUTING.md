# 贡献指南

欢迎为 **HanziMaster 汉字大师** 做出贡献。本文是贡献流程的**入口**，规则细节以 `docs/` 下的权威文档为准。

[English](CONTRIBUTING_EN.md) · [文档中心](docs/index.md)

## 行为准则

保持友善、尊重，聚焦技术问题。社区规范见 `.github/CODE_OF_CONDUCT.md`，安全漏洞报告见 `.github/SECURITY.md`。

## 开发环境

```bash
git clone https://github.com/<your-username>/HanziMaster.git
cd HanziMaster
pnpm install
pnpm dev
```

- Node.js `>= 24.11.0`、pnpm `>= 11`（锁定 `11.24.0`），项目强制 pnpm，`npm install` / `yarn` 会被 `preinstall` 钩子拦截。
- 开发服务器默认 `http://localhost:3000`；应用无需环境变量。
- 完整环境说明与命令表见 [docs/03-development.md](docs/03-development.md)。

## 开发工作流

1. 从 `develop` 创建分支：`feature/<描述>`、`fix/<描述>` 等；分支命名与例外见 [docs/git-workflow.md](docs/git-workflow.md) §1。
2. 编码前阅读 [编码规范](docs/coding-standards.md)（命名、目录、i18n、设计 token、行数、版本同步）与 [API 参考](docs/04-api-reference.md)。
3. 本地跑完 [质量门禁](docs/coding-standards.md) §11：类型检查、lint、单测、行数、安全审计、构建。
4. 提交信息按 [提交规范](docs/commit-template.md) 书写，并在正文/页脚标注新版本号。
5. 推送分支，按 [PR 模板](.github/PULL_REQUEST_TEMPLATE.md) 发起 PR，完成 [代码审查流程](docs/git-workflow.md) §5 后由审查者合并。

> 本机 `pnpm exec` / `pnpm test` 若被 `ERR_PNPM_IGNORED_BUILDS` 阻断，使用 [编码规范](docs/coding-standards.md) §11 中的 Node 直跑等价命令，并在 PR 中注明。

## 规则索引（不在本文重复定义）

| 主题 | 权威文档 |
|------|---------|
| 编码风格、命名约定、目录组织、i18n、设计 token、质量门禁 | [docs/coding-standards.md](docs/coding-standards.md) |
| 提交信息格式与 10 类 type | [docs/commit-template.md](docs/commit-template.md) |
| 分支管理、PR、代码审查、发版 | [docs/git-workflow.md](docs/git-workflow.md) |
| 测试组织与编写规范 | [docs/06-testing.md](docs/06-testing.md) |
| 部署与上线检查 | [docs/05-deployment.md](docs/05-deployment.md) |
| 术语、格式与文档版本戳 | [docs/index.md](docs/index.md) §4 / §5 |
| 所有待办与改进任务 | [docs/tasks.md](docs/tasks.md) |

## 版本管理摘要

任何改动（含文档）至少 bump 一次 patch；版本唯一权威源是 `package.json` 的 `version`，须同步 `metadata.json`、两份 README、`CHANGELOG.md` 与被改动文件的头注释/版本戳。完整清单见 [docs/coding-standards.md](docs/coding-standards.md) §3。

## 报告问题

在 GitHub Issues 中提交 bug 或建议，请包含：复现步骤、期望与实际行为、浏览器/系统环境、相关截图（如有）。

---

© 2026 HanziMaster 汉字大师
