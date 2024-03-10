import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

Given("the user is in the {string} page", (page: string) => {
  // Visit the specified page
  cy.visit(page);
});

When("the user clicks the {string} icon at the navbar", (button: string) => {
  cy.getDataCy(button).click();
});

When(
  "the user writes the genre {string} in the input text",
  (input: string) => {
    cy.getDataCy("input_value").type(input).type("{enter}");
  }
);

When("The user clicks in a {string} container", (button: string) => {
  cy.getDataCy(button).should("be.visible").first().click();
});

Then("the user is redirected to the {string} page", (page: string) => {
  cy.url().should("include", page);
});

Then(
  "a list with at most {string} songs is displayed in the {string} container",
  (maxSongs: string, section: string) => {
    cy.get(`[data-cy="${section}"]`).should(
      "have.length.at.most",
      parseInt(maxSongs)
    );
  }
);

Then(
  "a message is displayed saying {string} in the {string} span",
  (message: string, id: string) => {
    cy.get(`[data-cy="${id}"]`).contains(message);
  }
);

Then("The title and artist of the song must appear in the playbar", () => {
  cy.get("[data-cy='title']").should("exist");
  cy.get("[data-cy='artist']").should("exist");
});
