import { Page } from '@playwright/test';
 import testData from '../tests/fixture/testdata.json';
export async function EntrySection(page: Page) {
await page.getByRole('link', { name: 'Extraction' }).click();
await page.getByRole('tab', { name: 'Entries' }).click();
await page.getByRole('link', { name: 'Test Entry' }).click();
await page.getByRole('link', { name: 'Go to edit' }).click();
await page.waitForTimeout(5000)
}
export async function EntryCreation(page: Page) {
await page.getByRole('link', { name: 'NEW ENTRY' }).click();
await page.locator('[name="url"]').fill(testData.entry.url);
await page.getByRole('button', { name: 'Process' }).click();
await page.locator('[name="articleTitle"]').fill(testData.entry.title0);
await page.locator('[name="publishDate"]').nth(0).click();
await page.getByRole('button', { name: '1'}).nth(0).click();
await page.locator('[name="publishers"]').click();
await page.getByTitle(testData.entry.publisher).click();
await page.getByRole('button', { name: 'Submit' }).click();
}
export async function deleteEntry(page: Page) {
await page.getByRole('link', { name: 'Extraction' }).click();
await page.getByRole('tab', { name: 'Entries' }).click(); 
await page.waitForTimeout(3000);
const row = page.locator('tr:has-text("Apurba Subedi")');
await row.locator('button[title="Delete"]').click();
await page.getByRole('button',{name:'Confirm'}).click();
}

