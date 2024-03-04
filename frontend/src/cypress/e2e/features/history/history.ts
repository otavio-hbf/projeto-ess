import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

// Scenario: User turns off tracking of play history
Given("the user is in the {string} page", (page: string) => {
  cy.visit(page);
});

Given(
  "the {string} button is set to {string}",
  (switchb: string, value: string) => {
    if (value == "true") {
      cy.get('[data-cy="toggle-tracking"] input[type="checkbox"]').check();
    } else {
      cy.get('[data-cy="toggle-tracking"] input[type="checkbox"]').uncheck();
    }
  }
);

When(
  "click the {string} button to turn off the tracking of my play history",
  (button: string) => {
    cy.getDataCy(button).click();
  }
);

Then("the {string} button should be off", (button: string) => {
  cy.getDataCy(button).should("not.be.checked");
});

Then(
  "the {string} button should be set to {string}",
  (button: string, value: string) => {
    if (value == "true") {
      cy.getDataCy(button).should("be.checked");
    } else {
      cy.getDataCy(button).should("not.be.checked");
    }
  }
);

// Scenario 2: User has disabled tracking of play history

When("the user visits the {string} page", (page: string) => {
  cy.visit(page);
});

When("the user clicks the {string} button", (button: string) => {
  cy.getDataCy(button).click();
});

Then(
  "the {string} list should display {string}",
  (container: string, msg: string) => {
    cy.getDataCy(container).contains(msg);
  }
);
