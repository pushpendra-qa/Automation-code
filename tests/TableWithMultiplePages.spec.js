const{test,expect}=require('@playwright/test');

test('multiplePage Table', async({page})=>
    {
        await page.goto('https://testautomationpractice.blogspot.com/');

        //capture table
        const table = await page.locator('#productTable');
        //capture rows and column from it
        //columns
        const columns = await page.locator('#productTable thead tr th');
        console.log('No of columns:',await columns.count());

        const rows = await page.locator('#productTable tbody tr');
        console.log('No of rows:',await rows.count());

        //Assertion
        expect(await columns.count()).toBe(4);
        expect(await rows.count()).toBe(5);
        //till now we have capture the table with rows and columns

        //filter row from where we want to extract and select item
        /*
        const matching_row=rows.filter({has:page.locator('td'),hasText:'Smartwatch'});
        await matching_row.locator('input').check();
        await page.waitForTimeout(2000);
        */

        //select multiple items
        //we will not write the code again and again rather we will create re-usable function
        //await selectProduct(rows,page,'Smartphone');
        //await selectProduct(rows,page,'Smartwatch');

        //print all product details using loop
        
        
        await page.waitForTimeout(4000);

    })

          async function selectProduct(rows, page, name)   //page is a fixture
        {
            const matching_row=rows.filter({has:page.locator('td'),hasText:name});
            await matching_row.locator('input').check();
        }