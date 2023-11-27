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

Scenario: User attempts to access most played songs without logging in
    Given I am not logged into the system
    When I attempt to view my most played songs
    Then the system displays an error message prompting me to log in
    And does not show any song statistics or information

Scenario: User has disabled tracking of play history
    Given I am logged in
    And I have disabled the tracking of my play history in settings
    When I attempt to view my most played songs
    Then the system displays an empty list
    And the system indicates that play history tracking is disabled
    And does not provide any most played song information