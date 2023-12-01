Feature: Login dos usuários
As a usuário cadastrado no aplicativo
I want to entrar no aplicativo usando meu e-mail e senha cadastrados
Then após login, tenho acesso as funcionalidades do aplicativo

Scenario: Login realizado com sucesso
Given estou na página de “Login”
And existe um usuário cadastrado com o e-mail “ze@gmail.com” e senha
“ze123”
When preencho o campo de email com “ze@gmail.com”
And preencho o campo de senha com “ze123”
Then sou encaminhado para página incial do aplicativo

Scenario: Tentativa de login com e-mail e/ou senha incorretos
Given estou na página de “Login”
And não existe um usuário cadastrado com o e-mail “ze@gmail.com” e senha
“ze321”
When preencho o campo de email com “ze@gmail.com”
And preencho o campo de senha com “ze321”
Then aparece a mensagem "e-mail ou senha incorretos" na tela
And permaneço na tela de login

Scenario: tentativa de login com campo de e-mail e/ou senha em branco
Given estou na página de "Login"
And existe um usuário cadastrado com o e-mail “ze@gmail.com” e senha
“ze123”
When preencho o campo de email com “ze@gmail.com”
And deixo o campo de senha em branco
And aperto em no botão de entrar
Then aparece uma mensagem de falha no login

Scenario: Redefinição de senha
Given estou na página de "Login"
And existe um usuário cadastrado com o e-mail “ze@gmail.com” e senha
“ze123”
When aperto no link de "esqueci a senha"
And preencho o campo de e-mail com "ze@gmail.com"
And um e-mail é enviado para "ze@gmail.com" com o código "3334"
And preencho o campo do código com "3334"
And preencho o campo de nova senha com "ze456"
Then aparece uma mensagem de confirmação de nova senha

Scenario: Tentativa de redefinição de senha com código errado
Given estou na página de "Login"
And existe um usuário cadastrado com o e-mail “ze@gmail.com” e senha
“ze123”
When aperto no link de "esqueci a senha"
And preencho o campo de e-mail com "ze@gmail.com"
And um e-mail é enviado para "ze@gmail.com" com o código "3334"
And preencho o campo do código com "4445"
Then aparece uma mensagem de erro e tente novamente