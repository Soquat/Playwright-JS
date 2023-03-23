"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
(0, test_1.test)('Popup validations', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await (0, test_1.expect)(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await (0, test_1.expect)(page.locator("#displayed-text")).toBeHidden();
    page.on('dialog', dialog => dialog.accept());
    await page.locator("#confirmbtn").click();
    await page.locator("#mousehover").hover();
    await page.frameLocator("#courses-iframe");
});
(0, test_1.test)("screenshot and visuel comparision", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await (0, test_1.expect)(page.locator("#displayed-text")).toBeVisible();
    let textbox = await page.locator("#hide-textbox");
    await textbox.click();
    await textbox.screenshot({ path: "screenshot.png" });
    await (0, test_1.expect)(page.locator("#displayed-text")).toBeHidden();
});
