"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const APIUtils_1 = require("../utils/APIUtils");
const orderPayload = {
    orders: [{ country: "India", productOrderedId: "6262e95ae26b7e1a10e89bf0" }]
};
const loginPayload = { userEmail: "anshika@gmail.com", userPassword: "Iamking@000" };
let response;
test_1.test.beforeAll(async () => {
    const apiContext = await test_1.request.newContext();
    const apiUtils = new APIUtils_1.APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);
    console.log("response");
});
(0, test_1.test)('Login test', async ({ page }) => {
    page.addInitScript(value => {
        window.localStorage.setItem("token", value);
    }, response.token);
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");
    for (let i = 0; i < await rows.count(); i++) {
    }
});
