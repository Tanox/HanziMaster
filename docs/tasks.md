# 任务清单 · Task Backlog

> 文档版本：v5.2.31（与项目版本同步，权威版本见 `package.json`）
> 最后更新：2026-11-04 19:50（UTC+8）

## 0. 说明与规则（单一来源）

- **本文件是项目所有任务（待办 / 改进 / backlog）的唯一来源。** 其他文档仅保留流程性检查表（如部署前检查、测试前检查）与状态报告，**不再重复记录任务或待办清单**。
- 新增任务请直接加入下方对应优先级小节，并标注【来源】与【分类】；任务状态统一用 `待办 / 进行中 / 已完成` 标记。
- **已完成任务移入 [tasks-done.md](tasks-done.md) 归档**（含完成版本与实现要点），本文件只保留未完成任务。

> 背景：本清单由原先分散在 `ui-ux-review-report.md`、`06-testing.md`、`05-deployment.md`、`alignment-checklist.md` 的任务记录合并而来（v5.2.29）。2026-11-04 完成首批 14 项中的 13 项，归档见 [tasks-done.md](tasks-done.md)。

## 1. 高优先级（近期）

| ID | 任务 | 分类 | 来源 | 状态 |
|----|------|------|------|------|
| T3 | 安全审计与修复：`pnpm audit --audit-level=high` 清零高危项 | 部署/安全 | 05-deployment.md §5 | 进行中 |

**T3 进度记录（2026-11-04）**：
- ✅ `next` 16.2.9 → **16.2.11**（修复生产依赖高危公告）。
- ✅ `shadcn` CLI 移至 devDependencies（切断 `systeminformation` critical 公告到生产路径）。
- ✅ `pnpm-workspace.yaml` 声明 overrides，钉住 14 个传递依赖的补丁版本下限（sharp / undici / vite / zod / js-yaml 等）。
- ⏳ 剩余：dev 工具链内仍有少量 moderate / low 公告（不进入生产构建产物），随依赖升级持续消化；`pnpm audit --prod` 保持零高危后本任务关闭。

## 2. 中优先级（可排期）

_（当前为空——T5–T8 已于 v5.2.31 完成并归档至 [tasks-done.md](tasks-done.md)。）_

## 3. 低优先级（可选 / 长期）

_（当前为空——T9–T14 已于 v5.2.31 完成并归档至 [tasks-done.md](tasks-done.md)。）_

## 4. 已知约束（非任务，仅记录）

- 离线环境下 `next build` 会因 `next/font/google` 联网下载字体失败，属环境限制而非代码缺陷；可选引入字体 fallback 或自托管字体。
- 端到端（E2E）测试未接入；当前覆盖为 Vitest 单测 9 文件 / 47 用例（纯逻辑 + 组件交互层）。
- 应用无 AI 后端、无外部 API，仅 Google Fonts 为联网资源。
