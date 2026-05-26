# 测试规范
============

## 1. 测试框架

项目使用 Angular 内置的测试工具：

| 工具 | 用途 |
|------|------|
| Karma | 测试运行器 |
| Jasmine | 测试框架 |

## 2. 测试类型

| 测试类型 | 说明 | 优先级 |
|---------|------|--------|
| 单元测试 | 测试独立的组件、服务和函数 | 高 |
| 集成测试 | 测试组件间的交互 | 中 |
| 端到端测试 | 测试完整的用户流程 | 低 |

## 3. 测试命令

| 命令 | 说明 |
|------|------|
| `npm test` | 运行测试 |
| `npm test -- --watch` | 运行测试并监听文件变化 |
| `npm test -- --code-coverage` | 运行测试并生成覆盖率报告 |

## 4. 测试文件组织

### 4.1 文件命名规范

测试文件应与源代码放在同一目录下，命名规则为：

```
[source-file-name].spec.ts
```

**示例：**

```
app/components/
├── theme-toggle.ts
└── theme-toggle.spec.ts

app/pages/home/
├── home.ts
└── home.spec.ts
```

### 4.2 目录结构

```
app/
├── components/
│   ├── theme-toggle.ts
│   ├── theme-toggle.spec.ts
│   ├── locale-toggle.ts
│   └── locale-toggle.spec.ts
├── pages/
│   ├── home/
│   │   ├── home.ts
│   │   └── home.spec.ts
│   └── learn/
│       ├── learn.ts
│       └── learn.spec.ts
└── i18n/
    ├── i18n.service.ts
    └── i18n.service.spec.ts
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
it('should create the component', () => { /* ... */ });
it('should update theme when toggle button clicked', () => { /* ... */ });
it('should save preference to localStorage', () => { /* ... */ });
```

### 5.3 单元测试示例

#### 5.3.1 组件测试

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThemeToggle } from './theme-toggle';
import { MatIconModule } from '@angular/material/icon';

describe('ThemeToggle', () => {
  let component: ThemeToggle;
  let fixture: ComponentFixture<ThemeToggle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeToggle, MatIconModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeToggle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with correct theme', () => {
    // 测试初始化逻辑
  });

  it('should toggle theme when button clicked', () => {
    // 测试交互逻辑
  });
});
```

#### 5.3.2 服务测试

```typescript
import { TestBed } from '@angular/core/testing';
import { I18nService } from './i18n.service';

describe('I18nService', () => {
  let service: I18nService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(I18nService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get locale correctly', () => {
    service.setLocale('zh-CN');
    expect(service.getLocale()).toBe('zh-CN');
  });

  it('should return correct translations for current locale', () => {
    service.setLocale('en');
    expect(service.t().app.title).toBe('HanziMaster');
  });
});
```

### 5.4 Mock 依赖

使用 Angular 的测试工具来 Mock 依赖：

```typescript
// Mock 服务
const mockService = jasmine.createSpyObj('MyService', ['method1', 'method2']);

beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [
      { provide: MyService, useValue: mockService }
    ]
  });
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
  component.isDark.set(false);
  
  // Act
  component.toggleTheme();
  
  // Assert
  expect(component.isDark()).toBe(true);
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
