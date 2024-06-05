const { defineConfig } = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity: false,
  experimentalModifyObstructiveThirdPartyCode: true,
  reporters: 'mochawesome',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require("cypress-mochawesome-reporter/plugin")(on);
    },
  },
});
