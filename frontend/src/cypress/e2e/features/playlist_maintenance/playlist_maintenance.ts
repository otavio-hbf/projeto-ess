import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

// Common steps
Given("the user is in the {string} page", (page: string) => {
    cy.visit(page);
});

Given("the {string} list has {string} playlists", (container: string, count: string) => {
    cy.getDataCy(container).children().should("have.length", parseInt(count));
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
Given('the {string} list of {string} has {string} songs', (container: string, playlistName: string, songCount: string) => {
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