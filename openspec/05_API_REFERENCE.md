# 05. API 接口文档 (API Reference)

**项目**: HanziMaster (汉字大师)
**版本**: v1.4.0
**状态**: 现行规范

## 1. 概览 (Overview)

HanziMaster 后端采用 Serverless 架构，通过 Next.js API Routes 提供服务。所有接口遵循 RESTful 风格，返回 JSON 格式数据。

*   **Base URL**: `/api`
*   **Content-Type**: `application/json`

## 2. 接口列表 (Endpoints)

### 2.1 汉字数据 (Hanzi Data)

#### `GET /hanzi/{char}`

获取指定汉字的笔顺数据、拼音和基础释义。

*   **Parameters**:
    *   `char` (path, string, required): 单个汉字字符。

*   **Response (200 OK)**:
    ```json
    {
      "char": "爱",
      "strokes": ["M...", "M..."], // SVG 路径数组
      "medians": [[[x,y], [x,y]], ...], // 骨架点坐标
      "pinyin": "ài",
      "radicals": "心",
      "definition": "Love; affection; to be fond of."
    }
    ```

*   **Error (404 Not Found)**:
    ```json
    {
      "error": "Character not found",
      "code": "HANZI_NOT_FOUND"
    }
    ```

### 2.2 AI 生成 (AI Generation)

#### `POST /generate`

调用 Gemini API 生成汉字的深度解析、字源故事和记忆口诀。

*   **Request Body**:
    ```json
    {
      "char": "爱",
      "mode": "analyze" // "analyze" | "mnemonics" | "words"
    }
    ```

*   **Response (200 OK)**:
    ```json
    {
      "char": "爱",
      "etymology": "Originally depicted a person offering their heart...",
      "mnemonics": "Hand (爫) covering a heart (心) with friends (友)...",
      "words": ["爱情", "喜爱", "友爱"]
    }
    ```

*   **Error (500 Internal Server Error)**:
    ```json
    {
      "error": "AI service unavailable",
      "code": "AI_SERVICE_ERROR"
    }
    ```

### 2.3 语音合成 (TTS)

#### `GET /tts`

获取指定文本的语音流 (MP3)。

*   **Query Parameters**:
    *   `text` (string, required): 需要朗读的文本。
    *   `lang` (string, optional): 语言代码，默认为 `zh-CN`。

*   **Response (200 OK)**:
    *   Content-Type: `audio/mpeg`
    *   Binary audio stream.

## 3. 错误码定义 (Error Codes)

| Code | Description | HTTP Status |
| :--- | :--- | :--- |
| `HANZI_NOT_FOUND` | 汉字数据不存在 | 404 |
| `INVALID_INPUT` | 输入参数无效 | 400 |
| `AI_SERVICE_ERROR` | AI 服务调用失败 | 500 |
| `RATE_LIMIT_EXCEEDED` | 请求频率过高 | 429 |

## 4. 调用示例 (Examples)

### JavaScript (Fetch)

```javascript
// 获取汉字数据
async function getHanziData(char) {
  const response = await fetch(`/api/hanzi/${char}`);
  if (!response.ok) {
    throw new Error('Failed to fetch hanzi data');
  }
  return await response.json();
}

// 调用 AI 分析
async function analyzeHanzi(char) {
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ char, mode: 'analyze' })
  });
  return await response.json();
}
```

---
*文档维护: HanziMaster API Team*
