"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POManager = void 0;
const DashBoardPage_1 = require("./DashBoardPage");
const LoginPage_1 = require("./LoginPage");
class POManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage_1.LoginPage(this.page);
        this.dashboardPage = new DashBoardPage_1.DashBoardPage(this.page);
    }
    getLoginPage() {
        return this.loginPage;
    }
    getDashboarPage() {
        return this.dashboardPage;
    }
}
exports.POManager = POManager;
