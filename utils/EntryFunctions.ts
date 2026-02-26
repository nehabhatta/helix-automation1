import { Page } from '@playwright/test';
export async function EntrySection(page: Page) {
await page.getByRole('link', { name: 'Extraction' }).click();
await page.getByRole('tab', { name: 'Entries' }).click();
await page.getByRole('link', { name: 'Test Entry' }).click();
await page.getByRole('link', { name: 'Go to edit' }).click();
await page.waitForTimeout(5000)
}


