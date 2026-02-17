# Changelog

## [0.9.7]

### Removed
- **BYOK UI Sanitization**: 彻底移除了“用户自定义 API Key”的 UI 界面和存储逻辑，以严格遵守系统开发者安全准则。
- **Prop Cleanup**: 移除了全链路中多余的 `apiKey` 参数透传。

### Changed
- **Unified Auth**: 全局统一使用 `process.env.API_KEY` 进行 AI 模型认证，简化了架构并提升了合规性。

## [0.9.6]

### Changed
- **UX Layout Density**: 将“随机一字”的刷新按钮从底部移至标题右侧，优化了页面空间利用率，减少了不必要的滚动。

## [0.9.5]

### Changed
- **Classic Pinyin Style**: 拼音字体样式回归经典设计。颜色从 `vermilion-600` 还原为品牌标准 `vermilion-500`，并改用 `font-sans` 配合 `semibold` 字重，视觉感更清爽。