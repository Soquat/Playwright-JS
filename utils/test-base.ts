import { test } from "@playwright/test";


type TestData = {
  userName: string;
  password: string;
  productName: string;
};

const customtest = test.extend<{
  testDataForOrder: TestData;
}>({
  testDataForOrder: {
    userName: "anshika@gmail.com",
    password: "Iamking@000",
    productName: "zara coat 3"
  }
});

export default customtest;
