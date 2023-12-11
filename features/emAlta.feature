Feature: Hot
As an user
I want to the top songs, artists, podcasts and playlists
So that i can see the current most listened songs, artists, podcasts or playlists.

Scenario 1: Access the top songs
Given the user with login ABestetica and password chuva123 is in the "hot" page
And she sees 4 containers, each of then for the elements "artists, songs, playlists, podcasts"
When the user clicks the options of "see more" of the top songs
Then a list of the 50 current most played songs is shown.

Scenario 2: Access the top artists
Given the user with login ABestetica and password chuva123 is in the "hot" page
And she sees 4 containers, each of then for the elements "artists, songs, playlists, podcasts"
When the user clicks the options of "see more" of the top artists
Then a list of the 50 current most listened artists is shown.

Scenario 3: Access the top podcasts
Given the user with login ABestetica and password chuva123 is in the "hot" page
And she sees 4 containers, each of then for the elements "artists, songs, playlists, podcasts"
When the user clicks the options of "see more" of the top podcasts
Then a list of the 50 current most played podcasts is shown.

Scenario 4: Access the top playlists
Given the user with login ABestetica and password chuva123 is in the "hot" page
And she sees 4 containers, each of then for the elements "artists, songs, playlists, podcasts"
When the user clicks the options of "see more" of the top playlists
Then a list of the 50 current most played playlists is shown.

Scenario 5: View less songs
Given the user with login ABestetica and password chuva123 is in the "hot" page
And she sees 4 containers, each of then for the elements "artists, songs, playlists, podcasts"
And the container of "songs" shows the top 50 current songs, indicating the button "see more" was pressed
When the user clicks the options of "see less" of the top songs
Then the list of the 50 current most played songs is not shown anymore
And the screen displays the container of songs with only the top 5 preview.