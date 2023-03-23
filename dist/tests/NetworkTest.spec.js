"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const APIUtils_1 = require("../utils/APIUtils");
const orderPayload = {
    orders: [{ country: "India", productOrderedId: "6262e95ae26b7e1a10e89bf0" }]
};
const loginPayload = { userEmail: "anshika@gmail.com", userPassword: "Iamking@000" };
const fakePayLoadOrders = { data: [], message: "No Orders" };
let response;
test_1.test.beforeAll(async () => {
    const apiContext = await test_1.request.newContext();
    const apiUtils = new APIUtils_1.APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);
});
(0, test_1.test)('Login test', async ({ page }) => {
    await page.addInitScript((token) => {
        localStorage.setItem('token', token);
    }, response.token);
    await page.goto('https://rahulshettyacademy.com/client');
    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/620c7bf148767f1f1215d2ca', async (route, request) => {
        const response = await route.request().response();
        let body = JSON.stringify(fakePayLoadOrders);
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            body,
        });
    });
    await page.locator('button[routerlink*="myorders"]').click();
    console.log(await page.locator('.mt-4').textContent());
});
