const { test, expect } = require('@playwright/test');

test.only('Login test', async ({ page }) => {
    const productName = "zara coat 3";
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("anshika@gmail.com");
    await page.locator("#userPassword").type("Iamking@000");
    await page.locator("[value='Login']").click();

    await page.waitForLoadState('networkidle');
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles)
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



    await page.pause();

});