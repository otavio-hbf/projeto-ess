Feature: user services

Scenario: obter usuário pelo email
    Given existe um usuário de nome "Alfonso" e email "alfonso@gmail.com"
    When o método getUserByEmail é chamado com o email "alfonso@gmail.com"
    Then o usuário retornado tem nome "Alfonso"

Scenario: obter todos os usuários
    Given existe um usuário de nome "Alfonso" cadastrado
    When o método getUsers é chamado
    Then o usuário de nome "Alfonso" deve está na lista de usuários retornada

# Scenario: excluir usuário
#     Given o método createUser foi chamado com o name "samanto" email "samanto@gmail.com" e senha "samanto123"
#     When o método deleteUserWithEmailPassword é chamado com o email "samanto@gmail.com" e senha "samanto123"
#     And o método getUserByEmail é chamado com o email "samanto@gmail.com"
#     Then é retornada a mensagem "user_not_found"

# Scenario: Registration successful
#     Given the system does not have an account with the email “ze@gmail.com” registered
#     When a "POST" request was sent to "/api/users" with the request body being a JSON with name "ze" email "ze@gmail.com" and password "ze123"
#     Then the system registers the new email account “ze@gmail.com” and password “ze123”

# Scenario: Login successful
#     Given the system has the account with email “ze@gmail.com” and password “ze123” registered
#     When a GET request was sent to "/api/users/login" with the request body being a JSON with email "ze@gmail.com" and password "ze123"
#     Then the response status should be "200"
#     And the user with email "ze@gmail" is logged in

Scenario: Delete user
    Given the system has the account with email “ze@gmail.com” and password “ze123” registered
    When the system receives a request to delete the account with email "ze@gmail.com" and password "ze123"
    And the system deletes the email account "ze@gmail.com"
    Then the system does not have the email account "ze@gmail.com" registered

Scenario: Update user
    Given the system has the account with email “ze@gmail.com” and password “ze123” registered
    When a PUT request is sent to "/api/users:id" with the request body being a JSON with email "ze@gmail.com" and password "ze321"
    Then the response status should be "200"

Scenario: Unsuccessful registration
    Given the system has an account with the email “ze@gmail.com” registered
    When a POST request was sent to "/api/users" with the request body being a JSON with name "ze" email "ze@gmail.com" and password "ze123"
    Then the system registers the new email account “ze@gmail.com” and password “ze123”

Scenario: Unsuccessful login
    Given the system has the account with email “ze@gmail.com” and password “ze123” registered
    When a GET request was sent to "/api/users/login" with the request body being a JSON with email "ze@gmail.com" and password "ze123"
    Then the response status should be "200"
    And the user with email "ze@gmail" is logged in

Scenario: User Page - getUser function
    Given the system has a user with id "1", name "otaviohbf", email "ohbf@cin.ufpe.br" and history_tracking set to "true"
    When the function getUser is called for id "1"
    Then the user returned must have id "1", name "otaviohbf", email "ohbf@cin.ufpe.br" and history_tracking set to "true"