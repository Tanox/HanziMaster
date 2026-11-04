# HanziMaster 文档中心

> 文档版本：v5.2.34（与项目版本同步，权威版本见 `package.json`）

本目录是项目**规范文档的唯一存放位置**（`docs/` 共 16 篇）。本文给出文档分层、单一职责矩阵、术语与格式约定；根级 README / CONTRIBUTING 只是入口摘要，不另立规则。

## 1. 文档分层

| 层 | 位置 | 职责 | 更新频率 |
|----|------|------|---------|
| 入口层 | `README.md` / `README_EN.md` / `CONTRIBUTING.md` / `CONTRIBUTING_EN.md` | 快速开始、功能介绍、贡献入口与规范链接 | 功能/版本变更时 |
| 规范层 | `docs/*.md` | 架构、开发、编码、提交、Git 工作流、测试、部署、设计系统 | 规则变更时 |
| 状态层 | `docs/tasks.md` / `tasks-done.md` / `alignment-checklist.md` | 未完成任务（唯一来源）、完成归档、对齐现状 | 任务状态变更时 |
| 原型层 | `prototype/*.html` + `prototype/styles/` + `prototype/scripts/` + `prototype/DESIGN_SPEC.md` | 高保真原型与原型交付规范 | 设计变更时 |
| 归档层 | `prototype/UI_UX_REVIEW.md` / `OPTIMIZATION_SUMMARY.md` / `PROJECT_STRUCTURE.md` / `CHANGELOG.md` 历史条目 | 历史记录，按「历史记录不篡改」保留原文 | 不回改 |
| 协作层 | `docs/AGENTS.md` / `docs/project.md` / `.github/*` | AI 协作约定、项目上下文、社区文件与 PR 模板 | 约定变更时 |

> `openspec/` 目录已在 v5.2.28 整体合并迁入 `docs/` 并删除。CHANGELOG 历史条目与归档文档中的 `openspec/` 路径属于历史叙述，**保留原样，不要批量替换**，也不视为断链。

## 2. 文档索引与单一职责矩阵

「某类问题只在一个文档里定义」，其他文档只写摘要并链接到权威文档。

| 文档 | 唯一负责的内容 | 不得写入 |
|------|---------------|---------|
| [index.md](index.md)（本文） | 文档分层、单一职责矩阵、术语与格式、版本戳规则 | 具体技术规则、任务 |
| [01-overview.md](01-overview.md) | 项目定位、功能范围、技术栈版本、仓库目录树 | 编码规则细则、任务 |
| [02-architecture.md](02-architecture.md) | 架构分层、模块职责、数据流、技术选型理由 | API 参数表、部署步骤 |
| [03-development.md](03-development.md) | 环境搭建、命令表、日常开发流程、版本注入链路 | 命名/格式规则细则（→ 编码规范） |
| [04-api-reference.md](04-api-reference.md) | 组件 / hooks / i18n 模块公开 API 与类型 | 设计 token 完整色板（→ 设计规范） |
| [05-deployment.md](05-deployment.md) | Vercel / EdgeOne 配置与部署、上线检查 | 质量门禁定义（→ 编码规范） |
| [06-testing.md](06-testing.md) | Vitest 配置、测试组织、编写与覆盖率现状 | 门禁命令定义（→ 编码规范） |
| [07-design-prototype.md](07-design-prototype.md) | 设计系统、色板/字体/间距/动效、原型文件索引 | 代码实现细节 |
| **[coding-standards.md](coding-standards.md)** | **编码风格、命名约定、目录组织、token 使用、i18n、行数、版本同步、质量门禁** | 分支与审查流程 |
| **[commit-template.md](commit-template.md)** | **提交信息格式、type 表、示例、`.gitmessage` 模板** | 分支策略、PR 流程 |
| **[git-workflow.md](git-workflow.md)** | **分支模型、开发流程、PR、代码审查、发版流程** | 提交信息格式细则 |
| [AGENTS.md](AGENTS.md) | AI 助手在本仓库的协作约定（含工具标记） | 重复定义规范 |
| [project.md](project.md) | 面向工具链的英文项目上下文摘要 | 独立结论（须与本文一致） |
| [alignment-checklist.md](alignment-checklist.md) | 规范—原型—代码对齐现状与差异 | 待办清单（→ tasks.md） |
| [tasks.md](tasks.md) | **所有未完成任务 / 改进 / backlog 的唯一来源** | 已完成任务 |
| [tasks-done.md](tasks-done.md) | 已完成任务归档（完成版本 + 实现要点） | 未完成任务 |

补充入口：根 `README.md` / `README_EN.md` 为项目说明；`CONTRIBUTING.md` / `CONTRIBUTING_EN.md` 为贡献入口；`.github/PULL_REQUEST_TEMPLATE.md` 为 PR 检查清单；`prototype/DESIGN_SPEC.md` 为原型交付侧细化规范；`CHANGELOG.md` 为变更日志。

## 3. 快速导航

**新人**：[01-overview.md](01-overview.md) → [03-development.md](03-development.md) → [coding-standards.md](coding-standards.md) → [git-workflow.md](git-workflow.md) → [06-testing.md](06-testing.md)。

**写代码前**：[coding-standards.md](coding-standards.md)（命名/目录/token/i18n）+ [04-api-reference.md](04-api-reference.md)（现有 API）。

**提交前**：[commit-template.md](commit-template.md) → [coding-standards.md](coding-standards.md) §11 → [git-workflow.md](git-workflow.md) §4。

**发版前**：[coding-standards.md](coding-standards.md) §3 → [git-workflow.md](git-workflow.md) §6 → [05-deployment.md](05-deployment.md)。

**设计/原型**：[07-design-prototype.md](07-design-prototype.md)（权威设计系统）+ `prototype/prototype.html`（唯一权威高保真原型）+ `prototype/DESIGN_SPEC.md`。

## 4. 术语与格式约定

全仓库统一用词，禁止同义混用：

| 标准术语 | 含义 | 禁用/易混写法 |
|---------|------|--------------|
| HanziMaster 汉字大师 | 产品名 | Hanzi Master、汉字大师 App |
| 版本权威源 | `package.json` 的 `version`，运行期由 `next.config.mjs` 注入 | VERSION 文件、`common.appVersion`（不存在） |
| 文档版本戳 | 文档头部 `> 文档版本：vX.Y.Z（与项目版本同步，权威版本见 package.json）` | 正文里散落的「更新至 vX.Y.Z」 |
| 源文件头注释 | `// <相对路径> vX.Y.Z`，仅源码 | 文档里写文件头注释 |
| Conventional Commits | `<type>: <description>` 提交格式 | Angular 提交规范（可作括注，不作正式名） |
| 质量门禁 | 类型检查 / Lint / 单测 / 行数 / 安全审计 / 构建 | 校验、检查脚本混称 |
| 设计令牌（design token） | `globals.css @theme` 语义 token + `tailwind.config.ts` 扩展色阶 | 「单一 token 来源」（实为双重来源，职责不同） |
| 东方水墨·朱砂红 | 设计系统名 | Apple Blue、emerald、Apple-HIG（仅历史记录中出现） |
| 高保真原型 | `prototype/prototype.html`（唯一权威） | 把 `wireframes.html` 称为唯一权威 |
| 任务清单 | `docs/tasks.md`，所有待办的唯一来源 | 在其他文档维护待办表 |
| 对齐清单 | `docs/alignment-checklist.md`，记录现状差异 | 把它当任务清单 |
| pnpm | 唯一包管理器，命令一律写 `pnpm <script>` | 文档中出现 `npm run <script>`（平台配置文件内的平台命令除外，见 §6） |

格式约定：

- 文档标题用一级 `#`；正文用 `##` / `###` 逐级编号；表格优先于长段落描述规则。
- 代码、路径、命令、字段名一律用反引号；中英文之间留空格；中文用全角标点。
- 链接用相对路径；引用 `src/` 与根级文件从 `docs/` 出发写 `../src/...`。
- 中文文档为主，`README_EN.md` / `CONTRIBUTING_EN.md` 为英文镜像，内容须与中文版同步。
- 文档文件保持单文件完整，**不因超过 200 行而拆分**（200 行规则仅适用于源码）。

## 5. 版本戳规则

- 产品版本的唯一权威源是 `package.json` 的 `version`（当前 `5.2.34`）。文档版本戳只是「该文档最后修订时对应的项目版本」的展示位，**不是第二权威源**。
- **只更新本次实际改动的文档**的版本戳；未改动文档保留原戳是合法的，不得为了「看起来一致」批量刷写全部文档。
- 全局展示位（`package.json` / `metadata.json` / `README.md` / `README_EN.md` / `CHANGELOG.md`）每次发版必须同步，见 [coding-standards.md](coding-standards.md) §3。
- 发版前用 `node -e "console.log(require('./package.json').version)"` 实查真实版本，勿按会话记忆或旧快照填写。

## 6. 关于 `npm` 字样

项目强制 pnpm（`preinstall: npx only-allow pnpm`、`.npmrc` 的 `engine-strict` / `package-manager-strict`），因此**所有面向开发者的文档命令一律写 `pnpm`**。仅以下位置允许出现 `npm`，且属平台内部命令，不应被误改：

- `edgeone.json` 的 `installCommand`（`npm install -g pnpm@11 && pnpm install`）与 `buildCommand`（`npm run build`）——由 EdgeOne 构建器执行，平台内部已切到 pnpm。
- `package.json` 的 `preinstall`（`npx only-allow pnpm`）。
- `CHANGELOG.md` 历史条目中对旧命令的引用（历史记录不篡改）。

## 7. 维护约定

- 新增规范先判断归属：能放进现有权威文档的加章节，不要另建重复文档；确需新建时同步更新本文 §2 矩阵与 [AGENTS.md](AGENTS.md) 清单。
- 代码行为变更时，同批次更新受影响的规范文档、原型与 [alignment-checklist.md](alignment-checklist.md)，并在 `CHANGELOG.md` 记录。
- 任务/待办只写 [tasks.md](tasks.md)；完成后移入 [tasks-done.md](tasks-done.md)。
- 文档改动同样触发一次最小版本 bump，并给改动文档补版本戳。
