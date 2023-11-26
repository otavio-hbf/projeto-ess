Feature: Playlist Categorization
As a registered user in the application
I want to be able to organize playlists into different categories
So that I can define a style and theme for my playlist

Scenario: Adição de playlist a uma categoria existente
Given o usuário acessa a página "Biblioteca de playlists"
When o usuário escolhe a categoria “Exercícios” nas opções de categoria para associar a playlist “Café da Manhã” existente
Then a playlist “Café da Manhã” é associada à categoria “Exercícios”
And uma confirmação da associação é exibida
