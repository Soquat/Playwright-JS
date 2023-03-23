import { Page } from "@playwright/test";
import { DashBoardPage } from "./DashBoardPage";
import { LoginPage } from "./LoginPage";

export class POManager {
    page;
    loginPage;
    dashboardPage;
    constructor(page:Page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashBoardPage(this.page);
    }


    getLoginPage() {
        return this.loginPage;
    }

    getDashboarPage() {
        return this.dashboardPage;
    }
}
