class DashboardPage
{

    constructor(page)
    {
        this.page = page;
        //products
       this.products = page.locator('.card-body');

       //cart button
       this.cartButton = page.locator('[routerlink*="cart"]');

       //order button
       this.orderButton = page.locator('[routerlink*="myorders"]');

    }
       async waitForDashboard()
       {
        await this.products.first().waitFor();
       }

       async addProductToCart(productName)
       {
        const count=await this.products.count();
        for(let i=0;i<count;i++)
            {
                const producttext = await this.products.nth(i).locator('b').textContent();
                if(producttext === productName)
                    {
                        await this.products.nth(i).locator('text = Add To Cart').click();
                        break;
                    }
            }
       }


}

module.exports={ DashboardPage};

