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