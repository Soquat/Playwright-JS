"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const POManager_1 = require("../pageObjects/POManager");
const test_base_1 = __importDefault(require("../utils/test-base"));
const placeorderTestData_json_1 = __importDefault(require("../utils/placeorderTestData.json"));
const dataSet = JSON.parse(JSON.stringify(placeorderTestData_json_1.default));
for (const data of dataSet) {
    (0, test_1.test)(`@Web Login test with ${data.productName}`, async ({ page }) => {
        const poManager = new POManager_1.POManager(page);
        const loginPage = poManager.getLoginPage();
        const products = page.locator(".card-body");
        await loginPage.goTo();
        await loginPage.validLogin(data.userName, data.password);
        const dashBoardPage = poManager.getDashboarPage();
        await dashBoardPage.searchProductAddCart(data.productName);
        await dashBoardPage.navigateToCart();
    });
}
(0, test_base_1.default)(` Client App login`, async ({ page, testDataForOrder }) => {
    const poManager = new POManager_1.POManager(page);
    const loginPage = poManager.getLoginPage();
    const products = page.locator(".card-body");
    await loginPage.goTo();
    await loginPage.validLogin(testDataForOrder.userName, testDataForOrder.password);
    const dashBoardPage = poManager.getDashboarPage();
    await dashBoardPage.searchProductAddCart(testDataForOrder.productName);
    await dashBoardPage.navigateToCart();
});
