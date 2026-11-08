// src/proxy.test.ts v5.2.45
// P1-7/8/9：固化 URL 级 i18n 中间件（Next 16 proxy.ts）行为——语言前缀重写、
// 无前缀首访协商重定向、?lang=/cookie/Accept-Language 优先级与 cookie 注入。
import { describe, expect, it } from 'vitest';
import { NextRequest } from 'next/server';
import { proxy } from '@/proxy';

const ORIGIN = 'https://hanzimaster.example';

function makeReq(
  path: string,
  init: { headers?: Record<string, string>; cookies?: Record<string, string> } = {}
) {
  const request = new NextRequest(new URL(path, ORIGIN), { headers: init.headers ?? {} });
  if (init.cookies) {
    for (const [k, v] of Object.entries(init.cookies)) request.cookies.set(k, v);
  }
  return request;
}

describe('proxy · URL 级 i18n', () => {
  it('将 /zh-CN/learn 重写为 /learn?lang=zh-CN 并注入 cookie', () => {
    const res = proxy(makeReq('/zh-CN/learn'));
    // rewrite 不改变状态码（200），重定向为 302/307；用状态码区分两类行为
    expect(res.status).toBe(200);
    const target = res.headers.get('x-middleware-rewrite') ?? '';
    expect(target).toContain('/learn');
    expect(target).toContain('lang=zh-CN');
    expect(res.cookies.get('hanzi-master-locale')?.value).toBe('zh-CN');
  });

  it('无前缀首访 / 按默认语言 302 重定向到语言前缀', () => {
    const res = proxy(makeReq('/'));
    expect(res.status).toBe(302);
    expect(res.headers.get('location') ?? '').toMatch(/\/en\/?$/);
  });

  it('已存 cookie 优先于 Accept-Language（/learn → /ja/learn）', () => {
    const res = proxy(makeReq('/learn', { cookies: { 'hanzi-master-locale': 'ja' } }));
    expect(res.status).toBe(302);
    expect(res.headers.get('location') ?? '').toContain('/ja/learn');
  });

  it('无 cookie 时按 Accept-Language 协商（ar → /ar/learn）', () => {
    const res = proxy(makeReq('/learn', { headers: { 'accept-language': 'ar,en;q=0.8' } }));
    expect(res.status).toBe(302);
    expect(res.headers.get('location') ?? '').toContain('/ar/learn');
  });

  it('?lang= 优先于 cookie（?lang=ko → /ko/learn）', () => {
    const res = proxy(makeReq('/learn?lang=ko', { cookies: { 'hanzi-master-locale': 'ja' } }));
    expect(res.status).toBe(302);
    expect(res.headers.get('location') ?? '').toContain('/ko/learn');
  });
});
