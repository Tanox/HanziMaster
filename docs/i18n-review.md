# 国际化译文审校清单

> 文档版本：v5.2.44（与项目版本同步，权威版本见 `package.json`）
> 适用：新增 / 修改任意语言词条时，提交 PR 前逐项自查。

## 1. 自动化门禁（必须全绿）

| 检查 | 命令 | 覆盖 |
|------|------|------|
| 语言清单与扩展模块 | `pnpm i18n:lint` | 11 语言文件齐全、`site.ts` 常量同步、6 个扩展模块齐全、**占位符集合一致**、**UI 文案 ≤160 字符** |
| 叶子键一致性 | `pnpm test` | `src/lib/__tests__/i18n.test.ts`：任意语言缺键 / 多键即失败 |
| 站点常量一致性 | `pnpm test` | `src/lib/__tests__/site.test.ts` |

`TranslationKey` 由英文语言包推导，任何新键必须先在 `en.ts` 落地，再同步其余 10 个语言包与需要的扩展模块。

## 2. 人工审校清单（PR 描述中勾选）

- [ ] **术语统一**：`学习 / 练习 / 笔顺 / 汉字 / 田字格 / 拼音` 等核心术语与既有译法一致；繁体使用台湾用语（設定/搜尋/網格/檔案/複製/匯入），不得把繁体排在英文之后。
- [ ] **语境正确**：按钮用动词或动宾短语、标题用名词短语、错误提示说明「发生了什么 + 怎么办」；避免机翻直译。
- [ ] **占位符**：`{{name}}` 在各语言中数量与名称一致，且译文保留其在句中自然位置（由 `i18n:lint` 兜底集合检查）。
- [ ] **数字与单位**：进度/百分比/日期格式遵循目标语言习惯；阿拉伯语注意数字方向；不擅自改写 `yymmddhhmm` 等程序化格式。
- [ ] **RTL 文本长度**：阿拉伯语译文普遍更长，检查按钮、导航、Toast 不溢出；布局类一律用 `ms/me/ps/pe/start/end/text-start`，禁止 `ml/mr/left/right/text-left`。
- [ ] **HTML lang / dir**：简中 `zh`、繁中 `zh-Hant`、英文 `en`；`ar` 触发 `dir="rtl"`，新增语言需同步 `isRtlLocale`。
- [ ] **可访问性文案**：`aria-label` / `role="status"` 文案随语言切换，不残留硬编码中英文。
- [ ] **法律与合规文本**：隐私政策 / 服务条款译文为正式书面语，不得简写或省略法定要件。

## 3. 新增语言流程

1. 在 `src/lib/site.ts` 的 `SUPPORTED_LOCALES` 与 `src/lib/i18n/index.ts` 的 `translations` 中登记。
2. 新建 `src/lib/i18n/translations/<locale>.ts`，键与 `en.ts` 完全对齐。
3. 为 6 个扩展模块（`legal` / `a11y` / `meanings` / `settings` / `pwa` / `progress`）补齐该语言条目。
4. 更新 `src/lib/i18n/load-translations.ts` 的动态 loader、`localeNames`（语言切换器）与 README 语言徽章。
5. 跑第 1 节全部门禁，并在 RTL（若适用）与移动端窄屏下人工复核。

## 4. 本机语言优先级

简体中文（默认）→ 繁体中文 → 英文；语言偏好写 `localStorage` 与 cookie，可用 `?lang=` 或 `/{locale}/` URL 分享。审校时以「简中 → 繁中 → 英文」顺序核对完整性。
