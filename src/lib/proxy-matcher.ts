// src/lib/proxy-matcher.ts v5.2.57
// proxy 路由绕过规则：框架/API/Sentry tunnel/带点静态/约定式图片与清单路由不得被语言协商 302。
// matcher 字符串与运行时守卫共用同一份定义，避免两处规则漂移。
export const PROXY_MATCHER =
  '/((?!_next/|api/|monitoring|opengraph-image|twitter-image|icon|manifest|favicon|.*\\.).*)';

const BYPASS_PREFIXES = ['_next/', 'api/', 'monitoring'] as const;
const BYPASS_FIRST_SEGMENTS = new Set([
  'opengraph-image',
  'twitter-image',
  'icon',
  'manifest',
  'favicon',
]);

export function shouldBypassProxy(pathname: string): boolean {
  const clean = pathname.replace(/^\/+/, '');
  if (BYPASS_PREFIXES.some((prefix) => clean.startsWith(prefix))) return true;
  const firstSegment = clean.split('/')[0];
  return BYPASS_FIRST_SEGMENTS.has(firstSegment) || firstSegment.includes('.');
}
