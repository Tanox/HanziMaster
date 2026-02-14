# 02. 技术架构规范

## 3. 核心管线 (v0.6.0 升级)

### 3.4 PDF 渲染管线
*   **技术选型**: 使用 `jsPDF` + `Canvas.toDataURL`。
*   **流程**: 
    1.  在隐藏的 Canvas 中按 A4 比例（210mm x 297mm）绘制米字格矩阵。
    2.  提取选中汉字的 SVG Path 数据，转换至 Canvas 坐标。
    3.  生成 Blob 数据并调用浏览器下载接口。

## 4. 存储策略升级
*   **迁移计划**: 由于解析缓存逐渐增大，LocalStorage 将在 v0.7.0 逐步迁移至 **IndexedDB**。
*   **现状**: v0.6.0 将引入 `useLocalStorage` 的序列化优化，防止存储溢出。
