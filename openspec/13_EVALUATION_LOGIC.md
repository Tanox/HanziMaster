# 13. 核心算法逻辑 (Algorithms)

**版本**: v0.8.1
**状态**: 现行规范

本文档定义了 HanziMaster 用于判定用户手写轨迹准确性及评分的核心逻辑。

## 1. 笔画校验流程 (Stroke Validation)

### 1.1 起笔判定 (Start Detection)
*   **算法**: Euclidean Distance。
*   **阈值**: 120px。

### 1.2 方向判定 (Directional Check)
*   **算法**: Cosine Similarity between start-end vectors.
*   **公式**: `dot(V_user, V_target) / (mag(V_user) * mag(V_target))`
*   **阈值**: 必须大于 0 (夹角 < 90度)。

### 1.3 形状匹配 (Shape Fitting)
*   **算法**: Average Euclidean Distance after Resampling (Simplified Fréchet).
*   **点数**: 两侧均重采样为 10 个等距点。
*   **判定**: 平均误差 <= 150px。

## 2. 评分模型 v0.8.0 (Scoring Model)
单笔划得分由两部分加权组成：
1.  **形状得分 (80%)**: 基于 `1 - (shapeError / 150)` 映射到 0-80。
2.  **方向得分 (20%)**: 基于 `cosineSimilarity * 20` 映射到 0-20。

**全字总分**: `Σ(单笔得分) / 笔画总数`。

## 3. 等级映射 (Grade Mapping)
*   **神品 (Exquisite)**: 95+
*   **妙品 (Masterful)**: 85-94
*   **能品 (Proficient)**: 75-84
*   **须努力 (Keep Trying)**: <75

---
*文档维护: HanziMaster Algorithm Team*