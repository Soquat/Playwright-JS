const { Given, When, Then } = require("@cucumber/cucumber");
const { POManager } = require('../../pageObjects/POManager');
const { test, expect, playwright } = require('@playwright/test');

Given('a login to Ecommerce app with {username} and {password}', async function (username, password) {
    const browser = await playwright.chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    const products = page.locator(".card-body");
    await loginPage.goTo();
    await loginPage.validLogin(data.userName, data.password);
    return 'pending';
});

When('Add {string} to cart', async function (string) {
    const dashBoardPage = poManager.getDashboarPage();
    await dashBoardPage.searchProductAddCart(data.productName);
    await dashBoardPage.navigateToCart();
    return 'pending';
});

Then('Verify {string} is displayed in the cart', async function (string) {
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('zara coat 3')").isVisible();
    expect(bool).toBeTruthy();
    return 'pending';
});

