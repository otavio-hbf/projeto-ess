Feature: User Registration and Login
    As a user,
    I want to be able to register and log in to the application,
    So that I can access my account and use the features.

    Scenario: Register a New User
        Given the user is on the "register" page
        And there is no user with email "john@gmail.com"
        When the user enters their name "John Doe", email "john@gmail.com", and password "password" in the registration form
        And clicks the "Cadastrar" button
        Then the user should receive a success message confirming their "registration"

    Scenario: Attempt to Register with Existing Email
        Given the user is on the "register" page
        And there is an existing user with email "alfonso@gmail.com"
        When the user enters their name "Alfonso", email "alfonso@gmail.com", and password "password" in the registration form
        And clicks the "Cadastrar" button
        Then the user should see an error message indicating that the "email" is already in use
        And the user should remain on the "register" page

    Scenario: Attempt to register with a short password
        Given the user is on the "register" page
        When the user enters their name "ze", email "ze@gmail.com", and password "ze1" in the registration form
        Then the user should see a failure message indicating that the password must be at least 5 characters long

    Scenario: Log In with Valid Credentials
        Given the user is on the "login" page
        And there is an existing user with email "alfonso@example.com" and password "123456"
        When the user enters their email "alfonso@gmail.com" and password "123456" in the login form
        And clicks the "Entrar" button
        Then the user should receive a success message confirming their login
        And the user should be redirected to the "feed" page

    Scenario: Attempt to Log In with Invalid Credentials
        Given the user is on the "login" page
        And there is no user with email "invalid@example.com" and password "invalidpassword"
        When the user enters their email "invalid@example.com" and password "invalidpassword" in the login form
        And clicks the "Entrar" button
        Then the user should see an error message indicating that the credentials are invalid
        And the user should remain on the "login" page
