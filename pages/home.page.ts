import { Page, Locator } from "@playwright/test";

class HomePage {
    page: Page;
    getStartedBtn: Locator;
    headingText: Locator;
    homeText: Locator;
    searchIcon: Locator;
    navLinkName: Locator;
    constructor(page: Page){
        this.page = page;
        this.getStartedBtn = page.locator('#get-started');
        this.headingText = page.locator('text=Think different. Make different.');
        this.homeText = page.locator('#zak-primary-menu:has-text("Home")');
        this.searchIcon = page.locator('//div[@class="zak-header-actions zak-header-actions--desktop"]//a[@class="zak-header-search__toggle"]');
        this.navLinkName = page.locator('#zak-primary-nav li[id*=menu]');
        
 }

 async navigate(){
    await this.page.goto('/');  
 }

 getNavlinksText() {
    return this.navLinkName.allTextContents();
 }


}

export default HomePage;