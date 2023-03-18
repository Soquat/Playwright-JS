const { test } = require('@playwright/test');


test('Browser Content Playwright test', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://amazon.com");
})

test('Page Playwright test', async ({ page }) => {
    await page.goto("https://google.com");

});
