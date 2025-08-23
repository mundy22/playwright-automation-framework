import { Page, Locator } from "@playwright/test";

class ContactPage {
   private page: Page;
    contList: Locator;
    titleName: string;
    linkMenuContact: Locator;
    inputFullName: Locator;
    inputMail: Locator;
    inputPhone: Locator;
    inputTextArea: Locator;
    submitBth: Locator;
    messageLbl: string;
    messageAlert: Locator;

    constructor(page: Page){
        this.page = page;    
        this.linkMenuContact = page.locator('//ul[@id="zak-primary-menu"]/li[.//a[normalize-space()="Contact"]]')
        this.inputFullName = page.locator('(//input[@class="input-text"])[1]');
        this.inputMail = page.locator('(//input[@class="input-text"])[2]');
        this.inputPhone = page.getByRole('textbox', { name: 'Phone' });
        this.inputTextArea = page.locator('//textarea[@class="input-text"]');
        this.submitBth = page.locator('button[type=submit]');
        this.messageAlert = page.locator('//div[@role="alert"]');
        this.messageLbl = "Thanks for contacting us! We will be in touch with you shortly"
 }

 async navigate(){
    await this.page.goto('https://practice.sdetunicorns.com/');  
 }

 async submitForm(name: string, email: string, phone: string, message: string) {
    await this.inputFullName.fill(name);
    await this.inputMail.fill(email);
   // await page.locator('(//input[@class="input-text"])[3]').fill('515-896-8965');
   await this.inputPhone.fill(phone);
    await this.inputTextArea.fill(message);
    await this.submitBth.click();
 }

}

export default ContactPage;