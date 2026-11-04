# 任务清单 · Task Backlog

> 文档版本：v5.2.29（与项目版本同步，权威版本见 `package.json`）
> 最后更新：2026-11-04

## 0. 说明与规则（单一来源）

- **本文件是项目所有任务（待办 / 改进 / backlog）的唯一来源。** 其他文档仅保留流程性检查表（如部署前检查、测试前检查）与状态报告，**不再重复记录任务或待办清单**。
- 新增任务请直接加入下方对应优先级小节，并标注【来源】与【分类】；任务状态统一用 `待办 / 进行中 / 已完成` 标记。
- 完成任务后在此勾除并更新对应文档，不必在别处另记。

> 背景：本清单由原先分散在 `ui-ux-review-report.md`（UI/UX 改进建议）、`06-testing.md`（测试接入）、`05-deployment.md`（上线检查）、`alignment-checklist.md`（测试补充）的任务记录合并而来。2026-08-19 的 UI/UX 审查结论为「设计已达优秀水平，各检查项基本通过，仅空状态 / 错误状态建议补充」——该结论已吸收为下方 T1 / T2。

## 1. 高优先级（近期）

| ID | 任务 | 分类 | 来源 | 状态 |
|----|------|------|------|------|
| T1 | 补充空状态（EmptyState）与错误状态（ErrorState）的设计稿与代码实现；当前仅有加载态骨架屏 | UI/UX | ui-ux-review-report §4 / §5.1 | 待办 |
| T2 | 优化焦点状态视觉：增强 `focus-visible` 指示器，提升键盘导航可见性 | UI/UX | ui-ux-review-report §2.4.1 / §5.1 | 待办 |
| T3 | 部署 / 发版前执行安全漏洞检查：运行 `npm run security:audit`（即 `npm audit --audit-level=high`）并修复高危项 | 部署/安全 | 05-deployment.md §5 | 待办 |
| T4 | 补充 React 组件与交互层测试：安装 `@testing-library/react` 系列，覆盖 `useProgress`、`usePronunciation` 及关键 UI 组件（当前 Vitest 仅覆盖纯逻辑层） | 测试 | alignment-checklist §8.2 / 06-testing.md | 待办 |

## 2. 中优先级（可排期）

| ID | 任务 | 分类 | 来源 | 状态 |
|----|------|------|------|------|
| T5 | 滚动出现动画（IntersectionObserver） | UI/UX | ui-ux-review-report §2.2.1 / §5.2 | 待办 |
| T6 | 移动端抽屉：支持滑动手势关闭，并增大导航项触控区域 | UI/UX | ui-ux-review-report §2.3.2 / §5.2 | 待办 |
| T7 | 加载 / 反馈动画增强：旋转指示、按钮波纹、练习时微妙震动反馈 | UI/UX | ui-ux-review-report §2.2.2 / §5.2 | 待办 |
| T8 | 完善设计规范文档：补充栅格系统、间距刻度、组件状态（悬停 / 激活 / 禁用）说明 | 文档 | ui-ux-review-report §3.2 / §5.1 | 待办 |

## 3. 低优先级（可选 / 长期）

| ID | 任务 | 分类 | 来源 | 状态 |
|----|------|------|------|------|
| T9 | 键盘快捷键提示（如 Ctrl/Cmd+K 搜索） | UI/UX | ui-ux-review-report §2.4.1 / §5.3 | 待办 |
| T10 | 字符卡片悬停微缩放、导航下划线平滑动画 | UI/UX | ui-ux-review-report §2.4.2 | 待办 |
| T11 | 字符选择过渡动画、页面切换导航高亮平滑 | UI/UX | ui-ux-review-report §2.2.1 | 待办 |
| T12 | 基于设计 token 派生悬停 / 边框强调色（`color-mix` 单一来源） | UI/UX | ui-ux-review-report §2.1.1 | 待办 |
| T13 | 排版微调：大标题字间距、移动端小字（<12px）行高 | UI/UX | ui-ux-review-report §2.1.2 | 待办 |
| T14 | 原型图增强：深色模式预览、动画帧预览、响应式断点标注、组件状态展示 | 原型 | ui-ux-review-report §3.1 | 待办 |

## 4. 已知约束（非任务，仅记录）

- 离线环境下 `next build` 会因 `next/font/google` 联网下载字体失败，属环境限制而非代码缺陷；可选引入字体 fallback 或自托管字体。
- 本机未安装浏览器自动化依赖，未做端到端（E2E）测试；核心逻辑以 Vitest 覆盖（5 文件 / 31 用例）。
- 应用无 AI 后端、无外部 API，仅 Google Fonts 为联网资源。
