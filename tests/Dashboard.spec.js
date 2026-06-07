const { test, expect } = require('@playwright/test');

const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');

test('End To End Test', async ({ page }) =>
{
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    // Open app
    await loginPage.goTo();

    // Login
    await loginPage.validlogin(
        "whctarkar24@gmail.com",
        "Harekrishna108"
    );

    // Wait for dashboard
    await dashboardPage.waitForDashboard();

    // Add product
    await dashboardPage.addProductToCart('ZARA COAT 3');

    // Go to cart
    //await dashboardPage.goToCart();

    await page.pause();
});