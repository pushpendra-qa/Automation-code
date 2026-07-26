const{test,expect}=require('@playwright/test');

test('AutoSuggestion', async({page})=>
    {
        await page.goto("https://www.google.com/");
        await page.getByRole('combobox', { name: 'Search' }).fill('Selenium');
        const options=await page.locator('.erkvQe');
        await options.first().waitFor({state:'visible'});

        const count = await options.count();
        console.log(count);

        await page.pause();
    })