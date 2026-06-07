const{test,expect}=require('@playwright/test');
const{LoginPage}=require('../pages/LoginPage');

test('Login app',async({page})=>
    {
        //create object of login page
        const loginPage = new LoginPage(page);

        //open the app
        await loginPage.goTo();

        //login credentials
        await loginPage.validlogin
        (
         "whctarkar24@gmail.com",
         "Harekrishna108"
        );
        //await page.pause();
    })