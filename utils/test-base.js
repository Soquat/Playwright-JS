const base = require("@playwright/test");

exports.customtest = base.test.extend(
    {
        testDataForOrder: {
            userName: "anshika@gmail.com",
            password: "Iamking@000",
            productName: "zara coat 3"
        }
    }
)