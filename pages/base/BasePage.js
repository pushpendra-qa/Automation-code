class BasePage
{
    constructor(page)
    {
        this.page = page;
    }

    async open(path = '/')
    {
        await this.page.goto(path, { waitUntil: 'domcontentloaded' });
    }

    async waitForPageReady()
    {
        await this.page.waitForLoadState('domcontentloaded');
    }
}

module.exports = { BasePage };
