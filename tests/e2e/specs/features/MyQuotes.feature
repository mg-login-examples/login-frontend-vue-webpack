@quote-feature
Feature: My Quotes

  Scenario: View my quotes when logged in
    Given I am logged in as a user with email "my_quotes_test@fakemail.com" and password "12345678"
    Given user with email "my_quotes_test@fakemail.com" and password "12345678" has written a quote
    When I click on my quotes button in topbar
    Then I see a quote

  Scenario: When opening my quotes page, redirect to login if not logged in
    Given I am on all quotes view
    And I am not logged in
    When I try to open my quotes view
    Then I am redirected to login page
