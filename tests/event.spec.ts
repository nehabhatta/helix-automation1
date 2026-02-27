import { test, expect} from '@playwright/test';
import { EventSection } from '../utils/EventFunctions';
import { EventCreation } from '../utils/EventCreation';
import testData from './fixture/testdata.json';
test.describe('CRUD functionality of Event Features', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto ("/Dashboard");
    });
 test('Verify event creation functionality',async ({ page }) => {
    
    await EventCreation(page);

    //Assertions
    await page.reload({ waitUntil: 'load' });
    //await page.waitForTimeout(3000);
    await page.locator('[name="name"]').fill(testData.event.EventTittleOld);
    await page.getByRole('button', { name: 'Apply' }).first().click();

    // await expect(page.getByRole('link', { name: 'Test Event Automation'})).first().toBeVisible();
    await expect(page.getByText('Test Event Automation').first()).toBeVisible();
    await page.getByRole('link', { name: testData.event.EventTittleOld }).first().click();
        // await page.waitForTimeout(3000);
    await expect(page.locator('._text-block_1hdvv_1').nth(0)).toContainText(testData.event.disasterType);
    await expect(page.locator('._text-block_1hdvv_1').nth(1)).toContainText(testData.event.EndDate);
    await expect(page.locator('._text-block_1hdvv_1').nth(3)).toContainText(testData.event.DisasterSubType);
    await expect(page.locator('._text-block_1hdvv_1').nth(5)).toContainText(testData.event.country1);
        
});
test('Verify that the user is able to update an event with valid required fields', async ({ page }) => {
    await EventSection(page);

    await expect (page.getByRole('heading', { name: 'Edit Event' })).toBeVisible();

    await page.getByRole('textbox',{name: testData.event.country1}).click();
    await page.locator('button[title="Afghanistan"]').click();
    await page.getByRole('button', { name: 'Submit' }).click();
   // await page.waitForTimeout(2000);

    await expect(page.locator('._notification-container_12jid_37')).toBeVisible();
    await expect(page.locator('._value_1hdvv_2').nth(0)).toContainText(testData.event.disasterType);
    await expect(page.locator('._value_1hdvv_2').nth(1)).toContainText(testData.event.startDate);
    await expect(page.locator('._value_1hdvv_2').nth(2)).toContainText(testData.event.EndDate);
    await expect(page.locator('._value_1hdvv_2').nth(3)).toContainText(testData.event.DisasterSubType);
    await expect(page.getByRole('link',{name: testData.event.country2})).toBeVisible();
  
});
test('Verify that events cannot be updated with missing required fields', async ({ page }) => {
    await EventSection(page);

    await expect (page.getByRole('heading', { name: 'Edit Event' })).toBeVisible();

    await page.getByRole('button',{name:'clear'}).nth(2).click();
    await page.getByRole('button', { name: 'Submit' }).click();

    await expect(page.locator('.styles_error__1XTo6').getByText('The field is required')).toBeVisible();
});
// test('Verify that the user is able to clone an existing event', async ({ page }) => {
//     await page.getByRole('link', { name: 'events' }).click();
//     await page.getByRole('link', { name: testData.event.EventTittleOld }).click();
//     await page.getByRole('button', { name: 'Clone Event' }).click();

//     await expect (page.getByRole('heading', { name: 'Clone Event' })).toBeVisible();

//     await page.locator('input[name="name"]').fill(testData.event.EventTittle);
//     await page.getByRole('button', { name: 'Submit' }).click();

//     await expect(page.locator('._notification-container_12jid_37')).toBeVisible();
// });
test('verify the event delete features ', async({page}) =>{
   await page.getByRole('link', { name: 'events' }).click();   
   //deleting actuale event
   await page.locator('input[name="createdByIds"]').fill('Apurba Subedi');
   await page.locator('button[title="Apurba Subedi"]').click();
   await page.getByRole('button',{name:"Apply"}).first().click();
  
   await expect(page.getByRole('link', {name: testData.event.EventTittleOld})).toBeVisible();

   await page.locator('button[title="Delete"]').click();
   await page.getByRole('button',{name:'Confirm'}).click();
  //assert 
   await expect(page.locator('._notification-container_12jid_37')).toBeVisible();
   await expect(page.getByRole('link', {name: testData.event.EventTittleOld})).not.toBeVisible();

//    //deleting cloned event
//    await page.locator('input[name="createdByIds"]').fill('Apurba Subedi');
//    await page.locator('button[title="Apurba Subedi"]').click();
//    await page.getByRole('button',{name:"Apply"}).first().click();
  
//    await expect(page.getByRole('link', {name: testData.event.EventTittle})).toBeVisible();

//    await page.locator('button[title="Delete"]').click();
//    await page.getByRole('button',{name:'Confirm'}).click();
//   //assert 
//    await expect(page.locator('._notification-container_12jid_37')).toBeVisible();
//    await expect(page.getByRole('link', {name: testData.event.EventTittle})).not.toBeVisible();

});

});