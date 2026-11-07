<!-- OPENSPEC:START -->
# OpenSpec Instructions

> 文档版本：v5.2.43（与项目版本同步，权威版本见 `package.json`）

Instructions for AI coding assistants working in this project.

> 注：本项目**未接入 openspec CLI**（无 `specs/`、`changes/`、`archive/` 目录）。规范以 `docs/*.md` 文档形式维护；保留 OpenSpec 方法论名称与上述工具标记仅为兼容既有工具链。以下为项目实际协作约定，权威规则见对应文档。

## 开始任何任务前

- **版本基准**：读取 `package.json` 的 `version` 字段（唯一权威源）确认真实版本；不依赖会话记忆或旧快照。
- **工作区状态**：实查 `git status` 与最近提交，注意用户/并行 agent 在会话间隙的改动，勿覆盖未提交内容。
- **规范文档**（入口 [index.md](index.md)）：
  - 项目概述 `01-overview.md` · 技术架构 `02-architecture.md` · 开发指南 `03-development.md`
  - API 参考 `04-api-reference.md` · 部署指南 `05-deployment.md` · 测试规范 `06-testing.md`
  - 设计系统（权威）`07-design-prototype.md`
  - **编码规范（权威）** `coding-standards.md` · **提交信息（权威）** `commit-template.md`
  - **分支 / PR / 审查 / 发版（权威）** `git-workflow.md`
  - 任务清单 `tasks.md`（所有待办的唯一来源）· 归档 `tasks-done.md` · 对齐现状 `alignment-checklist.md`
  - 项目上下文（英文）`project.md` · 术语与格式约定 `index.md` §4
- **设计原型**：`prototype/prototype.html` 是唯一权威高保真原型；`prototype/DESIGN_SPEC.md` 为原型交付侧细化规范。

## 关键约定

1. **单一职责**：编码风格/命名/目录/版本同步/门禁只在 `coding-standards.md` 定义；提交格式只在 `commit-template.md`；分支与审查只在 `git-workflow.md`。其他文档只写摘要与链接，禁止另立规则或重复任务清单。
2. **源文件 ≤ 200 行**：超限按职责拆分（组件 / hooks / utils / types / constants 分别成文件）。**文档 `.md` 不拆分**，即使超长也保持单文件完整。
3. **语义化 id**：主要容器、区块、关键 DOM 用 kebab-case 唯一 id；列表渲染禁用静态 id。
4. **版本号规则**：任意修改 bump 最小版本（patch ≥ +1）。同步 `package.json` version、`metadata.json` name/version、`README` / `README_EN` 标题与页脚、`CHANGELOG.md` 新小节、本次改动源码的头注释与文档版本戳。未改动文件不批量刷写；11 语言 `footer.copyright` 用 `{{versionLabel}}` 插值，无需改动；不存在 `common.appVersion`。
5. **设计令牌单一来源**：`globals.css @theme`（语义 token）+ `styles/theme-colors.css`（扩展色阶/阴影）+ `styles/utilities.css`（动画工具类）；`tailwind.config.ts` 已删除。禁止内联色值、`rounded-[Npx]` 任意值、`transition-all`。
6. **i18n 类型安全**：`t()` 键受 `TranslationKey` 约束，新增键同步 11 语言包，`i18n.test.ts` 校验叶子键一致。
7. **质量门禁**：类型检查 / lint / 单测 / 行数 / 安全审计 / 构建全绿。本机用 `node node_modules/typescript/bin/tsc --noEmit`、`node node_modules/vitest/vitest.mjs run`、`node scripts/run-tests.mjs` 等 Node 直跑命令绕过 pnpm deps 状态检查，详见 `coding-standards.md` §11。
8. **任务来源**：新增/跟踪任务只写 `tasks.md`，完成后移入 `tasks-done.md`；不得在规范文档、代码注释或对齐清单中维护待办。
9. **历史记录不篡改**：`CHANGELOG.md` 历史条目、归档文档中的 `openspec/` 路径与旧版本号保留原文，不批量替换，也不判定为断链。

## 决策流程

- **规范创建 / 修改**：采用「文档先行」而非 CLI 提案流程——涉及新能力、破坏性变更、架构调整时，先更新 `docs/*.md` 对应权威章节，再实现代码，最后更新 `alignment-checklist.md` 与 `CHANGELOG.md`。
- **复杂任务**：5+ 文件变更 / 新增依赖 / 架构调整时，先输出规格说明（需求、方案、设计）再进入实现。
- **文档改动**：同步本次改动文档的版本戳；未改动文档保留原戳合法。链接必须有效，术语以 `index.md` §4 为准。

## 提交规范

- 格式 `<type>: <description>`，type ∈ feat/fix/docs/style/refactor/perf/test/build/ci/chore；描述 ≤ 50 字符、小写动词开头、无句号。
- 正文 ≤ 72 字符/行，正文或页脚标注新版本号；禁止 `console.log` / `debugger` / 密钥进入提交。
- 详见 `commit-template.md`；分支、PR 与审查流程见 `git-workflow.md`。

## 验证

- 改动后跑质量门禁并确认 error / warning 全清零；文档改动须保证内部链接有效、版本号与 `package.json` 一致。
- 不轻信子代理或搜索工具的否定结论；以实际文件读取与命令输出为准。
<!-- OPENSPEC:END -->
