import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

// REGISTER A NEW USER
// Common steps
Given("the user is on the {string} page", (page: string) => {
    cy.visit(page); // Visita a página inicial
});

Given("there is no user with email {string}", (email: string) => {
    // nao existe usuario com o email
});

When("the user enters their name {string}, email {string}, and password {string} in the registration form", (name: string, email: string, password: string) => {
    cy.get('[name="name"]').type(name);
    cy.get('[name="email"]').type(email);
    cy.get('[name="password"]').type(password);
});

When("clicks the {string} button", (button: string) => {
    cy.contains(button).click();
});

Then("the user should receive a success message confirming their {string}", (action: string) => {
    cy.on("window:alert", (message) => {
        expect(message).to.equal("Cadastro realizado com sucesso!");
    });
});

//ATTEMPT TO REGISTER WITH EXISTING EMAIL
Given("there is an existing user with email {string}", (email: string) => {
    // existe usuario com o email
});

Then("the user should see an error message indicating that the {string} is already in use", (field: string) => {
    cy.on("window:alert", (message) => {
        expect(message).to.equal("A senha deve ter pelo menos 5 caracteres.");
    });
});

Then("the user should remain on the {string} page", (page: string) => {
    cy.url().should("include", `/${page}`);
});

// ATTEMPT TO REGISTER WITH A SHORT PASSWORD
Then("the user should see a failure message indicating that the password must be at least 5 characters long", () => {
    cy.on("window:alert", (message) => {
        expect(message).to.equal("Ops! Este email já está cadastrado, tente novamente com outro email.");
    });
});

// LOGIN WITH VALID CREDENTIALS
Given("there is an existing user with email {string} and password {string}", (email: string, password: string) => {

});

When("the user enters their email {string} and password {string} in the login form", (email: string, password: string) => {
    cy.get('[name="email"]').type(email);
    cy.get('[name="password"]').type(password);
});

Then("the user should receive a success message confirming their login", () => {
    cy.on("window:alert", (message) => {
        expect(message).to.equal("Login realizado com sucesso!"); // Verifica se a mensagem do alerta é a esperada
    });
});

Then("the user should be redirected to the {string} page", (page: string) => {
    cy.url().should("eq", `http://localhost:3000/${page}`);
});

// LOGIN WITH INVALID CREDENTIALS
Given("there is no user with email {string} and password {string}", (email: string, password: string) => {
    // nao existe usuario com o email e senha
});

Then("the user should see an error message indicating that the credentials are invalid", () => {
    cy.on("window:alert", (message) => {
        expect(message).to.equal("Usuário e/ou senha incorretos, tente novamente"); // Verifica se a mensagem do alerta é a esperada
    });
});
