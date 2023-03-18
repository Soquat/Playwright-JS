// @ts-check
const { defineConfig, devices } = require('@playwright/test');


module.exports = defineConfig({
  testDir: './tests',

  // timout for one test!
  timeout: 30 * 1000,

  // timeout for all assertions!
  expect: {

    timeout: 5000
  },
  reporter: 'html',
  use: {
    browserName: 'chromium',
    headless: false
  },
});


