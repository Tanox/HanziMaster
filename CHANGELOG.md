# Changelog

## [0.9.4]

### Fixed
- **Build stability**: 修复了 `SettingsDataAudit.tsx` 中未使用的 `PINYIN_MAP` 导致生产构建失败的问题。

## [0.9.3]

### Added
- **Exponential Backoff Retry**: `hanziService` 现已具备 CDN 下载自动重试机制，大幅提升弱网环境下的同步成功率。
- **HSK 1-3 Offline Meanings**: 离线词典现已覆盖 HSK 1-3 级共 518 个核心字词，断网练习不再只有“孤字”。
- **Real-time Sync Status**: 下载笔顺库时，UI 会实时滚动显示正在处理的汉字，增强交互确定感。
- **Strict Data Validation**: 引入 SVG 路径完整性校验，确保本地缓存数据 100% 可用，防止 Canvas 渲染崩溃。