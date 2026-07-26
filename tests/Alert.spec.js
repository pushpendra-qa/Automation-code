const{test,expect}=require('@playwright/test');

test('alert',async({page})=>
    {
        await page.goto('https://testautomationpractice.blogspot.com/');

        //before clicking on alert we need to write dialogue window handler.
        //enable the dialog handler before clicking on the button which triggers the alert

/*
        page.on('dialog',async(dialog)=>
            {
                expect(dialog.type()).toContain('alert');
                expect(dialog.message()).toContain('I am an alert box!');
                await dialog.accept();

            })

            await page.getByText('Simple Alert').click();
            await page.waitForTimeout(5000);
*/

/*
//for confirmation alert
            page.on('dialog',async(dialog)=>
            {
                expect(dialog.type()).toContain('confirm');
                expect(dialog.message()).toContain('Press a button!');
                await dialog.accept();
                //await dialog.dismiss();

            }) 

            await page.getByText('Confirmation Alert').click();
            await expect(page.locator('//p[@id="demo"]')).toHaveText('You pressed OK!');
            await page.waitForTimeout(5000);

*/

//promt alert
            page.on('dialog',async(dialog)=>
            {
                expect(dialog.type()).toContain('prompt');
                expect(dialog.message()).toContain('Please enter your name:');
                expect(dialog.defaultValue()).toContain('Harry Potter');
                await dialog.accept('Test');

            })

            await page.getByText('Prompt Alert').click();
            await expect(page.locator('[id="demo"]')).toHaveText('Hello Test! How are you today?');
            await page.waitForTimeout(5000);
 
       
})