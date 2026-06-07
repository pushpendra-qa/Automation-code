const {test,expect}=require('@playwright/test');

test('Screenshot use',async({page})=>
    {
        await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
        await page.screenshot({path:'screenshot.png'});

        await page.locator('#name').screenshot({path:'screenshot2.png'});

    })

    test('visual',async({page})=>
        {
            await page.goto('https://flightware.com/');
            //direct validation 
            expect(await page.screenshot()).toMatchSnapshot('landing.png');

        });
        
