Feature: Most Played Songs

    As an user
    I want see my most played songs of the month
    So that I can create new playlists and get to know my taste in music

Scenario: New user who has never played a song before
    Given I've created a new account with user "pedro", password "123"
    And I logged in with user "pedro", password "123"
    And I have no songs in my history
    When I open my most played songs
    Then the system will throw an error

Scenario: User asks for detailed stats
    Given I've created a new account with user "pedro", password "123"
    And I logged in with user "pedro", password "123"
    And I played the song "Aquarela", which is 3 minutes long, 4 times
    When I select "Detailed Statistics"
    Then the system will correctly calculate the total play time of my songs
    And the system will correctly calculate my most played genre
