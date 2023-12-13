Feature: Hot
As an user
I want to the be able to access the top songs, artists, podcasts and playlists
So that I can see the current most listened songs, artists, podcasts or playlists.

Scenario: Access the top songs
Given I am logged as an user with login "ABestetica" and password "chuva123" in the "hot" page
And I see 4 containers, each of then for the elements "artists, songs, playlists, podcasts"
When I click the option of "see more" of the top "songs"
Then a list of the 50 current most played "songs" is shown.

Scenario: View less songs
Given I am logged as an user with login "ABestetica" and password "chuva123" in the "hot" page
And I see 4 containers, each of then for the elements "artists, songs, playlists, podcasts"
And the container of "songs" shows the top 50 current songs, indicating the button "see more" was pressed
When I click the option of "see less" of the top songs
Then the list of the 50 current most played songs is not shown anymore
And the screen displays the container of songs with only the top 5 preview.

Scenario: Back to main menu
Given I am logged as an user with login "ABestetica" and password "chuva123" in the "hot" page
And I see the "back to menu" button at the end of the page
When I click it
Then I am redirected to the main menu

Scenario: Play the songs
Given I am logged as an user with login "ABestetica" and password "chuva123" in the "hot" page
When I click the button "see more" of the top songs
And the top 50 songs is displayed
And I click in the song with title "minha cura"
Then the song "minha cura" starts to played

Scenario: Access the artist page
Given I am logged as an user with login "ABestetica" and password "chuva123" in the "hot" page
When I click the button "see more" of the top artists
And the top 50 artists is displayed
And I click in the artist named "Henrique e Juliano"
Then I am redirected to the artist page
And I can access all the "Henrique e Juliano" songs