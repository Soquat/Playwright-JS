const { test, expect } = require('@playwright/test');


test('Browser Content Playwright test', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const title = await page.title();
    const cardTitles = await page.locator(".card-body a");
    console.log(title);
    //selectors
    const username = page.locator('#username');
    const pw = page.locator("[type='password']");
    const signIn = page.locator("#signInBtn");
    await username.type("Michael");
    await pw.type("test");
    await signIn.click();
    const errorMessage = await page.locator("[style*='block']").textContent();
    console.log(errorMessage);
    await expect(page.locator("[style*='block']")).toContainText("Incorrect");

    await username.fill("");
    await username.fill("rahulshettyacademy");
    await pw.fill("");
    await pw.fill("learning");
    await Promise.all(
        [
            page.waitForLoadState(),
            signIn.click()
        ]
    );

    //console.log(await cardTitles.nth(0).textContent());
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);

})

test('Page Playwright test', async ({ page }) => {
    await page.goto("https://google.com");
    const title = await page.title();
    console.log(title);
    await expect(page).toHaveTitle("Google");

});
