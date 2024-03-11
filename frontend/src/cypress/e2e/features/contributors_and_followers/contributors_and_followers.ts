// follow_playlist_spec.js

import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("the user is in the {string} page", (page:string) => {
cy.visit(page);
});

Given("there is {string} followers in {string}", (followerCount: string, followersElement: string) => {
cy.getDataCy(followersElement).should("contain.text", `Followers: ${followerCount}`);
});

Given("there is {string} contributors in {string}", (contributorCount: string, contributorsElement: string) => {
cy.getDataCy(contributorsElement).should("contain.text", `Contributors: ${contributorCount}`);
});

Given("a {string} button is visible", (button: string) => {
cy.getDataCy(button).should("exist");
});

When("the user clicks the {string} button", (button: string) => {
cy.getDataCy(button).click();
});

Then("{string} displays {string}", (followersElement: string, followerCount: string) => {
cy.getDataCy(followersElement).should("contain.text", `${followerCount}`);
});

Then("there is a {string} button", (button: string) => {
cy.getDataCy(button).should("exist");
});

Then("{string} displays {string} name", (contributorsElement: string, contributorCount: string) => {
cy.getDataCy(contributorsElement).children().should("have.length", parseInt(contributorCount)*2);
});