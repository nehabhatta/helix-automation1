import { test, expect} from '@playwright/test';
import { EventSection } from '../utils/EventFunctions';
import testData from './fixture/testdata.json';
test.describe('Event core functionality', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto ("/Dashboard");
    });
test('Verify that the user is able to update an event with valid required fields', async ({ page }) => {
    await EventSection(page);
    await expect (page.getByRole('heading', { name: 'Edit Event' })).toBeVisible();
    await page.getByRole('textbox',{name: testData.event.country1}).click();
    await page.locator('button[title="Afghanistan"]').click();
    //await page.locator('button[type="submit"]').click();
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.waitForTimeout(2000);
    await expect(page.locator('._notification-container_12jid_37')).toBeVisible();
    await expect(page.locator('._value_1hdvv_2').nth(0)).toContainText(testData.event.disasterType);
    await expect(page.locator('._value_1hdvv_2').nth(1)).toContainText(testData.event.startDate);
    await expect(page.locator('._value_1hdvv_2').nth(2)).toContainText(testData.event.EndDate);
    await expect(page.locator('._value_1hdvv_2').nth(3)).toContainText(testData.event.DisasterSubType);
    await expect(page.getByRole('link',{name: testData.event.country2})).toBeVisible();
   // await expect(page.getByRole('link',{name:'Abyei Area'})).toBeVisible();

    
});
test('Verify that events cannot be updated with missing required fields', async ({ page }) => {
    await EventSection(page);
    await expect (page.getByRole('heading', { name: 'Edit Event' })).toBeVisible();
    await page.getByRole('button',{name:'clear'}).nth(2).click();
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.locator('.styles_error__1XTo6').getByText('The field is required')).toBeVisible();
});
test('Verify that the user is able to clone an existing event', async ({ page }) => {
    await page.getByRole('link', { name: 'events' }).click();
    await page.getByRole('link', { name: testData.event.EventTittleOld }).click();
    await page.getByRole('button', { name: 'Clone Event' }).click();
    await expect (page.getByRole('heading', { name: 'Clone Event' })).toBeVisible();
    await page.locator('input[name="name"]').fill(testData.event.EventTittle);
   // await page.getByLabel('Event Name *').fill('event created for testing purpose');
    //await page.getByRole('')
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.locator('._notification-container_12jid_37')).toBeVisible();

});
});