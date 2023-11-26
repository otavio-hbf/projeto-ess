Feature : Initial Page
As: an user
I want to: see recommended content and the contents I already consume. And also being able to access other important pages.

Scenario: Landing in the initial page
Given: I am a user with login "ohbfinho" and password "oSportNaoSobeMais"
And: I have already logged and the app before
When: I access the app
Then: I am at the initial page 

Scenario: Acessing personal page
Given: I am a user with login "ohbfinho" and password "oSportNaoSobeMais"
And: I have already logged and the app before
When: I access the personal page
Then: My playlist, data and other information is shown to me

Scenario: Content Update Failure
    Given the user is connected to the music streaming service with login "ohbfinho" and password "oSportNaoSobeMais"
    When the home page is loaded
    Then the page should display the latest releases, recommendations, and personalized playlists
    And in case of a content update failure
    Then the user should receive an error message
    And the home page should display the previously loaded content

Scenario: Loading or Display Issues
    Given the user is connected to the music streaming service with login "ohbfinho" and password "oSportNaoSobeMais"
    When the home page is loaded
    Then the page should be displayed correctly, including the latest releases and recommendations
    And if there are loading or display issues
    Then the user should receive an error message
    And the home page should not display the expected content correctly

Scenario: Personalized Recommendations
    Given the user is connected to the music streaming service with login "ohbfinho" and password "oSportNaoSubiu"
    And the user has an established listening history
    When the home page is loaded
    Then the page should display personalized recommendations based on the user's listening preferences
    And the recommendations should include a mix of familiar and potentially new artists or genres
    And the user should be able to easily access and play the recommended content
