// src/lib/i18n/translate.ts v5.2.35
// 纯函数：翻译键查找与插值，与 React 解耦，便于单元测试

/**
 * 按点分路径读取翻译值。仅访问自有属性，避免原型链属性（__proto__ / constructor）被解析。
 * 参数放宽为 object，兼容基准语言包与合并扩展后的语言包，便于单测直接构造最小对象。
 * 键不存在或值非字符串时原样返回路径，便于开发期发现问题。
 */
export const getNestedValue = (obj: object, path: string): string => {
  const keys = path.split('.');
  let current: unknown = obj;
  for (const key of keys) {
    if (current && typeof current === 'object' && Object.prototype.hasOwnProperty.call(current, key)) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return path;
    }
  }
  return typeof current === 'string' ? current : path;
};

/**
 * 用字面量 split/join 替换 {{key}} 占位符。
 * 不使用 RegExp：参数名中的正则元字符不会引发异常或误替换，
 * 替换值中的 $& / $1 等序列也不会被当作替换模式解析。
 */
export const interpolate = (
  template: string,
  params?: Record<string, string | number>
): string => {
  if (!params) return template;
  let result = template;
  for (const [key, value] of Object.entries(params)) {
    result = result.split(`{{${key}}}`).join(String(value));
  }
  return result;
};
