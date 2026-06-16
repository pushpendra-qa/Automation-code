const { test, expect } = require('../fixtures/royalExportFixture');
const { homePageData } = require('../../test-data/royal-export/homePageData');

function parsePrice(priceText)
{
    return Number(priceText.replace(/[^0-9.]/g, ''));
}

test('User can open the Royal Export home page from the header brand link', async ({ page, royalExportHomePage }) =>
{
    await royalExportHomePage.goTo();
    await royalExportHomePage.waitForHomePageHeader();

    console.log('Page title:', await page.title());
    await expect(page).toHaveTitle(homePageData.expectedTitle);
    await expect(royalExportHomePage.headerBrandLink).toBeVisible();

    await royalExportHomePage.clickHeaderBrandLink();

    await expect(page).toHaveURL(homePageData.expectedHomeUrl);
});

test('User can view all currency options from the home page selector', async ({ page, royalExportHomePage }) =>
{
    await royalExportHomePage.goTo();
    await royalExportHomePage.waitForHomePageHeader();

    console.log('Page title:', await page.title());
    await expect(page).toHaveTitle(homePageData.expectedTitle);
    await expect(royalExportHomePage.currencySelectorButton).toBeVisible();

    await royalExportHomePage.openCurrencySelector();

    await expect(royalExportHomePage.currencyDropdown).toBeVisible();
    await expect(royalExportHomePage.currencyOptions).toHaveCount(homePageData.expectedCurrencies.length);
    await expect(royalExportHomePage.currencyOptions).toHaveText(homePageData.expectedCurrencies);

    const actualCurrencies = await royalExportHomePage.getCurrencyOptionLabels();
    console.log('Total currencies:', actualCurrencies.length);
    console.log('Currency options:', actualCurrencies);

    expect(actualCurrencies).toEqual(homePageData.expectedCurrencies);

    await royalExportHomePage.selectCurrency('USD');

    await expect(royalExportHomePage.currencyDropdown).toBeHidden();

});

test('Verify price updates across homepage when currency is switched to USD',async ({ royalExportHomePage }) =>
{
    await royalExportHomePage.goTo();

    await royalExportHomePage.waitForHomePageHeader();

    // Capture INR prices

    const inrProductDetails =
        await royalExportHomePage.getVisibleProductPriceDetails(5);
    const allInrProductDetails =
        await royalExportHomePage.getProductPriceDetails();

    console.log('Prices before currency switch');

    console.log(inrProductDetails);

    expect(inrProductDetails.length).toBeGreaterThanOrEqual(5);
    expect(inrProductDetails.every(product => product.title && product.price)).toBeTruthy();
    expect(inrProductDetails.every(product => product.iconClass.includes('fa-india'))).toBeTruthy();
    expect(allInrProductDetails.length).toBeGreaterThanOrEqual(5);

    // Change currency

    await royalExportHomePage.openCurrencySelector();

    await royalExportHomePage.selectCurrency('USD');
    await royalExportHomePage.waitForProductCurrencyIcon('fa-usa');

    // Capture USD prices

    const usdProductDetails =
        await royalExportHomePage.getProductPriceDetails();

    console.log('Prices after currency switch');
    console.log(usdProductDetails);

    // Verify 5 products found

    expect(usdProductDetails.length).toBeGreaterThanOrEqual(5);
    expect(usdProductDetails.slice(0, 5).every(product => product.iconClass.includes('fa-usa'))).toBeTruthy();

    const inrProductsByTitle = new Map(
        allInrProductDetails.map(product => [product.title, product])
    );
    const matchedProducts = usdProductDetails
        .filter(usdProduct => inrProductsByTitle.has(usdProduct.title))
        .slice(0, 5)
        .map(usdProduct =>
        {
            const inrProduct = inrProductsByTitle.get(usdProduct.title);
            return {
                title: usdProduct.title,
                inrPrice: parsePrice(inrProduct.price),
                usdPrice: parsePrice(usdProduct.price),
            };
        });

    expect(matchedProducts.length).toBeGreaterThanOrEqual(5);

    const conversionRates = matchedProducts.map(product => product.inrPrice / product.usdPrice);
    const firstConversionRate = conversionRates[0];

    console.log('Matched products:', matchedProducts);
    console.log('Conversion rates:', conversionRates);

    for(const conversionRate of conversionRates)
        {
            expect(conversionRate).toBeGreaterThan(0);
            expect(Math.abs(conversionRate - firstConversionRate)).toBeLessThanOrEqual(0.15);
        }

});
