Feature: Most Played Songs
    As a user,
    I want to see my most played songs of the month,
    So that I can get to know my taste in music.

    Scenario: User asks for detailed stats
        Given the user is logged in on the "history" page
        And the user has played the following songs
            | times_played | song_id | title                   | artist      | genre | duration |
            | 3            | 1       | Never Gonna Give You Up | Rick Astley | Rock  | 300      |
            | 1            | 2       | Yellow Submarine        | The Beatles | Rock  | 100      |
        When the user clicks the "detailed-statistics" button
        Then the user will see a dialog with the following information
            | most_played_song        | most_played_genre | play_duration |
            | Never Gonna Give You Up | Rock              | 1000          |

    Scenario: User turns off tracking of play history
        Given I am logged in with user "pedro", password "123"
        And the user is in the "my-profile" page
        And the user has the "history_tracking" attribute set to "true"
        When click the "toggle-tracking" button to turn off the tracking of my play history
        Then the "toggle-tracking" button should be off
        And the user has the "history_tracking" attribute set to "false"

    Scenario: User clears play history
        Given the user is logged in the "history" page
        And the user has the songs "Yellow Submarine" and "Clair de Lune" in their "song_history" list
        When the user clicks the "clear-history" button
        Then the system deletes all songs from the user's "song_history" list
        And the user's "song_history" list displays a message "Você ainda não escutou nenhuma musica!"

    Scenario: User has disabled tracking of play history
        Given the user is in the "history" page
        And the user has the "history_tracking" attribute set to "false"
        And the user has the songs "Yellow Submarine" and "Clair de Lune" in their "song_history" list
        When the user clicks the "listen-to-music" button
        Then the "song_history" list should not be updated

    Scenario: User asks for most played songs
        Given I am logged in with user "pedro", password "123"
        And the user is on the "my-profile" page
        And the user has played the following songs
            | times_played | song_id | title                   | artist      | genre | duration |
            | 3            | 1       | Never Gonna Give You Up | Rick Astley | Rock  | 300      |
            | 3            | 2       | Yellow                  | Coldplay    | Pop   | 150      |
            | 1            | 3       | Yellow Submarine        | The Beatles | Rock  | 100      |
            | 2            | 4       | Ticket to Ride          | The Beatles | Rock  | 250      |
        When the user opens the "most-played-songs" page
        Then the system displays a list with the following songs
            | song_id | title                   | artist      | genre | times_played |
            | 1       | Never Gonna Give You Up | Rick Astley | Rock  | 3            |
            | 2       | Yellow                  | Coldplay    | Pop   | 3            |
            | 4       | Ticket to Ride          | The Beatles | Rock  | 2            |
            | 3       | Yellow Submarine        | The Beatles | Rock  | 1            |