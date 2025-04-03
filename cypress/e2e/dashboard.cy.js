describe("Dashboard page", () => {
  beforeEach(() => {
    cy.login();
  });

  it("should load dashboard page", () => {
    cy.url().should("include", "/dashboard");
    cy.contains("Welcome to the Dashboard").should("be.visible");
  });

  it("click on Have a look at our servers button navigates to servers page", () => {
    cy.contains("Have a look at our servers").click();
    cy.url().should("include", "/servers");
  });
});
