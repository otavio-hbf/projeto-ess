import { Given } from "@badeball/cypress-cucumber-preprocessor";

Given("I am logged in with user id {string}", function (uid: string) {
  cy.setCookie("userId", uid);
});
