---
alwaysApply: true
scene: git_message
---

生成 Git 提交信息时，必须与 `docs/commit-template.md`（唯一权威）保持一致。

## 格式

```
<type>: <description>

[可选正文]

[可选页脚]
```

## 规则

- `type` 仅限：`feat` / `fix` / `docs` / `style` / `refactor` / `perf` / `test` / `build` / `ci` / `chore`。
- 描述 ≤ 50 字符，小写或动词开头，祈使语气，结尾无句号，中文优先。
- 正文每行 ≤ 72 字符，说明变更原因与影响，不复述 diff。
- 页脚用 `Closes #123` 关联 issue；破坏性变更写 `BREAKING CHANGE:`。
- **正文或页脚必须标注新版本号**（如 `版本：v5.2.34`）：任何改动至少 bump 一次 patch，权威源是 `package.json` 的 `version`。
- 一次提交只做一件事，禁止夹带无关改动；提交前确认质量门禁全绿。
- 分支、PR 与代码审查流程见 `docs/git-workflow.md`；编码规范见 `docs/coding-standards.md`。

## 示例

```
docs: 统一开发规范并同步文档结构

- 明确编码规范、提交规范与 Git 工作流的单一职责
- 修正测试/部署/架构文档与代码实现不一致的表述
- 补齐分支管理与代码审查流程

版本：v5.2.34
```

```
fix: 修复测验准确率重置后的统计错误

- 重置时清空会话计数，保留历史周活动
- 补充 progress-utils 边界用例

Closes #123
版本：v5.2.34
```
