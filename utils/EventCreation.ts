 import { Page } from '@playwright/test';
 import testData from '../tests/fixture/testdata.json';
 export async function EventCreation(page: Page) {
    await page.getByRole('link', { name: 'EVENTS' }).nth(0).click();
    await page.getByRole('button', { name: 'Add Event' }).click();
   // await page.waitForTimeout(1000);
    await page.locator('._event-form_1auw0_1 [name="name"]').nth(0).fill(testData.event.EventTittleOld);
    await page.locator('[name="eventType"]').nth(0).click();
    await page.getByRole('button', { name: testData.event.disasterType}).click();
    await page.locator('[name="disasterSubType"]').click();
    await page.getByRole('button', { name: testData.event.DisasterSubType}).click();
    await page.locator('[name="countries"]').nth(1).click();
    await page.locator('button[title="Abyei Area"]').click(); 
    await page.locator('[name="startDate"]').nth(0).click();
    await page.getByRole('button', { name: '1'}).nth(0).click();
    await page.getByTestId('text-area').fill(testData.event.eventDescription);
    await page.getByRole('button', { name: 'Submit' }).click();
 }







