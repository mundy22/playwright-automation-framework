import { test, expect} from "@playwright/test"
import ContactPage from "../pages/contact.page"
import { faker } from '@faker-js/faker'

test.describe('Contact', () => {
    let contactPage: ContactPage
test('Professor Send contact form and valida in blog the list of the right nav', async ({ page }) => {
    contactPage = new ContactPage(page);
    
    await contactPage.navigate();
    // Click on Contact link in menu
    await contactPage.linkMenuContact.click();
    //Fill the form 
    await contactPage.submitForm(faker.name.fullName(), faker.internet.email(), faker.phone.number(), faker.lorem.paragraph(2));
    //Verify succesull message
    await expect(contactPage.messageAlert).toHaveText(contactPage.messageLbl);
})

})
