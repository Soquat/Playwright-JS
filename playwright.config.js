// @ts-check
const { defineConfig, devices } = require('@playwright/test');


module.exports = defineConfig({
  testDir: './tests',
  workers: 4,

  // timout for one test!
  timeout: 30 * 1000,

  // timeout for all assertions!
  expect: {

    timeout: 5000
  },
  reporter: 'html',
  use: {
    browserName: 'chromium',
    headless: false,
    screenshot: "only-on-failure",
    trace: 'retain-on-failure',
    video: 'retain-on-failure',

  },
});


