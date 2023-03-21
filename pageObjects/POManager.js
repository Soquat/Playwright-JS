const { DashBoardPage } = require("./DashBoardPage");
const { LoginPage } = require("./LoginPage");

class POManager {
    constructor(page) {
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



module.exports = { POManager };