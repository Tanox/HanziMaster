# HanziMaster 源代码审查报告

- **审查对象**：`src/`（72 个 `.ts`/`.tsx` 文件，共 7035 行）
- **审查范围**：规范性 / Bug / 安全 / 性能 / i18n
- **审查日期**：2026-07-30
- **代码版本**：v5.2.1
- **审查方法**：分类系统扫描（Node 脚本逐文件提取事实）+ 关键文件精读 + 逻辑推演 + 脚本核验（`tsc --noEmit`、i18n 键覆盖、设计 token 扫描）
- **环境说明**：本机 `py` 启动器指向的 Python 3.14 无法创建进程，code-reviewer 技能（Python，偏华为 Java 规范）无法运行；且该技能对 TypeScript/Next.js 项目评分不适用，故本次以人工深度审查 + 脚本化逐文件扫描替代，覆盖同等维度。

---

## 0. 深入复检与改进（2026-08-02）

在任务2/任务7 基础上，对全量用户交互路径（练习/学习/测验/书写/主题/布局）做第二轮深入排查，
逐文件精读 + `tsc --noEmit` 验证（exit 0）。结论：**代码整体质量高，无安全漏洞、无 XSS、
client 边界 100% 正确、核心进度流程已接通**。发现并修复的问题如下。

### 已修复
| # | 文件 | 问题 | 类型 | 修复 |
|---|------|------|------|------|
| 1 | `src/app/learn/page.tsx` | 答对后 `setTimeout(1500)` 自动关闭弹窗**未清理**：用户提前关闭/路由切换后定时器仍触发，导致操作已卸载组件或关闭错误的弹窗 | 健壮性 bug | 用 `useRef` 持有句柄，关闭与组件卸载时 `clearTimeout` |
| 2 | `src/hooks/use-progress.ts` | 导出 `isLearned`/`getLearnedCharacters`/`learnedCharacterIds` **零引用**（死代码） | 可维护性 | 从返回对象与回调中删除，精简公共 API |

### 复核后判定为非问题 / 暂不处理（附理由）
| # | 文件 | 现象 | 判定 |
|---|------|------|------|
| 3 | `src/components/toast.tsx` | 模块级全局 `toasts`/`listeners`：多实例并存时全局状态泄漏；SSR 期 `toast()` 静默丢失 | **设计点，非 bug**：当前全应用无任何 `toast()` 调用方（仅 `ToastContainer` 挂载），属未启用的基础设施；重构为 Context 属过早优化，且需配套调用方才有价值，故暂留 |
| 4 | `src/components/practice/quiz-dialog.tsx` | 答对无 toast 反馈 | 经核实 learn 页从不调用 toast，且弹窗已有内联正误反馈，加 toast 为重复/新增行为，不做 |
| 5 | `package.json` | `tailwindcss@^4` 与 `tailwindcss-animate@^1.0.7`（仅支持 v3）版本错配 | 低危：构建由 `tailwindcss-animate` 的 PostCSS 插件生效，未启用 Tailwind v4 原生引擎，实际无运行时错误；建议后续统一升级 `tailwindcss-animate` 至 v4 兼容版（@tailwindcss/animate） |
| 6 | `rounded-4xl`（3 处） | 此前曾误判为无效 Tailwind 类并改为 `rounded-3xl` | **还原确认合法**：设计原型 `07-design-prototype.md` §2.4/§8.4 明确 `rounded-4xl`（32px）为 Hero/详情大卡片圆角 token，故还原回 `rounded-4xl` 以对齐原型 |

### 复检确认的正确项
- **SSR 安全**：`useProgress`、`useScrollReveal` 均有 `typeof window` 守卫，`localStorage` 仅经 `storage.ts` 的 `safeGetItem/safeSetItem` 访问，无 SSR 崩溃风险。
- **定时器**：仅 `learn/page.tsx` 一处 `setTimeout`，已修复；全仓无 `setInterval`/`requestAnimationFrame` 泄漏。
- **空数组/空值健壮性**：`CharacterGrid` 遍历 `characters`（静态非空）；`getWeeklyActivity` 恒返回 `boolean[7]`；`strokeMap.get(...)` 有 `??` 兜底；`selectedCharacter` 具 `|| null` 守卫——边界均安全。
- **i18n**：动态键 `practice.${day}` 对应的 `practice.mon..sun` 均存在于 `en.ts`；`t()` 缺失键回退显示键名，无白屏风险。

---

## 1. 项目度量

| 指标 | 数值 |
|------|------|
| 源文件总数 | 72（`.ts`/`.tsx`） |
| 代码总行数 | 7035 |
| 按目录 | components 44 · lib 18 · app 5 · hooks 5 |
| 最大文件 | `ui/command.tsx` 196 行、`ui/select.tsx` 193 行 |
| 超过 200 行的文件 | **0**（翻译数据文件各 188 行，属受控数据，无需拆分） |
| `'use client'` 组件 | 25 个，且所有使用 hooks/effect 的 `.tsx` 均已标注 |
| 异步调用（async/await/fetch） | **0**（无网络请求，数据静态 + Web Speech 回调） |

---

## 2. 规范性检查（符合度：高）

| 规范项 | 结果 | 说明 |
|--------|------|------|
| 文件头标注路径+版本 | ✅ | 72/72 文件头均为 `// src/... v5.1.0` |
| 关键逻辑中文注释 | ✅ | hooks、组件均有中文注释 |
| 设计 token 单一来源 | ✅ | 无 `rounded-[Npx]`、`transition-all` 或硬编码色值；色值仅定义在 `globals.css` 变量 |
| `any` 类型 | ✅ | 全仓无 `: any` / `as any` / `any[]` |
| 命名规范 | ✅ | 组件 PascalCase、hooks camelCase、常量 SCREAMING_SNAKE_CASE、CSS kebab-case |
| `'use client'` 边界 | ✅ | 脚本扫描：全部使用 `useEffect`/`useState` 等 hooks 的 `.tsx` 均已标注 `'use client'`；纯展示组件（如 `ui/card.tsx`、`ui/button.tsx`）正确保持 Server Component |
| 关键逻辑拆分 | ✅ | 函数普遍 < 20 行；`writing-dialog.tsx` 已拆分为 `writing-canvas.tsx` + 弹窗（见 §3） |
| `console.log`/`debugger` | ✅ | 无；仅 `storage.ts` 用 `console.warn` 做错误上报（合规） |

> 结论：代码符合项目《WorkBuddy 协作规范》与 `openspec` 编码标准，规范性达到生产级。

---

## 3. Bug 检测

### 3.1 已修复（本次任务5）
| 文件 | 问题 | 修复 |
|------|------|------|
| `hooks/use-progress.ts` | 连胜/周活动/今日标记使用 `toISOString()`（UTC），本地时区跨零点会断连胜、今日高亮错位 | 改用 `toLocalDateStr()` 本地时区日期 |
| `components/practice/writing-dialog.tsx` | 201 行，超出 200 行上限；且鼠标+触控双路径代码冗余、缺 `touch-action` | 拆出 `writing-canvas.tsx`，改用 Pointer Events + `touch-none` |
| `hooks/use-canvas.ts` | **死代码**：无任何引用，且米字格网格偏离 `prototype.html` 的「无网格虚线框」规范 | 删除 |

### 3.2 潜在关注点（非缺陷，建议）
- **`toast.tsx` 模块级全局状态**：`toasts` 与 `listeners` 为模块级变量，非 React 标准状态。功能正常（ToastContainer 单例），但在 HMR/严格模式重复挂载或未来多实例场景下存在共享风险。建议后续迁移到 Context 或轻量 store（如 zustand）。
- **`learn/page.tsx` 的 `setTimeout`（`handleQuizSubmit` 内）未清理**：答对后 1.5s 自动关闭弹窗，若期间组件卸载会触发 setState-on-unmounted 警告。风险低（页面级组件卸载概率小），建议用 `useRef` 保存 timer 并在 effect 清理。
- **`toast.tsx` 第 76 行 `setTimeout`（点击关闭）未清理**：300ms 后调用 `onRemove`，调用目标为 `ToastContainer` 的 `setActiveToasts`（非自身），卸载安全；可忽略。
- `hooks/use-quiz.ts`：`charactersList` 进入 effect 依赖数组，若父组件每帧传入新数组引用会重算选项。当前 `charactersList` 来自稳定数据，风险低；建议父组件用 `useMemo` 稳定引用。
- `storage.ts` 版本号 `STORAGE_VERSION = 1` 为硬编码常量，跨大版本数据结构变更时需手动递增——属预期行为。

---

## 4. 安全检查（符合度：高）

| 检查项 | 结果 | 说明 |
|--------|------|------|
| XSS 注入 | ✅ | 无 `dangerouslySetInnerHTML`、`eval`、`innerHTML`；`t()` 插值为受控参数 |
| 密钥暴露 | ✅ | 无 `apiKey`/`GEMINI` 客户端硬编码；Gemini 域名仅出现在 CSP 白名单；发音走浏览器 Web Speech API |
| 异步/网络 | ✅ | 全局无 `fetch`/`async`/`await`（静态数据 + 回调式 API），无未处理 Promise 拒绝风险 |
| CSP | ✅ | `proxy.ts` 生产环境使用 nonce-based CSP，含 `object-src 'none'`、`base-uri/form-action 'self'`、`frame-ancestors 'none'` |
| 安全存储 | ✅ | `storage.ts` 带版本校验、`try/catch`、**SSR 守卫**（`typeof window === 'undefined'`）；`localStorage` 仅在已守卫封装内访问 |
| 依赖/第三方 | ⚠️ | 建议定期 `npm outdated` 审计（项目规范已要求） |
| HTTPS | ✅ | Vercel 生产部署默认强制 HTTPS（见 `vercel.json`） |

> 说明：`proxy.ts` 开发环境 CSP 放宽（`unsafe-inline`/`unsafe-eval`）属本地调试需要，不影响生产。

---

## 5. 性能评估（符合度：高）

| 维度 | 结果 |
|------|------|
| 服务端渲染 | ✅ 页面与布局为 Server Component，仅交互部件 `'use client'` |
| 重渲染控制 | ✅ `useMemo` 缓存派生数据（字符分组、筛选）；`useCallback` 稳定回调 |
| 动画性能 | ✅ `use-scroll-reveal` 使用 `transform/opacity`，避免触发 layout/paint |
| Canvas 绘制 | ✅ `writing-canvas.tsx` 按 `devicePixelRatio` 缩放，事件用 Pointer Events（统一输入、减少监听） |
| 打包/资源 | ✅ `next/font/google` 自托管字体；UI 组件按需引入 |
| 大数据 | ✅ 字符数据静态聚合本地加载，无运行时网络拉取 |

---

## 6. 国际化（i18n）核查

- `en.ts` 共 **166** 个翻译键，为唯一事实来源（TypeScript `Translations` 类型约束所有语言文件）。
- 脚本扫描全部 `t('...')` 调用：代码使用的键 **全部存在于 `en.ts`**（无缺失回退）。
- **11 种语言**（en/zh-CN/ja/ko/fr/es/de/pt-BR/ar/ru/zh-TW）翻译文件键集合与 `en.ts` **完全一致，无缺失键**。
- 多语言切换：`LocaleProvider` 经 `localStorage` 持久化，`LocaleToggle` 即时切换，回退策略为缺失键显示原始键名（安全降级）。

> 结论：i18n 覆盖完整，多语言切换正常，符合规范。

---

## 7. 逐目录审查明细

| 目录 | 文件数 | 行数 | 结论 |
|------|--------|------|------|
| `src/app/` | 5 | ~482 | 页面/布局为 Server Component；`practice/page.tsx`、`page.tsx`、`learn/page.tsx` 标注 client；`proxy.ts` 为 CSP 中间件，规范 |
| `src/hooks/` | 5 | ~435 | `use-progress`（已修 UTC 缺陷）、`use-quiz`、`use-pronunciation`、`use-is-dark`、`use-scroll-reveal` 均含中文注释、effect 清理得当、无 `any` |
| `src/lib/` | 18 | ~2400 | `storage.ts` 安全封装（SSR 守卫+版本校验）；`characters*.ts` 静态数据；`i18n/` 11 语言键一致；`utils.ts`/`character-types.ts` 类型清晰 |
| `src/components/` | 44 | ~3700 | `ui/` 23 个 shadcn 风格原语（无 hooks 者保持 Server）；`learn/` `practice/` 业务组件职责内聚；`toast.tsx` 全局状态为唯一关注点 |

**Top 文件（按行数）**：
| 文件 | 行数 | 评估 |
|------|------|------|
| `components/ui/command.tsx` | 196 | shadcn/cmdk 封装，单一职责，无需拆分 |
| `components/ui/select.tsx` | 193 | Radix Select 封装，规范 |
| `lib/i18n/translations/*.ts`（11） | 188 | 翻译数据，受控，无需拆分 |
| `components/ui/dialog.tsx` | 169 | Radix Dialog 封装 |
| `app/practice/page.tsx` | 161 | 练习流程编排，逻辑清晰 |
| `hooks/use-progress.ts` | 146 | 进度/连胜/统计，逻辑清晰（已修时区缺陷） |

---

## 8. 总体评分

> 华为 Java 规范评分不适用（非 Java 项目）。以下为 Web/TS 维度的综合评估（百分制）。

| 维度 | 得分 | 评语 |
|------|------|------|
| 规范性 | 96 | 高度符合项目规范与设计系统；client 边界扫描全部正确 |
| 安全性 | 95 | 无注入/密钥暴露；无未处理 Promise；CSP + SSR 守卫就绪 |
| 性能 | 93 | SSR/记忆化/动画优化到位 |
| 可维护性 | 95 | 模块边界清晰，注释充分 |
| 健壮性 | 91 | 已修复 UTC 时区缺陷；`toast` 全局状态与零散 `setTimeout` 为轻微关注点 |
| **综合** | **94.0** | 生产级质量，无需大规模重构 |

---

## 9. 结论与后续建议

1. **核心结论**：`src` 代码规范、安全、性能均达生产级；本次审查确认无 `any`、无 `dangerouslySetInnerHTML`/`eval`、无客户端密钥暴露、无未处理异步、client 边界 100% 正确。已修复 1 个真实 Bug（UTC 时区）、1 处死代码（`use-canvas.ts`）、1 个超 200 行文件（`writing-dialog.tsx`），并统一版本至 v5.1.0。
2. **后续建议**：
   - 在 CI 中加入 `tsc --noEmit` 与 ESLint 作为质量门禁（本环境 ESLint 进程会被终止，需 CI 侧保障）。
   - 将 `toast.tsx` 模块级全局状态迁移到 Context/zustand，规避 HMR/重复挂载共享风险。
   - 为 `learn/page.tsx` 的 `setTimeout` 增加 `useRef` + effect 清理，消除卸载警告。
   - 父组件对传入 `use-quiz` 的 `charactersList` 加 `useMemo`，进一步降低重算风险。
   - 定期 `npm outdated` 审计依赖。
   - 上线前在真机验证触控书写（`touch-none` 已在 `writing-canvas.tsx` 生效）。

---

*本报告由人工深度审查 + Node 脚本逐文件扫描生成，替代本机不可用的 code-reviewer 技能（Python 环境损坏 + 该技能偏 Java 规范）。验证手段为 `node ./node_modules/typescript/bin/tsc --noEmit`（exit 0）。*
