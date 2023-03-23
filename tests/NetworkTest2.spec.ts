import { test, expect, request } from "@playwright/test";
import { APIUtils } from "../utils/APIUtils";
const orderPayload = {
    orders: [{ country: "India", productOrderedId: "6262e95ae26b7e1a10e89bf0" }]
}
const loginPayload = { userEmail: "rahulshetty@gmail.com", userPassword: "Iamking@00" };
const fakePayLoadOrders = { data: [], message: "No Orders" }
let response:any;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);
    console.log("response");
});


test('Login test', async ({ page }) => {
    page.addInitScript(value => {
        window.localStorage.setItem("token", value);
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client");


    await page.locator("button[routerlink*='myorders']").click();


    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=64184458568c3e9fb13763fa", async (route) => {
        await route.continue({
            url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=64185b19568c3e9fb13782be"


        });
    })


    await page.locator("button:has-text('View')").first().click();


});