Feature: Feed
    As a user,
    I want to be able to see the available songs 
    And personalized recommendations based on my taste
    So that I can listen to them.

    Background:
        Given I am logged in with user id "2" 

    Scenario: Songs shown in the feed page
        Given The user is in the "feed" page
        Then "music-section" must have all "15" songs of the database

    Scenario: Recommendations
        Given The user is in the "feed" page
        Then The "recommendations" section should have at least "1" song
        And The "recommendations" section should have no more than "15" songs

    Scenario: Clicking in a song
        Given The user is in the "feed" page
        When The user clicks in a SongItem at the "music-section"
        Then The title and artist of the song must appear in the playbar