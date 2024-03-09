Feature: Search
    As a user
    I want to be able to search for songs and playlist
    So that I can listen to them

    Scenario: User searchs songs by artist's name
        Given The user is at the "/search" page
        When The user searches for artist "Spongebob"
        Then At least "3" songs are shown at the "search-songs" section

    Scenario: Clicking in a song
        Given The user is at the "/search" page
        When The user searches for artist "Spongebob"
        And The user clicks in a SongItem at the "search-songs"
        Then The title and artist of the song must appear in the playbar

    Scenario: User searchs playlists by name
        Given The user is at the "/search" page
        When The user searches for name "Road Trip"
        Then At least "1" playlist is shown at the "search-playlists" section

