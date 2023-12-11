Feature: Playlist Categorization
    As a registered user in the application
    I want to be able to organize playlists into different categories
    So that I can define a style and theme for my playlist

    Scenario: Adding Playlist to an Existing Category
        Given the user accesses the "Playlist Library" page
        When the user chooses the category "Workouts" from the category options to associate with the existing playlist "Breakfast"
        Then the playlist "Breakfast" is associated with the category "Workouts"
        And a confirmation of the association is displayed

    Scenario: Creating a New Category for a Playlist
        Given the user accesses the "Playlist Library" page
        When the user selects the option to create a new category
        And enters the name "Relaxation" for the new category
        And associates the existing playlist "Evening Chill" with the new category
        Then the playlist "Evening Chill" is associated with the newly created category "Relaxation"
        And a confirmation of the association is displayed

    Scenario: Removing Playlist from a Category
        Given the user accesses the "Playlist Library" page
        When the user selects the category "Workouts" in the category options for the playlist "Breakfast"
        And chooses to disassociate the playlist "Breakfast" from the category "Workouts"
        Then the playlist "Breakfast" is no longer associated with the category "Workouts"
        And a confirmation of the disassociation is displayed