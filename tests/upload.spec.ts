import { test, expect, Page} from "@playwright/test"
import CartPage from "../pages/cart.page";
import path from 'path';
import UploadComponent from "../pages/component/upload.component";

test.describe('Upload File', () => {
let cartPage: CartPage;

const fileName = ['9_Manager_Leader.pdf', 'napoleon.pdf']

for (const name of fileName){
  test(`Verify upload file ${name}`, async ({ page }) => {
    await page.goto('https://practice.sdetunicorns.com/cart/');
    //store file path
  const filePath = path.join(__dirname, `../data/${name}`);
    //upload test file
  await page.setInputFiles('input#upfile_1', filePath);
    //click submit button
    await page.locator('#upload_1').click();
    //assertion
    await expect(page.locator('#wfu_messageblock_header_1_label_1')).toContainText("uploaded successfully"); 
})
}



test('Verify upload file on hidden input filed', async ({ page }) => {
  await page.goto('https://practice.sdetunicorns.com/cart/');
  //store file path
const filePath = path.join(__dirname, '../data/9_Manager_Leader.pdf');

//DOM Manipulation
await page.evaluate(() => {
  const selector = document.querySelector('input#upfile_1');
  if(selector){
  selector.className = ''
  }
});

  //upload test file
await page.setInputFiles('input#upfile_1', filePath); // throw error
  //click submit button
  await page.locator('#upload_1').click();
  //assertion
  await expect(page.locator('#wfu_messageblock_header_1_label_1')).toContainText("uploaded successfully"); 
})


test('Verify upload file regular - Working with waits', async ({ page }) => {
cartPage = new CartPage(page);

  await page.goto('https://practice.sdetunicorns.com/cart/');
  //await cartPage.uploadComponent().navigateToCart();

  //store file path
const filePath = path.join(__dirname, '../data/napoleon.pdf');
  //upload test file
/*await page.setInputFiles('input#upfile_1', filePath);
  //click submit button
  await page.locator('#upload_1').click();*/

  cartPage.uploadComponent().uploadFile(filePath);

  //hardcoded sleep - wrong way
  //await page.waitForTimeout(8000);

  //wait for condition
  //await page.locator('#wfu_messageblock_header_1_label_1')
  //.waitFor(); --defualt time by configuration 30 s
  //.waitFor({ state: 'visible', timeout: 10000});

  //wait for assertion
  /*await expect(page.locator('#wfu_messageblock_header_1_label_1'))
  .toContainText("uploaded successfully", {timeout: 10000}); */


  await expect(cartPage.uploadComponent().successTxt)
  .toContainText("uploaded successfully", {timeout: 13000}); 
})

})
