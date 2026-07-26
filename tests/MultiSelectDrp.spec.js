const{test,expect}=require('@playwright/test');

test('Multiselect Dropdown', async({page})=>
    {
        await page.goto('https://testautomationpractice.blogspot.com/');
        //select multiple options
        //await page.selectOption('#colors',['Blue','Red','Green']);

        //add validations or assertions
        //1)check no.of options in drp
        //const options=await page.locator('#colors option');
        //await expect(options).toHaveCount(7);
        //await page.waitForTimeout(5000);

        //2)check number of options in dropdown using javascript array
        const options=await page.$$('#colors option');
        console.log("number of options:", options.length);
        await expect(options.length).toBe(7);

        //3)check presence of value in the dropdown
        const content=await page.locator('#colors').textContent();
        await expect(content.includes('Blue')).toBeTruthy();
        await expect(content.includes('Black')).toBeFalsy();
    })