Feature: Most Played Songs
    As a user,
    I want to see my most played songs of the month,
    So that I can get to know my taste in music.

    Background:
        Given I am logged in with user id "2"

    Scenario: User asks for detailed stats
        Given the user is in the "history" page
        And the "history-list" list has "4" songs
        When the user clicks the "view-statistics" button
        Then the user will see the "statistics-modal" dialog

    Scenario: User turns off tracking of play history
        Given the user is in the "my-profile" page
        And the "toggle-tracking" button is set to "true"
        When click the "toggle-tracking" button to turn off the tracking of my play history
        Then the "toggle-tracking" button should be set to "false"

    Scenario: User clears play history
        Given the user has tracking of play history "enabled"
        And the user is in the "history" page
        And the "history-list" list has "4" songs
        When the user clicks the "clear-history" button
        Then the "history-list" list should display "Você ainda não escutou nenhuma musica!"

    Scenario: User has disabled tracking of play history
        Given the user has tracking of play history "disabled"
        When the user visits the "history" page
        And the user clicks the "clear-history" button
        And the user clicks the "listen-to-song" button
        Then the "history-list" list should display "Você ainda não escutou nenhuma musica!"

    Scenario: User asks for most played songs
        Given the "history-list" list has "8" songs
        When the user visits the "most-played" page
        Then the user should see the "most-played-list" list
        And the "most-played-list" list should not be empty
        And the sum of the times played of each song should be "8"
        And the "most-played-list" list should display the songs in descending order of times played