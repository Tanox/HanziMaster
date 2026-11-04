# 测试规范

> 文档版本：v5.2.34（与项目版本同步，权威版本见 `package.json`）

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

`src/` 下共 **9 个测试文件 / 47 个用例**（`pnpm test` 全通过）：

| 文件 | 用例数 | 覆盖内容 |
|------|-------|---------|
| `src/lib/__tests__/characters.test.ts` | 4 | 汉字数据完整性 |
| `src/lib/__tests__/i18n.test.ts` | 3 | 11 语言叶子键与 `en` 完全一致 |
| `src/lib/__tests__/progress-utils.test.ts` | 13 | 连胜、准确率、周活动计算 |
| `src/lib/__tests__/stroke-order.test.ts` | 2 | 笔顺数据 |
| `src/lib/__tests__/translate.test.ts` | 9 | `getNestedValue` / `interpolate`、原型链与插值安全 |
| `src/components/learn/__tests__/character-grid.test.tsx` | 3 | 字符网格渲染与选择 |
| `src/components/state/__tests__/state-views.test.tsx` | 7 | 空/错/加载态 |
| `src/hooks/__tests__/use-progress.test.tsx` | 4 | 进度 hook |
| `src/hooks/__tests__/use-pronunciation.test.tsx` | 2 | 发音 hook |

> 用例数会随开发变化，以 `pnpm test` 输出为准，不要手工维护文档里的数字。

## 3. 命令

| 命令 | 说明 |
|------|------|
| `pnpm test` | 运行全部单测（`vitest run`） |
| `pnpm test:watch` | 监听模式 |
| `pnpm test:run` | 包装器 `scripts/run-tests.mjs`，产物写 `reports/test-out.txt`，透传 `--coverage` |
| `pnpm check:lines` | 源码行数门禁，与测试无关的独立门禁 |

本机 pnpm v10+ 触发 `ERR_PNPM_IGNORED_BUILDS` 时改用：`node node_modules/vitest/vitest.mjs run --reporter=dot`，或用 `node scripts/run-tests.mjs` 包装器（可避开工具对长时间 watch 命令的误判）。

**覆盖率现状**：`@vitest/coverage-v8` 尚未安装，`vitest.config.ts` 未配置 `coverage` 段，因此当前**不能**声称 `pnpm test -- --coverage` 可用；覆盖率接入与阈值门禁是 [tasks.md](tasks.md) 中的待办。下文 §7 的目标值是接入后的验收标准，不代表现状。

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

## 6. 覆盖要求（目标，非现状）

| 指标 | 目标 |
|------|------|
| 语句 Statements | ≥ 80% |
| 分支 Branches | ≥ 70% |
| 函数 Functions | ≥ 80% |
| 行 Lines | ≥ 80% |

新功能须带对应测试；纯逻辑优先单测，交互路径优先集成测试；不追求对实现细节的覆盖率，重点覆盖边界条件与真实数据。端到端测试当前未接入。

## 7. 提交前检查

- [ ] `pnpm test` 全部通过（或等价的 Node 直跑命令）
- [ ] 新增逻辑有对应测试，无无理由跳过的 `it.skip`
- [ ] 11 语言键一致性测试通过
- [ ] 无 `jest.*` API、无硬编码环境依赖
- [ ] 测试产物未提交到仓库（在 `reports/` 下且被忽略）

## 8. 相关文档

- [编码规范与质量门禁](coding-standards.md)
- [开发指南](03-development.md)
- [Git 工作流](git-workflow.md)
- [任务清单（覆盖率等待办）](tasks.md)
