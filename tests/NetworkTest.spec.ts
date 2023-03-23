import { test, expect, request } from "@playwright/test";
import { APIUtils } from "../utils/APIUtils";

const orderPayload = {
    orders: [{ country: "India", productOrderedId: "6262e95ae26b7e1a10e89bf0" }]
}
const loginPayload = { userEmail: "anshika@gmail.com", userPassword: "Iamking@000" };
const fakePayLoadOrders = { data: [], message: "No Orders" }
let response: any;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);
});




test('Login test', async ({ page }) => {
    await page.addInitScript((token: string) => {
        localStorage.setItem('token', token);
    }, response.token);

    await page.goto('https://rahulshettyacademy.com/client');

    await page.route(
        'https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/620c7bf148767f1f1215d2ca',
        async (route, request) => {
            const response = await route.request().response();

            let body = JSON.stringify(fakePayLoadOrders);
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body,
            });
        }
    );

    await page.locator('button[routerlink*="myorders"]').click();
    console.log(await page.locator('.mt-4').textContent());
});
