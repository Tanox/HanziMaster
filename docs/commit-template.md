# Git 提交信息规范

> 文档版本：v5.2.35（与项目版本同步，权威版本见 `package.json`）

本文是**提交信息格式的唯一权威**。分支、PR、审查与发版见 [git-workflow.md](git-workflow.md)；编码规则见 [coding-standards.md](coding-standards.md)。[README.md](../README.md)、[CONTRIBUTING.md](../CONTRIBUTING.md) 中的提交段落均为本文摘要，冲突以本文为准。

## 1. 格式

采用 Conventional Commits（Angular 风格）：

```
<type>: <description>

[可选正文]

[可选页脚]
```

- 首行 `<type>: <description>` 中冒号为半角，后接一个空格。
- 正文与首行之间空一行；正文每行 ≤ 72 字符，说明变更原因与影响，不复述 diff。
- 页脚用于 `Closes #123`、`Refs #456`、`BREAKING CHANGE: <说明>` 与**新版本号**。

## 2. 类型（type）

全仓库统一为下列 10 类，不得自造类型：

| 类型 | 说明 | 典型场景 |
|------|------|---------|
| `feat` | 新功能 | 新增学习模式、新增状态组件 |
| `fix` | 缺陷修复 | 修复测验准确率统计、修复抽屉关闭 |
| `docs` | 文档变更 | 规范文档、README、CHANGELOG |
| `style` | 代码格式（不影响功能） | 格式化、分号、缩进 |
| `refactor` | 代码重构 | 拆分超 200 行模块、抽取纯函数 |
| `perf` | 性能优化 | 减少重渲染、懒加载 |
| `test` | 测试变更 | 新增/修改 Vitest 用例 |
| `build` | 构建与依赖变更 | `package.json` / `pnpm-lock.yaml` / 构建配置 |
| `ci` | CI/CD 配置变更 | workflow、部署流水线 |
| `chore` | 其他杂项 | 版本号同步、仓库清理、脚本归位 |

> 版本号同步本身属于 `chore`；若本次同时含功能与版本同步，提交类型取主要变更（如 `feat`），版本信息写进正文/页脚。

## 3. 格式规则

| 规范项 | 要求 |
|--------|------|
| 标题长度 | ≤ 50 字符（中文按字符计） |
| 首字母 | 小写；中文描述以动词开头 |
| 语气 | 祈使语气（「添加…」「修复…」「同步…」） |
| 结尾 | 无句号 |
| 正文 | 每行 ≤ 72 字符，解释原因与影响 |
| 页脚 | 引用 issue；标注新版本号；破坏性变更写 `BREAKING CHANGE:` |
| 原子性 | 一次提交只做一件事，禁止夹带无关改动 |
| 语言 | 中文优先；`type` 固定为英文小写 |

**版本号标注是硬性要求**：每次提交对应一次最小版本 bump（规则见 [coding-standards.md](coding-standards.md) §3），须在正文或页脚写出新版本号，例如 `版本：v5.2.35`。

## 4. 示例

```
feat: 添加书写笔顺提示动效

- 学习页新增逐笔高亮，复用 stroke-order-data
- 同步 11 语言文案键 learn.strokeOrder
- 尊重 prefers-reduced-motion，关闭时退化为静态展示

Closes #123
版本：v5.2.35
```

```
docs: 统一开发规范并同步文档结构

- 明确编码规范、提交规范与 Git 工作流的单一职责
- 修正测试/部署/架构文档与代码实现不一致的表述
- 补齐分支管理与代码审查流程

版本：v5.2.35
```

```
fix: 修复移动抽屉重复 id 导致的 ARIA 关联错误

- 两个测验弹窗分别命名为 learn-quiz-dialog / practice-quiz-dialog
- 列表渲染移除静态 id

Closes #456
版本：v5.2.35
```

单行示例：

```bash
git commit -m "feat: 在学习页面实现字符选择功能" -m "版本：v5.2.35"
git commit -m "fix: 解决主题切换组件初始化问题" -m "版本：v5.2.35"
git commit -m "docs: 更新项目概述文档" -m "版本：v5.2.35"
git commit -m "refactor: 优化主题持久化逻辑" -m "版本：v5.2.35"
```

## 5. 提交模板

将下列内容保存为仓库根的 `.gitmessage`（当前仓库未内置该文件，按需启用）：

```bash
git config commit.template .gitmessage
```

模板内容：

```
# <type>: <描述> （≤50 字符，小写/动词开头，无句号）
#
# [正文] 说明变更原因与影响，每行 ≤72 字符
#
# [页脚] Closes #123 / BREAKING CHANGE: ... / 版本：vX.Y.Z
#
# type: feat, fix, docs, style, refactor, perf, test, build, ci, chore
#
# 检查：门禁全绿 / 版本号已 bump / CHANGELOG 已更新 / 11 语言键一致
```

> `.gitmessage` 是可选的本地辅助文件；`.trae/rules/git-commit-message.md` 已写入同一套规则，供 AI 生成提交信息时读取。二者内容必须一致。

## 6. 提交前检查

- [ ] [coding-standards.md](coding-standards.md) §11 的门禁全部通过
- [ ] 改动文件头注释与文档版本戳已按本次版本更新
- [ ] `package.json` / `metadata.json` / README / `CHANGELOG.md` 已同步
- [ ] 无 `console.log` / `debugger` / 密钥 / 一次性脚本与产物
- [ ] 用户可见文本走 i18n，11 语言叶子键一致
- [ ] 单文件 ≤ 200 行，代码/文档职责未混写

## 7. 相关文档

- [Git 工作流与代码审查](git-workflow.md)
- [编码规范](coding-standards.md)
- [文档中心](index.md)
- [变更日志](../CHANGELOG.md)
