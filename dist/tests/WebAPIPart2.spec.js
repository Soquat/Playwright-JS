"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
let webContext;
test_1.test.beforeAll(async ({ browser }) => {
    const email = "anshika@gmail.com";
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").type("Iamking@000");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await context.storageState({ path: 'state.json' });
    webContext = await browser.newContext({ storageState: 'state.json' });
});
(0, test_1.test)('Login test', async () => {
    const productName = "zara coat 3";
    const email = "anshika@gmail.com";
    const page = await webContext.newPage();
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    const count = await products.count();
    for (let i = 0; i < count; i++) {
        let text = await products.nth(i).locator("b").textContent();
        if (text === productName) {
            await products.nth(i).locator("text=Add To Cart").click();
        }
    }
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('zara coat 3')").isVisible();
    (0, test_1.expect)(bool).toBeTruthy();
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
    await (0, test_1.expect)(page.locator(".user__name .input[type='text']")).toHaveValue(email);
    await page.locator(".action__submit").click();
    await (0, test_1.expect)(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);
});
