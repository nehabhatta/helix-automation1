import { test, expect} from '@playwright/test';
import { FigureSection } from '../utils/figureFunctions';
import { EntryCreation } from '../utils/EntryCreation';
import { FigureCreation } from '../utils/FigureCreation';
import { EventCreation } from '../utils/EventCreation';

import testData from './fixture/testdata.json';
test.describe('Figure core functionality', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto ("/Dashboard");
    });

test('Verify creating figure functionality',async ({ page }) => {
      await EntryCreation(page);
      await page.reload({waitUntil:'load'});
      await EventCreation(page);
      await page.reload({waitUntil:'load'});

    await FigureCreation(page);  
    await expect(page.locator('._notification-container_12jid_37')).toBeVisible();
  });
test('Verify that the user is able to update a figure with valid required fields', async ({ page }) => {
    await FigureSection(page);

    // initial assertion
    await expect(page.locator('input[name="event"]')).toHaveValue(testData.figure.event);
    await expect(page.locator('input[name="disasterSubType"]').nth(0)).toHaveValue(testData.figure.DisasterSubType1);
    await expect(page.locator('input[name="figureCause"]')).toHaveValue(testData.figure.FigureCause);
    await expect(page.locator('input[name="disasterSubType"]').nth(1)).toHaveValue(testData.figure.DisasterSubType2);
    await expect(page.locator('input[name="term"]')).toHaveValue(testData.figure.term);
    await expect(page.locator('input[name="quantifier"]')).toHaveValue(testData.figure.quantifier1);
    await expect(page.locator('input[name="reported"]')).toHaveValue(testData.figure.report);

    await page.locator('[name="quantifier"]').click();
    await page.locator('button[title="Exact"]').click();
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.locator('._notification-container_12jid_37')).toBeVisible();
    //final assertion
    await expect(page.locator('input[name="event"]')).toHaveValue(testData.figure.event);
    await expect(page.locator('input[name="disasterSubType"]').nth(0)).toHaveValue(testData.figure.DisasterSubType1);
    await expect(page.locator('input[name="figureCause"]')).toHaveValue(testData.figure.FigureCause);
    await expect(page.locator('input[name="disasterSubType"]').nth(1)).toHaveValue(testData.figure.DisasterSubType2);
    await expect(page.locator('input[name="term"]')).toHaveValue(testData.figure.term);
    await expect(page.locator('input[name="quantifier"]')).toHaveValue(testData.figure.quantifier2);
    await expect(page.locator('input[name="reported"]')).toHaveValue(testData.figure.report);
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
test('verify the figure delete functionality', async({page}) => {
   await page.getByRole('link', { name: 'Extraction' }).click();
   await page.getByRole('tab', { name: 'Figures' }).click(); 
   await page.waitForTimeout(3000);
   const row = page.locator('tr:has-text("Apurba Subedi")');
   await row.locator('button[title="Delete"]').click();
   await page.getByRole('button',{name:'Confirm'}).click();
   await expect(page.locator('._notification-container_12jid_37')).toBeVisible();
   await page.reload({waitUntil: 'load'});
   await expect(page.getByRole('button',{name:"Export"})).toBeVisible();
   await expect(page.getByRole('button',{name:"Save Query"})).toBeVisible();
   await expect(page.getByRole('tab', { name: 'Figures' })).toBeVisible();

   await expect(page.getByRole('link', {name: "Test Entry"})).not.toBeVisible();

});
});
