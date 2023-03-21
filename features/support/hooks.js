const playwright = require("@playwright/test");
const { POManager } = require("../../pageObjects/POManager");
const { Before, After, BeforeStep, AfterStep } = require("@cucumber/cucumber");


Before(async function () {
    const browser = await playwright.chromium.launch({
        headless: false
    });
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.poManager = new POManager(this.page);
});

After({ tags: "@Regression" }, function () {
    console.log("I am last to execute");
})

BeforeStep(function () {
    console.log("Next step");
})

AfterStep(async function ({ result }) {
    console.log(result)
    if (result.status === "Failed") {
        await this.page.screenshot({ path: "screenshot123.png" });
    }
})