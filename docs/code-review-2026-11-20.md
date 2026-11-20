> 文档版本：v5.2.51（与项目版本同步，权威版本见 `package.json`）
> 审查日期：2026-11-20
> 审查范围：当前工作区全量源码（`src/**`、`next.config.mjs`、`proxy.ts`、`app/**`、`.github/workflows/**`、`scripts/**`、配置文件与测试），按核心逻辑/边界、异常与安全、CI/配置、UI 交互与可访问性、测试有效性多维并行审查，逐条以源码与测试复核后修复。

# 全面代码审查报告（2026-11-20）

## 1. 审查结论

两轮审查共识别并修复 **45 个高置信度缺陷**：第一轮 18 项（进度/笔顺/存储/i18n 核心逻辑、Sentry/robots/proxy 配置、RTL/可访问性/性能），第二轮 27 项（CI/Release 工作流、生产 SEO fail-closed、语言协商、存储假成功、边界与资源清理、门禁与测试假阳性）。两轮修复均附回归测试或门禁验证；`tsc --noEmit`、ESLint、`check:lines`、`i18n:lint`、`version:sync --check`、`check:root` 与全量单测（36 文件 / 197 用例）通过。

遗留问题以新任务形式写入 `tasks.md` §4（主题首屏 FOUC、Cookie 同意撤回、首页测验重入），本轮不做大范围重构，避免与并行批次冲突。

## 2. 第一轮已修复问题清单（18 项）

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
| 18 | `learn/quiz-dialog.tsx`、`practice/quiz-dialog.tsx`、`progress-transfer-controls.tsx` | 答题结果无 aria-live；选项组无方向键导航；导出文件 URL 立即 revoke 在部分浏览器中断下载 | 结果区补 `role=status/aria-live` 与 `aria-invalid/describedby`；radiogroup 补 roving tabindex + 方向键；Object URL 延迟 1s 释放 | 类型/lint/全量单测（practice 的 tabindex 条件在第二轮补正，见下表 #6） |

## 3. 第二轮已修复问题清单（27 项，按严重程度排序）

### 3.1 高 severity（阻断 / 安全 / 线上事故复发）

| # | 位置 | 描述 | 修复方案 |
|---|------|------|---------|
| 1 | `.github/workflows/ci.yml` e2e job | `e2e/` 在 v5.2.57 已整体删除，CI 仍 `pnpm e2e` 并安装 Playwright，job 必失败 | 删除该 job，CI 只保留可执行的 quality / coverage |
| 2 | `.github/workflows/release.yml` 解析 Tag 步骤 | `workflow_dispatch.inputs.tag` 直接插入双引号 shell 字符串，可注入任意命令 | 经 `env.INPUT_TAG` 传值，shell 只引用环境变量 |
| 3 | `.github/workflows/release.yml` 门禁校验 | 用 `context.sha` 查询 CI/Deploy 运行记录；手动触发时该值是默认分支 HEAD，导致发布错 commit | checkout 后新增 `git rev-parse HEAD` 步骤，门禁以实际被发布 commit 为准 |
| 4 | `.github/workflows/release.yml` 门禁 job 清单 | 仍要求已删除的 `e2e` job 为 success，Release 永远无法满足 | 清单改为 `quality` / `coverage` |
| 5 | `next.config.mjs` SITE_URL 校验 | 生产漏配仅 `process.emitWarning`，线上已出现 canonical / hreflang / sitemap / robots 全为 localhost（tasks P0-30） | 生产构建期 fail-closed：缺失、非法协议、带 query/hash 或重复尾斜杠均 `throw`，阻断发布 |
| 6 | `src/components/practice/quiz-dialog.tsx:91` | 第一轮 #18 的 roving tabindex 条件写成 `selectedAnswer === null`，但实际初值为 `''`，条件恒 false，键盘用户无法 Tab 到任何选项 | 改为 `selectedAnswer === ''`，并补「未作答首项可聚焦」回归测试 |

### 3.2 中 severity（逻辑错误 / 资源与门禁盲区）

| # | 位置 | 描述 | 修复方案 |
|---|------|------|---------|
| 7 | `src/lib/consent.ts` | `safeSetItem` 丢弃写入结果；localStorage 满/隐私模式下仍广播同意成功，统计模块误判 | 改用 `trySetItem`，仅在成功时广播，函数返回真实结果 |
| 8 | `src/lib/settings.ts` / `settings-dialog.tsx` | 设置保存失败静默，UI 仍切换为「已保存」状态 | `saveSettings` 返回 boolean；失败时 `toast.error` 且不更新 UI |
| 9 | `src/hooks/use-pronunciation.ts` | 部分 WebView 只暴露 `speechSynthesis`、不暴露 `SpeechSynthesisUtterance` 构造器，`new` 抛 ReferenceError | 检测构造器存在并 try/catch，降级为错误提示 |
| 10 | `src/lib/request-locale.ts` / `proxy.ts` | Accept-Language 解析忽略 `q` 权重，`en;q=0.1,ar;q=0.9` 会错误选 en | 新增 `negotiateLocales`，按 q 降序 + 原序稳定排序，精确标签先于主干匹配 |
| 11 | `src/app/manifest.ts` | PWA manifest 首访无 cookie 时语言恒为默认，忽略浏览器语言 | 复用 `negotiateLocales` 按 Accept-Language 选择 `lang` / `dir` |
| 12 | `src/lib/site.ts` | `normalizeSiteUrl` 接受 query / hash / 重复尾斜杠，拼接 sitemap URL 时产生畸形地址 | 拒绝上述形式并去除所有尾斜杠；补 `site.test.ts` 断言 |
| 13 | `scripts/check-bundle-size.mjs` | 硬编码 `.next`，与 `NEXT_DIST_DIR` 构建产物不一致时会校验旧目录 | 读取 `process.env.NEXT_DIST_DIR \|\| '.next'` |
| 14 | `scripts/i18n-lint.mjs` | 占位符按「文件整体集合」比较，同文件中跨键互换检测不到；9 个扩展模块完全不检查占位符 | 基准包按键比较；扩展模块按顶层 locale 块比较 |
| 15 | `src/lib/__tests__/i18n.test.ts` | 断言作用于已回退的合并词典，某语言扩展模块缺键会被 en 回退掩盖 | 直接导入 9 个扩展模块，逐语言比对 `Object.keys` |
| 16 | `src/lib/__tests__/progress-utils.test.ts` | 所谓 DST 测试用本地日历构造日期，runner 时区通常非美国，从不覆盖夏令时（假阳性） | 改用固定 UTC 时刻断言 UTC 日序号连续性 |
| 17 | `src/lib/__tests__/storage.test.ts` | mock `Storage.prototype.setItem`，但 jsdom localStorage 用自有方法遮蔽原型，配额异常从未触发（假阳性） | mock 实例方法并加 try/finally 还原 |
| 18 | `scripts/check-line-count.mjs` | 结尾换行产生空字符串被计为一行，恰好 200 行的源码被误判超限 | 统计前剔除末尾空行 |
| 19 | `edgeone.json` | `installCommand` 用 `pnpm@11`，与 `packageManager: pnpm@11.24.0` 不一致 | 固定为 11.24.0 |

### 3.3 低 severity（资源清理 / 可访问性 / 数据一致性）

| # | 位置 | 描述 | 修复方案 |
|---|------|------|---------|
| 20 | `src/components/toast.tsx` | 内层 300ms 退出计时器未纳入清理，Toast 卸载后仍调用 `onRemove` | 用 `useRef` 持有 timer，effect 清理与手动关闭共用同一引用 |
| 21 | `src/components/settings-dialog.tsx` | 主题 radiogroup 三个按钮无 roving tabindex / 方向键（tasks P2-26） | 选中项 `tabIndex=0`，方向键切换主题并移动焦点 |
| 22 | `src/hooks/use-swipe-close.ts` | 合成/辅助触控事件给出空 `touches` / `changedTouches` 时取 `[0]` 抛 TypeError | 检查数组长度，空则忽略手势 |
| 23 | `src/hooks/use-progress.ts` | 设置面板删除进度键后，hook 的写回 effect 又写入默认快照，键「复活」 | 空进度时 `safeRemoveItem`，补存储键保持删除的测试 |
| 24 | `src/components/pages/learn-page.tsx` | 全局 ← → 快捷键在输入框/文本域中仍切换汉字，打断文本编辑 | 排除 `INPUT` / `TEXTAREA` / `SELECT` / `contentEditable` 事件目标 |
| 25 | `src/app/global-error.tsx` | 错误页 `<html lang="zh-CN">` 硬编码，RTL 语言用户看到 LTR 错误页 | 从 proxy 写入的 locale cookie 恢复 `lang` / `dir`，畸形值回退默认 |
| 26 | `src/lib/i18n/translations/fr.ts` / `ja.ts` | 法语 `estudient` 拼写错误；日语多处混用中文「笔画」表述 | 改为 `étudient` / `毎日練習` / `画数` / `基本の画` / `画の習熟度` |
| 27 | `src/components/settings-dialog.tsx` | 加键盘导航后达 209 行，违反单文件 ≤200 行规则 | 按职责拆出 `settings-dialog-parts.tsx`（SwitchRow + sectionTitle） |

> 并行批次同期修复了 `pwa-install-prompt.tsx` 的 Promise 异常处理与 `characters-part1.ts` 的英文笔顺名混用，本报告不重复计入。

## 4. 未在本轮修复的建议（已写入 `tasks.md` §4）

- **P1-45 主题首屏 FOUC**：`theme-provider` 在 useEffect 才应用主题，首屏可能短暂显示错误主题；需在 `<head>` 注入预设脚本并兼顾 CSP nonce。
- **P1-46 Cookie 同意撤回**：当前仅首次选择，缺用户撤回入口；需设置面板 + gtag consent update 联动。
- **P2-27 首页测验重入与状态残留**：连续提交/定时器未清、重开弹窗保留上次答案；学习页快捷键与结果播报可一并增强。
- **设计权衡（非缺陷，未修）**：`next.config.mjs` 与 `edgeone.json` 重复声明安全头是 Vercel / EdgeOne 双平台兜底（tasks P1-32 要求）；Sentry 构建期与运行时 DSN 分工不同，均保持现状。

## 5. 文档与版本同步

- `CHANGELOG.md`：新增 `[5.2.51]` 小节，记录第二轮修复与 SITE_URL 由「告警回退」升级为「构建阻断」的行为变更。
- `.env.example` / `docs/05-deployment.md` / `docs/04-api-reference.md`：同步 `SITE_URL` 生产 fail-closed 语义（`site.ts` 的运行时告警回退仍是最后兜底）。
- `docs/tasks.md` §4：第二轮修复项登记；P2-26（设置面板键盘导航）标记完成。
- `package.json` / `metadata.json` / 两份 README：按最小版本规则 bump 至 v5.2.51 并同步展示位。

## 6. 门禁结果

`tsc --noEmit` ✓ · ESLint（`src` + `scripts`）✓ · `check:lines`（all ≤ 200）✓ · `i18n:lint`（11 locales / 9 扩展模块 / 170 键）✓ · `version:sync --check` ✓ · `check:root` ✓ · 全量单测 36 文件 / 197 用例通过 ✓。
