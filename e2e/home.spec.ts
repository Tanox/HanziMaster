// e2e/home.spec.ts v5.2.35

import { expect, test } from '@playwright/test';

test('home page renders navigation and footer version', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#site-header')).toBeVisible();
  await expect(page.locator('#main-content')).toBeVisible();
  await expect(page.locator('#footer-version')).toContainText('v');
});

test('language switch updates the document language', async ({ page }) => {
  await page.goto('/?lang=zh-CN');
  await expect(page.locator('html')).toHaveAttribute('lang', 'zh-CN');
});

test('legal pages are reachable from the footer', async ({ page }) => {
  await page.goto('/');
  await page.locator('#footer-privacy-link').click();
  await expect(page.locator('#privacy-page')).toBeVisible();
  await page.goto('/');
  await page.locator('#footer-terms-link').click();
  await expect(page.locator('#terms-page')).toBeVisible();
});
