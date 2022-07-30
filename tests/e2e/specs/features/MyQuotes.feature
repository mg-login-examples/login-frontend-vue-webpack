@quote-feature
Feature: My Quotes

  Scenario: View my quotes when logged in
    Given I am logged in as a user with email "my_quotes_test@fakemail.com" and password "12345678"
    Given user with email "my_quotes_test@fakemail.com" and password "12345678" has written a quote
    When I click on my quotes button in topbar
    Then I see a quote

  Scenario: When opening my quotes page, redirect to login if not logged in
    Given my login session is cleared
    And I am on all quotes view
    When I try to open my quotes view
    Then I am redirected to login page

  Scenario: Create a new quote
    Given I am logged in as a user with email "my_quotes_test@fakemail.com" and password "12345678"
    When I click on my quotes button in topbar
    And I click on create new quote button
    Then create new quote modal is visible
    And quote input has text ""
    And save button is disabled
    When I enter some quote "a new quote"
    And I click on save button
    Then create new quote modal is not visible
    And a quote "a new quote" is visible in my quotes
