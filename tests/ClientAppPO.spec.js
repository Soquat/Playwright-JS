const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageObjects/POManager');
const { customtest } = require("../utils/test-base");

const dataSet = JSON.parse(JSON.stringify(require("../utils/placeorderTestData.json")));

for (const data of dataSet) {
    test(`@Web Login test with ${data.productName}`, async ({ page }) => {

        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        const products = page.locator(".card-body");
        await loginPage.goTo();
        await loginPage.validLogin(data.userName, data.password);

        const dashBoardPage = poManager.getDashboarPage();
        await dashBoardPage.searchProductAddCart(data.productName);
        await dashBoardPage.navigateToCart();


    });
}

customtest(` Client App login`, async ({ page, testDataForOrder }) => {

    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    const products = page.locator(".card-body");
    await loginPage.goTo();
    await loginPage.validLogin(testDataForOrder.userName, testDataForOrder.password);

    const dashBoardPage = poManager.getDashboarPage();
    await dashBoardPage.searchProductAddCart(testDataForOrder.productName);
    await dashBoardPage.navigateToCart();

});
