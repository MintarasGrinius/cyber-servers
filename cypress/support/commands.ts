/// <reference types="cypress" />

Cypress.Commands.add("login", () => {
  // (fetch)POST https://playground.tesonet.lt/v1/tokens

  cy.intercept("POST", "https://playground.tesonet.lt/v1/tokens", {
    statusCode: 200,
    body: {
      token: "VALID_TOKEN",
    },
  }).as("login");
  cy.visit("/login");
  cy.contains("Username").type(Cypress.env("VALID_EMAIL"));
  cy.contains("Password").type(Cypress.env("VALID_PASSWORD"));
  cy.get("button[type='submit']").click();
});
