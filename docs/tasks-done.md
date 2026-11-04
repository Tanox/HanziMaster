# 已完成任务归档 · Tasks Done

> 文档版本：v5.2.31（与项目版本同步，权威版本见 `package.json`）
> 归档时间：2026-11-04 19:50（UTC+8）

## 说明

- 本文件归档 `docs/tasks.md` 中**已完成**的任务及其实现要点，作为唯一完成记录。
- 新增 / 进行中任务仍记录于 [tasks.md](tasks.md)；任务完成后移入本文件并注明完成版本。

## 归档（2026-11-04 批次）

| ID | 任务 | 分类 | 完成版本 | 实现要点 |
|----|------|------|---------|---------|
| T1 | 空状态 / 错误状态设计稿与代码实现 | UI/UX | v5.2.31 | `src/components/state/state-views.tsx`（EmptyState / ErrorState / LoadingSpinner）；全局 `src/app/error.tsx`、`not-found.tsx`、`loading.tsx`；学习页无选中时 EmptyState 兜底 |
| T2 | 焦点状态视觉增强 | UI/UX | v5.2.31 | `globals.css` 全局 `focus-visible`：2px `--color-ring` 描边 + 4px color-mix 光环（深色模式 38%） |
| T4 | React 组件与交互层测试 | 测试 | v5.2.31 | 安装 `@testing-library/react` / `jest-dom` / `user-event` / `jsdom`；新增 4 个测试文件（state-views / use-progress / use-pronunciation / character-grid），共 47 用例；vitest 环境切 jsdom，`vitest.setup.ts` 内存 Storage 兜底（规避 Node 24 实验性 localStorage getter 遮蔽）；`storage.ts` 改用 `window.localStorage` |
| T5 | 滚动出现动画扩展 | UI/UX | v5.2.31 | `reveal` 扩展至汉字网格与练习选项网格（复用既有 IntersectionObserver hook） |
| T6 | 移动端抽屉手势与触控区域 | UI/UX | v5.2.31 | `src/hooks/use-swipe-close.ts`（右滑 > 60px 关闭抽屉）；关闭 / 导航按钮保持 44px 触控目标 |
| T7 | 加载 / 反馈动画增强 | UI/UX | v5.2.31 | 路由级 `loading.tsx` 旋转指示；练习 / 测验 `use-haptic.ts` 震动反馈（正确 30ms / 错误 40-60-40ms）；按钮波纹为可选项未实现——按压反馈已由 button `active` 位移态覆盖 |
| T8 | 设计规范文档补充 | 文档 | v5.2.31 | `prototype/DESIGN_SPEC.md` 新增 §3.5「组件状态规范」（悬停 / 按压 / 禁用 / 焦点 / 选中 / 加载）与排版微调说明 |
| T9 | 键盘快捷键提示 | UI/UX | v5.2.31 | 学习页 ← / → 切换汉字（弹窗打开或组合键时忽略）+ `.kbd` 键位提示（11 语言 `learn.kbdHint`） |
| T10 | 卡片悬停微缩放 / 导航下划线 | UI/UX | v5.2.31 | 字符卡 `hover:scale-[1.03]`、`active:scale-[0.98]`；导航链接平滑下划线动画（origin-left scaleX） |
| T11 | 字符选择过渡 / 导航高亮平滑 | UI/UX | v5.2.31 | 详情面板按 `key` 重挂载重放 `animate-fade-in-elegant`；导航 active 下划线过渡 |
| T12 | color-mix 派生强调色 | UI/UX | v5.2.31 | `@theme` 新增 `--color-primary-hover / --color-primary-border`（color-mix 单一来源派生），字符卡 / 练习选项边框接入 |
| T13 | 排版微调 | UI/UX | v5.2.31 | h1–h3 统一 `-0.01em` 字间距；移动端（≤640px）小字号行高 ≥ 1.65 |
| T14 | 原型图增强 | 原型 | v5.2.31 | `wireframes.html` 新增 §3.5 状态可视化（强制态演示 / 状态组件 / 动画帧重播）+ 断点指示器（`wireframes-part2.css` / `wireframes-states.js`）；深色模式预览由既有 theme 切换支持 |

> T3（安全审计与修复）视复验结果保留在 [tasks.md](tasks.md)。
