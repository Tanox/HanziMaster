<!--
感谢为 HanziMaster 汉字大师 提交 Pull Request！
提交前请阅读 CONTRIBUTING.md 与 docs/git-workflow.md §5（代码审查流程）。
本模板是检查清单，不定义规则；规则以 docs/ 下权威文档为准。
-->

## 变更总结 (Summary)

<!-- 简明描述本次 PR 做了什么；一个 PR 只做一件事 -->

-

## 动机 (Motivation)

<!-- 为什么需要这个变更？关联 issue（如 Closes #123）与 docs/tasks.md 任务 ID -->

-

## 变更类型 (Type)

与提交信息的 type 一致（`docs/commit-template.md`）：

- [ ] `feat` 新功能
- [ ] `fix` 缺陷修复
- [ ] `docs` 文档变更
- [ ] `refactor` 代码重构
- [ ] `style` 代码格式（不影响功能）
- [ ] `perf` 性能优化
- [ ] `test` 测试变更
- [ ] `build` / `chore` 构建、依赖或杂项
- [ ] `ci` CI/CD 变更

## 测试说明 (Testing)

<!-- 逐条写明实际执行的命令与结果；本机绕过 pnpm 时注明等价 Node 命令 -->

- [ ] `pnpm lint` 0 error / 0 warning
- [ ] `pnpm exec tsc --noEmit` 0 error
- [ ] `pnpm test` 全部通过
- [ ] `pnpm check:lines` 输出 `all <= 200`
- [ ] `pnpm security:audit` 无生产依赖高危漏洞
- [ ] `pnpm build` 成功
- [ ] 手动验证相关页面 / 功能（含深色模式、11 语言切换、移动端）

## 规范检查清单

依据 `docs/coding-standards.md` 与 `docs/git-workflow.md` §4：

- [ ] 命名 / 目录 / 文件头注释符合编码规范，单文件 ≤ 200 行
- [ ] 用户可见文本全部走 `t()`，新增键已同步 11 个语言文件
- [ ] 使用设计 token（`var(--color-*)`），无硬编码色值、`rounded-[Npx]`、`transition-all`
- [ ] 主要容器与关键 DOM 有唯一 kebab-case 语义化 id，列表渲染无重复 id
- [ ] 无 `any` / `console.log` / `debugger` / 密钥 / Token / 未处理 Promise 异常
- [ ] 涉及状态持久化时沿用 `src/lib/storage.ts` 的 schema 校验
- [ ] 无障碍：语义化 HTML、ARIA 关联、键盘导航、`focus-visible`、`prefers-reduced-motion`

## 版本与文档检查清单

依据 `docs/coding-standards.md` §3 与 `docs/index.md` §5：

- [ ] 已按 SemVer 升级版本号（最小 patch），提交正文/页脚标注新版本号
- [ ] `package.json` / `metadata.json` / `README.md` / `README_EN.md` 版本已同步
- [ ] `CHANGELOG.md` 已新增对应版本小节
- [ ] 本次改动源码的头注释与文档版本戳已更新（未改动文件不批量刷写）
- [ ] 行为变更已同步 `docs/` 权威章节、原型与 `docs/alignment-checklist.md`
- [ ] 文档内部链接有效、术语统一；任务状态写入 `docs/tasks.md`

## 审查记录

<!-- 审查者填写：[阻断] 意见是否全部关闭；门禁是否全绿；是否批准合并 -->

- [ ] 至少 1 名非作者审查并批准
- [ ] 所有 `[阻断]` 意见已关闭
- [ ] 合并后删除源分支（`hotfix/*` 须回合 `develop`）

## 关联 Issue

<!-- Closes #123 -->
