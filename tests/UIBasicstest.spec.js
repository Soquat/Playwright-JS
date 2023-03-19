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

test('UI Controls', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const username = page.locator('#username');
    const pw = page.locator("[type='password']");
    const signIn = page.locator("#signInBtn");
    const dropdown = page.locator("[data-style='btn-info'] ");
    await username.fill("rahulshettyacademy");
    await pw.fill("learning");
    await dropdown.selectOption("consult")

    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    await expect(page.locator("[href='https://rahulshettyacademy.com/documents-request']")).toHaveAttribute("class", "blinkingText");
});

test.only('Child windows', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href='https://rahulshettyacademy.com/documents-request']");

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        documentLink.click()
    ]);

    const text = await newPage.locator(".red").textContent();
    const array = text.split("@");
    const domain = array[1].split(" ")[0];
    console.log(domain);

    const username = page.locator('#username');

    await username.type(domain);

    //await page.pause();

});
