import { Page } from '@playwright/test';
export async function EventSection(page: Page) {
  await page.getByRole('link', { name: 'events' }).click();
  await page.getByRole('link', { name: 'Test Event Automation' }).click();
  //await page.getByRole('button', { name: '37904' }).click();
  await page.getByRole('button', { name: 'Edit Event' }).click();  
}