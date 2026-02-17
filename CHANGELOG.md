# Changelog

## [0.9.6]

### Changed
- **UX Layout Density**: 将“随机一字”的刷新按钮从底部移至标题右侧，优化了页面空间利用率，减少了不必要的滚动。

## [0.9.5]

### Changed
- **Classic Pinyin Style**: 拼音字体样式回归经典设计。颜色从 `vermilion-600` 还原为品牌标准 `vermilion-500`，并改用 `font-sans` 配合 `semibold` 字重，视觉感更清爽。

## [0.9.4]

### Fixed
- **Build stability**: 修复了 `SettingsDataAudit.tsx` 中未使用的 `PINYIN_MAP` 导致生产构建失败的问题。