Feature: Playlist Library Maintenance
    As a registered user in the application
    I want to be able to create, edit, and delete songs in playlists
    So that I can customize and group the songs I listen to

    Scenario: Playlist Creation
        Given I'm logged in with user "Pedro" and password "examplePassword" in the "Playlist Library" page
        When I select the "New Playlist+" field
        And enter the name "Afternoon Sessions"
        And confirm the creation
        Then the newly created playlist is displayed to me
        And I receive the option to add songs to the newly created playlist

    Scenario: Playlist Deletion
        Given I'm logged in with user "Pedro" and password "examplePassword" in the "Playlist Library" page
        And in the list of playlists, I select the option to delete the playlist "Breakfast"
        When I accept the confirmation to delete the playlist "Breakfast"
        Then the playlist "Breakfast" is removed from my "Playlist Library" page

    Scenario: Adding a Song to a Playlist
        Given I'm logged in with user "Pedro" and password "examplePassword" accessing the music search page.
        And I find the song "Construção"
        When I select the option to add it to the playlist
        And choose the playlist "Breakfast" from the existing playlist options
        Then the song "Construção" is added to the playlist "Breakfast"
        And visually confirmed to me

    Scenario: Excluding Songs from a Playlist
        Given I'm logged in with user "Pedro" and password "examplePassword" in the "Playlist Library" page
        And I select the playlist "Chill Vibes" from the list of playlists
        When I choose the option to manage songs in the playlist
        And select the song "Relaxing Melody" to be removed
        And confirm the exclusion
        Then the song "Relaxing Melody" is no longer part of the playlist "Chill Vibes"
        And a confirmation of the song exclusion is displayed to me

    Scenario: Failure in Updating Song in the Playlist
        Given I'm logged in with user "Pedro" and password "examplePassword" in the "Breakfast" playlist page
        When I try to rearrange the order of the song "Construção"
        And there is an interruption in the connection with the server
        Then an error message is displayed, informing me about the failure to update the song order
        And the previous state of the song order in the playlist is maintained.

    Scenario: Failure in Playlist Deletion
        Given I'm logged in with user "Pedro" and password "examplePassword" in the "Playlist Library" page
        When I select the option to delete the playlist "Breakfast"
        And an interruption in the connection with the server occurs
        Then an error message is displayed, indicating that the deletion could not be completed due to a server failure
        And the playlist "Breakfast" remains in the list of playlists

    Scenario: Reorganization of Song Order in a Playlist
        Given I'm logged in with user "Pedro" and password "examplePassword" in the "Playlist Library" page
        When I select the playlist "Weekly Favorites" to rearrange
        And drag and drop the song "Construção" to the first in the list
        Then the updated order of songs is automatically saved in the playlist

    Scenario: Playlist Name Update
        Given I'm logged in with user "Pedro" and password "examplePassword" in the "Playlist Library" page
        When I locate the playlist "Intense Workout"
        And select the option to edit the playlist name
        And enter the new desired name "Weekly Favorites"
        And confirm the update
        Then the playlist is displayed with the new name "Weekly Favorites" in my playlist list
