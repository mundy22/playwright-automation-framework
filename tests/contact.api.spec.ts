import { test, expect, APIRequestContext, APIResponse} from "@playwright/test"
import ContactPage from "../pages/contact.page"

test.describe('Contact', () => {
    let contactPage: ContactPage
    let fakeApi: APIRequestContext;
    let randomPerson: APIResponse;
    
    test.beforeAll(async ({ playwright }) => {
        fakeApi = await playwright.request.newContext({
        baseURL: 'https://jsonplaceholder.typicode.com/'

    });
    const response = await fakeApi.get('users');
    const responseBody = await response.json();
    randomPerson = responseBody[0];

    const postResponse = await fakeApi
    .post('/users/1/todos', {
        data:{
            "titile": "Learn Playwright",
            "completed": "false"
        }
    });

    const postResponseBody = await postResponse.json();
    console.log(postResponseBody)

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
