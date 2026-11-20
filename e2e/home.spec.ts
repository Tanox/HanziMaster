// e2e/home.spec.ts v5.2.49

import { expect, test } from '@playwright/test';

test('home page renders navigation and footer version', async ({ page }) => {
  await page.goto('/en/');
  await expect(page.locator('#site-header')).toBeVisible();
  await expect(page.locator('#main-content')).toBeVisible();
  await expect(page.locator('#footer-version')).toContainText('v');
});

test('localized URL is server-rendered in the requested language', async ({ page }) => {
  await page.goto('/zh-CN/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'zh-CN');
  await expect(page.locator('h1')).toContainText('精通中文');
});

test('legal pages are reachable from the footer', async ({ page }) => {
  await page.goto('/en/');
  await page.locator('#footer-privacy-link').click();
  await expect(page.locator('#privacy-page')).toBeVisible();
  await page.goto('/en/');
  await page.locator('#footer-terms-link').click();
  await expect(page.locator('#terms-page')).toBeVisible();
});
