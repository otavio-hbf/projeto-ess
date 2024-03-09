import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

// Scenario: Songs shown in the feed page
Given("The user is in the {string} page", (page: string) => {
    // Visit the specified page
    cy.visit(page);
});

Then("{string} must have all {string} songs of the database", (section: string, songQtt: string) => {
    cy.get(`[data-cy="${section}"]`).should("have.length", parseInt(songQtt));
});

// Scenario: Recommendations
Then("The {string} section should have at least {string} song", (section: string, minSongs: string) => {
    cy.get(`[data-cy="${section}"]`).should("have.length.at.least", parseInt(minSongs));
});

Then("The {string} section should have no more than {string} songs", (section: string, maxSongs: string) => {
    cy.get(`[data-cy="${section}"]`).should("have.length.at.most", parseInt(maxSongs));
});

// Scenario: Clicking in a song
When("The user clicks in a SongItem at the {string}", (section: string) => {
    cy.get(`[data-cy="${section}"]`)
    .should('be.visible')
    .first()
    .click();
});

Then("The title and artist of the song must appear in the playbar", () => {
    cy.get("[data-cy='title']").should("exist");
    cy.get("[data-cy='artist']").should("exist");
});
