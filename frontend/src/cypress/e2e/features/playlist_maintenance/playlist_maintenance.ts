import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

// Common steps
Given("the user is in the {string} page", (page: string) => {
    cy.on('uncaught:exception', (err, runnable) => {
        console.error('Uncaught exception:', err.message);
        return false; // Prevent Cypress from failing the test due to the uncaught exception
    });

    // Visit the specified page
    cy.visit(page);
});


Given("the {string} list has {string} playlists", (container: string, count: string) => {
    cy.getDataCy(container).children().should("have.length", parseInt(count));
});

Given('the {string} list of {string} has {string} songs', (container: string, playlistName: string, songCount: string) => {
    cy.get(`[data-cy="playlist-item-${playlistName}"] [data-cy="view-songs"]`).click();
    cy.getDataCy(container).children().should("have.length", parseInt(songCount));
});

When("the user clicks the {string} button", (button: string) => {
    cy.getDataCy(button).click();
});

When("clicks the {string} button in the modal", (button: string) => {
    cy.getDataCy(button).click();
});

// Scenario: Create a New Playlist
When("the user enters the name {string} in the modal input", (playlistName: string) => {
    cy.get('[data-cy="playlist-name-input"]').type(playlistName);
});


Then("the user should have {string} playlists, including {string}", (playlistCount: string, playlistName: string) => {
    cy.get('[data-cy^="playlist-item-"]').should("have.length", parseInt(playlistCount));
    cy.get('[data-cy^="playlist-item-"]').contains(playlistName);
});

//Scenario: Delete a Playlist
Given('there is an existing playlist named {string}', (playlistName: string) => {
    cy.get('[data-cy^="playlist-item-"]').contains(playlistName);
});

When('the user clicks the {string} button for {string}', (button: string, playlistName: string) => {
    cy.get(`[data-cy="playlist-item-${playlistName}"] [data-cy="${button}"]`).click();
});

Then("the user should have {string} playlists", (playlistCount: string) => {
    cy.get('[data-cy^="playlist-item-"]').should("have.length", parseInt(playlistCount));
});

Then('there should be no playlist named {string}', (playlistName: string) => {
    cy.get('[data-cy^="playlist-item-"]').should("not.contain", playlistName);
});

//Scenario: Remove a Song from Playlist
Given('the {string} list of {string} has {string} songs already', (container: string, playlistName: string, songCount: string) => {
    cy.request('PUT', 'http://localhost:5001/api/playlists/addSong/1/9', { userId: "1" });
    cy.get(`[data-cy="playlist-item-${playlistName}"] [data-cy="view-songs"]`).click();
    cy.getDataCy(container).children().should("have.length", parseInt(songCount));
});

When('the user clicks the {string} button for {string} song in the playlist', (button: string, songName: string) => {
    cy.get(`[data-cy="song-item-${songName}"] [data-cy="${button}"]`).click();
});

Then('the {string} list of {string} should display {string} songs', (container: string, playlistName: string, songCount: string) => {
    cy.getDataCy(container).children().should("have.length", parseInt(songCount));
});

Then('there should be no song named {string}', (songName: string) => {
    cy.get('[data-cy^="song-item-"]').should("not.contain", songName);
});

//Scenario: Rename a Playlist
Given('there is an old existing playlist named {string}', (playlistName: string) => {
    cy.request('POST', 'http://localhost:5001/api/playlists', { name: playlistName, createdBy: "1" });
    cy.get('[data-cy^="playlist-item-"]').contains(playlistName);
});

Then("in the {string} page should be no playlist named {string}", (page: string, playlistName: string) => {
    cy.visit(page);
    cy.get('[data-cy^="playlist-item-"]').should("not.contain", playlistName);
});

Then("in the {string} page should be a playlist named {string}", (page: string, playlistName: string) => {
    cy.visit(page);
    cy.get('[data-cy^="playlist-item-"]').contains(playlistName);
    cy.get(`[data-cy="playlist-item-${playlistName}"] [data-cy="delete-playlist"]`).click();
    cy.getDataCy("confirm-delete-playlist").click();
});

//Scenario: Attempt to Create a Playlist Without Name
Then("the user should see an error message in the modal", () => {
    cy.get('[data-cy="playlist-name-input"] + [data-cy="error-message"]').should("be.visible");
});

Then("the user should still have {string} playlists in the {string} list", (count: string, container: string) => {
    cy.getDataCy(container).children().should("have.length", parseInt(count));
});