import { Page } from "@playwright/test";

export class LoginPage {
    page;
    signInButton;
    userNameInput;
    passwordInput;

    constructor(page: Page) {
        this.page = page;
        this.signInButton = page.locator("[value='Login']");
        this.userNameInput = page.locator("#userEmail");
        this.passwordInput = page.locator("#userPassword");

    }

    async goTo() {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async validLogin(userName: string, password: string) {
        await this.userNameInput.fill(userName);
        await this.passwordInput.type(password);
        await this.signInButton.click();
        await this.page.waitForLoadState('networkidle');
    }

}
