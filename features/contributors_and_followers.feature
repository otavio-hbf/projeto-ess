Feature: Contributors and Followers
    As an user currently on a playlist page
    I want to see a list of contributors and a list of followers of that playlist
    So that I can know users with similar tastes to me
    
    Scenario: Being owner of a playlist
        Given the user with login "Thiago" accesses the "Playlist Library" page
        When the "New Playlist+" field is selected
        And the name "AMV music" is entered
        And the option to make the playlist public is marked
        And the user confirms the creation
        Then any user that enters the "AMV music" playlist page can see the name "Thiago" listed as the owner, alongside some aditional information

    Scenario: Adding contributors to a playlist
        Given the user with login "Thiago" is the owner of the playlist "AMV music"
        And accesses the page of the playlist "AMV music"
        And the playlist "AMV music" is public
	When the user "Thiago" selects the field "add contributors"
	And sends an invite to the user with login "Otavio" to be a contributor
        And the user "Otavio" accepts the invite
	Then any user that enters the "AMV music" playlist page can see the name "Otavio" listed as contributor, alongside some aditional information

    Scenario: Declining invite to be a contributor
        Given the user with login "Thiago" is the owner of the playlist "AMV music"
        And accesses the page of the playlist "AMV music"
        And the playlist "AMV music" is public
        And the list of followers for the playlist "AMV music" is currently empty
	When the user "Thiago" selects the field "add contributors"
	And sends an invite to the user with login "Otavio" to be a contributor
        And the user "Otavio" doesn't accept the invite
	Then any user that enters the "AMV music" playlist page will see the list of contributors as empty

    Scenario: Following a playlist
        Given the user with login "Thiago" is currently on the page of the playlist "Shrek soundtrack"
        And the user "Thiago" is not the owner of the playlist "Shrek soundtrack"
        And the playlist "Shrek soundtrack" is public
        When the "follow" field is selected
        Then any user that enter the "Shrek soundtrack" playlist page can see the name "Thiago" listed as follower
        