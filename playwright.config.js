import { devices } from "@playwright/test";


export default {
  testDir: './dist/tests',
  resolve: {
    extensions: ['.js', '.ts'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader'
      }
    ]
  },
  workers: 4,
  devices: devices,
  use: {
    browserName: 'chromium',
    headless: true,
    viewport: { width: 1920, height: 1080 },
    ignoreHTTPSErrors: true,
    video: 'on-first-retry',
  }
};


