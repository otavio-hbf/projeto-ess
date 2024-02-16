Feature: Playlist Service
   
    Scenario: Create a New Playlist
        Given the PlaylistService returns a logged-in user with name "Pedro" and password "Password123"
        When a "POST" request is sent to "/playlists" with the data:
        """
        {
            "name": "Afternoon Sessions",
            "user": {
                "name": "Pedro",
                "password": "Password123"
            }
        }
        """
        Then the response status should be "201"
        And the response JSON should contain the created playlist with name "Afternoon Sessions"

    Scenario: Add a Song to an Existing Playlist
        Given the PlaylistService returns a logged-in user with name "Tavio" and password "Password678"
        And there is a playlist with the name "Breakfast"
        And there is a song with the title "Construção"
        When a "POST" request is sent to "/playlists/Breakfast/add-song" with the data:
        """
        {
            "song": {
                "title": "Construção",
                "artist": "Chico Buarque"
            }
        }
        """
        Then the response status should be "200"
        And the playlist "Breakfast" should contain the song "Construção"

    Scenario: Delete an Existing Playlist
        Given the PlaylistService returns a logged-in user with name "BigT" and password "Password456"
        And there is a playlist with the name "Breakfast"
        When a "DELETE" request is sent to "/playlists/Breakfast"
        Then the response status should be "204"
        And the playlist "Breakfast" should no longer exist

    Scenario: View All Available Playlists
        Given the PlaylistService returns a list of playlists
        When a "GET" request is sent to "/playlists"
        Then the response status should be "200"
        And the response JSON should be a list of playlists
        And the playlist "Morning Vibes" should be in the list
        And the playlist "Chill Vibes" should be in the list

    Scenario: Edit Playlist Name
        Given the PlaylistService returns a logged-in user with name "Alice" and password "Password789"
        And there is a playlist with the name "Old Playlist"
        When a "PUT" request is sent to "/playlists/Old Playlist" with the data:
        """
        {
            "newName": "New Playlist Name"
        }
        """
        Then the response status should be "200"
        And the playlist "New Playlist Name" should exist
        And the playlist "Old Playlist" should no longer exist

    Scenario: Delete Song from Playlist
        Given the PlaylistService returns a logged-in user with name "John" and password "Password987"
        And there is a playlist with the name "My Playlist"
        And there is a song with the title "Deleted Song"
        When a "DELETE" request is sent to "/playlists/My Playlist/remove-song/Deleted Song"
        Then the response status should be "200"
        And the playlist "My Playlist" should not contain the song "Deleted Song"

    Scenario: View All Songs in a Playlist
        Given the PlaylistService returns a logged-in user with name "Eva" and password "Password654"
        And there is a playlist with the name "Favorite Songs"
        And there are songs in the playlist
        When a "GET" request is sent to "/playlists/Favorite Songs/songs"
        Then the response status should be "200"
        And the response JSON should be a list of songs in the playlist

    Scenario: Create Playlist with Existing Name
        Given the PlaylistService returns a logged-in user with name "Bob" and password "Password321"
        And there is a playlist with the name "Existing Playlist"
        When a "POST" request is sent to "/playlists" with the data:
        """
        {
            "name": "Existing Playlist",
            "user": {
                "name": "Bob",
                "password": "Password321"
            }
        }
        """
        Then the response status should be "400"
        And the response JSON should contain an error message indicating the name is already in use

    Scenario: Delete Nonexistent Playlist
        Given the PlaylistService returns a logged-in user with name "Charlie" and password "Password123"
        And there is no playlist with the name "Nonexistent Playlist"
        When a "DELETE" request is sent to "/playlists/Nonexistent Playlist"
        Then the response status should be "404"
        And the response JSON should contain an error message indicating the playlist does not exist