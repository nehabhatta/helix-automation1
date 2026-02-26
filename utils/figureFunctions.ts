import { Page } from '@playwright/test';
export async function FigureSection(page: Page) {
 await page.getByRole('link', { name: 'Extraction' }).click();
 await page.getByRole('tab', { name: 'Entries' }).click();
 await page.getByRole('link', { name: 'Test Entry' }).click();
 await page.getByRole('link', { name: 'Go to edit' }).click();
 await page.getByRole('tab', { name: 'Figure and Analysis' }).click();
 await page.locator('._header_8hzsz_3').click();
}