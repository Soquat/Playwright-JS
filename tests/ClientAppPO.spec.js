const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageObjects/POManager');
const { customtest } = require("../utils/test-base");

const dataSet = JSON.parse(JSON.stringify(require("../utils/placeorderTestData.json")));

for (const data of dataSet) {
    test(`Login test with ${data.productname}`, async ({ page }) => {

        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        const products = page.locator(".card-body");
        await loginPage.goTo();
        await loginPage.validLogin(data.userName, data.password);

        const dashBoardPage = poManager.getDashboarPage();
        await dashBoardPage.searchProductAddCart(data.productName);
        await dashBoardPage.navigateToCart();

        await page.locator("div li").first().waitFor();
        const bool = await page.locator("h3:has-text('zara coat 3')").isVisible();
        expect(bool).toBeTruthy();

        await page.locator("text=Checkout").click();
        await page.locator("[placeholder='Select Country']").type("ind", { delay: 100 });
        const dropdown = await page.locator(".ta-results");
        await dropdown.waitFor();
        const optionsCount = await dropdown.locator("button").count();

        for (let i = 0; i < optionsCount; i++) {
            let text = await dropdown.locator("button").nth(i).textContent();
            if (text === " India") {
                await dropdown.locator("button").nth(i).click();
                break;
            }
        }

        await expect(page.locator(".user__name .input[type='text']")).toHaveValue(data.userName);
        await page.locator(".action__submit").click();

        await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

        const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
        console.log(orderId);
        await page.pause();

    });
}

customtest(`Client App login`, async ({ page, testDataForOrder }) => {

    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    const products = page.locator(".card-body");
    await loginPage.goTo();
    await loginPage.validLogin(testDataForOrder.userName, testDataForOrder.password);

    const dashBoardPage = poManager.getDashboarPage();
    await dashBoardPage.searchProductAddCart(testDataForOrder.productName);
    await dashBoardPage.navigateToCart();

    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('zara coat 3')").isVisible();
    expect(bool).toBeTruthy();

});
