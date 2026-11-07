// e2e/a11y.spec.ts v5.2.35

import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

/** 只阻断 critical 级问题；其余违规由 tasks.md 跟踪逐步收敛。 */
for (const path of ['/', '/learn', '/practice', '/privacy', '/terms']) {
  test(`no critical a11y violations on ${path}`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    const critical = results.violations.filter((violation) => violation.impact === 'critical');
    expect(critical.map((violation) => violation.id)).toEqual([]);
  });
}
