const { Given, When, Then } = require("@cucumber/cucumber");
const { POManager } = require('../../pageObjects/POManager');
const { expect } = require('@playwright/test');
const playwright = require('@playwright/test');

Given('a login to Ecommerce app with {string} and {string}', { timeout: 100 * 1000 }, async function (username, password) {
    const browser = await playwright.chromium.launch();
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.poManager = new POManager(this.page);
    const loginPage = this.poManager.getLoginPage();
    const products = this.page.locator(".card-body");
    await loginPage.goTo();
    await loginPage.validLogin(username, password);
});

When('Add {string} to cart', async function (productName) {
    const dashBoardPage = this.poManager.getDashboarPage();
    await dashBoardPage.searchProductAddCart(productName);
    await dashBoardPage.navigateToCart();
});

Then('Verify {string} is displayed in the cart', async function (productName) {
    await this.page.locator("div li").first().waitFor();
    const bool = await this.page.locator(`h3:has-text("${productName}")`).isVisible();
    expect(bool).toBeTruthy();
});

