const { BasePage } = require('../base/BasePage');

class RoyalExportHomePage extends BasePage
{
    constructor(page)
    {
        super(page);
        this.headerBrandLink = page.locator('[alt="Royal Export Logo"]');
        this.currencySelectorButton = page.locator('[data-toggle="dropdown"]').first();
        this.currencyDropdown = page.locator('[class="dropdown-menu curre drop-cust"]');
        this.currencyOptions = this.currencyDropdown.locator('li');
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
