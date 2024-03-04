import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

// Scenario: User turns off tracking of play history
Given(
  "the user is logged in the {string} page",
  (user: string, password: string) => {
    cy.visit("/my-profile");
  }
);

Given(
  "the {string} button is set to {string}",
  (button: string, value: string) => {
    // check if the button is set to value. if not, toggle it
    cy.getDataCy(button).then(($button) => {
      if ($button.prop("checked") != value) {
        cy.getDataCy(button).click();
      }
    });
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
