Feature: Initial Screen (Home Page)
As an user
I want to see recommended content and the contents I already consume.
And also being able to access other important pages.

Scenario: Landing in the home page
	Given I am a user with login "ohbfinho" and password "oSportNaoSubiu"
	And I have already logged at the website before
	When I access the website
	Then I am at the initial page 

Scenario: Acessing personal page
	Given I am a user with login "ohbfinho" and password "oSportNaoSubiu"
	And I have already logged and the website before
	When I access the personal page
	Then My playlist, data and other information is shown to me

Scenario: Content Update Failure
    	Given the user is connected to the music streaming service with login "ohbfinho" and password "oSportNaoSubiu"
    	When the home page is loaded
    	Then the page should display the latest releases, recommendations, and personalized playlists
    	And in case of a content update failure
    	Then the user should receive an error message
    	And the home page should display the previously loaded content

Scenario: Loading or Display Issues
    	Given the user is connected to the music streaming service with login "ohbfinho" and password "oSportNaoSubiu"
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

Scenario: Searching for Specific Content
	Given The user is connected to the music streaming service with login "ohbfinho" and password "oSportNaoSubiu"
	And The user is at the homepage
	And They use the search bar to look for specific content
	Then The search results should display relevant artists, albums, and playlists
	And I should be able to click on any result to access detailed information or play the content.







