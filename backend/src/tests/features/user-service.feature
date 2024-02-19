Feature: user services

Scenario: obter usuário pelo email
    Given existe um usuário de nome "Alfonso" e email "alfonso@gmail.com"
    When o método getUserByEmail é chamado com o email "alfonso@gmail.com"
    Then o usuário retornado tem nome "Alfonso"

Scenario: obter todos os usuários
    Given existe um usuário de nome "Alfonso" cadastrado
    When o método getUsers é chamado
    Then o usuário de nome "Alfonso" deve está na lista de usuários retornada

Scenario: excluir usuário
    Given o método createUser foi chamado com o name "samanto" email "samanto@gmail.com" e senha "samanto123"
    When o método deleteUserWithEmailPassword é chamado com o email "samanto@gmail.com" e senha "samanto123"
    And o método getUserByEmail é chamado com o email "samanto@gmail.com"
    Then é retornada a mensagem "user_not_found"