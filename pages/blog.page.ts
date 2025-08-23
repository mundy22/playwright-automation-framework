import { Page, Locator } from "@playwright/test";

class BlogPage {
   private page: Page;
    contList: Locator;
    titleName: string;

    constructor(page: Page){
        this.page = page;    
        this.contList = page.locator('#recent-posts-3 ul li');
        this.titleName = "Blog – Practice E-Commerce Site";
 }

 async navigateToBlog(){
    await this.page.goto('https://practice.sdetunicorns.com/blog');  
 }


}

export default BlogPage;