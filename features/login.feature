Feature: Login dos usuários
As a usuário cadastrado no aplicativo
I want to entrar no aplicativo usando meu email e senha cadastrados
Then após login, tenho acesso as funcionalidades do aplicativo

Scenario: Login bem-sucedido
Given o sistema possui a conta de e-mail “ze@gmail.com” e senha “ze123” cadastrada
When o sistema recebe uma tentativa de login com os campos de e-mail  e senha preenchidos com “ze@gmail.com” e “ze123”, respectivamente
Then o sistema confirma que essa conta possui cadastro
And o sistema permite o acesso do aplicativo