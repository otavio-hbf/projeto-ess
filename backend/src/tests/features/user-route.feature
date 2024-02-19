Feature: user routers

Scenario: Registration successful
    Given the system does not have an account with the email "ze@gmail.com" registered
    When a POST request is sent to "/api/users" with the request body being a JSON with name "ze" email "ze@gmail.com" and password "ze123"
    Then the response status should be "200"
    # And the system registers the new email account "ze@gmail.com" and password "ze123"

Scenario: Unsuccessful registration
    Given the system has an account with the email "alfonso@gmail.com" registered
    When a POST request is sent to "/api/users" with the request body being a JSON with name "neymar" email "alfonso@gmail.com" and password "ze123"
    Then response status shold be "403"

Scenario: Login successful
    Given the system has the account with email "alfonso@gmail.com" and password "123456" registered
    When a POST request is sent to "/api/users/login" with the request body being a JSON with email "alfonso@gmail.com" and password "123456"
    Then the response status should be "200"

Scenario: Unsuccessful login
    Given the system does not have an account with the email "sinaldo@gmail.com" and password "sinaldo123" registered
    When a POST request is sent to "/api/users/login" with the request body being a JSON with email "sinaldo@gmail.com" and password "sinaldo123"
    Then the response status should be "500"

Scenario: Delete user
    Given the system has the account with email "alfonso@gmail.com" and password "123456" registered
    When a DELETE request is sent to "/api/users" with the request body being a JSON with email "alfonso@gmail.com" and password "123456"
    Then the response status shold be "200"

Scenario: Update user
    Given a user with id "2" is logged-in
    When a PUT request is sent to "/api/users/2" with the request body being a JSON with name "joaobolado" email "joao@gmail.com" and password "boladao123"
    Then the response status should be "200"
    And the response JSON should contain the updated user with name "joaobolado" email "joao@gmail.com" and password "boladao123"