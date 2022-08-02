@quote-feature
Feature: My Quotes

  Scenario: View my quotes when logged in
    Given I am logged in as a user with email "my_quotes_test@fakemail.com" and password "12345678"
    Given user with email "my_quotes_test@fakemail.com" and password "12345678" has written a quote
    When I click on my quotes button in topbar
    Then I see a quote

  Scenario: When opening my quotes page, redirect to login if not logged in
    And I am on all quotes view
    When I try to open my quotes view
    Then I am redirected to login page

  Scenario: Create a new quote
    Given I am logged in as a user with email "my_quotes_test@fakemail.com" and password "12345678"
    When I open my quotes view
    And I click on create new quote button
    Then create new quote modal is open
    And quote input has text ""
    And save button is disabled
    When I enter some quote "a new quote"
    And I click on save button
    Then create new quote modal is closed
    And a quote "a new quote" is visible in my quotes

  Scenario: Delete a quote
    Given I am logged in as a user with email "my_quotes_test@fakemail.com" and password "12345678"
    And I have created a quote "quote to be deleted"
    And I open my quotes view
    When I hover on the quote with text "quote to be deleted"
    Then the delete button for the quote with text "quote to be deleted" is visible
    When I click on delete button for the quote with text "quote to be deleted"
    Then the delete quote modal is open
    And the quote to delete with text "quote to be deleted" is visible
    When I click on delete button in the delete quote modal
    Then the delete quote modal is closed
    And the quote with text "quote to be deleted" is deleted
