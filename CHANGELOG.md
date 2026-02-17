# Changelog

## [0.7.1] - 2025-05-23

### Documentation
- **Specs Completed**: 补全了最后两个核心规范文档，至此 OpenSpec 体系 16 个文档全部建立完成。
    - 新增 `openspec/15_I18N_STRATEGY.md`: 详述 15 国语言支持与回退架构。
    - 新增 `openspec/16_DEPLOYMENT_OPS.md`: 定义 Vercel 部署、数据拷贝脚本及 PWA 缓存策略。
- **Index Update**: 更新 `openspec/00_INDEX.md` 索引表，反映最新的文档状态。

## [0.7.0]

### Added
- **Production Data Sync**: 笔顺词库下载增加分片处理（Batch Processing），大幅提升 9000+ 文件同步时的性能。
- **UI Polishing**: 增强了数据审计面板的视觉动效，进度条采用水墨色渐变与呼吸灯效果。

### Fixed
- **Robust AI Parsing**: 重构了 `geminiService` 的 JSON 提取逻辑。现在即使 AI 输出包含 Markdown 代码块或额外文字，也能精准解析。
- **Version Stamp**: 同步更新应用内所有版本标识至 v0.7.0。

## [0.6.5]

### Added
- **数据管理规范完善**: 在 `openspec` 中新增了三级加载机制、数据审计逻辑以及离线缓存管理策略。