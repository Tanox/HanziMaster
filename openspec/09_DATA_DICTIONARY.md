# 09. 数据字典

**版本**: v1.0.0
**状态**: 现行规范

## 1. 用户进度模型 (User Progress)

### 1.1 `CharacterProgress` (单字掌握度)
用于 SRS (间隔复习) 算法的存储单元：
```typescript
interface CharacterProgress {
  char: string;
  level: number;        // 掌握等级 (0-5)
  nextReview: number;   // 下次复习的时间戳
  interval: number;     // 复习间隔天数
  history: {
    timestamp: number;
    score: number;      // 练习得分
  }[];
}
```

### 1.2 `UserStats` (全局成就)
```typescript
interface UserStats {
  hskUnlocked: number;  // 已解锁的最高 HSK 等级
  totalStudyTime: number; // 累计在线学习时长 (min)
  streak: number;       // 连续打卡天数
}
```

## 2. 静态常量 (保留原有 COMMON_CHARS...)

---
*文档维护: HanziMaster Dev Team*