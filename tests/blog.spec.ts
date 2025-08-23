import { test, expect} from "@playwright/test"
import BlogPage from "../pages/blog.page";

test.describe('Blog', () => {
let blogPage: BlogPage;

test('Professor Verify recient post', async ({ page }) => {
 blogPage =  new BlogPage(page);

    await blogPage.navigateToBlog(); 
    // Click on Contact link in menu
    
    //await page.locator('//ul[@id="zak-primary-menu"]/li[.//a[normalize-space()="Blog"]]').click();

    await expect(page).toHaveTitle(blogPage.titleName);
    
  // Validate each item
  for (const element of await blogPage.contList.elementHandles()) {
    console.log((await element.textContent())?.trim());
    expect(((await element.textContent())?.trim())?.length).toBeGreaterThan(10);
  }

  expect(await blogPage.contList.count()).toEqual(5)
})

})
