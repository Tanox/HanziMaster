
# 09. 数据字典与 API 协议

## 1. 核心模型

### 1.1 CharacterAnalysis (AI 文本响应)
```typescript
{
  char: string;          // 目标汉字
  pinyin: string;        // 必须带音调的拼音 (例如: ài)
  meaning: string;       // 基础释义
  radical: string;       // 部首及含义
  strokeCount: number;   // 笔画数
  etymology: string;     // 字源分析
  mnemonic: string;      // 记忆口诀
  examples: Array<{      // 常用词组
    word: string;
    pinyin: string;      // 词组拼音
    meaning: string;
  }>;
}
```

### 1.2 离线拼音字典 (Offline Pinyin Map)
*   **存储位置**: `constants/pinyinData.ts`
*   **当前规模**: 2000+ 核心高频汉字。
*   **优先级**: 
    1.  `PINYIN_MAP` (静态硬编码，首屏即用)
    2.  `ai_pinyin_cache` (LocalStorage 动态补丁)
    3.  `Gemini API` (实时在线解析)

## 2. 补丁机制 (Self-Healing Logic)
为了实现“拼音全覆盖”的目标，应用采取了以下自我修复策略：
1.  **解析同步**: 每次 `analyzeCharacter` 成功后，若该字不在 `PINYIN_MAP` 中，则将其拼音存入 `ai_pinyin_cache`。
2.  **UI 降级**: 若三级查询均缺失拼音，随机推荐位将展示“音频图标”，提示用户点击触发 AI 解析。

## 3. Gemini Prompt 指令集
*   **拼音标准**: 必须使用标准带音调的 Pinyin。
*   **语言对齐**: 拼音必须与目标汉字的当前上下文语义匹配（如“的长”在姓名中读 zhǎng）。

---
*文档维护: HanziMaster Data Engineering*
