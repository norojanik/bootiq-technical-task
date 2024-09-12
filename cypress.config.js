const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://opensource-demo.orangehrmlive.com/",
    env: {
      username: "Admin", // Set environment variables here
      password: "admin123",
    },
    setupNodeEvents(on, config) {},
  },
});
