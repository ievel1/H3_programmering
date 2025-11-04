import { test, expect } from '@playwright/test';

test.describe('Home and product flow', () => {
  test('shows featured products and navigates to detail', async ({ page }) => {
  await page.goto('/');

    // Try to find product cards on Home; if none, go to /products
    let cards = page.locator('.product-card');
    const initialCount = await cards.count();
    if (initialCount === 0) {
      await page.goto('/products');
      cards = page.locator('.product-card');
    }
    await expect(cards.first()).toBeVisible();

    const count = await cards.count();
    expect(count).toBeGreaterThan(0);

    // Click the first product link 
    await cards.first().locator('.product-link').click();

    await expect(page).toHaveURL(/\/products\/[0-9]+/);

    await expect(page.locator('.detail-title')).toBeVisible();
    await expect(page.locator('.detail-desc')).toBeVisible();
  });
});
