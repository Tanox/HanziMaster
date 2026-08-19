# HanziMaster 项目审查报告（2026-08-19）

## 概述
当前版本 **v5.2.8**（package.json / metadata.json / README* / CHANGELOG 基本一致）。技术栈 Next.js 16 + React 19 + TS 5.7 + Tailwind 4。类型检查（`tsc --noEmit`）**通过，0 错误**。整体架构清晰、规范对齐良好，但存在若干需修复的一致性与死代码问题。

---

## 严重问题（建议立即修复）

### 1. 源文件头注释版本号大面积脱节【高】
- 现状：CHANGELOG/package.json 已到 **v5.2.8**，但绝大多数源文件头注释停留在 **v5.2.6**（`// src/... v5.2.6`）。
- 例外：仅 `layout.tsx`=v5.2.7、`google-analytics.tsx`=v5.2.8 已更新；`tabs.tsx` 仍是 create-next-app 默认的 `v5.0.0`。
- 影响：违反仓库「每次修改须同步被改文件头注释」规则；若按规则手动维护，说明 v5.2.7/v5.2.8 的改动并未如实落到对应文件头，版本溯源失真。
- 建议：核对 v5.2.7→v5.2.8 实际改动文件清单，将对应文件头注释补齐至 v5.2.8；未改动文件保持 v5.2.6 即可（规则允许）。

### 2. `metadata.json` 版本与描述脱节【中高】
- `name`: `HanziMaster v5.2.4`（落后 4 个小版本）
- `version`: `5.2.8`（正确）
- `description` 含 `v5.2.4`（落后）
- 建议：将 `name` 与 `description` 中的版本同步至 `5.2.8`，保持单一来源一致。

### 3. `@google/generative-ai` 依赖为死依赖【中】
- `package.json` 仍含 `@google/generative-ai`（无版本号约束，可能锁定 workspace 或缺失）。
- 全仓库代码（src 及 md/mjs）检索 `generative-ai / GoogleGenerativeAI / GEMINI_API_KEY / Gemini` 结果均为 **0 引用**。
- 项目实际无任何 AI 调用，GA 实现用的是 `@next/third-parties` 的 `GoogleAnalytics`（生产环境才加载）。
- 建议：从 `package.json` 删除 `@google/generative-ai` 依赖；同时确认 `GEMINI_API_KEY` 是否已从 `.env*`/Vercel 环境变量清理（避免敏感残留）。

### 4. `src/components/ui/tabs.tsx` 为死代码【中】
- 由 create-next-app 生成的 shadcn 风格 Tabs 组件，但目前 **全项目零引用**（`Tabs`/`TabsList`/`TabsTrigger`/`TabsContent` 仅在该文件内定义导出，无任何消费方）。
- 文件头 `// src/components/ui/tabs.tsx v5.0.0` 也是默认版本。
- 建议：若确认无 Tab 交互需求，删除该文件；若计划复用则保留但补一个使用点并修正头注释。

---

## 中等问题（建议改进）

### 5. 版本号硬编码在 Google Analytics 脚本【低中】
- `google-analytics.tsx` 中 `src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"` 的测量 ID 为占位符 `G-XXXXXXXXXX`。
- 影响：线上 GA 实际不生效（ID 未配置）。需替换为真实 Measurement ID 或从环境变量读取（`process.env.NEXT_PUBLIC_GA_ID`）。

### 6. 滑块组件 `bg-white` 硬编码色值【低】
- `src/components/ui/slider.tsx` 第 47 行 `bg-white` 违反「禁止硬编码色值、用 token」规则。
- 现状：已通过 `dark:bg-...` 做暗色适配，且滑块滑块本质是中性白；但按规范应改为语义 token（如 `bg-background` 或新增语义类）。当前为已知可接受例外，建议后续统一。

### 7. README 版本徽章/页脚一致性【低】
- `README.md` 正文 `v5.2.8` 一致；`README_EN.md` 未检出 `v5.2.x` 字符串（需确认其页脚/徽章是否仍为旧版本或未更新）。
- 建议：核实 README_EN.md 版本展示位。

---

## 规范符合度（良好项）
- **类型安全**：`tsc --noEmit` 0 错误；`any` 0 命中；i18n 用 `TranslationKey` 点分联合类型 + `typeof en` 强制对齐，编译期拦截错键。
- **设计系统**：globals.css `@theme` 单一 token 来源；`bg-vermilion-500/dark:`、`ink-*` 语义色使用规范。
- **GA 环境隔离**：`google-analytics.tsx` 仅 `NODE_ENV==='production'` 加载，正确。
- **安全**：无 XSS/密钥/明文 Token 泄漏；无 `console.*` 调试语句残留。
- **源文件行数**：无超过 200 行的源文件（最大约 ~190 行级别，符合拆分规则）。
- **CSP/字体**：布局正确 preconnect fonts.gstatic；离线 `next build` 失败属环境限制（next/font/google 联网），非代码缺陷。

---

## 优先修复清单
1. [ ] 同步 `metadata.json` name/description 版本至 5.2.8（并 bump 至 5.2.9）
2. [ ] 删除 `@google/generative-ai` 死依赖 + 清理 GEMINI_API_KEY 环境变量
3. [ ] 补齐 v5.2.7/v5.2.8 实际改动文件的头注释至 v5.2.8
4. [ ] 处理 `tabs.tsx` 死代码（删除或接入口）
5. [ ] 配置真实 GA Measurement ID（或环境变量）
6. [ ] 核实 README_EN.md 版本展示位

注：第 1-4 项均涉及「修改文件」，按规则每项应 bump 最小 patch 版本；可合并为一次 `chore: 清理死依赖与同步版本元数据至 v5.2.9`。
