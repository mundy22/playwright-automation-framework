import { chromium, FullConfig } from "@playwright/test";

async function globalSetup(config: FullConfig) {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    //Access URL
        await page.goto('https://practice.sdetunicorns.com/my-account')
        await page.context().storageState({path: 'notLoggedInState.json'});
        //Login
        await page.locator('#username').fill('practiceuser1')
        await page.locator('#password').fill('PracticePass1!')
        await page.locator('[value="Log in"]').click()

        //save signedin state to 'loggedInState.json'
        await page.context().storageState({path: 'loggedInState.json'});
        await browser.close();
}

export default globalSetup;