import { test, expect} from '@playwright/test';
import { FigureSection } from '../utils/figureFunctions';
import testData from './fixture/testdata.json';
test.describe('Figure core functionality', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto ("/Dashboard");
    });
test('Verify that the user is able to update a figure with valid required fields', async ({ page }) => {
    await FigureSection(page);

    // initial assertion
    await expect(page.locator('input[name="event"]')).toHaveValue('India Tsunami test');
    await expect(page.locator('input[name="disasterSubType"]').nth(0)).toHaveValue('Tsunami');
    await expect(page.locator('input[name="figureCause"]')).toHaveValue('Disaster');
    await expect(page.locator('input[name="disasterSubType"]').nth(1)).toHaveValue('Earthquake');
    await expect(page.locator('input[name="term"]')).toHaveValue('Evacuated');
    await expect(page.locator('input[name="quantifier"]')).toHaveValue('Approximately');
    await expect(page.locator('input[name="reported"]')).toHaveValue('1010');

    await page.locator('[name="quantifier"]').click();
    await page.locator('button[title="Exact"]').click();
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.locator('._notification-container_12jid_37')).toBeVisible();
    //final assertion
    await expect(page.locator('input[name="event"]')).toHaveValue('India Tsunami test');
    await expect(page.locator('input[name="disasterSubType"]').nth(0)).toHaveValue('Tsunami');
    await expect(page.locator('input[name="figureCause"]')).toHaveValue('Disaster');
    await expect(page.locator('input[name="disasterSubType"]').nth(1)).toHaveValue('Earthquake');
    await expect(page.locator('input[name="term"]')).toHaveValue('Evacuated');
    await expect(page.locator('input[name="quantifier"]')).toHaveValue('Exact');
    await expect(page.locator('input[name="reported"]')).toHaveValue('1010');
});
/*test('Verify that figures cannot be updated with missing required fields', async ({ page }) => {
    await FigureSection(page);
    await page.getByRole('textbox',{name: 'Pakistan'}).click();
    await page.locator('button[title="Pakistan"]').click();
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.locator('.styles_error__1XTo6').getByText('The field is required')).toBeVisible();

});*/
test('Verify that the user cannot update an entry with future date in starting date field', async ({ page }) => {
    await FigureSection(page);
    await page.locator('input[name="startDate"]').click();
    await page.locator('input[name="calendar-year-input"]').fill(testData.figure.date);
    await page.getByRole('button', { name: '22'}).nth(0).click();
    await page.waitForTimeout(5000);
    await page.getByRole('button', { name: 'Submit' }).click();
    
    await expect(page.locator('.styles_error__1XTo6').getByText('Date should not be in the future')).toBeVisible();

});
});
