//to verify title 
//we will import required modules 
const {test, expect}=require('@playwright/test')
test('Home page',async ({page})=>{

   await page.goto('https://www.demoblaze.com/');
   const page_title=await page.title()
   console.log('page title is :', page_title);
   await expect(page).toHaveTitle('STORE');

   const pageurl=page.url();
   console.log('Page url is:', pageurl)
   await expect(page).toHaveURL('https://www.demoblaze.com/');

   await page.close()
})