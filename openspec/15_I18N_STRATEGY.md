# 15. 国际化与本地化策略 (I18n Strategy)

**版本**: v0.7.1
**状态**: 现行规范

## 1. 核心目标
HanziMaster 旨在服务全球中文学习者。因此，应用必须具备强大的国际化 (Internationalization, i18n) 和本地化 (Localization, l10n) 能力，确保界面语言不成为学习的障碍。

## 2. 支持语言列表
应用当前支持以下 15 种主流语言，覆盖全球大部分目标用户群：
*   **核心中文**: 简体中文 (zh-CN), 繁体中文 (zh-TW)
*   **英语圈**: English (en)
*   **欧洲**: Spanish (es), French (fr), German (de), Italian (it), Portuguese (pt), Russian (ru)
*   **亚洲**: Japanese (ja), Korean (ko), Vietnamese (vi), Thai (th), Indonesian (id), Arabic (ar)

## 3. 技术架构

### 3.1 类型安全 (Type Safety)
*   **接口定义**: 所有 UI 文本必须在 `app/types.ts` 中的 `UILabels` 接口中定义。这确保了所有语言文件必须实现相同的键集合，避免某个语言缺失翻译导致的运行时错误。
*   **无外部依赖**: 不引入 `i18next` 或 `react-intl` 等重型库。我们使用原生 TypeScript 对象映射 (`Record<string, UILabels>`)，以保持应用轻量化和高性能。

### 3.2 语言文件结构
*   **路径**: `app/locales/{langCode}.ts`
*   **导出**: 每个文件导出一个符合 `UILabels` 接口的对象。
*   **索引**: `app/locales/index.ts` 负责汇聚所有语言文件，并导出一个 `UI_LABELS` 常量供全局使用。

### 3.3 回退机制 (Fallback Mechanism)
在 `useAppController` 或组件中获取 Label 时，必须始终包含回退逻辑：
```typescript
const currentLabels = UI_LABELS[currentLang] || UI_LABELS['en'];
```
这确保了即使即使用户的浏览器语言不在支持列表中，或某个语言包加载失败，应用仍能以英语正常运行。

## 4. AI 内容的本地化
*   **Prompt 注入**: 在调用 Gemini API 生成字源或助记词时，必须将当前界面的语言名称 (如 "French", "Japanese") 注入到 System Prompt 中。
    *   *Prompt 示例*: `"...for a student learning in Japanese..."`
*   **缓存隔离**: AI 分析结果的缓存 Key 必须包含语言代码，例如 `ai_analysis_cache_ja_爱`，以避免用户切换语言后看到旧语言的缓存内容。

## 5. 维护规范
*   **新增 Key**: 当开发新功能需要新文案时，必须先在 `UILabels` (types.ts) 中添加字段，然后更新所有 15 个语言文件。可以使用 AI 辅助翻译，但必须人工抽检。
*   **RTL 支持**: 针对阿拉伯语 (Arabic)，需在 `index.html` 或根容器中根据语言动态设置 `dir="rtl"` 属性，并确保 Flex/Grid 布局使用了逻辑属性 (如 `start/end`) 而非物理属性 (`left/right`)。

---
*文档维护: HanziMaster Localization Team*