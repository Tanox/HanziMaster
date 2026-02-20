# HanziMaster - 同步代码功能细节到 openspec 文档 - 实现计划

## [x] Task 1: 清理 openspec 冗余文档
- **Priority**: P0
- **Depends On**: None
- **Description**: 
  - 删除 01_PRODUCT_REQUIREMENTS.md 到 16_DEPLOYMENT_OPS.md 的 16 个旧版文档
  - 删除 project.md
  - 确保保留 7 个核心模块、agents.md 和 reports 目录
- **Acceptance Criteria Addressed**: [AC-1]
- **Test Requirements**:
  - `programmatic` TR-1.1: openspec 目录中不存在被删除的旧版文档
  - `programmatic` TR-1.2: openspec 目录中保留 00_INDEX.md、00_STRATEGY.md、01_PRODUCT_UX.md、02_ARCHITECTURE.md、03_DESIGN_SYSTEM.md、04_LOGIC_DATA.md、05_PEDAGOGY.md、06_COMPLIANCE_OPS.md
  - `programmatic` TR-1.3: openspec 目录中保留 agents.md 和 reports/ 目录
- **Notes**: 删除前确认文件内容不需要保留

## [x] Task 2: 更新 02_ARCHITECTURE.md 中的技术栈信息
- **Priority**: P0
- **Depends On**: None
- **Description**: 
  - 更新核心技术栈部分，将 Vite 替换为 Next.js 15.1.0
  - 更新相关的构建工具描述
  - 确认框架版本为 React 18.3.1
- **Acceptance Criteria Addressed**: [AC-2]
- **Test Requirements**:
  - `programmatic` TR-2.1: 02_ARCHITECTURE.md 中提到 Next.js 15.1.0
  - `programmatic` TR-2.2: 02_ARCHITECTURE.md 中没有提到 Vite（除非作为历史说明）
  - `human-judgement` TR-2.3: 技术栈描述准确且完整
- **Notes**: 保留其他技术栈信息（TypeScript、@google/genai 等）

## [x] Task 3: 补充完整的类型定义到 04_LOGIC_DATA.md
- **Priority**: P0
- **Depends On**: None
- **Description**: 
  - 参考 app/types.ts 中的所有类型定义
  - 补充缺失的类型：Point、ExampleWord、HistoryItem、PracticeResult、ToastType、ToastMessage、SeasonalEvent、LanguageOption、UILabels、GridStyle
  - 确保类型定义与代码中的实现一致
- **Acceptance Criteria Addressed**: [AC-3]
- **Test Requirements**:
  - `programmatic` TR-3.1: 04_LOGIC_DATA.md 包含 Point 接口
  - `programmatic` TR-3.2: 04_LOGIC_DATA.md 包含 ExampleWord 接口
  - `programmatic` TR-3.3: 04_LOGIC_DATA.md 包含 HistoryItem 接口
  - `programmatic` TR-3.4: 04_LOGIC_DATA.md 包含 PracticeResult 接口
  - `programmatic` TR-3.5: 04_LOGIC_DATA.md 包含 ToastType、ToastMessage 类型
  - `programmatic` TR-3.6: 04_LOGIC_DATA.md 包含 SeasonalEvent、LanguageOption 接口
  - `programmatic` TR-3.7: 04_LOGIC_DATA.md 包含 UILabels 接口
  - `programmatic` TR-3.8: HanziData 接口包含可选的 radStrokes 属性
  - `human-judgement` TR-3.9: 类型定义格式正确，语法无误

## [/] Task 4: 统一文档中的版本号引用
- **Priority**: P1
- **Depends On**: None
- **Description**: 
  - 检查 openspec 文档中的版本号引用
  - 将所有版本号统一为 1.1.5
  - 特别关注 00_INDEX.md、02_ARCHITECTURE.md 等文档
- **Acceptance Criteria Addressed**: [AC-4]
- **Test Requirements**:
  - `programmatic` TR-4.1: openspec 核心模块文档中提到的版本号为 1.1.5
  - `human-judgement` TR-4.2: 版本号上下文引用合理
- **Notes**: 主要更新文档中的版本引用，不涉及代码文件

## [ ] Task 5: 更新项目规则文档
- **Priority**: P1
- **Depends On**: None
- **Description**: 
  - 更新 .trae/rules/project_rules.md 中的技术栈信息
  - 将 Vite 替换为 Next.js
  - 更新相关的构建和开发流程描述
  - 确保项目规则与实际技术栈一致
- **Acceptance Criteria Addressed**: [AC-5]
- **Test Requirements**:
  - `programmatic` TR-5.1: 项目规则文档中提到 Next.js
  - `programmatic` TR-5.2: 项目规则文档中没有提到 Vite（除非作为历史说明）
  - `human-judgement` TR-5.3: 项目规则描述准确反映当前项目架构
- **Notes**: 保留其他项目规则（如 Google GenAI 编码规范、编码格式等）
