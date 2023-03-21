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
  projects: [
    {
      name: 'safari execution',
      use: {
        browserName: 'webkit',
        headless: true,
        //screenshot: "on",
        //trace: 'retain-on-failure',
        ...devices['iPhone 13'],     // width height from iPhone13!


      },
    },
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        headless: false,
        //screenshot: "on",
        //trace: 'retain-on-failure',
        //viewport: { width: 720, height: 720 }
        ignoreHTTPSErrors: true,      // click on advanced if website opens without ssl
        permissions: ['geolocation']  // automatically accepting location

      },
    }

  ],

});

// run test with specific project settings:
// npx playwright test tests/ClientAppPO.spec.js --config playwright config1.js --project=chrome


