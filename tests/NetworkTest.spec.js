const { test, expect, request } = require("@playwright/test");
const { APIUtils } = require("../utils/APIUtils")
const orderPayload = {
    orders: [{ country: "India", productOrderedId: "6262e95ae26b7e1a10e89bf0" }]
}
const loginPayload = { userEmail: "anshika@gmail.com", userPassword: "Iamking@000" };
const fakePayLoadOrders = { data: [], message: "No Orders" }
let response;

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

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/620c7bf148767f1f1215d2ca",     // monitor call with this URL
        async route => {     // if URL is triggered make this:
            //intercepting response - Api response -> ||| playwright fake response ||| -> browser -> render data
            const response = await page.request.fetch(route.request()); // make real http request to the route
            let body = JSON.stringify(fakePayLoadOrders); //fake data as string
            route.fulfill(   // replace body with fake data
                {
                    response,
                    body
                }
            )
        }
    );
    await page.locator("button[routerlink*='myorders']").click();
    console.log(await page.locator(".mt-4").textContent());
    await page.pause();

});