class LoginPage
{
    constructor(page)
    {
        this.page = page;
        //we will store locators here
        this.usernameinput = page.locator('#userEmail');
        this.passwordinput = page.locator('#userPassword');
        this.loginbutton = page.getByRole('button',{name:'Login'});
    }

    //now we will open application.
     async goTo()    //method/function to open app
     {
        await this.page.goto('https://rahulshettyacademy.com/client/#/auth/login');
     }
     
     //we will make method/function to perform login action
     async validlogin(username,password)
     {
        await this.usernameinput.fill(username);
        await this.passwordinput.fill(password);
        await this.loginbutton.click();

     }
    }
     module.exports = {LoginPage};
