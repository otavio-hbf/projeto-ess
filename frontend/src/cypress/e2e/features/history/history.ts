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

// Scenario 3: User clears play history
Given("the user has tracking of play history {string}", (value: string) => {
  cy.visit("my-profile");
  if (value == "enabled") {
    cy.get('[data-cy="toggle-tracking"] input[type="checkbox"]').check();
  } else {
    cy.get('[data-cy="toggle-tracking"] input[type="checkbox"]').uncheck();
  }

  // go back to original page
  cy.go("back");
});

Given(
  "the user clicks the {string} button {string} times",
  (button: string, times: string) => {
    for (let i = 0; i < parseInt(times); i++) {
      cy.getDataCy(button).click();
    }
  }
);

Given(
  "the {string} list has {string} songs",
  (container: string, count: string) => {
    cy.toggleTracking(true);
    cy.clearHistory();
    for (let i = 0; i < parseInt(count); i++) {
      cy.getDataCy("listen-to-song").click();
    }
    cy.getDataCy(container).children().should("have.length", parseInt(count));
  }
);

Then(
  "the user's {string} list displays a message {string}",
  (container: string, msg: string) => {
    cy.getDataCy(container).contains(msg);
  }
);

// Scenario 4: user asks for detailed stats
Then("the user will see the {string} dialog", (dialog: string) => {
  cy.getDataCy(dialog).should("be.visible");
});

// Scenario 5: user asks for most played songs
Then("the user should see the {string} list", (container: string) => {
  cy.getDataCy(container).should("be.visible");
});

Then("the {string} list should not be empty", (container: string) => {
  cy.getDataCy(container).children().should("not.be.empty");
});

Then(
  "the sum of the times played of each song should be {string}",
  (sum: string) => {
    let totalTimesPlayed = 0;

    cy.get('[data-cy^="most-played-item-"]')
      .each(($el) => {
        cy.wrap($el)
          .find('[data-cy="times-played"]')
          .invoke("text")
          .then((text) => {
            const timesPlayed = parseInt(text.split(" ")[1]); // extract the number of times played
            totalTimesPlayed += timesPlayed;
          });
      })
      .then(() => {
        cy.log("total times played: " + totalTimesPlayed);
        cy.wrap(totalTimesPlayed).should("eq", parseInt(sum));
      });
  }
);

Then(
  "the {string} list should display the songs in descending order of times played",
  (container: string) => {
    let prevTimesPlayed = null;

    cy.get('[data-cy^="most-played-item-"]')
      .each(($el) => {
        cy.wrap($el)
          .find('[data-cy="times-played"]')
          .invoke("text")
          .then((text) => {
            const timesPlayed = parseInt(text.split(" ")[1]); // extract the number of times played
            if (prevTimesPlayed == null) {
              prevTimesPlayed = timesPlayed;
            }
            cy.wrap(timesPlayed).should("be.lte", prevTimesPlayed);
            prevTimesPlayed = timesPlayed;
          });
      })
      .then(() => {
        cy.log("the list is in descending order of times played");
      });
  }
);
