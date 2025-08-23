import { test, expect} from "@playwright/test"
import HomePage from "../pages/home.page";


test.describe('Home', () => {
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.navigate();
    })
    

    test('Open homepage and verify titile', async ({ page }) => {       
        //verify title
        await expect(page).toHaveTitle("Practice E-Commerce Site – SDET Unicorns");
    })

    test.skip('open About about page and verify title', async ({ page }) => {
            await page.goto('https://practice.sdetunicorns.com/about');  
            
            //verify title
            await expect(page).toHaveTitle("About – Practice E-Commerce Site");
    })
    
    test('Click started button using CSS Selector', async ({ page }) => {
        //Click button
          //await page.locator('#get-started').click();
          await homePage.getStartedBtn.click();
        //verify URL
        await expect(page).toHaveURL(/.*#get-started/);
})

test('Verify head title by text Selector', async ({ page }) => {
    //find locator
     //const headingText = await page.locator('text=Think different. Make different.');
     const headingText = homePage.headingText;
    //verify URL
    await expect(headingText).toBeVisible();
})

test('Verify Home link is enabled with CSS and text locator', async ({ page }) => {
    //find home text
     //const homeText = await page.locator('#zak-primary-menu >> text=Home');
     const homeText = homePage.homeText;
    //verify URL
    await expect(homeText).toBeEnabled();
})

test('Verify Search Icon is visible in mune with Xpath locator', async ({ page }) => {
    //find search icon
     //const searchIcon = await page.locator('//div[@class="zak-header-actions zak-header-actions--desktop"]//a[@class="zak-header-search__toggle"]');
     const searchIcon = homePage.searchIcon;
    //verify URL
    await expect(searchIcon).toBeVisible();
})

test('Verify text name for all link in nav', async ({ page }) => {
    const expectedLinks = [
        "Home",
        "About",
        "Shop",
        "Blog",
        "Contact",
        "My account",
    ];

    //find menu kinks
     //const navLinkName = page.locator('#zak-primary-nav li[id*=menu]');
     const navLinkName = homePage.navLinkName;
    //verify name
    //expect(await navLinkName.allTextContents()).toEqual(expectedLinks);
    expect(await homePage.getNavlinksText()).toEqual(expectedLinks);
})

test.skip('Verify text name for a link in nav', async ({ page }) => {
    const expectedLinks = [
        "Home",
        "About",
        "Shop",
        "Blog",
        "Contact",
        "My account",
    ];

    await page.goto('https://practice.sdetunicorns.com');
    //find menu kinks
     const navLinkName = page.locator('#zak-primary-nav li[id*=menu]').nth(3);
    
    //verify name
    expect(await navLinkName.textContent()).toEqual(expectedLinks[3]);
})

test('Verify each nav link', async ({ page }) => {
    const expectedLinks = [
        "Home",
        "About",
        "Shop",
        "Blog",
        "Contact",
        "My account",
    ];

    //await page.goto('https://practice.sdetunicorns.com');
    await homePage.navigate();
    //find menu kinks
     //const navLinkName = page.locator('#zak-primary-nav li[id*=menu]');
     const navLinkName = homePage.navLinkName;

     //print ouit all the nav links
     for (const element of await navLinkName.elementHandles()) {
        console.log(await element.textContent());
     }
    
    //verify name
    //expect(await navLinkName.allTextContents()).toEqual(expectedLinks);
    expect(await homePage.getNavlinksText()).toEqual(expectedLinks);
})


test('Send contact form and valida in blog the list of the right nav', async ({ page }) => {

    await page.goto('https://practice.sdetunicorns.com');
    // Click on Contact link in menu
    
    await page.locator('//ul[@id="zak-primary-menu"]/li[.//a[normalize-space()="Contact"]]').click();
    //Fill the form 
    await page.locator('(//input[@class="input-text"])[1]').fill('John Lopez');
    await page.locator('(//input[@class="input-text"])[2]').fill('mail@mail.com');
    await page.locator('(//input[@class="input-text"])[3]').fill('515-896-8965');
    await page.locator('//textarea[@class="input-text"]').fill('Test Test TEst');
    //Verify succesull message
    await page.getByRole('button', { name: 'Submit' }).click();
    const message = page.locator('//div[@class="everest-forms-notice everest-forms-notice--success everest-forms-submission-scroll"]');
    await expect(message).toBeVisible();

    //
    await page.locator('//ul[@id="zak-primary-menu"]/li[.//a[normalize-space()="Blog"]]').click();
    const contList = page.locator('(//ul)[4]');
    await expect(contList.locator('> li')).toHaveCount(5);

    const itemTexts = await contList.allTextContents();
  
  // Validate each item
  for (const text of itemTexts) {
    const trimmedText = text.trim();
    expect(trimmedText.length).toBeGreaterThan(10);
  }
})

test('Professor Send contact form and valida in blog the list of the right nav', async ({ page }) => {

    await page.goto('https://practice.sdetunicorns.com');
    // Click on Contact link in menu
    
    await page.locator('//ul[@id="zak-primary-menu"]/li[.//a[normalize-space()="Contact"]]').click();
    //Fill the form 
    await page.locator('(//input[@class="input-text"])[1]').fill('John Lopez');
    await page.locator('(//input[@class="input-text"])[2]').fill('mail@mail.com');
    await page.locator('(//input[@class="input-text"])[3]').fill('515-896-8965');
    await page.locator('//textarea[@class="input-text"]').fill('Test Test TEst');
    //Verify succesull message
    await page.getByRole('button', { name: 'Submit' }).click();
    const message = page.locator('//div[@class="everest-forms-notice everest-forms-notice--success everest-forms-submission-scroll"]');
    await expect(message).toBeVisible();

    //
    await page.locator('//ul[@id="zak-primary-menu"]/li[.//a[normalize-space()="Blog"]]').click();
    const contList = page.locator('(//ul)[4]');
    await expect(contList.locator('> li')).toHaveCount(5);

    const itemTexts = await contList.allTextContents();
  
  // Validate each item
  for (const text of itemTexts) {
    const trimmedText = text.trim();
    expect(trimmedText.length).toBeGreaterThan(10);
  }
})

})
