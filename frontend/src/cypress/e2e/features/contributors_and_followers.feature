Feature: Contributors and Followers
    As an user currently on a playlist page
    I want to see a list of contributors and a list of followers of that playlist
    So that I can know users with similar tastes to me

    Background:
        Given I am logged in with user id "2"
    
    Scenario: Follow a playlist
        Given the user is in the "playlist?playlistId=1" page
        And there is "0" followers in "followers-count"
        When the user clicks the "follow-playlist" button
        Then "followers-count" displays "1"
        And there is a "unfollow-playlist" button
    
    Scenario: Open FollowersModal
        Given the user is in the "playlist?playlistId=1" page
        And there is "1" followers in "followers-count"
        And a "unfollow-playlist" button is visible
        When the user clicks the "followers-count" button
        Then "followers-modal" displays "João"

    Scenario: Unfollow a playlist
        Given the user is in the "playlist?playlistId=1" page
        And there is "1" followers in "followers-count"
        When the user clicks the "unfollow-playlist" button
        Then "followers-count" displays "0"
        And there is a "follow-playlist" button
    
    Scenario: Add a contributor
        Given the user is in the "playlist?playlistId=2" page
        And there is "0" contributors in "contributors-count"
        When the user clicks the "contributors-count" button
        And the user clicks the "add-contributor" button
        Then "contributors-count" displays "1"
    
    Scenario: Open ContributorsModal
        Given the user is in the "playlist?playlistId=2" page
        And there is "1" contributors in "contributors-count"
        When the user clicks the "contributors-count" button
        Then "contributor-name" displays "1" name
    
    Scenario: Remove a contributor
        Given the user is in the "playlist?playlistId=2" page
        And there is "1" contributors in "contributors-count"
        When the user clicks the "contributors-count" button
        And the user clicks the "remove-contributor" button
        Then "contributors-count" displays "0"
    