Feature: Categorização de playlists
As a usuário cadastrado no aplicativo
I want to ser capaz de organizar as playlists em diferentes categorias
So that eu possa definir um estilo e um tema para minha playlist

Scenario: Adição de playlist a uma categoria existente
Given o usuário acessa a página "Biblioteca de playlists"
When o usuário escolhe a categoria “Exercícios” nas opções de categoria para associar a playlist “Café da Manhã” existente
Then a playlist “Café da Manhã” é associada à categoria “Exercícios”
And uma confirmação da associação é exibida

Scenario: Creating a New Category for a Playlist
Given the user accesses the "Playlist Library" page
When the user selects the option to create a new category
And enters the name "Relaxation" for the new category
And associates the existing playlist "Evening Chill" with the new category
Then the playlist "Evening Chill" is associated with the newly created category "Relaxation"
And a confirmation of the association is displayed

Scenario: Removing Playlist from a Category
Given the user accesses the "Playlist Library" page
When the user selects the category "Workouts" in the category options for the playlist "Breakfast"
And chooses to disassociate the playlist "Breakfast" from the category "Workouts"
Then the playlist "Breakfast" is no longer associated with the category "Workouts"
And a confirmation of the disassociation is displayed