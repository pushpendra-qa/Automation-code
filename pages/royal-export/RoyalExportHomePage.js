const { BasePage } = require('../base/BasePage');

class RoyalExportHomePage extends BasePage
{
    constructor(page)
    {
        super(page);
        this.headerBrandLink = page.getByRole('link', { name: /royal\s*export/i })
            .or(page.locator('header a:has(img), .navbar-brand'))
            .first();
        this.currencySelectorButton = page.locator('.select-currency-by-user-button').first();
        this.currencyDropdown = page.locator('.select-currency-by-user-div .dropdown-menu').first();
        this.currencyOptions = page.locator('.select-currency-by-user');
    }

    async goTo()
    {
        await this.open('/');
    }

    async waitForHomePageHeader()
    {
        await this.headerBrandLink.waitFor({ state: 'visible' });
    }

    async clickHeaderBrandLink()
    {
        await this.headerBrandLink.click();
        await this.waitForPageReady();
    }

    async openCurrencySelector()
    {
        await this.currencySelectorButton.click();
        await this.currencyDropdown.waitFor({ state: 'visible' });
    }

    async getCurrencyOptionLabels()
    {
        return this.currencyOptions.evaluateAll(options =>
            options.map(option => option.textContent.trim())
        );
    }

    async selectCurrency(currencyCode)
    {
        await this.currencyOptions.filter({ hasText: currencyCode }).first().click();
        await this.currencyDropdown.waitFor({ state: 'hidden' });
    }

}

module.exports = { RoyalExportHomePage };
