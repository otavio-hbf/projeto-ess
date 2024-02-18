Feature: History Routes

    #     Scenario: Obter item por ID
    #     Given o ItemService retorna um item com id "123" e nome "Exemplo de Item"
    #     When uma requisição "GET" for enviada para "/items/123"
    #     Then o status da resposta deve ser "200"
    #     And o JSON da resposta deve conter id "123" e nome "Exemplo de Item"

    #   Scenario: Obter todos os itens
    #     Given o ItemService retorna uma lista de itens
    #     When uma requisição "GET" for enviada para "/items"
    #     Then o status da resposta deve ser "200"
    #     And o JSON da resposta deve ser uma lista de itens
    #     And o item com id "123" e nome "Exemplo de Item" está na lista
    #     And o item com id "456" e nome "Outro Item" está na lista

    # Service
    Scenario: Get user history from user id
        Given the HistoryService returns a history for user_id "1" with 3 items with song_id "1", "2" and "3"
        When I send a "GET" request to "/user/1/history"
        Then the response status should be "200"
        And the response JSON should contain a history with 3 items with song_id "1", "2" and "3"

        


# Given o método getUserHistory chamado com "1" do HistoryService retorna um histórico com "3" itens com song_id "1", "2" e "3"
# When o método getUserHistory do HistoryService for chamado com o id "1"
# Then o histórico retornado deve ter "3" itens com song_id "1", "2" e "3"

# Scenario: Add a new song to a user history
#     Given the function createHistory was called with the user_id "1" and the song_id "4"
#     When the function getUserHistory is called with the user_id "1"
#     Then the history returned must have "1" item with song_id "4"

# Scenario: Delete an entry from a user history
#     Given the user with id "1" has 3 history entries
#     When the function deleteHistory is called on one of the entry ids
#     And the function getUserHistory is called with the user_id "1"
#     Then the history returned must n"ot have the entry that was deleted
#     And the user history must have 2 entries

# Scenario: Clear user history
#     Given the user with id "1" has 3 history entries
#     When the function deleteUserHistory is called with the user_id "1"
#     And the function getUserHistory is called with the user_id "1"
#     Then the history returned must have 0 items

# Scenario: Get user statistics
#     Given the user with id "1" has a history with the following items:
#         | times_played | song_id | title                   | artist      | genre | duration |
#         | 3            | 1       | Never Gonna Give You Up | Rick Astley | Rock  | 300      |
#         | 1            | 2       | Yellow Submarine        | The Beatles | Rock  | 100      |
#     When the function getUserStatistics is called with the user_id "1"
#     Then it must return the following statistics:
#         | most_played_song        | most_played_genre | play_duration |
#         | Never Gonna Give You Up | Rock              | 1000          |

# Scenario: History Tracking disabled
#     Given the user with id "1" has history tracking disabled
#     And the user has no play history
#     When the function createHistory is called with the user_id "1" and the song_id "4"
#     And the function getUserHistory is called with the user_id "1"
#     Then the history returned must have 0 items

# Scenario: User requests most played songs
#     Given the user with id "1" has a history with the following items:
#         | times_played | song_id | title                   | artist      | genre | duration |
#         | 3            | 1       | Never Gonna Give You Up | Rick Astley | Rock  | 300      |
#         | 3            | 2       | Yellow                  | Coldplay    | Pop   | 150      |
#         | 1            | 3       | Yellow Submarine        | The Beatles | Rock  | 100      |
#         | 2            | 4       | Ticket to Ride          | The Beatles | Rock  | 250      |
#     When the function getUserMostPlayedList is called with the user_id "1"
#     Then it must return the following songs in order:
#         | song_id | title                   | artist      | genre | times_played |
#         | 1       | Never Gonna Give You Up | Rick Astley | Rock  | 3            |
#         | 2       | Yellow                  | Coldplay    | Pop   | 3            |
#         | 4       | Ticket to Ride          | The Beatles | Rock  | 2            |
#         | 3       | Yellow Submarine        | The Beatles | Rock  | 1            |