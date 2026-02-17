# 13. 核心算法逻辑 (Algorithms)

**版本**: v0.7.1
**状态**: 现行规范

本文档定义了 HanziMaster 用于判定用户手写轨迹准确性的核心数学逻辑。相关实现位于 `app/utils/geometry.ts` 和 `app/hooks/usePracticeDrawing.ts`。

## 1. 坐标系与预处理
*   **Canvas 空间**: 所有计算均在 `1024x1024` 的逻辑分辨率下进行。
*   **Y 轴翻转**: SVG 数据的 Y 轴原点在左上角，而 Canvas 绘制通常也是如此。但 `hanzi-writer-data` 的坐标系原点在左下角，因此在 `usePracticeDrawing` 中通过 `y = OFFSET_Y - point.y` (其中 `OFFSET_Y` 为 900) 对标准数据进行坐标系转换，以匹配 Canvas 空间。
*   **重采样 (Resampling)**: 用户输入点集 `U` 和目标中位线 `S` 在进行形状比较前，均被重采样为固定数量（当前为 10）的等距点。这是确保形状比较公平性的关键步骤。

## 2. 笔画校验流程 (Stroke Validation Pipeline)
用户的每一笔都必须依次通过以下三重校验：

### 2.1 起笔判定 (Start Point Detection)
*   **触发时机**: 用户落笔 (`pointerdown`) 瞬间。
*   **算法**: **欧几里得距离 (Euclidean Distance)**。计算用户落笔点 `U_start` 与标准笔画起点 `S_start` 之间的直线距离。
*   **阈值**: `TOLERANCE_START_POINT = 120px`。这是一个相对宽松的阈值，以适应手指触控的精度偏差。
*   **行为**: 若距离超出阈值，视为无效落笔，触发震动和视觉错误反馈，不允许开始绘制。

### 2.2 方向判定 (Direction Check)
*   **触发时机**: 用户抬笔 (`pointerup`) 时，在形状判定之前。
*   **算法**: **余弦相似度 (Cosine Similarity)**。
*   **向量定义**:
    *   `V_user = U_end - U_start` (用户笔画的起始点向量)
    *   `V_target = S_end - S_start` (标准笔画的起始点向量)
*   **阈值**: `TOLERANCE_DIRECTION = 0`。这意味着两个向量之间的夹角必须小于 90 度（即余弦值为正），表示它们大致指向同一方向。
*   **判定**: 若相似度小于 0，视为方向错误（例如，本应从左到右的横画被从右到左书写），直接判定为失败。

### 2.3 形状拟合 (Shape Matching)
*   **触发时机**: 通过方向判定后。
*   **算法**: **重采样后的平均欧氏距离 (Average Euclidean Distance after Resampling)**。这是 Fréchet 距离的一种轻量级、高性能的替代方案。
*   **流程**:
    1.  将标准笔画中轴线 `S` 和用户笔画轨迹 `U` 分别重采样为 10 个等距点，得到 `S_resampled` 和 `U_resampled`。
    2.  计算对应点对的距离总和：`Sum_Dist = Σ dist(S_resampled_i, U_resampled_i)`。
    3.  计算平均误差：`Average_Error = Sum_Dist / 10`。
*   **阈值**: `TOLERANCE_SHAPE_ERROR = 150px`。
*   **判定**: 若平均误差大于此阈值，则认为形状偏差过大，判定为失败。

## 3. 评分模型 (Scoring Model)
*   **当前 (v0.7.1)**: 采用二元判定 (Pass/Fail)，只要通过上述三步校验即为成功。
*   **未来 (v0.8.0 规划)**: 将引入 0-100 的评分模型，综合考虑形状误差、方向相似度、甚至是书写流畅度（通过轨迹的曲率变化来评估），为用户提供更精细的反馈。

---
*文档维护: HanziMaster Algorithm Team*