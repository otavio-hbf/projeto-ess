Feature: Manutenção da biblioteca de playlists
As a usuário cadastrado no aplicativo
I want to ser capaz de criar, editar e excluir músicas em playlists
So that eu possa personalizar e agrupar as músicas que escuto

Scenario: Criação de playlists
Given o usuário com login "Pedro" acessa a página "Biblioteca de playlists"
When o campo de "Nova playlist+" é selecionado 
And o usuário insere o nome "Sessões da tarde"
And confirma a criação
Then a playlist recém-criada é exibida ao usuário
And  usuário recebe a opção de adicionar músicas à playlist recém-criada

Scenario: Exclusão de Playlists
Given o usuário com login “Pedro” acessa a página "Biblioteca de playlists"
And na lista de playlists, o usuário seleciona a opção para excluir a playlist “Café da Manhã”
When a confirmação de exclusão da playlist “Café da Manhã” é assentida pelo usuário
Then a playlist “Café da Manhã” é removida da página "Biblioteca de playlists" do usuário

Scenario: Adição de uma música em um playlist
Given o usuário com login “Pedro” acessa a página de busca por músicas.
And encontra a música “Construção”
When a opção para adicionar à playlist é selecionada
And o usuário escolhe a playlist “Café da Manhã” das opções de playlists existentes
Then a música “Construção” é adicionada à playlist “Café da Manhã” 
And confirmada visualmente para o usuário.

Scenario: Falha na atualização de música na playlist
Given o usuário com login “Pedro” acessa a página da playlist “Café da Manhã”
When tenta reorganizar a ordem da música “Construção”
And ocorre uma interrupção na conexão com o servidor
Then uma mensagem de erro é exibida, informando ao usuário sobre a falha na atualização da ordem da música
And o estado anterior da ordem das músicas na playlist é mantido.

Scenario: Falha na exclusão de playlist
Given o usuário com login “Pedro” acessa a página "Biblioteca de playlists"
When seleciona a opção para excluir a playlist “Café da Manhã”
And uma interrupção na conexão com o servidor acontece
Then uma mensagem de erro é exibida, indicando que a exclusão não pôde ser concluída devido a uma falha na internet
And playlist “Café da Manhã” permanece na lista de playlists

Scenario: Reorganização da ordem das músicas em uma playlist
Given o usuário com login “Pedro” acessa a página "Biblioteca de playlists"
When seleciona a playlist "Favoritas da Semana" para reorganizar
And arrasta e solta a música “Construção” para a primeira da lista
Then a ordem atualizada das músicas é salva automaticamente na playlist

Scenario: Atualização de nome de playlist
Given o usuário com login “Pedro” acessa a página "Biblioteca de playlists"
When localiza a playlist "Treino Intenso"
And seleciona a opção para editar o nome da playlist
And insere o novo nome "Favoritas da Semana" desejado
And confirma a atualização
Then a playlist é exibida com o novo nome "Favoritas da Semana" na lista de playlists do usuário
