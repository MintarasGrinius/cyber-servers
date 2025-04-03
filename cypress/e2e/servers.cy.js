describe("Servers page", () => {
  beforeEach(() => {
    cy.login();
  });

  it("should load servers page", () => {
    cy.intercept("GET", "https://playground.tesonet.lt/v1/servers", []);
    cy.visit("/servers");
    cy.url().should("include", "/servers");
    cy.contains("Servers List").should("be.visible");
  });

  it("servers list should be empty", () => {
    cy.intercept("GET", "https://playground.tesonet.lt/v1/servers", []).as(
      "getServers"
    );

    cy.visit("/servers");
    cy.wait("@getServers");
    cy.url().should("include", "/servers");
    cy.contains("No servers available").should("be.visible");
  });

  it("servers list should be populated", () => {
    cy.intercept("GET", "https://playground.tesonet.lt/v1/servers", [
      {
        name: "Testiny",
        distance: 100,
      },
    ]).as("getServers");

    cy.visit("/servers");
    cy.wait("@getServers");
    cy.url().should("include", "/servers");
    cy.contains("Testiny").should("be.visible");
    cy.contains("100").should("be.visible");
  });

  it("servers list flitering by name", () => {
    cy.intercept("GET", "https://playground.tesonet.lt/v1/servers", [
      {
        name: "Testiny",
        distance: 100,
      },
      {
        name: "SomeServer",
        distance: 200,
      },
    ]).as("getServers");

    cy.visit("/servers");
    cy.wait("@getServers");
    cy.url().should("include", "/servers");
    cy.contains("Testiny").should("be.visible");
    cy.get("input[placeholder='Filter names...']").type("esti");
    cy.contains("SomeServer").should("not.exist");
    cy.contains("Testiny").should("be.visible");
  });

  it("servers list flitering by distance", () => {
    cy.intercept("GET", "https://playground.tesonet.lt/v1/servers", [
      {
        name: "Testiny",
        distance: 100,
      },
      {
        name: "SomeServer",
        distance: 200,
      },
    ]).as("getServers");

    cy.visit("/servers");
    cy.wait("@getServers");
    cy.url().should("include", "/servers");
    cy.contains("Testiny").should("be.visible");
    cy.get("input[placeholder='Filter distance from...']").type("101");
    cy.get("input[placeholder='Filter distance to...']").type("200");
    cy.contains("Testiny").should("not.exist");
    cy.contains("SomeServer").should("be.visible");
  });

  it("servers query trows error", () => {
    cy.intercept("GET", "https://playground.tesonet.lt/v1/servers", {
      statusCode: 500,
      body: {},
    }).as("getServers");

    cy.visit("/servers");
    cy.wait("@getServers");
    cy.url().should("include", "/servers");
    cy.contains("Ay caramba!").should("be.visible");
  });

  it("servers query is loading", () => {
    cy.intercept("GET", "https://playground.tesonet.lt/v1/servers", {
      delay: 5000,
      body: [],
    });

    cy.visit("/servers");
    cy.url().should("include", "/servers");
    cy.get("[data-testid=servers-table-skeleton]").should("be.visible");
  });
});
