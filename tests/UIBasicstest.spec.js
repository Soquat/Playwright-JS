const { test, expect } = require('@playwright/test');


test('Browser Content Playwright test', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://amazon.com");
    const title = await page.title();
    console.log(title);
})

test('Page Playwright test', async ({ page }) => {
    await page.goto("https://google.com");
    const title = await page.title();
    console.log(title);
    await expect(page).toHaveTitle("Google");

});
