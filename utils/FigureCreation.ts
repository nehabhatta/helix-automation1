 import { Page } from '@playwright/test';
 import testData from '../tests/fixture/testdata.json';
 export async function FigureCreation(page: Page) {

        await page.getByRole('link', { name: 'Extraction' }).click();
        await page.getByRole('tab', { name: 'Entries' }).click();
        await page.getByRole('link', { name: testData.entry.title0 }).click();
        await page.getByRole('link', { name: 'Go to edit' }).click();
        await page.getByRole('tab', { name: 'Figure and Analysis' }).click();
        await page.getByRole('button', { name: 'Add Figure' }).click();
        await page.locator('[name="event"]').click();
        await page.getByRole('button', { name: testData.event.EventTittleOld }).first().click();

        await page.locator('[name="country"]').click();
        await page.locator('button[title="Abyei Area"]').click();
        await page.getByRole('button', { name: 'Add location from OSMNames' }).click();
        await page.locator('[name="search"]').fill(testData.entry.locationOld);
        await page.getByRole('button', { name: testData.entry.MapLocationOld }).click();
        await page.locator('[name="category"]').click();
        await page.locator('button[title="Return"]').click();
        await page.locator('[name="startDate"]').click();
        await page.getByRole('button', { name: '22'}).nth(0).click();
        await page.locator('[name="term"]').click();
        await page.locator('button[title="Evacuated"]').click();

        await page.locator('[name="quantifier"]').click();
        await page.locator('button[title="Exact"]').click();
        await page.locator('[name="reported"]').fill(testData.figure.report);
        await page.locator('[name="unit"]').click();
        await page.locator('button[title="Person"]').click();
        await page.locator('[name="role"]').click();
        await page.locator('button[title="Recommended figure"]').click();
        await page.locator('[name="displacementOccurred"]').click();
        await page.locator('button[title="During"]').click();
        await page.locator('[name="sources"]').click();
        await page.locator('button[title="United Nations Interim Security Force for Abyei (UNISFA) - Abyei Area"]').click(); 
        await page.getByTestId('text-area').nth(1).fill(testData.figure.textarea);
        await page.getByRole('button', { name: 'Submit' }).click();
 }