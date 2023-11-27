Feature: Most Played Songs

    As an user
    I want see my most played songs of the month
    So that I can create new playlists and get to know my taste in music

Scenario: User requests a new playlist of the most played songs of the month
    Given I'm logged in with user "pedro", password "123"
    And I have the songs "Aquarela", "Lenha", and "Yellow Submarine" in my most played songs
    When I request a new playlist of my most played songs
    Then the system generates a playlist titled "Top Hits"
    And includes "Aquarela", "Lenha", and "Yellow Submarine" in the playlist
    And allows me to play the playlist
    And allows me to save it for future listening

Scenario: User requests a new playlist based on most played genre
    Given I'm logged in as an user
    And I have songs from the genres "Rock", "Pop", and "Jazz" in my most played list
    When I request a new playlist based on the most played genre
    Then the system identifies the predominant genre among my most played songs
    And generates a playlist titled with the genre name
    And allows me to play the playlist
    And allows me to save it for future listening

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
    And will correctly calculate my most played genre

Scenario: User attempts to access most played songs without logging in
    Given I am not logged into the system
    When I attempt to view my most played songs
    Then the system displays an error message prompting me to log in
    And does not show any song statistics or information

Scenario: User has disabled tracking of play history
    Given I am logged in with user "pedro", password "123"
    And I have disabled the tracking of my play history in settings
    When I attempt to view my most played songs
    Then the system displays an empty list
    And the system indicates that play history tracking is disabled
    And does not provide any most played song information
    And throws an internal error

Scenario: User asks for most played songs
    Given I am logged in with user "pedro", password "123"
    And I have played songs before
    When I open my most played songs
    Then the system will display me a list of my most played songs of the month