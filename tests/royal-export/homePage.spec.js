const { test, expect } = require('../fixtures/royalExportFixture');
const { homePageData } = require('../../test-data/royal-export/homePageData');

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
