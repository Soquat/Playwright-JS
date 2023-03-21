const { Given, When, Then } = require("@cucumber/cucumber");
const { POManager } = require('../../pageObjects/POManager');
const { expect } = require('@playwright/test');
const playwright = require('@playwright/test');

Given('a login to Ecommerce app with {string} and {string}', { timeout: 100 * 1000 }, async function (username, password) {

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



Given('a login to Ecommerce2 app with {string} and {string}', async function (userName, password) {
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const title = await this.page.title();
    const usernameField = this.page.locator('#username');
    const pw = this.page.locator("[type='password']");
    const signIn = this.page.locator("#signInBtn");
    await usernameField.type(userName);
    await pw.type(password);
    await signIn.click();
});

Then('Verify Error message is displayed', async function () {
    const errorMessage = await this.page.locator("[style*='block']").textContent();
    await expect(this.page.locator("[style*='block']")).toContainText("Incorrect");
});