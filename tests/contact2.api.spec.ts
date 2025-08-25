import { test, expect, APIResponse} from "@playwright/test";
import apiController from "../controller/api.controller";
import ContactPage from "../pages/contact.page";

test.describe('Contact', () => {
    let contactPage: ContactPage
    let randomPerson: APIResponse;
    
    test.beforeAll(async () => {
        await apiController.init();
        randomPerson = await apiController.getUsers();
        const newUserTodo = await apiController.createUserToDo();
        console.log(newUserTodo);

    })

test('Professor Send contact form and valida in blog the list of the right nav', async ({ page }) => {
    contactPage = new ContactPage(page);
    
    await contactPage.navigate();
    // Click on Contact link in menu
    await contactPage.linkMenuContact.click();
    //Fill the form 
    await contactPage.submitForm(
        randomPerson['name'],
        randomPerson['email'],
        randomPerson['phone'],
        randomPerson['website']
        );
    //Verify succesull message
    await expect(contactPage.messageAlert).toHaveText(contactPage.messageLbl);
})

})
