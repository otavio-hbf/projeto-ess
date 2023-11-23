Feature: Categorização de playlists
As a usuário cadastrado no aplicativo
I want to ser capaz de organizar as playlists em diferentes categorias
So that eu possa definir um estilo e um tema para minha playlist

Scenario: Adição de playlist a uma categoria existente
Given o usuário acessa a página "Biblioteca de playlists"
When o usuário escolhe a categoria “Exercícios” nas opções de categoria para associar a playlist “Café da Manhã” existente
Then a playlist “Café da Manhã” é associada à categoria “Exercícios”
And uma confirmação da associação é exibida
