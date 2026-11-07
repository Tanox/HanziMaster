# Git 工作流与代码审查规范

> 文档版本：v5.2.40（与项目版本同步，权威版本见 `package.json`）

本文是**分支管理、Pull Request、代码审查与发版流程的唯一权威**。提交信息格式见 [commit-template.md](commit-template.md)，编码规则见 [coding-standards.md](coding-standards.md)，版本同步位置清单见 [coding-standards.md](coding-standards.md) §3。

## 1. 分支模型

采用轻量的主干开发模型，长期分支只有 `main` 与 `develop`。

| 分支 | 用途 | 生命周期 | 从哪创建 | 合并到 |
|------|------|---------|---------|--------|
| `main` | 生产环境代码，随时可发布 | 长期 | — | — |
| `develop` | 日常集成分支 | 长期 | `main` | `main` |
| `feature/*` | 新功能 | 临时 | `develop` | `develop` |
| `fix/*` | 非紧急缺陷修复 | 临时 | `develop` | `develop` |
| `bugfix/*` | 已定位、需独立验证的缺陷 | 临时 | `develop` | `develop` |
| `hotfix/*` | 生产紧急修复 | 临时 | `main` | `main` **并** 回合 `develop` |
| `release/*` | 发版准备（版本号、CHANGELOG、最终回归） | 临时 | `develop` | `main` + `develop` |

命名规则：`<type>/<kebab-case-简短描述>`，例如 `feature/stroke-order-hint`、`fix/quiz-accuracy-reset`、`hotfix/csp-inline-script`。禁止拼音、空格、下划线与纯数字分支名。

单人小改动（≤3 文件、仅文档或拼写）允许直接提交到 `develop`，但**禁止直接 push 到 `main`**。`hotfix/*` 合并 `main` 后必须回合 `develop`，避免修复在下一版本丢失。功能分支合并后即删除。

## 2. 日常开发流程

1. 同步基线：`git switch develop && git pull --ff-only`。
2. 创建分支：`git switch -c feature/<简短描述>`。
3. 实现变更，遵循 [coding-standards.md](coding-standards.md)，并用 [tasks.md](tasks.md) 跟踪未完成任务。
4. 本地跑完 §4 全部质量门禁。
5. 按 [commit-template.md](commit-template.md) 提交；一次提交只做一件事。
6. 推送分支：`git push -u origin feature/<简短描述>`。
7. 发起 PR 到 `develop`（紧急修复到 `main`），填写 [PR 模板](../.github/PULL_REQUEST_TEMPLATE.md)。
8. 完成 §5 代码审查后由审查者合并，保留合并提交历史，**不做 squash**，便于回滚。

> 本机 GitHub 推送返回 `remote: Internal Server Error` 时，用 `git -c http.version=HTTP/1.1 push origin <branch>` 重试；不要改全局 git config。

## 3. 提交信息

一律使用 Conventional Commits（Angular 风格）：

```
<type>: <description>

[可选正文]

[可选页脚]
```

- `type` ∈ `feat` / `fix` / `docs` / `style` / `refactor` / `perf` / `test` / `build` / `ci` / `chore`。
- 描述 ≤ 50 字符、首字母小写、动词开头、祈使语气、结尾无句号。
- 正文每行 ≤ 72 字符，说明「为什么」而非复述 diff；页脚用 `Closes #123` 关联 issue。
- 正文或页脚**必须标注新版本号**（如 `版本：v5.2.35`），破坏性变更在页脚写 `BREAKING CHANGE:`。
- 完整定义、类型表、示例与 `.gitmessage` 模板见 [commit-template.md](commit-template.md)。

## 4. 合并前质量门禁

PR 检查清单与 CI 判定依据一致，任一项失败即阻断合并：

| # | 检查项 | 命令 / 依据 |
|---|--------|------------|
| 1 | 类型检查 0 error | `pnpm exec tsc --noEmit` |
| 2 | Lint 0 error / 0 warning | `pnpm lint` |
| 3 | 单测全通过 | `pnpm test` |
| 4 | 行数门禁 | `pnpm check:lines` |
| 5 | 生产依赖 0 高危 | `pnpm security:audit` |
| 6 | 生产构建成功 | `pnpm build` |
| 7 | 改动文件无 `console.log` / `debugger` / 密钥 / Token | 人工 + diff 扫描 |
| 8 | 用户可见文本全部走 i18n，11 语言键一致 | `src/lib/__tests__/i18n.test.ts` |
| 9 | 语义化 id 唯一、无硬编码色值、单文件 ≤ 200 行 | 人工 + 门禁 |
| 10 | 版本号已 bump，CHANGELOG 与全局展示位已同步 | [coding-standards.md](coding-standards.md) §3 |
| 11 | 文档链接有效、文档版本戳与改动一致 | [index.md](index.md) §5 |

> 本机 `pnpm exec` / `pnpm test` 若被 `ERR_PNPM_IGNORED_BUILDS` 阻断，改用 [coding-standards.md](coding-standards.md) §11 的 Node 直跑等价命令，并在 PR「测试说明」中注明实际执行的命令。

## 5. 代码审查流程

### 5.1 角色与状态

- **作者**：保证自查清单全绿、PR 描述完整、单 PR 变更聚焦（建议 ≤ 400 行 diff）。
- **审查者**：至少 1 名非作者审查；涉及架构、安全响应头、i18n 数据结构、版本号注入时至少 2 名。
- 状态流转：`待审查 → 审查中 → 需修改 → 已批准 → 已合并`。未获「已批准」不得合并。

### 5.2 审查顺序

1. **需求与范围**：是否与 issue / [tasks.md](tasks.md) 任务对应，有无夹带无关改动。
2. **规范符合性**：命名、目录、文件头注释、行数、i18n、设计 token、语义化 id（[coding-standards.md](coding-standards.md)）。
3. **正确性**：边界条件、异步错误、状态持久化 schema 校验、列表渲染 key/id 唯一性。
4. **安全与隐私**：CSP 由 `next.config.mjs` 统一注入，不得引入新的内联脚本策略；无密钥、无 PII 落盘、无 `dangerouslySetInnerHTML`。
5. **可访问性**：语义化 HTML、ARIA 关联、键盘导航、`focus-visible`、`prefers-reduced-motion`。
6. **测试与文档**：新逻辑有对应测试；行为变更同步更新 `docs/` 与原型；CHANGELOG 与版本位齐全。
7. **可回滚性**：提交粒度合理，历史保留合并记录，破坏性变更注明迁移方式。

### 5.3 评审意见约定

- 意见标注严重度：`[阻断]` 必须修复、`[建议]` 可选、`[疑问]` 需澄清。
- 讨论聚焦代码与事实，引用具体文件与行号；作者逐条回复后再请求复审。
- 审查者确认全部 `[阻断]` 关闭且门禁全绿后点「已批准」；由审查者合并，合并后删除源分支。

## 6. 发版流程

1. 从 `develop` 创建 `release/vX.Y.Z`，确认 `package.json` 的 `version` 为唯一权威源。
2. 按 [coding-standards.md](coding-standards.md) §3 同步 `metadata.json`、`README.md` / `README_EN.md`、改动文件头注释/文档版本戳、`CHANGELOG.md` 新小节。
3. 跑一遍 §4 全部门禁，核对页脚 `#footer-version` 展示 `vX.Y.Z · build yymmddhhmm`（10 位 build 编号，由 `next.config.mjs` 注入 `NEXT_PUBLIC_APP_VERSION` / `NEXT_PUBLIC_BUILD_ID`，无需手工维护）。
4. PR 合并 `release/*` → `main`，打 Tag `vX.Y.Z` 并推送；同期回合 `develop`。
5. 推送 Tag 自动触发 GitHub Release 发布（§6.1）；平台部署见 [05-deployment.md](05-deployment.md)。发布完成后在 `main` 上复验三件事：生产页脚版本与 build 编号、GitHub Release 是否创建、Release 正文与 `CHANGELOG.md` 是否一致。

### 6.1 自动发布 Releases（GitHub Actions）

**规则：当 GitHub Actions 所有相关工作流全绿后，自动发布 GitHub Releases；任一工作流未通过则不发布。**

- **触发**：向 `main` 推送 tag `vX.Y.Z`（即上面步骤 4），由 `.github/workflows/release.yml` 接管；`workflow_dispatch` 仅供门禁全绿但自动化异常时的手动兜底。
- **「全绿」的定义**（三者同时满足才发布）：
  1. 本次 tag 触发的 `ci.yml` 全部 job（`quality` / `coverage` / `e2e`）结论为 `success`；
  2. 同一 commit SHA 在 `main` 上最近一次 `deploy.yml` 运行结论为 `success`（Deploy 因未配置 Vercel Secrets 而跳过时，视为可发布）；
  3. tag 名与 `package.json` 的 `version` 一致（`v5.2.36` ↔ `5.2.36`），不一致直接失败，不发 Release。
- **发布内容**：Release 标题 `vX.Y.Z`；正文取 `CHANGELOG.md` 中该版本小节（以 `## [X.Y.Z]` 起始到下一个小节）；附件使用 GitHub 自动生成的源码归档（Source code zip/tar.gz）。
- **失败处理**：任一 job 失败 → `release.yml` 短路退出，不创建 Release，并在日志输出 `::error::` 标明哪个门禁未通过。此时**禁止删除重建同名 Tag**（§7），应修复后使用新的 patch 版本重新走 §6 流程。
- **幂等与重复**：同名 Release / Tag 已存在时视为异常，直接失败并告警，不做覆盖式更新。
- **权限**：`release.yml` 仅申请 `contents: write`，不授予其他 scope；Token 使用默认 `GITHUB_TOKEN`。
- **实现任务**：该规则的落地工作流见 [tasks.md](tasks.md) P1-37（`release.yml` 尚未创建时，本节为规范目标态，发布仍按旧流程手工执行）。

## 7. 禁止事项

- 直接 push `main`；force push 共享分支；跳过 hooks；改写已发布 Tag。
- 在提交中夹带密钥、Token、`.env.local`、脚本产物（`reports/` 已被忽略）。
- 把任务/待办写进代码注释或规范文档；任务只写 [tasks.md](tasks.md)，完成后归档到 [tasks-done.md](tasks-done.md)。
- 用「历史记录不篡改」之外的理由批量替换 CHANGELOG 历史条目中的旧版本号与旧路径（如 `openspec/`）。

## 8. 相关文档

- [提交信息规范](commit-template.md)
- [编码规范与质量门禁](coding-standards.md)
- [贡献指南（入口）](../CONTRIBUTING.md)
- [PR 模板](../.github/PULL_REQUEST_TEMPLATE.md)
- [变更日志](../CHANGELOG.md)
