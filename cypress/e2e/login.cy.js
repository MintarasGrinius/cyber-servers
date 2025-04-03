// import "./commands";

describe("Login page", () => {
  it("should load login page", () => {
    cy.visit("/");
    cy.url().should("include", "/login");
    cy.contains("Welcome Back").should("be.visible");
    cy.contains("Login to continue to your account").should("be.visible");
  });

  it("accessing /dashboard without login successful login redirects back to login", () => {
    cy.visit("/dashboard");
    cy.url().should("include", "/login");
    cy.contains("Welcome Back").should("be.visible");
  });

  it("should show error message for invalid credentials", () => {
    cy.visit("/login");
    cy.contains("Username").type("invalidUser");
    cy.contains("Password").type("invalidPass");
    cy.get("button[type=submit]").click();
    cy.url().should("include", "/login");
    cy.contains("Invalid credentials").should("be.visible");
  });

  it("should show error message for empty credentials", () => {
    cy.visit("/login");
    cy.get("button[type=submit]").click();
    cy.url().should("include", "/login");
    cy.contains("Username is required").should("be.visible");
    cy.contains("Password is required").should("be.visible");
  });

  it("should login successfully", () => {
    cy.login();
    cy.url().should("include", "/dashboard");
    cy.contains("Welcome to the Dashboard").should("be.visible");
  });

  it("should logout successfully", () => {
    cy.login();
    cy.contains("Logout").click();
    cy.url().should("include", "/login");
    cy.contains("Welcome Back").should("be.visible");
  });
});
