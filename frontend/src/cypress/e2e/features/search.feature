Feature: Search
    As a user
    I want to be able to search for songs and playlist
    So that I can listen to them

    Scenario: User searchs songs by artist's name
        Given The user is in the "/search" page
        When The user searches for keyword "Spongebob"
        Then At least "3" songs are shown at the "search-songs" section

    Scenario: Clicking in a song
        Given The user is in the "/search" page
        When The user searches for keyword "Spongebob"
        And The user clicks in a SongItem at the "search-songs"
        Then The title and artist of the song must appear in the playbar

    Scenario: User searchs playlists by name
        Given The user is in the "/search" page
        When The user searches for keyword "Road Trip"
        Then At least "1" playlist is shown at the "search-playlists" section

    Scenario: Clicking in a playlist
        Given The user is in the "/search" page
        When The user searches for keyword "Road Trip"
        And The user clicks in a PlaylistItem at the "view-songs" button
        Then The user is in the "/playlist?playlistId=2" page