import { test, expect, request } from "@playwright/test";
import { APIUtils } from "../utils/APIUtils";
const orderPayload = {
    orders: [{ country: "India", productOrderedId: "6262e95ae26b7e1a10e89bf0" }]
}
const loginPayload = { userEmail: "anshika@gmail.com", userPassword: "Iamking@000" };
let response: any;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);
    console.log("response")


});


test('Login test', async ({ page }) => {
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