import { Page, Locator } from "@playwright/test";

class UploadComponent {
   private page: Page;
    uploadInput: string;
    submitBtn: Locator;
    successTxt: Locator;

    constructor(page: Page){
        this.page = page;    
        this.uploadInput = 'input#upfile_1';
        this.submitBtn = page.locator('#upload_1');
        this.successTxt = page.locator('#wfu_messageblock_header_1_label_1');

 }

 async navigateToCart(){
    await this.page.goto('https://practice.sdetunicorns.com/cart/');  
 }

async uploadFile(filePath: string){
     //upload test file
    await this.page.setInputFiles(this.uploadInput, filePath);
    //click submit button
    await this.submitBtn.click();
}

}

export default UploadComponent;