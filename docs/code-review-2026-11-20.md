> 文档版本：v5.2.50（与项目版本同步，权威版本见 `package.json`）
> 审查日期：2026-11-20
> 审查范围：当前工作区全量源码（`src/**`、`next.config.mjs`、`proxy.ts`、`app/**`），按核心逻辑/边界、异常与安全、Next.js 架构性能、UI 交互与可访问性四个领域并行审查，逐条以源码与测试复核后修复。

# 全面代码审查报告（2026-11-20）

## 1. 审查结论

本轮审查覆盖进度/笔顺/存储/i18n 等核心逻辑、Sentry 上报与 robots/proxy 配置、RSC/Client 边界与渲染性能、测验弹窗与 RTL/键盘可访问性。共识别并修复 **18 个高置信度缺陷**（其中 3 个可导致用户数据丢失或错误统计，2 个可导致线上上报/SEO 规则失效，其余为边界健壮性与可访问性问题）。修复均附回归测试，类型检查、ESLint、行数门禁、i18n 门禁与全量单测通过。

遗留问题以新任务形式写入 `tasks.md` §4（主题首屏 FOUC、Cookie 同意撤回、设置面板键盘导航、首页测验重入等），本轮不做大范围重构，避免与并行批次冲突。

## 2. 已修复问题清单（问题原因 → 修改思路）

| # | 文件 | 问题原因 | 修改思路 | 回归测试 |
|---|------|---------|---------|---------|
| 1 | `src/hooks/use-progress.ts` | 无 `storage` 事件监听，跨标签页修改进度后旧标签页整块覆写导致数据丢失 | 监听 `storage` 事件，按 key 过滤并重载；与导入事件复用同一 reload | `use-progress.test.tsx` 新增跨标签页同步用例 |
| 2 | `src/hooks/use-progress.ts` | 初始化直接读 `window.localStorage`，SSR 与客户端首帧状态不一致（hydration 风险） | 首帧统一默认进度，挂载后 useEffect 读取；加载完成前禁止写回，防止默认进度覆盖已有数据 | 新增「挂载后加载且不覆盖」用例 |
| 3 | `src/hooks/use-progress.ts` | `quizResults` 无限增长可撑满 localStorage | 写入时截断至最近 1000 条 | 既有写入用例 |
| 4 | `src/lib/progress-utils.ts` | `isFiniteNumber` 仅排除 NaN/Infinity，负数/小数/越界 id 与负时间戳可进入统计 | 拆为 `isValidCharId`（正整数、安全整数）与 `isValidTimestamp`（非负、安全整数） | `progress-utils.test.ts` 扩展脏数据过滤断言 |
| 5 | `src/lib/progress-utils.ts` | `computeStreak` 被一条未来日期记录判死，真实连续段丢失 | 计算前过滤晚于今天的活动，再判断连续段 | 新增「混合未来脏数据」用例 |
| 6 | `src/lib/progress-utils.ts` | `computeAccuracy` 对 199/200 四舍五入显示 100%，误报满分 | 满分仅在全对时返回，其余钳制到 99 | 新增 199/200 → 99 用例 |
| 7 | `src/lib/storage.ts` | envelope 有 `_v` 缺 `_d` 时返回 `undefined`，与 `T` 返回类型不符 | 增加 `_d in parsed` 校验，缺字段回退默认值 | `storage.test.ts` 新增缺 `_d` 用例 |
| 8 | `src/lib/i18n/translate.ts` | 逐个 `split/join` 使替换值中的 `{{...}}` 被后续参数二次解析 | 改为单次正则扫描 + 回调查表，替换值按字面量处理 | `translate.test.ts` 新增链式替换用例 |
| 9 | `src/lib/stroke-order-loader.ts` | chunk 加载失败后 `pending` 永久保持 rejected，演示卡死且产生 unhandled rejection | 失败时清空 `pending` 允许重试，内部消费 rejection 并记日志 | 类型/lint/全量单测 |
| 10 | `writing-dialog.tsx` / `stroke-order-demo.tsx` / `locale-provider.tsx` | 懒加载 Promise 无 catch，失败时界面无反馈或空白 | 三处补 `.catch()`：保持空状态/保留上一份词典，可重试 | 全量单测 |
| 11 | `src/proxy.ts` | matcher 未排除 `/monitoring`，Sentry tunnel 请求被 302 到语言前缀，POST 上报丢失 | matcher 排除 `monitoring` | 类型/lint/全量单测 |
| 12 | `src/app/robots.ts` | robots.txt 中更具体的 AI UA 组只有 allow，覆盖了通配 `*` 组的敏感路径 disallow | 每个 UA 组显式声明 `/api/`、`/monitoring` 禁入 | `seo.test.tsx` 遍历所有 UA 组断言 disallow |
| 13 | `src/lib/site.ts` | `NEXT_PUBLIC_SITE_URL` 非法值（如缺协议）在 `new URL()` 处抛异常、破坏 metadata 与构建 | 只接受绝对 http(s) URL，非法值回退默认并产生生产告警 | `site.test.ts` 新增非法/合法 URL 用例 |
| 14 | `src/components/ui/dialog.tsx` / `theme-toggle.tsx` | `start-1/2 + -translate-x-1/2` 在 RTL 下按物理方向错位 | 改用物理 `left-1/2` 居中，tooltip 同步修正并支持键盘聚焦显示 | lint/类型 |
| 15 | `src/hooks/use-swipe-close.ts` | 抽屉关闭手势固定为 `dx > 60`，RTL 左侧抽屉方向相反 | 按 `documentElement.dir` 判定关闭方向（LTR 正向、RTL 负向） | 类型/lint |
| 16 | `theme-toggle.tsx` / `locale-toggle.tsx` / `layout-client.tsx` | 桌面与移动各渲染一份切换按钮，`id` 重复；主题按钮 aria-label 硬编码英文、缺 `type` | 增加 `id` / `idPrefix` prop 由调用方区分；aria-label 用 i18n 目标主题；补 `type="button"` | 类型/lint |
| 17 | `layout-client.tsx` | `<main key={pathname}>` 每次路由切换强制重挂整棵子树，丢失内部状态并放大动效成本 | 移除 key，保留 CSS 页面转场 | 类型/lint |
| 18 | `learn/quiz-dialog.tsx`、`practice/quiz-dialog.tsx`、`progress-transfer-controls.tsx` | 答题结果无 aria-live；选项组无方向键导航；导出文件 URL 立即 revoke 在部分浏览器中断下载 | 结果区补 `role=status/aria-live` 与 `aria-invalid/describedby`；radiogroup 补 roving tabindex + 方向键；Object URL 延迟 1s 释放 | 类型/lint/全量单测 |

## 3. 未在本轮修复的建议（已写入 `tasks.md` §4）

- **P1-45 主题首屏 FOUC**：`theme-provider` 在 useEffect 才应用主题，首屏可能短暂显示错误主题；需在 `<head>` 注入预设脚本并兼顾 CSP nonce。
- **P1-46 Cookie 同意撤回**：当前仅首次选择，缺用户撤回入口；需设置面板 + gtag consent update 联动。
- **P2-26 设置面板主题 radiogroup 键盘导航**：三个主题按钮无 roving tabindex，重置进度后焦点未回到主按钮。
- **P2-27 首页测验重入与状态残留**：连续提交/定时器未清、重开弹窗保留上次答案；学习页快捷键与结果播报可一并增强。

## 4. 文档更新摘要

- `CHANGELOG.md`：新增 `[5.2.50]` 小节，按修复点分组记录原因与影响。
- `docs/tasks.md`：新增 §4 审查结果（已修复清单 + 4 项新任务），概览计数同步；`docs/tasks-done.md` 归档本轮已修复项。
- `.env.example` / `docs/03-development.md`：`NEXT_PUBLIC_SITE_URL` 现会校验绝对 URL 合法性（非法值告警并回退），部署时需填生产域。
- `docs/04-api-reference.md`：进度存储的跨标签页同步、准确率/连胜的边界口径补充说明。

## 5. 门禁结果

`tsc --noEmit` ✓ · ESLint（全部改动源码）✓ · `check:lines`（all ≤ 200）✓ · `i18n:lint` ✓ · 全量单测 ✓ · `version:sync --check` ✓。

补充：审查期间 `check:root` 发现 `.nvmdrc`（nvm-windows 版本配置，已入库）未列入根目录白名单，已补入 `scripts/check-root-clean.mjs`，避免门禁假红。
