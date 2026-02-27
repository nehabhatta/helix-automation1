import { test, expect} from '@playwright/test';
import { EntrySection } from '../utils/EntryFunctions';
import testData from './fixture/testdata.json';
import { EntryCreation } from '../utils/EntryCreation';

test.describe('CRUD functionality of Entry Features', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto ("/Dashboard");
    });
test('New Entry Test',async ({ page }) => {       
        await EntryCreation(page);
        
        await expect(page.locator('._notification-container_12jid_37')).toBeVisible();
        await page.getByRole('link', { name: 'Extraction' }).click();
        await page.getByRole('tab', { name: 'Entries' }).click();
        
        await expect(page.getByText(testData.entry.title0).first()).toBeVisible();
        await page.getByRole('link', { name: testData.entry.title0 }).first().click();

        await expect(page.locator('.styles_raw-input__1tUgz').nth(0)).toHaveValue(testData.entry.url);
        await expect(page.locator('.styles_raw-input__1tUgz').nth(1)).toHaveValue(testData.entry.title0);
        await expect(page.locator('.styles_raw-input__1tUgz').nth(3)).toHaveValue(testData.entry.publisher);
        await expect(page.locator('[name="publishDate"]')).toHaveValue(testData.entry.date);


});
// test('Verify that the user is able to update an entry and link it to an event', async ({ page }) => {
//     await EntrySection(page);
//     // assertion
//     await expect (page.getByRole('heading', { name: 'Edit Entry' })).toBeVisible();

//     await page.getByRole('tab', { name: 'Figure and Analysis' }).click();
//     //initial assertion
//     await expect(page.locator('._header_8hzsz_3')).toBeVisible();

//     await page.locator('._header_8hzsz_3').click();
//     //await page.waitForTimeout(5000);
//     //second assertions
//     await expect(page.locator('input[name="event"]')).toHaveValue(testData.entry.event);
//     await expect(page.locator('input[name="disasterSubType"]').nth(0)).toHaveValue(testData.entry.DisasterSubType1);
//     await expect(page.locator('input[name="figureCause"]')).toHaveValue(testData.entry.FigureCause);
//     await expect(page.locator('input[name="disasterSubType"]').nth(1)).toHaveValue(testData.entry.DisasterSubType2);
//     await expect(page.locator('input[name="country"]')).toHaveValue(testData.entry.country1);

//     await page.getByRole('tab', { name: 'Figure and Analysis' }).click();
//     await page.locator('[name="country"]').click();
//     await page.locator('button[title="Pakistan"]').click();
//     await page.getByRole('button', { name: 'Add location from OSMNames' }).click();
//     await page.locator('[name="search"]').fill(testData.entry.location);
//     await page.locator('._description_135v2_4').getByText(testData.entry.MapLocation).click();
//     await page.getByRole('button', { name: 'Submit' }).click();
//     await expect(page.locator('._notification-container_12jid_37')).toBeVisible();
//     //final assertion
//     await expect(page.locator('input[name="event"]')).toHaveValue(testData.entry.event);
//     await expect(page.locator('input[name="disasterSubType"]').nth(0)).toHaveValue(testData.entry.DisasterSubType1);
//     await expect(page.locator('input[name="figureCause"]')).toHaveValue(testData.entry.FigureCause);
//     await expect(page.locator('input[name="disasterSubType"]').nth(1)).toHaveValue(testData.entry.DisasterSubType2);
//     await expect(page.locator('input[name="country"]')).toHaveValue(testData.entry.country2);

//  });
test('Verify that entries cannot be updated with missing required fields', async ({ page }) => {
    await EntrySection(page);
    await expect (page.getByRole('heading', { name: 'Edit Entry' })).toBeVisible();
    await page.getByRole('tab', { name: 'details' }).click();
    //assertion
    await expect(page.locator('input[name="url"]')).toHaveValue(testData.entry.url);
    await expect(page.locator('input[name="articleTitle"]')).toHaveValue(testData.entry.title0);
    await expect(page.locator('input[name="publishDate"]')).toHaveValue(testData.entry.date);
    await expect(page.locator('input[name="publishers"]')).toHaveValue(testData.entry.publisher);

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
test('verify the event delete features ', async({page}) =>{
   await page.getByRole('link', { name: 'Extraction' }).click();
   await page.getByRole('tab', { name: 'Entries' }).click(); 
   await page.waitForTimeout(3000);
   const row = page.locator('tr:has-text("Apurba Subedi")');
   await row.locator('button[title="Delete"]').click();
   await page.getByRole('button',{name:'Confirm'}).click();
   await expect(page.locator('._notification-container_12jid_37')).toBeVisible();
   await expect(page.getByRole('link', {name: "Test Entry"})).not.toBeVisible();
  
});
});