const{test,expect}=require('@playwright/test');

test('Date Picker', async({page})=>
    {
        await page.goto("https://testautomationpractice.blogspot.com/");

        await page.fill('input#datepicker', '03/12/2026');
        //await page.waitForTimeout(2000);

        //declare date, year, month
        const year = "2024";
        const month = "June";
        const date = "23";

        //calender appears on clicking the input box 
        await page.locator('input#datepicker').click();

        while(true)
            {
               const previous_year = await page.locator('.ui-datepicker-year').textContent();
               const previous_month = await page.locator('.ui-datepicker-month').textContent();

               if(previous_year == year && previous_month == month)
                {
                    break;
                }

                await page.locator('.ui-icon.ui-icon-circle-triangle-w').click();
            }
        
        const dates = await page.$$('.ui-state-default');
        for(const dt of dates)
            {
                if(await dt.textContent()==date)
                    {
                        await dt.click();
                        break;
                    }
            }
        await page.waitForTimeout(2000);

        //without loop we can directly select also
        //await page.locator('//a[text()="23"]').click();
        //await page.waitForTimeout(5000);

    })