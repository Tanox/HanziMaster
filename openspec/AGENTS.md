<!-- OPENSPEC:START -->
# OpenSpec Instructions

Instructions for AI coding assistants working in this project.

> 注：本项目**未接入 openspec CLI**（无 `specs/`、`changes/`、`archive/` 目录），规范以 `openspec/*.md` 文档形式维护。以下为项目实际协作约定。

## 开始任何任务前

- **版本基准**：读取 `package.json` 的 `version` 字段（权威单一来源，当前 v5.2.10）确认真实版本，勿凭旧记忆。
- **规范文档**：相关任务先读 `openspec/` 目录下对应文档：
  - 项目概述：`01-overview.md`
  - 技术架构：`02-architecture.md`
  - 开发指南：`03-development.md`
  - API 参考：`04-api-reference.md`
  - 部署指南：`05-deployment.md`
  - 测试规范：`06-testing.md`
  - 设计系统（权威）：`07-design-prototype.md`
  - 编码规范：`coding-standards.md`
  - 提交规范：`commit-template.md`
  - 对齐检查：`alignment-checklist.md`
  - 项目约定：`project.md`
- **设计原型**：`prototype/prototype.html` 为唯一权威高保真原型。

## 关键约定

1. **源文件 ≤ 200 行**：超限按职责拆分（组件 / hooks / utils / types / constants 分别成文件）。
2. **语义化 id**：主要容器、区块、关键 DOM 元素添加 kebab-case 语义化 id。
3. **版本号规则**：任意修改 bump 最小版本号（patch ≥ +1）。同步位置：被改文件头注释（`// <路径> vX.Y.Z`）、`package.json` version、`metadata.json` name/version、`README/README_EN` 标题与页脚、i18n `common.appVersion`（仅当涉及）、CHANGELOG 新增小节。未改动文件头注释不批量刷写。
4. **设计令牌单一来源**：`globals.css @theme`。禁止内联色值、`rounded-[Npx]` 任意值、`transition-all`。
5. **i18n 类型安全**：`t()` 键须在 11 语言包中一致，且受 `TranslationKey` 联合类型约束。
6. **质量门禁**：权威类型验证用 `node ./node_modules/typescript/bin/tsc --noEmit`（勿用 `npx tsc`）。

## 决策流程

- **规范创建 / 修改**：本项目采用「文档先行」而非 CLI 提案流程——涉及新能力、破坏性变更、架构调整时，先更新或新增 `openspec/*.md` 对应章节，再实现代码，最后更新 `alignment-checklist.md` 与 CHANGELOG。
- **复杂任务**：5+ 文件变更 / 新增依赖 / 架构调整时，先输出规格说明（需求、方案、设计）获得确认后再进入实现。

## 提交规范

- 格式：`<type>: <description>`，type ∈ feat/fix/docs/style/refactor/perf/test/build/ci/chore。
- 正文/页脚标注新版本号；禁止 `console.log`/`debugger`。

## 验证

- 改动后运行 `tsc --noEmit` 确认类型通过。
- 文档改动须保证内部链接有效、版本号与 `package.json` 一致。
<!-- OPENSPEC:END -->
