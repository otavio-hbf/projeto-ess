Feature: user services

Scenario: obter usuário pelo email
    Given o método createUser foi chamado com o name "samanto" email "samanto@gmail.com" e senha "samanto123"
    When o método getUserByEmail é chamado com o email "samanto@gmail.com"
    Then o usuário retornado tem nome "samanto"

Scenario: obter todos os usuários
    Given existe um usuário de nome "matue" cadastrado
    When o método getUsers é chamado
    Then o usuário de nome "matue" deve está na lista de usuários retornada

/*
Scenario: excluir usuário
    Given o método createUser foi chamado com o name "samanto" email "samanto@gmail.com" e senha "samanto123"
    When o método deleteUserWithEmailPassword é chamado com o email "samanto@gmail.com" e senha "samanto123"
    And o método getUserByEmail é chamado com o email "samanto@gmail.com"
    Then é retornada a mensagem "user_not_found"
*/