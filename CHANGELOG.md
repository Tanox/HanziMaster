# Changelog

## [0.9.3]

### Added
- **Exponential Backoff Retry**: `hanziService` 现已具备 CDN 下载自动重试机制，大幅提升弱网环境下的同步成功率。
- **HSK 1-3 Offline Meanings**: 离线词典现已覆盖 HSK 1-3 级共 518 个核心字词，断网练习不再只有“孤字”。
- **Real-time Sync Status**: 下载笔顺库时，UI 会实时滚动显示正在处理的汉字，增强交互确定感。
- **Strict Data Validation**: 引入 SVG 路径完整性校验，确保本地缓存数据 100% 可用，防止 Canvas 渲染崩溃。

### Fixed
- **Progress Shimmer**: 为同步进度条添加了平滑的流光动画。

## [0.9.2]

### Added
- **Tabbed Settings UI**: 设置面板现采用分类导航设计（侧边栏或滑块），解决移动端列表过长的问题。
- **UI Aesthetics Overhaul**: 优化了 `ToggleItem` 的物理质感，增加了微动效、更精致的阴影和间距。
- **Glassmorphism Header**: 设置模态框引入毛玻璃背景效果，视觉体验更通透。