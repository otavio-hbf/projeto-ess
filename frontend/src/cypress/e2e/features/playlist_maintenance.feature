Feature: Playlist Management
    As a user,
    I want to maintain and manage my playlists,
    So that I can organize and enjoy my music collection effectively.

    Scenario: Create a New Playlist
        Given the user is in the "/MyPlaylists" page
        And the "playlist-list" list has "2" playlists
        When the user clicks the "new-playlist" button
        And the user enters the name "Wild Songs" in the modal input
        And clicks the "create-playlist" button in the modal
        Then the user should have "3" playlists, including "Wild Songs"

    Scenario: Delete a Playlist
        Given the user is in the "/MyPlaylists" page
        And the "playlist-list" list has "3" playlists
        And there is an existing playlist named "Wild Songs"
        When the user clicks the "delete-playlist" button for "Wild Songs"
        And clicks the "confirm-delete-playlist" button in the modal
        Then the user should have "2" playlists
        And there should be no playlist named "Wild Songs"

    Scenario: Remove a Song from Playlist
        Given the user is in the "/MyPlaylists" page
        And there is an existing playlist named "My Favorites"
        And the "playlist-songs" list of "My Favorites" has "3" songs
        When the user clicks the "remove-song" button for "Apple" song in the playlist
        And clicks the "confirm-remove-song" button in the modal
        Then the "playlist-songs" list of "My Favorites" should display "2" songs
        And there should be no song named "Apple"