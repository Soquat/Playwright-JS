"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const customtest = test_1.test.extend({
    testDataForOrder: {
        userName: "anshika@gmail.com",
        password: "Iamking@000",
        productName: "zara coat 3"
    }
});
exports.default = customtest;
