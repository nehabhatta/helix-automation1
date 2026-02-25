import { test as setup, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
  await page.goto('/sign-in/');
  await page.locator('[name="email"]').fill(process.env.ADMIN_USER!);
  await page.locator('[name="password"]').fill(process.env.ADMIN_PASS!);
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page.getByRole('link',{name:'Dashboard'})).toBeVisible();
  //await expect(page.locator('._header_aowz5_1')).toContainText('Dashboard');

  await page.context().storageState({ path: authFile });
});