Feature: Hot page
    As an user,
    I want to see the hot songs,
    So that I can get to know the top songs ever played.

    Background:
        Given I am logged in with user id "2"

    Scenario: User wants to see the top songs
        Given the user is in the "feed" page
        When the user clicks the "HotPage" icon at the navbar
        Then the user is redirected to the "hot" page
        And a list with at most "5" songs is displayed in the "Hot Songs" container

    Scenario: User wants to see the top songs filtered by genre
        Given the user is in the "hot" page
        When the user writes the genre "rock" in the input text
        Then a list with at most "5" songs is displayed in the "Hot Songs" container

    Scenario: User wants to filter the songs with a non existing genre
        Given the user is in the "hot" page
        When the user writes the genre "abcderfghijk" in the input text
        Then a message is displayed saying "Não há músicas com este gênero!" in the "No Songs Found" span

    Scenario: Clicking in a song
        Given the user is in the "hot" page
        When The user clicks in a "Song Item" container
        Then The title and artist of the song must appear in the playbar
        