# 测试规范
============

## 1. 测试框架

项目使用 Next.js 推荐的测试工具：

| 工具 | 用途 |
|------|------|
| Jest | 测试框架 |
| React Testing Library | React 组件测试 |

## 2. 测试类型

| 测试类型 | 说明 | 优先级 |
|---------|------|--------|
| 单元测试 | 测试独立的组件、hooks 和函数 | 高 |
| 集成测试 | 测试组件间的交互 | 中 |
| 端到端测试 | 测试完整的用户流程 | 低 |

## 3. 测试命令

| 命令 | 说明 |
|------|------|
| `npm test` | 运行测试 |
| `npm test -- --watch` | 运行测试并监听文件变化 |
| `npm test -- --coverage` | 运行测试并生成覆盖率报告 |

## 4. 测试文件组织

### 4.1 文件命名规范

测试文件应与源代码放在同一目录下，命名规则为：

```
[source-file-name].test.tsx
```

**示例：**

```
src/components/
├── theme-toggle.tsx
└── theme-toggle.test.tsx

src/app/
├── page.tsx
└── page.test.tsx
```

### 4.2 目录结构

```
src/
├── components/
│   ├── theme-toggle.tsx
│   ├── theme-toggle.test.tsx
│   ├── locale-toggle.tsx
│   └── locale-toggle.test.tsx
├── app/
│   ├── page.tsx
│   ├── page.test.tsx
│   └── learn/
│       ├── page.tsx
│       └── page.test.tsx
└── lib/
    └── i18n/
        ├── index.ts
        └── index.test.ts
```

## 5. 测试编写规范

### 5.1 测试结构

使用 `describe` 和 `it` 组织测试：

```typescript
describe('MyComponent', () => {
  // 测试准备
  beforeEach(() => {
    // ...
  });

  it('should create', () => {
    // 测试逻辑
  });
});
```

### 5.2 测试命名规范

测试描述应清晰说明测试的预期行为，使用 "should" 开头：

```typescript
it('should render correctly', () => { /* ... */ });
it('should update theme when toggle button clicked', () => { /* ... */ });
it('should save preference to localStorage', () => { /* ... */ });
```

### 5.3 单元测试示例

#### 5.3.1 组件测试

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import ThemeToggleClient from './theme-toggle';

describe('ThemeToggleClient', () => {
  beforeEach(() => {
    // Mock localStorage
    Storage.prototype.setItem = jest.fn();
    Storage.prototype.getItem = jest.fn(() => 'light');
  });

  it('should render the toggle button', () => {
    render(<ThemeToggleClient />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should toggle theme when button clicked', () => {
    render(<ThemeToggleClient />);
    const button = screen.getByRole('button');
    
    fireEvent.click(button);
    
    expect(localStorage.setItem).toHaveBeenCalledWith('hanzi-master-theme', 'dark');
  });
});
```

#### 5.3.2 Hook 测试

```typescript
import { renderHook, act } from '@testing-library/react';
import { useTranslation } from './locale-provider';

describe('useTranslation', () => {
  it('should return translation function', () => {
    const { result } = renderHook(() => useTranslation());
    
    expect(result.current.t).toBeDefined();
    expect(typeof result.current.t).toBe('function');
  });

  it('should return translated text', () => {
    const { result } = renderHook(() => useTranslation());
    
    const translated = result.current.t('common.learn');
    expect(typeof translated).toBe('string');
  });
});
```

### 5.4 Mock 依赖

使用 Jest 来 Mock 依赖：

```typescript
// Mock localStorage
const mockSetItem = jest.fn();
const mockGetItem = jest.fn(() => 'en');

beforeEach(() => {
  Storage.prototype.setItem = mockSetItem;
  Storage.prototype.getItem = mockGetItem;
});

afterEach(() => {
  jest.clearAllMocks();
});
```

## 6. 测试覆盖率目标

| 指标 | 目标覆盖率 |
|------|-----------|
| 语句（Statements） | ≥ 80% |
| 分支（Branches） | ≥ 70% |
| 函数（Functions） | ≥ 80% |
| 行（Lines） | ≥ 80% |

## 7. 测试最佳实践

### 7.1 单元测试

1. **测试独立功能**：每个测试应只关注一个功能点
2. **避免依赖外部状态**：测试之间应相互独立
3. **使用描述性的测试名称**：清楚说明测试的内容
4. **遵循 AAA 模式**：
   - Arrange（准备）：设置测试数据和环境
   - Act（执行）：执行要测试的操作
   - Assert（断言）：验证结果是否符合预期

```typescript
it('should toggle theme', () => {
  // Arrange
  const { result } = renderHook(() => useTheme());
  
  // Act
  act(() => {
    result.current.toggleTheme();
  });
  
  // Assert
  expect(result.current.isDark).toBe(true);
});
```

### 7.2 集成测试

1. **测试组件交互**：验证多个组件一起工作的情况
2. **保持简洁**：不要过度测试，重点在关键交互路径
3. **使用真实组件**：尽量使用真实组件而非完全 Mock

### 7.3 测试维护

1. **及时更新测试**：代码变更时同步更新测试
2. **删除过时测试**：删除不再需要的测试
3. **重构测试代码**：保持测试代码的可维护性

## 8. 测试前检查清单

提交代码前，确保：

- [ ] 所有测试通过（`npm test`）
- [ ] 没有跳过的测试（除非有充分理由并注释说明）
- [ ] 新功能添加了相应的测试
- [ ] 测试覆盖率达到目标要求
- [ ] 测试运行速度在可接受范围内

## 9. 相关文档

- [项目概述](01-overview.md) - 项目基本信息和技术栈
- [开发指南](03-development.md) - 开发环境配置和编码规范