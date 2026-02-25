import { test, expect} from '@playwright/test';
import { EntrySection } from '../utils/EntryFunctions';
import testData from './fixture/testdata.json';

test.describe('Entry core functionality', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto ("/Dashboard");
    });
test('Verify that the user is able to update an entry and link it to an event', async ({ page }) => {
    await EntrySection(page);
    // assertion
    await expect (page.getByRole('heading', { name: 'Edit Entry' })).toBeVisible();

    await page.getByRole('tab', { name: 'Figure and Analysis' }).click();
    //initial assertion
    await expect(page.locator('._header_8hzsz_3')).toBeVisible();

    await page.locator('._header_8hzsz_3').click();
    await page.waitForTimeout(5000);
    //second assertions
    await expect(page.locator('input[name="event"]')).toHaveValue('India Tsunami test');
    await expect(page.locator('input[name="disasterSubType"]').nth(0)).toHaveValue('Tsunami');
    await expect(page.locator('input[name="figureCause"]')).toHaveValue('Disaster');
    await expect(page.locator('input[name="disasterSubType"]').nth(1)).toHaveValue('Earthquake');
    await expect(page.locator('input[name="country"]')).toHaveValue('India');

    await page.getByRole('tab', { name: 'Figure and Analysis' }).click();
    await page.locator('[name="country"]').click();
    await page.locator('button[title="Pakistan"]').click();
    await page.getByRole('button', { name: 'Add location from OSMNames' }).click();
    await page.locator('[name="search"]').fill(testData.entry.location);
    await page.locator('._description_135v2_4').getByText('c, Johar Town, Punjab, Pakistan').click();
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.locator('._notification-container_12jid_37')).toBeVisible();
    //final assertion
    await expect(page.locator('input[name="event"]')).toHaveValue('India Tsunami test');
    await expect(page.locator('input[name="disasterSubType"]').nth(0)).toHaveValue('Tsunami');
    await expect(page.locator('input[name="figureCause"]')).toHaveValue('Disaster');
    await expect(page.locator('input[name="disasterSubType"]').nth(1)).toHaveValue('Earthquake');
    await expect(page.locator('input[name="country"]')).toHaveValue('Pakistan');

 });
test('Verify that entries cannot be updated with missing required fields', async ({ page }) => {
    await EntrySection(page);
    await expect (page.getByRole('heading', { name: 'Edit Entry' })).toBeVisible();
    await page.getByRole('tab', { name: 'details' }).click();
    //assertion
    await expect(page.locator('input[name="url"]')).toHaveValue('https://en.wikipedia.org/wiki/2004_Indian_Ocean_earthquake_and_tsunami');
    await expect(page.locator('input[name="articleTitle"]')).toHaveValue('T3');
    await expect(page.locator('input[name="publishDate"]')).toHaveValue('2026-12-31');
    await expect(page.locator('input[name="publishers"]')).toHaveValue('20 minutes - France');

    await page.locator('input[name="articleTitle"]').fill(testData.entry.title1);
    await page.locator('input[name="articleTitle"]').fill(testData.entry.title2);
    await page.getByRole('button', { name: 'Submit' }).click();
    
    await expect(page.locator('.styles_error__1XTo6').getByText('The field is required')).toBeVisible();
});
test.fail('Verify that the user cannot update an entry with future date in starting date field', async ({ page }) => {
    await EntrySection(page);

    await expect (page.getByRole('heading', { name: 'Edit Entry' })).toBeVisible();

    await page.locator('input[name="publishDate"]').click();
    await page.locator('input[name="calendar-year-input"]').fill(testData.entry.PublishDate);
    await page.getByRole('button', { name: '1'}).nth(0).click();
    await page.getByRole('button', { name: 'Submit' }).click();

    await expect(page.locator('._notification-container_12jid_37')).toBeFalsy();
});
});