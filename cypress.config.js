const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:5500/',
    specPattern: 'cypress/e2e/**/*.spec.{js,jsx,ts,tsx}',
    video: false,
    screenshotOnRunFailure: false
  },
  reporter: 'mochawesome',
  reporterOptions: {
    "reportDir": "cypress/results/json",
    "overwrite": false,
    "html": false,
    "json": true
  },
});
