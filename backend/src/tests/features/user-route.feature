Feature: user routers

Scenario: Registration successful
    Given the system does not have an account with the email “ze@gmail.com” registered
    When a POST request is sent to "/api/users" with the request body being a JSON with name "ze" email "ze@gmail.com" and password "ze123"
    Then the response status should be "200"
    Then the system registers the new email account “ze@gmail.com” and password “ze123”

Scenario: Login successful
    Given the system has the account with email “alfonso@gmail.com” and password “123456” registered
    When a GET request is sent to "/api/users/login" with the request body being a JSON with email "alfonso@gmail.com" and password "123456"
    Then the response status should be "200"
    And the user with email "ze@gmail" is logged in

Scenario: Delete user
    Given the system has the account with email “alfonso@gmail.com” and password "123456" registered
    When a DELETE request is sent to "/api/users" with the request body being a JSON with email "alfonso@gmail.com" and password "123456"
    Then the response status shold be "200"
    And the system does not have the email account "alfonso@gmail.com" registered

Scenario: Update user
    Given a user with id "1" is logged-in
    When a PUT request is sent to "/api/users/1" with the request body being a JSON with name "alface" email "alfonso@gmail.com" and password "alface123"
    Then the response status should be "200"
    And the response JSON shold contain the updated user with name "alface" email "alfonso@gmail.com" and password "alface123"

Scenario: Unsuccessful registration
    Given the system has an account with the email “alfonso@gmail.com” registered
    When a POST request is sent to "/api/users" with the request body being a JSON with name "neymar" email "alfonso@gmail.com" and password "ze123"
    Then response status shold be "403"

Scenario: Unsuccessful login
    Given the system does not have an account with the email “ze@gmail.com” and password "ze123" registered
    When a GET request is sent to "/api/users/login" with the request body being a JSON with email "ze@gmail.com" and password "ze123"
    Then the response status should be "500"