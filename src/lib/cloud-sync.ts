// src/lib/cloud-sync.ts v5.2.57
// 云同步共享规则：同步码生成/校验、Blob 路径、体积上限（客户端与 API 路由共用）。

/** 同步码：32 位小写十六进制（128 bit），足以抵抗猜测；不含路径分隔符。 */
const SYNC_CODE = /^[0-9a-f]{32}$/;

/** 与 progress-transfer 的 MAX_BACKUP_BYTES 一致的公开上限。
 * 4 MB：低于 Vercel Serverless 常见 4.5 MB 请求体上限，留足 JSON 编码与请求头余量。 */
export const MAX_BACKUP_BYTES = 4 * 1024 * 1024;

/** 本地保存同步码的键（localStorage，随设置面板展示/复制）。 */
export const SYNC_CODE_STORAGE_KEY = 'hanzi-master-sync-code';

export const isSyncCode = (value: string): boolean => SYNC_CODE.test(value);

/** 生成 128 bit 随机同步码；优先 Web Crypto，SSR/不支持时返回空串由调用方降级。 */
export function generateSyncCode(): string {
  if (typeof crypto === 'undefined' || !crypto.getRandomValues) return '';
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}

/** 固定前缀 + 纯十六进制同步码，杜绝路径穿越与跨命名空间写入。 */
export const blobPath = (code: string): string => `hanzi-master/progress/${code}.json`;
