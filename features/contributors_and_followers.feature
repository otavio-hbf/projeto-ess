Feature: Contributors and Followers
    As an user currently on a playlist page
    I want to see a list of contributors and a list of followers of that playlist
    So that I can know users with similar tastes to me

    Scenario: Being owner of a playlist
        Given I'm logged with login "Thiago" and password "123123"
        And I'm currently on the "Playlist Library" page
        When I select the "New Playlist+" field
        And I enter the name "AMV music"
        And I select the option to make the playlist public
        And I confirm the creation
        Then I'm now on the "AMV music" playlist page
        And I can see the name "Thiago" listed as the owner of the playlist "AMV music"

    Scenario: Adding contributors to a playlist
        Given I'm logged with login "Thiago" and password "123123"
        And I'm the owner of the playlist "AMV music"
        And I'm on the page of the playlist "AMV music"
        And the playlist "AMV music" is public
        And the list of contributors to the playlist "AMV music" is currently empty
        When I select the field "add contributors"
        And I send an invite to the user with login "Otavio" to be a contributor
        And the user "Otavio" accepts the invite
        Then I'm now on the page of the playlist "AMV music"
        And I can see the name "Otavio" listed as contributor to the playlist "AMV music"

    Scenario: Declining invite to be a contributor
        Given I'm logged with login "Thiago" and password "123123"
        And I'm the owner of the playlist "AMV music"
        And I'm on the page of the playlist "AMV music"
        And the playlist "AMV music" is public
        And the list of contributors to the playlist "AMV music" is currently empty
        When I select the field "add contributors"
        And I send an invite to the user with login "Otavio" to be a contributor
        And the user "Otavio" doesn't accept the invite
        Then I'm now on the page of the playlist "AMV music"
        And I see the list of contributors to the playlist "AMV music" as empty

    Scenario: Failure in sending an invite to be a contributor
        Given I'm logged with login "Thiago" and password "123123"
        And I'm the owner of the playlist "AMV music"
        And I'm on the page of the playlist "AMV music"
        And the playlist "AMV music" is public
        And the list of contributors to the playlist "AMV music" is currently empty
        When I select the field "add contributors"
        And I try to send an invite to the user with login "Otavio" to be a contributor
        And an interruption in the connection with the server occurs
        Then I see an error message warning the invite couldn't be sent due to a server issue
        And I'm now on the page of the playlist "AMV music"
        And I see the list of contributors to the playlist "AMV music" as empty

    Scenario: Following a playlist
        Given I'm logged with login "Thiago" and password "123123"
        And I'm currently on the page of the playlist "Shrek soundtrack"
        And I'm not the owner of the playlist "Shrek soundtrack"
        And the playlist "Shrek soundtrack" is public
        And the list of followers of the playlist "Shrek soundtrack" is currently empty
        When I select the "follow" field
        Then I'm now on the page of the playlist "Shrek soundtrack"
        And I can see the name "Thiago" listed as follower of the playlist "Shrek soundtrack"

    Scenario: Failure in following a playlist
        Given I'm logged with login "Thiago" and password "123123"
        And I'm currently on the page of the playlist "Shrek soundtrack"
        And I'm not the owner of the playlist "Shrek soundtrack"
        And the playlist "Shrek soundtrack" is public
        And the list of followers of the playlist "Shrek soundtrack" is currently empty
        When I select the "follow" field
        And an interruption in the connection with the server occurs
        Then I'm now on the page of the playlist "Shrek soundtrack"
        And I can see an error message warning I wasn't registered as a follower due to a serve error
        And I can see the list of followers of the playlist "Shrek soundtrack" as empty

    Scenario: Failure in following a playlist as its owner
        Given I'm logged with login "Thiago" and password "123123"
        And I'm the the owner of the playlist "AMV music"
        And I'm on the page of the playlist "AMV music"
        And the list of followers of the playlist "AMV music" is currently empty
        When I select the "follow" field
        Then I'm now on the page of the playlist "AMV music"
        And I can see an error message warning the owner can't follow their own playlist
        And I can see the list of followers of the playlist "AMV music" as empty

    Scenario: Accessing the owner's profile page from the playlist page
        Given I'm logged with login "Thiago" and password "123123"
        And I'm currently on the page of the playlist "Shrek soundtrack"
        And the user "Otavio" is listed as the owner of that playlist
        When I select the owner
        Then I'm now on the profile page for user "Otavio"

    Scenario: Accessing the profile page of a contributor from the playlist page
        Given I'm logged with login "Thiago" and password "123123"
        And I'm currently on the page of the playlist "Shrek soundtrack"
        And the user "Pedro" is listed as one of the contributors of that playlist
        When I select the name of the user "Pedro" in the list of contributors
        Then I'm now on the profile page for user "Pedro"

    Scenario: Accessing the profile page of a follower from the playlist page
        Given I'm logged with login "Thiago" and password "123123"
        And I'm currently on the page of the playlist "Shrek soundtrack"
        And the user "Luan" is listed as one of the followers of that playlist
        When I select the name of the user "Luan" in the list of followers
        Then I'm now on the profile page for user "Luan"