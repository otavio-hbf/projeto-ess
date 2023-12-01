#segue abaixo a feature.
#segue também os scenarios

Feature: Em alta
As um usuário
I want to ver as músicas, playlists, podcasts e artistas que estão em alta
So that eu possa ver os hits do momento.

Scenario 1: Acessar as músicas que estão em alta
Given o usuário com login ABestetica e senha chuva123 está na aba do “em alta”
When usuário tentar acessar as músicas em alta através de uma requisição GET
Then usuário é redirecionado para aba das top músicas