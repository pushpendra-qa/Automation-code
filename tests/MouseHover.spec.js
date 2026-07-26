const{test,expect}=require('@playwright/test');

test('MouseHover', async({page})=>
    {
        await page.goto("https://ndma.gov.in/");
        const about_us_menu = await page.locator('[class="nav-link home_menu_items dropdown-toggle"]').nth(0);
        await about_us_menu.hover();
        await page.waitForTimeout(2000);

        //const members_menu = await page.locator("a:has-text('Members')");
        //await members_menu.hover();

        const options = await page.locator('.dropdown-item.dropdown-toggle.custom_child_menu');
        const count = await options.count();
        console.log("No of options:", count);
        for(let i=0; i<count; i++)
            {
               const text = await options.nth(i).textContent().replace("chevron_right", "").trim();
               console.log(text);

               if(text === "Members")
                {
                    await options.nth(i).hover();
                    break;
                }
            } 

        await page.waitForTimeout(4000);

    })