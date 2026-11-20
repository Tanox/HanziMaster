// src/app/__tests__/llms.test.ts v5.2.57
import { describe, expect, it } from 'vitest';
import { GET } from '../llms.txt/route';
import { SITE_URL, SUPPORTED_LOCALES } from '@/lib/site';

describe('GET /llms.txt', () => {
  it('serves plain text derived from SITE_URL with bilingual facts and localized links', async () => {
    const response = GET();
    expect(response.headers.get('Content-Type')).toContain('text/plain');
    const body = await response.text();

    expect(body).toContain(`Canonical site: ${SITE_URL}`);
    expect(body).toContain(`Primary language URL: ${SITE_URL}/en/`);
    expect(body).toContain('## Verifiable facts');
    expect(body).toContain('## 可核实事实（简体中文）');
    expect(body).toContain('## Common questions');
    expect(body).toContain('## 常见问题（简体中文）');

    for (const locale of SUPPORTED_LOCALES) {
      expect(body).toContain(`${SITE_URL}/${locale}/`);
    }
    for (const path of ['learn', 'practice', 'privacy', 'terms']) {
      expect(body).toContain(`${SITE_URL}/en/${path}`);
    }
    expect(body).toContain('12 foundational Chinese characters');
  });
});
