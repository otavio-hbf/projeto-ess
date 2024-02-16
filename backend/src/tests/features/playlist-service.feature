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