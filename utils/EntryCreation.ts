 import { Page } from '@playwright/test';
 import testData from '../tests/fixture/testdata.json';
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