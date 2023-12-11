Feature: Playlist Library Maintenance
    As a registered user in the application
    I want to be able to create, edit, and delete songs in playlists
    So that I can customize and group the songs I listen to

    Scenario: Playlist Creation
        Given the user with login "Pedro" accesses the "Playlist Library" page
        When the "New Playlist+" field is selected
        And the user enters the name "Afternoon Sessions"
        And confirms the creation
        Then the newly created playlist is displayed to the user
        And the user receives the option to add songs to the newly created playlist

    Scenario: Playlist Deletion
        Given the user with login "Pedro" accesses the "Playlist Library" page
        And in the list of playlists, the user selects the option to delete the playlist "Breakfast"
        When the confirmation to delete the playlist "Breakfast" is accepted by the user
        Then the playlist "Breakfast" is removed from the user's "Playlist Library" page

    Scenario: Adding a Song to a Playlist
        Given the user with login "Pedro" accesses the music search page.
        And finds the song "Construção"
        When the option to add to the playlist is selected
        And the user chooses the playlist "Breakfast" from the existing playlist options
        Then the song "Construção" is added to the playlist "Breakfast"
        And visually confirmed to the user

    Scenario: Excluding Songs from a Playlist
        Given the user with login "Pedro" accesses the "Playlist Library" page
        And selects the playlist "Chill Vibes" from the list of playlists
        When the user chooses the option to manage songs in the playlist
        And selects the song "Relaxing Melody" to be removed
        And confirms the exclusion
        Then the song "Relaxing Melody" is no longer part of the playlist "Chill Vibes"
        And a confirmation of the song exclusion is displayed to the user

    Scenario: Failure in Updating Song in the Playlist
        Given the user with login "Pedro" accesses the "Breakfast" playlist page
        When trying to rearrange the order of the song "Construção"
        And there is an interruption in the connection with the server
        Then an error message is displayed, informing the user about the failure to update the song order
        And the previous state of the song order in the playlist is maintained.

    Scenario: Failure in Playlist Deletion
        Given the user with login "Pedro" accesses the "Playlist Library" page
        When selecting the option to delete the playlist "Breakfast"
        And an interruption in the connection with the server occurs
        Then an error message is displayed, indicating that the deletion could not be completed due to a server failure
        And the playlist "Breakfast" remains in the list of playlists

    Scenario: Reorganization of Song Order in a Playlist
        Given the user with login "Pedro" accesses the "Playlist Library" page
        When selecting the playlist "Weekly Favorites" to rearrange
        And drags and drops the song "Construção" to the first in the list
        Then the updated order of songs is automatically saved in the playlist

    Scenario: Playlist Name Update
        Given the user with login "Pedro" accesses the "Playlist Library" page
        When locating the playlist "Intense Workout"
        And selecting the option to edit the playlist name
        And entering the new desired name "Weekly Favorites"
        And confirming the update
        Then the playlist is displayed with the new name "Weekly Favorites" in the user's playlist list
