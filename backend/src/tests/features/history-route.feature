Feature: History Routes

    # GET user history
    # /user/:id/history
    Scenario: Get user history from user id
        Given the HistoryService returns a history for user_id "1" with 3 items with song_id "1", "2" and "3"
        When I send a "GET" request to "/user/1/history"
        Then the response status should be "200"
        And the response JSON should contain a history with 3 items with song_id "1", "2" and "3"

    # GET most played
    # /user/:id/hot
    Scenario: Get most played songs from user id
        Given the user with id "1" has a history with the following items:
            | times_played | song_id | title                   | artist      | genre | duration |
            | 3            | 1       | Never Gonna Give You Up | Rick Astley | Rock  | 300      |
            | 3            | 2       | Yellow                  | Coldplay    | Pop   | 150      |
            | 1            | 3       | Yellow Submarine        | The Beatles | Rock  | 100      |
            | 2            | 4       | Ticket to Ride          | The Beatles | Rock  | 250      |
        When I send a "GET" request to "/user/1/hot"
        Then the response status should be "200"
        And the response JSON should contain a list with the following songs in order:
            | song_id | title                   | artist      | genre | times_played |
            | 1       | Never Gonna Give You Up | Rick Astley | Rock  | 3            |
            | 2       | Yellow                  | Coldplay    | Pop   | 3            |
            | 4       | Ticket to Ride          | The Beatles | Rock  | 2            |
            | 3       | Yellow Submarine        | The Beatles | Rock  | 1            |

    # GET statistics
    # /user/:id/statistics
    Scenario: Get user statistics from user id
        Given the user with id "1" has a history with the following items:
            | times_played | song_id | title                   | artist      | genre | duration |
            | 3            | 1       | Never Gonna Give You Up | Rick Astley | Rock  | 300      |
            | 1            | 2       | Yellow Submarine        | The Beatles | Rock  | 100      |
        When I send a "GET" request to "/user/1/statistics"
        Then the response status should be "200"
        And the response JSON should contain the following statistics:
            | most_played_song        | most_played_genre | play_duration |
            | Never Gonna Give You Up | Rock              | 1000          |

    # CREATE user history
    # /user/history
    Scenario: Add a new song to a user history
        Given the user with id "1" has no history
        When I send a "POST" request to "/history" with the following JSON:
            """
            {
                "user_id": "1",
                "song_id": "4"
            }
            """
        Then the response status should be "201"
        And the response JSON should contain a history with 1 item with song_id "4"

    # DELETE/CLEAR user history
    # /user/:id/history/clear
    Scenario: Clear user history
        Given the user with id "1" has 3 history entries
        When I send a "DELETE" request to "/user/1/history/clear"
        And I send a "GET" request to "/user/1/history"
        Then the response status should be "200"
        And the response JSON should contain a history with 0 entries

    # DELETE history entry
    # /history/:id
    Scenario: Delete history entry
        Given the user with id "1" has 3 history entries with ids "1", "2" and "3"
        When I send a "DELETE" request to "/history/1"
        And I send a "GET" request to "/user/1/history"
        Then the response status should be "200"
        And the response JSON should contain a history without the entry that was deleted with id "1"
        And the response JSON should contain a history with ids "2" and "3"