# Changelog

## v2.4.0

- 新增状态管理：Zustand store 实现学习进度持久化存储
- 新增数据缓存：集成 TanStack React Query 5
- 新增 AI 服务层：Google Gemini API 集成（汉字分析、书写反馈、测验生成）
- 新增错误边界组件：ErrorBoundary 提供优雅错误降级
- 新增自定义 Hooks：useCharacterLearning、useProgress
- 新增书写画布组件：Canvas API 实现真实书写交互
- 新增单元测试：i18n 工具函数、FeatureCard 组件、Learning Store、useProgress Hook
- 升级依赖：React 19、Next.js 15、Tailwind CSS 4
- 优化响应式设计：移动端底部导航、安全区域适配
- 完善无障碍支持：ARIA 属性、键盘导航、触控目标

## v2.3.1

- 统一 Apple 设计风格（纯白/纯黑背景、毛玻璃、emerald 绿色强调）
- 完善无障碍支持（ARIA 属性、焦点管理、skip link）
- 实现 prefers-reduced-motion 媒体查询支持
- 添加首页 Hero 字符轮播、学习流程四步、书写画布预览
- 完善学习页字符详情和练习页周进度展示
- 统一组件文件头版本号 v2.3.1
- 更新 openspec 规范文档对齐实现
