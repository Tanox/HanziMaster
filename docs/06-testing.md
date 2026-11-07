# 测试规范

> 文档版本：v5.2.37（与项目版本同步，权威版本见 `package.json`）

本文描述项目**当前真实**的测试基础设施与编写规范。质量门禁的定义与完整命令表见 [coding-standards.md](coding-standards.md) §11；未完成的测试改进任务见 [tasks.md](tasks.md)。

## 1. 测试栈现状

| 组件 | 版本 / 配置 | 说明 |
|------|------------|------|
| Vitest | `^3.2.4` | 单元测试运行器 |
| 环境 | `jsdom`（`vitest.config.ts`） | 组件与 DOM 相关测试 |
| 全局 API | `globals: true` | 可直接使用 `describe` / `it` / `expect` / `vi` |
| 别名 | `@` → `src` | 与 `tsconfig.json` 一致 |
| 匹配范围 | `src/**/*.test.{ts,tsx}` | 就近放在所属模块 `__tests__/` |
| 初始化 | `./vitest.setup.ts` | 内存 Storage 兜底 |
| Testing Library | `@testing-library/react ^16.3.3`、`jest-dom ^7.0.1`、`user-event ^14.6.8` | 组件与交互测试 |
| jsdom | `^30.1.3` | DOM 环境 |

> **不使用 Jest**。历史上本文曾包含 Jest 接入蓝图与 `jest.fn()` 示例，均已废弃；Mock 用 Vitest 的 `vi.fn()` / `vi.spyOn()`。

`vitest.setup.ts` 的必要性：Node 24 的实验性 `globalThis.localStorage` getter 在未传 `--localstorage-file` 时为 `undefined`，会遮蔽 jsdom 实现，导致 `localStorage` 与 `window.localStorage` 均不可用。setup 在缺失时安装内存 `Storage`；业务代码统一走 `src/lib/storage.ts` 的 `safeGetItem` / `safeSetItem`（内部用 `window.localStorage`）。

## 2. 当前测试清单

`src/` 下共 **24 个测试文件**（`pnpm test` 全通过；用例数随开发变化，以 `pnpm test` 输出为准，文档不维护具体数字）：

| 分组 | 文件 | 覆盖内容 |
|------|------|---------|
| lib 纯逻辑 | `characters` / `stroke-order` | 汉字数据与笔顺数据完整性 |
| lib 纯逻辑 | `i18n` / `translate` | 11 语言叶子键一致、`getNestedValue` / `interpolate` 安全 |
| lib 纯逻辑 | `progress-utils` / `storage` | 连胜、准确率、周活动；localStorage 版本化与 schema 校验 |
| lib 纯逻辑 | `consent` / `site` / `version` | GA 同意门控、站点 URL、版本注入回退 |
| hooks | `use-progress` / `use-pronunciation` / `use-haptic` / `use-scroll-reveal` / `use-swipe-close` | 进度、发音、震动、滚动入场、右滑关闭 |
| components | `character-grid` / `learn/quiz-dialog` / `practice/quiz-dialog` | 字符网格与两个测验弹窗 |
| components | `writing-canvas-utils` / `writing-canvas-drawing` / `writing-canvas-geometry` | Canvas 书写的纯逻辑拆分（工具 / 绘制 / 几何判定） |
| components | `state-views` / `ui-primitives` / `providers` / `toast` | 状态视图、UI 原语、Provider 组合、toast |

## 3. 命令

| 命令 | 说明 |
|------|------|
| `pnpm test` | 运行全部单测（`vitest run`） |
| `pnpm test:watch` | 监听模式 |
| `pnpm test:run` | 包装器 `scripts/run-tests.mjs`，产物写 `reports/test-out.txt`，透传 `--coverage` |
| `pnpm test:run --coverage` | 带覆盖率运行，报告写 `coverage/`（text / json-summary / html） |
| `pnpm e2e` | Playwright 端到端测试（`e2e/home.spec.ts`、`e2e/a11y.spec.ts`） |
| `pnpm e2e:ui` | E2E 可视化调试模式 |
| `pnpm check:lines` | 源码行数门禁，与测试无关的独立门禁 |

本机 pnpm v10+ 触发 `ERR_PNPM_IGNORED_BUILDS` 时改用：`node node_modules/vitest/vitest.mjs run --reporter=dot`，或用 `node scripts/run-tests.mjs` 包装器（可避开工具对长时间 watch 命令的误判）。

**覆盖率现状（v5.2.35）**：`@vitest/coverage-v8@3.2.4` 已安装，`vitest.config.ts` 配置 V8 provider 与 `80/70/80/80` 阈值。实测 **92.77% 行 / 92.77% 语句 / 90.19% 函数 / 93.66% 分支**，门禁通过。统计口径为逻辑层（`src/lib`、`src/hooks`、`src/components/state`、`src/components/ui`），静态文案与数据表不计入。

## 4. 测试文件组织

- 命名：`<被测文件>.test.ts`（纯逻辑）或 `<被测文件>.test.tsx`（组件/hook）。
- 位置：被测模块同级的 `__tests__/` 目录，例如 `src/lib/__tests__/`、`src/hooks/__tests__/`、`src/components/state/__tests__/`。
- 不新建独立的顶层 `test/` 目录；不在仓库根生成测试产物，统一写 `reports/`（已被 `.gitignore` 忽略）。
- 测试文件同样遵守单文件 ≤ 200 行规则。

## 5. 编写规范

### 5.1 结构与命名

用 `describe` / `it` 组织，测试名描述预期行为；采用 Arrange–Act–Assert 结构，测试之间互不依赖。

```typescript
import { describe, it, expect } from 'vitest';

describe('getStreak', () => {
  it('returns 0 when there is no practice record', () => {
    // Arrange
    const records: PracticeRecord[] = [];
    // Act
    const streak = getStreak(records);
    // Assert
    expect(streak).toBe(0);
  });
});
```

### 5.2 组件测试

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EmptyState } from '@/components/state/state-views';

it('renders the empty title', () => {
  render(<EmptyState title="暂无数据" />);
  expect(screen.getByText('暂无数据')).toBeInTheDocument();
});
```

- 优先用 `getByRole` / `getByLabelText` 等可访问性查询，其次才是 `getByText`。
- 交互用 `userEvent`，不要直接操作 DOM。
- 断言扩展来自 `@testing-library/jest-dom`，由 setup 注册；组件若依赖 Provider，需在测试内显式包裹 `ThemeProvider` / `LocaleProvider`。

### 5.3 Mock 与副作用

- Mock 用 `vi.fn()` / `vi.spyOn()` / `vi.mock()`，**不用 `jest.fn()`**。
- 存储相关测试依赖 `vitest.setup.ts` 的内存 Storage，每个用例前用 `window.localStorage.clear()` 隔离。
- 事件监听、定时器、Observer 等须在用例结束后清理，避免跨用例污染。

### 5.4 i18n 相关改动

新增或修改翻译键必须同步 11 个语言文件，`src/lib/__tests__/i18n.test.ts` 会校验叶子键与 `en` 完全一致；`t()` 的 key 还受 `TranslationKey` 联合类型约束，类型检查也会拦截未定义键。

## 6. 端到端测试（Playwright）

E2E 已接入，配置在 `playwright.config.ts`，测试在 `e2e/`：

| 项 | 值 | 说明 |
|----|-----|------|
| 测试文件 | `e2e/home.spec.ts`、`e2e/a11y.spec.ts` | 首页渲染与交互；无障碍（`@axe-core/playwright`） |
| 浏览器 | 仅 `chromium`（Desktop Chrome） | 单 project，控制执行时长 |
| baseURL | `E2E_BASE_URL`，默认 `http://127.0.0.1:3000` | 指向已运行实例时设此变量 |
| webServer | `pnpm dev`，自动起服务；CI 外复用已有服务 | 首次运行前无需手工起服务 |
| 重试 / 产物 | CI 中 retries 1、trace on-first-retry、失败截图 | 本地 retries 0 |

> E2E 运行前需安装浏览器：`pnpm exec playwright install --with-deps chromium`（CI 已内置此步骤）。E2E 不计入覆盖率统计口径。

## 7. 覆盖要求（阈值已生效）

`vitest.config.ts` 已配置 V8 provider 与阈值门禁，任一指标低于阈值即测试失败：

| 指标 | 阈值 |
|------|------|
| 语句 Statements | ≥ 80% |
| 分支 Branches | ≥ 70% |
| 函数 Functions | ≥ 80% |
| 行 Lines | ≥ 80% |

统计口径为逻辑层（`src/lib/**/*.ts`、`src/hooks/**/*.ts`、`src/components/state|ui/**`、`writing-canvas-utils.ts`），页面 JSX、静态文案（`translations/`）与数据表（`characters*` / `stroke-order-data`）不计入。v5.2.37 实测快照：93.88% 行 / 93.88% 语句 / 91.8% 函数 / 94.65% 分支（24 文件 / 137 用例全通过）。

新功能须带对应测试；纯逻辑优先单测，交互路径优先集成测试；不追求对实现细节的覆盖率，重点覆盖边界条件与真实数据。

## 8. 提交前检查

- [ ] `pnpm test` 全部通过（或等价的 Node 直跑命令）
- [ ] 新增逻辑有对应测试，无无理由跳过的 `it.skip`
- [ ] 11 语言键一致性测试通过
- [ ] 无 `jest.*` API、无硬编码环境依赖
- [ ] 涉及页面渲染或无障碍的改动跑过 `pnpm e2e`
- [ ] 测试产物未提交到仓库（在 `reports/` / `coverage/` / `test-results/` 下且被忽略）

## 9. 相关文档

- [编码规范与质量门禁](coding-standards.md)
- [开发指南](03-development.md)
- [Git 工作流](git-workflow.md)
- [任务清单（剩余测试改进）](tasks.md)
