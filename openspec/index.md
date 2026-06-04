# HanziMaster 项目文档索引

## 📚 项目文档概览

本文档索引帮助您快速找到所需的文档资源。

| 文档名称 | 文件路径 | 说明 |
|---------|---------|------|
| 项目概述 | [01-overview.md](01-overview.md) | 项目基本信息、目标和范围、核心功能和技术栈 |
| 技术架构 | [02-architecture.md](02-architecture.md) | 系统架构设计、模块划分和技术选型 |
| 开发指南 | [03-development.md](03-development.md) | 开发环境搭建、编码规范和最佳实践 |
| API 参考 | [04-api-reference.md](04-api-reference.md) | 详细的 API 文档和代码示例 |
| 部署指南 | [05-deployment.md](05-deployment.md) | 部署流程、环境配置和运维指南 |
| 测试规范 | [06-testing.md](06-testing.md) | 测试策略、框架和最佳实践 |
| 编码规范 | [coding-standards.md](coding-standards.md) | 项目编码标准、最佳实践和代码风格指南 |
| 提交模板 | [commit-template.md](commit-template.md) | Git 提交消息规范和模板 |
| UI 原型图 | [prototype.html](prototype.html) | 页面 UI 设计原型和交互说明 |
| 对齐检查清单 | [alignment-checklist.md](alignment-checklist.md) | 规范文档、原型图与代码实现对齐检查 |

## 📁 文档目录结构

```
/workspace/
├── openspec/              # 项目规范文档
│   ├── index.md          # 📖 文档索引（本文档）
│   ├── 01-overview.md    # 📋 项目概述
│   ├── 02-architecture.md # 🏗️ 技术架构
│   ├── 03-development.md  # 🚀 开发指南
│   ├── 04-api-reference.md # 📡 API 参考
│   ├── 05-deployment.md   # 🌐 部署指南
│   ├── 06-testing.md     # 🧪 测试规范
│   ├── 07-design-prototype.md # 🎨 原型设计
│   ├── coding-standards.md # 📝 编码标准
│   └── commit-template.md # 📌 Git 提交模板
├── docs/                 # 项目报告和总结
│   ├── UI_UX_REVIEW.md  # 🎯 UI/UX 审查报告
│   └── OPTIMIZATION_SUMMARY.md # ⚡ 优化总结
├── prototype.html        # 🎨 高保真 HTML 原型图
└── src/                  # 源代码目录
```

---

## 📄 文档详情

### 核心规范文档 (openspec/)

| 文档 | 文件名 | 说明 | 优先级 |
|------|--------|------|--------|
| 📖 文档索引 | [index.md](index.md) | 本文档，文档目录总览 | ⭐⭐⭐ |
| 📋 项目概述 | [01-overview.md](01-overview.md) | 项目基本信息、目标、技术栈 | ⭐⭐⭐ |
| 🏗️ 技术架构 | [02-architecture.md](02-architecture.md) | 系统架构、模块划分 | ⭐⭐⭐ |
| 🚀 开发指南 | [03-development.md](03-development.md) | 开发环境、编码规范 | ⭐⭐⭐ |
| 📡 API 参考 | [04-api-reference.md](04-api-reference.md) | 组件 API 文档 | ⭐⭐⭐ |
| 🌐 部署指南 | [05-deployment.md](05-deployment.md) | 部署流程、环境配置 | ⭐⭐ |
| 🧪 测试规范 | [06-testing.md](06-testing.md) | 测试策略、框架 | ⭐⭐ |
| 🎨 原型设计 | [07-design-prototype.md](07-design-prototype.md) | 界面原型、配色方案 | ⭐⭐ |
| 📝 编码标准 | [coding-standards.md](coding-standards.md) | 代码风格、最佳实践 | ⭐⭐ |
| 📌 提交模板 | [commit-template.md](commit-template.md) | Git 提交规范 | ⭐⭐ |

### 项目报告 (docs/)

| 文档 | 文件名 | 说明 | 日期 |
|------|--------|------|------|
| 📋 项目结构说明 | [PROJECT_STRUCTURE.md](../docs/PROJECT_STRUCTURE.md) | 项目目录结构和文件分布 | 2026-06-04 |
| 🎯 UI/UX 审查报告 | [UI_UX_REVIEW.md](../docs/UI_UX_REVIEW.md) | 专业的 UI/UX 评估报告 | 2026-06-02 |
| ⚡ 优化总结 | [OPTIMIZATION_SUMMARY.md](../docs/OPTIMIZATION_SUMMARY.md) | 项目优化执行总结 | 2026-06-02 |

---

## 🎯 快速导航

### 新手入门

1. **了解项目** → [项目概述](01-overview.md)
2. **搭建环境** → [开发指南 - 第1章](03-development.md#1-开发环境准备)
3. **运行项目** → [开发指南 - 第2章](03-development.md#2-项目命令)
4. **阅读代码** → [技术架构](02-architecture.md)

### 开发人员

1. **编码规范** → [编码标准](coding-standards.md)
2. **组件开发** → [API 参考](04-api-reference.md)
3. **提交代码** → [Git 提交模板](commit-template.md)
4. **测试代码** → [测试规范](06-testing.md)

### 运维人员

1. **部署应用** → [部署指南](05-deployment.md)
2. **配置环境** → [开发指南 - 环境变量](03-development.md#13-环境变量)
3. **监控维护** → [部署指南 - 性能优化](05-deployment.md#6-性能优化建议)

### 设计师

1. **设计规范** → [原型设计](07-design-prototype.md)
2. **查看原型** → [prototype.html](../prototype.html)
3. **UI 审查** → [UI/UX 审查报告](../docs/UI_UX_REVIEW.md)

---

## 🔗 交叉引用

### 文档间引用关系

```
项目概述 (01-overview)
    ↓ 引用
    ├→ 技术架构 (02-architecture)
    ├→ 开发指南 (03-development)
    ├→ API 参考 (04-api-reference)
    ├→ 部署指南 (05-deployment)
    └→ 测试规范 (06-testing)

技术架构 (02-architecture)
    ↓ 引用
    ├→ 项目概述 (01-overview)
    ├→ 开发指南 (03-development)
    └→ API 参考 (04-api-reference)

开发指南 (03-development)
    ↓ 引用
    ├→ 项目概述 (01-overview)
    ├→ 技术架构 (02-architecture)
    ├→ API 参考 (04-api-reference)
    └→ 测试规范 (06-testing)

API 参考 (04-api-reference)
    ↓ 引用
    ├→ 项目概述 (01-overview)
    ├→ 技术架构 (02-architecture)
    └→ 开发指南 (03-development)

原型设计 (07-design-prototype)
    ↓ 引用
    ├→ 技术架构 (02-architecture)
    ├→ 开发指南 (03-development)
    └→ API 参考 (04-api-reference)

编码标准 (coding-standards)
    ↓ 引用
    ├→ 项目概述 (01-overview)
    ├→ 技术架构 (02-architecture)
    ├→ 开发指南 (03-development)
    └→ Git 提交模板 (commit-template)

Git 提交模板 (commit-template)
    ↓ 引用
    ├→ 项目概述 (01-overview)
    ├→ API 参考 (04-api-reference)
    └→ 编码标准 (coding-standards)
```

---

## 📊 文档版本信息

| 文档 | 版本 | 最后更新 | 维护者 |
|------|------|---------|--------|
| 所有 openspec 文档 | v2.2.1 | 2026-06-04 | AI Assistant |

---

## 📝 文档更新日志

### 2026-06-04
- ✅ 完善 API 参考文档，更新 ThemeToggle 和 LocaleToggle 组件描述
- ✅ 添加主题翻译键说明
- ✅ 更新原型设计文档，添加原型图文件引用
- ✅ 整理项目目录结构
- ✅ 创建 docs/ 目录，整合项目报告
- ✅ 创建高保真 HTML 原型图 (prototype.html)

### 2026-06-02
- ✅ 完成项目 UI/UX 审查
- ✅ 执行项目优化
- ✅ 清理冗余文件
- ✅ 更新文档索引

---

## 💡 如何贡献文档

1. **发现问题**：如果发现文档与实际代码不一致，请更新文档
2. **添加内容**：如果需要添加新文档，请在合适的位置创建
3. **修复链接**：如果发现死链接，请修复或移除
4. **保持同步**：代码更新时，同步更新相关文档

---

## 📞 获取帮助

- **开发问题** → 查看 [开发指南](03-development.md)
- **API 问题** → 查看 [API 参考](04-api-reference.md)
- **部署问题** → 查看 [部署指南](05-deployment.md)

---

**最后更新：** 2026-06-04  
**维护者：** HanziMaster 开发团队
