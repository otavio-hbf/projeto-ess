import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// Scenario: User searches songs by artist's name
Given("The user is at the {string} page", (page: string) => {
    // Listen to the 'uncaught:exception' event
    cy.on('uncaught:exception', (err, runnable) => {
        // Log the error if an uncaught exception occurs
        console.error('Uncaught exception:', err.message);
        return false; // Prevent Cypress from failing the test due to the uncaught exception
    });

    // Visit the specified page
    cy.visit(page);
});

When("The user searches for keyword {string}", (keyword: string) => {
    // Type the artist's name into the search bar and press Enter
    cy.get('[data-cy="input-name"]').type(keyword).type("{enter}");
});

Then("At least {string} songs are shown at the {string} section", (minSongs: string, section: string) => {
    // Assert that at least the specified number of songs is shown in the specified section
    cy.get(`[data-cy="${section}"]`).should("have.length.at.least", parseInt(minSongs));
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

// Scenario: User searchs playlists by name        
    Then("At least {string} playlist is shown at the {string} section", (minSongs: string, section: string) => {
        cy.get(`[data-cy="${section}"]`).should("have.length.at.least", parseInt(minSongs));
    });