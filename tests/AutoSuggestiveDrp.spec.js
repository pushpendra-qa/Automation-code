const{test,expect}=require("@playwright/test");

test('Autosuggest',async({page})=>
    {
        await page.goto('https://www.redbus.in/');

        //locate the form city input field using id
        const input = await page.locator('input#srcinput');

        //clear the default value from the field
        //await input.fill('');  optional because fill('') will set the input field as empty string

        //enter Delhi in field
        await input.fill('Delhi');

        await page.waitForTimeout(2000);

        //locate all options containing delhi texts
        const options = page.getByRole('button').filter({hasText:'Delhi'});

        //wait for first suggestion to appear
        await options.first().waitFor({state:'visible'});

        //get total number of options
        const countOptions = await options.count();
        console.log("total options:" +countOptions);

        //iterate through all options
        for(let i = 0; i < countOptions; i++)
            {
                //get text of each option
                const value = await options.nth(i).textContent();
                console.log(value);

                
                if(value.includes('Anand Vihar, Delhi'))
                    {
                        await options.nth(i).click();
                        break;
                    }
            }
    
        //locating destination field
        await page.locator('input#destinput').fill('Bengaluru');
        await page.waitForTimeout(2000);
        const options2 = page.getByRole('button').filter({hasText:'Bengaluru'});
        const countOptions2 = await options2.count();
        console.log("total destination options:" +countOptions2);

        //iterate through all options
        for(let i=0; i<countOptions2; i++)
            {
                const value2 = await options2.nth(i).textContent();
                console.log(value2);
            }

            for(let i = 0; i<countOptions2; i++)
                {
                    const value2 = await options2.nth(i).textContent();
                    if(value2.includes('Bengaluru'))
                        {
                            await options2.nth(i).click();
                            //await page.waitForTimeout(2000);
                            break;
                        }
                }

        await page.getByRole('button', { name: 'Search buses' }).click();
        await page.waitForTimeout(1000);   
    })