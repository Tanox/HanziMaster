# 04. 逻辑引擎与数据协议

**版本**: v1.0.0
**职责**: 定义算法数学模型与数据交换协议

## 1. 笔画评估算法 (Geometric Scoring)
系统采用 **Simplified Fréchet Distance** 进行路径匹配：
1.  **重采样**: 用户轨迹与标准中线统一重采样为 10 个等距坐标点。
2.  **方向校验**: 计算首尾向量的余弦相似度 (Cosine Similarity)，值必须 > 0。
3.  **形状评分**: `ShapeScore = Max(0, 80 * (1 - AvgDist/150))`。
4.  **最终得分**: `Score = ShapeScore + (DirectionSim * 20)`。

## 2. 数据降级协议 (Fallback)
| 层级 | 协议 | 目标 |
| :--- | :--- | :--- |
| **Tier 1** | LocalStorage / SW | 瞬时加载已学习的 500+ HSK 核心字 |
| **Tier 2** | jsDelivr CDN | 本地缺失时自动拉取 9000+ 矢量 JSON |
| **Tier 3** | Gemini AI | 联网时动态生成深度字源与记忆口诀 |

## 3. 数据字典 (Data Model)
*   **`CharacterProgress`**: 记录单字掌握度、SRS 间隔、历史练习得分。
*   **`UserStats`**: 记录总练习次数、独立汉字数、连续打卡天数。

---
*文档维护: HanziMaster Logic Group*