const{test,expect}=require('@playwright/test');

test('Dropdowns',async({page})=>{

    await page.goto('https://testautomationpractice.blogspot.com/');
    //select options from dropdown 
    //await page.locator('#country').selectOption({ label: 'India' });   //using label 

    //using visible text
    //await page.locator('#country').selectOption('United States' );

    //using value attribute
    //await page.locator('#country').selectOption({value:'usa'})

    //using index 
    //await page.locator('#country').selectOption({index:1})

    //by directly using select option
    //await page.selectOption('#country','India');

    //Assertions 
    //check number of options in dropdown
    const options = await page.locator('#country option') //option here is tag name
    await expect(options).toHaveCount(10); 

    


    await page.waitForTimeout(5000);
})