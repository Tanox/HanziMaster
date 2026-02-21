# 02. 技术架构规范

**版本**: v1.0.0
**状态**: 现行规范

## 1. 架构总览
HanziMaster 采用高度模块化的 React 18 架构，核心关注点在于 **逻辑抽离 (Logic Decoupling)**。

## 2. 状态管理颗粒度 (State Granularity)

### 2.1 核心 Hooks 分层 (v1.0.0 规范)
为避免 `useAppController` 成为上帝对象，状态必须按下述原则抽离：

*   **`useAppController` (协调者)**: 仅负责路由/URL 解析、全局 Modal 状态、以及各子 Hook 间的协调。
*   **`useContentFetcher` (数据源)**: 负责 HanziData、AI 解析、拼音缓存的获取与存储。
*   **`useInteractionState` (交互态)**: 负责播放、重置、模式切换等瞬时 UI 状态。
*   **`useUserProgress` (进度中枢 - 新增)**: 
    *   **职责**: 独立管理用户的学习进度、HSK 等级解锁、SRS (间隔复习) 算法逻辑、学习统计。
    *   **持久化**: 与 LocalStorage 进行独立通信。

## 3. 离线韧性 (Offline Resilience)
(保留原有三级加载策略...)

## 4. 性能指标 (Performance)
*   **Main Thread Isolation**: 复杂的 Fréchet 几何计算必须在 16ms 内完成，否则需考虑将计算逻辑移至 Web Worker。
*   **Bundle Size**: 核心交互代码必须与 HSK 词库数据分离加载。

---
*文档维护: HanziMaster Architecture Team*