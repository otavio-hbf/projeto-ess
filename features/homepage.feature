Feature: Initial Screen (Home Page)
As a user
I want to see recommended content and the contents I already consume.
And also being able to access other important pages.

Scenario: Landing in the home page
	Given I am a user with login "ohbfinho" and password "oSportNaoSubiu"
	And I have already logged at the website before
	When I access the website
	Then I am at the initial page

Scenario: Playing content
	Given I am a user and I am connected to the music streaming service with login "ohbfinho" and password "oSportNaoSubiu"
	And I am at the homepage
	When I select the song "Spongebob Theme Song" by the artist "Lil’ SPB", displayed on the homepage
	Then Its starts to play
	And the play bar is now apparent 

Scenario: Pausing
	Given I am a user and I am connected to the music streaming service with login "ohbfinho" and password "oSportNaoSubiu"
	And I am at the homepage
	And the song "Spongebob Theme Song" by the artist "Lil’ SPB" is currently playing
	And the play bar apparent, showing it's buttons
	When I pause the music
	Then it stops
	And the option to continue is shown
	
Scenario: Acessing personal page
	Given I am a user with login "ohbfinho" and password "oSportNaoSubiu"
	And I have already logged and the website before
	When I access the personal page
	Then My playlist, data and other information is shown to me

Scenario: Connection Update Failure
    	Given I am a user and I am logged with login "ohbfinho" and password "oSportNaoSubiu"
	When the internet connection is not available
    	Then the page should display an error message 
    	And the home page should display the previously loaded content

Scenario: Personalized Recommendations
   	Given I am connected to the music streaming service with login "ohbfinho" and password "oSportNaoSubiu"
    	And I have an established listening history
    	When the home page is loaded
    	Then the page should display personalized recommendations based on my listening preferences
    	And the recommendations should include a mix of familiar and potentially new artists or genres
    	And I should be able to easily access and play the recommended content

Scenario: Searching for Specific Content
	Given I am connected to the music streaming service with login "ohbfinho" and password "oSportNaoSubiu"
	And I am at the homepage
	When I use the search bar to look for specific content, such as "Podcasts sobre Engenharia de Software"
	Then The search results should display relevant artists, albums, and playlists
	And I should be able to click on any result to access detailed information or play the content.

Scenario: Searching for a private playlist
	Given I am logged with login "ohbfinho" and password "oSportNaoSubiu"
	And I am at the homepage
	When I use the search bar
	And I select the "playlist" filter
	And I search for the playlist "Minhas musicas secretas" from user "BigT"
	And the playlist is listed as private
	Then The search results should display a "Playlist not found" message
	



