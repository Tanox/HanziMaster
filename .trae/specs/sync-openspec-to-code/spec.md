# HanziMaster - 同步代码功能细节到 openspec 文档

## Overview
- **Summary**: 将代码库中的实际功能细节同步到 openspec 规范文档中，确保文档与实现一致。
- **Purpose**: 解决当前项目审查报告中发现的 openspec 文档冗余、技术栈不一致、类型定义不完整等问题，使 openspec 文档成为项目的真实参考。
- **Target Users**: 开发者、产品经理、设计师

## Goals
- 清理 openspec 目录，删除冗余文档，仅保留 v2.0.0 规范要求的 7 个核心模块
- 更新技术栈信息，确保与实际使用的 Next.js 一致
- 补充完整的类型定义，使文档与 app/types.ts 同步
- 统一项目版本号为 1.1.5
- 更新项目规则文档，使其与实际技术栈一致

## Non-Goals (Out of Scope)
- 不修改代码库的实际实现
- 不添加新功能或重构现有功能
- 不处理项目审查报告中的其他问题（如构建工具配置清理）

## Background & Context
根据项目审查报告 20260219_0000.md 的分析，当前项目存在以下问题：
1. openspec 文档严重冗余，违反 v2.0.0 规范
2. 技术栈声明与实际使用不一致（文档说 Vite，实际用 Next.js）
3. 类型定义不完整，缺少多种实际使用的类型
4. 版本号不统一，部分文件仍为 1.0.1
5. 项目规则文档过时

## Functional Requirements
- **FR-1**: 清理 openspec 冗余文档
- **FR-2**: 更新核心模块中的技术栈信息
- **FR-3**: 补充完整的类型定义到 04_LOGIC_DATA.md
- **FR-4**: 统一所有文件的版本号为 1.1.5
- **FR-5**: 更新项目规则文档

## Non-Functional Requirements
- **NFR-1**: 文档结构必须符合 openspec v2.0.0 规范
- **NFR-2**: 所有文档必须使用 UTF-8 编码，CRLF 行尾
- **NFR-3**: 文档修改后必须可正常阅读，格式正确

## Constraints
- **Technical**: 必须遵循 openspec v2.0.0 的 7 核心模块结构
- **Business**: 必须保留 openspec/reports 目录中的项目审查报告
- **Dependencies**: 依赖现有核心模块文档（00_STRATEGY.md 到 06_COMPLIANCE_OPS.md）

## Assumptions
- 现有 7 个核心模块文档的内容框架是正确的，只需更新细节
- 不需要重新编写核心模块的全部内容，只需同步代码中的功能细节
- 项目审查报告中的建议是可靠的

## Acceptance Criteria

### AC-1: 清理 openspec 冗余文档
- **Given**: 当前 openspec 目录存在 16 个旧版文档（01_PRODUCT_REQUIREMENTS.md 到 16_DEPLOYMENT_OPS.md 以及 project.md）
- **When**: 执行文档清理操作
- **Then**: openspec 目录中仅保留 7 个核心模块文档（00_INDEX.md、00_STRATEGY.md、01_PRODUCT_UX.md、02_ARCHITECTURE.md、03_DESIGN_SYSTEM.md、04_LOGIC_DATA.md、05_PEDAGOGY.md、06_COMPLIANCE_OPS.md、agents.md、reports/）
- **Verification**: `programmatic`
- **Notes**: 需要保留 reports 目录和 agents.md

### AC-2: 更新技术栈信息
- **Given**: 当前 02_ARCHITECTURE.md 中声明使用 Vite
- **When**: 更新技术栈信息
- **Then**: 02_ARCHITECTURE.md 中准确声明使用 Next.js 15.1.0
- **Verification**: `programmatic`
- **Notes**: 同时更新相关的构建工具描述

### AC-3: 补充完整的类型定义
- **Given**: 当前 04_LOGIC_DATA.md 中的类型定义不完整
- **When**: 补充类型定义
- **Then**: 04_LOGIC_DATA.md 包含 app/types.ts 中的所有类型定义
- **Verification**: `programmatic`
- **Notes**: 特别要补充 PracticeResult、ToastMessage、SeasonalEvent、LanguageOption、UILabels 等类型

### AC-4: 统一版本号
- **Given**: 项目中版本号不统一
- **When**: 执行版本号统一操作
- **Then**: 所有相关文件的版本号都为 1.1.5
- **Verification**: `programmatic`
- **Notes**: 主要更新文档中的版本引用

### AC-5: 更新项目规则文档
- **Given**: .trae/rules/project_rules.md 中的技术栈与实际不符
- **When**: 更新项目规则
- **Then**: 项目规则文档准确反映当前使用的 Next.js 技术栈
- **Verification**: `programmatic`
- **Notes**: 同时更新相关的构建和开发流程描述

## Open Questions
- [ ] 是否需要保留旧版文档的备份？
- [ ] 是否需要更新 CHANGELOG.md 以记录这次同步？
