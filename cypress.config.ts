/* eslint-disable @typescript-eslint/no-require-imports */
const { defineConfig } = require("cypress");
require("dotenv").config();

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173", // Vite default port
    env: {
      VALID_EMAIL: process.env.CYPRESS_VALID_EMAIL,
      VALID_PASSWORD: process.env.CYPRESS_VALID_PASSWORD,
    },
  },
});
