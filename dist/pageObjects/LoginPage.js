"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginPage = void 0;
class LoginPage {
    constructor(page) {
        this.page = page;
        this.signInButton = page.locator("[value='Login']");
        this.userNameInput = page.locator("#userEmail");
        this.passwordInput = page.locator("#userPassword");
    }
    async goTo() {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }
    async validLogin(userName, password) {
        await this.userNameInput.fill(userName);
        await this.passwordInput.type(password);
        await this.signInButton.click();
        await this.page.waitForLoadState('networkidle');
    }
}
exports.LoginPage = LoginPage;
