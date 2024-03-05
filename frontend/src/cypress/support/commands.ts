/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      getDataCy(dataCySelector: string): Chainable<JQuery<HTMLElement>>;
      toggleTracking(enabled: boolean): Chainable<AUTWindow>;
      clearHistory(): Chainable<JQuery<HTMLElement>>;
    }
  }
}

Cypress.Commands.add("getDataCy", (dataCySelector) => {
  return cy.get(`[data-cy="${dataCySelector}"]`);
});

// visits "my-profile", and checks the "history-tracking" checkbox
Cypress.Commands.add("toggleTracking", (enabled) => {
  const _cy = cy.visit("my-profile").get('[data-cy="toggle-tracking"] input[type="checkbox"]')
  if (enabled) {
    return _cy.check().go("back");
  } else {
    return _cy.uncheck().go("back");
  }
});

// visits "history" and clicks the "clear-history" button
Cypress.Commands.add("clearHistory", () => {
  return cy.visit("history").getDataCy("clear-history").click();
});

export {};
