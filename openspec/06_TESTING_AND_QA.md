
# 06. 测试与质量保证 (QA)

## 1. 测试矩阵

| 测试维度 | 重点内容 | 工具/方法 |
| :--- | :--- | :--- |
| **算法准确性** | 验证轨迹点到 Median Path 的欧几里得距离判定。 | Vitest (几何数学逻辑) |
| **离线可用性** | 模拟断网环境下 PWA 缓存读取、汉字搜索及原生 TTS 回退。 | Lighthouse PWA Audit |
| **性能预算** | FCP < 0.8s, LCP < 1.2s, 动画帧率稳定 60fps。 | Chrome DevTools Performance |
| **多语言解析** | 验证 Gemini 在 15 种语言下的 JSON 响应稳定性。 | API Mocking (MSW) |

## 2. 几何校验阈值 (Validation Thresholds)
*   **起始点距离**: 偏差不得超过 350 单位（基于 1024x1024 坐标系）。
*   **轨迹重合度**: 用户手写轨迹必须覆盖 Median 路径 80% 以上的点。
*   **时延要求**: 触控反馈延迟必须 < 16ms，确保“跟手感”。

## 3. 兼容性要求
*   **iOS Safari**: 必须处理 `pointer-events` 与橡皮绳回弹冲突。
*   **Android Chrome**: 适配凹口屏（Safe Area）。
*   **Desktop**: 适配鼠标轨迹与键盘快捷键（如空格键重置动画）。

---
*文档维护: HanziMaster QA Team*
