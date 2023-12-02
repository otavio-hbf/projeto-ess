#segue abaixo a feature.
#segue também os scenarios

Feature: Em alta
As um usuário
I want to ver as músicas, playlists, podcasts e artistas que estão em alta
So that eu possa ver os hits do momento.

Scenario 1: Acessar as músicas que estão em alta
Given o usuário com login ABestetica e senha chuva123 está na aba do “em alta”
When usuário tentar acessar as músicas em alta através de uma requisição GET
Then usuário é redirecionado para aba das top músicas.

Scenario 2: Na aba de top músicas, clicar no botão “voltar”
Given o usuário com login ABestetica e senha chuva123 está na aba do “top músicas”
When usuário clica no botão “voltar”
And uma requisição GET é enviada ao servidor
Then usuário é redirecionado para a aba principal do “em alta”

Scenario 3: Acessar os artistas que estão em alta
Given o usuário com login ABestetica e senha chuva123 está na aba do “top artistas”
When usuário tentar acessar os artistas que estão em alta através de uma requisição GET
Then usuário é redirecionado para aba dos top artistas.

#alteração 1 feita na branch dev
#alteração 2 feita na branch dev