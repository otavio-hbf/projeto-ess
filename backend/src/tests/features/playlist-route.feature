Feature: Playlist Routers
   
    Scenario: Create a New Playlist
        Given a user with id "123" is logged-in
        When a POST request is sent to "/api/playlists" with the playlist name "SleepYpy" and user id "123"
        Then the response status should be "200"
        And the response JSON should contain the created playlist with name "SleepYpy"

    Scenario: Add a Song to an Existing Playlist
        Given a user with id "999" is logged-in
        And there is an existing playlist with id "12345" named "Breakfast and Furious" created by user "999" without songs in
        And there is an existing song with id "3" named "Apple" by "Spongebob"
        When a PUT request is sent to "/api/playlists/12345/3" with user id "999"
        Then the response status should be "200"
        And the response JSON should contain the updated playlist with the added song id "3" in the list of songs