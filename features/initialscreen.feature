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